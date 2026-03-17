import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CreditCard,
  Lock,
  CheckCircle,
  AlertCircle,
  ShoppingBag,
  Download,
  Smartphone,
  Wallet,
} from 'lucide-react';
import { useCart } from '../useCart';
import { LINK_NAMESPACES } from '../config/linkNamespaces';

type PaymentMethod = 'card' | 'paypal' | 'zelle' | 'cashapp' | 'applepay' | 'googlewallet';

export default function Checkout() {
  const { items, getTotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [purchasedItemIds, setPurchasedItemIds] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setPurchasedItemIds(items.map((item) => item.product.id));
    setProcessing(false);
    setSuccess(true);
    clearCart();
  };

  const includesWalletCard = purchasedItemIds.includes('prod-005');
  const getPayButtonLabel = () => {
    if (paymentMethod === 'paypal') {
      return 'Continue to PayPal';
    }
    if (paymentMethod === 'zelle') {
      return 'Complete with Zelle';
    }
    if (paymentMethod === 'cashapp') {
      return 'Complete with Cash App';
    }
    if (paymentMethod === 'applepay') {
      return 'Complete with Apple Pay';
    }
    if (paymentMethod === 'googlewallet') {
      return 'Complete with Google Wallet';
    }
    return `Pay $${getTotal().toFixed(2)}`;
  };

  if (success) {
    return (
      <section id="checkout" className="py-20 bg-gray-50 min-h-screen">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-12 text-center"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Order Confirmed!
            </h2>
            <p className="text-gray-600 mb-8">
              Thank you for your purchase. You'll receive a confirmation email
              shortly.
            </p>

            {includesWalletCard && (
              <div className="text-left bg-primary-50 border border-primary-200 rounded-xl p-5 mb-8">
                <h3 className="text-lg font-bold text-primary-900 mb-3">
                  Download + Add to Wallet
                </h3>
                <ol className="space-y-3 text-sm text-primary-900">
                  <li className="flex items-start gap-2">
                    <Download className="w-4 h-4 mt-0.5" />
                    Download your digital wallet card file from the confirmation
                    email link.
                  </li>
                  <li className="flex items-start gap-2">
                    <Smartphone className="w-4 h-4 mt-0.5" />
                    Open the file on your phone and choose Add to Wallet.
                  </li>
                  <li className="flex items-start gap-2">
                    <Wallet className="w-4 h-4 mt-0.5" />
                    Save to Apple Wallet, Google Wallet, or Samsung Wallet for
                    quick access.
                  </li>
                </ol>
              </div>
            )}

            <a
              href="#"
              className="inline-block px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-all"
            >
              Continue Shopping
            </a>
          </motion.div>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section id="checkout" className="py-20 bg-gray-50 min-h-screen">
        <div className="section-container">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-12 text-center">
            <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Add items to your cart to checkout
            </p>
            <a
              href="#shop"
              className="inline-block px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-all"
            >
              Browse Products
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="checkout" className="py-20 bg-gray-50">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Secure Checkout
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Information */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Contact Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Billing Information */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Billing Information
                  </h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          State
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          ZIP
                        </label>
                        <input
                          type="text"
                          name="zip"
                          value={formData.zip}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Payment Method
                  </h2>

                  {/* Payment Method Selection */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-4 border-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                        paymentMethod === 'card'
                          ? 'border-primary-600 bg-primary-50 text-primary-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <CreditCard className="w-5 h-5" />
                      Credit/Debit Card
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('paypal')}
                      className={`p-4 border-2 rounded-lg font-semibold transition-all ${
                        paymentMethod === 'paypal'
                          ? 'border-primary-600 bg-primary-50 text-primary-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      PayPal
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('zelle')}
                      className={`p-4 border-2 rounded-lg font-semibold transition-all ${
                        paymentMethod === 'zelle'
                          ? 'border-primary-600 bg-primary-50 text-primary-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      Zelle
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cashapp')}
                      className={`p-4 border-2 rounded-lg font-semibold transition-all ${
                        paymentMethod === 'cashapp'
                          ? 'border-primary-600 bg-primary-50 text-primary-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      Cash App
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('applepay')}
                      className={`p-4 border-2 rounded-lg font-semibold transition-all ${
                        paymentMethod === 'applepay'
                          ? 'border-primary-600 bg-primary-50 text-primary-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      Apple Pay
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('googlewallet')}
                      className={`p-4 border-2 rounded-lg font-semibold transition-all ${
                        paymentMethod === 'googlewallet'
                          ? 'border-primary-600 bg-primary-50 text-primary-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      Google Wallet
                    </button>
                  </div>

                  {/* Card Payment Form */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Card Number
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                            required={paymentMethod === 'card'}
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            name="expiry"
                            value={formData.expiry}
                            onChange={handleInputChange}
                            required={paymentMethod === 'card'}
                            placeholder="MM/YY"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            CVV
                          </label>
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            required={paymentMethod === 'card'}
                            placeholder="123"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PayPal Info */}
                  {paymentMethod === 'paypal' && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                      <p className="text-blue-800 mb-2 font-semibold">PayPal Checkout</p>
                      <p className="text-blue-800 mb-4 text-sm">
                        namespace: payment-methods.paypalMeUrl
                        <br />
                        {LINK_NAMESPACES.paymentAccounts.paypalMeUrl}
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'zelle' && (
                    <div className="bg-violet-50 border border-violet-200 rounded-lg p-4 text-center">
                      <p className="text-violet-900 mb-2 font-semibold">Zelle Transfer</p>
                      <p className="text-violet-900 text-sm">
                        namespace: payment-methods.zelleHandle
                        <br />
                        {LINK_NAMESPACES.paymentAccounts.zelleHandle}
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'cashapp' && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center">
                      <p className="text-emerald-900 mb-2 font-semibold">Cash App</p>
                      <p className="text-emerald-900 text-sm">
                        namespace: payment-methods.cashAppTag
                        <br />
                        {LINK_NAMESPACES.paymentAccounts.cashAppTag}
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'applepay' && (
                    <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 text-center">
                      <p className="text-gray-900 mb-2 font-semibold">Apple Pay</p>
                      <p className="text-gray-700 text-sm">
                        namespace: payment-methods.applePayPhone
                        <br />
                        {LINK_NAMESPACES.paymentAccounts.applePayPhone}
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'googlewallet' && (
                    <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 text-center">
                      <p className="text-sky-900 mb-2 font-semibold">Google Wallet</p>
                      <p className="text-sky-800 text-sm">
                        Use Google Wallet checkout for saved cards and faster payment flow.
                      </p>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={processing}
                  className="w-full py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transform hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2 disabled:transform-none disabled:bg-gray-400"
                >
                  <Lock className="w-5 h-5" />
                  {processing ? 'Processing...' : getPayButtonLabel()}
                </button>

                {/* Security Notice */}
                <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-lg p-4">
                  <Lock className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-green-800">
                    <p className="font-semibold mb-1">Secure Payment</p>
                    <p>
                      Your payment information is encrypted and secure. We never
                      store your card details.
                    </p>
                  </div>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-gray-600">
                        {item.product.name} x {item.quantity}
                      </span>
                      <span className="font-semibold text-gray-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold text-gray-900">
                      ${getTotal().toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-semibold text-gray-900">
                      ${(getTotal() * 0.08).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold text-green-600">FREE</span>
                  </div>
                </div>

                <div className="border-t-2 border-gray-300 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-primary-600">
                      ${(getTotal() * 1.08).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-xs text-gray-500">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <p>
                    By completing this purchase, you agree to our Terms of
                    Service and Privacy Policy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
