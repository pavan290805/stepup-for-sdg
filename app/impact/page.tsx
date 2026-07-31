import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const headingFont =
  '"Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif';

const heroImage =
  "/assets/images/WhatsApp%20Image%202026-07-20%20at%209.30.49%20PM.jpeg";

const fourthImage =
  "/assets/images/4.jpeg";

type ImpactMetric = {
  icon: LucideIcon;
  value: string;
  label: string;
};

type ImpactSection = {
  number: string;
  title: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  metrics: ImpactMetric[];
};

const sections: ImpactSection[] = [
  {
    number: "01",
    title: "SDG Education for Students",
    image: "/assets/images/1.jpeg",
    imageAlt: "Students learning about the Sustainable Development Goals in a classroom",
    metrics: [
      { icon: "School", value: "150+", label: "Schools Reached" },
      { icon: "GraduationCap", value: "18,500+", label: "Students Educated" },
      { icon: "Users", value: "320+", label: "SDG Workshops" },
      { icon: "Award", value: "12,000+", label: "Certificates Issued" },
    ],
  },
  {
    number: "02",
    title: "Sustainability Education Program",
    image: fourthImage,
    imageAlt: "Students exploring different career paths and industry opportunities",
    metrics: [
      { icon: "BriefcaseBusiness", value: "250+", label: "Career Sessions" },
      { icon: "Handshake", value: "20+", label: "Industry Experts" },
      { icon: "GraduationCap", value: "10,000+", label: "Students Reached" },
      { icon: "Sparkles", value: "95%", label: "Positive Feedback" },
    ],
  },
  {
    number: "03",
    title: "Fellowship",
    image: "/sdg/cg.png",
    imageAlt: "Industry experts guiding students toward future careers and innovation",
    metrics: [
      { icon: "Briefcase", value: "100+", label: "Fellows Enrolled" },
      { icon: "Star", value: "50+", label: "Mentors & Experts" },
      { icon: "GraduationCap", value: "5,000+", label: "Students Guided" },
      { icon: "Sparkles", value: "90%", label: "Placement Rate" },
    ],
  },
  {
    number: "04",
    title: "Water Conservation Program",
    image: "/assets/images/2.jpeg",
    imageAlt: "Students gathered around a rainwater harvesting system",
    metrics: [
      { icon: "Droplets", value: "125+", label: "Awareness Sessions" },
      { icon: "School", value: "60+", label: "Schools Involved" },
      { icon: "Recycle", value: "40+", label: "Harvesting Systems" },
      { icon: "Users", value: "50,000+", label: "Students Benefited" },
    ],
  },
  {
    number: "05",
    title: "Clean Community Initiative",
    image: "/assets/images/3.jpeg",
    imageAlt: "Volunteers cleaning a public space during a community drive",
    metrics: [
      { icon: "Trash2", value: "200+", label: "Clean Drives" },
      { icon: "Users", value: "15,000+", label: "Volunteers Engaged" },
      { icon: "Trees", value: "100+", label: "Communities Covered" },
      { icon: "Leaf", value: "30 Tons+", label: "Waste Collected" },
    ],
  },
];

export const metadata: Metadata = {
  title: "Our Impact — StepUp for SDG",
  description:
    "A visual overview of StepUp for SDG's classroom, sustainability, and community programmes.",
};
// The interactive client-side components have been moved to ImpactClient.tsx
// to keep this file a Server Component (required for `metadata`).

import ImpactClient from "./ImpactClient";

export default function ImpactPage() {
  // Render the client-side interactive component and pass data
  return <ImpactClient sections={sections} heroImage={heroImage} />;
}
