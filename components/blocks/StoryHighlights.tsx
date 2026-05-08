import { RichText } from "@/components/blocks/RichText"

const ACCENTS = [
    {
        bar: "from-amber-400 to-orange-500",
        text: "text-amber-300",
        glow: "from-amber-500/[0.10]",
        num: "text-amber-400/60",
    },
    {
        bar: "from-violet-400 to-fuchsia-500",
        text: "text-violet-300",
        glow: "from-violet-500/[0.10]",
        num: "text-violet-400/60",
    },
    {
        bar: "from-emerald-400 to-teal-500",
        text: "text-emerald-300",
        glow: "from-emerald-500/[0.10]",
        num: "text-emerald-400/60",
    },
    {
        bar: "from-sky-400 to-blue-500",
        text: "text-sky-300",
        glow: "from-sky-500/[0.10]",
        num: "text-sky-400/60",
    },
    {
        bar: "from-rose-400 to-pink-500",
        text: "text-rose-300",
        glow: "from-rose-500/[0.10]",
        num: "text-rose-400/60",
    },
]

function splitHeadline(s: string): { headline: string | null; body: string } {
    const bold = s.match(/\*\*([^*]+)\*\*/)
    if (bold) {
        const before = s.slice(0, bold.index!).trim()
        const after = s.slice(bold.index! + bold[0].length).trim()
        const body = `${before} ${after}`.replace(/\s+/g, " ").trim()
        return { headline: bold[1], body: body.replace(/^[-–—:,.\s]+/, "") }
    }
    const under = s.match(/__([^_]+)__/)
    if (under) {
        const before = s.slice(0, under.index!).trim()
        const after = s.slice(under.index! + under[0].length).trim()
        const body = `${before} ${after}`.replace(/\s+/g, " ").trim()
        return { headline: under[1], body: body.replace(/^[-–—:,.\s]+/, "") }
    }
    const code = s.match(/`([^`]+)`/)
    if (code) {
        const before = s.slice(0, code.index!).trim()
        const after = s.slice(code.index! + code[0].length).trim()
        const body = `${before} ${after}`.replace(/\s+/g, " ").trim()
        return { headline: code[1], body: body.replace(/^[-–—:,.\s]+/, "") }
    }
    return { headline: null, body: s }
}

export function StoryHighlights({ items }: { items: string[] }) {
    if (!items.length) return null

    return (
        <section
            aria-label="Highlights"
            className="mb-12 relative"
        >
            <div className="flex items-center gap-3 mb-5">
                <span className="block w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_12px_2px_rgba(251,191,36,0.6)]" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-gray-300 font-semibold">
                    the gist
                </span>
                <span className="font-mono text-[10px] text-gray-500 tabular-nums">
                    {String(items.length).padStart(2, "0")}
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5">
                {items.map((t, i) => {
                    const { headline, body } = splitHeadline(t)
                    const a = ACCENTS[i % ACCENTS.length]
                    const isHero = i === 0
                    return (
                        <article
                            key={i}
                            className={`${isHero ? "lg:col-span-2" : ""} group relative overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a]`}
                        >
                            <span
                                aria-hidden
                                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${a.glow} via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500`}
                            />
                            <span
                                aria-hidden
                                className={`pointer-events-none absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${a.bar} blur-3xl opacity-[0.08] group-hover:opacity-[0.18] transition-opacity duration-500`}
                            />
                            <span
                                aria-hidden
                                className={`absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b ${a.bar} opacity-80`}
                            />

                            <div
                                className={`relative px-4 ${isHero ? "py-5 lg:py-6" : "py-4"}`}
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <span
                                        className={`font-mono text-[10px] tracking-[0.2em] ${a.num}`}
                                    >
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <span
                                        aria-hidden
                                        className={`block h-px w-6 bg-gradient-to-r ${a.bar} opacity-60`}
                                    />
                                </div>

                                {headline && (
                                    <h3
                                        className={`font-bold leading-[1.05] tracking-tight mb-2 ${a.text} ${isHero
                                            ? "text-[22px] lg:text-[26px]"
                                            : "text-[16px] lg:text-[17px]"
                                            }`}
                                    >
                                        {headline}
                                    </h3>
                                )}
                                <p
                                    className={`leading-relaxed text-gray-300 ${isHero ? "text-[14px]" : "text-[12.5px]"
                                        }`}
                                >
                                    <RichText>{body}</RichText>
                                </p>
                            </div>
                        </article>
                    )
                })}
            </div>
        </section>
    )
}
