export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <h1>Terms of Service</h1>
        <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using LinkFaster, you accept and agree to be bound by the terms and provision of this agreement.
          If you do not agree to abide by the above, please do not use this service.
        </p>

        <h2>2. Description of Service</h2>
        <p>
          LinkFaster is a platform that allows developers to create professional profiles, showcase their work, 
          and connect with potential clients or employers. The service is provided "as is" without warranties of any kind.
        </p>

        <h2>3. User Responsibilities</h2>
        <ul>
          <li>You are responsible for maintaining the confidentiality of your account</li>
          <li>You agree not to use the service for any unlawful purposes</li>
          <li>You are responsible for all content you post or share through the service</li>
          <li>You agree not to attempt to gain unauthorized access to the service</li>
        </ul>

        <h2>4. Content Ownership</h2>
        <p>
          You retain ownership of all content you create and share on LinkFaster. By using the service, 
          you grant us a non-exclusive license to display and distribute your content as part of the service.
        </p>

        <h2>5. Privacy</h2>
        <p>
          Your privacy is important to us. Please review our Privacy Policy to understand how we collect, 
          use, and protect your information.
        </p>

        <h2>6. Limitation of Liability</h2>
        <p>
          LinkFaster shall not be liable for any direct, indirect, incidental, consequential, or punitive damages 
          arising from your use of the service.
        </p>

        <h2>7. Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. Changes will be effective immediately upon 
          posting on this page. Your continued use of the service constitutes acceptance of the modified terms.
        </p>

        <h2>8. Contact Information</h2>
        <p>
          If you have any questions about these Terms of Service, please contact us through the platform.
        </p>
      </div>
    </div>
  );
}