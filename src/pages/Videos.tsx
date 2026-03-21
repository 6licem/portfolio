import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import VideoGallery from '../components/VideoGallery';

export default function Videos() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Video Gallery
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore my video content
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
