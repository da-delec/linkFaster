import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Github, Code2, ExternalLink, Users } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="w-full px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Code2 className="w-8 h-8 text-foreground" />
          <span className="text-2xl font-semibold text-foreground">devLink</span>
        </div>
        <ModeToggle />
        <Link href="/login">
        <Button variant="outline" className="rounded-full px-6">
          Login
        </Button>
        </Link>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-thin text-foreground mb-6 leading-tight">
            One link for your
            <br />
            <span className="font-medium">developer identity</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Centralize your developer profile, showcase your projects, and connect with opportunities. 
            The ultimate link-in-bio platform designed for developers and digital creators.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-lg font-medium"
          >
            Get Started Free
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="rounded-full px-8 py-6 text-lg font-medium hover:bg-accent"
          >
            View Example
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 w-full max-w-5xl">
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Github className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">GitHub Integration</h3>
            <p className="text-muted-foreground">
              Showcase your repositories, contribution graph, and coding activity automatically.
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <ExternalLink className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Portfolio Links</h3>
            <p className="text-muted-foreground">
              Connect all your work - from live projects to design portfolios and freelance profiles.
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Professional Network</h3>
            <p className="text-muted-foreground">
              Share your skills, experience, and availability with potential clients and collaborators.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full px-6 py-8 text-center text-muted-foreground text-sm">
        <p>© 2024 devLink. Made for developers, by developers.</p>
      </footer>
    </div>
  );
}