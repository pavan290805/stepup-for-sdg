import Image from "next/image"
import Link from "next/link"

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`}>
      <Image
        src="/images/logo-sdg.png"
        alt="StepUp for SDG logo"
        width={45}
        height={45}
        className="h-10 w-10 object-contain"
      />
      <span className="flex flex-col leading-none">
        <span className="font-heading text-lg font-extrabold tracking-tight text-navy">
          StepUp
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
          for SDG
        </span>
      </span>
    </Link>
  )
}
