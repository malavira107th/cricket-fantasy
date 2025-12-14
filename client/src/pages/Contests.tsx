import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { APP_LOGO, APP_TITLE } from "@/const";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import { getCurrentMatches, getAllMatches, getTeamColor, getTeamCodes, getMatchStatus, type Match } from "@/lib/cricketApi";

const SAMPLE_CONTESTS_BACKUP = [
  {
    id: 1,
    team1: { name: "IND", flag: "🇮🇳", color: "bg-orange-500" },
    team2: { name: "AUS", flag: "🇦🇺", color: "bg-yellow-500" },
    matchType: "2nd T20I",
    venue: "Eden Gardens",
    startTime: "2h 30m",
    participants: 1247
  },
  {
    id: 2,
    team1: { name: "ENG", flag: "🏴󐁧󐁢󐁥󐁮󐁧󐁿", color: "bg-red-600" },
    team2: { name: "PAK", flag: "🇵🇰", color: "bg-green-700" },
    matchType: "3rd T20I",
    venue: "Lord's",
    startTime: "4h 15m",
    participants: 892
  },
  {
    id: 3,
    team1: { name: "SA", flag: "🇿🇦", color: "bg-green-600" },
    team2: { name: "NZ", flag: "🇳🇿", color: "bg-black" },
    matchType: "1st ODI",
    venue: "Cape Town",
    startTime: "6h 45m",
    participants: 654
  },
  {
    id: 4,
    team1: { name: "WI", flag: "🏴", color: "bg-blue-700" },
    team2: { name: "SL", flag: "🇱🇰", color: "bg-yellow-600" },
    matchType: "2nd T20I",
    venue: "Bridgetown",
    startTime: "8h 20m",
    participants: 423
  },
  {
    id: 5,
    team1: { name: "BAN", flag: "🇧🇩", color: "bg-green-600" },
    team2: { name: "AFG", flag: "🇦🇫", color: "bg-blue-800" },
    matchType: "1st T20I",
    venue: "Dhaka",
    startTime: "Tomorrow",
    participants: 312
  },
  {
    id: 6,
    team1: { name: "IND", flag: "🇮🇳", color: "bg-orange-500" },
    team2: { name: "ENG", flag: "🏴󐁧󐁢󐁥󐁮󐁧󐁿", color: "bg-red-600" },
    matchType: "1st Test",
    venue: "Mumbai",
    startTime: "Tomorrow",
    participants: 1856
  }
];

export default function Contests() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [contests, setContests] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userSession = localStorage.getItem('userSession');
    setIsLoggedIn(!!userSession);
    
    // Fetch real cricket matches
    async function fetchMatches() {
      setLoading(true);
      const matches = await getCurrentMatches();
      if (matches.length > 0) {
        setContests(matches.filter(m => !m.matchEnded).slice(0, 12));
      }
      setLoading(false);
    }
    
    fetchMatches();
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
              <Link href="/contests" className="hover:text-secondary transition-colors font-medium text-secondary">
                Contests
              </Link>
              <Link href="/how-to-play" className="hover:text-secondary transition-colors font-medium">
                How to Play
              </Link>
              <Link href="/leaderboard" className="hover:text-secondary transition-colors font-medium">
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
          <h1 className="text-4xl font-bold mb-3">All Contests</h1>
          <p className="text-lg text-white/90">
            Join any contest for free and create your dream cricket team!
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-12">
        <div className="container">
          {/* Filter Section */}
          <div className="mb-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-700 font-medium">Filter by:</span>
              <select className="px-4 py-2 border border-gray-300 rounded-lg bg-white">
                <option>All Matches</option>
                <option>T20I</option>
                <option>ODI</option>
                <option>Test</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-700 font-medium">Sort by:</span>
              <select className="px-4 py-2 border border-gray-300 rounded-lg bg-white">
                <option>Starting Soon</option>
                <option>Most Participants</option>
                <option>Latest Added</option>
              </select>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <Card className="bg-white shadow-md">
              <CardContent className="p-6 text-center">
                <p className="text-3xl font-bold text-primary">{contests.length}</p>
                <p className="text-gray-600">Live Contests</p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-md">
              <CardContent className="p-6 text-center">
                <p className="text-3xl font-bold text-primary">
                  {contests.length > 0 ? (contests.length * 500).toLocaleString() : '0'}
                </p>
                <p className="text-gray-600">Total Participants</p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-md">
              <CardContent className="p-6 text-center">
                <p className="text-3xl font-bold text-secondary">100% FREE</p>
                <p className="text-gray-600">No Entry Fees</p>
              </CardContent>
            </Card>
          </div>

          {/* Contests Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading contests...</p>
              </div>
            ) : contests.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600">No upcoming contests available</p>
              </div>
            ) : contests.map((contest) => {
              const teamCodes = getTeamCodes(contest);
              const team1Color = getTeamColor(contest.teams[0]);
              const team2Color = getTeamColor(contest.teams[1]);
              const matchStatus = getMatchStatus(contest);
              const participants = Math.floor(Math.random() * 2000) + 100; // Random for demo
              
              return (
              <Card key={contest.id} className="bg-white shadow-md hover:shadow-xl transition-all border border-gray-200">
                <CardContent className="p-6">
                  {/* Teams */}
                  <div className="flex items-center justify-center gap-6 mb-4">
                    <div className="text-center">
                      {contest.teamInfo && contest.teamInfo[0]?.img ? (
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200 mb-2 mx-auto bg-white">
                          <img 
                            src={contest.teamInfo[0].img} 
                            alt={contest.teamInfo[0].name}
                            className="w-full h-full object-contain p-1"
                            onError={(e) => {
                              // Fallback to colored circle with code if image fails
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.parentElement!.innerHTML = `<div class="w-full h-full ${team1Color} flex items-center justify-center"><span class="text-white font-bold text-lg">${teamCodes.team1}</span></div>`;
                            }}
                          />
                        </div>
                      ) : (
                        <div className={`w-16 h-16 rounded-full ${team1Color} flex items-center justify-center mb-2 mx-auto`}>
                          <span className="text-white font-bold text-lg">{teamCodes.team1}</span>
                        </div>
                      )}
                      <p className="text-xs font-semibold text-gray-700">{contest.teams[0]?.substring(0, 15) || teamCodes.team1}</p>
                    </div>
                    <span className="text-2xl font-bold text-gray-400">vs</span>
                    <div className="text-center">
                      {contest.teamInfo && contest.teamInfo[1]?.img ? (
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200 mb-2 mx-auto bg-white">
                          <img 
                            src={contest.teamInfo[1].img} 
                            alt={contest.teamInfo[1].name}
                            className="w-full h-full object-contain p-1"
                            onError={(e) => {
                              // Fallback to colored circle with code if image fails
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.parentElement!.innerHTML = `<div class="w-full h-full ${team2Color} flex items-center justify-center"><span class="text-white font-bold text-lg">${teamCodes.team2}</span></div>`;
                            }}
                          />
                        </div>
                      ) : (
                        <div className={`w-16 h-16 rounded-full ${team2Color} flex items-center justify-center mb-2 mx-auto`}>
                          <span className="text-white font-bold text-lg">{teamCodes.team2}</span>
                        </div>
                      )}
                      <p className="text-xs font-semibold text-gray-700">{contest.teams[1]?.substring(0, 15) || teamCodes.team2}</p>
                    </div>
                  </div>

                  {/* Match Details */}
                  <div className="text-center mb-4">
                    <p className="text-sm text-gray-600 font-medium">
                      {contest.matchStarted ? (
                        <span className="text-green-600 font-bold">Live Now</span>
                      ) : (
                        <span>Starts in: <span className="text-red-600 font-bold">{matchStatus}</span></span>
                      )}
                    </p>
                    <p className="text-xs text-gray-500">{contest.matchType?.toUpperCase() || 'Match'} | {contest.venue?.split(',')[0] || 'TBD'}</p>
                  </div>

                  {/* Participants */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Participants:</span>
                      <span className="font-bold text-primary">{participants.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  {isLoggedIn ? (
                    <Link href={`/contest/${contest.id}`}>
                      <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold">
                        Create Team & Join
                      </Button>
                    </Link>
                  ) : (
                    <Link href="/signup">
                      <Button className="w-full bg-secondary hover:bg-secondary/90 text-black font-semibold">
                        Sign Up to Join
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
              );
            })}
          </div>

          {/* Empty State - shown when no contests available */}
          {!loading && contests.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Contests Available</h3>
              <p className="text-gray-500">Check back soon for upcoming cricket matches!</p>
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
