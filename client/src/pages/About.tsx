import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { APP_LOGO, APP_TITLE } from "@/const";
import { Link } from "wouter";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="bg-primary text-white">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <img src={APP_LOGO} alt={APP_TITLE} className="h-12 w-auto" />
              <div className="text-xl font-bold hidden sm:block">
                <span className="text-white">Sports IQ </span>
                <span className="text-secondary">Play</span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="hover:text-secondary transition-colors font-medium">
                Home
              </Link>
              <Link href="/contests" className="hover:text-secondary transition-colors font-medium">
                Contests
              </Link>
              <Link href="/about" className="hover:text-secondary transition-colors font-medium text-secondary">
                About
              </Link>
              <Link href="/contact" className="hover:text-secondary transition-colors font-medium">
                Contact
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary bg-transparent">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-secondary text-black hover:bg-secondary/90 font-semibold">
                  Signup
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-20">
        <div className="container text-center">
          <h1 className="text-5xl font-bold mb-4">About Sports IQ Play</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Where Cricket Knowledge Meets Pure Entertainment
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-16">
        <div className="container max-w-5xl">
          {/* Our Story */}
          <section className="mb-16">
            <h2 className="text-4xl font-bold text-primary mb-6">Our Story</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Sports IQ Play was born from a simple idea: cricket fantasy should be about passion, knowledge, and fun—not money. We're a team of cricket enthusiasts who believe that the thrill of building your dream team and competing with fellow fans shouldn't require opening your wallet.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Founded in January 2025, we set out to create India's first completely free cricket fantasy platform. No entry fees, no prizes, no pressure—just pure, skill-based cricket entertainment. We wanted to build a space where cricket fans could test their knowledge, engage with the sport they love, and compete for bragging rights alone.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Today, thousands of cricket fans across India use Sports IQ Play to enhance their cricket-watching experience. Whether it's a thrilling T20I, a strategic ODI, or a gripping Test match, our platform brings fans closer to the game they love.
              </p>
            </div>
          </section>

          {/* Mission & Vision */}
          <section className="mb-16">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-gradient-to-br from-primary to-primary/80 text-white shadow-xl">
                <CardContent className="p-8">
                  <div className="text-5xl mb-4">🎯</div>
                  <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                  <p className="text-white/90 leading-relaxed">
                    To provide cricket fans with a completely free, skill-based fantasy platform that enhances their cricket-watching experience without any financial risk or pressure. We aim to make cricket fantasy accessible to everyone who loves the sport.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-secondary to-secondary/80 text-black shadow-xl">
                <CardContent className="p-8">
                  <div className="text-5xl mb-4">👁️</div>
                  <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                  <p className="leading-relaxed">
                    To become India's most trusted and loved free cricket fantasy platform, where millions of fans connect, compete, and celebrate their cricket knowledge together. We envision a community built on passion, not profit.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Core Values */}
          <section className="mb-16">
            <h2 className="text-4xl font-bold text-primary mb-8 text-center">Our Core Values</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-white shadow-md border-t-4 border-t-primary">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">🆓</div>
                  <h3 className="text-xl font-bold text-primary mb-3">Always Free</h3>
                  <p className="text-gray-700">
                    We're committed to keeping Sports IQ Play 100% free forever. No hidden fees, no premium features, no paywalls.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md border-t-4 border-t-secondary">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">🧠</div>
                  <h3 className="text-xl font-bold text-primary mb-3">Skill Over Luck</h3>
                  <p className="text-gray-700">
                    Your cricket knowledge and strategy determine success. We celebrate smart decisions and cricket expertise.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md border-t-4 border-t-primary">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">🤝</div>
                  <h3 className="text-xl font-bold text-primary mb-3">Fair Play</h3>
                  <p className="text-gray-700">
                    Transparency, integrity, and equal opportunities for all players. Everyone plays by the same rules.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md border-t-4 border-t-secondary">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">🎉</div>
                  <h3 className="text-xl font-bold text-primary mb-3">Pure Entertainment</h3>
                  <p className="text-gray-700">
                    No financial stress, no gambling concerns. Just pure cricket fun and friendly competition.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md border-t-4 border-t-primary">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">🔒</div>
                  <h3 className="text-xl font-bold text-primary mb-3">Privacy First</h3>
                  <p className="text-gray-700">
                    We collect minimal data and never share it. Your privacy and security are our top priorities.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md border-t-4 border-t-secondary">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">👥</div>
                  <h3 className="text-xl font-bold text-primary mb-3">Community Driven</h3>
                  <p className="text-gray-700">
                    We listen to our users and continuously improve based on community feedback and suggestions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Why We're Different */}
          <section className="mb-16">
            <h2 className="text-4xl font-bold text-primary mb-8">Why We're Different</h2>
            <div className="space-y-6">
              <Card className="bg-gray-50 shadow-md">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 text-xl font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2">Zero Financial Risk</h3>
                    <p className="text-gray-700">
                      Unlike other fantasy platforms, we don't involve money at all. No deposits, no withdrawals, no payment gateways. This means zero financial risk and zero stress.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-50 shadow-md">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary text-black rounded-full flex items-center justify-center flex-shrink-0 text-xl font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2">Focus on Fun, Not Profit</h3>
                    <p className="text-gray-700">
                      We're not here to make money from our users. Our goal is to create a vibrant community of cricket lovers who enjoy the game together.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-50 shadow-md">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 text-xl font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2">No Gambling, Just Gaming</h3>
                    <p className="text-gray-700">
                      Since there's no money involved, there's no gambling. It's pure skill-based gaming that's legal, ethical, and stress-free.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-50 shadow-md">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary text-black rounded-full flex items-center justify-center flex-shrink-0 text-xl font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2">Simple & Accessible</h3>
                    <p className="text-gray-700">
                      No complex rules, no confusing interfaces. We've built Sports IQ Play to be simple, intuitive, and accessible to cricket fans of all ages (18+).
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Company Information */}
          <section className="mb-16">
            <h2 className="text-4xl font-bold text-primary mb-8">Company Information</h2>
            <Card className="bg-white shadow-lg border-l-4 border-l-primary">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-bold text-xl text-primary mb-4">Legal Details</h3>
                    <div className="space-y-3 text-gray-700">
                      <p><strong>Company Name:</strong> Sports IQ Play Private Limited</p>
                      <p><strong>Type:</strong> Private Limited Company</p>
                      <p><strong>Tagline:</strong> Test Your Cricket IQ</p>
                      <p><strong>Address:</strong> E-38/39, Rajiv Chowk, Inner Circle, Block E, Connaught Place, New Delhi, Delhi 110001, India</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-primary mb-4">Registered Office</h3>
                    <div className="space-y-3 text-gray-700">
                      <p>E-38/39, Rajiv Chowk</p>
                      <p>Inner Circle, Block E</p>
                      <p>Connaught Place</p>
                      <p>New Delhi, Delhi 110001</p>
                      <p>India</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="font-bold text-xl text-primary mb-4">Authorized Advertising Partner</h3>
                  <div className="space-y-3 text-gray-700">
                    <p><strong>Company Name:</strong> SDSURABHI INFRA PRIVATE LIMITED</p>
                    <p><strong>CIN:</strong> U41002UP2023PTC194590</p>
                    <p><strong>GST:</strong> 09ABMCS3759A1Z4</p>
                    <p><strong>Address:</strong> 48/2, Bijnour, Ayodhya Puri 2, Lucknow, Uttar Pradesh 226008, India</p>
                    <p className="text-sm text-gray-600 mt-4 italic">
                      SDSURABHI INFRA PRIVATE LIMITED is our authorized advertising and digital marketing partner, managing all promotional activities and online advertising campaigns on behalf of Sports IQ Play Private Limited.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl p-12">
            <h2 className="text-3xl font-bold mb-4">Join Our Community Today!</h2>
            <p className="text-xl mb-6 text-white/90">
              Be part of India's fastest-growing free cricket fantasy community
            </p>
            <Link href="/signup">
              <Button size="lg" className="bg-secondary text-black hover:bg-secondary/90 text-lg px-10 py-6 h-auto font-bold">
                Sign Up for Free →
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white py-12 mt-16">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-lg mb-4">About</h4>
              <ul className="space-y-3 text-sm text-white/80">
                <li><Link href="/about" className="hover:text-secondary transition-colors">About Us</Link></li>
                <li><Link href="/how-to-play" className="hover:text-secondary transition-colors">How It Works</Link></li>
                <li><Link href="/contact" className="hover:text-secondary transition-colors">Contact Us</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Legal</h4>
              <ul className="space-y-3 text-sm text-white/80">
                <li><Link href="/terms" className="hover:text-secondary transition-colors">Terms & Conditions</Link></li>
                <li><Link href="/privacy" className="hover:text-secondary transition-colors">Privacy Policy</Link></li>
                <li><Link href="/responsible-gaming" className="hover:text-secondary transition-colors">Responsible Gaming</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Support</h4>
              <ul className="space-y-3 text-sm text-white/80">
                <li><Link href="/faq" className="hover:text-secondary transition-colors">FAQ</Link></li>
                <li><Link href="/contact" className="hover:text-secondary transition-colors">Contact Support</Link></li>
                <li><Link href="/signup" className="hover:text-secondary transition-colors">Sign Up</Link></li>
                <li><Link href="/login" className="hover:text-secondary transition-colors">Login</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Company</h4>
              <div className="text-sm text-white/80 space-y-2">
                <img src="/logo.png" alt="Sports IQ Play" className="h-16 w-auto mb-3" />
                <p className="font-semibold text-white">Sports IQ Play Private Limited</p>
                <p className="text-secondary">Test Your Cricket IQ</p>
                <p className="mt-3">E-38/39, Rajiv Chowk, Inner Circle, Block E, Connaught Place, New Delhi, Delhi 110001, India</p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-6 pb-4">
            <p className="text-sm text-white/70 leading-relaxed">
          {/* Authorized Advertising Partner */}
          <div className="border-t border-white/20 pt-6 pb-4">
            <p className="text-sm text-white/70">
              <span className="font-semibold text-white">Authorized Advertising Partner:</span> SDSURABHI INFRA PRIVATE LIMITED
            </p>
            <p className="text-xs text-white/60 mt-1">
              CIN: U41002UP2023PTC194590
            </p>
          </div>


              <span className="font-semibold text-white">Legal Disclaimer:</span> This platform is NOT available in Andhra Pradesh, Assam, Odisha, Telangana, Nagaland, and Sikkim. Only users 18 years and older are permitted. This is a skill-based, free-to-play platform with no real money involved.
            </p>
          </div>

          <div className="border-t border-white/20 pt-4">
            <p className="text-sm text-white/70 text-center">
              © 2025 Sports IQ Play Private Limited. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
