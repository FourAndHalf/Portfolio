"use client";

import { TechnicalBentoCard } from "./bento";

export const ExperienceModule = () => {
  const experiences = [
    {
      role: "Principal Backend Engineer",
      company: "TechNexus",
      year: "2024 - Present",
      desc: "Architected microservices routing 10M+ daily requests. Reduced latency by 40%.",
    },
    {
      role: "Senior Systems Engineer",
      company: "DataFlow Systems",
      year: "2021 - 2024",
      desc: "Designed highly available PostgreSQL clusters and optimized complex query performance.",
    },
    {
      role: "Backend Developer",
      company: "CloudStart",
      year: "2018 - 2021",
      desc: "Built core REST APIs using Go and integrated distributed caching layers.",
    }
  ];

  return (
    <TechnicalBentoCard className="md:col-span-8 md:row-span-2" title="Career Trajectory" id="EXP">
      <div className="mt-6 space-y-8 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
        {experiences.map((exp, idx) => (
          <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            {/* Timeline dot */}
            <div className="flex items-center justify-center w-5 h-5 rounded-full border border-primary bg-background shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_10px_oklch(0.82_0.22_110_/_0.2)]">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
            </div>
            
            {/* Content box */}
            <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-4 rounded-xl border border-border bg-secondary/20 transition-colors group-hover:border-primary/50 group-hover:bg-secondary/40">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                <h4 className="font-semibold">{exp.role}</h4>
                <span className="text-label-caps text-primary opacity-80">{exp.year}</span>
              </div>
              <div className="text-muted-foreground text-sm font-technical mb-2">{exp.company}</div>
              <p className="text-code-md text-muted-foreground leading-relaxed">
                {exp.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </TechnicalBentoCard>
  );
};
