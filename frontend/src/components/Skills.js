import { ContentPanel } from "@/components/HomeSection";
import { SparklesIcon } from "@/components/icons/PageIcons";
import { usePortfolio } from "@/context/PortfolioContext";

function SkillCard({ name, skills }) {
  return (
    <article className="h-full rounded-xl border border-dark/10 bg-dark/[0.02] p-5 dark:border-light/10 dark:bg-light/[0.03]">
      <h3 className="mb-4 text-sm font-semibold text-dark dark:text-light">{name}</h3>
      <ul className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <li
            key={skill}
            className="rounded-full border border-primary/40 bg-primary/5 px-3 py-1 text-xs font-medium text-dark dark:border-primaryDark/40 dark:bg-primaryDark/5 dark:text-light">
            {skill}
          </li>
        ))}
      </ul>
    </article>
  );
}

const Skills = () => {
  const { content } = usePortfolio();

  if (!content.skills?.categories?.length) {
    return null;
  }

  const { title, categories } = content.skills;
  if (!title?.trim()) return null;

  return (
    <ContentPanel icon={<SparklesIcon className="h-4 w-4 shrink-0" />} title={title} className="mt-12 lg:mt-10">
      <div className="grid grid-cols-4 gap-4 lg:grid-cols-2 sm:grid-cols-1">
        {categories.map((category) => (
          <SkillCard key={category.name} name={category.name} skills={category.skills} />
        ))}
      </div>
    </ContentPanel>
  );
};

export default Skills;
