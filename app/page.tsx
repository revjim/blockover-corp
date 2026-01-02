import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-32 lg:px-8">
        {/* Animated background gradients */}
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-purple-600 to-cyan-600 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>
        <div className="absolute inset-x-0 top-[calc(100%-30rem)] -z-10 transform-gpu overflow-hidden blur-3xl">
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-cyan-600 to-purple-600 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <div className="mb-8 inline-block">
              <span className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 border border-purple-500/20 px-4 py-2 text-sm font-medium text-purple-400">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Enterprise-Grade Solutions
              </span>
            </div>
            <h1 className="text-6xl font-bold tracking-tight bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent sm:text-8xl">
              Delivering Value Through Innovation
            </h1>
            <p className="mt-8 text-xl leading-8 text-gray-300 sm:text-2xl">
              Blockover Corp provides enterprise-grade project management
              solutions that drive measurable results for our clients and
              stakeholders. We transform complexity into opportunity.
            </p>
            <div className="mt-12 flex items-center justify-center gap-x-6">
              <Link
                href="/signin"
                className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 px-8 py-4 text-lg font-semibold text-white shadow-2xl shadow-purple-500/25 transition-all hover:shadow-3xl hover:shadow-purple-500/40 hover:scale-105"
              >
                <span className="relative z-10">Get Started</span>
              </Link>
              <Link
                href="/#about"
                className="group flex items-center gap-2 text-lg font-semibold text-gray-300 hover:text-white transition-colors"
              >
                Learn more
                <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Solutions Section */}
      <div id="solutions" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-purple-400">
              Enterprise Solutions
            </h2>
            <p className="mt-2 text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent sm:text-5xl">
              Comprehensive Project Management
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-400">
              Our integrated platform delivers the tools and insights you need
              to manage complex projects, optimize resources, and drive
              shareholder value.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 backdrop-blur-sm p-8 transition-all hover:scale-105 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20">
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-purple-500/5 blur-2xl group-hover:bg-purple-500/10 transition-colors"></div>
                <dt className="relative flex items-center gap-x-3 text-lg font-semibold text-white">
                  <div className="rounded-lg bg-purple-500/10 border border-purple-500/20 p-3">
                    <svg className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  Strategic Planning
                </dt>
                <dd className="relative mt-4 text-base leading-7 text-gray-400">
                  Align your projects with organizational goals through our
                  comprehensive strategic planning tools and methodologies.
                </dd>
              </div>
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 backdrop-blur-sm p-8 transition-all hover:scale-105 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/20">
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-cyan-500/5 blur-2xl group-hover:bg-cyan-500/10 transition-colors"></div>
                <dt className="relative flex items-center gap-x-3 text-lg font-semibold text-white">
                  <div className="rounded-lg bg-cyan-500/10 border border-cyan-500/20 p-3">
                    <svg className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  Resource Optimization
                </dt>
                <dd className="relative mt-4 text-base leading-7 text-gray-400">
                  Maximize efficiency and ROI with intelligent resource
                  allocation and real-time performance tracking.
                </dd>
              </div>
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 backdrop-blur-sm p-8 transition-all hover:scale-105 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20">
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-purple-500/5 blur-2xl group-hover:bg-purple-500/10 transition-colors"></div>
                <dt className="relative flex items-center gap-x-3 text-lg font-semibold text-white">
                  <div className="rounded-lg bg-purple-500/10 border border-purple-500/20 p-3">
                    <svg className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  Analytics & Reporting
                </dt>
                <dd className="relative mt-4 text-base leading-7 text-gray-400">
                  Make data-driven decisions with advanced analytics and
                  customizable reporting dashboards.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent sm:text-5xl">
              About Blockover Corp
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-400">
              We are committed to delivering exceptional value to our clients
              and stakeholders through innovative project management solutions.
              Our platform empowers enterprises to execute with precision,
              adapt to change, and achieve their strategic objectives.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8">
            <div className="rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 backdrop-blur-sm p-8 transition-all hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10">
              <h3 className="text-lg font-semibold text-white">
                Client-Centric Approach
              </h3>
              <p className="mt-4 text-base leading-7 text-gray-400">
                We prioritize our clients success through dedicated support
                and tailored solutions that address unique business
                challenges.
              </p>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 backdrop-blur-sm p-8 transition-all hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10">
              <h3 className="text-lg font-semibold text-white">
                Proven Methodology
              </h3>
              <p className="mt-4 text-base leading-7 text-gray-400">
                Our time-tested frameworks and best practices ensure
                consistent delivery and measurable outcomes across all
                projects.
              </p>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 backdrop-blur-sm p-8 transition-all hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10">
              <h3 className="text-lg font-semibold text-white">
                Continuous Innovation
              </h3>
              <p className="mt-4 text-base leading-7 text-gray-400">
                We invest in cutting-edge technology and processes to keep
                our clients ahead of the competition.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative isolate py-24 sm:py-32">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-purple-900/20 via-cyan-900/20 to-purple-900/20"></div>
        <div className="px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent sm:text-5xl">
              Ready to transform your project management?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              Join leading enterprises who trust Blockover Corp to deliver
              value and drive success.
            </p>
            <div className="mt-10">
              <Link
                href="/signin"
                className="inline-block rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 px-8 py-4 text-lg font-semibold text-white shadow-2xl shadow-purple-500/25 transition-all hover:shadow-3xl hover:shadow-purple-500/40 hover:scale-105"
              >
                Get Started Today
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
