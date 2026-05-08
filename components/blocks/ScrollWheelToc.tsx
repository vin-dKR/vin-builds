"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"

type Item = { id: string; heading: string }

export function ScrollWheelToc({ items }: { items: Item[] }) {
    const [activeIdx, setActiveIdx] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)
    const itemRefs = useRef<(HTMLAnchorElement | null)[]>([])
    const wheelProg = useRef(0)
    const pageProg = useRef(0)

    const centerWheelOnIdx = (idx: number) => {
        const c = containerRef.current
        const item = itemRefs.current[idx]
        if (!c || !item) return
        const top =
            item.offsetTop - c.clientHeight / 2 + item.clientHeight / 2
        if (Math.abs(c.scrollTop - top) < 1) return
        wheelProg.current++
        c.scrollTo({ top, behavior: "auto" })
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                wheelProg.current = Math.max(0, wheelProg.current - 1)
            })
        })
    }

    const scrollPageToIdx = (idx: number) => {
        const sec = document.getElementById(items[idx].id)
        if (!sec) return
        pageProg.current++
        const targetTop =
            window.scrollY +
            sec.getBoundingClientRect().top -
            window.innerHeight * 0.28
        window.scrollTo({ top: targetTop, behavior: "smooth" })
        setTimeout(() => {
            pageProg.current = Math.max(0, pageProg.current - 1)
        }, 600)
    }

    useLayoutEffect(() => {
        if (!items.length) return
        const targetY = window.innerHeight * 0.32
        let bestIdx = 0
        let bestDelta = -Infinity
        items.forEach((it, idx) => {
            const el = document.getElementById(it.id)
            if (!el) return
            const top = el.getBoundingClientRect().top
            const delta = top - targetY
            if (delta <= 0 && delta > bestDelta) {
                bestDelta = delta
                bestIdx = idx
            }
        })
        setActiveIdx(bestIdx)
        centerWheelOnIdx(bestIdx)
    }, [items])

    useEffect(() => {
        if (!items.length) return
        const onPage = () => {
            if (pageProg.current > 0) return
            const targetY = window.innerHeight * 0.32
            let bestIdx = 0
            let bestDelta = -Infinity
            items.forEach((it, idx) => {
                const el = document.getElementById(it.id)
                if (!el) return
                const top = el.getBoundingClientRect().top
                const delta = top - targetY
                if (delta <= 0 && delta > bestDelta) {
                    bestDelta = delta
                    bestIdx = idx
                }
            })
            setActiveIdx((cur) => {
                if (bestIdx !== cur) centerWheelOnIdx(bestIdx)
                return bestIdx
            })
        }
        window.addEventListener("scroll", onPage, { passive: true })
        window.addEventListener("resize", onPage)
        return () => {
            window.removeEventListener("scroll", onPage)
            window.removeEventListener("resize", onPage)
        }
    }, [items])

    useEffect(() => {
        const c = containerRef.current
        if (!c || !items.length) return
        let settleTimer: ReturnType<typeof setTimeout> | null = null
        let pendingIdx = -1
        const onWheel = () => {
            if (wheelProg.current > 0) return
            const center = c.scrollTop + c.clientHeight / 2
            let bestIdx = 0
            let bestDist = Infinity
            itemRefs.current.forEach((el, i) => {
                if (!el) return
                const ic = el.offsetTop + el.clientHeight / 2
                const d = Math.abs(ic - center)
                if (d < bestDist) {
                    bestDist = d
                    bestIdx = i
                }
            })
            setActiveIdx(bestIdx)
            pendingIdx = bestIdx
            if (settleTimer) clearTimeout(settleTimer)
            settleTimer = setTimeout(() => {
                if (pendingIdx >= 0) scrollPageToIdx(pendingIdx)
                pendingIdx = -1
            }, 180)
        }
        c.addEventListener("scroll", onWheel, { passive: true })
        return () => {
            c.removeEventListener("scroll", onWheel)
            if (settleTimer) clearTimeout(settleTimer)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items])

    if (!items.length) return null

    return (
        <aside
            aria-label="Section navigator"
            className="hidden lg:block fixed right-4 top-1/2 -translate-y-1/2 w-52 z-40 pointer-events-none"
        >
            <div className="text-[9px] uppercase tracking-[0.2em] text-gray-500 mb-2 text-right pr-1 pointer-events-auto">
                contents
            </div>
            <div className="relative">
                <span
                    aria-hidden
                    className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 w-7 h-px bg-amber-400 z-10"
                />
                <span
                    aria-hidden
                    className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-amber-400 translate-x-[6px] z-10"
                />
                <div
                    ref={containerRef}
                    className="relative max-h-[70vh] overflow-y-auto no-scrollbar pointer-events-auto"
                    style={{
                        maskImage:
                            "linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)",
                        WebkitMaskImage:
                            "linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)",
                    }}
                >
                    <ul className="py-[34vh] space-y-3.5">
                        {items.map((it, i) => {
                            const dist = Math.abs(i - activeIdx)
                            const isActive = i === activeIdx
                            const opacity = isActive
                                ? 1
                                : Math.max(0.12, 1 - dist * 0.2)
                            const scale = 1 - Math.min(dist, 5) * 0.04
                            const translateX = Math.min(dist, 4) * 4
                            return (
                                <li key={it.id} className="flex justify-end pr-1">
                                    <a
                                        ref={(el) => {
                                            itemRefs.current[i] = el
                                        }}
                                        href={`#${it.id}`}
                                        className={`group flex items-center gap-2.5 text-right will-change-transform transition-[opacity,transform,color] duration-300 ease-out ${isActive
                                            ? "text-white"
                                            : "text-gray-400 hover:text-gray-100"
                                            }`}
                                        style={{
                                            opacity,
                                            transform: `translateX(${translateX}px) scale(${scale})`,
                                            transformOrigin: "right center",
                                        }}
                                    >
                                        <span
                                            className={`leading-snug ${isActive
                                                ? "text-[13px] font-medium"
                                                : "text-[11.5px]"
                                                }`}
                                        >
                                            {it.heading}
                                        </span>
                                        <span className="block w-2 h-px bg-transparent" />
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
            <div className="mt-2 text-[9px] uppercase tracking-[0.2em] text-gray-500 text-right pr-1 pointer-events-auto tabular-nums">
                {String(activeIdx + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </div>
        </aside>
    )
}
