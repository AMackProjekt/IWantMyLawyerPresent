import { motion } from 'framer-motion';
import { ShieldCheck, PhoneCall, ShoppingCart, WalletCards } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../useCart';

export default function LegalRightsWalletCard() {
  const { addToCart } = useCart();
  const walletCard = products.find((product) => product.id === 'prod-005');

  if (!walletCard) {
    return null;
  }

  return (
    <section id="wallet-card" className="py-20 bg-slate-100">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-100 text-primary-700 px-4 py-1 text-sm font-semibold mb-4">
              <ShieldCheck className="w-4 h-4" />
              New Resource Drop
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              Legal Rights Wallet Card
            </h2>
            <p className="text-lg text-slate-700 mb-6 max-w-xl">
              Instant digital download built for real moments. Add it to your
              phone wallet so key legal-rights reminders are available anytime.
            </p>

            <ul className="space-y-2 text-slate-700 mb-7">
              <li>Instant PDF + mobile wallet pass delivery</li>
              <li>Apple Wallet, Google Wallet, Samsung Wallet compatible</li>
              <li>Miranda quick reference + traffic stop reminders</li>
            </ul>

            <div className="flex flex-wrap items-center gap-4">
              <span className="text-4xl font-bold text-primary-700">
                ${walletCard.price.toFixed(2)}
              </span>
              <button
                onClick={() => addToCart(walletCard)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-700 text-white font-semibold rounded-lg hover:bg-primary-800 transition-colors"
              >
                <ShoppingCart className="w-4 h-4" />
                Add Digital Download
              </button>
              <a
                href="/api/wallet/know-your-rights/pass"
                className="inline-flex items-center gap-2 px-6 py-3 border border-primary-700 text-primary-700 font-semibold rounded-lg hover:bg-primary-50 transition-colors"
              >
                <WalletCards className="w-4 h-4" />
                Add to Apple Wallet
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid sm:grid-cols-2 gap-5"
          >
            <div className="relative rounded-2xl shadow-xl min-h-56 overflow-hidden border border-primary-200 bg-gradient-to-br from-slate-900 via-primary-950 to-slate-800 text-white p-5">
              <div className="absolute top-3 right-3 text-[10px] uppercase tracking-[0.16em] text-yellow-300/90">
                Front
              </div>
              <div className="text-[11px] uppercase tracking-[0.16em] text-yellow-300/90 mb-3">Know Your Rights</div>
              <h3 className="text-lg font-bold leading-tight">If stopped by police:</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-100/95">
                <li>1. Ask: "Am I free to leave?"</li>
                <li>2. Say: "I want a lawyer."</li>
                <li>3. Say: "I do not consent to searches."</li>
              </ul>
              <div className="mt-4 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-xs text-slate-100/90">
                Keep this card accessible for fast reference.
              </div>
            </div>

            <div className="rounded-2xl p-5 shadow-xl bg-white border border-slate-200 min-h-56">
              <p className="text-xs uppercase tracking-widest text-slate-500 mb-3">
                Back
              </p>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Emergency Script</h3>
              <p className="text-sm text-slate-700 leading-relaxed mb-4">
                Officer, I am invoking my right to remain silent. I want to speak
                with a lawyer. I do not consent to any searches.
              </p>
              <div className="flex items-center gap-2 text-slate-700 mb-2">
                <PhoneCall className="w-4 h-4" />
                <span className="text-sm">Attorney Contact Slot</span>
              </div>
              <p className="text-sm text-slate-600">
                Stay calm. Keep hands visible. Do not run. Use only the script above.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}