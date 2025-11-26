// Cricket Data API Service
// API Documentation: https://cricketdata.org/

const API_KEY = 'd6ad9cdb-9b53-4b26-923a-040a2d349d61';
const BASE_URL = 'https://api.cricapi.com/v1';

export interface Match {
  id: string;
  name: string;
  matchType: string;
  status: string;
  venue: string;
  date: string;
  dateTimeGMT: string;
  teams: string[];
  teamInfo?: Array<{
    name: string;
    shortname: string;
    img: string;
  }>;
  score?: Array<{
    r: number;
    w: number;
    o: number;
    inning: string;
  }>;
  scoreOld?: Array<{
    r: number;
    w: number;
    o: number;
    inning: string;
  }>;
  series_id: string;
  fantasyEnabled: boolean;
  matchStarted?: boolean;
  matchEnded?: boolean;
}

export interface ApiResponse<T> {
  data: T;
  status: string;
  info: {
    hitsToday: number;
    hitsUsed: number;
    hitsLimit: number;
    credits: number;
    server: number;
    offsetRows: number;
    totalRows: number;
    queryTime: number;
  };
}

// Fetch current/live matches
export async function getCurrentMatches(): Promise<Match[]> {
  try {
    const response = await fetch(`${BASE_URL}/currentMatches?apikey=${API_KEY}&offset=0`);
    const data: ApiResponse<Match[]> = await response.json();
    
    if (data.status === 'success') {
      return data.data || [];
    }
    return [];
  } catch (error) {
    console.error('Error fetching current matches:', error);
    return [];
  }
}

// Fetch all matches
export async function getAllMatches(): Promise<Match[]> {
  try {
    const response = await fetch(`${BASE_URL}/matches?apikey=${API_KEY}&offset=0`);
    const data: ApiResponse<Match[]> = await response.json();
    
    if (data.status === 'success') {
      return data.data || [];
    }
    return [];
  } catch (error) {
    console.error('Error fetching all matches:', error);
    return [];
  }
}

// Fetch match details by ID
export async function getMatchInfo(matchId: string): Promise<Match | null> {
  try {
    const response = await fetch(`${BASE_URL}/match_info?apikey=${API_KEY}&id=${matchId}`);
    const data: ApiResponse<Match> = await response.json();
    
    if (data.status === 'success') {
      return data.data;
    }
    return null;
  } catch (error) {
    console.error('Error fetching match info:', error);
    return null;
  }
}

// Calculate time until match starts
export function getTimeUntilMatch(dateTimeGMT: string): string {
  const matchTime = new Date(dateTimeGMT).getTime();
  const now = new Date().getTime();
  const diff = matchTime - now;

  if (diff < 0) {
    return 'Live';
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 24) {
    const days = Math.floor(hours / 24);
    return `${days}d ${hours % 24}h`;
  }

  return `${hours}h ${minutes}m`;
}

// Get team color based on team name
export function getTeamColor(teamName: string): string {
  const colorMap: { [key: string]: string } = {
    'India': 'bg-orange-500',
    'Australia': 'bg-yellow-500',
    'England': 'bg-red-600',
    'Pakistan': 'bg-green-700',
    'South Africa': 'bg-green-600',
    'New Zealand': 'bg-black',
    'West Indies': 'bg-blue-700',
    'Sri Lanka': 'bg-yellow-600',
    'Bangladesh': 'bg-green-600',
    'Afghanistan': 'bg-blue-800',
    // Indian domestic teams
    'Mumbai': 'bg-blue-600',
    'Delhi': 'bg-red-500',
    'Karnataka': 'bg-red-700',
    'Tamil Nadu': 'bg-yellow-600',
    'Maharashtra': 'bg-orange-600',
    'Gujarat': 'bg-blue-500',
    'Rajasthan': 'bg-pink-600',
    'Punjab': 'bg-red-600',
    'Haryana': 'bg-blue-700',
    'Kerala': 'bg-green-700',
    'Bengal': 'bg-purple-600',
    'Hyderabad': 'bg-orange-500',
    'Uttar Pradesh': 'bg-blue-600',
    'Madhya Pradesh': 'bg-orange-700',
  };

  // Check if team name contains any of the keys
  for (const [key, color] of Object.entries(colorMap)) {
    if (teamName.includes(key)) {
      return color;
    }
  }

  // Default colors
  return 'bg-gray-600';
}

// Format match name to get team codes
export function getTeamCodes(match: Match): { team1: string; team2: string } {
  if (match.teamInfo && match.teamInfo.length >= 2) {
    return {
      team1: match.teamInfo[0].shortname,
      team2: match.teamInfo[1].shortname
    };
  }

  // Fallback: extract from match name
  const teams = match.teams;
  return {
    team1: teams[0]?.substring(0, 3).toUpperCase() || 'T1',
    team2: teams[1]?.substring(0, 3).toUpperCase() || 'T2'
  };
}

// Get match status display
export function getMatchStatus(match: Match): string {
  if (match.matchEnded) {
    return match.status;
  }
  if (match.matchStarted) {
    return 'Live';
  }
  return getTimeUntilMatch(match.dateTimeGMT);
}

// Live score interface
export interface LiveScore {
  matchId: string;
  score: Array<{
    r: number;  // runs
    w: number;  // wickets
    o: number;  // overs
    inning: string;
  }>;
  status: string;
  matchStarted: boolean;
  matchEnded: boolean;
}

// Player performance interface
export interface PlayerPerformance {
  name: string;
  runs?: number;
  balls?: number;
  fours?: number;
  sixes?: number;
  wickets?: number;
  overs?: number;
  maidens?: number;
  catches?: number;
  stumpings?: number;
  runOuts?: number;
  points: number;
}

// Fetch live match score
export async function getLiveScore(matchId: string): Promise<LiveScore | null> {
  try {
    const response = await fetch(`${BASE_URL}/match_info?apikey=${API_KEY}&id=${matchId}`);
    const data: ApiResponse<Match> = await response.json();
    
    if (data.status === 'success' && data.data) {
      return {
        matchId: data.data.id,
        score: data.data.score || [],
        status: data.data.status,
        matchStarted: data.data.matchStarted || false,
        matchEnded: data.data.matchEnded || false
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching live score:', error);
    return null;
  }
}

// Calculate fantasy points for a player
export function calculatePlayerPoints(player: PlayerPerformance): number {
  let points = 0;

  // Batting points
  if (player.runs !== undefined) {
    points += player.runs; // 1 point per run
    
    // Boundary bonus
    if (player.fours) points += player.fours; // +1 for each four
    if (player.sixes) points += player.sixes * 2; // +2 for each six
    
    // Milestone bonus
    if (player.runs >= 50 && player.runs < 100) points += 8; // Half-century
    if (player.runs >= 100) points += 16; // Century
    
    // Duck penalty
    if (player.runs === 0 && player.balls && player.balls > 0) points -= 2;
  }

  // Bowling points
  if (player.wickets !== undefined) {
    points += player.wickets * 25; // 25 points per wicket
    
    // Milestone bonus
    if (player.wickets >= 3 && player.wickets < 5) points += 4; // 3 wickets
    if (player.wickets >= 5) points += 8; // 5 wickets
  }
  
  if (player.maidens) points += player.maidens * 12; // 12 points per maiden

  // Fielding points
  if (player.catches) points += player.catches * 8; // 8 points per catch
  if (player.stumpings) points += player.stumpings * 12; // 12 points per stumping
  if (player.runOuts) points += player.runOuts * 12; // 12 points per run out

  return points;
}

// Check if match is live
export function isMatchLive(match: Match): boolean {
  return match.matchStarted === true && match.matchEnded === false;
}

// Format score display
export function formatScore(score: { r: number; w: number; o: number }): string {
  return `${score.r}/${score.w} (${score.o})`;
}
