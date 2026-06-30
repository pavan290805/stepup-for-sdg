"use client";

type Props = {
  isActive: boolean;
  reduceMotion: boolean;
};

export default function TransitionOverlay({ isActive, reduceMotion }: Props) {
  return (
    <div
      aria-hidden="true"
      className="sdg-transition-overlay"
      data-active={isActive ? "true" : "false"}
      data-reduce-motion={reduceMotion ? "true" : "false"}
    >
      <div className="sdg-transition-flash" />
      <div className="sdg-transition-black" />
    </div>
  );
}
