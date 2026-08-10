import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-50">

      <div className="mx-auto max-w-4xl px-6 py-16">

        <Link
          href="/"
          className="text-sm font-semibold text-green-600 hover:text-green-700"
        >
          ← Back to PaperNova
        </Link>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">

          <h1 className="text-4xl font-bold text-slate-900">
            Privacy Policy
          </h1>

          <p className="mt-3 text-sm text-slate-500">
            Last updated: August 2026
          </p>

          <div className="mt-10 space-y-8 text-slate-600">

            <section>
              <h2 className="text-2xl font-bold text-slate-900">
                1. Information We Collect
              </h2>

              <p className="mt-3 leading-7">
                PaperNova Industries may collect information
                provided by customers when they register,
                place an order, submit an inquiry, or contact
                us through the website.
              </p>

              <p className="mt-3 leading-7">
                This information may include your name,
                email address, phone number, company name,
                delivery information, and details provided
                in your messages or inquiries.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900">
                2. How We Use Your Information
              </h2>

              <p className="mt-3 leading-7">
                Information collected through the website
                may be used to process orders, respond to
                inquiries, provide quotations, communicate
                with customers, and improve our products
                and services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900">
                3. Account Information
              </h2>

              <p className="mt-3 leading-7">
                Customers who create an account are
                responsible for maintaining the
                confidentiality of their login credentials.
                Account information is used to provide
                access to customer-specific features such
                as orders and account management.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900">
                4. Orders and Payments
              </h2>

              <p className="mt-3 leading-7">
                Information associated with orders may be
                stored to process and manage purchases,
                delivery, customer support, and order
                history.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900">
                5. Data Security
              </h2>

              <p className="mt-3 leading-7">
                We take reasonable measures to protect
                information submitted through the website.
                However, no method of transmission or
                electronic storage can be guaranteed to be
                completely secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900">
                6. Third-Party Services
              </h2>

              <p className="mt-3 leading-7">
                The website may use third-party services
                for hosting, database management, analytics,
                communication, or other functionality.
                Such services may process information in
                accordance with their own policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900">
                7. Contact Us
              </h2>

              <p className="mt-3 leading-7">
                If you have questions about this Privacy
                Policy or how your information is handled,
                please contact PaperNova Industries through
                the Contact section of our website.
              </p>
            </section>

          </div>

        </div>

      </div>

    </main>
  );
}