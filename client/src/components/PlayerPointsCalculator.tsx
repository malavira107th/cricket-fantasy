import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calculatePlayerPoints, type PlayerPerformance } from "@/lib/cricketApi";

interface PlayerPointsProps {
  players: Array<{
    id: number;
    name: string;
    role: string;
    team: string;
    isCaptain?: boolean;
    isViceCaptain?: boolean;
  }>;
  matchId: string;
  autoUpdate?: boolean;
}

export default function PlayerPointsCalculator({ 
  players, 
  matchId,
  autoUpdate = true 
}: PlayerPointsProps) {
  const [playerPoints, setPlayerPoints] = useState<Map<number, number>>(new Map());
  const [totalPoints, setTotalPoints] = useState(0);

  // Simulate player performance data
  // In a real app, this would come from the API
  const getPlayerPerformance = (playerId: number): PlayerPerformance => {
    // This is mock data - in production, fetch from API
    const mockPerformances: { [key: number]: PlayerPerformance } = {
      1: { name: "Player 1", runs: 45, balls: 32, fours: 4, sixes: 2, points: 0 },
      2: { name: "Player 2", runs: 78, balls: 54, fours: 8, sixes: 3, points: 0 },
      3: { name: "Player 3", wickets: 2, overs: 4, maidens: 1, points: 0 },
      4: { name: "Player 4", runs: 23, balls: 18, fours: 2, catches: 1, points: 0 },
      5: { name: "Player 5", wickets: 3, overs: 4, maidens: 0, points: 0 },
    };

    return mockPerformances[playerId] || { name: `Player ${playerId}`, points: 0 };
  };

  const calculateAllPoints = () => {
    const pointsMap = new Map<number, number>();
    let total = 0;

    players.forEach(player => {
      const performance = getPlayerPerformance(player.id);
      let basePoints = calculatePlayerPoints(performance);

      // Apply captain/vice-captain multipliers
      if (player.isCaptain) {
        basePoints *= 2; // Captain gets 2x points
      } else if (player.isViceCaptain) {
        basePoints *= 1.5; // Vice-captain gets 1.5x points
      }

      pointsMap.set(player.id, basePoints);
      total += basePoints;
    });

    setPlayerPoints(pointsMap);
    setTotalPoints(total);
  };

  useEffect(() => {
    calculateAllPoints();

    // Auto-update every 30 seconds if enabled
    if (autoUpdate) {
      const interval = setInterval(calculateAllPoints, 30000);
      return () => clearInterval(interval);
    }
  }, [players, matchId, autoUpdate]);

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-white">
        <CardTitle className="flex items-center justify-between">
          <span>Team Points</span>
          <span className="text-2xl font-bold">{totalPoints.toFixed(1)}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-3">
          {players.map(player => {
            const points = playerPoints.get(player.id) || 0;
            return (
              <div 
                key={player.id} 
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900">{player.name}</p>
                      {player.isCaptain && (
                        <span className="bg-yellow-500 text-white text-xs px-2 py-0.5 rounded font-semibold">
                          C (2x)
                        </span>
                      )}
                      {player.isViceCaptain && (
                        <span className="bg-gray-600 text-white text-xs px-2 py-0.5 rounded font-semibold">
                          VC (1.5x)
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600">{player.role} • {player.team}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-primary">{points.toFixed(1)}</p>
                  <p className="text-xs text-gray-600">points</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="mt-6 pt-6 border-t">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900">Total Points</span>
            <span className="text-3xl font-bold text-primary">{totalPoints.toFixed(1)}</span>
          </div>
          <p className="text-xs text-gray-500 text-center mt-2">
            Points update automatically every 30 seconds
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
