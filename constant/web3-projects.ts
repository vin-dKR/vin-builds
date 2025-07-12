type Project = {
    title: string;
    status: string;
    statusColor: "green" | "blue" | "orange" | "gray" | "amber";
    description: string;
    href: string;
    stack: string;
    technologies: {
        name: string;
        icon: string;
    }[];
}

export const web3Projects: Project[] = [
    {
        title: "SOL Faucet",
        status: "completed",
        statusColor: "green",
        description: "SOL Airdropper for devnet and testnet",
        href: "https://sol-faucet-gamma.vercel.app/",
        stack: "Full Stack",
        technologies: [
            { name: "Next.js", icon: "/tech/nextjs.svg" },
            { name: "Node.js", icon: "/tech/nodejs.svg" },
            { name: "Typescript", icon: "/tech/typescript.svg" },
            { name: "Solana", icon: "tech/solana.svg" },
        ]
    }
]
