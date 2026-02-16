import Particles from "@/app/components/particles";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-gradient-to-tl from-zinc-900 via-zinc-400/10 to-zinc-900 ">
      <Particles
        className="fixed inset-0 -z-10"
        quantity={100}
        staticity={50}
      />
      {children}
    </div>
  );
}
