import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LeaderboardEntry {
  rank: number;
  username: string;
  teamName: string;
  points: number;
  isCurrentUser?: boolean;
}

interface LiveLeaderboardProps {
  contestId: string;
  autoRefresh?: boolean;
  refreshInterval?: number;
  currentUsername?: string;
}

export default function LiveLeaderboard({
  contestId,
  autoRefresh = true,
  refreshInterval = 30000,
  currentUsername
}: LiveLeaderboardProps) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchLeaderboard = async () => {
    // In a real app, this would fetch from API
    // For now, generate mock data with some randomness to simulate live updates
    const mockData: LeaderboardEntry[] = [
      { rank: 1, username: "CricketPro99", teamName: "Dream Team", points: 487.5 + Math.random() * 20 },
      { rank: 2, username: "MasterBlaster", teamName: "Winners XI", points: 465.0 + Math.random() * 20 },
      { rank: 3, username: "SpinWizard", teamName: "Spin Masters", points: 442.5 + Math.random() * 20 },
      { rank: 4, username: "BoundaryKing", teamName: "Sixes Squad", points: 428.0 + Math.random() * 20 },
      { rank: 5, username: "FastBowler", teamName: "Pace Attack", points: 415.5 + Math.random() * 20 },
      { rank: 6, username: "AllRounder", teamName: "Balanced XI", points: 398.0 + Math.random() * 20 },
      { rank: 7, username: "FieldingChamp", teamName: "Catchers", points: 385.5 + Math.random() * 20 },
      { rank: 8, username: "PowerHitter", teamName: "Big Hitters", points: 372.0 + Math.random() * 20 },
      { rank: 9, username: "TacticalGenius", teamName: "Strategy XI", points: 358.5 + Math.random() * 20 },
      { rank: 10, username: "LuckyPlayer", teamName: "Fortune Team", points: 345.0 + Math.random() * 20 },
    ];

    // Mark current user if logged in
    if (currentUsername) {
      mockData.forEach(entry => {
        if (entry.username === currentUsername) {
          entry.isCurrentUser = true;
        }
      });
    }

    // Sort by points descending
    mockData.sort((a, b) => b.points - a.points);
    
    // Update ranks
    mockData.forEach((entry, index) => {
      entry.rank = index + 1;
    });

    setLeaderboard(mockData);
    setLoading(false);
    setLastUpdated(new Date());
  };

  useEffect(() => {
    fetchLeaderboard();

    if (autoRefresh) {
      const interval = setInterval(fetchLeaderboard, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [contestId, autoRefresh, refreshInterval]);

  if (loading) {
    return (
      <Card className="bg-white shadow-lg">
        <CardContent className="p-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-sm text-gray-600 mt-2">Loading leaderboard...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="flex items-center justify-between">
          <CardTitle>Live Leaderboard</CardTitle>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span className="text-xs">Live</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Team
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Points
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {leaderboard.map((entry) => (
                <tr 
                  key={entry.rank}
                  className={`
                    ${entry.isCurrentUser ? 'bg-blue-50 border-l-4 border-l-primary' : 'hover:bg-gray-50'}
                    transition-colors
                  `}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {entry.rank <= 3 ? (
                        <span className={`
                          inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-white
                          ${entry.rank === 1 ? 'bg-yellow-500' : ''}
                          ${entry.rank === 2 ? 'bg-gray-400' : ''}
                          ${entry.rank === 3 ? 'bg-orange-600' : ''}
                        `}>
                          {entry.rank}
                        </span>
                      ) : (
                        <span className="text-gray-700 font-semibold">{entry.rank}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">{entry.username}</span>
                      {entry.isCurrentUser && (
                        <span className="bg-primary text-white text-xs px-2 py-0.5 rounded">You</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-700">{entry.teamName}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className="text-lg font-bold text-primary">{entry.points.toFixed(1)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 bg-gray-50 border-t text-center">
          <p className="text-xs text-gray-600">
            Last updated: {lastUpdated.toLocaleTimeString()} • Auto-refreshes every 30 seconds
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
