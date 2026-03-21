import { X } from 'lucide-react';

interface PackageDetails {
  name: string;
  monthlyPrice: string;
  yearlyPrice: string;
  yearlySavings: string;
  operationalCostMonthly: string;
  operationalCostYearly: string;
  profitMonthly: string;
  profitYearly: string;
  adminSeats: string;
  features: string[];
  addOns?: string[];
  videoUrl?: string;
  description?: string;
}

interface PackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  package: PackageDetails | null;
  allPackages?: PackageDetails[];
}

const PackageModal = ({ isOpen, onClose, package: pkg, allPackages }: PackageModalProps) => {
  if (!isOpen || !pkg) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-stone-800/95 via-stone-800/90 to-stone-900/95 backdrop-blur-2xl rounded-3xl border-2 border-yellow-400/30 shadow-2xl">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>

        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-stone-400 hover:text-white hover:bg-stone-700/50 rounded-lg transition-all duration-300 z-10"
        >
          <X size={24} />
        </button>

        <div className="p-8 sm:p-12">
          <div className="text-center mb-8">
            <h3 className="text-3xl sm:text-5xl font-bold text-white mb-6">
              {pkg.name}
            </h3>
            <div className="inline-block px-6 py-3 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full border border-yellow-400/30">
              <span className="text-yellow-400 font-semibold text-base">Custom Pricing Available</span>
            </div>
            <p className="text-stone-400 text-base mt-4">Book a call to discuss pricing tailored to your needs</p>
          </div>

          {pkg.description && (
            <div className="mb-8">
              <div className="relative p-6 bg-gradient-to-br from-yellow-400/5 to-orange-500/5 rounded-2xl border border-yellow-400/20">
                <div className="absolute top-0 left-6 w-12 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 -mt-px"></div>
                <p className="text-stone-200 text-lg leading-relaxed">{pkg.description}</p>
              </div>
            </div>
          )}

          {pkg.videoUrl && (
            <div className="mb-8">
              <div className="relative group/video">
                <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400/20 via-orange-500/20 to-yellow-400/20 rounded-2xl blur-xl opacity-50 group-hover/video:opacity-100 transition-opacity duration-500"></div>
                <div className="relative rounded-xl overflow-hidden shadow-2xl border-2 border-yellow-400/30">
                  <iframe
                    src={pkg.videoUrl}
                    className="w-full aspect-video"
                    title={`${pkg.name} Overview Video`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          )}

          <div className="bg-gradient-to-br from-stone-800/50 to-stone-900/50 rounded-2xl p-6 border border-stone-600/30 mb-8">
            <h4 className="text-white font-bold text-xl mb-4 flex items-center gap-3">
              <div className="w-1 h-6 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"></div>
              Admin Seats
            </h4>
            <p className="text-stone-300 text-lg">{pkg.adminSeats}</p>
          </div>

          <div className="bg-gradient-to-br from-stone-800/50 to-stone-900/50 rounded-2xl p-6 border border-stone-600/30 mb-8">
            <h4 className="text-white font-bold text-xl mb-4 flex items-center gap-3">
              <div className="w-1 h-6 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"></div>
              All Features
            </h4>
            {pkg.description && (
              <p className="text-stone-300 text-base mb-6 leading-relaxed">{pkg.description}</p>
            )}
            <ul className="space-y-3">
              {pkg.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3 text-stone-300 text-base">
                  <span className="w-2 h-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-yellow-400/50"></span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {allPackages && allPackages.length > 0 && (
            <div className="bg-gradient-to-br from-yellow-400/5 via-orange-500/5 to-stone-900/50 rounded-2xl p-6 border border-yellow-400/30 mb-8">
              <h4 className="text-white font-bold text-xl mb-6 flex items-center gap-3">
                <div className="w-1 h-6 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"></div>
                Plan Comparison
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-stone-600/50">
                      <th className="py-3 px-4 text-stone-400 font-semibold text-sm">Feature</th>
                      {allPackages.map((plan, index) => (
                        <th key={index} className={`py-3 px-4 font-bold text-sm ${plan.name === pkg.name ? 'text-yellow-400' : 'text-stone-300'}`}>
                          {plan.name.replace(' Plan', '')}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-stone-600/30">
                      <td className="py-3 px-4 text-stone-300 text-sm font-medium">Admin Seats</td>
                      {allPackages.map((plan, index) => (
                        <td key={index} className={`py-3 px-4 text-sm ${plan.name === pkg.name ? 'text-yellow-400 font-bold' : 'text-stone-300'}`}>
                          {plan.adminSeats}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-stone-600/30">
                      <td className="py-3 px-4 text-stone-300 text-sm font-medium">Project Management</td>
                      {allPackages.map((plan, index) => (
                        <td key={index} className={`py-3 px-4 text-sm ${plan.name === pkg.name ? 'text-yellow-400 font-bold' : 'text-stone-300'}`}>
                          {plan.features.includes('Full Project Management System') ? '✓' : '—'}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-stone-600/30">
                      <td className="py-3 px-4 text-stone-300 text-sm font-medium">Management Board</td>
                      {allPackages.map((plan, index) => (
                        <td key={index} className={`py-3 px-4 text-sm ${plan.name === pkg.name ? 'text-yellow-400 font-bold' : 'text-stone-300'}`}>
                          {plan.features.includes('Management Board') ? '✓' : '—'}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-stone-600/30">
                      <td className="py-3 px-4 text-stone-300 text-sm font-medium">Creator's Workspace</td>
                      {allPackages.map((plan, index) => (
                        <td key={index} className={`py-3 px-4 text-sm ${plan.name === pkg.name ? 'text-yellow-400 font-bold' : 'text-stone-300'}`}>
                          {plan.features.some(f => f.includes("Creator's Workspace")) ? '✓' : '—'}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-stone-600/30">
                      <td className="py-3 px-4 text-stone-300 text-sm font-medium">Data Tracking</td>
                      {allPackages.map((plan, index) => (
                        <td key={index} className={`py-3 px-4 text-sm ${plan.name === pkg.name ? 'text-yellow-400 font-bold' : 'text-stone-300'}`}>
                          {plan.features.includes('Data Tracking') ? '✓' : '—'}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-stone-600/30">
                      <td className="py-3 px-4 text-stone-300 text-sm font-medium">Financial Reports</td>
                      {allPackages.map((plan, index) => (
                        <td key={index} className={`py-3 px-4 text-sm ${plan.name === pkg.name ? 'text-yellow-400 font-bold' : 'text-stone-300'}`}>
                          {plan.features.includes('Monthly P&L Statement') ? '✓' : '—'}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-stone-600/30">
                      <td className="py-3 px-4 text-stone-300 text-sm font-medium">Communication System</td>
                      {allPackages.map((plan, index) => (
                        <td key={index} className={`py-3 px-4 text-sm ${plan.name === pkg.name ? 'text-yellow-400 font-bold' : 'text-stone-300'}`}>
                          {plan.features.includes('Full Communication System') ? '✓' : '—'}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-stone-600/30">
                      <td className="py-3 px-4 text-stone-300 text-sm font-medium">Discord Server</td>
                      {allPackages.map((plan, index) => (
                        <td key={index} className={`py-3 px-4 text-sm ${plan.name === pkg.name ? 'text-yellow-400 font-bold' : 'text-stone-300'}`}>
                          {plan.features.some(f => f.includes('Discord')) ? '✓' : '—'}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-stone-600/30">
                      <td className="py-3 px-4 text-stone-300 text-sm font-medium">Priority Support</td>
                      {allPackages.map((plan, index) => (
                        <td key={index} className={`py-3 px-4 text-sm ${plan.name === pkg.name ? 'text-yellow-400 font-bold' : 'text-stone-300'}`}>
                          {plan.features.includes('Priority Support') ? '✓' : '—'}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-stone-300 text-sm font-medium">Custom Tailored</td>
                      {allPackages.map((plan, index) => (
                        <td key={index} className={`py-3 px-4 text-sm ${plan.name === pkg.name ? 'text-yellow-400 font-bold' : 'text-stone-300'}`}>
                          {plan.features.some(f => f.includes('tailored')) ? '✓' : '—'}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {pkg.addOns && pkg.addOns.length > 0 && (
            <div className="bg-gradient-to-br from-yellow-400/10 via-orange-500/5 to-stone-900/50 rounded-2xl p-6 border border-yellow-400/30">
              <h4 className="text-white font-bold text-xl mb-6 flex items-center gap-3">
                <div className="w-1 h-6 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"></div>
                Optional Add-Ons
              </h4>
              <ul className="space-y-3">
                {pkg.addOns.map((addOn, index) => (
                  <li key={index} className="flex items-start gap-3 text-stone-300 text-base">
                    <span className="w-2 h-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-yellow-400/50"></span>
                    <span>{addOn}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PackageModal;
