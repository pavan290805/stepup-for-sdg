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

  const previousGoal = sdgs[(sdg.id + sdgs.length - 2) % sdgs.length];
  const nextGoal = sdgs[sdg.id % sdgs.length];

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#020617_0%,#020817_58%,#000000_100%)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(99,102,241,0.16),transparent_28%),radial-gradient(circle_at_bottom,rgba(14,165,233,0.12),transparent_34%)]" />
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full blur-[150px]" style={{ backgroundColor: withAlpha(sdg.color, 0.26) }} />

        <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link
              className="inline-flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/6 px-5 py-3 text-sm tracking-[0.2em] text-slate-100/88 transition hover:border-white/20 hover:bg-white/10"
              href="/sdg"
            >
              Back to all goals
            </Link>
            <span className="text-xs uppercase tracking-[0.38em] text-sky-100/62">Goal detail placeholder</span>
          </div>

          <article
            className="relative mt-10 overflow-hidden rounded-[2rem] border bg-white/6 p-6 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:p-8 lg:p-10"
            style={{
              borderColor: withAlpha(sdg.color, 0.42),
              boxShadow: `0 30px 90px -40px ${withAlpha(sdg.color, 0.5)}`,
            }}
          >
            <div className="absolute inset-x-0 top-0 h-2" style={{ backgroundColor: sdg.color }} />

            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <span
                  className="inline-flex rounded-full px-4 py-2 text-xs uppercase tracking-[0.36em] text-white"
                  style={{ backgroundColor: withAlpha(sdg.color, 0.26) }}
                >
                  Goal {String(sdg.id).padStart(2, "0")}
                </span>
                <h1
                  className="mt-6 text-balance text-4xl font-semibold tracking-[0.12em] text-white sm:text-5xl"
                  style={{ fontFamily: "\"Arial Narrow\", \"Trebuchet MS\", sans-serif" }}
                >
                  {sdg.title}
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200/78">{sdg.summary}</p>
                <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300/68">
                  This page is a polished placeholder route for your team project. It is ready to receive richer content such as
                  student learning modules, local case studies, actions, data stories, and impact metrics for this goal.
                </p>

                <div className="mt-10 flex flex-wrap gap-4">
                  <Link
                    className="rounded-full border border-white/12 bg-white/6 px-5 py-3 text-sm tracking-[0.18em] text-slate-100/88 transition hover:border-white/24 hover:bg-white/10"
                    href={`/sdg/${previousGoal.id}`}
                  >
                    Previous goal
                  </Link>
                  <Link
                    className="rounded-full border border-white/12 bg-white/6 px-5 py-3 text-sm tracking-[0.18em] text-slate-100/88 transition hover:border-white/24 hover:bg-white/10"
                    href={`/sdg/${nextGoal.id}`}
                  >
                    Next goal
                  </Link>
                </div>
              </div>

              <div className="space-y-5">
                <section className="rounded-[1.6rem] border border-white/10 bg-black/20 p-6">
                  <p className="text-xs uppercase tracking-[0.34em] text-sky-100/58">Focus areas</p>
                  <div className="mt-5 space-y-3">
                    {sdg.focusAreas.map((focusArea) => (
                      <div
                        key={focusArea}
                        className="rounded-2xl border border-white/8 px-4 py-4 text-sm leading-6 text-slate-100/82"
                        style={{ backgroundColor: withAlpha(sdg.color, 0.08) }}
                      >
                        {focusArea}
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-[1.6rem] border border-white/10 bg-black/20 p-6">
                  <p className="text-xs uppercase tracking-[0.34em] text-sky-100/58">Page status</p>
                  <p className="mt-4 text-sm leading-7 text-slate-200/72">
                    Placeholder content is live for all 17 SDGs so navigation works today, while leaving space for your team to
                    expand each goal page later without reworking the route structure.
                  </p>
                </section>
              </div>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
