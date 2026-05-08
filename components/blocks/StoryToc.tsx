import { ListOrdered } from "lucide-react"

export function StoryToc({
    items,
}: {
    items: { id: string; heading: string }[]
}) {
    if (!items.length) return null
    return (
        <nav className="mb-8 rounded-lg border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-center gap-2 mb-3 text-xs uppercase tracking-wider text-gray-400">
                <ListOrdered className="w-3.5 h-3.5" /> on this page
            </div>
            <ol className="space-y-1.5 text-sm">
                {items.map((it, i) => (
                    <li key={it.id}>
                        <a
                            href={`#${it.id}`}
                            className="group flex gap-2 text-gray-300 hover:text-white transition-colors"
                        >
                            <span className="text-gray-500 tabular-nums w-5 text-right">
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="group-hover:underline underline-offset-2 decoration-white/30">
                                {it.heading}
                            </span>
                        </a>
                    </li>
                ))}
            </ol>
        </nav>
    )
}
