// Central data + types for the SDG Events page.
// Images use Unsplash (images.unsplash.com is allow-listed in next.config.ts).

export type EventCategory =
  | "School Drives"
  | "Workshops"
  | "CSR Meets"
  | "NGO Collaboration"
  | "Youth Challenges";

export type SdgEvent = {
  id: string;
  title: string;
  day: string;
  month: string;
  year: string;
  fullDate: string;
  location: string;
  description: string;
  category: EventCategory;
  tags: string[];
  image: string;
  accent: string; // brand colour used for badges / glow per card
};

export const FILTERS = [
  "All Events",
  "School Drives",
  "Workshops",
  "CSR Meets",
  "NGO Collaboration",
  "Youth Challenges",
] as const;

export type Filter = (typeof FILTERS)[number];

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

export const EVENTS: SdgEvent[] = [
  {
    id: "school-transformation-drive",
    title: "School Transformation Drive",
    day: "12",
    month: "Jul",
    year: "2026",
    fullDate: "12 July 2026",
    location: "Hyderabad, Telangana",
    description:
      "Volunteers and partner schools collaborate to improve classrooms, learning corners, and student engagement.",
    category: "School Drives",
    tags: ["SDG 4", "Education", "Volunteers"],
    image: img("photo-1577896851231-70ef18881754"),
    accent: "#0066cc",
  },
  {
    id: "csr-education-partnership-meet",
    title: "CSR Education Partnership Meet",
    day: "20",
    month: "Jul",
    year: "2026",
    fullDate: "20 July 2026",
    location: "Bengaluru / Online",
    description:
      "Companies, NGOs, and educators discuss transparent CSR funding for measurable education impact.",
    category: "CSR Meets",
    tags: ["CSR", "Partnership", "SDG 17"],
    image: img("photo-1542744173-8e7e53415bb0"),
    accent: "#7b61ff",
  },
  {
    id: "digital-learning-workshop",
    title: "Digital Learning Workshop",
    day: "28",
    month: "Jul",
    year: "2026",
    fullDate: "28 July 2026",
    location: "Vijayawada, Andhra Pradesh",
    description:
      "Training session for students on digital literacy, AI tools, and safe technology usage.",
    category: "Workshops",
    tags: ["SDG 4", "Digital", "Students"],
    image: img("photo-1531545514256-b1400bc00f31"),
    accent: "#00a8a8",
  },
  {
    id: "ngo-collaboration-summit",
    title: "NGO Collaboration Summit",
    day: "05",
    month: "Aug",
    year: "2026",
    fullDate: "5 August 2026",
    location: "Online",
    description:
      "NGOs working in education connect to share resources, volunteers, and rural school support plans.",
    category: "NGO Collaboration",
    tags: ["NGO", "Community", "SDG 17"],
    image: img("photo-1488521787991-ed7bbaae773c"),
    accent: "#00b050",
  },
  {
    id: "sdg-youth-innovation-challenge",
    title: "SDG Youth Innovation Challenge",
    day: "16",
    month: "Aug",
    year: "2026",
    fullDate: "16 August 2026",
    location: "Hyderabad",
    description:
      "Students present innovative ideas for SDG 4 Quality Education and community development.",
    category: "Youth Challenges",
    tags: ["SDG 4", "Innovation", "Youth"],
    image: img("photo-1521737604893-d14cc237f11d"),
    accent: "#f4b400",
  },
  {
    id: "teacher-empowerment-session",
    title: "Teacher Empowerment Session",
    day: "24",
    month: "Aug",
    year: "2026",
    fullDate: "24 August 2026",
    location: "Warangal, Telangana",
    description:
      "Workshop for teachers on interactive learning methods, inclusive classrooms, and student motivation.",
    category: "Workshops",
    tags: ["SDG 4", "Teachers", "Inclusion"],
    image: img("photo-1544717305-2782549b5136"),
    accent: "#ff7a00",
  },
];

export const FEATURED_ID = "sdg-youth-innovation-challenge";

// Lightweight gallery strip (community / learning imagery)
export const GALLERY: { src: string; label: string }[] = [
  { src: img("photo-1503676260728-1c00da094a0b"), label: "Classroom learning" },
  { src: img("photo-1509062522246-3755977927d7"), label: "Young learners" },
  { src: img("photo-1427504494785-3a9ca7044f45"), label: "Workshop session" },
  { src: img("photo-1573497019940-1c28c88b4f3e"), label: "NGO collaboration" },
  { src: img("photo-1556761175-5973dc0f32e7"), label: "CSR partner meet" },
  { src: img("photo-1571260899304-425eee4c7efc"), label: "Digital learning lab" },
];
