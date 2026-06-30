import type { Metadata } from "next";
<<<<<<< HEAD

export const metadata: Metadata = {
  title: "Partners — StepUp for SDG",
};

export default function PartnersPage() {
  return <></>;
=======
import { PartnersExperience } from "@/app/components/partners/PartnersExperience";

export const metadata: Metadata = {
  title: "Partners — StepUp for SDG",
  description:
    "Partner with StepUp for SDG — connect schools, NGOs, companies and universities to create measurable SDG impact across India.",
};

export default function PartnersPage() {
  return <PartnersExperience />;
>>>>>>> 209ba8992e49e77b121623b98a6243fe1d57f13a
}
