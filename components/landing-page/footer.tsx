'use client';

import Image from "next/image";
import srcLogo from "@/public/minimalistLogo.png";

export default function FooterGlow() {
  return (
    <footer className="relative z-10 mt-8 w-full overflow-hidden pt-16 pb-8">
      <style jsx global>{`
        .glass {
          backdrop-filter: blur(20px) saturate(400%);
          background: radial-gradient(circle, #fff9 0%, #ffffff1a 60%, #f8fafc 100%);
          border: 1px solid #ffffff1a;
          justify-content: center;
          align-items: center;
          transition: all .3s;
          display: flex;
        }
        .glass:where(.dark, .dark *) {
          display: flex
          backdrop-filter: blur(2px) !important;
          background: radial-gradient(circle, #ffffff1a 0%, #1e00001a 60%, #2a0e0e 100%) !important;
          border: 1px solid #ffffff0d !important;
          border-radius: 16px !important;
          justify-content: center !important;
          align-items: center !important;
        }
      `}</style>
      <div className="pointer-events-none absolute top-0 left-1/2 z-0 h-full w-full -translate-x-1/2 select-none">
        <div className="absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl"></div>
        <div className="absolute right-1/4 -bottom-24 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl"></div>
      </div>
      <div className=" relative mx-auto flex max-w-6xl flex-col items-center gap-8 rounded-2xl px-6 py-10 md:flex-row md:items-start md:justify-between md:gap-12">
        <div className="flex flex-col items-center md:items-start">
          <a href="#" className="mb-4 flex items-center gap-2">
            <Image src={srcLogo} alt="LinkFaster logo" width={40} height={50} />
            <span className="bg-gradient-to-br from-gray-200 to-gray-500 bg-clip-text text-xl font-semibold tracking-tight text-transparent">
              LinkFaster
            </span>
          </a>
          <p className="text-foreground mb-6 max-w-xs text-center text-sm md:text-left">
            Create your professional developer profile and showcase your work to the world.
          </p>
          <div className="mt-2 flex gap-3  text-primary">
            <a
              href="#"
              aria-label="GitHub"
              className="hover:text-foreground transition"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .29a12 12 0 00-3.797 23.401c.6.11.82-.26.82-.577v-2.17c-3.338.726-4.042-1.415-4.042-1.415-.546-1.387-1.332-1.756-1.332-1.756-1.09-.744.084-.729.084-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.809 1.306 3.495.999.106-.775.418-1.307.76-1.608-2.665-.301-5.466-1.332-5.466-5.933 0-1.31.469-2.381 1.236-3.222-.123-.303-.535-1.523.117-3.176 0 0 1.007-.322 3.301 1.23a11.502 11.502 0 016.002 0c2.292-1.552 3.297-1.23 3.297-1.23.654 1.653.242 2.873.119 3.176.77.841 1.235 1.912 1.235 3.222 0 4.61-2.805 5.629-5.476 5.925.429.369.813 1.096.813 2.211v3.285c0 .32.217.694.825.576A12 12 0 0012 .29"></path>
              </svg>
            </a>
          </div>
        </div>
        <nav className="flex w-full flex-col gap-9 text-center md:w-auto md:flex-row md:justify-end md:text-left">
          <div>
            <div className="mb-3 text-xs font-semibold tracking-widest text-blue-400 uppercase">
              Product
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-foreground/70 hover:text-foreground transition">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-foreground/70 hover:text-foreground transition">
                  Pricing
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="mb-3 text-xs font-semibold tracking-widest text-rose-400 uppercase">
              Legal
            </div>
            <ul className="space-y-2">
              <li>
                <a href="/terms" className="text-foreground/70 hover:text-foreground transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-foreground/70 hover:text-foreground transition">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="text-foreground relative z-10 mt-10 text-center text-xs">
        <span>&copy; 2025 LinkFaster. Built with ❤️ by an indie developer.</span>
      </div>
    </footer>
  );
}
