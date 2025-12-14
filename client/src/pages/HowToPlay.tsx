import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { APP_LOGO, APP_TITLE } from "@/const";
import { Link } from "wouter";

export default function HowToPlay() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="bg-primary text-white">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <img src={APP_LOGO} alt={APP_TITLE} className="h-12 w-auto" />
              <div className="text-xl font-bold hidden sm:block">
                <span className="text-white">SDSURABHI</span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="hover:text-secondary transition-colors font-medium">
                Home
              </Link>
              <Link href="/contests" className="hover:text-secondary transition-colors font-medium">
                Contests
              </Link>
              <Link href="/how-to-play" className="hover:text-secondary transition-colors font-medium text-secondary">
                How to Play
              </Link>
              <Link href="/leaderboard" className="hover:text-secondary transition-colors font-medium">
                Leaderboard
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
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
        <div className="container text-center">
          <h1 className="text-5xl font-bold mb-4">How to Play Cricket Fantasy</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Learn how to create your dream team, join contests, and compete with fellow cricket enthusiasts!
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-16">
        <div className="container max-w-5xl">
          {/* Step by Step Guide */}
          <div className="space-y-12 mb-16">
            {/* Step 1 */}
            <Card className="shadow-lg border-l-4 border-l-primary">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold">1</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-primary mb-3">Create Your Account</h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Sign up for free by providing your username, email, and selecting your state. Make sure you're 18+ and not from restricted states (Andhra Pradesh, Assam, Nagaland, Odisha, Sikkim, Telangana).
                    </p>
                    <Link href="/signup">
                      <Button className="bg-primary text-white hover:bg-primary/90">
                        Sign Up Now →
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="shadow-lg border-l-4 border-l-secondary">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-secondary text-black rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold">2</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-primary mb-3">Choose a Contest</h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Browse through upcoming cricket matches and select a contest to join. Each contest is based on a real cricket match (T20, ODI, or Test). All contests are completely free to join!
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                      <li>View match details (teams, venue, timing)</li>
                      <li>Check how many participants have joined</li>
                      <li>See the contest deadline (usually match start time)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="shadow-lg border-l-4 border-l-primary">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold">3</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-primary mb-3">Create Your Dream Team</h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Build your team of 11 players from both competing teams. Use your cricket knowledge and strategy to select the best combination!
                    </p>
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <h4 className="font-semibold text-primary mb-2">Team Composition Rules:</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li><strong>Wicket-keepers:</strong> 1-4 players</li>
                        <li><strong>Batsmen:</strong> 3-6 players</li>
                        <li><strong>All-rounders:</strong> 1-4 players</li>
                        <li><strong>Bowlers:</strong> 3-6 players</li>
                        <li><strong>Total:</strong> Exactly 11 players</li>
                        <li><strong>From each team:</strong> Minimum 3, Maximum 7 players</li>
                      </ul>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Choose Captain & Vice-Captain:</strong> Your captain earns 2x points and vice-captain earns 1.5x points!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 4 */}
            <Card className="shadow-lg border-l-4 border-l-secondary">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-secondary text-black rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold">4</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-primary mb-3">Watch & Track Performance</h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Once the match starts, watch your team's performance in real-time! Points are awarded based on actual player performance in the match.
                    </p>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-primary mb-2">How Points are Scored:</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                        <div>
                          <p className="font-semibold mb-1">Batting:</p>
                          <ul className="space-y-1">
                            <li>• Run: +1 point</li>
                            <li>• Boundary (4): +1 point</li>
                            <li>• Six: +2 points</li>
                            <li>• Half-century: +8 points</li>
                            <li>• Century: +16 points</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold mb-1">Bowling:</p>
                          <ul className="space-y-1">
                            <li>• Wicket: +25 points</li>
                            <li>• Maiden over: +12 points</li>
                            <li>• 3 wickets: +4 bonus</li>
                            <li>• 4 wickets: +8 bonus</li>
                            <li>• 5 wickets: +16 bonus</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold mb-1">Fielding:</p>
                          <ul className="space-y-1">
                            <li>• Catch: +8 points</li>
                            <li>• Stumping: +12 points</li>
                            <li>• Run out: +6 points</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold mb-1">Other:</p>
                          <ul className="space-y-1">
                            <li>• Playing XI: +4 points</li>
                            <li>• Captain: 2x points</li>
                            <li>• Vice-Captain: 1.5x points</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 5 */}
            <Card className="shadow-lg border-l-4 border-l-primary">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold">5</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-primary mb-3">Check Leaderboard & Rankings</h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      After the match ends, check your rank on the leaderboard! See how your team performed compared to other players. Remember, this is purely for fun and bragging rights - there are no monetary prizes!
                    </p>
                    <Link href="/leaderboard">
                      <Button className="bg-primary text-white hover:bg-primary/90">
                        View Leaderboard →
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Important Points */}
          <Card className="bg-yellow-50 border-2 border-yellow-300 shadow-lg mb-12">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                <span>⚠️</span> Important Points to Remember
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>100% Free:</strong> All contests are completely free to join. No entry fees, no hidden charges.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>No Prizes:</strong> This is a pure entertainment platform. There are no monetary prizes or rewards.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Skill-Based:</strong> Your cricket knowledge and strategy determine your success, not luck.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Age Restriction:</strong> Only users 18 years and older can participate.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Geo-Restrictions:</strong> Not available in Andhra Pradesh, Assam, Nagaland, Odisha, Sikkim, and Telangana.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Multiple Teams:</strong> You can create multiple teams for the same contest to try different strategies!</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl p-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Playing?</h2>
            <p className="text-xl mb-6 text-white/90">
              Create your account now and join thousands of cricket fans!
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
      <footer className="bg-primary text-white py-12">
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
                <img src="/logo.png" alt="SDSURABHI" className="h-16 w-auto mb-3" />
                <p className="font-semibold text-white">SDSURABHI INFRA PRIVATE LIMITED</p>
                <p className="text-white/60 text-xs">Brand Name: SDSURABHI</p>
                <p className="text-white/60 text-xs">Brand Name: SDSURABHI</p>
                <p className="text-secondary">Test Your Cricket IQ</p>
                <p className="mt-3">Ram Acchayvar 48/2, Ayodhya Puri 2 Bijnour, Sarojini Nagar, Lucknow, Uttar Pradesh 226008, India</p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-6 pb-4">
            <p className="text-sm text-white/70 leading-relaxed">
          {/* Authorized Advertising Partner */}
          <div className="border-t border-white/20 pt-6 pb-4">
            <p className="text-sm text-white/70">
              <span className="font-semibold text-white">Operated by:</span> SDSURABHI INFRA PRIVATE LIMITED
            </p>
            <p className="text-xs text-white/60 mt-1">
              CIN: U41002UP2023PTC194590 | GST: 09ABMCS3759A1Z4
            </p>
          </div>


              <span className="font-semibold text-white">Legal Disclaimer:</span> This platform is NOT available in Andhra Pradesh, Assam, Odisha, Telangana, Nagaland, and Sikkim. Only users 18 years and older are permitted. This is a skill-based, free-to-play platform with no real money involved.
            </p>
          </div>

          <div className="border-t border-white/20 pt-4">
            <p className="text-sm text-white/70 text-center">
              © 2025 SDSURABHI INFRA PRIVATE LIMITED. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
