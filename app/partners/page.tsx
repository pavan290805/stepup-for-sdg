import type { Metadata } from "next";
import { PartnersExperience } from "@/app/components/partners/PartnersExperience";

export const metadata: Metadata = {
  title: "Partners — StepUp for SDG",
  description:
    "Partner with StepUp for SDG — connect schools, NGOs, companies and universities to create measurable SDG impact across India.",
};

export default function PartnersPage() {
  return <PartnersExperience />;
}
