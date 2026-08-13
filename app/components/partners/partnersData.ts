// Seed data for the Partners page experience.
// Content mirrors the approved design screenshots & enterprise partnership platform layout.

export type PartnerType =
  | "School"
  | "NGO"
  | "Company"
  | "University"
  | "UN Organization"
  | "Foundation"
  | "Government"
  | "Network";

export type Tier = "Gold" | "Silver" | "Founding" | null;

export interface PartnerOrg {
  id: string;
  name: string;
  location: string;
  type: PartnerType;
  categoryTag: string; // e.g. "UN Organization", "Technology Partner", "Foundation", "NGO", "Academic Partner"
  verified: boolean;
  tier: Tier;
  since: number;
  sdgs: number[];
  funding: string | null;
  activity: string;
  image: string;
  description: string;
  initials: string;
  logoSources: string[];
  website?: string;
}

export interface FeaturedCollaboration {
  id: string;
  title: string;
  subtitle: string;
  sdgNum: number;
  sdgName: string;
  partnerA: { name: string; logo: string; type: string };
  partnerB: { name: string; logo: string; type: string };
  summary: string;
  impactMetrics: { label: string; value: string }[];
  image: string;
}

export const FEATURED_COLLABORATIONS: FeaturedCollaboration[] = [
  {
    id: "ai-climate-impact",
    title: "AI for Climate Impact",
    subtitle: "Accelerating climate action through AI & open-source environmental data",
    sdgNum: 13,
    sdgName: "Climate Action",
    partnerA: { name: "UNDP", logo: "/assets/partners/unesco.png", type: "UN Organization" },
    partnerB: { name: "Microsoft", logo: "/assets/partners/microsoft.png", type: "Technology Partner" },
    summary:
      "Leveraging satellite imagery and predictive machine learning models to monitor forest restoration and deploy early climate risk alerts across 12 vulnerable regions.",
    impactMetrics: [
      { label: "Trees Monitored", value: "4.2M+" },
      { label: "Communities Alerted", value: "180+" },
    ],
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1200&q=80",
  },
  {
    id: "digital-learning-initiative",
    title: "Digital Learning Initiative",
    subtitle: "Expanding equal access to STEM & digital literacy for rural schools",
    sdgNum: 4,
    sdgName: "Quality Education",
    partnerA: { name: "Stanford University", logo: "/assets/partners/worldbank.png", type: "Academic Partner" },
    partnerB: { name: "Google.org", logo: "/assets/partners/google.png", type: "Technology Partner" },
    summary:
      "Deploying interactive digital learning toolkits, AI tutor assistants, and teacher capacity-building modules to over 620 public schools.",
    impactMetrics: [
      { label: "Students Reached", value: "120,000+" },
      { label: "Teachers Trained", value: "3,400+" },
    ],
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=80",
  },
  {
    id: "empowering-communities",
    title: "Empowering Communities",
    subtitle: "Sustained livelihoods & early childhood nutrition programs",
    sdgNum: 1,
    sdgName: "No Poverty",
    partnerA: { name: "World Bank", logo: "/assets/partners/worldbank.png", type: "Development Partner" },
    partnerB: { name: "UNICEF", logo: "/assets/partners/unicef.png", type: "UN Organization" },
    summary:
      "Combining micro-grant capital with localized healthcare and maternal-child health interventions across underserved urban informal settlements.",
    impactMetrics: [
      { label: "Families Supported", value: "85,000+" },
      { label: "Cities Active", value: "14" },
    ],
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80",
  },
];

export const DIRECTORY: PartnerOrg[] = [
  {
    id: "undp",
    name: "UNDP",
    location: "Global / New York",
    type: "UN Organization",
    categoryTag: "UN Organization",
    verified: true,
    tier: "Founding",
    since: 2022,
    sdgs: [1, 13, 16, 17],
    funding: "Global Partner",
    activity: "Published 2025 Global SDG Progress Framework · 3 days ago",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80",
    description: "United Nations Development Programme driving multi-country SDG implementation.",
    initials: "UNDP",
    logoSources: ["/assets/partners/unesco.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/UNDP_logo.svg/200px-UNDP_logo.svg.png"],
    website: "undp.org",
  },
  {
    id: "google-org",
    name: "Google.org",
    location: "Mountain View, CA",
    type: "Company",
    categoryTag: "Technology Partner",
    verified: true,
    tier: "Gold",
    since: 2023,
    sdgs: [4, 9, 13],
    funding: "$2.5M Grant",
    activity: "Announced AI for Climate Education Grant · 1 week ago",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
    description: "Philanthropic arm of Google providing technical AI grants, infrastructure and mentorship.",
    initials: "GOOG",
    logoSources: ["/assets/partners/google.png", "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"],
    website: "google.org",
  },
  {
    id: "gates-foundation",
    name: "Bill & Melinda Gates Foundation",
    location: "Seattle, WA",
    type: "Foundation",
    categoryTag: "Foundation",
    verified: true,
    tier: "Gold",
    since: 2023,
    sdgs: [2, 3, 5, 17],
    funding: "$5.0M Grant",
    activity: "Expanded maternal health grant in South Asia · 4 days ago",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80",
    description: "Global foundation fighting poverty, disease, and inequity around the world.",
    initials: "BMGF",
    logoSources: ["https://cdn.brandfetch.io/gatesfoundation.org/w/180/h/60/logo", "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://gatesfoundation.org&size=128"],
    website: "gatesfoundation.org",
  },
  {
    id: "wwf",
    name: "WWF International",
    location: "Gland, Switzerland",
    type: "NGO",
    categoryTag: "NGO",
    verified: true,
    tier: null,
    since: 2023,
    sdgs: [13, 14, 15],
    funding: null,
    activity: "Co-launched Biodiversity School Tracker · 2 weeks ago",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80",
    description: "Leading independent conservation organization building a future where people live in harmony with nature.",
    initials: "WWF",
    logoSources: ["/assets/partners/savethechildren.png", "https://upload.wikimedia.org/wikipedia/en/thumb/2/24/WWF_logo.svg/200px-WWF_logo.svg.png"],
    website: "worldwildlife.org",
  },
  {
    id: "microsoft",
    name: "Microsoft",
    location: "Redmond, WA",
    type: "Company",
    categoryTag: "Technology Partner",
    verified: true,
    tier: "Gold",
    since: 2023,
    sdgs: [4, 7, 9, 13],
    funding: "Rs1.2Cr",
    activity: "Funded Azure Cloud for Sustainability Labs · 5 days ago",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    description: "Empowering every person and organization on the planet through AI and sustainable technology.",
    initials: "MSFT",
    logoSources: ["/assets/partners/microsoft.png", "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"],
    website: "microsoft.com",
  },
  {
    id: "stanford-university",
    name: "Stanford University",
    location: "Stanford, CA",
    type: "University",
    categoryTag: "Academic Partner",
    verified: true,
    tier: null,
    since: 2023,
    sdgs: [4, 9, 11, 17],
    funding: null,
    activity: "Joint Sustainability Lab paper published · 1 week ago",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
    description: "Premier academic institution leading climate science research and student innovation fellowships.",
    initials: "STAN",
    logoSources: ["https://upload.wikimedia.org/wikipedia/commons/4/4b/Stanford_Cardinal_logo.svg", "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://stanford.edu&size=128"],
    website: "stanford.edu",
  },
  {
    id: "unicef",
    name: "UNICEF",
    location: "New York, NY",
    type: "UN Organization",
    categoryTag: "UN Organization",
    verified: true,
    tier: "Founding",
    since: 2022,
    sdgs: [3, 4, 5, 10],
    funding: "Global Partner",
    activity: "Child Rights & Climate Action Summit co-hosted · 6 days ago",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
    description: "Working in over 190 countries and territories to protect children's rights and education.",
    initials: "UNICEF",
    logoSources: ["/assets/partners/unicef.png", "https://upload.wikimedia.org/wikipedia/commons/e/ed/UNICEF_logo.svg"],
    website: "unicef.org",
  },
  {
    id: "tesla",
    name: "Tesla Inc.",
    location: "Austin, TX",
    type: "Company",
    categoryTag: "Corporate Partner",
    verified: true,
    tier: "Silver",
    since: 2024,
    sdgs: [7, 9, 13],
    funding: "Rs40L",
    activity: "Solar micro-grid installed at 3 rural campuses · 2 weeks ago",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&q=80",
    description: "Accelerating the world's transition to sustainable energy through solar and battery technology.",
    initials: "TSLA",
    logoSources: ["https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png", "https://cdn.brandfetch.io/tesla.com/w/180/h/60/logo"],
    website: "tesla.com",
  },
  {
    id: "global-citizen",
    name: "Global Citizen",
    location: "New York, NY",
    type: "NGO",
    categoryTag: "NGO",
    verified: true,
    tier: null,
    since: 2024,
    sdgs: [1, 5, 13, 17],
    funding: null,
    activity: "Launched 2025 Youth Climate Mobilization · 4 days ago",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80",
    description: "International advocacy movement taking action to end extreme poverty and defend the planet.",
    initials: "GC",
    logoSources: ["https://cdn.brandfetch.io/globalcitizen.org/w/180/h/60/logo", "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://globalcitizen.org&size=128"],
    website: "globalcitizen.org",
  },
  {
    id: "world-bank",
    name: "World Bank Group",
    location: "Washington, DC",
    type: "Government",
    categoryTag: "Development Partner",
    verified: true,
    tier: "Founding",
    since: 2022,
    sdgs: [1, 8, 9, 17],
    funding: "Global Partner",
    activity: "Approved $10M green transition funding facility · 1 week ago",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80",
    description: "Global partnership fighting poverty through sustainable solutions and infrastructure financing.",
    initials: "WBG",
    logoSources: ["/assets/partners/worldbank.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/World_Bank_Group_logo.svg/240px-World_Bank_Group_logo.svg.png"],
    website: "worldbank.org",
  },
  {
    id: "delhi-public-school",
    name: "Delhi Public School",
    location: "New Delhi, India",
    type: "School",
    categoryTag: "Educational Institution",
    verified: true,
    tier: null,
    since: 2023,
    sdgs: [4, 13],
    funding: null,
    activity: "Hosted an SDG workshop · 2 weeks ago",
    image: "/assets/stories/classroom-transformation-after.jpeg",
    description: "A flagship partner school running student-led SDG clubs and climate-action drives across grades.",
    initials: "DPS",
    logoSources: ["https://upload.wikimedia.org/wikipedia/en/thumb/b/b3/Delhi_Public_School_logo.png/200px-Delhi_Public_School_logo.png", "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://dpsrkp.net&size=128"],
    website: "dpsrkp.net",
  },
  {
    id: "greenearth-initiative",
    name: "GreenEarth Initiative",
    location: "Hyderabad, India",
    type: "NGO",
    categoryTag: "NGO",
    verified: true,
    tier: null,
    since: 2024,
    sdgs: [13, 15],
    funding: null,
    activity: "Published impact report · 5 days ago",
    image: "/assets/stories/school-infrastructure-after.jpeg",
    description: "Grassroots environmental NGO restoring green cover and embedding sustainability into classrooms.",
    initials: "GE",
    logoSources: ["https://cdn.brandfetch.io/greenearth.org/w/180/h/60/logo", "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://greenearth.org&size=128"],
    website: "greenearth.org",
  },
  {
    id: "techcorp-india",
    name: "TechCorp India",
    location: "Bangalore, India",
    type: "Company",
    categoryTag: "Technology Partner",
    verified: true,
    tier: "Gold",
    since: 2023,
    sdgs: [4, 9],
    funding: "Rs50L",
    activity: "Funded the AI Bootcamp cohort · 3 days ago",
    image: "/assets/stories/student-learning-after.jpeg",
    description: "CSR leader channelling funding and mentorship into digital-skills programs for underserved students.",
    initials: "TC",
    logoSources: ["/assets/partners/accenture.png", "https://cdn.brandfetch.io/techcorp.in/w/180/h/60/logo"],
    website: "techcorp.in",
  },
  {
    id: "iit-hyderabad",
    name: "IIT Hyderabad",
    location: "Hyderabad, India",
    type: "University",
    categoryTag: "Academic Partner",
    verified: true,
    tier: null,
    since: 2023,
    sdgs: [4, 9, 17],
    funding: null,
    activity: "Volunteer cohort onboarded · 1 week ago",
    image: "/assets/stories/teacher-training-after.jpeg",
    description: "Research partner contributing innovation labs, student volunteers and program evaluation expertise.",
    initials: "IITH",
    logoSources: ["https://upload.wikimedia.org/wikipedia/en/thumb/1/10/Indian_Institute_of_Technology_Hyderabad_Logo.svg/240px-Indian_Institute_of_Technology_Hyderabad_Logo.svg.png", "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://iith.ac.in&size=128"],
    website: "iith.ac.in",
  },
  {
    id: "ecovolt-energy",
    name: "EcoVolt Energy",
    location: "Chennai, India",
    type: "Company",
    categoryTag: "Corporate Partner",
    verified: true,
    tier: "Silver",
    since: 2024,
    sdgs: [7, 13],
    funding: "Rs20L",
    activity: "New funding round confirmed · 6 days ago",
    image: "/assets/stories/midday-meal-after.jpeg",
    description: "Clean-energy company funding green campuses and renewable-energy literacy programs.",
    initials: "EV",
    logoSources: ["/assets/partners/wipro.png", "https://cdn.brandfetch.io/ecovolt.in/w/180/h/60/logo"],
    website: "ecovolt.in",
  },
  {
    id: "woxsen-university",
    name: "Woxsen University",
    location: "Hyderabad, India",
    type: "University",
    categoryTag: "Academic Partner",
    verified: true,
    tier: null,
    since: 2025,
    sdgs: [4, 17],
    funding: null,
    activity: "Joined the ecosystem · 3 weeks ago",
    image: "/assets/stories/student-learning-before.jpeg",
    description: "Newly onboarded university bringing design thinking and entrepreneurship into SDG projects.",
    initials: "WU",
    logoSources: ["https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Woxsen.png/240px-Woxsen.png", "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://woxsen.edu.in&size=128"],
    website: "woxsen.edu.in",
  },
];

export const FILTERS = [
  "All Partners",
  "Organizations",
  "Companies",
  "Educational Institutions",
  "NGOs",
  "Government",
  "Networks",
] as const;

export type FilterKey = (typeof FILTERS)[number];

export const SDG_LIST = [
  { num: 1, name: "No Poverty", color: "#E5243B" },
  { num: 2, name: "Zero Hunger", color: "#DDA63A" },
  { num: 3, name: "Good Health", color: "#4C9F38" },
  { num: 4, name: "Quality Education", color: "#C5192D" },
  { num: 5, name: "Gender Equality", color: "#FF3A21" },
  { num: 6, name: "Clean Water", color: "#26BDE2" },
  { num: 7, name: "Affordable & Clean Energy", color: "#FCC30B" },
  { num: 8, name: "Decent Work", color: "#A21942" },
  { num: 9, name: "Industry & Innovation", color: "#FD6925" },
  { num: 10, name: "Reduced Inequalities", color: "#DD1367" },
  { num: 11, name: "Sustainable Cities", color: "#FD9D24" },
  { num: 12, name: "Responsible Consumption", color: "#BF8B2E" },
  { num: 13, name: "Climate Action", color: "#3F7E44" },
  { num: 14, name: "Life Below Water", color: "#0A97D9" },
  { num: 15, name: "Life on Land", color: "#56C02B" },
  { num: 16, name: "Peace & Justice", color: "#00689D" },
  { num: 17, name: "Partnerships for the Goals", color: "#19486A" },
];

export const LIVE_STATS = [
  { label: "Active Partners", value: 125, suffix: "+", sub: "Global Organizations" },
  { label: "Countries", value: 45, suffix: "", sub: "Worldwide Reach" },
  { label: "Joint Initiatives", value: 320, suffix: "+", sub: "Active SDG Projects" },
  { label: "People Impacted", value: 2.5, suffix: "M+", sub: "Direct Beneficiaries" },
];

export interface EcoNode {
  key: string;
  label: string;
  blurb: string;
  icon: "school" | "ngo" | "hub" | "company" | "university";
  color: string;
}

export const ECOSYSTEM: EcoNode[] = [
  { key: "schools", label: "Schools", blurb: "SDG education & awareness", icon: "school", color: "#34d399" },
  { key: "ngos", label: "NGOs", blurb: "Ground execution & community impact", icon: "ngo", color: "#38bdf8" },
  { key: "stepup", label: "StepUp SDG", blurb: "Coordination & impact tracking", icon: "hub", color: "#0ea5c9" },
  { key: "companies", label: "Companies", blurb: "Funding & resources", icon: "company", color: "#f87171" },
  { key: "universities", label: "Universities", blurb: "Research, innovation & volunteers", icon: "university", color: "#fbbf24" },
];

export const WHY_PARTNER = [
  {
    key: "companies",
    title: "For Companies",
    type: "Company" as const,
    gradient: "linear-gradient(135deg, rgba(248,113,113,0.12) 0%, rgba(251,146,60,0.06) 100%)",
    benefits: [
      "Verified impact reports for your board",
      "Direct line to 12,000+ students & educators",
      "Brand visibility across 6 states & global summit",
    ],
    btnLabel: "Get Started",
    href: "mailto:companies@stepupsdg.in",
  },
  {
    key: "schools",
    title: "For Schools / Universities",
    type: "School" as const,
    gradient: "linear-gradient(135deg, rgba(52,211,153,0.12) 0%, rgba(6,182,212,0.06) 100%)",
    benefits: [
      "Ready SDG curriculum, toolkits and materials",
      "Funded workshops at zero cost to your institution",
      "Student leadership & global exchange opportunities",
    ],
    btnLabel: "Join as a School",
    href: "mailto:schools@stepupsdg.in",
  },
  {
    key: "ngos",
    title: "For NGOs & Foundations",
    type: "NGO" as const,
    gradient: "linear-gradient(135deg, rgba(56,189,248,0.12) 0%, rgba(99,102,241,0.06) 100%)",
    benefits: [
      "Co-design programs directly with CSR leaders",
      "Expand ground reach across 8 partner cities",
      "Joint grant access & verified impact auditing",
    ],
    btnLabel: "Partner With Us",
    href: "mailto:ngos@stepupsdg.in",
  },
];

export const PARTNERSHIP_MODELS = [
  {
    title: "Sponsorship",
    desc: "Directly fund SDG workshops, labs and events. Full spend audit & impact reporting provided.",
    icon: "sponsorship",
    step: "01",
    color: "#0ea5c9",
  },
  {
    title: "Co-hosted Programs",
    desc: "Run joint multi-city initiatives tailored around your core CSR sector and SDG priorities.",
    icon: "cohosted",
    step: "02",
    color: "#818cf8",
  },
  {
    title: "Awareness Campaigns",
    desc: "Empower student ambassadors to build localized sustainability campaigns inside partner schools.",
    icon: "awareness",
    step: "03",
    color: "#34d399",
  },
];
