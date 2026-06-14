import { useEffect, useState } from "react";
import ExternalLink from "@/components/ExternalLink";
import { GithubIcon } from "@/components/Icons";
import { ContentPanel, HomeSection } from "@/components/HomeSection";
import { usePortfolio } from "@/context/PortfolioContext";
import { formatStatPlus, languageColor } from "@portfoliooo/shared/github";
import { resolveApiUrl } from "@/lib/apiBaseUrl";

function StatBlock({ value, label }) {
  return (
    <div className="text-center">
      <p className="text-2xl font-bold text-primary dark:text-primaryDark md:text-xl">{value}</p>
      <p className="mt-1 text-xs text-dark/55 dark:text-light/55">{label}</p>
    </div>
  );
}

function LanguageBadge({ language, color }) {
  if (!language) return null;

  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 text-xs text-dark/70 dark:text-light/70">
      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
      {language}
    </span>
  );
}

function RepoCard({ repo }) {
  const color = languageColor(repo.language, repo.languageColor);

  return (
    <ExternalLink
      href={repo.url}
      className="block rounded-xl border border-dark/10 bg-dark/[0.03] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-sm dark:border-light/10 dark:bg-light/[0.04] dark:hover:border-primaryDark/30">
      <div className="mb-2 flex items-start justify-between gap-3">
        <p className="text-sm font-bold text-dark dark:text-light">{repo.name}</p>
        <LanguageBadge language={repo.language} color={color} />
      </div>
      {repo.description ? (
        <p className="text-xs leading-relaxed text-dark/65 dark:text-light/65 line-clamp-2">
          {repo.description}
        </p>
      ) : null}
    </ExternalLink>
  );
}

export default function GitHubProfile() {
  const { content } = usePortfolio();
  const home = content.site.pages.home;
  const githubUrl = content.site.social?.github;
  const [profile, setProfile] = useState(null);

  const title = home.githubSectionTitle?.trim();
  const showSection = home.showGitHubActivity !== false;

  useEffect(() => {
    if (!githubUrl || !showSection || !title) return;

    let active = true;

    fetch(resolveApiUrl("/api/github/profile"))
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (active && data?.username) setProfile(data);
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, [githubUrl, showSection, title]);

  if (!showSection || !githubUrl || !profile || !title) return null;

  const { stats, repos } = profile;
  const profileUrl = profile.url || githubUrl;

  return (
    <HomeSection>
      <ContentPanel
        icon={<GithubIcon className="h-4 w-4 shrink-0" />}
        title={title}
        footer={
          <ExternalLink href={`${profileUrl}?tab=repositories`} className="btn-secondary w-full justify-center">
            View All Repositories
          </ExternalLink>
        }>
        <div className="mb-6 grid grid-cols-3 divide-x divide-dark/10 rounded-xl border border-dark/10 bg-dark/[0.02] dark:divide-light/10 dark:border-light/10 dark:bg-light/[0.03]">
          <div className="px-3 py-5 sm:px-2 sm:py-4">
            <StatBlock value={formatStatPlus(stats.repos)} label="Repos" />
          </div>
          <div className="px-3 py-5 sm:px-2 sm:py-4">
            <StatBlock value={formatStatPlus(stats.linesOfCode)} label="Lines of code" />
          </div>
          <div className="px-3 py-5 sm:px-2 sm:py-4">
            <StatBlock value={formatStatPlus(stats.contributions)} label="Contributions this year" />
          </div>
        </div>

        {repos.length > 0 ? (
          <div>
            <h3 className="mb-3 text-sm font-bold text-dark dark:text-light">Top Repositories</h3>
            <div className="space-y-3">
              {repos.map((repo) => (
                <RepoCard key={repo.url} repo={repo} />
              ))}
            </div>
          </div>
        ) : null}
      </ContentPanel>
    </HomeSection>
  );
}
