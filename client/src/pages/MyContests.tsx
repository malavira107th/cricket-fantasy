import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { APP_LOGO, APP_TITLE } from "@/const";
import { Link, useLocation } from "wouter";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

export default function MyContests() {
  const [, setLocation] = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [myTeams, setMyTeams] = useState<any[]>([]);

  useEffect(() => {
    const userSession = localStorage.getItem('userSession');
    if (!userSession) {
      setLocation('/login');
      return;
    }
    setIsLoggedIn(true);

    // Load teams from localStorage
    const savedTeams = JSON.parse(localStorage.getItem('myTeams') || '[]');
    setMyTeams(savedTeams);
  }, [setLocation]);

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
                <span className="text-white">SDSURABHI</span>
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
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Contests</h1>
            <p className="text-gray-600">Track all your joined contests and performance</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-6 border-b">
            <button className="px-4 py-2 font-semibold text-primary border-b-2 border-primary">
              Active ({myTeams.length})
            </button>
            <button className="px-4 py-2 font-semibold text-gray-600 hover:text-gray-900">
              Completed (0)
            </button>
          </div>

          {myTeams.length === 0 ? (
            <Card className="bg-white shadow-lg">
              <CardContent className="p-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="text-6xl mb-4">🏆</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">No Contests Joined</h3>
                  <p className="text-gray-600 mb-6">
                    You haven't joined any contests yet. Browse available contests and join now!
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
            <div className="space-y-4">
              {myTeams.map((team, index) => (
                <Card key={index} className="bg-white shadow-md hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                          Contest #{team.contestId}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          Joined on {new Date(team.createdAt).toLocaleDateString()}
                        </p>
                        
                        <div className="flex gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600">Teams:</span>
                            <span className="font-semibold text-primary">1</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600">Status:</span>
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
                              Active
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600">Rank:</span>
                            <span className="font-semibold text-gray-900">-</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Link href={`/contest/${team.contestId}`}>
                          <Button variant="outline">
                            View Contest
                          </Button>
                        </Link>
                        <Link href="/my-teams">
                          <Button className="bg-primary hover:bg-primary/90">
                            View Team
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
