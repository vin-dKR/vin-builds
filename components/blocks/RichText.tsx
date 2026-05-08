import React from "react"

const TOKEN_RE =
    /(`[^`]+`|\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|__[^_]+__|~~[^~]+~~)/g

export function RichText({ children }: { children: string }) {
    const out: React.ReactNode[] = []
    let last = 0
    let key = 0
    for (const m of children.matchAll(TOKEN_RE)) {
        const idx = m.index ?? 0
        if (idx > last) out.push(children.slice(last, idx))
        const t = m[0]
        if (t.startsWith("`")) {
            out.push(
                <code
                    key={key++}
                    className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10 text-[0.85em] text-amber-200 font-mono"
                >
                    {t.slice(1, -1)}
                </code>
            )
        } else if (t.startsWith("[")) {
            const inner = t.match(/\[([^\]]+)\]\(([^)]+)\)/)
            if (inner) {
                out.push(
                    <a
                        key={key++}
                        href={inner[2]}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-400 hover:text-blue-300 underline underline-offset-2 decoration-blue-400/40"
                    >
                        {inner[1]}
                    </a>
                )
            }
        } else if (t.startsWith("**")) {
            out.push(
                <strong key={key++} className="font-semibold text-white">
                    {t.slice(2, -2)}
                </strong>
            )
        } else if (t.startsWith("__")) {
            out.push(
                <span key={key++} className="underline-em">
                    {t.slice(2, -2)}
                </span>
            )
        } else if (t.startsWith("~~")) {
            out.push(
                <span key={key++} className="squiggly">
                    {t.slice(2, -2)}
                </span>
            )
        }
        last = idx + t.length
    }
    if (last < children.length) out.push(children.slice(last))
    return <>{out}</>
}
