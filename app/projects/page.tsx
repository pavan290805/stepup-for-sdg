import Link from "next/link";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  ArrowDown,
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  Flag,
  HeartHandshake,
  Leaf,
  Mic,
  Package,
  School,
  Sparkles,
  Sun,
  Target,
  TreePine,
  Users,
  Video,
} from "lucide-react";
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
    name: "SDG Education for Students",
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
    backgroundImage: "/sdg/sdg certt.png",
  },
  {
    name: "Sustainability Education Program",
    description:
      "Providing solar lamps to rural schools and underserved communities to improve access to clean energy.",
    includes: ["Solar Lamp Distribution"],
    costItems: [{ value: "Contact Us" }],
    sdgs: ["Affordable & Clean Energy", "Climate Action"],
    icon: Sun,
    color: "#FCC30B",
    backgroundImage: "/sdg/ld.png",
  },
  {
    name: "Fellowship",
    description:
      "Industry experts guide students toward future careers, innovation, entrepreneurship and higher education opportunities.",
    includes: ["Career Exposure Program"],
    costItems: [{ value: "₹100 per participant" }],
    sdgs: ["Quality Education", "Decent Work & Economic Growth"],
    icon: Briefcase,
    color: "#A21942",
    backgroundImage: "/sdg/cg.png",
  },
  {
    name: "Water Conservation Program",
    description:
      "Promoting sustainable water conservation by implementing rainwater harvesting systems in schools and communities.",
    includes: ["Rainwater Harvesting"],
    costItems: [{ value: "Contact Us" }],
    sdgs: ["Clean Water & Sanitation", "Climate Action"],
    icon: Leaf,
    color: "#26BDE2",
    backgroundImage: "/sdg/rw.png",
  },
  {
    name: "Clean Community Initiative",
    description:
      "Community cleanliness campaigns encouraging environmental responsibility and sustainable living.",
    includes: ["Community Clean Drive"],
    costItems: [{ value: "Contact Us" }],
    sdgs: ["Climate Action", "Life on Land"],
    icon: TreePine,
    color: "#3F7E44",
    backgroundImage: "/sdg/plant.png",
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
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#64748B]">
          {eyebrow}
        </span>
        <h2 className="mt-3 font-display text-3xl font-bold text-[#0F172A] md:text-4xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#475569] md:text-base">
            {subtitle}
          </p>
        )}
      </div>
    </FadeUp>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isReversed = index % 2 === 1;
  const imageOrder = isReversed ? "lg:order-2" : "lg:order-1";
  const contentOrder = isReversed ? "lg:order-1" : "lg:order-2";

  return (
    <FadeUp delay={index * 45}>
      <article className="group grid overflow-hidden rounded-[1.5rem] border border-[#E2E8F0] bg-white p-4 shadow-[0_18px_55px_-36px_rgba(15,23,42,0.28)] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-2 hover:border-[#CBD5E1] hover:shadow-[0_32px_80px_-42px_rgba(15,23,42,0.34)] lg:grid-cols-[minmax(0,0.48fr)_minmax(0,0.52fr)] lg:gap-8 lg:p-6">
        <div
          className={`${imageOrder} relative min-h-[260px] overflow-hidden rounded-[1.25rem] shadow-[0_20px_45px_-32px_rgba(15,23,42,0.32)] sm:min-h-[340px] lg:min-h-[520px]`}
        >
          <Image
            src={project.backgroundImage}
            alt={`${project.name} project placeholder`}
            fill
            sizes="(min-width: 1024px) 48vw, 100vw"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/25"
          />
          <span
            className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/85 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#475569] shadow-[0_12px_30px_-18px_rgba(15,23,42,0.35)] backdrop-blur-md"
          >
            Project {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div
          className={`${contentOrder} flex flex-col justify-center px-2 py-7 sm:px-4 sm:py-9 lg:px-6 lg:py-12`}
        >
          <h3 className="font-display text-3xl font-bold leading-tight text-[#0F172A] md:text-4xl">
            {project.name}
          </h3>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#475569]">
            {project.description}
          </p>

          <div className="mt-8">
            <Link
              href="/work-with-us"
              className="btn-arrow inline-flex items-center justify-center gap-2 rounded-full bg-cta px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_-16px_rgba(255,122,0,0.9)] transition duration-300 hover:brightness-110"
            >
              Start This Project <ArrowRight className="arr h-4 w-4" />
            </Link>
          </div>
        </div>
      </article>
    </FadeUp>
  );
}

export default function ProjectsPage() {
  return (
    <div className="bg-white text-[#0F172A]">
      <section className="relative isolate flex min-h-[78vh] items-center overflow-hidden bg-white px-6 py-20 sm:py-24 lg:py-32">
        <div className="absolute inset-0 -z-30 overflow-hidden">
          <Image
            src="/PROJECT PIC.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-100"
          />
          <div className="absolute inset-0 bg-white/15" />
        </div>
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_18%,rgba(37,99,235,0.12),transparent_34%),radial-gradient(circle_at_82%_22%,rgba(14,165,233,0.12),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.72)_0%,rgba(248,250,252,0.82)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-white to-transparent" />

        <div className="mx-auto flex w-full max-w-7xl items-center justify-center text-center">
          <FadeUp>
            <div className="mx-auto max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#64748B] shadow-[0_16px_40px_-28px_rgba(15,23,42,0.32)] backdrop-blur-xl">
                <Sparkles className="h-4 w-4 text-[#2563EB]" />
                Projects
              </span>
              <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] text-[#0F172A] sm:text-5xl lg:text-7xl">
                Our <span className="text-[#0F172A]">Projects</span>
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#475569] md:text-lg">
                Creating measurable impact through education, sustainability,
                environmental initiatives and community development.
              </p>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#475569] md:text-base">
                Empowering schools, students, NGOs, volunteers and CSR partners
                through real-world Sustainable Development Goal initiatives.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  href="#projects"
                  className="btn-arrow inline-flex items-center justify-center gap-2 rounded-full bg-cta px-7 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(255,122,0,0.45)] transition hover:brightness-110"
                >
                  Explore Projects <ArrowRight className="arr h-4 w-4" />
                </a>
                <Link
                  href="/work-with-us"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#CBD5E1] bg-white/90 px-7 py-3 text-sm font-semibold text-[#0F172A] shadow-[0_14px_35px_-26px_rgba(15,23,42,0.36)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-[#93C5FD] hover:bg-white"
                >
                  Become a Partner <HeartHandshake className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <section id="projects" className="scroll-mt-20 bg-[#F8FAFC] px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Our Projects"
            title="Real-world initiatives ready for schools, NGOs and CSR partners"
            subtitle="Choose a focused project model, align it with the relevant SDGs, and activate it with clear resources, coordination and reporting."
          />

          <div className="mt-12 grid gap-10">
            {projects.map((project, index) => (
              <ProjectCard key={project.name} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 sm:py-24">
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
                  <div className="group flex h-full min-h-40 flex-col justify-between rounded-[1.5rem] border border-[#E2E8F0] bg-white p-6 shadow-[0_18px_45px_-32px_rgba(15,23,42,0.30)] transition duration-300 hover:-translate-y-2 hover:border-[#BFDBFE] hover:shadow-[0_26px_65px_-36px_rgba(37,99,235,0.28)]">
                    <span
                      className="grid h-12 w-12 place-items-center rounded-2xl text-white transition duration-300 group-hover:scale-110"
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${item.color}, #00C2FF)`,
                      }}
                    >
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-6 font-display text-lg font-bold text-[#0F172A]">
                      {item.title}
                    </h3>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAFC] px-6 py-20 sm:py-24">
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
                  className="group relative min-h-44 overflow-hidden rounded-[1.5rem] border border-[#E2E8F0] bg-white p-6 shadow-[0_18px_45px_-32px_rgba(15,23,42,0.30)] transition duration-300 hover:-translate-y-2 hover:border-[#CBD5E1] hover:shadow-[0_26px_65px_-36px_rgba(15,23,42,0.30)]"
                >
                  <div
                    className="absolute inset-x-0 top-0 h-1 transition duration-300 group-hover:h-1.5"
                    style={{ backgroundColor: sdg.color }}
                  />
                  <div className="relative text-[#0F172A]">
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

      <section className="bg-white px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="How To Participate"
            title="A simple path from project choice to impact report"
          />

          <FadeUp delay={80}>
            <div className="mt-12 flex flex-col gap-4 md:flex-row md:items-stretch">
              {participationSteps.map((step, index) => (
                <div key={step} className="flex flex-1 flex-col gap-4 md:flex-row">
                  <div className="flex min-h-44 flex-1 flex-col items-center justify-center rounded-[1.5rem] border border-[#E2E8F0] bg-white p-6 text-center shadow-[0_18px_45px_-32px_rgba(15,23,42,0.30)] transition duration-300 hover:-translate-y-2 hover:border-[#BFDBFE] hover:shadow-[0_26px_65px_-36px_rgba(37,99,235,0.28)]">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-cta font-display text-lg font-bold text-white shadow-[0_0_22px_rgba(255,122,0,0.35)]">
                      {index + 1}
                    </span>
                    <h3 className="mt-5 font-display text-lg font-bold text-[#0F172A]">
                      {step}
                    </h3>
                  </div>
                  {index < participationSteps.length - 1 && (
                    <div className="flex items-center justify-center text-[#2563EB] md:px-1">
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

      <section className="bg-[#F8FAFC] px-6 py-20 sm:py-24">
        <FadeUp>
          <div className="mx-auto max-w-7xl rounded-[1.5rem] border border-[#E2E8F0] bg-white px-6 py-12 text-center shadow-[0_24px_80px_-48px_rgba(15,23,42,0.32)] sm:px-10 sm:py-14">
            <div className="mx-auto max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#64748B] backdrop-blur-xl">
                <Target className="h-4 w-4 text-[#2563EB]" />
                Take Action
              </span>
              <h2 className="mt-6 font-display text-3xl font-bold leading-tight text-[#0F172A] sm:text-4xl lg:text-5xl">
                Together We Can Build a Sustainable Future
              </h2>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/get-involved/volunteer"
                  className="inline-flex items-center justify-center rounded-full bg-cta px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_-16px_rgba(255,122,0,0.9)] transition hover:-translate-y-0.5 hover:brightness-110"
                >
                  Become a Volunteer
                </Link>
                <Link
                  href="/work-with-us"
                  className="inline-flex items-center justify-center rounded-full border border-[#CBD5E1] bg-white px-6 py-3 text-sm font-semibold text-[#0F172A] shadow-[0_12px_30px_-22px_rgba(15,23,42,0.32)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-[#93C5FD] hover:bg-[#F8FAFC]"
                >
                  Partner with STEPUP
                </Link>
                <Link
                  href="/get-involved/sponsor"
                  className="inline-flex items-center justify-center rounded-full border border-[#CBD5E1] bg-white px-6 py-3 text-sm font-semibold text-[#0F172A] shadow-[0_12px_30px_-22px_rgba(15,23,42,0.32)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-[#93C5FD] hover:bg-[#F8FAFC]"
                >
                  CSR Partnership
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-[#CBD5E1] bg-white px-6 py-3 text-sm font-semibold text-[#0F172A] shadow-[0_12px_30px_-22px_rgba(15,23,42,0.32)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-[#93C5FD] hover:bg-[#F8FAFC]"
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
