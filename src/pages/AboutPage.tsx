
import { Navigation } from "@/components/Navigation"
import { GlassCard } from "@/components/ui/glass-card"
import { Music, Users, Globe, Heart, Headphones, Share2 } from "lucide-react"

const AboutPage = () => {
  const features = [
    {
      icon: Music,
      title: "Discover Music",
      description: "Explore new songs and artists from around the world through personalized recommendations."
    },
    {
      icon: Users,
      title: "Connect Globally",
      description: "Meet music lovers from different countries and cultures, expanding your musical horizons."
    },
    {
      icon: Share2,
      title: "Share Your Favorites",
      description: "Share your favorite tracks with others and discover what moves people across the globe."
    },
    {
      icon: Globe,
      title: "Global Community",
      description: "Join a worldwide community of music enthusiasts and cultural exchange."
    },
    {
      icon: Headphones,
      title: "Curated Experience",
      description: "Enjoy a carefully curated music sharing experience designed for discovery."
    },
    {
      icon: Heart,
      title: "Made with Love",
      description: "Built by music lovers, for music lovers, with passion for connecting people through music."
    }
  ]

  return (
    <div className="min-h-screen bg-background p-4 pb-24 pt-24">
      <Navigation
        activeTab="profile"
        onTabChange={(tab) => { }}
      />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-12">
          {/* Hero Section */}
          <GlassCard className="p-8 text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-6">
                About Our Platform
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                We're passionate about connecting music lovers across the globe, creating a platform where cultural exchange happens through the universal language of music.
              </p>
              <div className="flex items-center justify-center space-x-8 pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">10K+</div>
                  <div className="text-sm text-muted-foreground">Songs Shared</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">50+</div>
                  <div className="text-sm text-muted-foreground">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">1K+</div>
                  <div className="text-sm text-muted-foreground">Music Lovers</div>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Mission Section */}
          <GlassCard className="p-8">
            <div className="max-w-4xl mx-auto space-y-6">
              <h2 className="text-3xl font-bold text-center text-foreground mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed text-center">
                Music transcends borders, languages, and cultures. Our mission is to create a global community where people can discover new music, share their favorites, and connect with others who share their passion for musical discovery.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed text-center">
                We believe that every song tells a story, and every recommendation is an opportunity to bridge cultural gaps and create meaningful connections between people from different corners of the world.
              </p>
            </div>
          </GlassCard>

          {/* Features Grid */}
          <div>
            <h2 className="text-3xl font-bold text-center text-foreground mb-8">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <GlassCard key={index} className="p-6 text-center hover:scale-105 transition-transform duration-300">
                  <div className="w-12 h-12 mx-auto mb-4 text-primary">
                    <feature.icon size={48} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Story Section */}
          <GlassCard className="p-8">
            <div className="max-w-4xl mx-auto space-y-6">
              <h2 className="text-3xl font-bold text-center text-foreground mb-6">Our Story</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="leading-relaxed">
                  Our platform was born from a simple idea: what if we could break down cultural barriers through music? In a world that's increasingly connected yet sometimes divided, we saw an opportunity to create meaningful connections through shared musical experiences.
                </p>
                <p className="leading-relaxed">
                  We started as a small team of music enthusiasts who believed in the power of discovery. We've grown into a global community, but our core values remain the same: authenticity, discovery, and connection.
                </p>
                <p className="leading-relaxed">
                  Today, our platform serves music lovers from over 50 countries, facilitating thousands of musical exchanges and creating friendships that span continents. Every shared song is a small act of cultural diplomacy, and every new connection proves that music truly is the universal language.
                </p>
              </div>
            </div>
          </GlassCard>

          {/* Contact Section */}
          <GlassCard className="p-8">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h2 className="text-3xl font-bold text-foreground mb-6">Get in Touch</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Have questions, suggestions, or just want to share your story? We'd love to hear from you. Our community is what makes this platform special, and your voice matters.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="text-sm text-muted-foreground">
                  Reach out to us through our support channels
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
