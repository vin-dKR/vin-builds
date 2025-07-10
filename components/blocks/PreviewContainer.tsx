import { useIsMobile } from "@/hooks/useBreakpoint";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";


function PreviewContainer({ images }: { images: { top: string; bottom: string } }) {
    const isMobile = useIsMobile();
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });

    // Animation values
    const yTop = isMobile ? 80 : 125;
    const yBottom = isMobile ? -80 : -125;
    const xTop = isMobile ? 12 : 22;
    const xBottom = isMobile ? -10 : -20;

    // For angled entry, match the -15deg tilt
    const entryDistance = isMobile ? 100 : 200;
    const angle = 18 * (Math.PI / 180);
    const xEntry = Math.round(Math.sin(angle) * entryDistance);
    const yEntry = Math.round(Math.cos(angle) * entryDistance);

    // Physics-based hover (tilt) effect
    function useTiltMotion() {
        const x = useMotionValue(0.5);
        const y = useMotionValue(0.5);
        // Make the tilt effect more pronounced
        const rotateX = useSpring(useTransform(y, [0, 1], [20, -20]), { stiffness: 200, damping: 18 });
        const rotateY = useSpring(useTransform(x, [0, 1], [-20, 20]), { stiffness: 200, damping: 18 });
        const scale = useSpring(useTransform(x, [0, 1], [1.08, 1.08]), { stiffness: 200, damping: 18 });
        const shadow = useTransform(x, [0, 1], [
            '0 8px 32px 0 rgba(0,0,0,0.25)',
            '0 16px 48px 0 rgba(0,0,0,0.35)'
        ]);

        function onMouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
            const rect = e.currentTarget.getBoundingClientRect();
            const px = (e.clientX - rect.left) / rect.width;
            const py = (e.clientY - rect.top) / rect.height;
            x.set(px);
            y.set(py);
        }
        function onMouseLeave() {
            x.set(0.5);
            y.set(0.5);
        }
        return { rotateX, rotateY, scale, shadow, onMouseMove, onMouseLeave };
    }

    const topTilt = useTiltMotion();
    const bottomTilt = useTiltMotion();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            ref={ref}
            className="relative w-full bg-black rounded-sm border border-white/5 flex flex-row justify-center items-center h-72 mb-4 overflow-hidden gap-0 px-12 shadow-white/5 shadow-lg"
        >


            <motion.div
                className="w-1/2 flex items-center justify-center"
                style={{ zIndex: 2 }}
                onMouseMove={topTilt.onMouseMove}
                onMouseLeave={topTilt.onMouseLeave}
            >
                <motion.img
                    src={images.top}
                    alt="Bottom preview"
                    initial={{ y: -yEntry, x: -xEntry, opacity: 0, rotate: -15 }}
                    animate={
                        inView
                            ? { y: yTop, x: xTop, opacity: 1, rotate: -15 }
                            : { y: -yEntry, x: -xEntry, opacity: 0, rotate: -15 }
                    }
                    transition={{ duration: 1.8, type: "spring", delay: 0.15 }}
                    className="shadow-lg rounded-md w-full h-full object-cover"
                    style={{
                        rotateX: topTilt.rotateX,
                        rotateY: topTilt.rotateY,
                        scale: topTilt.scale,
                        boxShadow: topTilt.shadow,
                        cursor: "pointer",
                        transition: 'box-shadow 0.2s, transform 0.2s',
                    }}
                />
            </motion.div>
            <motion.div
                className="w-1/2 h-full flex items-center justify-center"
                style={{ zIndex: 1 }}
                onMouseMove={bottomTilt.onMouseMove}
                onMouseLeave={bottomTilt.onMouseLeave}
            >
                <motion.img
                    src={images.bottom}
                    alt="Top preview"
                    initial={{ y: yEntry, x: xEntry, opacity: 0, rotate: -15 }}
                    animate={
                        inView
                            ? { y: yBottom, x: xBottom, opacity: 1, rotate: -15 }
                            : { y: yEntry, x: xEntry, opacity: 0, rotate: -15 }
                    }
                    transition={{ duration: 1.8, type: "spring" }}
                    className="shadow-lg rounded-md w-full object-cover"
                    style={{
                        rotateX: bottomTilt.rotateX,
                        rotateY: bottomTilt.rotateY,
                        scale: bottomTilt.scale,
                        boxShadow: bottomTilt.shadow,
                        cursor: "pointer",
                        transition: 'box-shadow 0.2s, transform 0.2s',
                    }}
                />
            </motion.div>
        </motion.div>
    );
}

export default PreviewContainer