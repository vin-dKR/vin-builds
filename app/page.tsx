import Link from "next/link"
import { Github, Twitter, Globe } from "lucide-react"
import ProjectCard from "@/components/blocks/ProjectCard"
import { BlurFade } from "@/components/magicui/blur-fade"

export default function Home() {
    return (
        <main className="min-h-screen bg-black text-white p-6 md:p-12 lg:p-24">
            <div className="w-full sm:w-5/6 md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/4 mx-auto">
                <BlurFade delay={0.25} inView>
                    <header className="mb-10">
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

                    <p className="text-gray-400 mb-8 text-xs ms:text-sm">here are my crafts</p>

                    <div className="space-y-8">
                        <ProjectCard
                            title="The Orange Leaf"
                            status="completed"
                            statusColor="green"
                            description="it's a restaurant."
                            href="https://theorangeleaf.vercel.app/"
                        />

                        <ProjectCard
                            title="Vin-UI"
                            status="on-going"
                            statusColor="blue"
                            description="personal React components library."
                            href="https://vin-ui.vercel.app/"
                        />
                        <ProjectCard
                            title="Vin-UI CLI"
                            status="completed"
                            statusColor="orange"
                            description="CLI based on RUST(btw) for next js ui library."
                            href="https://github.com/vin-dKR/vin-ui-cmd"
                        />

                        <ProjectCard
                            title="Portfolio"
                            status="maintained"
                            statusColor="green"
                            description="My personal portfolio website showcasing my work."
                            href="https://portfolio-vinokr.vercel.app"
                        />
                        <ProjectCard
                            title="Hellium AI"
                            status="completed"
                            statusColor="orange"
                            description="AI powered sales assistant! Embed Hellium Bot"
                            href="https://hellium.vercel.app/"
                        />
                    </div>
                </BlurFade>
            </div>
        </main>
    )
}

