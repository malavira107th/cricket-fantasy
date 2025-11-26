import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLiveScore, formatScore, type LiveScore as LiveScoreType } from "@/lib/cricketApi";

interface LiveScoreProps {
  matchId: string;
  team1Name: string;
  team2Name: string;
  autoRefresh?: boolean;
  refreshInterval?: number; // in milliseconds
}

export default function LiveScore({ 
  matchId, 
  team1Name, 
  team2Name,
  autoRefresh = true,
  refreshInterval = 30000 // 30 seconds default
}: LiveScoreProps) {
  const [liveScore, setLiveScore] = useState<LiveScoreType | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchLiveScore = async () => {
    const score = await getLiveScore(matchId);
    setLiveScore(score);
    setLoading(false);
    setLastUpdated(new Date());
  };

  useEffect(() => {
    // Initial fetch
    fetchLiveScore();

    // Set up auto-refresh if enabled and match is live
    if (autoRefresh && liveScore?.matchStarted && !liveScore?.matchEnded) {
      const interval = setInterval(fetchLiveScore, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [matchId, autoRefresh, refreshInterval, liveScore?.matchStarted, liveScore?.matchEnded]);

  if (loading) {
    return (
      <Card className="bg-white shadow-lg">
        <CardContent className="p-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-sm text-gray-600 mt-2">Loading live score...</p>
        </CardContent>
      </Card>
    );
  }

  if (!liveScore) {
    return (
      <Card className="bg-white shadow-lg">
        <CardContent className="p-6 text-center">
          <p className="text-gray-600">Live score not available</p>
        </CardContent>
      </Card>
    );
  }

  const isLive = liveScore.matchStarted && !liveScore.matchEnded;
  const isCompleted = liveScore.matchEnded;

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader className={`${isLive ? 'bg-red-600' : isCompleted ? 'bg-green-600' : 'bg-gray-600'} text-white`}>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">
            {isLive && (
              <span className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                </span>
                LIVE
              </span>
            )}
            {isCompleted && "Match Completed"}
            {!isLive && !isCompleted && "Upcoming"}
          </CardTitle>
          <span className="text-xs">
            Updated: {lastUpdated.toLocaleTimeString()}
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {liveScore.score && liveScore.score.length > 0 ? (
          <div className="space-y-4">
            {liveScore.score.map((inning, index) => {
              const teamName = index === 0 ? team1Name : team2Name;
              return (
                <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                  <div>
                    <p className="font-semibold text-gray-900">{teamName}</p>
                    <p className="text-xs text-gray-600">{inning.inning}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">
                      {formatScore(inning)}
                    </p>
                  </div>
                </div>
              );
            })}
            
            {/* Match Status */}
            <div className="text-center pt-4 border-t">
              <p className="text-sm font-medium text-gray-700">{liveScore.status}</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">
              {!liveScore.matchStarted ? "Match hasn't started yet" : "No score data available"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
