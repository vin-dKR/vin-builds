import Link from "next/link"
import { Github, Twitter, Globe } from "lucide-react"
import ProjectCard from "@/components/blocks/ProjectCard"
import { BlurFade } from "@/components/magicui/blur-fade"

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

const projects: Project[] = [
    {
        title: "Vin Wallpaper",
        status: "on-going",
        statusColor: "blue",
        description: "AI Wallpaper x.com bot",
        href: "https://x.com/vin_wallpapers",
        stack: "Backend",
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
        href: "https://portfolio-vinokr.vercel.app",
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

export default function Home() {
    return (
        <main className="min-h-screen bg-black text-white p-6 md:p-12 lg:p-24">
            <div className="w-full sm:w-5/6 md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/4 mx-auto">
                <BlurFade delay={0.25} inView>
                    <header className="mb-10 p-2">
                        <h1 className="text-xl md:text-3xl font-bold">Hi, I&apos;m Vinod KR</h1>
                        <p className="text-gray-400 mb-6 lg:text-md text-xs">I&apos;m a full-stack engineer.</p>

                        <div className="flex space-x-4">
                            <Link target="_blank" href="https://github.com/vin-dKR" className="text-gray-400 hover:text-white">
                                <Github size={20} />
                            </Link>
                            <Link target="_blank" href="https://twitter.com/always_VinodKr" className="text-gray-400 hover:text-white">
                                <Twitter size={20} />
                            </Link>
                            <Link target="_blank" href="https://portfolio-vinokr.vercel.app/" className="text-gray-400 hover:text-white">
                                <Globe size={20} />
                            </Link>
                        </div>
                    </header>

                    <p className="text-gray-400 mb-8 text-xs ms:text-sm px-2">here are my crafts</p>

                    <div className="space-y-2">
                        {projects.map((project, index) => (
                            <ProjectCard
                                key={index}
                                {...project}
                            />
                        ))}
                    </div>
                </BlurFade>
            </div>
        </main>
    )
}

