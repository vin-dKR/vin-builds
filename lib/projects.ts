import { devProjects } from "@/constant/dev-projects"
import { web3Projects } from "@/constant/web3-projects"
import { designProjects } from "@/constant/design-projects"

export type ProjectTab = "dev" | "web3" | "design"

export type UnifiedProject = {
    slug: string
    tab: ProjectTab
    title: string
    description: string
    href: string
    status?: string
    statusColor?: "green" | "blue" | "orange" | "gray" | "amber"
    stack?: string
    freelance?: boolean
    technologies?: { name: string; icon: string }[]
    thumbnail?: string
    previewImages?: { top: string; bottom: string }
    designLink?: string
    designTool?: { name: string; icon: string }[]
    details?: ProjectDetails
}

export function slugify(title: string): string {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
}

export function getAllProjects(): UnifiedProject[] {
    const devs: UnifiedProject[] = devProjects.map((p) => ({
        ...p,
        tab: "dev",
        slug: slugify(p.title),
    }))
    const web3s: UnifiedProject[] = web3Projects.map((p) => ({
        ...p,
        tab: "web3",
        slug: slugify(p.title),
    }))
    const designs: UnifiedProject[] = designProjects.map((p) => ({
        ...p,
        tab: "design",
        slug: slugify(p.title),
    }))
    return [...devs, ...web3s, ...designs]
}

export function getProjectBySlug(slug: string): UnifiedProject | undefined {
    return getAllProjects().find((p) => p.slug === slug)
}
