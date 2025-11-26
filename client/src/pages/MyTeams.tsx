import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_LOGO, APP_TITLE } from "@/const";
import { Link, useLocation } from "wouter";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

interface SavedTeam {
  contestId: string;
  players: Array<{
    id: number;
    name: string;
    role: string;
    team: string;
    credits: number;
    points: number;
  }>;
  captain: number;
  viceCaptain: number;
  createdAt: string;
}

export default function MyTeams() {
  const [, setLocation] = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [teams, setTeams] = useState<SavedTeam[]>([]);

  useEffect(() => {
    const userSession = localStorage.getItem('userSession');
    if (!userSession) {
      setLocation('/login');
      return;
    }
    setIsLoggedIn(true);

    // Load teams from localStorage
    const savedTeams = JSON.parse(localStorage.getItem('myTeams') || '[]');
    setTeams(savedTeams);
  }, [setLocation]);

  const handleDeleteTeam = (index: number) => {
    const updatedTeams = teams.filter((_, i) => i !== index);
    setTeams(updatedTeams);
    localStorage.setItem('myTeams', JSON.stringify(updatedTeams));
  };

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
              <Button 
                onClick={() => {
                  localStorage.removeItem('userSession');
                  setLocation('/');
                }}
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8 flex-1">
        <div className="container max-w-6xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Teams</h1>
            <p className="text-gray-600">View and manage all your created teams</p>
          </div>

          {teams.length === 0 ? (
            <Card className="bg-white shadow-lg">
              <CardContent className="p-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="text-6xl mb-4">🏏</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">No Teams Yet</h3>
                  <p className="text-gray-600 mb-6">
                    You haven't created any teams yet. Join a contest and create your first team!
                  </p>
                  <Link href="/contests">
                    <Button className="bg-secondary hover:bg-secondary/90 text-black font-bold">
                      Browse Contests
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {teams.map((team, index) => {
                const captainPlayer = team.players.find(p => p.id === team.captain);
                const vcPlayer = team.players.find(p => p.id === team.viceCaptain);
                const totalCredits = team.players.reduce((sum, p) => sum + p.credits, 0);
                
                const roleCount = {
                  WK: team.players.filter(p => p.role === 'WK').length,
                  BAT: team.players.filter(p => p.role === 'BAT').length,
                  AR: team.players.filter(p => p.role === 'AR').length,
                  BOW: team.players.filter(p => p.role === 'BOW').length,
                };

                return (
                  <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-all">
                    <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-white">
                      <CardTitle className="flex items-center justify-between">
                        <span>Team #{index + 1}</span>
                        <span className="text-sm font-normal">
                          {new Date(team.createdAt).toLocaleDateString()}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      {/* Team Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs text-gray-600 mb-1">Captain</p>
                          <p className="font-semibold text-gray-900">{captainPlayer?.name}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs text-gray-600 mb-1">Vice-Captain</p>
                          <p className="font-semibold text-gray-900">{vcPlayer?.name}</p>
                        </div>
                      </div>

                      {/* Role Distribution */}
                      <div className="mb-6">
                        <p className="text-sm font-semibold text-gray-700 mb-2">Team Composition</p>
                        <div className="flex gap-2 text-sm">
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded">WK: {roleCount.WK}</span>
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded">BAT: {roleCount.BAT}</span>
                          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded">AR: {roleCount.AR}</span>
                          <span className="bg-red-100 text-red-800 px-3 py-1 rounded">BOW: {roleCount.BOW}</span>
                        </div>
                      </div>

                      {/* Players List */}
                      <div className="mb-6">
                        <p className="text-sm font-semibold text-gray-700 mb-2">Players ({team.players.length})</p>
                        <div className="space-y-1 max-h-48 overflow-y-auto">
                          {team.players.map(player => (
                            <div key={player.id} className="flex items-center justify-between text-sm py-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-gray-900">{player.name}</span>
                                {player.id === team.captain && (
                                  <span className="bg-yellow-500 text-white text-xs px-1.5 py-0.5 rounded">C</span>
                                )}
                                {player.id === team.viceCaptain && (
                                  <span className="bg-gray-600 text-white text-xs px-1.5 py-0.5 rounded">VC</span>
                                )}
                              </div>
                              <span className="text-gray-600">{player.role}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Credits Used */}
                      <div className="bg-gray-50 rounded-lg p-3 mb-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Credits Used</span>
                          <span className="font-bold text-primary">{totalCredits.toFixed(1)} / 100</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3">
                        <Link href={`/contest/${team.contestId}`} className="flex-1">
                          <Button variant="outline" className="w-full">
                            View Contest
                          </Button>
                        </Link>
                        <Button 
                          variant="destructive" 
                          onClick={() => handleDeleteTeam(index)}
                          className="flex-1"
                        >
                          Delete Team
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
