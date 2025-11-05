'use client'

import React from "react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion";
import ArrowButton from "@/components/blocks/ArrowButton";
import BubbleLogo from "./BubbleLogo"
import PreviewContainer from "./PreviewContainer"

type ProjectCardProps = {
    title: string;
    description: string;
    tab: "dev" | "design" | "web3" | "opensource";
    status?: string;
    statusColor?: "green" | "blue" | "orange" | "gray" | "amber";
    href?: string;
    stack?: string;
    technologies?: {
        name: string;
        icon: string;
    }[];
    repository?: string;
    pullRequestUrl?: string;
    previewImages?: {
        top: string;
        bottom: string;
    };
    designLink?: string;
    designTool?: {
        name: string;
        icon: string;
    }[];
    thumbnail?: string;
}

const ProjectCard = ({
    title,
    status,
    statusColor = "gray",
    description,
    href,
    stack,
    technologies = [],
    tab,
    thumbnail,
    designLink,
    designTool = [],
    pullRequestUrl,
    repository
}: ProjectCardProps) => {

    if (tab === "design") {
        return (
            <div className="rounded-md bg-white/4 border border-white/5 p-2 shadow-md flex flex-col">
                {thumbnail && <PreviewContainer images={thumbnail} />}
                {/*
                {previewImages && (
                    <Image
                        src="/design/imgs/salon2.png"
                        alt="kjk`"
                        className="cover"
                        width={400}
                        height={400}
                    />
                )
                }
                */}
                <div className="px-3 mb-2">
                    <h3 className="text-sm md:text-xl font-medium mb-1 ">{title}</h3>
                    <p className="text-gray-400 text-xs md:text-sm mb-2">{description}</p>

                    <div className="flex flex-row justify-between items-center gap-4">
                        {designTool && designTool.length > 0 && (
                            <div className="flex gap-2 items-center">
                                {designTool.map((tool, index) => (
                                    <motion.div
                                        key={index}
                                        className="flex items-center rounded-full p-1"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <BubbleLogo size="md" text={tool} index={index} />
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {designLink && (
                            <ArrowButton href={designLink} className="font-bold text-xs py-2">
                                Open Design
                            </ArrowButton>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    // Default/dev/web3 UI
    const getStatusClass = () => {
        switch (statusColor) {
            case "orange":
                return "bg-orange-950 text-orange-500 border-orange-800"
            case "green":
                return "bg-green-950 text-green-500 border-green-800"
            case "blue":
                return "bg-blue-950 text-blue-500 border-blue-800"
            case "amber":
                return "bg-amber-950 text-amber-500 border-amber-800"
            default:
                return "bg-gray-900 text-gray-500 border-gray-800"
        }
    }

    const getStackClass = () => {
        return "bg-purple-950 text-purple-500 border-purple-800"
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="group bg-white/4 p-2 rounded rounded-md border border-white/5 backdrop-blur-lg"
        >
            <Link
                href={tab === "opensource" ? pullRequestUrl || href || "#" : href || "#"}
                target="_blank"
                className="flex items-start justify-between group-hover:opacity-80 transition-opacity"
            >
                <div className="flex-1">
                    <div className="flex items-start gap-3 mb-1 justify-between">
                        <div className="flex flex-col">
                            <h2 className="text-sm md:text-xl font-medium">{title}</h2>
                            {tab === "opensource" && (
                                <p className="text-gray-400 text-[10px] md:text-xs mt-0.5 bg-purple-950 rounded-full px-4 pb-1 w-fit">
                                    {repository}
                                </p>
                            )}
                        </div>
                        {status && (
                            <Badge
                                variant="outline"
                                className={`text-[8px] px-2 pb-0.5 rounded border ${getStatusClass()}`}
                            >
                                {status}
                            </Badge>
                        )}
                    </div>

                    <p className="text-gray-400 text-xs md:text-sm mb-2">{description}</p>
                    {stack && (
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className={`text-[8px] px-2 pb-0.5 rounded border ${getStackClass()}`}>
                                {stack}
                            </Badge>

                            <div className="flex items-center">
                                <motion.div
                                    className="flex items-center bg-white/5 rounded-full p-1"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {technologies.map((tech, index) => (
                                        <motion.div
                                            key={index}
                                            className="flex items-center rounded-full"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <BubbleLogo size="xs" text={tech} index={index} />
                                        </motion.div>

                                    ))}
                                </motion.div>
                            </div>
                        </div>
                    )}
                </div>
                <motion.div
                    whileHover={{ scale: 1.2, rotate: 45 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                    <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors ml-4" />
                </motion.div>
            </Link>
        </motion.div>
    )
}


export default ProjectCard
