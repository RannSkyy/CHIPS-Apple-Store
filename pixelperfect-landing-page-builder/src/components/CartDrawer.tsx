/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CartItem } from "../types";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Language, formatProductPrice, TRANSLATIONS } from "../utils/lang";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  lang: Language;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  lang,
}: CartDrawerProps) {
  const t = TRANSLATIONS[lang];
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 transition-opacity"
            id="cart-backdrop"
          />

          {/* Drawer Body */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-51 flex flex-col h-full"
            id="cart-drawer-container"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between" id="cart-drawer-header">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-brand-teal" />
                <h3 className="font-sans font-bold text-lg text-brand-primary">
                  {t.yourCart} ({cart.reduce((s, i) => s + i.quantity, 0)})
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 -mr-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors"
                aria-label="Close cart"
                id="close-cart-btn"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content list */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" id="cart-items-wrapper">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-12" id="cart-empty-state">
                  <div className="h-16 w-16 rounded-full bg-slate-50 flex items-center justify-center text-gray-300">
                    <ShoppingBag className="h-8 w-8" />
                  </div>
                  <p className="font-sans font-medium text-gray-900 text-lg">{t.cartEmpty}</p>
                  <p className="text-gray-500 text-sm max-w-xs">
                    {lang === "ID" 
                      ? "Cari gadget premium kami dan tambahkan aksesoris impian ke kantong belanja Anda."
                      : "Browse our premium gadgets and add accessories to your shopping bag."}
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-2 px-5 py-2 bg-brand-teal text-white rounded-lg hover:bg-brand-teal-dark font-sans text-sm font-semibold transition-colors shadow-sm"
                    id="cart-shop-now-btn"
                  >
                    {lang === "ID" ? "Mulai Belanja" : "Start Shopping"}
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 p-3 border border-gray-50 rounded-xl hover:border-gray-100 bg-slate-50/50 transition-colors"
                    id={`cart-item-${item.product.id}`}
                  >
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="h-20 w-20 object-cover bg-white rounded-lg border border-gray-100 flex-shrink-0"
                    />
                    <div className="flex-1 flex flex-col justify-between" id={`cart-detail-${item.product.id}`}>
                      <div>
                        <h4 className="font-sans font-semibold text-sm text-brand-primary line-clamp-2">
                          {item.product.name}
                        </h4>
                        <span className="font-sans text-xs text-brand-teal">
                          {item.product.brand}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-2" id={`cart-actions-${item.product.id}`}>
                        {/* Selector of quantity */}
                        <div className="flex items-center border border-gray-200 rounded-lg bg-white overflow-hidden" id="quantity-control">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="p-1.5 hover:bg-slate-50 text-gray-500 hover:text-brand-primary transition-colors"
                            id="qty-minus"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-3 font-mono text-sm font-semibold text-gray-700 min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="p-1.5 hover:bg-slate-50 text-gray-500 hover:text-brand-primary transition-colors"
                            id="qty-plus"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        {/* Price & Delete */}
                        <div className="flex items-center gap-3" id="price-deletion-block">
                          <span className="font-mono text-sm font-bold text-brand-primary">
                            {formatProductPrice(item.product.price * item.quantity, lang)}
                          </span>
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-gray-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                            aria-label="Remove item"
                            id="remove-item-btn"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {cart.length > 0 && (
              <div className="p-4 border-t border-gray-100 bg-white space-y-4" id="cart-drawer-footer">
                <div className="flex justify-between items-center" id="cart-summary-totals">
                  <div className="space-y-0.5">
                    <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                      {t.totalPrice}
                    </span>
                    <p className="text-xs text-gray-400">
                      {lang === "ID" ? "Sudah termasuk PPN 11% & Jasa Pengiriman" : "VAT & service charges included"}
                    </p>
                  </div>
                  <span className="font-mono text-lg font-black text-brand-primary">
                    {formatProductPrice(totalPrice, lang)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3" id="cart-footer-buttons-grid">
                  <button
                    onClick={onClearCart}
                    className="py-3 border border-gray-200 text-gray-500 hover:text-gray-800 rounded-xl hover:bg-gray-50 font-sans text-sm font-medium transition-all"
                    id="clear-cart-btn"
                  >
                    {lang === "ID" ? "Kosongkan" : "Clear Cart"}
                  </button>
                  <button
                    onClick={() => {
                      alert(
                        lang === "ID" 
                          ? `Terima kasih! Pesanan Anda sebesar ${formatProductPrice(totalPrice, lang)} telah diverifikasi. Pada sistem asli, Anda akan diarahkan ke Gerbang Pembayaran Aman iBox.`
                          : `Thank you for your order of ${formatProductPrice(totalPrice, lang)}! In a real system, this redirects to a secure payment gateway.`
                      );
                      onClearCart();
                      onClose();
                    }}
                    className="py-3 bg-brand-teal hover:bg-brand-teal-dark text-white rounded-xl font-sans text-xs font-bold transition-all shadow-sm shadow-cyan-100 text-center"
                    id="checkout-btn"
                  >
                    {t.checkout}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
