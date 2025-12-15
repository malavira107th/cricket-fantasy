import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { APP_LOGO, APP_TITLE, COMPANY_NAME, COMPANY_ADDRESS, TAGLINE } from "@/const";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import { getCurrentMatches } from "@/lib/cricketApi";
import GoogleAdsBanner from "@/components/GoogleAdsBanner";

// Demo matches fallback data
function getDemoMatches() {
  return [
    {
      id: 'demo-1',
      name: 'India vs Australia - 3rd T20',
      matchType: 'T20',
      status: 'Starts in 2h 30m',
      venue: 'M. Chinnaswamy Stadium, Bengaluru',
      date: new Date(Date.now() + 2.5 * 60 * 60 * 1000).toISOString(),
      dateTimeGMT: new Date(Date.now() + 2.5 * 60 * 60 * 1000).toISOString(),
      teams: ['India', 'Australia'],
      teamInfo: [
        { name: 'India', shortname: 'IND', img: '' },
        { name: 'Australia', shortname: 'AUS', img: '' }
      ],
      series_id: 'demo-series-1',
      fantasyEnabled: true,
      matchStarted: false,
      matchEnded: false
    },
    {
      id: 'demo-2',
      name: 'England vs Pakistan - 2nd ODI',
      matchType: 'ODI',
      status: 'Starts in 5h 15m',
      venue: 'Lord\'s, London',
      date: new Date(Date.now() + 5.25 * 60 * 60 * 1000).toISOString(),
      dateTimeGMT: new Date(Date.now() + 5.25 * 60 * 60 * 1000).toISOString(),
      teams: ['England', 'Pakistan'],
      teamInfo: [
        { name: 'England', shortname: 'ENG', img: '' },
        { name: 'Pakistan', shortname: 'PAK', img: '' }
      ],
      series_id: 'demo-series-2',
      fantasyEnabled: true,
      matchStarted: false,
      matchEnded: false
    },
    {
      id: 'demo-3',
      name: 'Mumbai vs Delhi - IPL 2024',
      matchType: 'T20',
      status: 'Starts in 8h 45m',
      venue: 'Wankhede Stadium, Mumbai',
      date: new Date(Date.now() + 8.75 * 60 * 60 * 1000).toISOString(),
      dateTimeGMT: new Date(Date.now() + 8.75 * 60 * 60 * 1000).toISOString(),
      teams: ['Mumbai Indians', 'Delhi Capitals'],
      teamInfo: [
        { name: 'Mumbai Indians', shortname: 'MI', img: '' },
        { name: 'Delhi Capitals', shortname: 'DC', img: '' }
      ],
      series_id: 'demo-series-3',
      fantasyEnabled: true,
      matchStarted: false,
      matchEnded: false
    },
    {
      id: 'demo-4',
      name: 'South Africa vs New Zealand - Test Match',
      matchType: 'Test',
      status: 'Starts in 12h',
      venue: 'Newlands, Cape Town',
      date: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
      dateTimeGMT: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
      teams: ['South Africa', 'New Zealand'],
      teamInfo: [
        { name: 'South Africa', shortname: 'RSA', img: '' },
        { name: 'New Zealand', shortname: 'NZ', img: '' }
      ],
      series_id: 'demo-series-4',
      fantasyEnabled: true,
      matchStarted: false,
      matchEnded: false
    }
  ];
}

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading: authLoading, error, isAuthenticated, logout } = useAuth();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [featuredMatches, setFeaturedMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userSession = localStorage.getItem('userSession');
    if (userSession) {
      setIsLoggedIn(true);
    }

    // Fetch real cricket matches
    const fetchMatches = async () => {
      try {
        const matches = await getCurrentMatches();
        // Get first 4 matches for featured section
        if (matches && matches.length > 0) {
          setFeaturedMatches(matches.slice(0, 4));
        } else {
          // Fallback to demo data if API returns no matches
          setFeaturedMatches(getDemoMatches());
        }
      } catch (error) {
        console.error('Error fetching matches:', error);
        // Use demo data on error
        setFeaturedMatches(getDemoMatches());
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Google Ads Banner - Mobile only for Google Ads users */}
      <GoogleAdsBanner />
      {/* Header */}
      <header className="bg-primary text-white relative">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <img src={APP_LOGO} alt={APP_TITLE} className="h-12 w-auto" />
              <div className="text-xl font-bold hidden sm:block">
                <span className="text-white">SDSURABHI</span>
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
                    <img src="/icon-free-new.png" alt="Free to Play" className="w-full h-full object-contain" />
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
                    <img src="/icon-skill-new.png" alt="Skill Based" className="w-full h-full object-contain" />
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
                  <div className="w-16 h-16 flex-shrink-0">
                    <img src="/icon-fun-new.png" alt="No Prizes - Pure Fun" className="w-full h-full object-contain" />
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
            {loading ? (
              // Loading skeleton
              Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="bg-white shadow-md border border-gray-200">
                  <CardContent className="p-6">
                    <div className="animate-pulse">
                      <div className="flex items-center justify-center gap-6 mb-4">
                        <div className="w-14 h-14 rounded-full bg-gray-200"></div>
                        <span className="text-xl font-bold text-gray-300">vs</span>
                        <div className="w-14 h-14 rounded-full bg-gray-200"></div>
                      </div>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded mb-3"></div>
                      <div className="h-10 bg-gray-200 rounded"></div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : featuredMatches.length > 0 ? (
              // Real match data
              featuredMatches.map((match, index) => {
                const team1 = match.teams?.[0] || match.teamInfo?.[0] || {};
                const team2 = match.teams?.[1] || match.teamInfo?.[1] || {};
                const team1Code = team1.shortname || team1.name?.substring(0, 3).toUpperCase() || 'TBD';
                const team2Code = team2.shortname || team2.name?.substring(0, 3).toUpperCase() || 'TBD';
                const team1Img = team1.img || '';
                const team2Img = team2.img || '';
                const matchType = match.matchType || match.type || 'Match';
                const venue = match.venue || 'TBD';
                const status = match.status || 'Upcoming';

                return (
                  <Card key={match.id || index} className="bg-white shadow-md hover:shadow-xl transition-all border border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-center gap-6 mb-4">
                        <div className="text-center">
                          {team1Img ? (
                            <img src={team1Img} alt={team1Code} className="w-14 h-14 rounded-full object-cover mb-2 mx-auto" />
                          ) : (
                            <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center mb-2 mx-auto">
                              <span className="text-white font-bold text-xs">{team1Code}</span>
                            </div>
                          )}
                          <p className="text-xs font-medium text-gray-700">{team1.name || team1Code}</p>
                        </div>
                        <span className="text-xl font-bold text-gray-400">vs</span>
                        <div className="text-center">
                          {team2Img ? (
                            <img src={team2Img} alt={team2Code} className="w-14 h-14 rounded-full object-cover mb-2 mx-auto" />
                          ) : (
                            <div className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center mb-2 mx-auto">
                              <span className="text-white font-bold text-xs">{team2Code}</span>
                            </div>
                          )}
                          <p className="text-xs font-medium text-gray-700">{team2.name || team2Code}</p>
                        </div>
                      </div>

                      <div className="text-center mb-3">
                        <p className="text-sm text-gray-600 font-medium">
                          Status: <span className={status === 'Live' ? 'text-red-600 font-bold' : 'text-green-600 font-bold'}>{status}</span>
                        </p>
                        <p className="text-xs text-gray-500">{matchType} | {venue}</p>
                      </div>

                      <Link href={`/contest/${match.id || index + 1}`}>
                        <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold">
                          Join Now
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              // No matches available
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">No matches available at the moment. Check back soon!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-gradient-to-br from-primary to-blue-700 text-white">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">5,234</div>
              <div className="text-lg text-white/90">Active Players</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">12</div>
              <div className="text-lg text-white/90">Live Contests</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">1,456</div>
              <div className="text-lg text-white/90">Completed Contests</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2 text-secondary">100%</div>
              <div className="text-lg text-white/90">FREE</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-4xl font-bold text-primary text-center mb-12">How to Play - It's Simple!</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">1. Select a Contest</h3>
              <p className="text-gray-600">Browse upcoming cricket matches and choose a contest to join. All contests are 100% free.</p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">2. Create Your Team</h3>
              <p className="text-gray-600">Pick 11 players using your cricket knowledge. Choose captain and vice-captain for bonus points.</p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">3. Compete & Have Fun</h3>
              <p className="text-gray-600">Watch the match live, track your points in real-time, and climb the leaderboard!</p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link href="/signup">
              <Button size="lg" className="bg-secondary text-black hover:bg-secondary/90 text-lg px-10 py-6 h-auto font-bold">
                Start Playing Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Top Performers */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-4xl font-bold text-primary text-center mb-12">This Week's Top Players</h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto">
            <table className="w-full">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Rank</th>
                  <th className="px-6 py-4 text-left">Player</th>
                  <th className="px-6 py-4 text-center">Points</th>
                  <th className="px-6 py-4 text-center">Contests</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { rank: 1, name: 'CricketMaster', points: 2456, contests: 23, medal: '🥇' },
                  { rank: 2, name: 'FantasyKing', points: 2398, contests: 21, medal: '🥈' },
                  { rank: 3, name: 'TeamBuilder', points: 2245, contests: 19, medal: '🥉' },
                  { rank: 4, name: 'StrategyPro', points: 2134, contests: 18, medal: '' },
                  { rank: 5, name: 'CaptainCool', points: 2089, contests: 17, medal: '' },
                ].map((player) => (
                  <tr key={player.rank} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-bold">
                      <span className="text-2xl mr-2">{player.medal}</span>
                      #{player.rank}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">{player.name}</td>
                    <td className="px-6 py-4 text-center font-bold text-secondary">{player.points.toLocaleString()}</td>
                    <td className="px-6 py-4 text-center text-gray-600">{player.contests}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-8">
            <Link href="/leaderboard">
              <Button variant="link" className="text-primary hover:text-primary/80 font-semibold text-lg">
                View Full Leaderboard →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-4xl font-bold text-primary text-center mb-12">Why Choose SDSURABHI?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="bg-white shadow-md hover:shadow-xl transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">100% Free</h3>
                <p className="text-gray-600">No entry fees, no hidden costs, ever. Play as much as you want!</p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="bg-white shadow-md hover:shadow-xl transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Skill-Based</h3>
                <p className="text-gray-600">Your cricket knowledge determines success. Strategy matters!</p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="bg-white shadow-md hover:shadow-xl transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Legal & Safe</h3>
                <p className="text-gray-600">Fully compliant with Indian laws. Your data is secure.</p>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="bg-white shadow-md hover:shadow-xl transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">No Prizes - Pure Fun</h3>
                <p className="text-gray-600">Pure entertainment, no monetary rewards. Bragging rights only!</p>
              </CardContent>
            </Card>

            {/* Feature 5 */}
            <Card className="bg-white shadow-md hover:shadow-xl transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Community</h3>
                <p className="text-gray-600">Join thousands of cricket enthusiasts and compete for fun!</p>
              </CardContent>
            </Card>

            {/* Feature 6 */}
            <Card className="bg-white shadow-md hover:shadow-xl transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Easy to Play</h3>
                <p className="text-gray-600">Simple interface, quick team creation. Start playing in minutes!</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-primary to-blue-700 text-white">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Test Your Cricket IQ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of cricket fans playing for fun. No money, no risk, just pure cricket entertainment!</p>
          <Link href="/signup">
            <Button size="lg" className="bg-secondary text-black hover:bg-secondary/90 text-lg px-12 py-6 h-auto font-bold">
              Sign Up Free Now
            </Button>
          </Link>
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
              <div className="flex flex-col items-start gap-3 mb-4">
                <img src={APP_LOGO} alt={APP_TITLE} className="h-16 w-auto" />
              </div>
              <div className="text-sm text-white/80 space-y-2">
                <p className="font-semibold text-white">{COMPANY_NAME}</p>
                <p className="text-white/60 text-xs">Brand Name: SDSURABHI</p>
                <p className="italic text-secondary">{TAGLINE}</p>
                <p className="mt-3">{COMPANY_ADDRESS}</p>
              </div>
            </div>
          </div>

          {/* Operating Company */}
          <div className="border-t border-white/20 pt-6 pb-4">
            <p className="text-sm text-white/70">
              <span className="font-semibold text-white">Operated by:</span> SDSURABHI INFRA PRIVATE LIMITED
            </p>
            <p className="text-xs text-white/60 mt-1">
              CIN: U41002UP2023PTC194590 | GST: 09ABMCS3759A1Z4
            </p>
            <p className="text-xs text-white/60 mt-2 italic">
              SDSURABHI is fully operated and managed by SDSURABHI INFRA PRIVATE LIMITED
            </p>
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
              © 2025 SDSURABHI INFRA PRIVATE LIMITED. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
