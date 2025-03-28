export {}

declare global {
    interface ProjectCardProps {
        title: string
        status: string
        statusColor: "green" | "blue" | "gray" | "amber"
        description: string
        href: string
    }

}
