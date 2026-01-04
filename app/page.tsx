import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-8 lg:px-8">
        {/* Animated background gradients */}
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-purple-600 to-cyan-600 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>
        <div className="absolute inset-x-0 top-[calc(100%-30rem)] -z-10 transform-gpu overflow-hidden blur-3xl">
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-cyan-600 to-purple-600 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl py-16 sm:py-20 lg:py-24">
          <div className="text-center">
            <div className="mb-8 inline-block">
              <span className="inline-flex items-center gap-2 rounded-full bg-green-500/10 border border-green-500/20 px-4 py-2 text-sm font-medium text-green-400">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Save Thousands on Your Vine Taxes
              </span>
            </div>
            <h1 className="text-6xl font-bold tracking-tight bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent sm:text-8xl">
              Stop Overpaying Taxes on Amazon Vine
            </h1>
            <p className="mt-8 text-xl leading-8 text-gray-300 sm:text-2xl">
              Track your Vine orders, calculate accurate Fair Market Values, and reduce your tax liability by up to 80% with AI-powered valuations. Join thousands of Vine reviewers who are keeping more of what they earn.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/signup"
                className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 px-10 py-5 text-xl font-bold text-white shadow-2xl shadow-green-500/25 transition-all hover:shadow-3xl hover:shadow-green-500/40 hover:scale-105 w-full sm:w-auto text-center"
              >
                <span className="relative z-10">Start Saving Today - FREE</span>
              </Link>
              <Link
                href="/#how-it-works"
                className="group flex items-center justify-center gap-2 text-lg font-semibold text-gray-300 hover:text-white transition-colors w-full sm:w-auto"
              >
                See How It Works
                <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
            </div>
            <p className="mt-8 text-sm text-gray-500">
              No credit card required • Free forever plan available • Cancel anytime
            </p>
          </div>
        </div>
      </div>

      {/* Problem/Solution Section */}
      <div className="py-24 sm:py-32 bg-gradient-to-b from-gray-900/50 to-transparent">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-purple-400">
              The Problem
            </h2>
            <p className="mt-2 text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent sm:text-5xl">
              Amazon's Tax Values Are Inflated
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-400">
              Amazon reports the retail price as your taxable income, but once you open and review a product, it becomes <span className="text-white font-semibold">used</span> and worth much less. You shouldn't pay taxes on the full retail value.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20">
            <div className="rounded-2xl bg-red-500/10 border-2 border-red-500/30 p-8 mb-8">
              <h3 className="text-2xl font-bold text-red-400 mb-4">Without ZeroETV:</h3>
              <div className="space-y-3 text-gray-300">
                <p className="flex items-start gap-3">
                  <svg className="h-6 w-6 text-red-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Pay taxes on $10,000 worth of Vine products at full retail price</span>
                </p>
                <p className="flex items-start gap-3">
                  <svg className="h-6 w-6 text-red-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Owe $2,500-$3,700 in taxes (25-37% tax bracket)</span>
                </p>
                <p className="flex items-start gap-3">
                  <svg className="h-6 w-6 text-red-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Spend hours manually tracking and calculating values</span>
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-green-500/10 border-2 border-green-500/30 p-8">
              <h3 className="text-2xl font-bold text-green-400 mb-4">With ZeroETV:</h3>
              <div className="space-y-3 text-gray-300">
                <p className="flex items-start gap-3">
                  <svg className="h-6 w-6 text-green-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Pay taxes on the <strong>actual used value</strong> after review (typically $2,000-$3,000)</span>
                </p>
                <p className="flex items-start gap-3">
                  <svg className="h-6 w-6 text-green-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Owe only $500-$1,100 in taxes - <strong className="text-green-400">save $2,000-$2,600!</strong></span>
                </p>
                <p className="flex items-start gap-3">
                  <svg className="h-6 w-6 text-green-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Automated tracking and AI-powered valuations - done in minutes</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="how-it-works" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-purple-400">
              How It Works
            </h2>
            <p className="mt-2 text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent sm:text-5xl">
              Three Ways to Calculate Your Tax Savings
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">

              {/* 50/20/0 Method */}
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 backdrop-blur-sm p-8 transition-all hover:scale-105 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20">
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-purple-500/5 blur-2xl group-hover:bg-purple-500/10 transition-colors"></div>
                <dt className="relative flex items-center gap-x-3 text-lg font-semibold text-white">
                  <div className="rounded-lg bg-purple-500/10 border border-purple-500/20 p-3">
                    <svg className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  50/20/0% Method
                </dt>
                <dd className="relative mt-4 text-base leading-7 text-gray-400">
                  Industry-standard valuation: 50% for name brands, 20% for off-brands, 0% for consumables. Simple, fast, and IRS-accepted. Add notes about item condition, whether it was consumed or destroyed during testing, and track donation or disposal dates.
                </dd>
                <div className="mt-6">
                  <span className="inline-block rounded-full bg-green-500/10 border border-green-500/20 px-3 py-1 text-sm text-green-400 font-semibold">
                    FREE Forever
                  </span>
                </div>
              </div>

              {/* AI-Powered ZTV */}
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-800/50 to-cyan-900/50 border-2 border-cyan-500/50 backdrop-blur-sm p-8 transition-all hover:scale-105 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/30">
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-cyan-500/10 blur-2xl group-hover:bg-cyan-500/20 transition-colors"></div>
                <div className="absolute top-4 right-4">
                  <span className="inline-block rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 px-3 py-1 text-xs font-bold text-gray-900">
                    MOST POPULAR
                  </span>
                </div>
                <dt className="relative flex items-center gap-x-3 text-lg font-semibold text-white">
                  <div className="rounded-lg bg-cyan-500/10 border border-cyan-500/20 p-3">
                    <svg className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  AI-Powered ZTV
                </dt>
                <dd className="relative mt-4 text-base leading-7 text-gray-300">
                  <strong className="text-white">ZTV:</strong> This is our own AI-powered ZeroETV estimated tax value. We analyze Amazon price history, used market prices, and real sales data to give you the most accurate, defensible valuation. You can use the ZTV, or use it as a data point to come up with your own value.
                </dd>
                <div className="mt-6 space-y-2">
                  <p className="text-sm text-cyan-300 flex items-center gap-2">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Historical price tracking
                  </p>
                  <p className="text-sm text-cyan-300 flex items-center gap-2">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Multiple data sources
                  </p>
                  <p className="text-sm text-cyan-300 flex items-center gap-2">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Upload photos of items for sale elsewhere
                  </p>
                  <p className="text-sm text-cyan-300 flex items-center gap-2">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Track donation and disposal dates
                  </p>
                  <p className="text-sm text-cyan-300 flex items-center gap-2">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Audit-ready documentation
                  </p>
                </div>
                <div className="mt-6">
                  <span className="inline-block rounded-full bg-cyan-500/20 border border-cyan-500/40 px-3 py-1 text-sm text-cyan-300 font-semibold">
                    Premium Feature
                  </span>
                </div>
              </div>

              {/* Custom Values */}
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 backdrop-blur-sm p-8 transition-all hover:scale-105 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20">
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-purple-500/5 blur-2xl group-hover:bg-purple-500/10 transition-colors"></div>
                <dt className="relative flex items-center gap-x-3 text-lg font-semibold text-white">
                  <div className="rounded-lg bg-purple-500/10 border border-purple-500/20 p-3">
                    <svg className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  Custom Values
                </dt>
                <dd className="relative mt-4 text-base leading-7 text-gray-400">
                  Have your own research or CPA recommendations? Manually set values for specific items and track them alongside automated valuations.
                </dd>
                <div className="mt-6">
                  <span className="inline-block rounded-full bg-green-500/10 border border-green-500/20 px-3 py-1 text-sm text-green-400 font-semibold">
                    FREE Forever
                  </span>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Additional Features */}
      <div className="py-24 sm:py-32 bg-gradient-to-b from-gray-900/50 to-transparent">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-purple-400">
              Everything You Need
            </h2>
            <p className="mt-2 text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent sm:text-5xl">
              Built for Amazon Vine Reviewers
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-2">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-green-500/10 border border-green-500/20">
                  <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <div>
                  <dt className="text-lg font-semibold text-white">Excel Import</dt>
                  <dd className="mt-2 text-base text-gray-400">
                    Upload your Vine order history from Excel and we'll automatically import everything.
                  </dd>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-green-500/10 border border-green-500/20">
                  <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <dt className="text-lg font-semibold text-white">Statistics Dashboard</dt>
                  <dd className="mt-2 text-base text-gray-400">
                    Visualize your orders, tax liability, and savings over time with beautiful charts.
                  </dd>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-green-500/10 border border-green-500/20">
                  <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <dt className="text-lg font-semibold text-white">Tax Reports</dt>
                  <dd className="mt-2 text-base text-gray-400">
                    Generate CPA-friendly reports with supporting documentation for your tax filing.
                  </dd>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-green-500/10 border border-green-500/20">
                  <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <dt className="text-lg font-semibold text-white">Audit Protection</dt>
                  <dd className="mt-2 text-base text-gray-400">
                    All valuations include methodology documentation and data sources for IRS defense.
                  </dd>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="relative isolate py-24 sm:py-32">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-purple-900/30 via-cyan-900/30 to-purple-900/30"></div>
        <div className="px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent sm:text-6xl">
              Ready to Stop Overpaying?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-xl leading-8 text-gray-300">
              Join thousands of Amazon Vine reviewers who are using ZeroETV to save thousands on their taxes every year. Get started free in under 2 minutes.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/signup"
                className="inline-block rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 px-12 py-6 text-xl font-bold text-white shadow-2xl shadow-green-500/25 transition-all hover:shadow-3xl hover:shadow-green-500/40 hover:scale-105 w-full sm:w-auto text-center"
              >
                Create Free Account
              </Link>
            </div>
            <p className="mt-6 text-sm text-gray-500">
              Already have an account? <Link href="/signin" className="text-purple-400 hover:text-purple-300 font-semibold">Sign in</Link>
            </p>
            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Free forever plan
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Cancel anytime
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-950">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Disclaimers */}
            <div className="lg:col-span-2">
              <h3 className="text-sm font-semibold text-gray-400 mb-4">Important Disclaimers</h3>
              <div className="space-y-3 text-xs text-gray-500">
                <p>
                  <strong className="text-gray-400">Not Tax or Legal Advice:</strong> ZeroETV provides software tools for tracking and calculating fair market values. We do not provide tax, legal, or financial advice. Please consult with a qualified tax professional or CPA regarding your specific tax situation.
                </p>
                <p>
                  <strong className="text-gray-400">Not Affiliated with Amazon:</strong> ZeroETV is an independent third-party service and is not affiliated with, endorsed by, or sponsored by Amazon.com, Inc. or Amazon Vine. Amazon and Amazon Vine are trademarks of Amazon.com, Inc. or its affiliates.
                </p>
                <p>
                  <strong className="text-gray-400">Your Responsibility:</strong> Users are solely responsible for the accuracy of their tax reporting and compliance with applicable tax laws. ZeroETV provides valuation tools and methodologies, but final tax reporting decisions rest with you and your tax advisor.
                </p>
              </div>
            </div>

            {/* Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-400 mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/terms" className="text-gray-500 hover:text-gray-300 transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-500 hover:text-gray-300 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 border-t border-gray-800 pt-8">
            <p className="text-xs text-gray-600 text-center">
              © {new Date().getFullYear()} ZeroETV. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
