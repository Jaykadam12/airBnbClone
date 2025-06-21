function Footer() {
  return (
    <footer className="bg-[#F7F7F7] text-sm text-gray-700 border-t">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="font-semibold mb-2">Support</h3>
          <ul className="space-y-1">
            <li>Help Centre</li>
            <li>AirCover</li>
            <li>Anti-discrimination</li>
            <li>Disability support</li>
            <li>Cancellation options</li>
            <li>Report neighbourhood concern</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Hosting</h3>
          <ul className="space-y-1">
            <li>Airbnb your home</li>
            <li>AirCover for Hosts</li>
            <li>Hosting resources</li>
            <li>Community forum</li>
            <li>Hosting responsibly</li>
            <li>Join a free Hosting class</li>
            <li>Find a co-host</li>
          </ul>
        </div>
        <div className="hidden md:block">
          <h3 className="font-semibold mb-2">Airbnb</h3>
          <ul className="space-y-1">
            <li>2025 Summer Release</li>
            <li>Newsroom</li>
            <li>New features</li>
            <li>Careers</li>
            <li>Investors</li>
            <li>Airbnb.org emergency stays</li>
          </ul>
        </div>
      </div>

      <div className="border-t py-4 px-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-2">
        <div className="flex flex-wrap gap-2">
          <span>© 2025 Airbnb, Inc.</span>
          <span>·</span>
          <a href="#">Privacy</a>
          <span>·</span>
          <a href="#">Terms</a>
          <span>·</span>
          <a href="#">Sitemap</a>
          <span>·</span>
          <a href="#">Company details</a>
        </div>
        <div className="flex items-center gap-4">
          <span>🌐 English (IN)</span>
          <span>₹ INR</span>
          <span>🔘</span>
          <span>📘</span>
          <span>📸</span>
        </div>
      </div>
    </footer>
  );
}
export default Footer;