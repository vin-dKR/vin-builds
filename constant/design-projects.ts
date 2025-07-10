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
}

export const designProjects: DesignProject[] = [
    {
        title: "Dentist",
        description: "modern Redesign of https://www.billdorfmandds.com/ website",
        href: "https://www.billdorfmandds.com/",
        previewImages: {
            top: "/design/imgs/dentist-top.png",
            bottom: "/design/imgs/dentist-bottom.png"
        },
        designLink: "https://www.figma.com/design/NFgcTPSUVJD0hCVnCZZsqg/Dentist?node-id=0-1&t=a5eRYtPjAgDqnJRI-1",
        designTool: [
            { name: "Figma", icon: "/design/figma.svg" }
        ]
    },
    {
        title: "Vin Wallpaper",
        description: "AI Wallpaper x.com bot",
        href: "https://x.com/vin_wallpapers",
        previewImages: {
            top: "/design-previews/vinwallpaper-top.png",
            bottom: "/design-previews/vinwallpaper-bottom.png"
        }
    }
]
