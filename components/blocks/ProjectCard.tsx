import React from "react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export default function ProjectCard({ title, status, statusColor, description, href }: ProjectCardProps) {
    const getStatusClass = () => {
        switch (statusColor) {
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

    return (
        <div className="group">
            <Link href={href} target="_blank" className="flex items-start justify-between group-hover:opacity-80 transition-opacity">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-sm md:text-xl font-medium">{title}</h2>
                        <Badge variant="outline" className={`text-xs px-2 py-0.5 rounded border ${getStatusClass()}`}>
                            {status}
                        </Badge>
                    </div>
                    <p className="text-gray-400 text-xs md:text-sm">{description}</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
            </Link>
        </div>
    )
}
