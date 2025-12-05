type Project = {
    title: string;
    status: string;
    statusColor: "green" | "blue" | "orange" | "gray" | "amber";
    description: string;
    href: string;
    stack: string;
    technologies: {
        name: string;
        icon: string;
    }[];
}

export const devProjects: Project[] = [
    {
        title: "Libly Space",
        status: "maintained",
        statusColor: "orange",
        description: "Manage Your Library Effortlessly.",
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
        ]
    },
    {
        title: "Eduents",
        status: "maintained",
        statusColor: "orange",
        description: "Create Exams Effortlessly for your Coaching.",
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
        ]
    },
    {
        title: "Web Scrapper AI",
        status: "on-going",
        statusColor: "blue",
        description: "this is an ai web scrapper",
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
        description: "AI Wallpaper x.com bot",
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
        description: "it's a restaurant.",
        href: "https://theorangeleaf.vercel.app/",
        stack: "Frontend",
        technologies: [
            { name: "Next.js", icon: "/tech/nextjs.svg" },
            { name: "Tailwind", icon: "/tech/tailwind.svg" }
        ]
    },
    {
        title: "Maxico Salon",
        status: "completed",
        statusColor: "green",
        description: "it's a salon baby.",
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
        description: "personal React components library.",
        href: "https://vin-ui.vercel.app/",
        stack: "Frontend",
        technologies: [
            { name: "React", icon: "/tech/react.svg" },
            { name: "Next.js", icon: "/tech/nextjs.svg" },
            { name: "Tailwind", icon: "/tech/tailwind.svg" },
            { name: "Framer", icon: "/tech/framer.svg" }
        ]
    },
    {
        title: "Vin-UI CLI",
        status: "completed",
        statusColor: "green",
        description: "CLI based on RUST(btw) for next js ui library.",
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
        description: "My personal portfolio website showcasing my work.",
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
        description: "AI powered sales assistant! Embed Hellium Bot",
        href: "https://hellium.vercel.app/",
        stack: "Full Stack",
        technologies: [
            { name: "Next.js", icon: "/tech/nextjs.svg" },
            { name: "Node.js", icon: "/tech/nodejs.svg" },
            { name: "Typescript", icon: "/tech/typescript.svg" },
            { name: "Prisma", icon: "tech/prisma.svg" },
            { name: "Clerk", icon: "tech/clerk.svg" },
            { name: "PostgreSQL", icon: "/tech/postgres.svg" }
        ]
    }
]
