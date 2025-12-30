export default function TermsPage() {
  return (
    <div className="bg-white py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900">Terms of Service</h1>
        <p className="mt-4 text-sm text-gray-600">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="prose prose-gray mt-8 max-w-none">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using Blockover Corp's services, you accept and
            agree to be bound by the terms and provision of this agreement.
          </p>

          <h2>2. Use License</h2>
          <p>
            Permission is granted to temporarily access the services for personal
            or commercial use. This is the grant of a license, not a transfer of
            title, and under this license you may not:
          </p>
          <ul>
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose without consent</li>
            <li>
              Attempt to decompile or reverse engineer any software contained on
              our services
            </li>
            <li>
              Remove any copyright or other proprietary notations from the
              materials
            </li>
          </ul>

          <h2>3. Disclaimer</h2>
          <p>
            The materials on our services are provided on an 'as is' basis. We
            make no warranties, expressed or implied, and hereby disclaim and
            negate all other warranties including, without limitation, implied
            warranties or conditions of merchantability, fitness for a particular
            purpose, or non-infringement of intellectual property or other
            violation of rights.
          </p>

          <h2>4. Limitations</h2>
          <p>
            In no event shall Blockover Corp or its suppliers be liable for any
            damages (including, without limitation, damages for loss of data or
            profit, or due to business interruption) arising out of the use or
            inability to use our services.
          </p>

          <h2>5. Accuracy of Materials</h2>
          <p>
            The materials appearing on our services could include technical,
            typographical, or photographic errors. We do not warrant that any of
            the materials on our services are accurate, complete, or current.
          </p>

          <h2>6. Links</h2>
          <p>
            We have not reviewed all of the sites linked to our services and are
            not responsible for the contents of any such linked site. The
            inclusion of any link does not imply endorsement by us of the site.
          </p>

          <h2>7. Modifications</h2>
          <p>
            We may revise these terms of service at any time without notice. By
            using our services, you are agreeing to be bound by the then current
            version of these terms of service.
          </p>

          <h2>8. Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in
            accordance with applicable laws, and you irrevocably submit to the
            exclusive jurisdiction of the courts in that location.
          </p>

          <h2>9. Account Terms</h2>
          <p>
            You are responsible for maintaining the security of your account and
            password. Blockover Corp cannot and will not be liable for any loss
            or damage from your failure to comply with this security obligation.
          </p>

          <h2>10. Contact Information</h2>
          <p>
            Questions about the Terms of Service should be sent to us at:
            legal@blockover.com
          </p>
        </div>
      </div>
    </div>
  );
}
