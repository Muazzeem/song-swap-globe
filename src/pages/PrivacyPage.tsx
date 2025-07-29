
import { Navigation } from "@/components/Navigation"
import { GlassCard } from "@/components/ui/glass-card"

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <GlassCard className="p-8">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-4">
                Privacy Policy
              </h1>
              <p className="text-muted-foreground">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>

            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-3">1. Information We Collect</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  We collect information you provide directly to us, such as when you create an account, share music, or contact us.
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">Personal Information</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                      <li>Name and email address</li>
                      <li>Country and city information</li>
                      <li>Profile information you choose to provide</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">Usage Information</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                      <li>Music sharing activity and preferences</li>
                      <li>Interaction with other users</li>
                      <li>Device and browser information</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-3">2. How We Use Your Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send technical notices, updates, and support messages</li>
                  <li>Respond to your comments, questions, and customer service requests</li>
                  <li>Communicate with you about products, services, and events</li>
                  <li>Monitor and analyze trends, usage, and activities</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-3">3. Information Sharing</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>With your consent or at your direction</li>
                  <li>For legal reasons or to protect rights and safety</li>
                  <li>With service providers who assist us in operating our platform</li>
                  <li>In connection with a merger, acquisition, or sale of assets</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-3">4. Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-3">5. Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Access and update your personal information</li>
                  <li>Delete your account and associated data</li>
                  <li>Opt-out of certain communications</li>
                  <li>Request a copy of your data</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-3">6. Cookies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use cookies and similar tracking technologies to track activity on our service and store certain information to improve your experience and analyze usage patterns.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-3">7. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us through our support channels or email us directly.
                </p>
              </section>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

export default PrivacyPage
