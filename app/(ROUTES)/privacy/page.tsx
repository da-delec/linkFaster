export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <h1>Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

        <h2>1. Information We Collect</h2>
        <h3>Personal Information</h3>
        <ul>
          <li>Name and email address when you create an account</li>
          <li>Professional information you add to your profile</li>
          <li>GitHub integration data (when you choose to connect)</li>
          <li>Profile customization preferences</li>
        </ul>

        <h3>Usage Information</h3>
        <ul>
          <li>How you interact with the platform</li>
          <li>Profile views and engagement metrics</li>
          <li>Device and browser information</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>We use your information to:</p>
        <ul>
          <li>Provide and improve our service</li>
          <li>Create and maintain your developer profile</li>
          <li>Enable profile sharing and discovery features</li>
          <li>Send important service updates</li>
          <li>Analyze usage patterns to improve the platform</li>
        </ul>

        <h2>3. Information Sharing</h2>
        <p>
          We do not sell your personal information. We may share your information only in these limited circumstances:
        </p>
        <ul>
          <li>With your explicit consent</li>
          <li>To comply with legal obligations</li>
          <li>To protect our rights and prevent fraud</li>
          <li>With service providers who help us operate the platform</li>
        </ul>

        <h2>4. Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your personal information 
          against unauthorized access, alteration, disclosure, or destruction.
        </p>

        <h2>5. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access, update, or delete your personal information</li>
          <li>Export your profile data</li>
          <li>Control your profile visibility settings</li>
          <li>Opt-out of non-essential communications</li>
        </ul>

        <h2>6. Cookies</h2>
        <p>
          We use essential cookies to provide our service and optional analytics cookies to improve user experience. 
          You can control cookie preferences in your browser settings.
        </p>

        <h2>7. Third-Party Services</h2>
        <p>
          LinkFaster integrates with third-party services like GitHub. When you choose to connect these services, 
          their privacy policies also apply to the information they collect.
        </p>

        <h2>8. Data Retention</h2>
        <p>
          We retain your information for as long as your account is active or as needed to provide our services. 
          You can delete your account at any time.
        </p>

        <h2>9. Changes to This Policy</h2>
        <p>
          We may update this privacy policy from time to time. We will notify you of any material changes 
          by posting the new policy on this page.
        </p>

        <h2>10. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us through the platform.
        </p>
      </div>
    </div>
  );
}