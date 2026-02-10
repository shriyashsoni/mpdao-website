export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 px-6 py-12 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700" />
              <span className="text-lg font-bold text-slate-900">MPDAO</span>
            </div>
            <p className="text-sm text-slate-600">
              Decentralized portfolio management for communities.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-slate-900">Product</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-slate-600 hover:text-slate-900">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-600 hover:text-slate-900">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-600 hover:text-slate-900">
                  Security
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-slate-900">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-slate-600 hover:text-slate-900">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-600 hover:text-slate-900">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-600 hover:text-slate-900">
                  Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-slate-900">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-slate-600 hover:text-slate-900">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-600 hover:text-slate-900">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-600 hover:text-slate-900">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8">
          <p className="text-center text-sm text-slate-600">
            © 2024 MPDAO. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
