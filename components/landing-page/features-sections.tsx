import { AnimatedBeamMultipleOutputDemo } from "./animated-beam"
import CardFlip from "../dashboard/cardFlips"
import { Code, Users, Zap, Globe, Star, Calendar } from "lucide-react"

const Features = () => {
  const features = [
    {
      title: "Complete Developer Profile",
      subtitle: "Create your developer identity",
      description: "Create a detailed profile with your skills, GitHub projects and portfolio to stand out",
      features: [
        "Technical skills",
        "Integrated GitHub projects", 
        "Personalized portfolio",
        "Professional presentation"
      ]
    },
    {
      title: "Personalized LinkDev Page",
      subtitle: "Share your profile easily",
      description: "Automatically generate a presentation page with QR code to easily share your profile",
      features: [
        "Custom URL",
        "Automatic QR code",
        "Simplified sharing",
        "Responsive design"
      ]
    },
    {
      title: "Integrated GitHub Calendar",
      subtitle: "Show your development activity",
      description: "Highlight your development consistency with the display of your GitHub activity",
      features: [
        "Real-time activity",
        "Detailed statistics",
        "Visual charts",
        "Contribution tracking"
      ]
    },
    {
      title: "Freelance Platform Connection",
      subtitle: "Centralize your online presence",
      description: "Link your profiles on different freelance platforms to centralize your presence",
      features: [
        "Upwork, Fiverr, Malt",
        "Automatic synchronization",
        "Unified profile",
        "Centralized management"
      ]
    },
    {
      title: "Project Showcase",
      subtitle: "Present your best work",
      description: "Present your best work: websites, Figma designs, applications and creative projects",
      features: [
        "Websites & apps",
        "Figma designs",
        "Creative projects",
        "Visual demonstrations"
      ]
    },
    {
      title: "Advanced Customization",
      subtitle: "Reflect your unique style",
      description: "With the premium upgrade, customize your profile design to reflect your unique style",
      features: [
        "Custom themes",
        "Colors & fonts",
        "Advanced layouts",
        "Premium animations"
      ]
    }
  ]

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to create an impressive professional presence
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {features.map((feature, index) => (
            <CardFlip
              key={index}
              title={feature.title}
              subtitle={feature.subtitle}
              description={feature.description}
              features={feature.features}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features

  



