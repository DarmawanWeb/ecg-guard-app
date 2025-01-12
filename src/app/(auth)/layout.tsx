"use client";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "framer-motion";
import Image from "next/image";
import Logo from "@/assets/img/logo.png";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuroraBackground className="max-h-[93vh]">
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.9,
          ease: "easeInOut",
          type: "spring",
          damping: 12,
          stiffness: 26,
        }}
        className="w-full px-10"
      >
        <div className="relative w-60 items-center mx-auto  mb-8 rounded-lg overflow-hidden ">
          <Image src={Logo} alt="Hero" className="object-cover w-full h-full" />
        </div>

        {children}
      </motion.div>
    </AuroraBackground>
  );
}
