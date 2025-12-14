import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { APP_LOGO, APP_TITLE } from "@/const";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import LiveLeaderboard from "@/components/LiveLeaderboard";

const SAMPLE_LEADERBOARD = [
  { rank: 1, username: "CricketMaster99", points: 15420, contests: 45, badge: "🏆" },
  { rank: 2, username: "BowlingKing", points: 14890, contests: 42, badge: "🥈" },
  { rank: 3, username: "BattingLegend", points: 14320, contests: 40, badge: "🥉" },
  { rank: 4, username: "AllRounderPro", points: 13750, contests: 38, badge: "" },
  { rank: 5, username: "SpinWizard", points: 13210, contests: 36, badge: "" },
  { rank: 6, username: "FastBowlerX", points: 12890, contests: 35, badge: "" },
  { rank: 7, username: "SixHitter", points: 12450, contests: 33, badge: "" },
  { rank: 8, username: "FieldingChamp", points: 12120, contests: 32, badge: "" },
  { rank: 9, username: "CaptainCool", points: 11780, contests: 30, badge: "" },
  { rank: 10, username: "PowerPlayer", points: 11340, contests: 29, badge: "" },
];

export default function Leaderboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userSession = localStorage.getItem('userSession');
    setIsLoggedIn(!!userSession);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
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
              <Link href="/how-to-play" className="hover:text-secondary transition-colors font-medium">
                How to Play
              </Link>
              <Link href="/leaderboard" className="hover:text-secondary transition-colors font-medium text-secondary">
                Leaderboard
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              {!isLoggedIn ? (
                <>
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
                </>
              ) : (
                <>
                  <Link href="/dashboard">
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary bg-transparent">
                      Dashboard
                    </Button>
                  </Link>
                  <Button 
                    onClick={() => {
                      localStorage.removeItem('userSession');
                      setIsLoggedIn(false);
                    }}
                    className="bg-secondary text-black hover:bg-secondary/90 font-semibold"
                  >
                    Logout
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-3">Leaderboard</h1>
          <p className="text-lg text-white/90">
            See how you rank against other cricket fantasy players!
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-12">
        <div className="container max-w-4xl">
          {/* Live Contest Leaderboard */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Live Contest Rankings</h2>
            <LiveLeaderboard 
              contestId="live"
              autoRefresh={true}
              refreshInterval={30000}
              currentUsername={isLoggedIn ? JSON.parse(localStorage.getItem('userSession') || '{}').username : undefined}
            />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">All-Time Top Performers</h2>
          {/* Top 3 Podium */}
          <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-6xl mx-auto">
            {/* 2nd Place */}
            <div className="md:order-1 order-2">
              <Card className="bg-gradient-to-br from-gray-300 to-gray-400 text-white shadow-xl mt-8">
                <CardContent className="p-6 text-center">
                  <div className="text-5xl mb-2">🥈</div>
                  <h3 className="text-xl font-bold mb-1 px-2">{SAMPLE_LEADERBOARD[1].username}</h3>
                  <p className="text-3xl font-bold mb-2">{SAMPLE_LEADERBOARD[1].points.toLocaleString()}</p>
                  <p className="text-sm opacity-90">{SAMPLE_LEADERBOARD[1].contests} Contests</p>
                </CardContent>
              </Card>
            </div>

            {/* 1st Place */}
            <div className="md:order-2 order-1">
              <Card className="bg-gradient-to-br from-yellow-400 to-yellow-600 text-white shadow-2xl">
                <CardContent className="p-8 text-center">
                  <div className="text-6xl mb-3">🏆</div>
                  <h3 className="text-2xl font-bold mb-2 px-2">{SAMPLE_LEADERBOARD[0].username}</h3>
                  <p className="text-4xl font-bold mb-3">{SAMPLE_LEADERBOARD[0].points.toLocaleString()}</p>
                  <p className="text-sm opacity-90">{SAMPLE_LEADERBOARD[0].contests} Contests</p>
                  <div className="mt-4 bg-white/20 rounded-full px-4 py-1 inline-block">
                    <span className="text-xs font-semibold">🎖️ CHAMPION</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 3rd Place */}
            <div className="md:order-3 order-3">
              <Card className="bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-xl mt-8">
                <CardContent className="p-6 text-center">
                  <div className="text-5xl mb-2">🥉</div>
                  <h3 className="text-xl font-bold mb-1 px-2">{SAMPLE_LEADERBOARD[2].username}</h3>
                  <p className="text-3xl font-bold mb-2">{SAMPLE_LEADERBOARD[2].points.toLocaleString()}</p>
                  <p className="text-sm opacity-90">{SAMPLE_LEADERBOARD[2].contests} Contests</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Full Leaderboard Table */}
          <Card className="bg-white shadow-lg">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">Rank</th>
                      <th className="px-6 py-4 text-left font-semibold">Player</th>
                      <th className="px-6 py-4 text-right font-semibold">Points</th>
                      <th className="px-6 py-4 text-right font-semibold">Contests</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {SAMPLE_LEADERBOARD.map((player, index) => (
                      <tr 
                        key={player.rank} 
                        className={`hover:bg-gray-50 transition-colors ${index < 3 ? 'bg-yellow-50' : ''}`}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{player.badge}</span>
                            <span className="font-bold text-primary text-lg">#{player.rank}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-semibold text-gray-900">{player.username}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="font-bold text-primary text-lg">{player.points.toLocaleString()}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-gray-600">{player.contests}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          {!isLoggedIn && (
            <div className="mt-12 text-center bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl p-10">
              <h2 className="text-3xl font-bold mb-3">Want to See Your Name Here?</h2>
              <p className="text-lg mb-6 text-white/90">
                Join SDSURABHI and start competing for the top spot!
              </p>
              <Link href="/signup">
                <Button size="lg" className="bg-secondary text-black hover:bg-secondary/90 text-lg px-10 py-6 h-auto font-bold">
                  Sign Up for Free →
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white py-12 mt-auto">
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
