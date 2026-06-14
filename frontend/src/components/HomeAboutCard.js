import Image from "next/image";
import Link from "next/link";
import { ContentPanel, HomeSection } from "@/components/HomeSection";
import { AvailabilityDot, LocationIcon, UserIcon } from "@/components/icons/PageIcons";
import { usePortfolio } from "@/context/PortfolioContext";
import { getTopSkills } from "@portfoliooo/shared/projects";

export default function HomeAboutCard() {
  const { content } = usePortfolio();
  const { site, skills } = content;
  const home = site.pages.home;
  const about = site.pages.about || {};

  const intro = home.aboutIntro?.trim() || about.biography?.[0]?.trim();
  const title = home.aboutTitle?.trim();
  if (!intro || !title) return null;

  const name = site.name || site.brand;
  const role = about.role?.trim();
  const profileImage = home.profileImage || about.profileImage;
  const location = about.location?.trim();
  const availability = about.availability?.trim();
  const topSkills = getTopSkills(skills, 4);

  return (
    <HomeSection>
      <ContentPanel icon={<UserIcon className="h-4 w-4 shrink-0" />} title={title}>
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-6">
          <div className="flex shrink-0 items-center gap-3 md:w-52 md:flex-col md:items-start md:gap-2.5">
            {profileImage ? (
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-primary/40 ring-2 ring-primary/10 dark:border-primaryDark/40 dark:ring-primaryDark/10">
                <Image src={profileImage} alt={name} fill className="object-cover" sizes="64px" />
              </div>
            ) : null}
            <div className="min-w-0">
              <p className="text-base font-bold leading-tight text-dark dark:text-light">{name}</p>
              {role ? (
                <p className="text-xs text-dark/60 dark:text-light/60">{role}</p>
              ) : null}
            </div>
          </div>

          <div className="min-w-0 flex-1 space-y-3">
            <p className="text-sm leading-relaxed text-dark/75 dark:text-light/75">{intro}</p>

            {(location || availability) && (
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                {location ? (
                  <p className="flex items-center gap-2 text-xs text-dark/80 dark:text-light/80">
                    <LocationIcon className="h-3.5 w-3.5 shrink-0 text-primary dark:text-primaryDark" />
                    {location}
                  </p>
                ) : null}
                {availability ? (
                  <p className="flex items-center gap-2 text-xs text-dark/80 dark:text-light/80">
                    <AvailabilityDot />
                    {availability}
                  </p>
                ) : null}
              </div>
            )}

            {topSkills.length > 0 ? (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-dark dark:text-light">Top Skills</span>
                <ul className="flex flex-wrap gap-1.5">
                  {topSkills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-primary/40 bg-primary/5 px-2.5 py-0.5 text-xs font-medium text-dark dark:border-primaryDark/40 dark:bg-primaryDark/5 dark:text-light">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <Link href="/about" className="btn-secondary shrink-0 self-stretch md:self-center">
            View Full Profile
          </Link>
        </div>
      </ContentPanel>
    </HomeSection>
  );
}
