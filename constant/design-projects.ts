type DesignProject = {
    title: string;
    description: string;
    href: string;
    previewImages: {
        top: string;
        bottom: string;
    };
    designLink?: string;
    designTool?: {
        name: string;
        icon: string;
    }[];
    thumbnail?: string
}

export const designProjects: DesignProject[] = [
    {
        title: "Vin Wallpaper",
        description: "It is a AI bot posting beautiful wallpapers",
        href: "https://x.com/vin_wallpapers",
        previewImages: {
            top: "/design/imgs/vin-ai.png",
            bottom: "/design/imgs/vin-ai.png"
        },
        thumbnail: "/design/imgs/vin-ai.png",
        designLink: "https://www.figma.com/design/EeNFj9sXShUGWHRSbpN6pM/vin-wallpaper?node-id=0-1&t=e1QGKfv7GAYH3KVb-1",
        designTool: [
            { name: "Figma", icon: "/design/figma.svg" }
        ]
    },
    {
        title: "Eduents",
        description: "It's is platfrom to create Exams Effortlessly.",
        href: "https://eduents.com",
        previewImages: {
            top: "/design/imgs/eduents.png",
            bottom: "/design/imgs/vinui.png"
        },
        thumbnail: "/design/imgs/eduents.png",
        designLink: "https://www.figma.com/design/QTQBx7bSg44JsHwW0osZN2/eduents.com?node-id=0-1&t=PZbnUMyTAdTJM34b-1",
        designTool: [
            { name: "Figma", icon: "/design/figma.svg" }
        ]
    },
    {
        title: "Vin UI",
        description: "it is a next js cusotm component library",
        href: "https://vin-ui.vercel.app/",
        previewImages: {
            top: "/design/imgs/dentist-top.png",
            bottom: "/design/imgs/vinui.png"
        },
        thumbnail: "/design/imgs/vinui.png",
        designLink: "https://www.figma.com/design/Z6eV60ObOtKEvo0SiKIGKX/Vin-UI?node-id=0-1&t=WRpNOkQVh2uSK0KA-1",
        designTool: [
            { name: "Figma", icon: "/design/figma.svg" }
        ]
    },
    {
        title: "The Orange Leaf",
        description: "It is a restaurant with modern UI",
        href: "https://theorangeleaf.vercel.app/",
        previewImages: {
            top: "/design/imgs/orangeleaf.png",
            bottom: "/design/imgs/dentist-bottom.png"
        },
        thumbnail: "/design/imgs/orangeleaf.png",
        designLink: "https://www.figma.com/design/yX3mKuf0SVPU3VLRBLTvZ1/Restaurant?node-id=0-1&t=uS2Snl1eGWbQsg5Z-1",
        designTool: [
            { name: "Figma", icon: "/design/figma.svg" }
        ]
    },
    {
        title: "Dentist",
        description: "modern Redesign of https://www.billdorfmandds.com/ website",
        href: "https://www.billdorfmandds.com/",
        previewImages: {
            top: "/design/imgs/dentist-top.png",
            bottom: "/design/imgs/dentist-bottom.png"
        },
        thumbnail: "/design/imgs/dentist.png",
        designLink: "https://www.figma.com/design/NFgcTPSUVJD0hCVnCZZsqg/Dentist?node-id=0-1&t=a5eRYtPjAgDqnJRI-1",
        designTool: [
            { name: "Figma", icon: "/design/figma.svg" }
        ]
    },
    {
        title: "Maxico Salon",
        description: "Salon UI",
        href: "https://salon-one-ivory.vercel.app/",
        previewImages: {
            top: "/design/imgs/salon-bottom.png",
            bottom: "/design/imgs/salon-top.png"
        },
        thumbnail: "/design/imgs/salon2.png",
        designLink: "https://www.figma.com/design/GVcxg41fKOSh5IooT0Tpyf/Salon?node-id=143-2560&t=QP7ByvSyp9SSYcNZ-1",
        designTool: [
            { name: "Figma", icon: "/design/figma.svg" }
        ]
    },
    {
        title: "Hellium AI",
        description: "It is a AI powered sales assistant! Embed Hellium AI into any website with just a snippet of code!",
        href: "https://hellium.vercel.app/",
        previewImages: {
            top: "/design/imgs/salon-bottom.png",
            bottom: "/design/imgs/salon-top.png"
        },
        thumbnail: "/design/imgs/hellium-ai.png",
        designLink: "https://www.figma.com/design/WnHOOiblXIr9lAjwztajcK/Hellium-AI?node-id=0-1&t=QP7ByvSyp9SSYcNZ-1",
        designTool: [
            { name: "Figma", icon: "/design/figma.svg" }
        ]
    }
]
