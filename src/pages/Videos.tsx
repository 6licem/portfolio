import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import VideoGallery from '../components/VideoGallery';

export default function Videos() {
  return (
    <div className="min-h-screen bg-stone-950">
      <Navigation />

      <main className="pt-24 pb-16 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">
              <span className="text-gradient-gold">Video Gallery</span>
            </h1>
            <p className="text-xl text-stone-400 max-w-2xl mx-auto">
              Explore my latest video content and operational breakdowns.
            </p>
          </div>

          <div>
            <VideoGallery />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
