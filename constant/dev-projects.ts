type Project = {
    title: string;
    status: string;
    statusColor: "green" | "blue" | "orange" | "gray" | "amber";
    description: string;
    href: string;
    stack: string;
    freelance?: boolean;
    technologies: {
        name: string;
        icon: string;
    }[];
    details?: ProjectDetails;
}

export const devProjects: Project[] = [
    {
        title: "Atari",
        status: "completed",
        statusColor: "green",
        description: "Revamp of ICAR-ATARI's agricultural management portal with a new backend architecture for extension education tracking.",
        href: "https://atari-client.vercel.app/",
        stack: "Full Stack",
        freelance: true,
        technologies: [
            { name: "React.js", icon: "/tech/react.svg" },
            { name: "Typescript", icon: "/tech/typescript.svg" },
            { name: "Node.js", icon: "/tech/nodejs.svg" },
            { name: "PostgreSQL", icon: "/tech/postgres.svg" },
            { name: "Tanstack", icon: "/tech/tanstack.png" },
            { name: "Prisma", icon: "/tech/prisma.svg" },
            { name: "Tailwind", icon: "/tech/tailwind.svg" },
            { name: "Puppeteer", icon: "/tech/puppeteer.svg" }
        ]
    },
    {
        title: "Pagz",
        status: "completed",
        statusColor: "green",
        description: "Online custom printing platform with ordering, tracking, and delivery for businesses.",
        href: "https://pagz.in/",
        stack: "Full Stack",
        freelance: true,
        technologies: [
            { name: "Next.js", icon: "/tech/nextjs.svg" },
            { name: "Typescript", icon: "/tech/typescript.svg" },
            { name: "Node.js", icon: "/tech/nodejs.svg" },
            { name: "MySQL", icon: "/tech/mysql.svg" },
            { name: "Tanstack", icon: "/tech/tanstack.png" },
            { name: "Prisma", icon: "/tech/prisma.svg" },
            { name: "Tailwind", icon: "/tech/tailwind.svg" }
        ],
        details: {
            duration: "Feb 26 – May 26",
            storyTitle: "How Pagz was built",
            storySections: [
                {
                    heading: "What Pagz is",
                    paragraphs: [
                        "Pagz is a print-on-demand store. A customer picks a category like 'Booklet Print', uploads a PDF, picks paper size, color mode, sides, copies, addons (binding, lamination), sees a live price built from a category-specific rule engine, pays with Razorpay, and gets the printed booklets shipped.",
                        "I built the whole thing solo for a freelance client - three apps, around 300 commits, four months, deployed on Hostinger plus Vercel.",
                    ],
                },
                {
                    heading: "Three apps, no monorepo",
                    bullets: [
                        "api - Express on Bun (dev) / Node (prod), Prisma against MariaDB, Razorpay + FTP integrations.",
                        "web - Next.js 16, React 19, Tailwind 4, TanStack Query (customer storefront).",
                        "admin - Next.js 16 with @dnd-kit, hand-coded charts, Zod-validated forms (operations panel).",
                        "Trade-off: types duplicated between web and admin. Win: one-zip-per-app deploys to Hostinger, no surprise build-graph coupling.",
                    ],
                },
                {
                    heading: "Hostinger gives MariaDB, not Postgres",
                    paragraphs: [
                        "Most Prisma tutorials assume Postgres. The default MySQL connector works against MariaDB but has small quirks, and shared hosting has a tight connection limit. Fix - use the dedicated MariaDB adapter with discrete env vars (DATABASE_HOST, DATABASE_USER, etc.) and a connection pool capped at 5.",
                    ],
                    code: {
                        language: "ts",
                        content:
                            "import { PrismaMariaDb } from '@prisma/adapter-mariadb'\n\nconst adapter = new PrismaMariaDb({\n  host, user, password, database,\n  connectionLimit: 5,\n})\nconst prisma = new PrismaClient({ adapter })",
                    },
                },
                {
                    heading: "A pricing engine where rules are also products",
                    paragraphs: [
                        "The catalog has two kinds of things - services (print jobs) and products (SKUs on a shelf). I wanted both to flow through the same Cart, Order, and Wishlist tables.",
                        "A CategoryPricingRule carries a base-price config. When the admin publishes a rule, the system creates a real Product row from it and tags it generatedFromPricingRule = true. Cart and order key on productId. Service jobs and physical SKUs use the same code path. When the rule changes, a resync rewrites the Product. Old orders stay correct because every OrderItem.metadata carries a snapshot of the price breakdown taken at order time.",
                    ],
                },
                {
                    heading: "Half-page math (and why I do not trust the client)",
                    paragraphs: [
                        "Picking 'Both Sides' duplex-prints a 200-page PDF onto 100 sheets. That changes base price, page-controller cap, and addon ranges. Each in different ways.",
                        "Two pieces - first, an isHalfPage flag lives on the spec option, not the category. Second, the server always derives effectivePageCount from spec metadata at every pricing checkpoint. There was a brief window where the client sent the field and the server trusted it. That ended the moment someone realized you could halve your invoice by sending the wrong number.",
                        "After more iterations - addon range gates use raw pages × copies (the physical book), not the half-page-reduced count (the press output). A binding addon for 'books up to 200 pages' is about the book the customer holds.",
                    ],
                },
                {
                    heading: "The guest cart that survives login",
                    paragraphs: [
                        "Customers configure a 200-page color-printed booklet with addons, then have to log in. sessionStorage has a quota of about 5-10 MB, and a single base64-encoded PDF can blow it.",
                        "Strategy - small files become base64 in sessionStorage, larger files become blob URLs, already-uploaded files keep just the S3 key. On QuotaExceededError, retry without file payloads - keep only metadata. Better to ask the user to re-pick a file than lose the whole configuration.",
                        "Post-login recovery converts base64 back into File objects, re-uploads, validates addon IDs against live rules (silently drops stale ones), reconstructs metadata, re-issues add-to-cart. Around 850 LOC across two utilities.",
                    ],
                },
                {
                    heading: "The Hostinger trailing-slash redirect loop",
                    paragraphs: [
                        "Account pages would intermittently fail to load. The browser network tab showed /orders being 308'd to /orders/, then RSC payloads being re-fetched, then redirected again. Looked like a Next bug.",
                        "Cause - Hostinger's reverse proxy adds a trailing-slash redirect. Next.js's default canonical URL is no trailing slash. Each side thinks the other is wrong. Loop.",
                        "Fix - one line in next.config.js: trailingSlash: true. Hours of debugging. Documented in CLAUDE.md as 'do not flip' so the next dev does not undo it.",
                    ],
                },
                {
                    heading: "Switching the payment gateway live",
                    paragraphs: [
                        "The first version of Pagz used a different gateway. After a month of running it, I migrated the live system to Razorpay.",
                        "The interesting part is the race - the success-handler call (when the customer lands back on the callback page) and the S2S webhook can both arrive first, and both want to create the order.",
                        "Fix - two-phase order creation. At initiate, serialize the cart into a PendingPayment row with a 1-hour TTL. At success (whichever path lands first), flip status to USED in the same transaction that creates Order + OrderItem + Payment. The other path arrives, finds status = USED, returns 200 idempotently.",
                    ],
                },
                {
                    heading: "Bugs that ate days",
                    bullets: [
                        "Trailing-slash redirect loop on Hostinger - one-line fix, hours of diagnosis.",
                        "Client-spoofed effectivePageCount - server now derives from spec metadata.",
                        "Addon range gating on the wrong page count - decided ranges gate on the physical book.",
                        "Razorpay success-handler vs webhook race - two-phase order creation with PendingPayment lock.",
                        "Chunk-load errors after deploys - aggressive splitChunks plus a layout-level error handler with 'Reload' CTA.",
                        "Invoice math drifting after rule edits - persist breakdown at order time, never recompute on render.",
                    ],
                },
                {
                    heading: "What I want a hiring manager to take from this",
                    bullets: [
                        "I can own a full e-commerce stack solo - schema, API, payments, FTP, PDF invoices, two Next.js apps, deploys, on-call.",
                        "I work directly with non-technical clients. Translating 'I want my customers to upload a PDF and pick binding' into a spec engine, a pricing rule, and a half-page math fix is the job.",
                        "I make trade-offs out loud. Three apps over a monorepo. MariaDB adapter over default. Persisted breakdown over recomputed.",
                        "I close bugs at the root. The half-page spoof, the redirect loop, the chunk errors - each ended with either code or CI that prevents the bug from coming back.",
                    ],
                },
            ],
        }
    },
    {
        title: "Libly Space",
        status: "maintained",
        statusColor: "orange",
        description: "SaaS for library owners to manage inventory, members, and subscriptions.",
        href: "https://libly.space",
        stack: "Full Stack",
        technologies: [
            { name: "Next.js", icon: "/tech/nextjs.svg" },
            { name: "Typescript", icon: "/tech/typescript.svg" },
            { name: "Node.js", icon: "/tech/nodejs.svg" },
            { name: "PostgreSQL", icon: "/tech/postgres.svg" },
            { name: "Tanstack", icon: "/tech/tanstack.png" },
            { name: "Zod", icon: "/tech/zod.svg" },
            { name: "Tailwind", icon: "/tech/tailwind.svg" }
        ],
        details: {
            video: "https://amh7dc2otlwrtz2o.public.blob.vercel-storage.com/libly-space-1767913058341.mp4",
            duration: "Present"
        }
    },
    {
        title: "Eduents",
        status: "maintained",
        statusColor: "orange",
        description: "AI exam builder for coaching institutes with student performance analytics.",
        href: "https://eduents.com",
        stack: "Full Stack",
        technologies: [
            { name: "Next.js", icon: "/tech/nextjs.svg" },
            { name: "Typescript", icon: "/tech/typescript.svg" },
            { name: "OpenAI", icon: "/tech/openai.svg" },
            { name: "MongoDB", icon: "/tech/mongo.svg" },
            { name: "Tailwind", icon: "/tech/tailwind.svg" },
            { name: "Clerk", icon: "tech/clerk.svg" },
            { name: "Prisma", icon: "tech/prisma.svg" },
            { name: "Motion", icon: "tech/motion.svg" },
            { name: "Puppeteer", icon: "tech/puppeteer.svg" },
        ],
        details: {
            video: "https://amh7dc2otlwrtz2o.public.blob.vercel-storage.com/eduents",
            duration: "May 25 – Present",
            storyTitle: "How Eduents was built",
            storySections: [
                {
                    heading: "What Eduents does",
                    paragraphs: [
                        "Eduents helps teachers do four things - upload question PDFs and turn them into a searchable question bank, build question papers and exams from that bank, run those exams online or grade paper OMR sheets, and see how the students did.",
                        "I built the main Next.js app and the live-collaboration server. My teammate built the Python tools that read PDFs and detect images. We meet at a small set of API rules.",
                    ],
                },
                {
                    heading: "What I own vs what my teammate built",
                    bullets: [
                        "Me - the main Next.js 15 app (Prisma + MongoDB + Clerk + Puppeteer + OpenAI SDK).",
                        "Me - the standalone WebSocket collaboration server (Node.js + ws).",
                        "Me - the frontends of three satellite tools (Konva canvas, Vite + React extractor, Vite + React verifier).",
                        "Teammate - the Python backends (FastAPI + Flask + OpenCV + vision LLM glue).",
                    ],
                },
                {
                    heading: "Database design - one schema, two areas",
                    paragraphs: [
                        "The Prisma schema covers the question bank and the exam system in one file. One unusual choice - a Student is not a User. A student who only takes one OMR exam should not have to sign up. So the exam side has its own Student model with no login link.",
                        "The shared Question model is referenced from four tables. Prisma forces explicit relation names when this happens, which looks ugly once and then works forever.",
                    ],
                },
                {
                    heading: "Reordering questions without breaking everything",
                    paragraphs: [
                        "When a teacher drags question 5 between 2 and 3, I do not renumber every row below. I use fractional positions instead. The new position is just (2.0 + 3.0) / 2 = 2.5. No write storm.",
                        "When two users drag at the same time, a deterministic tie-breaker on questionId stops the visual flap. A unique (folderId, position) index stops collisions at the database level.",
                    ],
                },
                {
                    heading: "The PDF maker",
                    paragraphs: [
                        "Server-side PDFs use Puppeteer + @sparticuz/chromium. Cold start is about 4 seconds. With a singleton browser kept alive across warm invocations, that drops to about 600 ms.",
                        "The build also copies the right Prisma query engine binary into the deploy bundle - missed once, broke production, fixed with a webpack plugin step plus a CI check that fails the build if the binary is missing.",
                    ],
                    code: {
                        language: "ts",
                        content:
                            "let browserPromise: Promise<Browser> | null = null\n\nexport async function getBrowser() {\n  if (!browserPromise) {\n    browserPromise = puppeteer.launch({\n      args: chromium.args,\n      executablePath: await chromium.executablePath(),\n      headless: chromium.headless,\n    })\n    const browser = await browserPromise\n    browser.on('disconnected', () => { browserPromise = null })\n  }\n  return browserPromise\n}",
                    },
                },
                {
                    heading: "Live collaboration as a dumb relay",
                    paragraphs: [
                        "The WebSocket server is intentionally dumb. It just passes messages around. It does not save anything to the database.",
                        "All saving is done by normal server actions in the main Next.js app. Two reasons - WebSockets can drop mid-message, and one write path means one source of truth. The cost is one extra HTTP request per change. Worth it for the audit trail.",
                    ],
                },
                {
                    heading: "Vision LLM lessons",
                    paragraphs: [
                        "The bug that ate the most days - phone-camera scans were getting cropped at the wrong place. Reason: vision models silently rotated images using EXIF metadata, but my cropper read raw pixels. The fix was to bake EXIF rotation into pixels before any other step. One sharp(...).rotate() call, one bug class gone.",
                        "Other lessons - resize images to 1024x1024 before sending (cost), retry vision API calls with backoff (reliability), repair LaTeX backslashes before JSON.parse (broken JSON about half the time).",
                    ],
                },
                {
                    heading: "Bugs that ate days",
                    bullets: [
                        "Prisma 'query engine not found' on Vercel - fixed with a build-time copy + a CI guard.",
                        "Phone-camera scans cropped wrong - fixed by baking EXIF rotation into pixels before any other step.",
                        "Vision-model JSON broke JSON.parse - fixed with a small repair function plus three retries.",
                        "Onboarding redirect loops - silent error in completeOnboarding; fixed with try/catch, logs, and a clear error screen.",
                        "Math drift between PDF and screen - patched MathJax SVG output in jaxUtils.ts before screenshot.",
                        "Concurrent reorder collisions - tie-breaker on questionId plus a unique (folderId, position) index.",
                    ],
                },
                {
                    heading: "What I want a hiring manager to take from this",
                    bullets: [
                        "I can own a complex Next.js + Prisma + MongoDB system end-to-end - schema, middleware, server actions, PDF generation, real-time collab, vision LLM integration.",
                        "I work cleanly with code I do not own - my teammate's Python services and mine meet at simple JSON contracts, no shared state.",
                        "I make trade-offs out loud. Singleton Puppeteer, dumb-relay WebSocket, fractional positions, two math engines - each chosen with the cost stated.",
                        "I close bugs at the root. Each bug above ended with either a fix or a CI check so it cannot return quietly.",
                    ],
                },
            ],
        }
    },
    {
        title: "Web Scrapper AI",
        status: "completed",
        statusColor: "green",
        description: "AI-driven web scraper with a Chrome extension for structured data extraction.",
        href: "https://github.com/vin-dKR/vin-scrapper-ai",
        stack: "Full Stack",
        technologies: [
            { name: "Node.js", icon: "/tech/nextjs.svg" },
            { name: "Typescript", icon: "/tech/typescript.svg" },
            { name: "OpenAI", icon: "/tech/openai.svg" },
        ]
    },
    {
        title: "Vin Wallpaper",
        status: "on-going",
        statusColor: "blue",
        description: "Autonomous X bot generating and posting AI wallpapers via Replicate and Stability AI.",
        href: "https://x.com/vin_wallpapers",
        stack: "Full Stack",
        technologies: [
            { name: "Node.js", icon: "/tech/nextjs.svg" },
            { name: "Typescript", icon: "/tech/typescript.svg" },
            { name: "Replicate", icon: "/tech/replicate.svg" },
            { name: "stability-ai", icon: "/tech/stable-ai.svg" },
        ]
    },
    {
        title: "The Orange Leaf",
        status: "completed",
        statusColor: "green",
        description: "Restaurant landing site with menu, online ordering, and table reservations.",
        href: "https://theorangeleaf.vercel.app/",
        stack: "Frontend",
        technologies: [
            { name: "Next.js", icon: "/tech/nextjs.svg" },
            { name: "Tailwind", icon: "/tech/tailwind.svg" }
        ],
        details: {
            video: "https://amh7dc2otlwrtz2o.public.blob.vercel-storage.com/the-orange-leaf-1750495984840-AT8SAWU0cakcJNYB5iwd6saxEvY31O.mp4",
            duration: "Apr 25"
        }
    },
    {
        title: "Maxico Salon",
        status: "completed",
        statusColor: "green",
        description: "At-home beauty and bridal services booking site for a Delhi salon chain.",
        href: "https://salon-one-ivory.vercel.app",
        stack: "Frontend",
        technologies: [
            { name: "Next.js", icon: "/tech/nextjs.svg" },
            { name: "Tailwind", icon: "/tech/tailwind.svg" },
            { name: "Framer", icon: "/tech/framer.svg" }
        ]
    },
    {
        title: "Vin-UI",
        status: "maintained",
        statusColor: "orange",
        description: "React component library with pixel-perfect Tailwind and Framer Motion animations.",
        href: "https://vin-ui.vercel.app/",
        stack: "Frontend",
        technologies: [
            { name: "React", icon: "/tech/react.svg" },
            { name: "Next.js", icon: "/tech/nextjs.svg" },
            { name: "Tailwind", icon: "/tech/tailwind.svg" },
            { name: "Framer", icon: "/tech/framer.svg" }
        ],
        details: {
            video: "https://amh7dc2otlwrtz2o.public.blob.vercel-storage.com/cursorful-video-1750489106351-MEr4MeWGkLrk4UCOUd5HgZgxuqLZVJ.mp4",
            duration: "Mar 25 – Apr 25"
        }
    },
    {
        title: "Vin-UI CLI",
        status: "completed",
        statusColor: "green",
        description: "Rust CLI that scaffolds and installs Vin-UI components into Next.js projects with auto dependency handling.",
        href: "https://github.com/vin-dKR/vin-ui-cmd",
        stack: "Backend",
        technologies: [
            { name: "Rust", icon: "/tech/rust.svg" },
        ]
    },
    {
        title: "Portfolio",
        status: "maintained",
        statusColor: "orange",
        description: "Personal portfolio showcasing full-stack projects, stack, and contact links.",
        href: "https://vinodkr.in/",
        stack: "Frontend",
        technologies: [
            { name: "Next.js", icon: "/tech/nextjs.svg" },
            { name: "Tailwind", icon: "/tech/tailwind.svg" },
            { name: "Framer", icon: "/tech/framer.svg" }
        ]
    },
    {
        title: "Hellium AI",
        status: "completed",
        statusColor: "green",
        description: "Embeddable AI sales chatbot with Stripe payments, email marketing, and appointment scheduling.",
        href: "https://hellium.vercel.app/",
        stack: "Full Stack",
        technologies: [
            { name: "Next.js", icon: "/tech/nextjs.svg" },
            { name: "Node.js", icon: "/tech/nodejs.svg" },
            { name: "Typescript", icon: "/tech/typescript.svg" },
            { name: "Prisma", icon: "tech/prisma.svg" },
            { name: "Clerk", icon: "tech/clerk.svg" },
            { name: "PostgreSQL", icon: "/tech/postgres.svg" }
        ],
        details: {
            video: "https://amh7dc2otlwrtz2o.public.blob.vercel-storage.com/hellium-ai-1750488385543-3kFV380zdSxEOXoHp6VD18HOxa047k.mp4",
            duration: "Dec 24 – Jan 25"
        }
    }
]
