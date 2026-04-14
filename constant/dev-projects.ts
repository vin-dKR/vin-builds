type Project = {
    title: string;
    status: string;
    statusColor: "green" | "blue" | "orange" | "gray" | "amber";
    description: string;
    href: string;
    stack: string;
    freelance?: boolean;
    technologies: {
        name: string;
        icon: string;
    }[];
    details?: ProjectDetails;
}

export const devProjects: Project[] = [
    {
        title: "Atari",
        status: "completed",
        statusColor: "green",
        description: "Revamp of ICAR-ATARI's agricultural management portal with a new backend architecture for extension education tracking.",
        href: "https://atari-client.vercel.app/",
        stack: "Full Stack",
        freelance: true,
        technologies: [
            { name: "React.js", icon: "/tech/react.svg" },
            { name: "Typescript", icon: "/tech/typescript.svg" },
            { name: "Node.js", icon: "/tech/nodejs.svg" },
            { name: "PostgreSQL", icon: "/tech/postgres.svg" },
            { name: "Tanstack", icon: "/tech/tanstack.png" },
            { name: "Prisma", icon: "/tech/prisma.svg" },
            { name: "Tailwind", icon: "/tech/tailwind.svg" },
            { name: "Puppeteer", icon: "/tech/puppeteer.svg" }
        ]
    },
    {
        title: "Pagz",
        status: "completed",
        statusColor: "green",
        description: "Online custom printing platform with ordering, tracking, and delivery for businesses.",
        href: "https://pagz.in/",
        stack: "Full Stack",
        freelance: true,
        technologies: [
            { name: "Next.js", icon: "/tech/nextjs.svg" },
            { name: "Typescript", icon: "/tech/typescript.svg" },
            { name: "Node.js", icon: "/tech/nodejs.svg" },
            { name: "MySQL", icon: "/tech/mysql.svg" },
            { name: "Tanstack", icon: "/tech/tanstack.png" },
            { name: "Prisma", icon: "/tech/prisma.svg" },
            { name: "Tailwind", icon: "/tech/tailwind.svg" }
        ]
    },
    {
        title: "Libly Space",
        status: "maintained",
        statusColor: "orange",
        description: "SaaS for library owners to manage inventory, members, and subscriptions.",
        href: "https://libly.space",
        stack: "Full Stack",
        technologies: [
            { name: "Next.js", icon: "/tech/nextjs.svg" },
            { name: "Typescript", icon: "/tech/typescript.svg" },
            { name: "Node.js", icon: "/tech/nodejs.svg" },
            { name: "PostgreSQL", icon: "/tech/postgres.svg" },
            { name: "Tanstack", icon: "/tech/tanstack.png" },
            { name: "Zod", icon: "/tech/zod.svg" },
            { name: "Tailwind", icon: "/tech/tailwind.svg" }
        ],
        details: {
            video: "https://amh7dc2otlwrtz2o.public.blob.vercel-storage.com/libly-space-1767913058341.mp4",
            duration: "Present"
        }
    },
    {
        title: "Eduents",
        status: "maintained",
        statusColor: "orange",
        description: "AI exam builder for coaching institutes with student performance analytics.",
        href: "https://eduents.com",
        stack: "Full Stack",
        technologies: [
            { name: "Next.js", icon: "/tech/nextjs.svg" },
            { name: "Typescript", icon: "/tech/typescript.svg" },
            { name: "OpenAI", icon: "/tech/openai.svg" },
            { name: "MongoDB", icon: "/tech/mongo.svg" },
            { name: "Tailwind", icon: "/tech/tailwind.svg" },
            { name: "Clerk", icon: "tech/clerk.svg" },
            { name: "Prisma", icon: "tech/prisma.svg" },
            { name: "Motion", icon: "tech/motion.svg" },
            { name: "Puppeteer", icon: "tech/puppeteer.svg" },
        ],
        details: {
            video: "https://amh7dc2otlwrtz2o.public.blob.vercel-storage.com/eduents",
            duration: "May 25 – Present"
        }
    },
    {
        title: "Web Scrapper AI",
        status: "completed",
        statusColor: "green",
        description: "AI-driven web scraper with a Chrome extension for structured data extraction.",
        href: "https://github.com/vin-dKR/vin-scrapper-ai",
        stack: "Full Stack",
        technologies: [
            { name: "Node.js", icon: "/tech/nextjs.svg" },
            { name: "Typescript", icon: "/tech/typescript.svg" },
            { name: "OpenAI", icon: "/tech/openai.svg" },
        ]
    },
    {
        title: "Vin Wallpaper",
        status: "on-going",
        statusColor: "blue",
        description: "Autonomous X bot generating and posting AI wallpapers via Replicate and Stability AI.",
        href: "https://x.com/vin_wallpapers",
        stack: "Full Stack",
        technologies: [
            { name: "Node.js", icon: "/tech/nextjs.svg" },
            { name: "Typescript", icon: "/tech/typescript.svg" },
            { name: "Replicate", icon: "/tech/replicate.svg" },
            { name: "stability-ai", icon: "/tech/stable-ai.svg" },
        ]
    },
    {
        title: "The Orange Leaf",
        status: "completed",
        statusColor: "green",
        description: "Restaurant landing site with menu, online ordering, and table reservations.",
        href: "https://theorangeleaf.vercel.app/",
        stack: "Frontend",
        technologies: [
            { name: "Next.js", icon: "/tech/nextjs.svg" },
            { name: "Tailwind", icon: "/tech/tailwind.svg" }
        ],
        details: {
            video: "https://amh7dc2otlwrtz2o.public.blob.vercel-storage.com/the-orange-leaf-1750495984840-AT8SAWU0cakcJNYB5iwd6saxEvY31O.mp4",
            duration: "Apr 25"
        }
    },
    {
        title: "Maxico Salon",
        status: "completed",
        statusColor: "green",
        description: "At-home beauty and bridal services booking site for a Delhi salon chain.",
        href: "https://salon-one-ivory.vercel.app",
        stack: "Frontend",
        technologies: [
            { name: "Next.js", icon: "/tech/nextjs.svg" },
            { name: "Tailwind", icon: "/tech/tailwind.svg" },
            { name: "Framer", icon: "/tech/framer.svg" }
        ]
    },
    {
        title: "Vin-UI",
        status: "maintained",
        statusColor: "orange",
        description: "React component library with pixel-perfect Tailwind and Framer Motion animations.",
        href: "https://vin-ui.vercel.app/",
        stack: "Frontend",
        technologies: [
            { name: "React", icon: "/tech/react.svg" },
            { name: "Next.js", icon: "/tech/nextjs.svg" },
            { name: "Tailwind", icon: "/tech/tailwind.svg" },
            { name: "Framer", icon: "/tech/framer.svg" }
        ],
        details: {
            video: "https://amh7dc2otlwrtz2o.public.blob.vercel-storage.com/cursorful-video-1750489106351-MEr4MeWGkLrk4UCOUd5HgZgxuqLZVJ.mp4",
            duration: "Mar 25 – Apr 25"
        }
    },
    {
        title: "Vin-UI CLI",
        status: "completed",
        statusColor: "green",
        description: "Rust CLI that scaffolds and installs Vin-UI components into Next.js projects with auto dependency handling.",
        href: "https://github.com/vin-dKR/vin-ui-cmd",
        stack: "Backend",
        technologies: [
            { name: "Rust", icon: "/tech/rust.svg" },
        ]
    },
    {
        title: "Portfolio",
        status: "maintained",
        statusColor: "orange",
        description: "Personal portfolio showcasing full-stack projects, stack, and contact links.",
        href: "https://vinodkr.in/",
        stack: "Frontend",
        technologies: [
            { name: "Next.js", icon: "/tech/nextjs.svg" },
            { name: "Tailwind", icon: "/tech/tailwind.svg" },
            { name: "Framer", icon: "/tech/framer.svg" }
        ]
    },
    {
        title: "Hellium AI",
        status: "completed",
        statusColor: "green",
        description: "Embeddable AI sales chatbot with Stripe payments, email marketing, and appointment scheduling.",
        href: "https://hellium.vercel.app/",
        stack: "Full Stack",
        technologies: [
            { name: "Next.js", icon: "/tech/nextjs.svg" },
            { name: "Node.js", icon: "/tech/nodejs.svg" },
            { name: "Typescript", icon: "/tech/typescript.svg" },
            { name: "Prisma", icon: "tech/prisma.svg" },
            { name: "Clerk", icon: "tech/clerk.svg" },
            { name: "PostgreSQL", icon: "/tech/postgres.svg" }
        ],
        details: {
            video: "https://amh7dc2otlwrtz2o.public.blob.vercel-storage.com/hellium-ai-1750488385543-3kFV380zdSxEOXoHp6VD18HOxa047k.mp4",
            duration: "Dec 24 – Jan 25"
        }
    }
]
