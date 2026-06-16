"use client";

import { useRouter } from "next/navigation";

type Props = {
  id: number;
  title: string;
  color: string;
};

export default function SDGCard({
  id,
  title,
  color,
}: Props) {
  const router = useRouter();

  return (
    <div
      onClick={() =>
        router.push(`/sdg/${id}`)
      }
      style={{
        backgroundColor: color,
      }}
      className="
      p-6
      rounded-2xl
      text-white
      cursor-pointer
      hover:scale-105
      transition-all
      duration-300
      shadow-xl
      min-h-[180px]
      flex
      flex-col
      justify-center
      items-center
      "
    >
      <h1 className="text-5xl font-bold">
        {id}
      </h1>

      <p className="mt-4 text-center font-semibold">
        {title}
      </p>
    </div>
  );
}