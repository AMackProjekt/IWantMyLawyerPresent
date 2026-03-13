import { motion } from 'framer-motion';
import { ShieldCheck, PhoneCall, ShoppingCart } from 'lucide-react';
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
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid sm:grid-cols-2 gap-5"
          >
            <div className="relative rounded-2xl shadow-xl min-h-56 overflow-hidden border border-primary-200">
              <img
                src={walletCard.image}
                alt="Legal Rights Wallet Card protected preview"
                className="h-full w-full object-cover blur-md scale-110 select-none pointer-events-none"
                loading="lazy"
                draggable={false}
              />
              <div className="absolute inset-0 bg-primary-950/35 flex flex-col items-center justify-center text-white">
                <p className="text-xs uppercase tracking-widest mb-2">Front</p>
                <p className="text-sm font-semibold px-3 py-1 rounded-full bg-black/55">
                  Hard Card Preview Only
                </p>
              </div>
            </div>

            <div className="rounded-2xl p-5 shadow-xl bg-white border border-slate-200 min-h-56">
              <p className="text-xs uppercase tracking-widest text-slate-500 mb-3">
                Back
              </p>
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Emergency Prompt
              </h3>
              <div className="flex items-center gap-2 text-slate-700 mb-2">
                <PhoneCall className="w-4 h-4" />
                <span className="text-sm">Attorney Contact Slot</span>
              </div>
              <p className="text-sm text-slate-600">
                Durable layout designed for wallets, gloveboxes, and backpacks.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}