"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

export function CodeBlock({
    language,
    content,
}: {
    language?: string
    content: string
}) {
    const [copied, setCopied] = useState(false)
    const onCopy = async () => {
        try {
            await navigator.clipboard.writeText(content)
            setCopied(true)
            setTimeout(() => setCopied(false), 1400)
        } catch { }
    }
    return (
        <div className="my-4 rounded-lg overflow-hidden border border-white/10 bg-[#0b0b0b] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/5 bg-white/[0.03]">
                <div className="flex items-center gap-2">
                    <span className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                    </span>
                    {language && (
                        <span className="text-[10px] uppercase tracking-wider text-gray-400 font-mono ml-2">
                            {language}
                        </span>
                    )}
                </div>
                <button
                    onClick={onCopy}
                    className="text-[11px] text-gray-400 hover:text-white inline-flex items-center gap-1 transition-colors cursor-pointer"
                    aria-label="Copy code"
                >
                    {copied ? (
                        <>
                            <Check className="w-3 h-3" /> copied
                        </>
                    ) : (
                        <>
                            <Copy className="w-3 h-3" /> copy
                        </>
                    )}
                </button>
            </div>
            <pre className="p-4 overflow-x-auto text-[12.5px] leading-relaxed text-gray-200 font-mono">
                <code>{content}</code>
            </pre>
        </div>
    )
}
