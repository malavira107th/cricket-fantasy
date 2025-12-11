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
        q: "What is Sports IQ Play?",
        a: "Sports IQ Play is a free-to-play cricket fantasy platform where you can create virtual teams based on real cricket matches and compete with other players. It's purely for entertainment - no money involved, no prizes, just fun and bragging rights!"
      },
      {
        q: "Is it really free?",
        a: "Yes, 100% free! There are no entry fees, no hidden charges, no in-app purchases. You can join unlimited contests, create unlimited teams, and play as much as you want without spending a single rupee."
      },
      {
        q: "How do I get started?",
        a: "Simply sign up with your email, choose a username, select your state, and you're ready to play! Browse upcoming matches, create your team, and join contests. It takes less than 2 minutes to get started."
      },
      {
        q: "Do I need to download an app?",
        a: "No! Sports IQ Play works directly in your web browser on any device - desktop, laptop, tablet, or mobile. Just visit our website and start playing."
      }
    ]
  },
  {
    category: "Eligibility & Restrictions",
    questions: [
      {
        q: "Who can play?",
        a: "Anyone who is 18 years or older and resides in India (except restricted states) can play. You must confirm your age during signup."
      },
      {
        q: "Which states are restricted?",
        a: "Sports IQ Play is NOT available in: Andhra Pradesh, Assam, Nagaland, Odisha, Sikkim, and Telangana. Users from these states cannot register or participate."
      },
      {
        q: "Why are some states restricted?",
        a: "Even though our platform is free and offers no prizes, we follow responsible gaming practices and comply with state-specific regulations regarding fantasy sports platforms."
      },
      {
        q: "Can I play if I'm traveling to a restricted state?",
        a: "Our platform checks your registered state. If you registered from an allowed state, you can continue playing. However, we recommend following local regulations."
      }
    ]
  },
  {
    category: "Creating Teams",
    questions: [
      {
        q: "How do I create a team?",
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
        a: "We only collect basic information: username, email, password (encrypted), and state (for geo-restriction verification). We don't ask for phone numbers, addresses, or any financial information."
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
        a: "Sports IQ Play works on all modern browsers: Chrome, Firefox, Safari, Edge, and Opera. We recommend using the latest version for the best experience."
      }
    ]
  },
  {
    category: "Legal & Compliance",
    questions: [
      {
        q: "Is this gambling?",
        a: "No! Sports IQ Play is NOT gambling. There's no money involved, no entry fees, and no prizes. It's a free skill-based game purely for entertainment."
      },
      {
        q: "Is fantasy cricket legal in India?",
        a: "Yes! Fantasy sports based on skill are legal in India. Since our platform is free with no prizes, it's 100% legal entertainment."
      },
      {
        q: "Do I need to pay taxes?",
        a: "No! Since there are no winnings or prizes, there's nothing to tax. It's completely free entertainment."
      },
      {
        q: "Can I play for my company or organization?",
        a: "Yes! Many companies use Sports IQ Play for team building and employee engagement. Contact us for group contests."
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
                <span className="text-white">Sports IQ </span>
                <span className="text-secondary">Play</span>
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
            Find answers to common questions about Sports IQ Play
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-16">
        <div className="container max-w-4xl">
          {/* Quick Links */}
          <Card className="bg-white shadow-md mb-12">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-primary mb-4">Quick Navigation</h3>
              <div className="grid md:grid-cols-4 gap-3">
                {FAQ_DATA.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      const element = document.getElementById(`category-${index}`);
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-sm bg-gray-100 hover:bg-primary hover:text-white transition-colors rounded-lg px-4 py-2 text-left"
                  >
                    {category.category}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* FAQ Categories */}
          <div className="space-y-12">
            {FAQ_DATA.map((category, categoryIndex) => (
              <div key={categoryIndex} id={`category-${categoryIndex}`}>
                <h2 className="text-3xl font-bold text-primary mb-6 border-b-4 border-secondary pb-2">
                  {category.category}
                </h2>
                <div className="space-y-4">
                  {category.questions.map((item, questionIndex) => {
                    const key = `${categoryIndex}-${questionIndex}`;
                    const isOpen = openIndex === key;
                    
                    return (
                      <Card key={questionIndex} className="bg-white shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="p-0">
                          <button
                            onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                            className="w-full text-left p-6 flex items-start justify-between gap-4"
                          >
                            <span className="font-semibold text-gray-900 text-lg flex-1">
                              {item.q}
                            </span>
                            <span className="text-2xl text-primary flex-shrink-0">
                              {isOpen ? '−' : '+'}
                            </span>
                          </button>
                          {isOpen && (
                            <div className="px-6 pb-6">
                              <p className="text-gray-700 leading-relaxed">
                                {item.a}
                              </p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Still Have Questions */}
          <div className="mt-16 text-center bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl p-12">
            <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-lg mb-6 text-white/90">
              Can't find what you're looking for? Our support team is here to help!
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-secondary text-black hover:bg-secondary/90 text-lg px-10 py-6 h-auto font-bold">
                Contact Support →
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white py-12 mt-auto">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-lg mb-4">About</h4>
              <ul className="space-y-3 text-sm text-white/80">
                <li><Link href="/about" className="hover:text-secondary transition-colors">About Us</Link></li>
                <li><Link href="/how-to-play" className="hover:text-secondary transition-colors">How It Works</Link></li>
                <li><Link href="/contact" className="hover:text-secondary transition-colors">Contact Us</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Legal</h4>
              <ul className="space-y-3 text-sm text-white/80">
                <li><Link href="/terms" className="hover:text-secondary transition-colors">Terms & Conditions</Link></li>
                <li><Link href="/privacy" className="hover:text-secondary transition-colors">Privacy Policy</Link></li>
                <li><Link href="/responsible-gaming" className="hover:text-secondary transition-colors">Responsible Gaming</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Support</h4>
              <ul className="space-y-3 text-sm text-white/80">
                <li><Link href="/faq" className="hover:text-secondary transition-colors">FAQ</Link></li>
                <li><Link href="/contact" className="hover:text-secondary transition-colors">Contact Support</Link></li>
                <li><Link href="/signup" className="hover:text-secondary transition-colors">Sign Up</Link></li>
                <li><Link href="/login" className="hover:text-secondary transition-colors">Login</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Company</h4>
              <div className="text-sm text-white/80 space-y-2">
                <img src="/logo.png" alt="Sports IQ Play" className="h-16 w-auto mb-3" />
                <p className="font-semibold text-white">SDSURABHI INFRA PRIVATE LIMITED</p>
                <p className="text-white/60 text-xs">Trading As: Sports IQ Play</p>
                <p className="text-white/60 text-xs">Trading As: Sports IQ Play</p>
                <p className="text-secondary">Test Your Cricket IQ</p>
                <p className="mt-3">48/2, Bijnour, Ayodhya Puri 2, Lucknow, Uttar Pradesh 226008, India</p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-6 pb-4">
            <p className="text-sm text-white/70 leading-relaxed">
          {/* Authorized Advertising Partner */}
          <div className="border-t border-white/20 pt-6 pb-4">
            <p className="text-sm text-white/70">
              <span className="font-semibold text-white">Operated by:</span> <a href="https://sdsurabhi.in/" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">SDSURABHI INFRA PRIVATE LIMITED</a>
            </p>
            <p className="text-xs text-white/60 mt-1">
              CIN: U41002UP2023PTC194590 | GST: 09ABMCS3759A1Z4
            </p>
          </div>


              <span className="font-semibold text-white">Legal Disclaimer:</span> This platform is NOT available in Andhra Pradesh, Assam, Odisha, Telangana, Nagaland, and Sikkim. Only users 18 years and older are permitted. This is a skill-based, free-to-play platform with no real money involved.
            </p>
          </div>

          <div className="border-t border-white/20 pt-4">
            <p className="text-sm text-white/70 text-center">
              © 2025 SDSURABHI INFRA PRIVATE LIMITED. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
