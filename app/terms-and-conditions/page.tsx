import Link from "next/link";

export default function TermsAndConditionsPage() {
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
            Terms & Conditions
          </h1>

          <p className="mt-3 text-sm text-slate-500">
            Last updated: August 2026
          </p>

          <div className="mt-10 space-y-8 text-slate-600">

            <section>
              <h2 className="text-2xl font-bold text-slate-900">
                1. Acceptance of Terms
              </h2>

              <p className="mt-3 leading-7">
                By accessing or using the PaperNova
                Industries website, you agree to comply
                with these Terms & Conditions. If you do
                not agree with these terms, please do not
                use the website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900">
                2. Products
              </h2>

              <p className="mt-3 leading-7">
                PaperNova Industries provides information
                about paper products, stationery, and
                related products through this website.
                Product descriptions, images, prices,
                availability, and specifications may be
                updated from time to time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900">
                3. Customer Accounts
              </h2>

              <p className="mt-3 leading-7">
                Customers are responsible for providing
                accurate information when creating an
                account and for maintaining the security
                of their account credentials.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900">
                4. Orders
              </h2>

              <p className="mt-3 leading-7">
                Orders submitted through the website are
                subject to product availability and
                confirmation. PaperNova Industries
                reserves the right to review or cancel
                orders where necessary.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900">
                5. Pricing
              </h2>

              <p className="mt-3 leading-7">
                Product prices displayed on the website
                may change without prior notice. Custom
                and bulk orders may require a separate
                quotation based on the customer's
                requirements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900">
                6. Quote Requests
              </h2>

              <p className="mt-3 leading-7">
                Quote requests submitted through the
                website are requests for information or
                pricing and do not automatically constitute
                a confirmed order. Final quotations and
                order terms may be communicated separately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900">
                7. Website Usage
              </h2>

              <p className="mt-3 leading-7">
                Users agree not to misuse the website,
                attempt unauthorized access, interfere
                with website functionality, or use the
                website for unlawful purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900">
                8. Contact
              </h2>

              <p className="mt-3 leading-7">
                For questions regarding these Terms &
                Conditions, please contact PaperNova
                Industries through the contact information
                provided on the website.
              </p>
            </section>

          </div>

        </div>

      </div>

    </main>
  );
}