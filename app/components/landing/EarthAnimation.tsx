"use client";

import Image from "next/image";

type Props = {
  isLaunching: boolean;
  onExplore: () => void;
  reduceMotion: boolean;
};

export default function EarthAnimation({
  isLaunching,
  onExplore,
  reduceMotion,
}: Props) {
  return (
    <section
      className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 text-center"
      data-reduce-motion={reduceMotion ? "true" : "false"}
    >
      <div aria-hidden="true" className="sdg-earth-aura" />

      <h1 className="relative z-30 mb-8 text-[clamp(2rem,4.8vw,4.3rem)] font-bold uppercase leading-tight text-white drop-shadow-[0_0_30px_rgba(56,189,248,0.55)]">
        STEPUP FOR SDG
      </h1>

      <button
        aria-label="Open Sustainable Development Goals hero"
        className="sdg-globe-button group"
        data-launching={isLaunching ? "true" : "false"}
        disabled={isLaunching}
        onClick={onExplore}
        type="button"
      >
        <div className="sdg-earth-image-shell sdg-earth-spin">
          <Image
            alt="Rotating Earth"
            className="object-cover object-center scale-[1.18]"
            fill
            priority
            sizes="(max-width: 768px) 72vw, 28rem"
            src="/earth.png"
          />
        </div>
      </button>
    </section>
  );
}
