import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSdgById, sdgs, withAlpha } from "../data/sdgs";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return sdgs.map((sdg) => ({
    id: String(sdg.id),
  }));
}

export default async function SDGDetailPage({ params }: PageProps) {
  const { id } = await params;
  const goalId = Number(id);

  if (!Number.isInteger(goalId)) {
    notFound();
  }

  const sdg = getSdgById(goalId);

  if (!sdg) {
    notFound();
  }

  const imagePath = `/sdg/goal-${String(sdg.id).padStart(2, "0")}.png`;

  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-5 py-8 text-white sm:px-8 lg:px-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(56,189,248,0.22),transparent_28%),radial-gradient(circle_at_18%_88%,rgba(45,212,191,0.16),transparent_32%),linear-gradient(180deg,#020617_0%,#06172a_52%,#000_100%)]" />
      <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(circle,rgba(255,255,255,0.72)_1px,transparent_1px)] [background-size:34px_34px]" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl flex-col justify-center">
        <Link
          className="mb-8 inline-flex w-fit rounded-full border border-white/14 bg-white/8 px-5 py-3 text-sm font-semibold text-slate-100 backdrop-blur-md transition hover:border-cyan-200/60 hover:bg-white/12"
          href="/Pages/sdg"
        >
          Back to Goals
        </Link>

        <section
          className="grid items-center gap-10 rounded-lg border border-white/12 bg-white/8 p-5 shadow-[0_28px_80px_-44px_rgba(0,0,0,0.95)] backdrop-blur-md sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-10"
          style={{ boxShadow: `0 28px 90px -46px ${withAlpha(sdg.color, 0.78)}` }}
        >
          <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-lg shadow-[0_22px_52px_-28px_rgba(0,0,0,0.9)]">
            <Image
              alt={`SDG Goal ${sdg.id}: ${sdg.title}`}
              className="object-cover"
              fill
              priority
              sizes="(max-width: 1024px) 80vw, 24rem"
              src={imagePath}
            />
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-100/80">
              Goal Number {sdg.id}
            </p>
            <h1 className="mt-5 text-balance text-[clamp(2.4rem,6vw,5rem)] font-extrabold leading-none text-white">
              {sdg.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-100/82">
              Detailed information about SDG Goal {sdg.id}.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
