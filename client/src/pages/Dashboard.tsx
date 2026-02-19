import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_LOGO, APP_TITLE } from "@/const";
import { Link, useLocation } from "wouter";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userSession = localStorage.getItem('userSession');
    if (!userSession) {
      toast.error("Please login to access dashboard");
      setLocation('/login');
      return;
    }
    setUser(JSON.parse(userSession));
  }, [setLocation]);

  const handleLogout = () => {
    localStorage.removeItem('userSession');
    toast.success("Logged out successfully");
    setLocation('/');
  };

  if (!user) return null;

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

            <nav className="hidden md:flex items-center gap-6">
              <Link href="/dashboard" className="hover:text-secondary transition-colors font-medium">
                Dashboard
              </Link>
              <Link href="/contests" className="hover:text-secondary transition-colors font-medium">
                Contests
              </Link>
              <Link href="/my-teams" className="hover:text-secondary transition-colors font-medium">
                My Teams
              </Link>
              <Link href="/leaderboard" className="hover:text-secondary transition-colors font-medium">
                Leaderboard
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <span className="text-sm hidden sm:block">Hi, {user.username}!</span>
              <Button onClick={handleLogout} className="bg-secondary text-black hover:bg-secondary/90 font-semibold">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8">
        <div className="container">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-primary mb-2">Welcome back, {user.username}!</h1>
            <p className="text-gray-600">Ready to test your cricket knowledge? Join a contest and choose your XI!</p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">Contests Joined</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">0</p>
                <p className="text-xs text-gray-500 mt-1">Start joining contests!</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">Teams Created</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">0</p>
                <p className="text-xs text-gray-500 mt-1">Build your first team</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">Leaderboard Rank</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">-</p>
                <p className="text-xs text-gray-500 mt-1">Join contests to rank</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">Total Points</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">0</p>
                <p className="text-xs text-gray-500 mt-1">Earn points by playing</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-primary to-primary/80 text-white shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2">Join Live Contests</h3>
                <p className="mb-4 text-white/90">Browse upcoming cricket matches and join contests to compete with other players!</p>
                <Link href="/contests">
                  <Button className="bg-secondary text-black hover:bg-secondary/90 font-semibold">
                    View All Contests →
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-secondary to-secondary/80 text-black shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2">Create Your Team</h3>
                <p className="mb-4">Use your cricket knowledge to build the perfect team and compete for glory!</p>
                <Link href="/contests">
                  <Button className="bg-primary text-white hover:bg-primary/90 font-semibold">
                    Build Team →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">No Activity Yet</h3>
                <p className="text-gray-500 mb-4">Join your first contest to start your cricket journey!</p>
                <Link href="/contests">
                  <Button className="bg-primary text-white hover:bg-primary/90">
                    Explore Contests
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
