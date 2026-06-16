import SDGCard from "./SDGCard";
import { sdgs } from "../data/sdgs";

export default function SDGGrid() {
  return (
    <section
      className="
      min-h-screen
      bg-black
      p-10
      "
    >
      <h1
        className="
        text-white
        text-5xl
        font-bold
        text-center
        mb-12
        "
      >
        Select a Sustainable Development Goal
      </h1>

      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        gap-6
        "
      >
        {sdgs.map((sdg) => (
          <SDGCard
            key={sdg.id}
            id={sdg.id}
            title={sdg.title}
            color={sdg.color}
          />
        ))}
      </div>
    </section>
  );
}