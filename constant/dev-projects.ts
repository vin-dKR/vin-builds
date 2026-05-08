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
            storyTitle: "Shipping Eduents - How I Built the Next.js Core of a Five-Repo EdTech Platform",
            storyReadTime: "8 min read",
            storyTldr: [
                "Owned the **Next.js 15 + Prisma + MongoDB** core of a 5-repo EdTech platform.",
                "Built a **dumb-relay WebSocket** server for live folder collab - one write path, no race conditions.",
                "Singleton **Puppeteer + Chromium** for PDF generation - cold start dropped from ~4s to ~600ms warm.",
                "__Fractional positions__ for drag-and-drop reorder - no write storms, no flap on concurrent drags.",
                "Vision-LLM pipeline that turns scanned PDFs into a searchable question bank - ~~EXIF rotation bug~~ ate the most days.",
            ],
            storySections: [
                {
                    heading: "What Eduents is",
                    tldr: "Teacher tool - upload PDFs, build papers, run online or OMR exams, see results.",
                    paragraphs: [
                        "Eduents helps teachers do four things - upload question PDFs and turn them into a searchable question bank, build question papers and exams from that bank, run those exams online or grade paper OMR sheets, and see how the students did.",
                        "I built the main app and the live-collaboration server. My teammate built the Python tools that read PDFs and detect images. __We meet at a small set of API rules.__",
                        "The question bank holds questions pulled from textbooks and content books. From there, the teacher picks the ones they want, drops them into `Create Test`, and downloads the paper as a PDF - questions on one file, answers on another (when answers are available).",
                    ],
                },
                {
                    heading: "What I own vs what my teammate built",
                    tldr: "Five repos. I own all the frontends + the main Next.js app + the WS server. Teammate owns the Python backends.",
                    paragraphs: [
                        "Honest split of the five repos:",
                    ],
                    bullets: [
                        "**eduents** (main app) - Next.js 15, React 19, Prisma, MongoDB, Clerk, Puppeteer, OpenAI SDK - **Me**.",
                        "**ws-questions-b** (live collab server) - Node.js, `ws` library - **Me**.",
                        "**image-auto-cropper** (Konva canvas tool) - Next.js 16 + Konva - **Me** (frontend) / teammate (Python backend).",
                        "**question-extractor-tool** (PDF -> JSON tool) - Vite + React 19 - **Me** (frontend) / teammate (Flask backend).",
                        "**question-image-verifier** (image checker tool) - Vite + React 19 - **Me** (frontend) / teammate (FastAPI backend).",
                        "This post is about the parts I built. I will mention the Python side only where my code talks to it.",
                    ],
                },
                {
                    heading: "Why five small repos, not one big one",
                    tldr: "Different runtimes, different deploy targets. One repo would slow everyone down.",
                    paragraphs: [
                        "Each app has a __different runtime, different deploy target, and different lifetime__. One repo would slow everyone down. Separate repos mean I ship the Next.js app to Vercel, the Python tools live on Railway where slow cold starts do not matter, and my teammate can change his backend without breaking my frontend as long as the JSON shape stays the same.",
                        "The contract between the apps is just two things - a list of allowed origins (so the browser can call across domains) and an agreed JSON shape for each endpoint.",
                    ],
                },
                {
                    heading: "The database design",
                    tldr: "One Prisma schema, two areas. ~~A `Student` is **not** a `User`~~ - keeps OMR exams sign-up-free.",
                    paragraphs: [
                        "Two main areas of data, sharing one database. **Area 1** is the question bank and folders - users own folders, folders hold questions, other users can be invited as owner, editor, or viewer. **Area 2** is the exams - a test holds questions, students take it, each answer is saved.",
                        "One unusual choice - ~~a `Student` is **not** a `User`~~. A student who only takes one OMR exam should not have to sign up. So the exam side has its own `Student` model with no login link. Cleaner, fewer accounts to manage.",
                        "The `Question` model is shared by four other tables. Prisma asks for unique relation names when this happens, which looks ugly once and then works forever:",
                    ],
                    code: {
                        language: "prisma",
                        content:
                            "model Question {\n  id              String                @id @default(auto()) @map(\"_id\") @db.ObjectId\n  folderQuestions FolderQuestion[]      @relation(\"QuestionToFolderQuestion\")\n  testQuestions   TestQuestion[]        @relation(\"QuestionToTestQuestion\")\n  testAnswers     TestAnswer[]          @relation(\"QuestionToTestAnswer\")\n  paperHistory    PaperHistoryQuestion[] @relation(\"QuestionToPaperHistoryQuestion\")\n}",
                    },
                },
                {
                    heading: "Reordering questions without breaking everything",
                    tldr: "__Fractional positions__ - drop between 2.0 and 3.0 = 2.5. No write storm. Tie-break on `questionId` for concurrent drags.",
                    paragraphs: [
                        "When a teacher drags question 5 between question 2 and question 3, two things can go wrong - the app could update every row's number below the move (**slow**), or two users dragging at the same time could fight.",
                        "I used a trick called __fractional positions__. Instead of integer positions (1, 2, 3...), I use floats (1.0, 2.0, 3.0...). To put a question between `2.0` and `3.0`, I just save `2.5`. No other rows change. To put one between `2.0` and `2.5`, save `2.25`. And so on.",
                        "When two users drag at the same time and pick the same number, I break the tie using the `questionId`. Boring rule, never fails.",
                    ],
                },
                {
                    heading: "The PDF maker",
                    tldr: "Singleton **Puppeteer + Chromium**. Cold ~4s -> warm ~600ms. Plus a CI guard so the missing-binary bug cannot come back quietly.",
                    paragraphs: [
                        "The most-loved feature is **click a button, get a clean question paper PDF**. Doing this on a server is hard because the browser engine (Chromium) is huge.",
                        "**Problem 1 - cold start is slow.** The first PDF after a long pause takes about 4 seconds because Chromium has to start. After that, about 600 ms. Fix - keep one Chromium running and reuse it. If Chromium dies, the listener clears the saved one so the next call starts a fresh one.",
                        "**Problem 2 - 'query engine not found' on Vercel.** Prisma needs a small binary file to talk to the database. With my custom Prisma setup, ~~that file did not get copied to the deploy bundle~~. The deploy died. Fix - a build step that copies the file into the bundle, plus a CI check that fails the build if the file is missing. __So this bug cannot come back quietly.__",
                    ],
                    code: {
                        language: "ts",
                        content:
                            "let browserPromise: Promise<Browser> | null = null\n\nexport async function getBrowser() {\n  if (!browserPromise) {\n    browserPromise = puppeteer.launch({\n      args: chromium.args,\n      executablePath: await chromium.executablePath(),\n      headless: chromium.headless,\n    })\n    const browser = await browserPromise\n    browser.on('disconnected', () => { browserPromise = null })\n  }\n  return browserPromise\n}",
                    },
                    video: "https://ik.imagekit.io/vinodkr/eduents-blog-4.webm/ik-video.mp4?tr=orig",
                },
                {
                    heading: "Math on screen vs math in the PDF",
                    tldr: "Two engines - **MathJax** for PDF (pixel-perfect), **KaTeX** for screen (fast). One small patch closes the gap.",
                    paragraphs: [
                        "Math is everywhere in EdTech. I used two tools because no single one does both jobs well - **MathJax** on the PDF side (slow but pixel-perfect) and **KaTeX** on the screen side (fast and good enough for editing).",
                        "The same formula does not look identical in both. So I wrote a small helper called `jaxUtils.ts` that fixes a few known differences (font alignment, a white-on-white bug) right before the PDF screenshot. The result is __very close, not identical, looks fine to a human__.",
                    ],
                },
                {
                    heading: "Live collaboration without scary bugs",
                    tldr: "WS server is __dumb on purpose__ - it just relays. Saving lives in server actions. One write path, no two-writer races.",
                    paragraphs: [
                        "When two teachers edit the same folder, their changes should show up live. I built a small WebSocket server that does this.",
                        "The server is __dumb on purpose__. It just passes messages around. It does **not** save anything to the database. All saving is done by normal server actions in the main Next.js app.",
                        "**Why split it this way?** A WebSocket can disconnect mid-message - a server action either fully saves or fails clean. Only one place writes to the database - no two-writers fighting. The cost is one extra HTTP request per change. Worth it for the safety.",
                        "The connect rule is strict - if the client does not send `folderId`, `userId`, and `userName`, the server slams the door:",
                    ],
                    code: {
                        language: "js",
                        content:
                            "const folderId = url.searchParams.get('folderId')\nconst userId = url.searchParams.get('userId')\nconst userName = url.searchParams.get('userName')\nif (!folderId || !userId || !userName) {\n  ws.close(1008, 'Missing required parameters')\n  return\n}",
                    },
                },
                {
                    heading: "One middleware, three jobs",
                    tldr: "`middleware.ts` does CORS + auth + onboarding in one pass. Skip the layout-redirect-loop trap.",
                    paragraphs: [
                        "One file, `eduents/middleware.ts`, runs on every request and does three things in one pass:",
                    ],
                    bullets: [
                        "**CORS** - check the request comes from an allowed origin.",
                        "**Login check** - if the user is not logged in, send them to the sign-in page.",
                        "**Onboarding check** - if the user has not finished sign-up, send them to the onboarding form.",
                        "Putting the onboarding step here (and not inside the page layout) avoids a bug where Clerk and my code redirect each other in a loop. ~~I learned that one the hard way.~~",
                    ],
                },
                {
                    heading: "Reading questions from PDFs",
                    tldr: "PDF -> PNG -> rotate -> vision LLM (boxes) -> vision LLM (text/options) -> crop -> stream progress to UI.",
                    paragraphs: [
                        "In `eduents/lib/school-test/`, my TypeScript code does these steps for each page of a PDF:",
                    ],
                    bullets: [
                        "Turn the PDF page into a **PNG image**.",
                        "Fix the image rotation. Phone cameras save photos with a hidden 'this side up' tag. Some tools read the tag, others ignore it. ~~If they disagree, the image is sideways.~~",
                        "Send the image to a **vision model**. Get back a list of where the question images are.",
                        "Send the image again with a different prompt. Get back the question **text and options as JSON**.",
                        "**Crop** out each question image using the boxes from step 3.",
                        "Send progress updates to the browser as each page finishes, so the user does not stare at a blank spinner.",
                    ],
                    video: "https://res.cloudinary.com/dxy88r7fu/video/upload/v1778142506/eduents-blog-6_mewhvr.mp4",
                },
                {
                    heading: "OMR grading",
                    tldr: "One server action does the lot - parse, save Student, save answers, score, return.",
                    paragraphs: [
                        "`/api/omr/checker` is one server action that does the whole grading job in one go:",
                    ],
                    bullets: [
                        "Takes the scanned and parsed sheet.",
                        "Creates a `Student` record (no login needed).",
                        "Saves the student's answers.",
                        "Counts the score and percentage.",
                        "Returns the result.",
                        "One block of code, one place to look if a number is wrong. __No queue or background job__ - the load is small enough that this is fine for now.",
                    ],
                },
                {
                    heading: "Cross-app calls",
                    tldr: "Hand-edited allowed-origins list lives in middleware. ~~Sounds primitive~~ - but adding a new origin needs a code review.",
                    paragraphs: [
                        "The four side apps call the main app from a different domain. The browser blocks this by default. To allow it, the main app keeps a list of allowed origins in its middleware.",
                        "There is no fancy service registry. The list is hand-edited. That sounds primitive but is actually __safer__ - adding a new origin needs a code review.",
                    ],
                },
                {
                    heading: "Bugs that ate days",
                    tldr: "Each one ended with a **fix + a guard** so it cannot come back quietly.",
                    bullets: [
                        "**'Query engine not found' on every Vercel deploy.** A Prisma file did not get bundled. Fix - a build step that copies it, plus a CI check that fails if it is missing.",
                        "**Phone-camera scans cropped the wrong region.** Image rotation tag was being read by the vision model but ignored by my cropper. Fix - bake the rotation into the pixels before any other step.",
                        "**Vision model JSON broke `JSON.parse`.** LaTeX backslashes inside the text broke parsing. Fix - a small repair function plus three retries.",
                        "**Onboarding redirect loops.** A silent error in my onboarding code left users bouncing forever. Fix - try/catch with logs and a clear error screen.",
                        "**Math PDF looked different from math on screen.** Two different math engines render differently. Fix - a small patch step before each PDF screenshot.",
                        "**Two users picking the same drag position.** Fix - tie-break by `questionId`, plus a unique index on `(folder, position)`.",
                    ],
                },
                {
                    heading: "Things I want to fix next",
                    tldr: "Honest backlog. Security debt up top.",
                    bullets: [
                        "Move all secret keys off the frontend. The image checker still reads a service-role key in the browser. ~~Security debt.~~",
                        "Decommission the second Supabase project. We migrated, never finished cleanup.",
                        "Add fuzzy matching for section names in the extractor.",
                        "Put OMR grading behind a queue once we get to a point where 100s of students grade at once.",
                    ],
                },
                {
                    heading: "Why I wrote this",
                    tldr: "If you are skimming - this is what I want you to remember.",
                    paragraphs: [
                        "I built Eduents because a teacher I know was spending **six hours a week** building question papers in Word and grading OMR sheets by hand. Multiply that by ten teachers, then by ten institutes - __real time, real money__.",
                        "If you are hiring, what I want you to take from this:",
                    ],
                    bullets: [
                        "__I can own a full Next.js + Prisma + MongoDB system__ - schema, middleware, server actions, PDF pipeline, live collab.",
                        "I work cleanly with code I do not own - my teammate's Python services and mine meet at simple JSON, no shared state.",
                        "I make trade-offs out loud - keep one browser warm, dumb-relay WebSocket, fractional positions, two math engines. **Each one has a stated cost.**",
                        "I close bugs at the root, not at the symptom. Each bug above ended with either a fix or a CI check so it cannot come back quietly.",
                    ],
                },
            ],
            contactCta: {
                title: "Want to work together?",
                message:
                    "Open to full-time roles and freelance projects. If you are building something hard - real-time, AI pipelines, complex schemas, anything where the boring layers eat your week - drop a message.",
                email: "vinodkumarmurmu62@gmail.com",
                github: "https://github.com/vin-dKR",
                linkedin: "https://linkedin.com/in/vinodkrs",
                twitter: "https://twitter.com/always_VinodKr",
            },
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
