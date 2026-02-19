import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { APP_LOGO, APP_TITLE } from "@/const";
import { Link } from "wouter";
import { useState } from "react";

const FAQ_DATA = [
  {
    category: "Getting Started",
    questions: [
      {
        q: "What is SDSURABHI?",
        a: "SDSURABHI is a free cricket simulation game where you can choose your XI based on real cricket matches and compete with other players. It's purely for entertainment - no money involved, no prizes, just fun and bragging rights!"
      },
      {
        q: "Is it really free?",
        a: "Yes, 100% free! There are no entry fees, no hidden charges, no in-app purchases. You can join unlimited contests, create unlimited teams, and play as much as you want without spending a single rupee."
      },
      {
        q: "How do I get started?",
        a: "Simply sign up with your email and choose a username, and you're ready to play! Browse upcoming matches, choose your XI, and join contests. It takes less than 2 minutes to get started."
      },
      {
        q: "Do I need to download an app?",
        a: "No! SDSURABHI works directly in your web browser on any device - desktop, laptop, tablet, or mobile. Just visit our website and start playing."
      }
    ]
  },
  {
    category: "Eligibility",
    questions: [
      {
        q: "Who can play?",
        a: "Anyone who is 18 years or older can play! You must confirm your age during signup. That's it - no other restrictions!"
      },
      {
        q: "Is SDSURABHI available worldwide?",
        a: "Yes! SDSURABHI is available to users worldwide. As long as you're 18+, you can join and start playing from anywhere!"
      },
      {
        q: "Are there any geographic restrictions?",
        a: "No! We're available globally. Just make sure you comply with the laws and regulations in your country."
      },
      {
        q: "What is the purpose of SDSURABHI?",
        a: "SDSURABHI is designed purely for entertainment and fun. It's a skill-based cricket simulation game with no monetary stakes, no prizes, and no gambling involved. Play for the love of cricket!"
      }
    ]
  },
  {
    category: "Creating Teams",
    questions: [
      {
        q: "How do I choose my XI?",
        a: "Select a contest, click 'Create Team', then choose 11 players from both teams playing the match. You must follow team composition rules: 1-4 wicket-keepers, 3-6 batsmen, 1-4 all-rounders, 3-6 bowlers. You can pick minimum 3 and maximum 7 players from any single team."
      },
      {
        q: "What is Captain and Vice-Captain?",
        a: "After selecting 11 players, you must choose one Captain (gets 2x points) and one Vice-Captain (gets 1.5x points). Choose wisely - your captain's performance can make or break your score!"
      },
      {
        q: "Can I create multiple teams for the same match?",
        a: "Yes! You can create as many teams as you want for any contest. Try different strategies and see which works best!"
      },
      {
        q: "Can I edit my team after creating it?",
        a: "Yes, you can edit your team anytime before the match starts. Once the match begins, teams are locked and cannot be changed."
      },
      {
        q: "What if a player doesn't play in the match?",
        a: "If your selected player is not in the playing XI, you won't get the +4 points for 'Playing XI'. However, your team will still be valid. This is why it's important to check team announcements before the match!"
      }
    ]
  },
  {
    category: "Scoring & Points",
    questions: [
      {
        q: "How are points calculated?",
        a: "Points are awarded based on real player performance: Runs (+1 per run), Boundaries (+1), Sixes (+2), Half-century (+8), Century (+16), Wickets (+25), Maiden overs (+12), Catches (+8), Stumpings (+12), Run-outs (+6), and Playing XI (+4). Captain gets 2x points, Vice-Captain gets 1.5x points."
      },
      {
        q: "When are points updated?",
        a: "Points are updated in real-time as the match progresses. You can track your team's performance live during the match!"
      },
      {
        q: "What happens if the match is abandoned or tied?",
        a: "If a match is abandoned, all contests for that match are cancelled. For tied matches or super overs, points are calculated based on actual player performance including the super over."
      },
      {
        q: "Do negative points exist?",
        a: "No, there are no negative points. The worst you can score is 0 points for a player who doesn't perform."
      }
    ]
  },
  {
    category: "Contests & Competition",
    questions: [
      {
        q: "What types of contests are available?",
        a: "We offer contests for all international cricket matches - T20Is, ODIs, and Test matches. All contests are free to join and open to all registered users."
      },
      {
        q: "How many people can join a contest?",
        a: "There's no limit! Thousands of players can join the same contest. The more players, the more competitive and fun it becomes!"
      },
      {
        q: "Can I join multiple contests?",
        a: "Yes! You can join as many contests as you want. Use the same team or create different teams for different contests."
      },
      {
        q: "What do I win?",
        a: "Nothing monetary! This is purely for fun and entertainment. You earn bragging rights, climb the leaderboard, and enjoy the thrill of competition. No cash prizes, no rewards - just pure cricket enjoyment!"
      }
    ]
  },
  {
    category: "Account & Privacy",
    questions: [
      {
        q: "What information do you collect?",
        a: "We only collect basic information: username, email, and password (encrypted). We don't ask for phone numbers, addresses, or any financial information."
      },
      {
        q: "Is my data safe?",
        a: "Yes! We use industry-standard encryption and security practices. Your password is hashed and never stored in plain text. We never share your data with third parties."
      },
      {
        q: "Can I delete my account?",
        a: "Yes, you can request account deletion anytime by contacting our support team. All your data will be permanently removed from our systems."
      },
      {
        q: "Do you send marketing emails?",
        a: "We only send essential emails like match reminders and contest updates. You can opt out of non-essential emails in your profile settings."
      }
    ]
  },
  {
    category: "Technical Issues",
    questions: [
      {
        q: "The website is not loading. What should I do?",
        a: "Try refreshing the page, clearing your browser cache, or using a different browser. If the issue persists, contact our support team."
      },
      {
        q: "I forgot my password. How do I reset it?",
        a: "Click 'Forgot Password' on the login page, enter your email, and we'll send you a password reset link."
      },
      {
        q: "My team is not saving. What's wrong?",
        a: "Make sure you've selected exactly 11 players, chosen a captain and vice-captain, and followed all team composition rules. If the issue continues, try refreshing the page."
      },
      {
        q: "Which browsers are supported?",
        a: "SDSURABHI works on all modern browsers: Chrome, Firefox, Safari, Edge, and Opera. We recommend using the latest version for the best experience."
      }
    ]
  },
  {
    category: "Legal & Entertainment",
    questions: [
      {
        q: "Is this gambling?",
        a: "No! SDSURABHI is NOT gambling. There's no money involved, no entry fees, and no prizes. It's a free skill-based entertainment game purely for fun."
      },
      {
        q: "Is this legal?",
        a: "Yes! SDSURABHI is a legitimate entertainment platform. Since there's no money involved and no prizes, it's 100% legal entertainment worldwide."
      },
      {
        q: "Do I need to pay taxes?",
        a: "No! Since there are no winnings or prizes, there's nothing to tax. It's completely free entertainment."
      },
      {
        q: "Can I play for my company or organization?",
        a: "Yes! Many companies use SDSURABHI for team building and employee engagement. Contact us for group contests."
      }
    ]
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleQuestion = (categoryIndex: number, questionIndex: number) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenIndex(openIndex === key ? null : key);
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
              <Link href="/how-to-play" className="hover:text-secondary transition-colors font-medium">
                How to Play
              </Link>
              <Link href="/faq" className="hover:text-secondary transition-colors font-medium text-secondary">
                FAQ
              </Link>
            </nav>

            <div className="flex items-center gap-3">
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
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
        <div className="container text-center">
          <h1 className="text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Find answers to common questions about SDSURABHI
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-16">
        <div className="container max-w-4xl">
          {/* Quick Links */}
          <Card className="bg-white shadow-md mb-12">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {FAQ_DATA.map((category, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      const element = document.getElementById(`category-${idx}`);
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-left p-3 rounded-lg hover:bg-primary/10 transition-colors"
                  >
                    <span className="text-sm font-semibold text-primary hover:underline">
                      {category.category}
                    </span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* FAQ Sections */}
          {FAQ_DATA.map((category, categoryIdx) => (
            <div key={categoryIdx} id={`category-${categoryIdx}`} className="mb-12">
              <h2 className="text-3xl font-bold text-primary mb-6">{category.category}</h2>
              <div className="space-y-4">
                {category.questions.map((item, questionIdx) => (
                  <Card
                    key={questionIdx}
                    className="bg-white shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => toggleQuestion(categoryIdx, questionIdx)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 flex-1">
                          {item.q}
                        </h3>
                        <span className="text-2xl text-primary ml-4">
                          {openIndex === `${categoryIdx}-${questionIdx}` ? '−' : '+'}
                        </span>
                      </div>
                      {openIndex === `${categoryIdx}-${questionIdx}` && (
                        <p className="text-gray-700 mt-4 leading-relaxed">
                          {item.a}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}

          {/* Contact Section */}
          <Card className="bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg mt-12">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-3">Still have questions?</h3>
              <p className="mb-6">
                Can't find the answer you're looking for? Our support team is here to help!
              </p>
              <Link href="/contact">
                <Button className="bg-secondary text-black hover:bg-secondary/90 font-semibold">
                  Contact Support →
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
