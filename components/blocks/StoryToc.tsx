export function StoryToc({
    items,
}: {
    items: { id: string; heading: string }[]
}) {
    if (!items.length) return null
    return (
        <nav className="lg:hidden mb-8">
            <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-3">
                contents
            </div>
            <ul className="space-y-2 border-l border-white/10 pl-4">
                {items.map((it) => (
                    <li key={it.id} className="relative">
                        <span className="absolute -left-[17px] top-2 w-2 h-px bg-white/20" />
                        <a
                            href={`#${it.id}`}
                            className="block text-[13px] text-gray-300 hover:text-white transition-colors leading-snug"
                        >
                            {it.heading}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
