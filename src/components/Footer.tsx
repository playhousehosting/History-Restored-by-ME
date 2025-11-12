export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">History Restored by ME</h3>
            <p className="text-sm md:text-base text-gray-400">
              Specializes in Farmall but Can Fix Them All!!!
            </p>
            <p className="text-sm md:text-base text-gray-400 mt-2">
              Professional tractor restoration services.
            </p>
          </div>
          
          <div>
            <h4 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-sm md:text-base text-gray-400 hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/gallery" className="text-sm md:text-base text-gray-400 hover:text-white transition">
                  Gallery
                </a>
              </li>
              <li>
                <a href="/blog" className="text-sm md:text-base text-gray-400 hover:text-white transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="/contact" className="text-sm md:text-base text-gray-400 hover:text-white transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Contact</h4>
            <p className="text-sm md:text-base text-gray-400">
              For inquiries about restoration services, please reach out through our contact form.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-gray-400">
          <p className="text-sm md:text-base">&copy; {new Date().getFullYear()} History Restored by ME. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
