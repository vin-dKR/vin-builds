import Link from "next/link"
import { Mail, Github, Linkedin, Twitter, ArrowUpRight } from "lucide-react"

export function ContactCta({ cta }: { cta: ProjectContactCta }) {
    const links: { href: string; label: string; icon: React.ReactNode; key: string }[] = []
    if (cta.email)
        links.push({
            href: `mailto:${cta.email}`,
            label: cta.email,
            icon: <Mail className="w-4 h-4" />,
            key: "email",
        })
    if (cta.github)
        links.push({
            href: cta.github,
            label: cta.github.replace(/^https?:\/\//, ""),
            icon: <Github className="w-4 h-4" />,
            key: "github",
        })
    if (cta.linkedin)
        links.push({
            href: cta.linkedin,
            label: cta.linkedin.replace(/^https?:\/\//, ""),
            icon: <Linkedin className="w-4 h-4" />,
            key: "linkedin",
        })
    if (cta.twitter)
        links.push({
            href: cta.twitter,
            label: cta.twitter.replace(/^https?:\/\//, ""),
            icon: <Twitter className="w-4 h-4" />,
            key: "twitter",
        })

    return (
        <section className="mt-16 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent p-6">
            <h3 className="text-lg md:text-xl font-bold mb-2 text-white">
                {cta.title || "Want to work together?"}
            </h3>
            {cta.message && (
                <p className="text-gray-300 text-sm leading-relaxed mb-5">
                    {cta.message}
                </p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {links.map((l) => (
                    <Link
                        key={l.key}
                        href={l.href}
                        target={l.key === "email" ? undefined : "_blank"}
                        className="group flex items-center justify-between gap-2 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 px-3 py-2.5 transition-colors"
                    >
                        <span className="flex items-center gap-2 text-sm text-gray-200">
                            <span className="text-gray-400">{l.icon}</span>
                            {l.label}
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-white transition-colors" />
                    </Link>
                ))}
            </div>
        </section>
    )
}
