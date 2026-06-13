import { usePortfolio } from "@/context/PortfolioContext";
import SectionHeading from "@/components/SectionHeading";

function SkillCard({ name, skills }) {
  return (
    <article className="rounded-2xl border border-primary/40 dark:border-primaryDark/40 bg-primary/[0.03] dark:bg-primaryDark/[0.04] p-6 md:p-7 h-full">
      <h3 className="text-base font-semibold mb-5 text-dark dark:text-light">{name}</h3>
      <ul className="flex flex-wrap gap-2.5">
        {skills.map((skill) => (
          <li
            key={skill}
            className="px-3.5 py-1.5 rounded-full border border-primary/60 dark:border-primaryDark/60 text-sm font-medium text-dark dark:text-light">
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

  return (
    <section className="mt-16 lg:mt-12 w-full">
      <SectionHeading title={title} />

      <div className="grid grid-cols-4 lg:grid-cols-2 sm:grid-cols-1 gap-5 md:gap-6">
        {categories.map((category) => (
          <SkillCard key={category.name} name={category.name} skills={category.skills} />
        ))}
      </div>
    </section>
  );
};

export default Skills;
