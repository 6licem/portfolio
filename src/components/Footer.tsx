const Footer = () => {
  const legalLinks = [
    { name: 'Instagram', href: 'https://www.instagram.com/rance.coon/' },
    { name: 'Contact me', href: 'mailto:rancecoonbusiness@gmail.com' }
  ];

  return (
    <footer className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[2px] bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent shadow-lg" style={{boxShadow: '0 0 20px rgba(255, 239, 58, 0.3)'}}></div>

        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[200px] bg-gradient-to-r from-yellow-400/10 to-orange-500/10 rounded-full blur-3xl animate-pulse" style={{animationDuration: '4s'}}></div>

        <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[150px] bg-gradient-to-br from-yellow-400/6 to-orange-500/6 rounded-full blur-2xl animate-pulse" style={{animationDuration: '5s', animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/3 right-1/4 w-[250px] h-[120px] bg-gradient-to-bl from-orange-400/4 to-yellow-300/4 rounded-full blur-2xl animate-pulse" style={{animationDuration: '4.5s', animationDelay: '1.5s'}}></div>

        <div className={`absolute inset-0 opacity-[0.04] bg-[url('data:image/svg+xml,%3Csvg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url%28%23noiseFilter%29"/%3E%3C/svg%3E')]`}></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="relative z-10">
        <div className="flex flex-col items-center">
          <div className="flex flex-wrap justify-center gap-x-8 sm:gap-x-10 gap-y-4 mb-8 sm:mb-10 pb-8 sm:pb-10 border-b border-stone-700/40">
            {legalLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-white hover:scale-105 transition-all duration-300 text-sm sm:text-base font-medium hover:text-yellow-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="text-stone-400 text-center">
            <p className="text-sm sm:text-base font-light hover:text-stone-300 transition-colors duration-300">&copy; 2025 Rance Coon</p>
          </div>
        </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
