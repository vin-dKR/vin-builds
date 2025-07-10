"use client"
import Link from "next/link"
import { Github, Twitter, Globe } from "lucide-react"
import ProjectCard from "@/components/blocks/ProjectCard"
import { BlurFade } from "@/components/magicui/blur-fade"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { devProjects } from "@/constant/dev-projects"
import { useState } from "react"
import { designProjects } from "@/constant/design-projects"
import { web3Projects } from "@/constant/web3-projects"


export default function Home() {
    const [activeTab, setActiveTab] = useState("dev")

    const getProjectsForTab = () => {
        switch (activeTab) {
            case "design":
                return designProjects
            case "web3":
                return web3Projects
            case "dev":
            default:
                return devProjects
        }
    }

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

                    <div className="flex flex-col w-full mb-8 ">
                        <div className="flex items-center gap-4 mb-2 justify-between">
                            <p className="text-gray-400 text-xs ms:text-sm">here are my crafts</p>

                            <Tabs
                                defaultValue="dev"
                                onValueChange={(value) => setActiveTab(value)}
                                className=""
                            >
                                <TabsList className="bg-white/5 text-white border border-white/4 rounded-md px-1 py-5">
                                    <TabsTrigger
                                        value="dev"
                                        className="data-[state=active]:bg-black data-[state=active]:border-white/6 data-[state=active]:drop-shadow-md text-gray-200/70 data-[state=active]:text-white rounded-sm px-2 md:px-3 py-4 text-xs md:text-sm font-medium transition-all cursor-pointer"
                                    >
                                        Development
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="design"
                                        className="data-[state=active]:bg-black data-[state=active]:border-white/6 data-[state=active]:drop-shadow-md text-gray-200/70 data-[state=active]:text-white rounded-sm px-2 md:px-3 py-4 text-xs md:text-sm font-medium transition-all cursor-pointer"
                                    >
                                        Design
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="web3"
                                        className="data-[state=active]:bg-black data-[state=active]:border-white/6 data-[state=active]:drop-shadow-md text-gray-200/70 data-[state=active]:text-white rounded-sm px-2 md:px-3 py-4 text-xs md:text-sm font-medium transition-all cursor-pointer"
                                    >
                                        Web-3
                                    </TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>
                    </div>

                    <div className="space-y-2">
                        {getProjectsForTab().map((project, index) => (
                            <ProjectCard
                                key={index}
                                {...project}
                                tab={activeTab as 'dev' | 'design' | 'web3'}
                            />
                        ))}
                    </div>
                </BlurFade>
            </div>
        </main>
    )
}
