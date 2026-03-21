import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, CheckCircle2 } from 'lucide-react';
import Footer from '../components/Footer';

const BookConsultation = () => {
  return (
    <div className="min-h-screen bg-stone-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 pt-24 sm:pt-32">
        <Link to="/" className="inline-flex items-center gap-2 text-stone-400 hover:text-white transition-colors mb-12">
          <ArrowLeft size={20} />
          Go Back
        </Link>

        <div className="text-center mb-8 sm:mb-12 px-4">
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-3 sm:mb-4">
            Book Your <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">Free Call</span>
          </h1>
          <p className="text-lg sm:text-xl text-stone-300">Let's discuss how we can optimize your operations</p>
        </div>

        <div className="bg-gradient-to-br from-stone-800/60 via-stone-800/30 to-stone-900/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-12 border border-stone-600/20 shadow-2xl mx-4">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div className="space-y-5 sm:space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">What to Expect</h3>

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg p-2 sm:p-3 flex-shrink-0">
                  <Clock size={20} className="text-white sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1 text-sm sm:text-base">30-Minute Strategy Call</h4>
                  <p className="text-stone-300 text-xs sm:text-sm">Focused discussion on your operational challenges</p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg p-2 sm:p-3 flex-shrink-0">
                  <CheckCircle2 size={20} className="text-white sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1 text-sm sm:text-base">Customized Solutions</h4>
                  <p className="text-stone-300 text-xs sm:text-sm">Tailored automation strategies for your business</p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg p-2 sm:p-3 flex-shrink-0">
                  <Calendar size={20} className="text-white sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1 text-sm sm:text-base">Flexible Scheduling</h4>
                  <p className="text-stone-300 text-xs sm:text-sm">Choose a time that works best for you</p>
                </div>
              </div>
            </div>

            <div className="bg-stone-900/50 rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-stone-700/30">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-5 sm:mb-6">Schedule Your Call</h3>

              <form className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-stone-300 mb-2 text-xs sm:text-sm">Full Name</label>
                  <input
                    type="text"
                    className="w-full bg-stone-800/50 border border-stone-600/30 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white text-sm sm:text-base focus:outline-none focus:border-yellow-400/50 transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 mb-2 text-xs sm:text-sm">Email</label>
                  <input
                    type="email"
                    className="w-full bg-stone-800/50 border border-stone-600/30 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white text-sm sm:text-base focus:outline-none focus:border-yellow-400/50 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 mb-2 text-xs sm:text-sm">Company Name</label>
                  <input
                    type="text"
                    className="w-full bg-stone-800/50 border border-stone-600/30 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white text-sm sm:text-base focus:outline-none focus:border-yellow-400/50 transition-colors"
                    placeholder="Your company"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 mb-2 text-xs sm:text-sm">What are your main challenges?</label>
                  <textarea
                    rows={4}
                    className="w-full bg-stone-800/50 border border-stone-600/30 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white text-sm sm:text-base focus:outline-none focus:border-yellow-400/50 transition-colors resize-none"
                    placeholder="Tell us about your operational challenges..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#FDEF3A] to-[#FF9100] hover:from-[#FFD520] hover:to-[#FFA632] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 shadow-2xl hover:shadow-[#FF9100]/50 hover:scale-105"
                  style={{textShadow: '0 1px 3px rgba(0,0,0,0.3)'}}
                >
                  Schedule My Call
                </button>
              </form>
            </div>
          </div>

          <div className="text-center pt-8 border-t border-stone-700/30">
            <p className="text-stone-400 text-sm">
              We'll review your request and get back to you within 24 hours with available time slots.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookConsultation;
