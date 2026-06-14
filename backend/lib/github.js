import { languageColor } from "@portfoliooo/shared/github";

function githubHeaders() {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "Portfoliooo",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

async function fetchGitHubGraphQL(username) {
  const year = new Date().getFullYear();
  const query = `
    query($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        repositories(
          isFork: false
          ownerAffiliations: OWNER
          privacy: PUBLIC
          first: 100
          orderBy: { field: STARGAZERS, direction: DESC }
        ) {
          totalCount
          nodes {
            name
            description
            url
            stargazerCount
            primaryLanguage {
              name
              color
            }
            languages(first: 10) {
              edges {
                size
              }
            }
          }
        }
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
          }
        }
      }
    }
  `;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      ...githubHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        login: username,
        from: `${year}-01-01T00:00:00Z`,
        to: `${year}-12-31T23:59:59Z`,
      },
    }),
  });

  if (!response.ok) return null;

  const payload = await response.json();
  if (payload.errors?.length || !payload.data?.user) return null;

  return payload.data.user;
}

async function fetchGitHubRest(username) {
  const headers = githubHeaders();
  const [userResponse, reposResponse] = await Promise.all([
    fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, { headers }),
    fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=stars&per_page=100&type=owner`,
      { headers }
    ),
  ]);

  if (!userResponse.ok) return null;

  const user = await userResponse.json();
  const repos = reposResponse.ok ? await reposResponse.json() : [];

  return { user, repos };
}

function sumLanguageBytes(repositories) {
  return repositories.reduce((total, repo) => {
    const sizes = repo.languages?.edges || [];
    return total + sizes.reduce((sum, edge) => sum + (edge.size || 0), 0);
  }, 0);
}

function mapGraphQLRepos(nodes) {
  return nodes
    .filter(Boolean)
    .slice(0, 3)
    .map((repo) => ({
      name: repo.name,
      description: repo.description || "",
      url: repo.url,
      language: repo.primaryLanguage?.name || "",
      languageColor: repo.primaryLanguage?.color || "",
      stars: repo.stargazerCount || 0,
    }));
}

function mapRestRepos(repos) {
  return repos
    .filter((repo) => !repo.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 3)
    .map((repo) => ({
      name: repo.name,
      description: repo.description || "",
      url: repo.html_url,
      language: repo.language || "",
      languageColor: languageColor(repo.language),
      stars: repo.stargazers_count || 0,
    }));
}

export async function fetchGitHubProfile(username) {
  const graphUser = await fetchGitHubGraphQL(username);

  if (graphUser) {
    const repoNodes = graphUser.repositories?.nodes || [];
    const codeBytes = sumLanguageBytes(repoNodes);
    const linesOfCode = Math.round(codeBytes / 50);

    return {
      username,
      url: `https://github.com/${username}`,
      stats: {
        repos: graphUser.repositories?.totalCount || repoNodes.length,
        linesOfCode,
        contributions: graphUser.contributionsCollection?.contributionCalendar?.totalContributions || 0,
      },
      repos: mapGraphQLRepos(repoNodes),
    };
  }

  const rest = await fetchGitHubRest(username);
  if (!rest) return null;

  const { user, repos } = rest;
  const ownedRepos = repos.filter((repo) => !repo.fork);
  const codeBytes = ownedRepos.reduce((total, repo) => total + (repo.size || 0) * 1024, 0);

  return {
    username: user.login,
    url: user.html_url,
    stats: {
      repos: user.public_repos,
      linesOfCode: Math.round(codeBytes / 50),
      contributions: 0,
    },
    repos: mapRestRepos(ownedRepos),
  };
}

const PROFILE_CACHE_TTL_MS = 10 * 60 * 1000;
const profileCache = new Map();

export async function fetchGitHubProfileCached(username) {
  const cached = profileCache.get(username);
  if (cached && Date.now() - cached.at < PROFILE_CACHE_TTL_MS) {
    return cached.data;
  }

  const profile = await fetchGitHubProfile(username);
  if (profile) {
    profileCache.set(username, { data: profile, at: Date.now() });
  }

  return profile;
}
