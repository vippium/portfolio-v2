import Link from "next/link";
import React from "react";
import { allProjects } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Article } from "./article";
import { ExpandableDescription } from "./expandable-description";
import { ProjectsTransition } from "./transition";
const allowedSlugs = new Set([
  "bookstore-management-system",
  "crm-software-project",
  "vblocktube",
]);

export const revalidate = 60;
export default async function ProjectsPage() {
  const visibleProjects = allProjects.filter(
    (p) => p.published && allowedSlugs.has(p.slug),
  );

  const published = visibleProjects.sort(
    (a, b) =>
      new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
      new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
  );

  const featured =
    published.find((p) => p.slug === "bookstore-management-system") ||
    published[0];
  const remaining = published.filter((p) => p.slug !== featured?.slug);
  const top2 = remaining[0];
  const top3 = remaining[1];
  const sorted = remaining.slice(2);

  return (
    <div className="relative pb-16">
      <Navigation />
      <ProjectsTransition>
        <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
          <div className="max-w-2xl mx-auto lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
              Projects
            </h2>
            <p className="mt-4 text-zinc-400">
              The projects are from my own time, during my initial learning
              phase.
            </p>
          </div>
          <div className="w-full h-px bg-zinc-800" />

          <div className="grid grid-cols-1 gap-6 mx-auto lg:grid-cols-2 ">
            {featured && (
              <Card>
                <Link
                  href={`/projects/${featured.slug}`}
                  className="group block h-full"
                >
                  <article className="relative w-full h-full p-4 md:p-8 flex flex-col transition-all duration-700">
                    <div className="flex lg:flex-col justify-between lg:justify-start gap-2 items-center lg:items-start transition-all duration-500">
                      <h2
                        id="featured-post"
                        className="z-20 text-3xl font-medium duration-1000 lg:text-4xl text-zinc-200 group-hover:text-white font-display lg:order-2 lg:mt-4 transition-all"
                      >
                        {featured.title}
                      </h2>
                      <span className="text-xs duration-1000 text-zinc-200 group-hover:text-white group-hover:border-zinc-200 drop-shadow-orange flex-shrink-0 lg:order-1 transition-all">
                        {featured.date ? (
                          <time
                            dateTime={new Date(featured.date).toISOString()}
                          >
                            {Intl.DateTimeFormat(undefined, {
                              dateStyle: "medium",
                            }).format(new Date(featured.date))}
                          </time>
                        ) : (
                          <span>SOON</span>
                        )}
                      </span>
                    </div>
                    <div className="w-full h-px mt-4 bg-zinc-800 transition-all duration-500" />

                    <div className="lg:hidden mt-4 flex-grow transition-all duration-500">
                      <ExpandableDescription
                        description={featured.description}
                      />
                    </div>

                    <div className="hidden lg:flex lg:flex-col lg:flex-grow transition-all duration-500">
                      <p className="mt-4 leading-8 duration-1000 text-zinc-400 group-hover:text-zinc-200 transition-all">
                        {featured.description}
                      </p>
                      <div className="mt-auto pt-4 transition-all duration-500">
                        <p className="text-zinc-200 hover:text-zinc-50 transition-colors duration-300">
                          Read more <span aria-hidden="true">&rarr;</span>
                        </p>
                      </div>
                    </div>
                  </article>
                </Link>
              </Card>
            )}

            <div className="flex flex-col w-full gap-8 mx-auto border-t border-gray-900/10 lg:mx-0 lg:border-t-0 ">
              {[top2, top3].filter(Boolean).map((project) => (
                <Card key={project!.slug}>
                  <Article project={project!} />
                </Card>
              ))}
            </div>
          </div>
          <div className="hidden w-full h-px md:block bg-zinc-800" />

          <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
            <div className="grid grid-cols-1 gap-4">
              {sorted
                .filter((_, i) => i % 3 === 0)
                .map((project) => (
                  <Card key={project.slug}>
                    <Article project={project} />
                  </Card>
                ))}
            </div>
            <div className="grid grid-cols-1 gap-4">
              {sorted
                .filter((_, i) => i % 3 === 1)
                .map((project) => (
                  <Card key={project.slug}>
                    <Article project={project} />
                  </Card>
                ))}
            </div>
            <div className="grid grid-cols-1 gap-4">
              {sorted
                .filter((_, i) => i % 3 === 2)
                .map((project) => (
                  <Card key={project.slug}>
                    <Article project={project} />
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </ProjectsTransition>
    </div>
  );
}
