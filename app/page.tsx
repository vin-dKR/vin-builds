import Link from "next/link"
import { Github, Twitter, Globe } from "lucide-react"
import ProjectCard from "@/components/blocks/ProjectCard"

export default function Home() {
    return (
        <main className="min-h-screen bg-black text-white p-6 md:p-12 lg:p-24">
            <div className="w-1/3 mx-auto">
                <header className="mb-10">
                    <h1 className="text-3xl font-bold mb-2">Hi, I'm Vinod KR</h1>
                    <p className="text-gray-400 mb-6">I'm a full-stack engineer.</p>

                    <div className="flex space-x-4">
                        <Link target="_blank" href="https://github.com/vin-dKR" className="text-gray-400 hover:text-white">
                            <Github size={20} />
                        </Link>
                        <Link target="_blank" href="https://twitter.com/always_VinodKr" className="text-gray-400 hover:text-white">
                            <Twitter size={20} />
                        </Link>
                        <Link target="_blank" href="#" className="text-gray-400 hover:text-white">
                            <Globe size={20} />
                        </Link>
                    </div>
                </header>

                <p className="text-gray-400 mb-8">here are my crafts</p>

                <div className="space-y-12">
                    <ProjectCard
                        title="Portfolio"
                        status="maintained"
                        statusColor="green"
                        description="My personal portfolio website showcasing my work."
                        href="/projects/space"
                    />
                </div>
            </div>
        </main>
    )
}

