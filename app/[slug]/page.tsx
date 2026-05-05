import { getAllProjects, getProjectBySlug } from "@/lib/projects"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function generateStaticParams() {
    return getAllProjects().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const project = getProjectBySlug(slug)
    if (!project) return { title: "Not found" }
    return {
        title: `${project.title} — VinodKR`,
        description: project.description,
    }
}

const statusClass = (color?: string) => {
    switch (color) {
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

const normalizeIcon = (icon: string) => (icon.startsWith("/") ? icon : `/${icon}`)

const isExternalVideo = (url: string) =>
    /youtube\.com|youtu\.be|vimeo\.com/.test(url)

const toEmbed = (url: string) => {
    const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/)
    if (yt) return `https://www.youtube.com/embed/${yt[1]}`
    const vm = url.match(/vimeo\.com\/(\d+)/)
    if (vm) return `https://player.vimeo.com/video/${vm[1]}`
    return url
}

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const project = getProjectBySlug(slug)
    if (!project) notFound()

    const {
        title,
        description,
        href,
        status,
        statusColor,
        stack,
        freelance,
        technologies,
        details,
    } = project

    return (
        <main className="min-h-screen bg-black text-white p-6 md:p-12 lg:p-24">
            <div className="w-full sm:w-5/6 md:w-2/3 lg:w-1/2 xl:w-2/5 mx-auto">
                <Link
                    href="/"
                    className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft className="w-3 h-3" /> back
                </Link>

                <header className="mb-8">
                    <h1 className="text-2xl md:text-4xl font-bold mb-2">{title}</h1>
                    <p className="text-gray-400 text-sm md:text-base mb-4">{description}</p>

                    <div className="flex flex-wrap items-center gap-2">
                        {freelance && (
                            <Badge
                                variant="outline"
                                className="text-[10px] px-2 pb-0.5 rounded border bg-pink-950 text-pink-400 border-pink-800"
                            >
                                Freelance
                            </Badge>
                        )}
                        {status && (
                            <Badge
                                variant="outline"
                                className={`text-[10px] px-2 pb-0.5 rounded border ${statusClass(statusColor)}`}
                            >
                                {status}
                            </Badge>
                        )}
                        {stack && (
                            <Badge
                                variant="outline"
                                className="text-[10px] px-2 pb-0.5 rounded border bg-purple-950 text-purple-500 border-purple-800"
                            >
                                {stack}
                            </Badge>
                        )}
                        {details?.role && (
                            <Badge
                                variant="outline"
                                className="text-[10px] px-2 pb-0.5 rounded border bg-blue-950 text-blue-400 border-blue-800"
                            >
                                {details.role}
                            </Badge>
                        )}
                        {details?.duration && (
                            <span className="text-[10px] text-gray-500">{details.duration}</span>
                        )}
                    </div>
                </header>

                {details?.video && (
                    <div className="mb-8 rounded-md overflow-hidden border border-white/10 bg-black aspect-video">
                        {isExternalVideo(details.video) ? (
                            <iframe
                                src={toEmbed(details.video)}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        ) : (
                            <video
                                src={details.video}
                                controls
                                poster={details.coverImage}
                                className="w-full h-full object-cover"
                            />
                        )}
                    </div>
                )}

                {!details?.video && details?.coverImage && (
                    <div className="mb-8 rounded-md overflow-hidden border border-white/10">
                        <Image
                            src={details.coverImage}
                            alt={title}
                            width={1600}
                            height={900}
                            className="w-full h-auto"
                        />
                    </div>
                )}

                {details?.longDescription && (
                    <section className="mb-8">
                        <h2 className="text-lg font-semibold mb-2">About</h2>
                        <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                            {details.longDescription}
                        </p>
                    </section>
                )}

                {details?.features && details.features.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-lg font-semibold mb-3">Features</h2>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1.5">
                            {details.features.map((f, i) => (
                                <li key={i}>{f}</li>
                            ))}
                        </ul>
                    </section>
                )}

                {technologies && technologies.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-lg font-semibold mb-3">Stack</h2>
                        <div className="flex flex-wrap gap-2">
                            {technologies.map((t, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-2.5 py-1 text-xs text-gray-300"
                                >
                                    <Image
                                        src={normalizeIcon(t.icon)}
                                        alt={t.name}
                                        width={14}
                                        height={14}
                                        className="object-contain"
                                    />
                                    {t.name}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {details?.gallery && details.gallery.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-lg font-semibold mb-3">Gallery</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {details.gallery.map((src, i) => (
                                <div
                                    key={i}
                                    className="rounded-md overflow-hidden border border-white/10"
                                >
                                    <Image
                                        src={src}
                                        alt={`${title} ${i + 1}`}
                                        width={1200}
                                        height={800}
                                        className="w-full h-auto"
                                    />
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {href && (
                    <Link
                        href={href}
                        target="_blank"
                        className="inline-flex items-center gap-1.5 text-sm text-white border border-white/10 bg-white/5 hover:bg-white/10 rounded-md px-4 py-2 transition-colors"
                    >
                        Visit project <ArrowUpRight className="w-4 h-4" />
                    </Link>
                )}

                {details?.storySections && details.storySections.length > 0 && (
                    <section className="mt-16 pt-12 border-t border-white/10">
                        <h2 className="text-xl md:text-2xl font-bold mb-6">
                            {details.storyTitle || "More about this project"}
                        </h2>
                        <div className="space-y-10">
                            {details.storySections.map((s, i) => (
                                <div key={i}>
                                    <h3 className="text-base md:text-lg font-semibold mb-3 text-white">
                                        {s.heading}
                                    </h3>
                                    {s.paragraphs?.map((p, j) => (
                                        <p
                                            key={j}
                                            className="text-gray-300 text-sm leading-relaxed mb-3 whitespace-pre-wrap"
                                        >
                                            {p}
                                        </p>
                                    ))}
                                    {s.bullets && s.bullets.length > 0 && (
                                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1.5 mb-3">
                                            {s.bullets.map((b, k) => (
                                                <li key={k}>{b}</li>
                                            ))}
                                        </ul>
                                    )}
                                    {s.code && (
                                        <pre className="bg-white/5 border border-white/10 rounded-md p-3 overflow-x-auto text-xs text-gray-200 mb-3">
                                            <code>{s.code.content}</code>
                                        </pre>
                                    )}
                                    {s.image && (
                                        <figure className="mt-3 rounded-md overflow-hidden border border-white/10">
                                            <Image
                                                src={s.image.src}
                                                alt={s.image.alt || s.heading}
                                                width={1600}
                                                height={900}
                                                className="w-full h-auto"
                                            />
                                            {s.image.caption && (
                                                <figcaption className="text-[11px] text-gray-500 px-3 py-2 italic">
                                                    {s.image.caption}
                                                </figcaption>
                                            )}
                                        </figure>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </main>
    )
}
