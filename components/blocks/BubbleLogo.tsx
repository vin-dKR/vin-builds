import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

type BubbleLogoProp = {
    text: {
        icon: string;
        name: string;
    };
    index: number;
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
};

const sizeMap = {
    xs: { circle: "w-4 h-4 p-[1px]", img: 12 },
    sm: { circle: "w-6 h-6 p-[2px]", img: 16 },
    md: { circle: "w-8 h-8 p-[2px]", img: 24 },
    lg: { circle: "w-10 h-10 p-[2px]", img: 32 },
    xl: { circle: "w-12 h-12 p-[2px]", img: 40 },
    xxl: { circle: "w-16 h-16 p-[2px]", img: 56 },
};

const BubbleLogo = ({ text, index, size = "sm" }: BubbleLogoProp) => {
    const [hoveredtext, setHoveredtext] = useState<string | null>(null);
    const s = sizeMap[size] || sizeMap.sm;

    return (
        <motion.div
            className="relative group/text"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ zIndex: 10 }}
            onHoverStart={() => setHoveredtext(text.name)}
            onHoverEnd={() => setHoveredtext(null)}
        >
            <motion.div
                className={`rounded-full bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden ${s.circle}`}
                whileHover={{
                    scale: 1.2,
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    boxShadow: "0 0 10px rgba(255, 255, 255, 0.3)"
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
                <Image
                    src={text.icon}
                    alt={text.name}
                    width={s.img}
                    height={s.img}
                    className="object-contain rounded-full"
                />
            </motion.div>
            <AnimatePresence>
                {hoveredtext === text.name && (
                    <motion.div
                        className="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-black/90 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                        {text.name}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default BubbleLogo;
