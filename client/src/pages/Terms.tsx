import { Button } from "@/components/ui/button";
import { APP_LOGO, APP_TITLE } from "@/const";
import { Link } from "wouter";

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="bg-primary text-white">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <img src={APP_LOGO} alt={APP_TITLE} className="h-14 w-auto" />
              <div className="text-xl font-bold hidden sm:block">
                <span className="text-white">Sports IQ </span>
                <span className="text-secondary">Play</span>
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
          <h1 className="text-4xl font-bold mb-3">Terms & Conditions</h1>
          <p className="text-lg text-white/90">
            Last Updated: January 26, 2025
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-12">
        <div className="container max-w-4xl">
          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-primary mb-4">1. Introduction and Acceptance</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Welcome to Sports IQ Play! These Terms and Conditions ("Terms") govern your access to and use of the Sports IQ Play website and services (collectively, the "Platform"). The Platform is owned and operated by Sports IQ Play Private Limited, a company incorporated under the Companies Act, 2013, with its registered office at E-38/39, Rajiv Chowk, Inner Circle, Block E, Connaught Place, New Delhi, Delhi 110001, India.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                By accessing, browsing, or using our Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms, along with our Privacy Policy and Responsible Gaming Policy. If you do not agree with any part of these Terms, you must not use our Platform.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these Terms at any time. Any changes will be effective immediately upon posting on the Platform. Your continued use of the Platform after such changes constitutes your acceptance of the modified Terms.
              </p>
            </section>

            {/* Eligibility */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-primary mb-4">2. Eligibility and Registration</h2>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">2.1 Age Requirement</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                You must be at least 18 years of age to register and use the Platform. By registering, you represent and warrant that you are 18 years or older. We reserve the right to request proof of age at any time, and failure to provide such proof may result in account suspension or termination.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3">2.2 Geographic Restrictions</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                The Platform is NOT available to residents of the following Indian states: <strong>Andhra Pradesh, Assam, Nagaland, Odisha, Sikkim, and Telangana</strong>. By registering, you confirm that you are not a resident of any of these restricted states. We reserve the right to verify your location and may suspend or terminate accounts found to be in violation of this restriction.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3">2.3 Account Registration</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                To use certain features of the Platform, you must create an account by providing accurate, current, and complete information, including:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>A unique username</li>
                <li>A valid email address</li>
                <li>A secure password</li>
                <li>Your state of residence (for geo-restriction verification)</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must immediately notify us of any unauthorized use of your account.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3">2.4 One Account Per Person</h3>
              <p className="text-gray-700 leading-relaxed">
                Each user is permitted to maintain only one account. Creating multiple accounts is strictly prohibited and may result in suspension or termination of all associated accounts.
              </p>
            </section>

            {/* Platform Nature */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-primary mb-4">3. Nature of the Platform</h2>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">3.1 Free-to-Play Entertainment</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Sports IQ Play is a <strong>100% free-to-play</strong> cricket fantasy platform designed purely for entertainment purposes. There are:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li><strong>NO entry fees</strong> - All contests are completely free to join</li>
                <li><strong>NO prizes or winnings</strong> - No monetary or material rewards of any kind</li>
                <li><strong>NO financial transactions</strong> - No deposits, withdrawals, or payments</li>
                <li><strong>NO gambling</strong> - This is not a gambling platform</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3">3.2 Skill-Based Game</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                The Platform offers skill-based fantasy cricket contests where success depends on your cricket knowledge, strategic thinking, and decision-making abilities. Outcomes are determined by real-world cricket match performances and your team selection strategy.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3">3.3 No Legal Tender Involved</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Since no money, prizes, or rewards of any kind are involved, the Platform does not constitute gambling, betting, or wagering under Indian law. It is purely recreational entertainment.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3">3.4 Third-Party Data Sources</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                The Platform integrates with third-party data providers to display real-time cricket match information:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li><strong>Cricket Data API:</strong> We use Cricket Data API (cricketdata.org) to fetch live match data, including team information, scores, match status, venues, and player details</li>
                <li><strong>Data Accuracy:</strong> While we strive to provide accurate and timely information, the accuracy, completeness, and timeliness of match data depend entirely on the third-party API provider</li>
                <li><strong>Service Availability:</strong> The availability of match data and live scores is subject to the third-party API provider's service uptime and may be interrupted or delayed</li>
                <li><strong>No Warranty:</strong> We do not warrant or guarantee the accuracy, reliability, or availability of any data provided by third-party sources</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                <strong>Disclaimer:</strong> Sports IQ Play Private Limited is not responsible for any errors, omissions, delays, or inaccuracies in match data provided by third-party API sources. Users acknowledge that contest results and scores displayed on the Platform are based on data from external sources over which we have no control.
              </p>
            </section>

            {/* User Conduct */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-primary mb-4">4. User Conduct and Prohibited Activities</h2>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">4.1 Acceptable Use</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                You agree to use the Platform only for lawful purposes and in accordance with these Terms. You must not:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Violate any applicable local, state, national, or international law</li>
                <li>Infringe upon the rights of others, including intellectual property rights</li>
                <li>Transmit any harmful, offensive, or inappropriate content</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Impersonate any person or entity</li>
                <li>Use automated systems (bots, scripts) to access the Platform</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3">4.2 Fair Play</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                You must play fairly and honestly. The following activities are strictly prohibited:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Collusion with other users to gain unfair advantages</li>
                <li>Using insider information not publicly available</li>
                <li>Manipulating or attempting to manipulate the Platform or scoring system</li>
                <li>Exploiting bugs, glitches, or vulnerabilities</li>
                <li>Creating multiple accounts to gain unfair advantages</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3">4.3 Consequences of Violations</h3>
              <p className="text-gray-700 leading-relaxed">
                Violation of these Terms may result in immediate suspension or termination of your account, removal of your teams and contest entries, and permanent ban from the Platform. We reserve the right to take appropriate legal action if necessary.
              </p>
            </section>

            {/* Contests and Scoring */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-primary mb-4">5. Contests, Teams, and Scoring</h2>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">5.1 Contest Participation</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                All contests are free to join and open to all eligible users. You may create multiple teams for any contest and join as many contests as you wish. Contest deadlines are typically set at the start time of the respective cricket match.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3">5.2 Team Creation Rules</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                When creating a team, you must adhere to the following composition rules:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Select exactly 11 players from both competing teams</li>
                <li>Wicket-keepers: 1-4 players</li>
                <li>Batsmen: 3-6 players</li>
                <li>All-rounders: 1-4 players</li>
                <li>Bowlers: 3-6 players</li>
                <li>Minimum 3 and maximum 7 players from any single team</li>
                <li>Designate one Captain (2x points) and one Vice-Captain (1.5x points)</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3">5.3 Scoring System</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Points are awarded based on actual player performance in real cricket matches according to our published scoring rules. We reserve the right to modify scoring rules with prior notice. In case of disputes, our decision on scoring shall be final and binding.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3">5.4 Match Cancellations</h3>
              <p className="text-gray-700 leading-relaxed">
                If a match is abandoned, cancelled, or does not produce a result, all associated contests will be cancelled. No points will be awarded, and teams will be reset.
              </p>
            </section>

            {/* Intellectual Property */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-primary mb-4">6. Intellectual Property Rights</h2>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">6.1 Platform Ownership</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                All content, features, and functionality on the Platform, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, data compilations, and software, are the exclusive property of Sports IQ Play Private Limited or its licensors and are protected by Indian and international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3">6.2 Limited License</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Platform for personal, non-commercial entertainment purposes only. You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any material from our Platform without prior written consent.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3">6.3 Trademarks</h3>
              <p className="text-gray-700 leading-relaxed">
                "Sports IQ Play," our logo, and all related names, logos, product and service names, designs, and slogans are trademarks of Sports IQ Play Private Limited. You must not use such marks without our prior written permission.
              </p>
            </section>

            {/* Disclaimer */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-primary mb-4">7. Disclaimers and Limitations of Liability</h2>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">7.1 "As Is" Basis</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                The Platform is provided on an "as is" and "as available" basis without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3">7.2 No Guarantee of Availability</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We do not guarantee that the Platform will be available at all times, error-free, or free from viruses or other harmful components. We reserve the right to suspend, withdraw, or restrict access to the Platform at any time without notice.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3">7.3 Limitation of Liability</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                To the fullest extent permitted by law, Sports IQ Play Private Limited, its directors, employees, partners, agents, suppliers, or affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, goodwill, or other intangible losses, resulting from:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Your access to or use of (or inability to access or use) the Platform</li>
                <li>Any conduct or content of any third party on the Platform</li>
                <li>Any content obtained from the Platform</li>
                <li>Unauthorized access, use, or alteration of your transmissions or content</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3">7.4 Third-Party Data Disclaimer</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                The Platform relies on third-party API providers (including but not limited to Cricket Data API from cricketdata.org) for cricket match data, scores, and related information. We explicitly disclaim all liability for:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Accuracy, completeness, or timeliness of match data provided by third-party sources</li>
                <li>Delays, interruptions, or unavailability of third-party API services</li>
                <li>Errors or inaccuracies in scores, match results, player statistics, or contest outcomes resulting from third-party data</li>
                <li>Any decisions you make based on data provided by third-party sources</li>
                <li>Changes to third-party API terms, pricing, or availability that may affect Platform functionality</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                You acknowledge and agree that we have no control over third-party data sources and cannot be held responsible for any issues arising from their services.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3">7.5 No Financial Liability</h3>
              <p className="text-gray-700 leading-relaxed">
                Since the Platform is completely free with no prizes or monetary rewards, there is no financial liability on our part for any contest outcomes, scoring disputes, or technical issues.
              </p>
            </section>

            {/* Termination */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-primary mb-4">8. Account Termination</h2>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">8.1 Termination by You</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                You may terminate your account at any time by contacting our support team. Upon termination, your right to use the Platform will immediately cease.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3">8.2 Termination by Us</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We reserve the right to suspend or terminate your account and access to the Platform at any time, with or without cause, and with or without notice, including but not limited to:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Violation of these Terms</li>
                <li>Fraudulent, abusive, or illegal activity</li>
                <li>Extended periods of inactivity</li>
                <li>Technical or security reasons</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3">8.3 Effect of Termination</h3>
              <p className="text-gray-700 leading-relaxed">
                Upon termination, all provisions of these Terms that by their nature should survive termination shall survive, including but not limited to ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
              </p>
            </section>

            {/* Governing Law */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-primary mb-4">9. Governing Law and Dispute Resolution</h2>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">9.1 Governing Law</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3">9.2 Jurisdiction</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Any disputes arising out of or relating to these Terms or the Platform shall be subject to the exclusive jurisdiction of the courts located in New Delhi, India.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3">9.3 Dispute Resolution</h3>
              <p className="text-gray-700 leading-relaxed">
                In the event of any dispute, you agree to first contact us to attempt to resolve the dispute informally. If the dispute cannot be resolved within 30 days, either party may pursue formal legal remedies.
              </p>
            </section>

            {/* Miscellaneous */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-primary mb-4">10. Miscellaneous Provisions</h2>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">10.1 Entire Agreement</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                These Terms, together with our Privacy Policy and Responsible Gaming Policy, constitute the entire agreement between you and Sports IQ Play Private Limited regarding the use of the Platform.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3">10.2 Severability</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3">10.3 Waiver</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                No waiver of any term of these Terms shall be deemed a further or continuing waiver of such term or any other term.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3">10.4 Assignment</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                You may not assign or transfer these Terms or your account without our prior written consent. We may assign our rights and obligations under these Terms without restriction.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3">10.5 Contact Information</h3>
              <p className="text-gray-700 leading-relaxed">
                For any questions about these Terms, please contact us at:<br/>
                <strong>Sports IQ Play Private Limited</strong><br/>
                E-38/39, Rajiv Chowk, Inner Circle, Block E<br/>
                Connaught Place, New Delhi, Delhi 110001, India<br/>
                Email: legal@sportsiqplay.com
              </p>
            </section>

            {/* Acceptance */}
            <section className="mb-10 bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-primary mb-4">Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By using Sports IQ Play, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with these Terms, you must immediately discontinue use of the Platform.
              </p>
            </section>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-12">
            <Link href="/">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 text-lg px-10 py-6 h-auto font-bold">
                ← Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white py-8 mt-16">
        <div className="container text-center">
          <p className="text-sm text-white/70">
            © 2025 Sports IQ Play Private Limited. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
