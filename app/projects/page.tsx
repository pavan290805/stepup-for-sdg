import Link from "next/link";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  ArrowDown,
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  Check,
  Flag,
  GraduationCap,
  HeartHandshake,
  Leaf,
  Mic,
  Package,
  School,
  Sparkles,
  Sprout,
  Sun,
  Target,
  TreePine,
  Users,
  Video,
} from "lucide-react";
import { Counter } from "@/app/components/site/Counter";
import { FadeUp } from "@/app/components/site/FadeUp";

export const metadata = {
  title: "Projects - StepUp for SDG",
  description:
    "Empowering schools, students, NGOs, volunteers and CSR partners through real-world Sustainable Development Goal initiatives.",
};

type Project = {
  name: string;
  description: string;
  includes: string[];
  costItems: { label?: string; value: string }[];
  sdgs: string[];
  icon: LucideIcon;
  color: string;
  backgroundImage: string;
};

const projects: Project[] = [
  {
    name: "SDG Education Program",
    description:
      "A comprehensive education and sustainability program that combines SDG awareness, school outreach, educational resources, certification, student engagement, and environmental activities.",
    includes: [
      "Teaching SDG",
      "SDG Certification",
      "Schools Outreach",
      "Educating Students on SDGs",
      "Stationery Distribution",
      "Compass Box Distribution",
      "Tree Plantation",
    ],
    costItems: [
      { value: "₹100 per participant" },
      { label: "Stationery Kit", value: "₹200" },
      { label: "Tree Plantation", value: "₹60 per plant" },
    ],
    sdgs: ["Quality Education", "Climate Action", "Life on Land"],
    icon: Award,
    color: "#155DFC",
    backgroundImage: "/sdg/goal-04.png",
  },
  {
    name: "Rainwater Harvesting",
    description:
      "Promoting sustainable water conservation by implementing rainwater harvesting systems in schools and communities.",
    includes: ["Rainwater Harvesting"],
    costItems: [{ value: "Contact Us" }],
    sdgs: ["Clean Water & Sanitation", "Climate Action"],
    icon: Leaf,
    color: "#26BDE2",
    backgroundImage: "/sdg/goal-06.png",
  },
  {
    name: "Community Clean Drive",
    description:
      "Community cleanliness campaigns encouraging environmental responsibility and sustainable living.",
    includes: ["Community Clean Drive"],
    costItems: [{ value: "Contact Us" }],
    sdgs: ["Climate Action", "Life on Land"],
    icon: TreePine,
    color: "#3F7E44",
    backgroundImage: "/sdg/goal-13.png",
  },
  {
    name: "Career Exposure Program",
    description:
      "Industry experts guide students toward future careers, innovation, entrepreneurship and higher education opportunities.",
    includes: ["Career Exposure Program"],
    costItems: [{ value: "₹100 per participant" }],
    sdgs: ["Quality Education", "Decent Work & Economic Growth"],
    icon: Briefcase,
    color: "#A21942",
    backgroundImage: "/sdg/goal-08.png",
  },
  {
    name: "Solar Lamp Distribution",
    description:
      "Providing solar lamps to rural schools and underserved communities to improve access to clean energy.",
    includes: ["Solar Lamp Distribution"],
    costItems: [{ value: "Contact Us" }],
    sdgs: ["Affordable & Clean Energy", "Climate Action"],
    icon: Sun,
    color: "#FCC30B",
    backgroundImage: "/sdg/goal-07.png",
  },
];

const operationalRequirements = [
  { title: "School Coordination", icon: School, color: "#155DFC" },
  { title: "Volunteers", icon: Users, color: "#00B050" },
  { title: "Materials", icon: Package, color: "#FF7A00" },
  { title: "Catalogs", icon: BookOpen, color: "#00A8A8" },
  { title: "Banners", icon: Flag, color: "#7B61FF" },
  { title: "Microphone Setup", icon: Mic, color: "#C5192D" },
  { title: "Video Recording", icon: Video, color: "#26BDE2" },
];

const impactStats = [
  { value: 500, suffix: "+", label: "Schools Reached", color: "#155DFC" },
  { value: 380000, suffix: "+", label: "Students Benefited", color: "#00B050" },
  { value: 25000, suffix: "+", label: "Trees Planted", color: "#56C02B" },
  { value: 1200, suffix: "+", label: "Solar Lamps Distributed", color: "#FCC30B" },
  { value: 2100, suffix: "+", label: "Volunteers", color: "#FF7A00" },
  { value: 85, suffix: "+", label: "NGO Partners", color: "#00A8A8" },
  { value: 40, suffix: "+", label: "CSR Partners", color: "#A21942" },
  { value: 180, suffix: "+", label: "Communities Impacted", color: "#26BDE2" },
];

const supportedSdgs = [
  { name: "Quality Education", icon: "📘", color: "#C5192D" },
  { name: "Clean Water & Sanitation", icon: "💧", color: "#26BDE2" },
  { name: "Affordable & Clean Energy", icon: "☀", color: "#FCC30B", darkText: true },
  { name: "Decent Work & Economic Growth", icon: "💼", color: "#A21942" },
  { name: "Climate Action", icon: "🌍", color: "#3F7E44" },
  { name: "Life on Land", icon: "🌳", color: "#56C02B", darkText: true },
];

const participationSteps = [
  "Choose a Project",
  "Contact STEPUP",
  "Planning & Coordination",
  "Project Execution",
  "Impact Report",
];

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <FadeUp>
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-glow">
          {eyebrow}
        </span>
        <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-text md:text-base">
            {subtitle}
          </p>
        )}
      </div>
    </FadeUp>
  );
}

function SdgEducationIncludesTree() {
  return (
    <div className="grid gap-2.5">
      <style>{`
        .sdg-tree-panel {
          display: grid;
          grid-template-rows: 0fr;
          opacity: 0;
          transition: grid-template-rows 300ms ease, opacity 220ms ease;
        }

        .sdg-tree-panel > div {
          overflow: hidden;
        }

        .sdg-tree-input:checked + .sdg-tree-toggle .sdg-tree-arrow {
          transform: rotate(90deg);
        }

        .sdg-tree-input:checked ~ .sdg-tree-panel {
          grid-template-rows: 1fr;
          opacity: 1;
        }
      `}</style>

      <div className="flex items-start gap-2 text-sm leading-snug text-foreground">
        <Check className="mt-0.5 h-4 w-4 shrink-0 text-leaf" />
        <span>Teaching SDG</span>
      </div>

      <div>
        <input
          id="sdg-certification-tree"
          type="checkbox"
          className="sdg-tree-input peer sr-only"
        />
        <label
          htmlFor="sdg-certification-tree"
          className="sdg-tree-toggle flex cursor-pointer items-start gap-2 text-sm leading-snug text-foreground"
        >
          <span className="sdg-tree-arrow mt-0.5 inline-block shrink-0 text-xs text-cyan-glow transition-transform duration-300">
            ▶
          </span>
          <span>SDG Certification</span>
        </label>
        <div className="sdg-tree-panel">
          <div>
            <div className="ml-6 mt-2 flex items-start gap-2 text-sm leading-snug text-muted-text">
              <span className="text-cyan-glow">•</span>
              <span>SDG Certification</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <input
          id="schools-tree"
          type="checkbox"
          className="sdg-tree-input peer sr-only"
        />
        <label
          htmlFor="schools-tree"
          className="sdg-tree-toggle flex cursor-pointer items-start gap-2 text-sm leading-snug text-foreground"
        >
          <span className="sdg-tree-arrow mt-0.5 inline-block shrink-0 text-xs text-cyan-glow transition-transform duration-300">
            ▶
          </span>
          <span>Schools</span>
        </label>
        <div className="sdg-tree-panel">
          <div>
            <div className="ml-6 mt-2 grid gap-2.5">
              {["Educating Students on SDGs", "Stationery Distribution"].map(
                (activity) => (
                  <div
                    key={activity}
                    className="flex items-start gap-2 text-sm leading-snug text-muted-text"
                  >
                    <span className="text-cyan-glow">•</span>
                    <span>{activity}</span>
                  </div>
                )
              )}

              <div>
                <input
                  id="compass-box-tree"
                  type="checkbox"
                  className="sdg-tree-input peer sr-only"
                />
                <label
                  htmlFor="compass-box-tree"
                  className="sdg-tree-toggle flex cursor-pointer items-start gap-2 text-sm leading-snug text-muted-text"
                >
                  <span className="sdg-tree-arrow mt-0.5 inline-block shrink-0 text-xs text-cyan-glow transition-transform duration-300">
                    ▶
                  </span>
                  <span>Compass Box Distribution</span>
                </label>
                <div className="sdg-tree-panel">
                  <div>
                    <div className="ml-6 mt-2 flex items-start gap-2 text-sm leading-snug text-muted-text">
                      <span className="text-cyan-glow">•</span>
                      <span>Compass Box</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2 text-sm leading-snug text-muted-text">
                <span className="text-cyan-glow">•</span>
                <span>Tree Plantation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const Icon = project.icon;
  const isSdgEducationProgram = project.name === "SDG Education Program";

  return (
    <FadeUp delay={index * 45}>
      <article className="group relative flex h-full min-h-[440px] flex-col overflow-hidden rounded-3xl border border-border bg-card/80 p-7 shadow-[0_18px_50px_-28px_rgba(0,0,0,0.55)] backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-cyan-glow/45 hover:shadow-[0_28px_70px_-32px_rgba(0,194,255,0.55)] sm:p-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1"
          style={{
            backgroundImage: `linear-gradient(90deg, ${project.color}, #00C2FF)`,
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 transition duration-300 group-hover:opacity-100"
        />
        <Image
          src={project.backgroundImage}
          alt=""
          width={320}
          height={320}
          aria-hidden="true"
          className="pointer-events-none absolute bottom-2 right-0 z-0 h-48 w-48 select-none object-contain opacity-[0.07] blur-[1px] transition duration-500 group-hover:opacity-[0.12] dark:opacity-[0.08] dark:group-hover:opacity-[0.11] sm:h-60 sm:w-60"
        />
        <div className="relative z-10 flex h-full flex-col">
          <div className="flex items-start justify-between gap-4">
            <span
              className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl text-white shadow-[0_14px_30px_-18px_rgba(0,0,0,0.6)] transition duration-300 group-hover:scale-110"
              style={{
                backgroundImage: `linear-gradient(135deg, ${project.color}, #00C2FF)`,
              }}
            >
              <Icon className="h-8 w-8" />
            </span>
            <span className="rounded-full border border-border bg-background/55 px-3 py-1 text-xs font-semibold text-muted-text">
              Project {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <h3 className="mt-6 font-display text-xl font-bold leading-snug text-foreground">
            {project.name}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-text">
            {project.description}
          </p>

          <div className="mt-6">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-text">
              Includes
            </div>
            {isSdgEducationProgram ? (
              <SdgEducationIncludesTree />
            ) : (
              <ul className="grid gap-2.5">
                {project.includes.map((activity) => (
                  <li
                    key={activity}
                    className="flex items-start gap-2 text-sm leading-snug text-foreground"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-leaf" />
                    <span>{activity}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-6 rounded-2xl border border-cyan-glow/25 bg-background/60 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-text">
              Estimated Cost
            </div>
            <div className="mt-2 grid gap-2">
              {project.costItems.map((item) => (
                <div key={`${item.label ?? "cost"}-${item.value}`}>
                  {item.label && (
                    <div className="text-xs font-semibold text-muted-text">
                      {item.label}
                    </div>
                  )}
                  <div className="font-display text-lg font-bold text-foreground">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-5">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-text">
              Related SDGs
            </div>
            <div className="flex flex-wrap gap-2">
              {project.sdgs.map((sdg) => (
                <span
                  key={sdg}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-3 py-1.5 text-xs font-semibold text-foreground"
                >
                  <Check className="h-3.5 w-3.5 text-leaf" />
                  {sdg}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>
    </FadeUp>
  );
}

export default function ProjectsPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="relative isolate flex min-h-[78vh] items-center overflow-hidden px-6 py-16 sm:py-20 lg:py-24">
        <div className="absolute inset-0 -z-30 overflow-hidden">
          <Image
            src="/PROJECT PIC.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-white/40 dark:bg-[rgba(5,11,24,0.58)]" />
        </div>
        <div className="absolute inset-0 -z-20 bg-gradient-to-br from-background/95 via-background/76 to-background/42 dark:from-[#050B18]/96 dark:via-[#050B18]/80 dark:to-[#050B18]/46" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-background to-transparent" />

        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
          <FadeUp>
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-glow backdrop-blur-xl">
                <Sparkles className="h-4 w-4" />
                Projects
              </span>
              <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] text-foreground sm:text-5xl lg:text-7xl">
                Our SDG <span className="grad-text">Projects</span>
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-text md:text-lg">
                Creating measurable impact through education, sustainability,
                environmental initiatives and community development.
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-text md:text-base">
                Empowering schools, students, NGOs, volunteers and CSR partners
                through real-world Sustainable Development Goal initiatives.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#projects"
                  className="btn-arrow inline-flex items-center justify-center gap-2 rounded-full bg-cta px-7 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(255,122,0,0.45)] transition hover:brightness-110"
                >
                  Explore Projects <ArrowRight className="arr h-4 w-4" />
                </a>
                <Link
                  href="/work-with-us"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card/70 px-7 py-3 text-sm font-semibold text-foreground backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-cyan-glow/50"
                >
                  Become a Partner <HeartHandshake className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={120}>
            <div className="grid gap-4 lg:pl-6">
              {[
                { label: "Education", icon: GraduationCap, color: "#155DFC" },
                { label: "Sustainability", icon: Leaf, color: "#00B050" },
                { label: "Environment", icon: Sprout, color: "#56C02B" },
                { label: "Partnerships", icon: HeartHandshake, color: "#FF7A00" },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="glass flex items-center gap-4 rounded-3xl p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-glow/45"
                  >
                    <span
                      className="grid h-12 w-12 place-items-center rounded-2xl text-white"
                      style={{ backgroundColor: item.color }}
                    >
                      <Icon className="h-6 w-6" />
                    </span>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-text">
                         {index + 1}
                      </div>
                      <div className="font-display text-lg font-bold text-foreground">
                        {item.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </FadeUp>
        </div>
      </section>

      <section id="projects" className="scroll-mt-20 px-6 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Our Projects"
            title="Real-world initiatives ready for schools, NGOs and CSR partners"
            subtitle="Choose a focused project model, align it with the relevant SDGs, and activate it with clear resources, coordination and reporting."
          />

          <div className="mt-12 grid gap-7 md:grid-cols-2">
            {projects.map((project, index) => (
              <ProjectCard key={project.name} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Project Operational Requirements"
            title="Resources that keep every project organized"
            subtitle="Each initiative can be coordinated with the right school contacts, volunteer support, materials and media documentation."
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {operationalRequirements.map((item, index) => {
              const Icon = item.icon;
              return (
                <FadeUp key={item.title} delay={index * 60}>
                  <div className="glass group flex h-full min-h-40 flex-col justify-between rounded-3xl p-6 transition duration-300 hover:-translate-y-2 hover:border-cyan-glow/45 hover:shadow-[0_24px_60px_-30px_rgba(0,194,255,0.55)]">
                    <span
                      className="grid h-12 w-12 place-items-center rounded-2xl text-white transition duration-300 group-hover:scale-110"
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${item.color}, #00C2FF)`,
                      }}
                    >
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-6 font-display text-lg font-bold text-foreground">
                      {item.title}
                    </h3>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Our Impact"
            title="Measured outcomes across learning and sustainability"
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {impactStats.map((stat, index) => (
              <FadeUp key={stat.label} delay={index * 45}>
                <div className="glass lift rounded-3xl p-6 text-center">
                  <div
                    className="font-display text-3xl font-bold md:text-4xl"
                    style={{ color: stat.color }}
                  >
                    <Counter to={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="mt-3 text-sm font-medium text-muted-text">
                    {stat.label}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="SDGs We Support"
            title="Focused Sustainable Development Goals"
            subtitle="Projects are mapped to high-priority goals where education, environment, clean energy and livelihoods create durable community value."
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {supportedSdgs.map((sdg, index) => (
              <FadeUp key={sdg.name} delay={index * 60}>
                <div
                  className="group relative min-h-44 overflow-hidden rounded-3xl p-6 shadow-[0_24px_70px_-34px_rgba(0,0,0,0.65)] transition duration-300 hover:-translate-y-2"
                  style={{ backgroundColor: sdg.color }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10 opacity-80 transition duration-300 group-hover:opacity-100" />
                  <div className={sdg.darkText ? "relative text-[#101D33]" : "relative text-white"}>
                    <span className="text-4xl" aria-hidden="true">
                      {sdg.icon}
                    </span>
                    <h3 className="mt-6 font-display text-2xl font-bold leading-tight">
                      {sdg.name}
                    </h3>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="How To Participate"
            title="A simple path from project choice to impact report"
          />

          <FadeUp delay={80}>
            <div className="mt-12 flex flex-col gap-4 md:flex-row md:items-stretch">
              {participationSteps.map((step, index) => (
                <div key={step} className="flex flex-1 flex-col gap-4 md:flex-row">
                  <div className="glass flex min-h-44 flex-1 flex-col items-center justify-center rounded-3xl p-6 text-center transition duration-300 hover:-translate-y-2 hover:border-cyan-glow/45">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-cta font-display text-lg font-bold text-white shadow-[0_0_22px_rgba(255,122,0,0.35)]">
                      {index + 1}
                    </span>
                    <h3 className="mt-5 font-display text-lg font-bold text-foreground">
                      {step}
                    </h3>
                  </div>
                  {index < participationSteps.length - 1 && (
                    <div className="flex items-center justify-center text-cyan-glow md:px-1">
                      <ArrowDown className="h-6 w-6 md:hidden" />
                      <ArrowRight className="hidden h-6 w-6 md:block" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="bg-[linear-gradient(135deg,rgba(21,93,252,0.95),rgba(0,168,168,0.92),rgba(0,176,80,0.9))] px-6 py-16 text-white sm:py-20">
        <FadeUp>
          <div className="mx-auto max-w-7xl text-center">
            <div className="mx-auto max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] backdrop-blur-xl">
                <Target className="h-4 w-4" />
                Take Action
              </span>
              <h2 className="mt-6 font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                Together We Can Build a Sustainable Future
              </h2>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/get-involved/volunteer"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0D1B3E] transition hover:-translate-y-0.5 hover:bg-white/90"
                >
                  Become a Volunteer
                </Link>
                <Link
                  href="/work-with-us"
                  className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/20"
                >
                  Partner with STEPUP
                </Link>
                <Link
                  href="/get-involved/sponsor"
                  className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/20"
                >
                  CSR Partnership
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/20"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>
    </div>
  );
}
