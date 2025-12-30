import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              Company
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  href="/#about"
                  className="text-base text-gray-300 hover:text-white"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/#solutions"
                  className="text-base text-gray-300 hover:text-white"
                >
                  Solutions
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              Legal
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  href="/privacy"
                  className="text-base text-gray-300 hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-base text-gray-300 hover:text-white"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              Blockover Corp
            </h3>
            <p className="mt-4 text-base text-gray-300">
              Delivering exceptional value through innovative project management
              and business solutions for enterprises worldwide.
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8">
          <p className="text-center text-base text-gray-400">
            &copy; {new Date().getFullYear()} Blockover Corp. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
