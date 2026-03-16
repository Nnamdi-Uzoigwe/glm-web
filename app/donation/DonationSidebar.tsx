const bankDetails = [
  { label: "Bank Name", value: "First Bank of Nigeria" },
  { label: "Account Name", value: "Gospel Light Ministries" },
  { label: "Account Number", value: "3012345678" },
  { label: "Sort Code", value: "011" },
];

const trustPoints = [
  {
    icon: "🔒",
    title: "Secure Giving",
    text: "All transactions are SSL encrypted and PCI-DSS compliant.",
  },
  {
    icon: "📄",
    title: "Tax Deductible",
    text: "Receipts issued for all gifts. Registered non-profit.",
  },
  {
    icon: "💯",
    title: "100% Accountable",
    text: "Annual financial reports published for transparency.",
  },
];

export default function DonationSidebar() {
  return (
    <div className="flex flex-col gap-6">
      {/* Bank Transfer */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-serif text-[#1B3A6B] text-lg mb-1">Bank Transfer</h3>
        <p className="text-gray-400 text-xs mb-5">
          Prefer to give directly? Use the details below.
        </p>
        <div className="space-y-3">
          {bankDetails.map((d) => (
            <div key={d.label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <span className="text-xs text-gray-400">{d.label}</span>
              <span className="text-sm font-semibold text-gray-700 font-mono">{d.value}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-300 mt-4">
          Please use your full name as payment reference so we can acknowledge your gift.
        </p>
      </div>

      {/* Trust signals */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-serif text-[#1B3A6B] text-lg mb-5">Why Give With Us</h3>
        <div className="space-y-4">
          {trustPoints.map((pt) => (
            <div key={pt.title} className="flex items-start gap-3">
              <span className="text-xl leading-none mt-0.5">{pt.icon}</span>
              <div>
                <p className="text-sm font-semibold text-gray-700">{pt.title}</p>
                <p className="text-xs text-gray-400 leading-relaxed">{pt.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial */}
      <div className="bg-[#1B3A6B] rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-28 h-28 rounded-full bg-white/5 translate-x-1/3 -translate-y-1/3" />
        <span className="text-4xl font-serif text-[#C9902A] leading-none block mb-3">"</span>
        <p className="text-white/80 text-sm leading-relaxed italic mb-5">
          Giving to GLM has been one of the most rewarding decisions of my life. I've seen
          the impact firsthand — souls saved, families restored. I give faithfully every month.
        </p>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#C9902A]/30 flex items-center justify-center text-white font-bold text-sm shrink-0">
            TK
          </div>
          <div>
            <p className="text-white text-sm font-semibold">Tunde K.</p>
            <p className="text-white/40 text-xs">Monthly partner since 2021</p>
          </div>
        </div>
      </div>

      {/* Other ways to give */}
      <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6">
        <h3 className="font-serif text-[#1B3A6B] text-base mb-3">Other Ways to Give</h3>
        <ul className="space-y-2 text-sm text-gray-500">
          <li className="flex items-center gap-2">
            <span className="text-[#C9902A]">→</span>
            <span>In person at any Sunday service</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[#C9902A]">→</span>
            <span>Cheque payable to Gospel Light Ministries</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[#C9902A]">→</span>
            <span>Legacy & estate giving — contact us</span>
          </li>
        </ul>
      </div>
    </div>
  );
}