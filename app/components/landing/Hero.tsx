"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
  onOpenHome: () => void;
  reduceMotion: boolean;
};

export default function Hero({ onOpenHome, reduceMotion }: Props) {
  const router = useRouter();

  const openExistingHome = () => {
    router.push("/");
    onOpenHome();
  };

  return (
    <section
      className="relative z-10 flex min-h-screen items-center overflow-hidden px-5 py-16 sm:px-8 lg:px-12"
      data-reduce-motion={reduceMotion ? "true" : "false"}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_44%,rgba(34,211,238,0.18),transparent_30%),radial-gradient(circle_at_18%_65%,rgba(14,165,233,0.14),transparent_34%)]" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.9fr)]">
        <div className="max-w-[43rem]">
          <h2 className="text-balance text-[clamp(2.8rem,6.3vw,5.7rem)] font-extrabold leading-[0.95] text-white">
            Sustainable Development Goals
          </h2>
          <p className="mt-6 text-[clamp(1.05rem,2vw,1.7rem)] font-medium text-slate-100/90">
            17 Goals to Transform Our World
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-4 sm:justify-start">
            <button
              className="inline-flex items-center gap-2 rounded-full border border-cyan-200/55 bg-white/10 px-7 py-3 text-sm font-semibold text-white shadow-[0_0_28px_rgba(34,211,238,0.28)] backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-cyan-100 hover:bg-cyan-300/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/80"
              onClick={openExistingHome}
              type="button"
            >
              GET INTO SDG WORLD
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="relative mx-auto h-[min(72vw,34rem)] w-[min(72vw,34rem)] min-w-[17rem] lg:mr-0">
          <div aria-hidden="true" className="absolute inset-[-14%] rounded-full bg-cyan-400/15 blur-3xl" />
          <div className="relative h-full w-full overflow-hidden rounded-full shadow-[0_0_70px_rgba(56,189,248,0.3)] sdg-earth-spin">
            <Image
              alt="Earth"
              className="object-cover object-center scale-[1.18]"
              fill
              priority
              sizes="(max-width: 768px) 72vw, 34rem"
              src="/earth.png"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
