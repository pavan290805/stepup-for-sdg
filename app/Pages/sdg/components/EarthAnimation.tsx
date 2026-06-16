"use client";

type Props = {
  onExplore: () => void;
};

export default function EarthAnimation({ onExplore }: Props) {
  return (
    <section
      className="
        h-screen
        bg-black
        flex
        flex-col
        justify-center
        items-center
        text-white
      "
    >
      <img
        src="/earth.png"
        alt="Earth"
        className="w-72 h-72 earth-rotate cursor-pointer"
        onClick={onExplore}
      />

      <h1 className="text-5xl font-bold mt-10">
        Step Up For SDGs
      </h1>

      <p className="mt-4 text-gray-400">
        Click the Earth to Explore
      </p>
    </section>
  );
}