"use client";

import { motion } from "framer-motion";
import { Airplay, Book, Globe, Headphones, Sparkles } from "lucide-react";
import React from "react";

const floatingIcons = [
    { icon: <Airplay />, style: "top-16 left-12", delay: 0, size: 48 },
    { icon: <Book />, style: "bottom-32 left-24", delay: 0.3, size: 40 },
    { icon: <Globe />, style: "top-40 left-48", delay: 0.6, size: 44 },
    { icon: <Headphones />, style: "bottom-16 left-16", delay: 0.9, size: 42 },
    { icon: <Sparkles />, style: "top-24 left-64", delay: 1.2, size: 36 },
];

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col md:flex-row relative overflow-hidden bg-gray-50">
            {/* Animated Background Particles */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 to-blue-500/30 animate-pulse" />
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white/40 rounded-full"
                        style={{
                            left: `${Math.random() * 50}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.2, 0.7, 0.2],
                            scale: [1, 1.3, 1],
                        }}
                        transition={{
                            duration: 5 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random(),
                        }}
                    />
                ))}
            </div>

            {/* Floating 3D Icons - Hidden on smaller screens */}
            {floatingIcons.map((item, index) => (
                <motion.div
                    key={index}
                    className={`absolute text-white/90 ${item.style} z-30 drop-shadow-lg hidden lg:block`}
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 15, -15, 0],
                        scale: [1, 1.15, 1],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 4,
                        delay: item.delay,
                        ease: "easeInOut",
                    }}
                    whileHover={{ scale: 1.3, rotate: 20 }}
                >
                    <div
                        className="bg-white/15 rounded-full p-3 backdrop-blur-sm"
                        style={{ width: item.size, height: item.size }}
                    >
                        {item.icon}
                    </div>
                </motion.div>
            ))}

            {/* Left Panel - Welcome Section */}
            <motion.div
                className="w-full md:w-1/2 bg-gradient-to-br from-indigo-600 to-blue-700 text-white flex flex-col justify-center items-center p-6 sm:p-8 md:p-12 relative z-20 overflow-hidden"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 sm:mb-6 tracking-tight drop-shadow-md z-30">
                    Welcome to MARI English
                </h3>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center max-w-xs sm:max-w-sm md:max-w-lg font-serif leading-tight z-30">
                    Make English Your <span className="text-yellow-300">Joyful</span> Journey
                </h1>
                <p className="hidden md:block text-base sm:text-lg md:text-xl text-center max-w-xs sm:max-w-md md:max-w-2xl mt-4 md:mt-6 leading-relaxed opacity-90 z-30">
                    Embark on a vibrant learning adventure with our cutting-edge tools and resources, tailored for beginners and advanced learners alike. Dive into interactive lessons and fun activities!
                </p>
            </motion.div>

            {/* Right Panel - Login Form */}
            <motion.div
                className="w-full md:w-1/2 bg-white flex items-center justify-center relative z-20 p-6 sm:p-8"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
                {children}
            </motion.div>
        </div>
    );
}