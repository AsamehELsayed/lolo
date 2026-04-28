import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

interface MobileVideoSectionProps {
    content: Record<string, string>;
}

export default function MobileVideoSection({ content }: MobileVideoSectionProps) {
    const videoPath = content.mobile_video_path;
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: false, amount: 0.3 });
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            if (isInView) {
                videoRef.current.play().catch(e => console.log("Auto-play prevented", e));
            } else {
                videoRef.current.pause();
            }
        }
    }, [isInView]);

    if (!videoPath) return null;

    return (
        <section className="py-20 bg-background overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col items-center mb-12 text-center">
                        <motion.span 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-xs uppercase tracking-[0.3em] text-primary font-bold mb-3"
                        >
                            The Experience
                        </motion.span>
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-3xl md:text-5xl font-serif mb-6"
                        >
                            Elegance in Motion
                        </motion.h2>
                        <motion.div 
                            initial={{ opacity: 0, scaleX: 0 }}
                            whileInView={{ opacity: 1, scaleX: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="h-px w-24 bg-primary/30"
                        />
                    </div>

                    <div ref={containerRef} className="relative flex justify-center">
                        <motion.div 
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="relative w-full max-w-[400px] aspect-[9/16] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)] border-[8px] border-[#1C1C1A] dark:border-[#2a2a28]"
                        >
                            <video
                                ref={videoRef}
                                src={videoPath}
                                className="w-full h-full object-cover"
                                muted
                                loop
                                playsInline
                                poster="/images/video-placeholder.jpg" // Fallback poster
                            />
                            
                            {/* Decorative overlays */}
                            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20 pointer-events-none" />
                            
                            {/* Mobile frame UI elements */}
                            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-[#1C1C1A] dark:bg-[#2a2a28] rounded-full flex items-center justify-center">
                                <div className="w-8 h-1 bg-[#2a2a28] dark:bg-[#1C1C1A] rounded-full" />
                            </div>
                        </motion.div>

                        {/* Background decorative elements */}
                        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
                    </div>
                </div>
            </div>
        </section>
    );
}
