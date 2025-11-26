import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { APP_LOGO, APP_TITLE } from "@/const";
import { Link } from "wouter";
import { useState, useEffect } from "react";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userSession = localStorage.getItem('userSession');
    if (userSession) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="bg-primary text-white relative">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <img src={APP_LOGO} alt={APP_TITLE} className="h-14 w-auto" />
              <div className="text-xl font-bold hidden sm:block">
                <span className="text-white">Sports IQ </span>
                <span className="text-secondary">Play</span>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="hover:text-secondary transition-colors font-medium nav-underline">
                Home
              </Link>
              <Link href="/contests" className="hover:text-secondary transition-colors font-medium">
                Contests
              </Link>
              <Link href="/how-to-play" className="hover:text-secondary transition-colors font-medium">
                How to Play
              </Link>
              <Link href="/leaderboard" className="hover:text-secondary transition-colors font-medium">
                Leaderboard
              </Link>
            </nav>

            {/* Auth Buttons */}
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
      <section 
        className="relative min-h-[500px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(30, 91, 168, 0.7), rgba(30, 91, 168, 0.4)), url(/hero-stadium.jpg)',
        }}
      >
        <div className="container relative z-10 py-16 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 text-stroke">
            Play Cricket Fantasy for <span className="text-secondary">FREE</span>
          </h1>
          <p className="text-lg md:text-xl text-white mb-8 max-w-3xl mx-auto leading-relaxed">
            Experience skill-based cricket entertainment without any monetary risk. Create your dream team, compete with friends, and enjoy the thrill of the game purely for fun!
          </p>
          {!isLoggedIn ? (
            <Link href="/signup">
              <Button size="lg" className="bg-secondary text-black hover:bg-secondary/90 text-lg px-10 py-6 h-auto font-bold">
                START PLAYING NOW
              </Button>
            </Link>
          ) : (
            <Link href="/contests">
              <Button size="lg" className="bg-secondary text-black hover:bg-secondary/90 text-lg px-10 py-6 h-auto font-bold">
                JOIN CONTESTS NOW
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-12 bg-gray-50 relative" style={{ marginTop: '-60px' }}>
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6 relative z-10">
            {/* Free to Play */}
            <Card className="bg-white shadow-lg hover:shadow-xl transition-all gold-border-bottom">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 flex-shrink-0">
                    <img src="/feature-free.png" alt="Free to Play" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">Free to Play</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Join contests and create teams completely free of charge. Enjoy the game without spending a penny.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skill Based */}
            <Card className="bg-white shadow-lg hover:shadow-xl transition-all gold-border-bottom">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 flex-shrink-0">
                    <img src="/feature-skill.png" alt="Skill Based" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">Skill Based</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Your knowledge and strategy determine your success. Use your cricket expertise to build winning teams.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* No Prizes - Pure Fun */}
            <Card className="bg-white shadow-lg hover:shadow-xl transition-all gold-border-bottom">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                      <svg className="w-8 h-8 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">No Prizes - Pure Fun</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Focus on the excitement of the game and friendly competition. Bragging rights are your reward!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Contests */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-4xl font-bold text-primary">Featured Contests</h2>
            <Link href="/contests">
              <Button variant="link" className="text-secondary hover:text-secondary/80 font-semibold text-lg">
                View All →
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Contest Card 1 */}
            <Card className="bg-white shadow-md hover:shadow-xl transition-all border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-center gap-6 mb-4">
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center mb-2 mx-auto">
                      <span className="text-white font-bold text-sm">IND</span>
                    </div>
                  </div>
                  <span className="text-xl font-bold text-gray-400">vs</span>
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-full bg-yellow-500 flex items-center justify-center mb-2 mx-auto">
                      <span className="text-white font-bold text-sm">AUS</span>
                    </div>
                  </div>
                </div>

                <div className="text-center mb-3">
                  <p className="text-sm text-gray-600 font-medium">Starts in: <span className="text-red-600 font-bold">2h 30m</span></p>
                  <p className="text-xs text-gray-500">2nd T20I | Eden Gardens</p>
                </div>

                <Link href="/contest/1">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold">
                    Join Now
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Contest Card 2 */}
            <Card className="bg-white shadow-md hover:shadow-xl transition-all border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-center gap-6 mb-4">
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center mb-2 mx-auto">
                      <span className="text-white font-bold text-sm">ENG</span>
                    </div>
                  </div>
                  <span className="text-xl font-bold text-gray-400">vs</span>
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-full bg-green-700 flex items-center justify-center mb-2 mx-auto">
                      <span className="text-white font-bold text-sm">PAK</span>
                    </div>
                  </div>
                </div>

                <div className="text-center mb-3">
                  <p className="text-sm text-gray-600 font-medium">Starts in: <span className="text-red-600 font-bold">2h 30m</span></p>
                  <p className="text-xs text-gray-500">3th T20I | Eden Gardens</p>
                </div>

                <Link href="/contest/2">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold">
                    Join Now
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Contest Card 3 */}
            <Card className="bg-white shadow-md hover:shadow-xl transition-all border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-center gap-6 mb-4">
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-full bg-green-600 flex items-center justify-center mb-2 mx-auto">
                      <span className="text-white font-bold text-sm">SA</span>
                    </div>
                  </div>
                  <span className="text-xl font-bold text-gray-400">vs</span>
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center mb-2 mx-auto">
                      <span className="text-white font-bold text-sm">NZ</span>
                    </div>
                  </div>
                </div>

                <div className="text-center mb-3">
                  <p className="text-sm text-gray-600 font-medium">Starts in: <span className="text-red-600 font-bold">2h 30m</span></p>
                  <p className="text-xs text-gray-500">4th T20I | Eden Gardens</p>
                </div>

                <Link href="/contest/3">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold">
                    Join Now
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Contest Card 4 */}
            <Card className="bg-white shadow-md hover:shadow-xl transition-all border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-center gap-6 mb-4">
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-full bg-blue-700 flex items-center justify-center mb-2 mx-auto">
                      <span className="text-white font-bold text-sm">WI</span>
                    </div>
                  </div>
                  <span className="text-xl font-bold text-gray-400">vs</span>
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-full bg-yellow-600 flex items-center justify-center mb-2 mx-auto">
                      <span className="text-white font-bold text-sm">SL</span>
                    </div>
                  </div>
                </div>

                <div className="text-center mb-3">
                  <p className="text-sm text-gray-600 font-medium">Starts in: <span className="text-red-600 font-bold">2h 30m</span></p>
                  <p className="text-xs text-gray-500">2nd T20I | Eden Gardens</p>
                </div>

                <Link href="/contest/4">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold">
                    Join Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* About */}
            <div>
              <h4 className="font-bold text-lg mb-4">About</h4>
              <ul className="space-y-3 text-sm text-white/80">
                <li><Link href="/about" className="hover:text-secondary transition-colors">About Us</Link></li>
                <li><Link href="/how-to-play" className="hover:text-secondary transition-colors">How It Works</Link></li>
                <li><Link href="/contact" className="hover:text-secondary transition-colors">Contact Us</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-bold text-lg mb-4">Legal</h4>
              <ul className="space-y-3 text-sm text-white/80">
                <li><Link href="/terms" className="hover:text-secondary transition-colors">Terms & Conditions</Link></li>
                <li><Link href="/privacy" className="hover:text-secondary transition-colors">Privacy Policy</Link></li>
                <li><Link href="/responsible-gaming" className="hover:text-secondary transition-colors">Responsible Gaming</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-bold text-lg mb-4">Support</h4>
              <ul className="space-y-3 text-sm text-white/80">
                <li><Link href="/faq" className="hover:text-secondary transition-colors">FAQ</Link></li>
                <li><Link href="/contact" className="hover:text-secondary transition-colors">Contact Support</Link></li>
                <li><Link href="/signup" className="hover:text-secondary transition-colors">Sign Up</Link></li>
                <li><Link href="/login" className="hover:text-secondary transition-colors">Login</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-bold text-lg mb-4">Company</h4>
              <div className="text-sm text-white/80 space-y-2">
                <p className="font-semibold text-white">Sports IQ Play Private Limited</p>
                <p>CIN: U74999DL2023PTC123456</p>
                <p>PAN: AAFCS1234E</p>
                <p className="mt-3">New Delhi, Delhi, India</p>
                <p>Est. January 2025</p>
              </div>
            </div>
          </div>

          {/* Legal Disclaimer */}
          <div className="border-t border-white/20 pt-6 pb-4">
            <p className="text-sm text-white/70 leading-relaxed">
              <span className="font-semibold text-white">Legal Disclaimer:</span> This platform is NOT available in Andhra Pradesh, Assam, Odisha, Telangana, Nagaland, and Sikkim. Only users 18 years and older are permitted. This is a skill-based, free-to-play platform with no real money involved.
            </p>
          </div>

          {/* Copyright */}
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
