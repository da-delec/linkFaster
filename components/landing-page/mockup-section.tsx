'use client';

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Smartphone, Zap, Palette } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MockupSection() {
  return (
    <section className="relative w-full overflow-hidden py-24">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />

      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-center space-y-6 mb-16"
          >
            <Badge
              variant="secondary"
              className="mb-4 rounded-full px-4 py-2 text-sm font-medium"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Mobile Experience
            </Badge>
            
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            >
              Beautiful on
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"> Every Device</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="mx-auto max-w-3xl text-lg leading-8 text-muted-foreground"
            >
              Your developer profile adapts perfectly to any screen size. 
              Share your professional identity with a flawless mobile experience that impresses everywhere.
            </motion.p>
          </motion.div>

          {/* iPhone Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.6, 
              delay: 0.3,
              ease: "easeOut"
            }}
            viewport={{ once: true }}
            className="relative mx-auto max-w-xs"
          >
            <Image
              src="/iPhone.png"
              alt="LinkFaster mobile mockup on iPhone"
              width={200}
              height={400}
              className="mx-auto ml-12 drop-shadow-lg"
              priority
            />
          </motion.div>

          {/* Features highlights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3 max-w-4xl"
          >
            {[
              {
                icon: Smartphone,
                title: "Responsive Design",
                description: "Perfect layout adaptation for all screen sizes and devices with fluid responsive behavior"
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Optimized for speed and performance on mobile networks with instant loading times"
              },
              {
                icon: Palette,
                title: "Touch Optimized",
                description: "Intuitive touch interactions and gesture support for seamless mobile navigation"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                viewport={{ once: true }}
                className="group relative text-center"
              >
                <div className="relative mb-6">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 transition-all duration-300 group-hover:scale-110 group-hover:from-primary/30 group-hover:to-primary/10">
                    <feature.icon className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <div className="absolute -inset-2 rounded-2xl bg-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
                <h3 className="mb-3 text-xl font-semibold transition-colors duration-300 group-hover:text-primary">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed transition-colors duration-300 group-hover:text-foreground/80">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}