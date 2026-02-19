import { Button } from "@/components/ui/button";
import { APP_LOGO, APP_TITLE } from "@/const";
import { Link } from "wouter";

export default function Privacy() {
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
          <h1 className="text-4xl font-bold mb-3">Privacy Policy</h1>
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
              <h2 className="text-3xl font-bold text-primary mb-4">1. Introduction</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                SDSURABHI INFRA PRIVATE LIMITED (trading as SDSURABHI) ("we," "us," or "our") is committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services (collectively, the "Platform").
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                We understand the importance of privacy, especially in the digital age. This policy is designed to help you understand:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>What information we collect from you</li>
                <li>How we use that information</li>
                <li>With whom we share it (spoiler: we don't!)</li>
                <li>How we protect your information</li>
                <li>Your rights regarding your personal data</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                By using the Platform, you consent to the data practices described in this Privacy Policy. If you do not agree with this policy, please do not use our Platform.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-primary mb-4">2. Information We Collect</h2>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">2.1 Information You Provide Directly</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We collect only the minimum information necessary to provide our services. When you register for an account, we collect:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li><strong>Username:</strong> A unique identifier you choose for your account</li>
                <li><strong>Email Address:</strong> Used for account verification, login, and essential communications</li>
                <li><strong>Password:</strong> Encrypted and stored securely (we never see your actual password)</li>

              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>What We DON'T Collect:</strong>
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Phone numbers</li>
                <li>Physical addresses (beyond state)</li>
                <li>Financial information (no payments involved)</li>
                <li>Government ID numbers (Aadhaar, PAN, etc.)</li>
                <li>Social media profiles or credentials</li>
                <li>Sensitive personal data</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3">2.2 Information Collected Automatically</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                When you use the Platform, we may automatically collect certain technical information:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li><strong>Device Information:</strong> Browser type, operating system, device type</li>
                <li><strong>Usage Data:</strong> Pages visited, time spent, features used</li>
                <li><strong>IP Address:</strong> For security and fraud prevention</li>
                <li><strong>Cookies:</strong> Small text files stored on your device (see Section 7)</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3">2.3 Contest and Gameplay Data</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We collect information about your gameplay, including teams created, contests joined, scores achieved, and leaderboard rankings. This data is used solely to provide the gaming experience and display your performance.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3">2.4 Third-Party API Data</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                To provide real-time cricket match information, we integrate with third-party data providers:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li><strong>Cricket Data API (cricketdata.org):</strong> We fetch live cricket match data including team names, scores, match status, venues, and player information</li>
                <li><strong>Data Usage:</strong> This data is displayed on our platform to show current and upcoming matches, contest information, and live scores</li>
                <li><strong>No Personal Data Shared:</strong> We do not share any of your personal information with these third-party API providers</li>
                <li><strong>API Provider's Privacy:</strong> The third-party API provider may have their own privacy policies governing the cricket match data they provide</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                <strong>Important:</strong> Match data accuracy, availability, and timeliness depend on the third-party API provider. We are not responsible for any delays, inaccuracies, or unavailability of match data from external sources.
              </p>
            </section>

            {/* How We Use Information */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-primary mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use the collected information for the following purposes:
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3">3.1 To Provide and Maintain Services</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Create and manage your account</li>
                <li>Enable you to participate in contests</li>
                <li>Calculate scores and update leaderboards</li>
                <li>Save your teams and contest history</li>
                <li>Provide customer support</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3">3.2 To Ensure Compliance and Security</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li><strong>Verify eligibility (age verification)</strong></li>
                <li>Prevent fraud, abuse, and multiple accounts</li>
                <li>Detect and prevent security threats</li>
                <li>Enforce our Terms and Conditions</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3">3.3 To Communicate With You</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Send account-related notifications (password resets, etc.)</li>
                <li>Notify you about contest updates and match reminders</li>
                <li>Respond to your inquiries and support requests</li>
                <li>Send important platform updates and policy changes</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3">3.4 To Improve Our Platform</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Analyze usage patterns to improve user experience</li>
                <li>Identify and fix technical issues</li>
                <li>Develop new features based on user behavior</li>
                <li>Optimize platform performance</li>
              </ul>
            </section>

            {/* Data Sharing */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-primary mb-4">4. How We Share Your Information</h2>
              
              <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6 mb-6">
                <h3 className="text-2xl font-semibold text-green-900 mb-3">✅ The Short Answer: We Don't!</h3>
                <p className="text-gray-700 leading-relaxed">
                  We do NOT sell, rent, trade, or otherwise share your personal information with third parties for their marketing purposes. Your data stays with us.
                </p>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3">4.1 Limited Exceptions</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may share your information only in the following limited circumstances:
              </p>

              <h4 className="text-xl font-semibold text-gray-900 mb-2">Legal Obligations</h4>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may disclose your information if required by law, court order, or government regulation, or if we believe disclosure is necessary to:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Comply with legal process</li>
                <li>Enforce our Terms and Conditions</li>
                <li>Protect our rights, property, or safety</li>
                <li>Protect the rights, property, or safety of our users or the public</li>
              </ul>

              <h4 className="text-xl font-semibold text-gray-900 mb-2">Service Providers</h4>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may use trusted third-party service providers to help us operate the Platform (e.g., hosting services, email delivery). These providers have access to your information only to perform specific tasks on our behalf and are obligated to protect your data.
              </p>

              <h4 className="text-xl font-semibold text-gray-900 mb-2">Business Transfers</h4>
              <p className="text-gray-700 leading-relaxed">
                If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. We will notify you of any such change in ownership or control.
              </p>
            </section>

            {/* Data Security */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-primary mb-4">5. Data Security</h2>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">5.1 Security Measures</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We implement industry-standard security measures to protect your personal information:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li><strong>Encryption:</strong> All data transmission is encrypted using SSL/TLS</li>
                <li><strong>Password Hashing:</strong> Passwords are hashed using bcrypt and never stored in plain text</li>
                <li><strong>Secure Storage:</strong> Data is stored on secure servers with restricted access</li>
                <li><strong>Regular Audits:</strong> We conduct regular security audits and updates</li>
                <li><strong>Access Controls:</strong> Only authorized personnel have access to user data</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3">5.2 Your Responsibility</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                While we take security seriously, you also play a role in protecting your account:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Choose a strong, unique password</li>
                <li>Never share your password with anyone</li>
                <li>Log out after using shared devices</li>
                <li>Report any suspicious activity immediately</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3">5.3 No Absolute Security</h3>
              <p className="text-gray-700 leading-relaxed">
                While we strive to protect your information, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security, but we continuously work to improve our security measures.
              </p>
            </section>

            {/* Data Retention */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-primary mb-4">6. Data Retention</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li><strong>Active Accounts:</strong> Data is retained as long as your account is active</li>
                <li><strong>Inactive Accounts:</strong> Accounts inactive for 2+ years may be deleted</li>
                <li><strong>Deleted Accounts:</strong> Upon deletion request, we remove your data within 30 days</li>
                <li><strong>Legal Requirements:</strong> Some data may be retained longer if required by law</li>
              </ul>
            </section>

            {/* Cookies */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-primary mb-4">7. Cookies and Tracking Technologies</h2>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">7.1 What Are Cookies?</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Cookies are small text files stored on your device when you visit a website. They help us remember your preferences and improve your experience.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3">7.2 How We Use Cookies</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li><strong>Essential Cookies:</strong> Required for login and basic functionality</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how you use the Platform</li>
                <li><strong>Security Cookies:</strong> Protect against fraud and unauthorized access</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3">7.3 Managing Cookies</h3>
              <p className="text-gray-700 leading-relaxed">
                You can control cookies through your browser settings. However, disabling certain cookies may affect the functionality of the Platform.
              </p>
            </section>

            {/* Your Rights */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-primary mb-4">8. Your Privacy Rights</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You have the following rights regarding your personal information:
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3">8.1 Access and Portability</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                You have the right to request a copy of the personal information we hold about you. We will provide this information in a structured, commonly used format.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3">8.2 Correction</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                You can update your account information (username, email) at any time through your profile settings. If you need help correcting your data, contact our support team.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3">8.3 Deletion</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                You have the right to request deletion of your account and personal information. Contact us to initiate the deletion process. We will delete your data within 30 days, except where retention is required by law.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3">8.4 Objection and Restriction</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                You can object to certain processing of your data or request that we restrict processing in specific circumstances.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3">8.5 Withdraw Consent</h3>
              <p className="text-gray-700 leading-relaxed">
                Where we rely on your consent to process your data, you have the right to withdraw that consent at any time.
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-primary mb-4">9. Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our Platform is not intended for individuals under the age of 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately, and we will delete such information.
              </p>
            </section>

            {/* Changes to Policy */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-primary mb-4">10. Changes to This Privacy Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. We will notify you of any material changes by:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Posting the updated policy on this page</li>
                <li>Updating the "Last Updated" date at the top</li>
                <li>Sending you an email notification (for significant changes)</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Your continued use of the Platform after any changes constitutes your acceptance of the updated Privacy Policy.
              </p>
            </section>

            {/* Contact */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-primary mb-4">11. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <p className="text-gray-700 mb-2"><strong>SDSURABHI INFRA PRIVATE LIMITED</strong></p>
                <p className="text-gray-700 mb-2">Brand Name: SDSURABHI</p>
                <p className="text-gray-700 mb-2">48/2, Bijnour, Ayodhya Puri 2</p>
                <p className="text-gray-700 mb-2">Lucknow, Uttar Pradesh 226008, India</p>
                <p className="text-gray-700 mb-2">CIN: U41002UP2023PTC194590</p>
                <p className="text-gray-700 mb-2"><strong>Email:</strong> privacy@sportiqplay.com</p>
                <p className="text-gray-700"><strong>Response Time:</strong> We aim to respond to all privacy inquiries within 7 business days</p>
              </div>
            </section>

            {/* Summary */}
            <section className="mb-10 bg-blue-50 border-2 border-blue-300 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-primary mb-4">Privacy Policy Summary</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>We collect minimal data: username, email, password, and state</li>
                <li>We do NOT collect phone numbers, addresses, or financial information</li>
                <li>We do NOT sell or share your data with third parties</li>
                <li>We use industry-standard security measures to protect your data</li>
                <li>You have the right to access, correct, and delete your data</li>
                <li>We use cookies to improve your experience</li>
                <li>The Platform is for users 18+ only</li>
              </ul>
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
            © 2025 SDSURABHI INFRA PRIVATE LIMITED. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
