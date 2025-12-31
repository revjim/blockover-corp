import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#1a1a1a] to-[#4a4a4a] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
              Delivering Value Through Innovation
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
              Blockover Corp provides enterprise-grade project management
              solutions that drive measurable results for our clients and
              stakeholders. We transform complexity into opportunity.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/signin"
                className="rounded-md bg-gray-900 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
              >
                Get Started
              </Link>
              <Link
                href="/#about"
                className="text-base font-semibold leading-6 text-gray-900"
              >
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Solutions Section */}
      <div id="solutions" className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Enterprise Solutions
            </h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Comprehensive Project Management
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our integrated platform delivers the tools and insights you need
              to manage complex projects, optimize resources, and drive
              shareholder value.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <svg
                    className="h-5 w-5 flex-none text-gray-900"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Strategic Planning
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Align your projects with organizational goals through our
                    comprehensive strategic planning tools and methodologies.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <svg
                    className="h-5 w-5 flex-none text-gray-900"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Resource Optimization
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Maximize efficiency and ROI with intelligent resource
                    allocation and real-time performance tracking.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <svg
                    className="h-5 w-5 flex-none text-gray-900"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Analytics & Reporting
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Make data-driven decisions with advanced analytics and
                    customizable reporting dashboards.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              About Blockover Corp
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We are committed to delivering exceptional value to our clients
              and stakeholders through innovative project management solutions.
              Our platform empowers enterprises to execute with precision,
              adapt to change, and achieve their strategic objectives.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8">
            <div className="flex gap-x-4 rounded-xl bg-gray-50 p-6">
              <div className="text-base leading-7">
                <h3 className="font-semibold text-gray-900">
                  Client-Centric Approach
                </h3>
                <p className="mt-2 text-gray-600">
                  We prioritize our clients success through dedicated support
                  and tailored solutions that address unique business
                  challenges.
                </p>
              </div>
            </div>
            <div className="flex gap-x-4 rounded-xl bg-gray-50 p-6">
              <div className="text-base leading-7">
                <h3 className="font-semibold text-gray-900">
                  Proven Methodology
                </h3>
                <p className="mt-2 text-gray-600">
                  Our time-tested frameworks and best practices ensure
                  consistent delivery and measurable outcomes across all
                  projects.
                </p>
              </div>
            </div>
            <div className="flex gap-x-4 rounded-xl bg-gray-50 p-6">
              <div className="text-base leading-7">
                <h3 className="font-semibold text-gray-900">
                  Continuous Innovation
                </h3>
                <p className="mt-2 text-gray-600">
                  We invest in cutting-edge technology and processes to keep
                  our clients ahead of the competition.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Ready to transform your project management?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              Join leading enterprises who trust Blockover Corp to deliver
              value and drive success.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/signin"
                className="rounded-md bg-white px-6 py-3 text-base font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
