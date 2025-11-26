import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_LOGO, APP_TITLE } from "@/const";
import { Link, useLocation, useParams } from "wouter";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// Realistic player data for Indian domestic cricket
const SAMPLE_PLAYERS = [
  // Wicketkeepers
  { id: 1, name: "Rishabh Pant", role: "WK", team: "Delhi", credits: 10, points: 245 },
  { id: 2, name: "KS Bharat", role: "WK", team: "Andhra", credits: 8.5, points: 198 },
  { id: 3, name: "Ishan Kishan", role: "WK", team: "Jharkhand", credits: 9.5, points: 220 },
  { id: 4, name: "Sanju Samson", role: "WK", team: "Kerala", credits: 9, points: 210 },
  
  // Batsmen
  { id: 5, name: "Virat Kohli", role: "BAT", team: "Delhi", credits: 11, points: 312 },
  { id: 6, name: "Rohit Sharma", role: "BAT", team: "Mumbai", credits: 10.5, points: 298 },
  { id: 7, name: "Shubman Gill", role: "BAT", team: "Punjab", credits: 10, points: 275 },
  { id: 8, name: "Shreyas Iyer", role: "BAT", team: "Mumbai", credits: 9.5, points: 256 },
  { id: 9, name: "KL Rahul", role: "BAT", team: "Karnataka", credits: 9.5, points: 248 },
  { id: 10, name: "Prithvi Shaw", role: "BAT", team: "Mumbai", credits: 8.5, points: 210 },
  { id: 11, name: "Ruturaj Gaikwad", role: "BAT", team: "Maharashtra", credits: 9, points: 235 },
  { id: 12, name: "Devdutt Padikkal", role: "BAT", team: "Karnataka", credits: 8, points: 195 },
  
  // All-rounders
  { id: 13, name: "Hardik Pandya", role: "AR", team: "Baroda", credits: 10.5, points: 285 },
  { id: 14, name: "Ravindra Jadeja", role: "AR", team: "Saurashtra", credits: 10, points: 270 },
  { id: 15, name: "Axar Patel", role: "AR", team: "Gujarat", credits: 9, points: 240 },
  { id: 16, name: "Washington Sundar", role: "AR", team: "Tamil Nadu", credits: 8.5, points: 225 },
  { id: 17, name: "Krunal Pandya", role: "AR", team: "Baroda", credits: 8, points: 205 },
  { id: 18, name: "Vijay Shankar", role: "AR", team: "Tamil Nadu", credits: 7.5, points: 180 },
  
  // Bowlers
  { id: 19, name: "Jasprit Bumrah", role: "BOW", team: "Gujarat", credits: 11, points: 295 },
  { id: 20, name: "Mohammed Shami", role: "BOW", team: "Bengal", credits: 10, points: 275 },
  { id: 21, name: "Yuzvendra Chahal", role: "BOW", team: "Haryana", credits: 9.5, points: 260 },
  { id: 22, name: "Kuldeep Yadav", role: "BOW", team: "Uttar Pradesh", credits: 9, points: 245 },
  { id: 23, name: "Mohammed Siraj", role: "BOW", team: "Hyderabad", credits: 9, points: 240 },
  { id: 24, name: "Shardul Thakur", role: "BOW", team: "Mumbai", credits: 8.5, points: 220 },
  { id: 25, name: "Arshdeep Singh", role: "BOW", team: "Punjab", credits: 8, points: 205 },
  { id: 26, name: "Umran Malik", role: "BOW", team: "Jammu and Kashmir", credits: 7.5, points: 185 },
];

interface Player {
  id: number;
  name: string;
  role: string;
  team: string;
  credits: number;
  points: number;
}

export default function CreateTeam() {
  const params = useParams();
  const contestId = params.contestId || "1";
  const [, setLocation] = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [captain, setCaptain] = useState<number | null>(null);
  const [viceCaptain, setViceCaptain] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("ALL");

  useEffect(() => {
    const userSession = localStorage.getItem('userSession');
    if (!userSession) {
      setLocation('/login');
      return;
    }
    setIsLoggedIn(true);
  }, [setLocation]);

  const creditsUsed = selectedPlayers.reduce((sum, p) => sum + p.credits, 0);
  const creditsLeft = 100 - creditsUsed;

  const roleCount = {
    WK: selectedPlayers.filter(p => p.role === 'WK').length,
    BAT: selectedPlayers.filter(p => p.role === 'BAT').length,
    AR: selectedPlayers.filter(p => p.role === 'AR').length,
    BOW: selectedPlayers.filter(p => p.role === 'BOW').length,
  };

  const canAddPlayer = (player: Player): boolean => {
    if (selectedPlayers.length >= 11) return false;
    if (creditsLeft < player.credits) return false;
    
    const newRoleCount = { ...roleCount };
    newRoleCount[player.role as keyof typeof roleCount]++;
    
    // Role constraints
    if (player.role === 'WK' && newRoleCount.WK > 1) return false;
    if (player.role === 'BAT' && newRoleCount.BAT > 6) return false;
    if (player.role === 'AR' && newRoleCount.AR > 3) return false;
    if (player.role === 'BOW' && newRoleCount.BOW > 6) return false;
    
    return true;
  };

  const handlePlayerToggle = (player: Player) => {
    const isSelected = selectedPlayers.some(p => p.id === player.id);
    
    if (isSelected) {
      setSelectedPlayers(selectedPlayers.filter(p => p.id !== player.id));
      if (captain === player.id) setCaptain(null);
      if (viceCaptain === player.id) setViceCaptain(null);
    } else {
      if (canAddPlayer(player)) {
        setSelectedPlayers([...selectedPlayers, player]);
      } else {
        toast.error("Cannot add this player. Check credits or role limits.");
      }
    }
  };

  const handleSaveTeam = () => {
    if (selectedPlayers.length !== 11) {
      toast.error("Please select exactly 11 players");
      return;
    }
    
    if (roleCount.WK < 1) {
      toast.error("Select at least 1 Wicketkeeper");
      return;
    }
    if (roleCount.BAT < 3) {
      toast.error("Select at least 3 Batsmen");
      return;
    }
    if (roleCount.AR < 1) {
      toast.error("Select at least 1 All-rounder");
      return;
    }
    if (roleCount.BOW < 3) {
      toast.error("Select at least 3 Bowlers");
      return;
    }
    
    if (!captain) {
      toast.error("Please select a Captain");
      return;
    }
    if (!viceCaptain) {
      toast.error("Please select a Vice-Captain");
      return;
    }
    
    // Save team to localStorage
    const team = {
      contestId,
      players: selectedPlayers,
      captain,
      viceCaptain,
      createdAt: new Date().toISOString()
    };
    
    const existingTeams = JSON.parse(localStorage.getItem('myTeams') || '[]');
    existingTeams.push(team);
    localStorage.setItem('myTeams', JSON.stringify(existingTeams));
    
    toast.success("Team saved successfully!");
    setLocation('/my-teams');
  };

  const filteredPlayers = filter === "ALL" 
    ? SAMPLE_PLAYERS 
    : SAMPLE_PLAYERS.filter(p => p.role === filter);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
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

            <div className="flex items-center gap-3">
              <Link href="/dashboard">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary bg-transparent">
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8">
        <div className="container max-w-7xl">
          {/* Back Button */}
          <Link href={`/contest/${contestId}`}>
            <Button variant="outline" className="mb-6">
              ← Back to Contest
            </Button>
          </Link>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Player List */}
            <div className="lg:col-span-3">
              <Card className="bg-white shadow-lg">
                <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-white">
                  <CardTitle className="text-2xl">Select Your Team</CardTitle>
                  <p className="text-sm text-white/80 mt-1">Pick 11 players within 100 credits</p>
                </CardHeader>
                <CardContent className="p-6">
                  {/* Filter Tabs */}
                  <div className="flex gap-2 mb-6 flex-wrap">
                    {['ALL', 'WK', 'BAT', 'AR', 'BOW'].map(role => (
                      <Button
                        key={role}
                        onClick={() => setFilter(role)}
                        variant={filter === role ? "default" : "outline"}
                        className={filter === role ? "bg-primary" : ""}
                      >
                        {role === 'ALL' ? 'All Players' : role}
                      </Button>
                    ))}
                  </div>

                  {/* Players Grid */}
                  <div className="space-y-2">
                    {filteredPlayers.map(player => {
                      const isSelected = selectedPlayers.some(p => p.id === player.id);
                      const isCaptain = captain === player.id;
                      const isViceCaptain = viceCaptain === player.id;
                      
                      return (
                        <div
                          key={player.id}
                          className={`border rounded-lg p-4 flex items-center justify-between transition-all ${
                            isSelected ? 'border-primary bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center gap-4 flex-1">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handlePlayerToggle(player)}
                              className="w-5 h-5"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold text-gray-900">{player.name}</h4>
                                {isCaptain && <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded">C</span>}
                                {isViceCaptain && <span className="bg-gray-600 text-white text-xs px-2 py-1 rounded">VC</span>}
                              </div>
                              <p className="text-sm text-gray-600">{player.team} • {player.role}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-sm font-semibold text-primary">{player.credits} CR</p>
                              <p className="text-xs text-gray-500">{player.points} pts</p>
                            </div>
                            {isSelected && (
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant={isCaptain ? "default" : "outline"}
                                  onClick={() => setCaptain(player.id)}
                                  className="text-xs"
                                >
                                  C
                                </Button>
                                <Button
                                  size="sm"
                                  variant={isViceCaptain ? "default" : "outline"}
                                  onClick={() => setViceCaptain(player.id)}
                                  className="text-xs"
                                >
                                  VC
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Team Summary Sidebar */}
            <div className="space-y-6">
              {/* Credits Card */}
              <Card className="bg-white shadow-lg sticky top-6">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4">Team Summary</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Credits Left</span>
                        <span className={`font-bold ${creditsLeft < 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {creditsLeft.toFixed(1)}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${creditsLeft < 0 ? 'bg-red-600' : 'bg-green-600'}`}
                          style={{ width: `${Math.min(100, (creditsUsed / 100) * 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <p className="text-sm text-gray-600 mb-2">Players Selected</p>
                      <p className="text-2xl font-bold text-primary">{selectedPlayers.length}/11</p>
                    </div>

                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>WK</span>
                        <span className="font-semibold">{roleCount.WK}/1</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>BAT</span>
                        <span className="font-semibold">{roleCount.BAT}/3-6</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>AR</span>
                        <span className="font-semibold">{roleCount.AR}/1-3</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>BOW</span>
                        <span className="font-semibold">{roleCount.BOW}/3-6</span>
                      </div>
                    </div>

                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Captain</span>
                        <span className="font-semibold">{captain ? '✓' : '✗'}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Vice-Captain</span>
                        <span className="font-semibold">{viceCaptain ? '✓' : '✗'}</span>
                      </div>
                    </div>

                    <Button 
                      onClick={handleSaveTeam}
                      className="w-full bg-secondary hover:bg-secondary/90 text-black font-bold py-6 h-auto mt-6"
                      disabled={selectedPlayers.length !== 11 || !captain || !viceCaptain}
                    >
                      Save Team
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Rules Card */}
              <Card className="bg-gradient-to-br from-primary to-primary/80 text-white shadow-lg">
                <CardContent className="p-6">
                  <h4 className="font-bold text-lg mb-4">Team Rules</h4>
                  <ul className="space-y-2 text-sm text-white/90">
                    <li>• Select exactly 11 players</li>
                    <li>• 1 Wicketkeeper required</li>
                    <li>• 3-6 Batsmen</li>
                    <li>• 1-3 All-rounders</li>
                    <li>• 3-6 Bowlers</li>
                    <li>• Max 100 credits</li>
                    <li>• Choose Captain (2x pts)</li>
                    <li>• Choose VC (1.5x pts)</li>
                  </ul>
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
