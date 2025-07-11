import { motion } from "framer-motion";
import Image from "next/image";

interface PreviewContainerProps {
    images: string
}

function PreviewContainer({ images }: PreviewContainerProps) {

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full bg-black rounded-sm border border-white/5 flex flex-row justify-center items-center h-full mb-4 overflow-hidden gap-0 shadow-white/5 shadow-lg"
        >
            {images ?
                <Image
                    src={images}
                    alt="kjk"
                    className="object-contain w-full h-full"
                    width={800}
                    height={800}
                />
                :
                <h1>adsfads</h1>
            }

        </motion.div>

    );
}

export default PreviewContainer
