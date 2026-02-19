import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_LOGO, APP_TITLE } from "@/const";
import { Link, useLocation, useParams } from "wouter";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// Players will be fetched from API - no mock data
const SAMPLE_PLAYERS: any[] = [];

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

  const handleAddPlayer = (player: Player) => {
    if (!canAddPlayer(player)) {
      toast.error("Cannot add this player. Check role limits and available credits.");
      return;
    }
    setSelectedPlayers([...selectedPlayers, player]);
    toast.success(`${player.name} added to your team`);
  };

  const handleRemovePlayer = (playerId: number) => {
    setSelectedPlayers(selectedPlayers.filter(p => p.id !== playerId));
    if (captain === playerId) setCaptain(null);
    if (viceCaptain === playerId) setViceCaptain(null);
    toast.success("Player removed from team");
  };

  const handleSetCaptain = (playerId: number) => {
    if (viceCaptain === playerId) {
      setViceCaptain(null);
    }
    setCaptain(playerId);
  };

  const handleSetViceCaptain = (playerId: number) => {
    if (captain === playerId) {
      setCaptain(null);
    }
    setViceCaptain(playerId);
  };

  const handleSubmitTeam = () => {
    if (selectedPlayers.length !== 11) {
      toast.error("Please select exactly 11 players");
      return;
    }
    if (!captain) {
      toast.error("Please select a captain");
      return;
    }
    if (!viceCaptain) {
      toast.error("Please select a vice-captain");
      return;
    }
    
    // Save team and proceed
    const teamData = {
      contestId,
      players: selectedPlayers,
      captain,
      viceCaptain,
      credits: creditsUsed
    };
    
    localStorage.setItem('currentTeam', JSON.stringify(teamData));
    toast.success("Team submitted successfully!");
    setLocation(`/contest/${contestId}/preview`);
  };

  const filteredPlayers = filter === "ALL" 
    ? SAMPLE_PLAYERS 
    : SAMPLE_PLAYERS.filter(p => p.role === filter);

  const availablePlayers = filteredPlayers.filter(
    p => !selectedPlayers.find(sp => sp.id === p.id)
  );

  if (!isLoggedIn) return null;

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
            <Link href="/contests">
              <button className="text-white hover:text-secondary transition-colors">
                ← Back to Contests
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8">
        <div className="container">
          <h1 className="text-4xl font-bold text-primary mb-8">Choose Your XI</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Available Players */}
            <div className="lg:col-span-2">
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle>Available Players</CardTitle>
                  <div className="flex gap-2 mt-4">
                    {['ALL', 'WK', 'BAT', 'AR', 'BOW'].map(role => (
                      <button
                        key={role}
                        onClick={() => setFilter(role)}
                        className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                          filter === role
                            ? 'bg-primary text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {availablePlayers.length > 0 ? (
                      availablePlayers.map(player => (
                        <div
                          key={player.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div>
                            <p className="font-semibold text-gray-900">{player.name}</p>
                            <p className="text-sm text-gray-600">
                              {player.role} • {player.team} • {player.credits} credits
                            </p>
                          </div>
                          <button
                            onClick={() => handleAddPlayer(player)}
                            disabled={!canAddPlayer(player)}
                            className="px-3 py-1 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:bg-gray-300 transition-colors"
                          >
                            Add
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-500 py-8">
                        No players available for this role
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Selected Team Summary */}
            <div>
              <Card className="bg-white shadow-lg sticky top-8">
                <CardHeader>
                  <CardTitle>Your XI</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Credits */}
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Credits Used</p>
                    <p className="text-2xl font-bold text-primary">{creditsUsed}/100</p>
                    <p className="text-sm text-gray-600">Remaining: {creditsLeft}</p>
                  </div>

                  {/* Selected Players */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Players: {selectedPlayers.length}/11
                    </h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {selectedPlayers.map(player => (
                        <div
                          key={player.id}
                          className="p-2 bg-gray-50 rounded-lg text-sm"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold">{player.name}</span>
                            <button
                              onClick={() => handleRemovePlayer(player.id)}
                              className="text-red-600 hover:text-red-800 font-semibold"
                            >
                              ✕
                            </button>
                          </div>
                          <div className="flex gap-2 mt-1">
                            <button
                              onClick={() => handleSetCaptain(player.id)}
                              className={`text-xs px-2 py-1 rounded ${
                                captain === player.id
                                  ? 'bg-yellow-500 text-white'
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              }`}
                            >
                              C
                            </button>
                            <button
                              onClick={() => handleSetViceCaptain(player.id)}
                              className={`text-xs px-2 py-1 rounded ${
                                viceCaptain === player.id
                                  ? 'bg-orange-500 text-white'
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              }`}
                            >
                              VC
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmitTeam}
                    disabled={selectedPlayers.length !== 11 || !captain || !viceCaptain}
                    className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 disabled:bg-gray-300 transition-colors"
                  >
                    Submit Team
                  </button>
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
