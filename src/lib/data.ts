export const siteConfig = {
  name: "Edesiri Ohwomado",
  title: "Edesiri Ohwomado | Software Engineer & Builder",
  email: "hello@edesiri.com",
  logo: "EO.",
  tagline: "Built with care, creativity, and good music.",
  social: {
    x: "https://x.com/edesiri",
    linkedin: "https://www.linkedin.com/in/edesirio/",
    github: "https://github.com/ede-siri",
    instagram: "https://instagram.com/edesiri.jpeg",
  },
  resumeUrl: "/cv.pdf",
};

export const navLinks = [
  { href: "/experience", label: "Experience" },
  { href: "/work", label: "Work" },
  { href: "/writing", label: "Writing" },
  { href: "/postcards", label: "Postcards" },
  { href: "/contact", label: "Contact" },
] as const;

export type ContactPortal = {
  path: string;
  vibe: string;
  handle: string;
  href: string;
  action: string;
  external?: boolean;
};

export const contactPortals: ContactPortal[] = [
  {
    path: "/linkedin",
    vibe: "professional siri",
    handle: "Edesiri Ohwomado",
    href: "https://www.linkedin.com/in/edesirio/",
    action: "enter portal ↗",
    external: true,
  },
  {
    path: "/github",
    vibe: "builder siri",
    handle: "ede-siri",
    href: "https://github.com/ede-siri",
    action: "enter portal ↗",
    external: true,
  },
  {
    path: "/substack",
    vibe: "writer siri",
    handle: "npm install edesiri",
    href: "https://npminstalledesiri.substack.com",
    action: "enter portal ↗",
    external: true,
  },
  {
    path: "/email",
    vibe: "serious-ish siri",
    handle: "hello@edesiri.com",
    href: "mailto:hello@edesiri.com",
    action: "send message →",
  },
  {
    path: "/instagram",
    vibe: "soft life siri",
    handle: "@edesiri.jpeg",
    href: "https://instagram.com/edesiri.jpeg",
    action: "enter portal ↗",
    external: true,
  },
  {
    path: "/x",
    vibe: "hot take siri",
    handle: "@edesiri",
    href: "https://x.com/edesiri",
    action: "enter portal ↗",
    external: true,
  },
];

export type WritingArticle = {
  source: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
  meta: string;
  featured?: boolean;
};

export const writingArticles: WritingArticle[] = [
  {
    source: "Condia",
    title: "Level Up: Landing an Amazon internship against all odds",
    description:
      "A feature on my path into tech, resilience, preparation, and the story behind landing an Amazon internship.",
    tags: ["Leetcode", "Technical Interviews", "FAANG", "Career"],
    href: "https://thecondia.com/levelup-edesiri-ohwomado-landed-amazon-internship/",
    meta: "Featured",
    featured: true,
  },
  {
    source: "Substack",
    title: "Building a 400 Million Events per Day Serverless Observability System",
    description:
      "A technical breakdown of my AWS internship project, from serverless architecture to event pipelines and observability.",
    tags: ["Cloud System", "System Design", "Observability"],
    href: "https://npminstalledesiri.substack.com/p/building-a-400-million-events-per?r=1gvtl8&utm_medium=ios&utm_source=notes-share-action",
    meta: "12 min read",
  },
];

export type Postcard = {
  slug: string;
  location: string;
  date: string;
  sortDate: string;
  airport: string;
  greeting: string;
  note: string;
  quote?: string;
  image?: string;
  polaroidImage?: string;
  rotation: string;
  imageTone: string;
  vibe: string;
  description?: string;
};

const postcardRotations = [
  "-rotate-2",
  "rotate-1",
  "-rotate-1",
  "rotate-2",
  "-rotate-[0.5deg]",
  "rotate-[1.5deg]",
] as const;

const postcardTones = [
  "from-[#6f6f6f] via-[#4a4a4a] to-[#2f2f2f]",
  "from-[#5f5f5f] via-[#3d3d3d] to-[#262626]",
  "from-[#707070] via-[#454545] to-[#1f1f1f]",
  "from-[#656565] via-[#404040] to-[#2a2a2a]",
  "from-[#5a5a5a] via-[#383838] to-[#222222]",
  "from-[#686868] via-[#434343] to-[#282828]",
] as const;

export const postcards: Postcard[] = [
  {
    slug: "/albania",
    location: "Durrës, Albania",
    date: "Jun 2026",
    sortDate: "2026-06",
    airport: "TIA",
    greeting: "Përshëndetje",
    note: "A sunny beach-resort birthday trip filled with pool days, slow strolls, and surprisingly good nightlife.",
    image: "/images/postcards/albania.png",
    polaroidImage: "/images/postcards/albania-polaroid.png",
    rotation: postcardRotations[3],
    imageTone: postcardTones[4],
    vibe: "BEACH BIRTHDAY",
  },
  {
    slug: "/montenegro",
    location: "Budva, Montenegro",
    date: "Apr 2026",
    sortDate: "2026-04",
    airport: "TIV",
    greeting: "Zdravo",
    note: "Beachfront balcony views, calm Adriatic scenes, and a boat cruise through some of the prettiest water I’ve seen.",
    image: "/images/postcards/montenegro.png",
    polaroidImage: "/images/postcards/montenegro-polaroid.png",
    rotation: postcardRotations[2],
    imageTone: postcardTones[3],
    vibe: "ADRIATIC VIEWS",
  },
  {
    slug: "/london",
    location: "London, UK",
    date: "Dec 2025",
    sortDate: "2025-12",
    airport: "LHR",
    greeting: "Hello",
    note: "Christmas and New Year with family, full of shopping, festive lights, and proper quality time.",
    image: "/images/postcards/london.png",
    rotation: postcardRotations[1],
    imageTone: postcardTones[2],
    vibe: "FAMILY CHRISTMAS",
  },
  {
    slug: "/berlin",
    location: "Berlin, Germany",
    date: "Dec 2025",
    sortDate: "2025-12",
    airport: "BER",
    greeting: "Hallo",
    note: "A December Christmas market trip with friends, festive lights, cold air, and very good German sausage.",
    image: "/images/postcards/berlin.png",
    rotation: postcardRotations[0],
    imageTone: postcardTones[1],
    vibe: "CHRISTMAS MARKETS",
  },
  {
    slug: "/ibiza",
    location: "Ibiza, Spain",
    date: "Nov 2025",
    sortDate: "2025-11",
    airport: "IBZ",
    greeting: "Hola",
    note: "A scenic island trip with unreal sunsets, clear skies, beach days, and a wander through the old town.",
    image: "/images/postcards/ibiza.png",
    rotation: postcardRotations[5],
    imageTone: postcardTones[5],
    vibe: "GOLDEN ISLAND",
  },
  {
    slug: "/zermatt",
    location: "Zermatt, Switzerland",
    date: "Oct 2025",
    sortDate: "2025-10",
    airport: "ZRH",
    greeting: "Grüezi",
    note: "A peaceful winter wonderland with freezing air, quiet streets, and the Matterhorn in the background.",
    image: "/images/postcards/zermatt.png",
    rotation: postcardRotations[4],
    imageTone: postcardTones[4],
    vibe: "WINTER WONDERLAND",
  },
  {
    slug: "/grindelwald",
    location: "Grindelwald, Switzerland",
    date: "Oct 2025",
    sortDate: "2025-10",
    airport: "ZRH",
    greeting: "Grüezi",
    note: "The most beautiful place I’ve been, with breathtaking mountain views on every walk.",
    image: "/images/postcards/grindelwald.png",
    rotation: postcardRotations[3],
    imageTone: postcardTones[3],
    vibe: "BREATHTAKING VIEWS",
  },
  {
    slug: "/lake-como",
    location: "Lake Como, Italy",
    date: "Sept 2025",
    sortDate: "2025-09",
    airport: "MXP",
    greeting: "Ciao",
    note: "A boat trip across the lake with music playing, mountain views everywhere, and the best pasta of the trip.",
    image: "/images/postcards/lake-como.png",
    rotation: postcardRotations[2],
    imageTone: postcardTones[2],
    vibe: "LAKE DAYDREAM",
  },
  {
    slug: "/milan",
    location: "Milan, Italy",
    date: "Sept 2025",
    sortDate: "2025-09",
    airport: "MXP",
    greeting: "Ciao",
    note: "Duomo views, beautiful architecture, and late-night cruising through the streets of Milan.",
    image: "/images/postcards/milan.png",
    rotation: postcardRotations[1],
    imageTone: postcardTones[1],
    vibe: "CITY NIGHTS",
  },
  {
    slug: "/paris",
    location: "Paris, France",
    date: "Aug 2025",
    sortDate: "2025-08",
    airport: "CDG",
    greeting: "Bonjour",
    note: "A best-friends trip filled with Eiffel Tower sparkles, crêpes, croissants, and pretty city walks.",
    image: "/images/postcards/paris.png",
    rotation: postcardRotations[0],
    imageTone: postcardTones[0],
    vibe: "EIFFEL GLOW",
    description:
      "A best-friends trip filled with Eiffel Tower sparkles, crêpes, croissants, and pretty city walks.",
  },
].sort((a, b) => {
  if (a.slug === "/montenegro") return 1;
  if (b.slug === "/montenegro") return -1;
  return b.sortDate.localeCompare(a.sortDate);
});

export type WorkProject = {
  index: string;
  title: string;
  description: string;
  tags: string[];
  role: string;
  year: string;
  href: string;
  image: string;
  featured?: boolean;
};

export const workProjects: WorkProject[] = [
  {
    index: "01",
    title: "AI-Generated Image Detection",
    description:
      "Researched and implemented deep learning models for detecting AI-generated images, comparing standard CNN-based approaches with residual/high-pass image analysis. Focused on generalisation, robustness, and model performance under image transformations such as JPEG compression.",
    tags: ["PyTorch", "Computer Vision", "CNNs", "Model Evaluation"],
    role: "Researcher / ML Engineer",
    year: "2026",
    href: "#",
    image: "/images/projects/ai-detection.png",
    featured: true,
  },
  {
    index: "02",
    title: "Serverless Observability Tool",
    description:
      "Built observability-focused tooling for serverless systems, improving visibility into distributed workflows and helping engineers better understand service behaviour in production environments.",
    tags: ["AWS", "Lambda", "Kinesis", "DynamoDB"],
    role: "Software Engineering Intern",
    year: "2025",
    href: "#",
    image: "/images/projects/observability.png",
  },
  {
    index: "03",
    title: "Remcruit",
    description:
      "Built an employment platform designed to connect job seekers with employers and simplify the recruitment process, with a focus on matching candidates to opportunities.",
    tags: ["Python", "Django", "Employment Platform"],
    role: "Backend / Full-Stack Developer",
    year: "2024",
    href: "#",
    image: "/images/projects/remcruit.png",
  },
];

export const experience = [
  {
    period: "Aug 2026 – Incoming",
    company: "Amazon",
    role: "Incoming Software Development Engineer",
    location: "London, UK",
    description:
      "Joining Amazon as a Software Development Engineer, working on large-scale systems and production software in a high-impact engineering environment.",
  },
  {
    period: "Jun 2025 – Sep 2025",
    company: "Amazon Web Services",
    role: "Software Engineering Intern",
    location: "London, UK",
    description:
      "Worked within AWS on software engineering projects involving distributed systems, software design, and cloud infrastructure. Gained experience building in a production-focused environment and contributing to systems designed for scale.",
    skills: ["Distributed Systems", "Software Design", "AWS"],
  },
  {
    period: "Jan 2024 – Aug 2025",
    company: "Rime",
    role: "Co-Founder & CTO",
    location: "",
    description:
      "Co-founded Rime and led technical development from early idea to product execution. Worked across product planning, system design, backend development, and implementation, helping turn a concept into a functional platform.",
    skills: ["Large-Scale System Integration", "SQL", "Product Engineering"],
  },
  {
    period: "Jul 2023 – Sep 2023",
    company: "Bluechip Technologies",
    role: "Java Software Engineer Intern",
    location: "Lagos",
    description:
      "Contributed to software engineering projects using Java and PostgreSQL, gaining experience in backend development, databases, and collaborative engineering workflows.",
    skills: ["Java", "PostgreSQL", "Backend Development"],
  },
];

export type ExperienceEntry = {
  period: string;
  company: string;
  role: string;
  location: string;
  description: string;
  tags: string[];
  logo?: string;
};

export const experienceEntries: ExperienceEntry[] = [
  {
    period: "Aug 2026 – Present",
    company: "Amazon",
    role: "Software Development Engineer",
    location: "London, UK",
    description:
      "Joining Amazon as a Software Development Engineer on the Prime Video team, where I’ll be building, learning, and contributing to large-scale customer-facing systems.",
    tags: ["Software Engineer", "Python", "Distributed Systems"],
    logo: "/images/companies/amazon.png?v=2",
  },
  {
    period: "Jun 2025 – Sep 2025",
    company: "Amazon Web Services",
    role: "Software Engineering Intern",
    location: "London, UK",
    description:
      "Worked on observability tooling for serverless systems, helping make complex account-processing journeys easier to trace, understand, and debug.",
    tags: ["AWS", "Serverless", "Observability", "Distributed Systems"],
    logo: "/images/companies/aws.png?v=2",
  },
  {
    period: "Jan 2024 – Aug 2025",
    company: "Rime",
    role: "Co-Founder & CTO",
    location: "Remote",
    description:
      "Helped shape the product and technical direction from early idea to working platform, across planning, system design, backend development, and implementation.",
    tags: ["Product", "System Design", "SQL", "Startup Building"],
    logo: "/images/companies/rime.png?v=2",
  },
  {
    period: "Jul 2023 – Sep 2023",
    company: "Bluechip Technologies",
    role: "Java Software Engineer Intern",
    location: "Lagos",
    description:
      "Worked on backend software projects using Java and PostgreSQL, gaining hands-on experience with databases, application development, and collaborative engineering.",
    tags: ["Java", "PostgreSQL", "Backend"],
    logo: "/images/companies/bluechip.png?v=2",
  },
];

export type ToolkitCard = {
  path: string;
  items: string[];
};

export const toolkitInventory: ToolkitCard[] = [
  {
    path: "/languages",
    items: ["Python", "Java", "TypeScript", "JavaScript", "SQL"],
  },
  {
    path: "/cloud",
    items: ["AWS", "Lambda", "Kinesis", "DynamoDB", "API Gateway"],
  },
  {
    path: "/frontend",
    items: ["React", "Next.js", "Tailwind CSS", "HTML/CSS"],
  },
  {
    path: "/ai-ml",
    items: ["PyTorch", "CNNs", "Computer Vision", "Model Evaluation"],
  },
  {
    path: "/tools",
    items: ["Git", "GitHub", "Docker", "PostgreSQL", "Vercel"],
  },
  {
    path: "/product",
    items: ["Product thinking", "System design", "Observability"],
  },
];

export const education = {
  degree: "BSc Computer Science",
  institution: "University of Sheffield",
  year: "2026",
};

export type RecognitionNote = {
  title: string;
  detail: string;
};

export const recognitionNotes: RecognitionNote[] = [
  {
    title: "Computer Science Excellence Scholarship",
    detail: "Department of Computer Science, University of Sheffield",
  },
  {
    title: "Top Performing Student",
    detail: "International Foundation Year · NCUK / University Pathways",
  },
];

export const educationNotes = [
  "BSc Computer Science",
  "University of Sheffield · 2026",
];

export const projects = [
  {
    title: "AI-Generated Image Detection",
    description:
      "Researched and implemented deep learning models for detecting AI-generated images, comparing standard CNN-based approaches with residual/high-pass image analysis. Focused on generalisation, robustness, and model performance under image transformations such as JPEG compression.",
    tags: ["Computer Vision", "PyTorch", "CNNs", "Model Evaluation"],
    image: "/images/projects/ai-detection.png",
    href: "#",
    variant: "image" as const,
  },
  {
    title: "Remcruit",
    description:
      "Built an employment platform designed to connect job seekers with employers and simplify the recruitment process. The project focused on matching candidates to opportunities and creating a more accessible hiring experience.",
    tags: ["Python", "Django", "Employment Platform"],
    href: "#",
    variant: "muted" as const,
  },
  {
    title: "Serverless Observability Tool",
    description:
      "Worked on observability-focused tooling for cloud systems, improving visibility into distributed workflows and helping engineers better understand service behaviour in serverless environments.",
    tags: ["AWS", "Distributed Systems", "Backend Engineering"],
    image: "/images/projects/observability.png",
    href: "#",
    variant: "image" as const,
  },
  {
    title: "Portfolio Website",
    description:
      "Designed and developed a personal portfolio to present engineering experience, selected projects, and professional background through a clean, editorial, responsive interface.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    href: "#",
    variant: "accent" as const,
  },
];

export const skills = [
  {
    category: "Languages",
    items: ["Python", "Java", "TypeScript", "JavaScript", "SQL"],
  },
  {
    category: "Backend & Cloud",
    items: [
      "AWS",
      "Serverless systems",
      "Distributed systems",
      "Backend engineering",
      "API design",
    ],
  },
  {
    category: "Frameworks & Tools",
    items: ["Django", "React", "Next.js", "Tailwind CSS", "Git", "PostgreSQL"],
  },
  {
    category: "AI / ML",
    items: [
      "PyTorch",
      "CNNs",
      "Computer vision",
      "Image classification",
      "Model evaluation",
    ],
  },
  {
    category: "Product & Engineering",
    items: [
      "Software design",
      "Technical leadership",
      "Product thinking",
      "System integration",
    ],
  },
];

export const recognition = [
  {
    title: "Computer Science Excellence Scholarship",
    detail: "Department of Computer Science, University of Sheffield",
  },
  {
    title: "Top Performing Student",
    detail: "International Foundation Year, NCUK / University Pathways",
  },
];
