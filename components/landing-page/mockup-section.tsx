'use client';

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MockupSection() {
  return (
    <div className="relative w-full overflow-hidden px-4 py-24 sm:px-8">
      {/* Background gradients */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="bg-primary/10 absolute -top-[20%] right-[30%] h-[50%] w-[50%] rounded-full blur-3xl" />
        <div className="bg-primary/5 absolute -bottom-[20%] left-[20%] h-[60%] w-[60%] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-center space-y-4 mb-16"
          >
            <Badge
              variant="outline"
              className="border-primary/20 bg-primary/5 rounded-full px-4 py-2 text-sm font-medium"
            >
              <Sparkles className="text-primary mr-2 h-4 w-4 animate-pulse" />
              Mobile Experience
            </Badge>
            
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="from-foreground to-foreground/70 bg-gradient-to-b bg-clip-text text-4xl font-bold text-transparent sm:text-5xl"
            >
              Beautiful on Every Device
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-muted-foreground max-w-2xl text-lg leading-relaxed"
            >
              Your developer profile looks stunning on mobile devices. 
              Share your professional identity anywhere, anytime with a seamless mobile experience.
            </motion.p>
          </motion.div>

          {/* iPhone Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.3,
              type: "spring",
              stiffness: 100,
              damping: 10
            }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative mx-auto max-w-xs ml-8">
              {/* Glow effect */}
              <div className="absolute inset-0 -m-2 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 blur-lg" />
              
              {/* iPhone mockup */}
              <div className="relative">
                <Image
                  src="/iPhone.png"
                  alt="LinkFaster mobile mockup on iPhone"
                  width={240}
                  height={480}
                  className="relative z-10 drop-shadow-lg"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* Features highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3 max-w-3xl"
          >
            <div className="text-center">
              <div className="bg-primary/10 text-primary mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                📱
              </div>
              <h3 className="text-foreground mb-2 font-semibold">Responsive Design</h3>
              <p className="text-muted-foreground text-sm">
                Perfect layout adaptation for all screen sizes and devices
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 text-primary mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                ⚡
              </div>
              <h3 className="text-foreground mb-2 font-semibold">Lightning Fast</h3>
              <p className="text-muted-foreground text-sm">
                Optimized for speed and performance on mobile networks
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 text-primary mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                🎨
              </div>
              <h3 className="text-foreground mb-2 font-semibold">Touch Optimized</h3>
              <p className="text-muted-foreground text-sm">
                Intuitive touch interactions and gesture support
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}