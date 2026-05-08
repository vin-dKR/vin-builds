export { }

declare global {
    interface ProjectCardProps {
        title: string
        status: string
        statusColor: "green" | "blue" | "gray" | "amber" | "orange"
        description: string
        href: string
    }

    interface ProjectDetails {
        video?: string
        longDescription?: string
        features?: string[]
        role?: string
        duration?: string
        coverImage?: string
        gallery?: string[]
        storyTitle?: string
        storyTldr?: string[]
        storyReadTime?: string
        storySections?: ProjectStorySection[]
        contactCta?: ProjectContactCta
    }

    interface ProjectStorySection {
        heading: string
        id?: string
        tldr?: string
        paragraphs?: string[]
        bullets?: string[]
        code?: { language?: string; content: string }
        image?: { src: string; alt?: string; caption?: string }
        video?: string
    }

    interface ProjectContactCta {
        title?: string
        message?: string
        email?: string
        github?: string
        linkedin?: string
        twitter?: string
    }
}
