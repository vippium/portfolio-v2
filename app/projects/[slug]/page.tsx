import { notFound } from "next/navigation";
import { allProjects } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
import { Header } from "./header";
import { PageAnimation } from "./page-animation";
import { ScrollProgress } from "./scroll-progress";
import "./mdx.css";

export const revalidate = 60;

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams(): Promise<Props["params"][]> {
  const allowed = new Set([
    "bookstore-management-system",
    "crm-software-project",
    "vblocktube",
  ]);
  return allProjects
    .filter((p) => p.published && allowed.has(p.slug))
    .map((p) => ({ slug: p.slug }));
}

export default async function PostPage({ params }: Props) {
  const slug = params?.slug;
  const allowed = new Set([
    "bookstore-management-system",
    "crm-software-project",
    "vblocktube",
  ]);
  const project = allProjects.find(
    (project) => project.slug === slug && allowed.has(project.slug),
  );

  if (!project) {
    notFound();
  }

  return (
    <div className="bg-black min-h-screen">
      <ScrollProgress />
      <Header project={project} />

      <PageAnimation>
        <article className="px-4 sm:px-6 lg:px-8 py-6 mx-auto prose prose-sm sm:prose-base md:prose-lg prose-invert prose-zinc prose-quoteless max-w-3xl">
          <Mdx code={project.body.code} />
        </article>
      </PageAnimation>
    </div>
  );
}
