
import { Navigation } from "@/components/Navigation"
import { GlassCard } from "@/components/ui/glass-card"

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <GlassCard className="p-8">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-4">
                Terms and Conditions
              </h1>
              <p className="text-muted-foreground">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>

            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-3">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using this music sharing platform, you accept and agree to be bound by the terms and provision of this agreement.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-3">2. User Accounts</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for maintaining the security of your account.
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>You must be at least 13 years old to use this service</li>
                  <li>One person or legal entity may maintain no more than one account</li>
                  <li>You are responsible for all activity that occurs under your account</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-3">3. Music Sharing Guidelines</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Our platform enables users to share music recommendations and connect with others worldwide. By using our service, you agree to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Share only legal music content and recommendations</li>
                  <li>Respect copyright and intellectual property rights</li>
                  <li>Not share inappropriate or offensive content</li>
                  <li>Maintain respectful interactions with other users</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-3">4. Privacy and Data</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, to understand our practices regarding your personal data.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-3">5. Prohibited Uses</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  You may not use our service:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                  <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                  <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                  <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-3">6. Termination</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-3">7. Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about these Terms and Conditions, please contact us through our support channels.
                </p>
              </section>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

export default TermsPage
