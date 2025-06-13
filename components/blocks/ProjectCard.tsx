'use client'

import React, { useState } from "react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

type ProjectCardProps = {
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

const ProjectCard = ({ title, status, statusColor, description, href, stack, technologies }: ProjectCardProps) => {
    const [hoveredTech, setHoveredTech] = useState<string | null>(null);

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
            <Link href={href} target="_blank" className="flex items-start justify-between group-hover:opacity-80 transition-opacity">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1 justify-between">
                        <div className="flex items-center gap-2">
                            <h2 className="text-sm md:text-xl font-medium">{title}</h2>
                        </div>
                        <Badge variant="outline" className={`text-[8px] px-2 pb-0.5 rounded border ${getStatusClass()}`}>
                            {status}
                        </Badge>
                    </div>
                    <p className="text-gray-400 text-xs md:text-sm mb-2">{description}</p>
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
                                        key={tech.name}
                                        className="relative group/tech"
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ zIndex: 10 }}
                                        onHoverStart={() => setHoveredTech(tech.name)}
                                        onHoverEnd={() => setHoveredTech(null)}
                                    >
                                        <motion.div 
                                            className="w-4 h-4 rounded-full bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden p-[2px]"
                                            whileHover={{ 
                                                scale: 1.2,
                                                backgroundColor: "rgba(255, 255, 255, 0.2)",
                                                boxShadow: "0 0 10px rgba(255, 255, 255, 0.3)"
                                            }}
                                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                        >
                                            <Image
                                                src={tech.icon}
                                                alt={tech.name}
                                                width={16}
                                                height={16}
                                                className="object-contain"
                                            />
                                        </motion.div>
                                        <AnimatePresence>
                                            {hoveredTech === tech.name && (
                                                <motion.div 
                                                    className="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-black/90 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap"
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -10 }}
                                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                                >
                                                    {tech.name}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
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
