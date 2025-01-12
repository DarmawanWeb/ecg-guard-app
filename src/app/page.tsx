"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Logo from "@/assets/img/logo.png";

const HomePage = () => {
  const router = useRouter();

  const navigateTo = (path: string) => {
    router.push(path);
  };

  const signUpHandler = (roleId: number) => {
    navigateTo(`/signup?id=${roleId}`);
  };

  const loginRedirectHandler = () => {
    navigateTo(`/login`);
  };

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
        className="flex flex-col items-center justify-center h-full space-y-6 max-w-sm mx-auto px-8 md:px-0"
      >
        <div className="relative w-full h-30 rounded-lg overflow-hidden">
          <Image
            src={Logo}
            alt="Hero"
            className="object-cover w-[90%] mx-auto h-full"
            layout="intrinsic"
          />
        </div>

        <p className="text-gray-900 pb-10 text-lg text-center">
          Choose to sign in as a User or Admin to proceed.
        </p>

        <div className="flex flex-col space-y-6 w-full relative z-10">
          <Button
            variant="default"
            className="w-full font-semibold text-lg py-5"
            onClick={() => signUpHandler(1)}
          >
            Sign In as User
          </Button>

          <Button
            variant="outline"
            className="w-full font-semibold text-lg py-5"
            onClick={() => signUpHandler(0)}
          >
            Sign In as Admin
          </Button>

          <div className="flex items-center space-x-2 my-6">
            <div className="h-px w-full bg-gray-300" />
            <span className="text-gray-500">OR</span>
            <div className="h-px w-full bg-gray-300" />
          </div>

          <p className="text-sm text-center text-gray-700 mb-4">
            Already have an account?
          </p>

          <Button
            variant="default"
            className="w-full font-semibold text-lg py-5"
            onClick={loginRedirectHandler}
          >
            Login
          </Button>
        </div>
      </motion.div>
    </AuroraBackground>
  );
};

export default HomePage;
