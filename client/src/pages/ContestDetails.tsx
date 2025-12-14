import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_LOGO, APP_TITLE } from "@/const";
import { Link, useLocation, useParams } from "wouter";
import Footer from "@/components/Footer";
import LiveScore from "@/components/LiveScore";
import { useEffect, useState } from "react";

// Sample contest data - in real app, this would come from API
const CONTEST_DATA: any = {
  "1": {
    id: 1,
    team1: { name: "India", code: "IND", flag: "🇮🇳", color: "bg-orange-500" },
    team2: { name: "Australia", code: "AUS", flag: "🇦🇺", color: "bg-yellow-500" },
    matchType: "2nd T20I",
    venue: "Eden Gardens, Kolkata",
    date: "November 26, 2025",
    startTime: "7:00 PM IST",
    startsIn: "2h 30m",
    participants: 1247,
    maxParticipants: 10000,
    status: "Open"
  },
  // Add more contests as needed
};

export default function ContestDetails() {
  const params = useParams();
  const contestId = params.id || "1";
  const [, setLocation] = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const contest = CONTEST_DATA[contestId] || CONTEST_DATA["1"];

  useEffect(() => {
    const userSession = localStorage.getItem('userSession');
    setIsLoggedIn(!!userSession);
  }, []);

  const handleJoinContest = () => {
    if (!isLoggedIn) {
      setLocation('/signup');
      return;
    }
    setLocation(`/create-team/${contestId}`);
  };

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

      {/* Main Content */}
      <main className="py-12">
        <div className="container max-w-6xl">
          {/* Back Button */}
          <Link href="/contests">
            <Button variant="outline" className="mb-6">
              ← Back to Contests
            </Button>
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Contest Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Match Info Card */}
              <Card className="bg-white shadow-lg">
                <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-white">
                  <CardTitle className="text-2xl">Match Details</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  {/* Teams */}
                  <div className="flex items-center justify-center gap-8 mb-6">
                    <div className="text-center">
                      <div className={`w-24 h-24 rounded-full ${contest.team1.color} flex items-center justify-center mb-3 mx-auto shadow-lg`}>
                        <span className="text-white font-bold text-2xl">{contest.team1.code}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{contest.team1.name}</h3>
                    </div>
                    <div className="text-center">
                      <span className="text-4xl font-bold text-gray-400">vs</span>
                    </div>
                    <div className="text-center">
                      <div className={`w-24 h-24 rounded-full ${contest.team2.color} flex items-center justify-center mb-3 mx-auto shadow-lg`}>
                        <span className="text-white font-bold text-2xl">{contest.team2.code}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{contest.team2.name}</h3>
                    </div>
                  </div>

                  {/* Match Details */}
                  <div className="grid md:grid-cols-2 gap-4 bg-gray-50 rounded-lg p-6">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Match Type</p>
                      <p className="text-lg font-semibold text-gray-900">{contest.matchType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Venue</p>
                      <p className="text-lg font-semibold text-gray-900">{contest.venue}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Date</p>
                      <p className="text-lg font-semibold text-gray-900">{contest.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Start Time</p>
                      <p className="text-lg font-semibold text-gray-900">{contest.startTime}</p>
                    </div>
                  </div>

              {/* Countdown */}
              <div className="mt-6 bg-red-50 border-2 border-red-300 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-700 mb-1">Starts in</p>
                <p className="text-3xl font-bold text-red-600">{contest.startsIn}</p>
              </div>
            </CardContent>
          </Card>

          {/* Live Score Card */}
          <LiveScore 
            matchId={contestId}
            team1Name={contest.team1.name}
            team2Name={contest.team2.name}
            autoRefresh={true}
            refreshInterval={30000}
          />

          <Card className="bg-white shadow-lg">
            <CardContent className="p-0">
                </CardContent>
              </Card>

              {/* Contest Rules */}
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Contest Rules</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span>Create a team of 11 players within the 100 credit budget</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span>Select 1 Wicketkeeper, 3-6 Batsmen, 1-3 All-rounders, and 3-6 Bowlers</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span>Choose a Captain (2x points) and Vice-Captain (1.5x points)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span>Maximum 7 players from a single team</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span>Points are awarded based on actual match performance</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span>100% Free to play - No entry fees, no prizes, pure fun!</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Scoring System */}
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Scoring System</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Batting Points</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex justify-between bg-gray-50 p-2 rounded">
                          <span>Run scored</span>
                          <span className="font-semibold">+1</span>
                        </div>
                        <div className="flex justify-between bg-gray-50 p-2 rounded">
                          <span>Boundary (4)</span>
                          <span className="font-semibold">+1</span>
                        </div>
                        <div className="flex justify-between bg-gray-50 p-2 rounded">
                          <span>Six (6)</span>
                          <span className="font-semibold">+2</span>
                        </div>
                        <div className="flex justify-between bg-gray-50 p-2 rounded">
                          <span>Half-century (50)</span>
                          <span className="font-semibold">+8</span>
                        </div>
                        <div className="flex justify-between bg-gray-50 p-2 rounded">
                          <span>Century (100)</span>
                          <span className="font-semibold">+16</span>
                        </div>
                        <div className="flex justify-between bg-gray-50 p-2 rounded">
                          <span>Duck (Out for 0)</span>
                          <span className="font-semibold text-red-600">-2</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Bowling Points</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex justify-between bg-gray-50 p-2 rounded">
                          <span>Wicket</span>
                          <span className="font-semibold">+25</span>
                        </div>
                        <div className="flex justify-between bg-gray-50 p-2 rounded">
                          <span>3 Wickets</span>
                          <span className="font-semibold">+4</span>
                        </div>
                        <div className="flex justify-between bg-gray-50 p-2 rounded">
                          <span>5 Wickets</span>
                          <span className="font-semibold">+8</span>
                        </div>
                        <div className="flex justify-between bg-gray-50 p-2 rounded">
                          <span>Maiden Over</span>
                          <span className="font-semibold">+12</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Fielding Points</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex justify-between bg-gray-50 p-2 rounded">
                          <span>Catch</span>
                          <span className="font-semibold">+8</span>
                        </div>
                        <div className="flex justify-between bg-gray-50 p-2 rounded">
                          <span>Stumping</span>
                          <span className="font-semibold">+12</span>
                        </div>
                        <div className="flex justify-between bg-gray-50 p-2 rounded">
                          <span>Run Out (Direct)</span>
                          <span className="font-semibold">+12</span>
                        </div>
                        <div className="flex justify-between bg-gray-50 p-2 rounded">
                          <span>Run Out (Assist)</span>
                          <span className="font-semibold">+6</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Join Contest Card */}
              <Card className="bg-white shadow-lg sticky top-6">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold mb-4">
                      {contest.status}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Join Contest</h3>
                    <p className="text-gray-600">Create your team and compete!</p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center pb-3 border-b">
                      <span className="text-gray-600">Entry Fee</span>
                      <span className="text-xl font-bold text-green-600">FREE</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b">
                      <span className="text-gray-600">Prize</span>
                      <span className="text-lg font-semibold text-gray-900">Bragging Rights</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b">
                      <span className="text-gray-600">Participants</span>
                      <span className="text-lg font-semibold text-primary">
                        {contest.participants.toLocaleString()} / {contest.maxParticipants.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Spots Left</span>
                      <span className="text-lg font-semibold text-orange-600">
                        {(contest.maxParticipants - contest.participants).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <Button 
                    onClick={handleJoinContest}
                    className="w-full bg-secondary hover:bg-secondary/90 text-black font-bold text-lg py-6 h-auto"
                  >
                    {isLoggedIn ? "Create Team & Join" : "Sign Up to Join"}
                  </Button>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    100% Free • No Money Involved • Pure Entertainment
                  </p>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="bg-gradient-to-br from-primary to-primary/80 text-white shadow-lg">
                <CardContent className="p-6">
                  <h4 className="font-bold text-lg mb-4">Contest Stats</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Total Teams</span>
                      <span className="text-2xl font-bold">{contest.participants}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Avg. Team Score</span>
                      <span className="text-2xl font-bold">-</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Top Score</span>
                      <span className="text-2xl font-bold">-</span>
                    </div>
                  </div>
                  <p className="text-xs text-white/70 mt-4">Stats will update after match starts</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
