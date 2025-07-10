import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import React from "react";

interface ArrowButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const ArrowButton: React.FC<ArrowButtonProps> = ({ href, children, className = "", ...props }) => {
  return (
    <Link
      href={href}
      target="_blank"
      className={`group bg-gray-100 hover:bg-gray-200 text-black px-3 py-0 rounded transition flex items-center  ${className}`}
      {...props}
    >
      {children}
      <motion.span
        animate={{ scale: 1, rotate: 0 }}
        whileTap={{ scale: 0.95 }}
        className="ml-2 flex items-center group-hover:scale-125 group-hover:rotate-45 transition-transform"
      >
        <ArrowUpRight className="w-4 h-4 text-black transition-colors" />
      </motion.span>
    </Link>
  );
};

export default ArrowButton; 