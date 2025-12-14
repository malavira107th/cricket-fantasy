import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { APP_LOGO, APP_TITLE } from "@/const";
import { Link } from "wouter";
import { useState } from "react";

export default function ResponsibleGaming() {
  const [assessmentScore, setAssessmentScore] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const selfAssessmentQuestions = [
    "Do you spend more time on fantasy sports than you originally intended?",
    "Do you find yourself thinking about fantasy sports when you should be focusing on other activities?",
    "Have you neglected work, studies, or family responsibilities because of fantasy sports?",
    "Do you feel restless or irritable when you try to reduce your fantasy sports participation?",
    "Have you lied to family or friends about how much time you spend on fantasy sports?",
    "Do you use fantasy sports as a way to escape from problems or relieve negative feelings?",
    "Have you tried to cut back on fantasy sports but found it difficult?",
    "Do you check scores and updates constantly throughout the day?",
  ];

  const handleAssessment = () => {
    const score = answers.filter(Boolean).length;
    setAssessmentScore(score);
  };

  const toggleAnswer = (index: number) => {
    const newAnswers = [...answers];
    newAnswers[index] = !newAnswers[index];
    setAnswers(newAnswers);
  };

  const getAssessmentResult = (score: number) => {
    if (score === 0) {
      return {
        level: "Healthy",
        color: "text-green-600",
        bg: "bg-green-50 border-green-300",
        message: "Great! You appear to have a healthy relationship with fantasy sports. Continue to monitor your habits and maintain balance in your life."
      };
    } else if (score <= 2) {
      return {
        level: "Low Risk",
        color: "text-yellow-600",
        bg: "bg-yellow-50 border-yellow-300",
        message: "You show some signs that warrant attention. Consider setting time limits and ensuring fantasy sports doesn't interfere with your daily responsibilities."
      };
    } else if (score <= 4) {
      return {
        level: "Moderate Risk",
        color: "text-orange-600",
        bg: "bg-orange-50 border-orange-300",
        message: "You're showing moderate signs of problematic behavior. We recommend taking a break, setting strict limits, and seeking support if needed."
      };
    } else {
      return {
        level: "High Risk",
        color: "text-red-600",
        bg: "bg-red-50 border-red-300",
        message: "You're showing significant signs of problematic behavior. We strongly recommend taking a break from the platform and considering professional support."
      };
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
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
              <Link href="/">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary bg-transparent">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-3">Responsible Gaming</h1>
          <p className="text-lg text-white/90">
            Play Smart, Play Safe, Play Responsibly
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-12">
        <div className="container max-w-5xl">
          {/* Introduction */}
          <section className="mb-12">
            <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-primary mb-4">Our Commitment to Responsible Gaming</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                At SDSURABHI, we believe that fantasy sports should be a fun, entertaining, and skill-based activity that enhances your enjoyment of cricket. While our platform is completely free with no monetary stakes or prizes, we recognize that any form of gaming—even entertainment-only—can become problematic if not approached responsibly.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We are committed to promoting healthy gaming habits and providing resources to help you maintain a balanced relationship with fantasy sports. This page outlines our responsible gaming guidelines, warning signs to watch for, and tools to help you stay in control.
              </p>
            </div>
          </section>

          {/* Core Principles */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-primary mb-6">Core Principles of Responsible Gaming</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white shadow-md border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">⏰</div>
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-2">Set Time Limits</h3>
                      <p className="text-gray-700">
                        Decide in advance how much time you'll spend on fantasy sports each day or week. Stick to your limits and don't let it interfere with work, studies, or relationships.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md border-l-4 border-l-secondary">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">⚖️</div>
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-2">Maintain Balance</h3>
                      <p className="text-gray-700">
                        Fantasy sports should be one of many activities in your life. Ensure you're maintaining a healthy balance with work, family, friends, exercise, and other hobbies.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">🎯</div>
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-2">Play for Fun</h3>
                      <p className="text-gray-700">
                        Remember, SDSURABHI is purely for entertainment. There are no prizes or rewards. If you're not enjoying it, take a break. It should enhance your cricket experience, not dominate it.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md border-l-4 border-l-secondary">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">🛑</div>
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-2">Know When to Stop</h3>
                      <p className="text-gray-700">
                        If fantasy sports is causing stress, affecting your mood, or interfering with daily life, it's time to take a break. There's no shame in stepping away.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">👨‍👩‍👧‍👦</div>
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-2">Age Appropriate</h3>
                      <p className="text-gray-700">
                        Our platform is strictly for users 18 years and older. If you're a parent, monitor your children's online activities and ensure they're not accessing fantasy sports platforms.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md border-l-4 border-l-secondary">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">💬</div>
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-2">Seek Support</h3>
                      <p className="text-gray-700">
                        If you're concerned about your gaming habits, talk to someone you trust. Don't hesitate to reach out for professional help if needed.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Warning Signs */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-primary mb-6">Warning Signs of Problematic Gaming</h2>
            <Card className="bg-white shadow-lg">
              <CardContent className="p-8">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  While SDSURABHI doesn't involve money, excessive gaming of any kind can become problematic. Watch for these warning signs:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <span className="text-red-500 text-xl">⚠️</span>
                    <p className="text-gray-700">Spending excessive time on fantasy sports, neglecting other responsibilities</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-500 text-xl">⚠️</span>
                    <p className="text-gray-700">Feeling anxious, irritable, or restless when not playing</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-500 text-xl">⚠️</span>
                    <p className="text-gray-700">Lying to family or friends about time spent on the platform</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-500 text-xl">⚠️</span>
                    <p className="text-gray-700">Using fantasy sports to escape from problems or negative emotions</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-500 text-xl">⚠️</span>
                    <p className="text-gray-700">Neglecting work, studies, or personal relationships</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-500 text-xl">⚠️</span>
                    <p className="text-gray-700">Experiencing sleep disturbances due to late-night gaming</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-500 text-xl">⚠️</span>
                    <p className="text-gray-700">Difficulty controlling or reducing time spent on the platform</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-500 text-xl">⚠️</span>
                    <p className="text-gray-700">Constantly checking scores and updates throughout the day</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Self-Assessment Tool */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-primary mb-6">Self-Assessment Tool</h2>
            <Card className="bg-white shadow-lg">
              <CardContent className="p-8">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Answer the following questions honestly to assess your relationship with fantasy sports. This is a confidential self-assessment—your answers are not stored or shared.
                </p>
                
                <div className="space-y-4 mb-6">
                  {selfAssessmentQuestions.map((question, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <input
                        type="checkbox"
                        id={`q${index}`}
                        checked={answers[index] || false}
                        onChange={() => toggleAnswer(index)}
                        className="mt-1 w-5 h-5 text-primary"
                      />
                      <label htmlFor={`q${index}`} className="text-gray-700 flex-1 cursor-pointer">
                        {question}
                      </label>
                    </div>
                  ))}
                </div>

                <Button 
                  onClick={handleAssessment}
                  className="bg-primary text-white hover:bg-primary/90 w-full md:w-auto px-8 py-3 text-lg font-semibold"
                >
                  Get Assessment Result
                </Button>

                {assessmentScore !== null && (
                  <div className={`mt-6 p-6 border-2 rounded-lg ${getAssessmentResult(assessmentScore).bg}`}>
                    <h3 className={`text-2xl font-bold mb-3 ${getAssessmentResult(assessmentScore).color}`}>
                      Result: {getAssessmentResult(assessmentScore).level}
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      <strong>You answered "Yes" to {assessmentScore} out of {selfAssessmentQuestions.length} questions.</strong>
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      {getAssessmentResult(assessmentScore).message}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </section>

          {/* Tools and Controls */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-primary mb-6">Tools and Controls</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-white shadow-md">
                <CardContent className="p-6 text-center">
                  <div className="text-5xl mb-4">⏸️</div>
                  <h3 className="text-xl font-bold text-primary mb-3">Take a Break</h3>
                  <p className="text-gray-700 mb-4">
                    Need a break? You can temporarily deactivate your account for a set period (7 days, 30 days, or 90 days).
                  </p>
                  <Link href="/contact">
                    <Button variant="outline" className="w-full">
                      Request Break
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md">
                <CardContent className="p-6 text-center">
                  <div className="text-5xl mb-4">🚫</div>
                  <h3 className="text-xl font-bold text-primary mb-3">Self-Exclusion</h3>
                  <p className="text-gray-700 mb-4">
                    Want to stop completely? You can request permanent self-exclusion from the platform.
                  </p>
                  <Link href="/contact">
                    <Button variant="outline" className="w-full">
                      Self-Exclude
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md">
                <CardContent className="p-6 text-center">
                  <div className="text-5xl mb-4">🗑️</div>
                  <h3 className="text-xl font-bold text-primary mb-3">Delete Account</h3>
                  <p className="text-gray-700 mb-4">
                    You can permanently delete your account and all associated data at any time.
                  </p>
                  <Link href="/contact">
                    <Button variant="outline" className="w-full">
                      Delete Account
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Tips for Healthy Gaming */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-primary mb-6">Tips for Healthy Gaming</h2>
            <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 shadow-md">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-3">✅ DO:</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Set a specific time limit before you start playing</li>
                      <li>• Take regular breaks during gaming sessions</li>
                      <li>• Keep fantasy sports as one of many hobbies</li>
                      <li>• Play when you're in a good mood and relaxed</li>
                      <li>• Talk to friends and family about your gaming</li>
                      <li>• Celebrate wins and losses equally—it's just for fun!</li>
                      <li>• Monitor your emotions and behavior</li>
                      <li>• Seek help if you notice warning signs</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-3">❌ DON'T:</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Play when you're stressed, angry, or upset</li>
                      <li>• Neglect work, studies, or relationships for gaming</li>
                      <li>• Use fantasy sports to escape from problems</li>
                      <li>• Play late into the night, affecting your sleep</li>
                      <li>• Hide your gaming habits from loved ones</li>
                      <li>• Take losses personally or let them affect your mood</li>
                      <li>• Feel pressured to participate in every contest</li>
                      <li>• Ignore warning signs of problematic behavior</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Support Resources */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-primary mb-6">Support and Resources</h2>
            <Card className="bg-white shadow-lg">
              <CardContent className="p-8">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  If you're concerned about your gaming habits or need support, these resources can help:
                </p>
                
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-bold text-primary mb-2">National Institute of Mental Health and Neurosciences (NIMHANS)</h4>
                    <p className="text-gray-700 text-sm mb-1">Service for Healthy Use of Technology (SHUT) Clinic</p>
                    <p className="text-gray-700 text-sm">Phone: +91-80-26995000</p>
                    <p className="text-gray-700 text-sm">Website: nimhans.ac.in</p>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-bold text-primary mb-2">Vandrevala Foundation</h4>
                    <p className="text-gray-700 text-sm mb-1">24/7 Mental Health Helpline</p>
                    <p className="text-gray-700 text-sm">Phone: 1860-2662-345 or 1800-2333-330</p>
                    <p className="text-gray-700 text-sm">Website: vandrevalafoundation.com</p>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-bold text-primary mb-2">iCall Psychosocial Helpline</h4>
                    <p className="text-gray-700 text-sm mb-1">Tata Institute of Social Sciences</p>
                    <p className="text-gray-700 text-sm">Phone: +91-22-25521111</p>
                    <p className="text-gray-700 text-sm">Email: icall@tiss.edu</p>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-bold text-primary mb-2">SDSURABHI Support</h4>
                    <p className="text-gray-700 text-sm mb-1">Our support team is here to help</p>
                    <p className="text-gray-700 text-sm">Email: support@sportsiqplay.com</p>
                    <Link href="/contact" className="text-primary text-sm underline">Contact Us</Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Parental Guidance */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-primary mb-6">Parental Guidance</h2>
            <Card className="bg-white shadow-md">
              <CardContent className="p-8">
                <p className="text-gray-700 leading-relaxed mb-4">
                  While SDSURABHI is strictly for users 18 years and older, we recognize that parents and guardians play a crucial role in monitoring online activities. Here are some tips:
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">1.</span>
                    <span><strong>Monitor Online Activity:</strong> Keep track of what websites and platforms your children are accessing.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">2.</span>
                    <span><strong>Educate About Age Restrictions:</strong> Explain why certain platforms have age limits and the importance of following them.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">3.</span>
                    <span><strong>Set Screen Time Limits:</strong> Establish healthy boundaries for all online activities, not just gaming.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">4.</span>
                    <span><strong>Open Communication:</strong> Maintain open dialogue about online activities and encourage your children to come to you with questions.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">5.</span>
                    <span><strong>Report Underage Users:</strong> If you discover underage users on our platform, please report them to us immediately.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Our Commitment */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl p-10">
              <h2 className="text-3xl font-bold mb-4">Our Commitment to You</h2>
              <p className="text-lg text-white/90 leading-relaxed mb-4">
                At SDSURABHI, responsible gaming is not just a policy—it's a core value. We are committed to:
              </p>
              <ul className="space-y-2 text-white/90 text-lg">
                <li>✓ Promoting healthy gaming habits and awareness</li>
                <li>✓ Providing tools and resources for self-management</li>
                <li>✓ Responding promptly to concerns and support requests</li>
                <li>✓ Continuously improving our responsible gaming measures</li>
                <li>✓ Maintaining a safe, fair, and transparent platform</li>
              </ul>
              <p className="text-lg text-white/90 leading-relaxed mt-6">
                Remember: SDSURABHI is meant to be fun. If it's not fun anymore, it's time to take a break. Your well-being is more important than any game.
              </p>
            </div>
          </section>

          {/* Contact */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-primary mb-4">Need Help or Have Concerns?</h3>
            <p className="text-gray-700 mb-6">
              Our support team is here to assist you with any responsible gaming concerns.
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
      <footer className="bg-primary text-white py-8 mt-16">
        <div className="container text-center">
          <p className="text-sm text-white/70">
            © 2025 SDSURABHI INFRA PRIVATE LIMITED. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
