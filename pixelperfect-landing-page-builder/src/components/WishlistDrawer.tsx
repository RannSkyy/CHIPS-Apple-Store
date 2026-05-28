import { Product } from "../types";
import { X, Heart, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Language, formatProductPrice, TRANSLATIONS } from "../utils/lang";

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  lang: Language;
}

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  lang,
}: WishlistDrawerProps) {
  const t = TRANSLATIONS[lang];

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
            id="wishlist-backdrop"
          />

          {/* Drawer Body */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-51 flex flex-col h-full"
            id="wishlist-drawer-container"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between" id="wishlist-drawer-header">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 fill-rose-500 text-rose-500" />
                <h3 className="font-sans font-bold text-lg text-brand-primary">
                  {t.wishlistTitle} ({wishlist.length})
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 -mr-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors"
                aria-label="Close wishlist"
                id="close-wishlist-btn"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content list */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" id="wishlist-items-wrapper">
              {wishlist.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-12" id="wishlist-empty-state">
                  <div className="h-16 w-16 rounded-full bg-slate-50 flex items-center justify-center text-rose-300">
                    <Heart className="h-8 w-8" />
                  </div>
                  <p className="font-sans font-medium text-gray-900 text-lg">{t.wishlistEmpty}</p>
                  <p className="text-gray-500 text-sm max-w-xs font-sans">
                    {lang === "ID" 
                      ? "Ketuk ikon hati pada produk apa pun untuk menyimpannya di sini agar dapat dilihat nanti."
                      : "Tap the heart icon on any product to save it here for later."}
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-2 px-5 py-2 border border-rose-200 text-rose-600 hover:bg-rose-50 rounded-lg font-sans text-sm font-semibold transition-colors shadow-sm"
                    id="wishlist-shop-btn"
                  >
                    {lang === "ID" ? "Eksplor Produk Populer" : "Explore Popular Items"}
                  </button>
                </div>
              ) : (
                wishlist.map((product) => (
                  <div
                    key={product.id}
                    className="flex gap-4 p-3 border border-gray-50 rounded-xl hover:border-gray-100 bg-slate-50/50 transition-colors"
                    id={`wishlist-item-${product.id}`}
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="h-20 w-20 object-cover bg-white rounded-lg border border-gray-100 flex-shrink-0"
                    />
                    <div className="flex-1 flex flex-col justify-between" id={`wishlist-detail-${product.id}`}>
                      <div>
                        <h4 className="font-sans font-semibold text-sm text-brand-primary line-clamp-2">
                          {product.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="font-sans text-xs text-brand-teal font-semibold">
                            {product.brand}
                          </span>
                          {product.badge && (
                            <span className="bg-cyan-50 text-brand-teal text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
                              {lang === "ID" && product.badge === "New Arrival" ? "Baru" :
                               lang === "ID" && product.badge === "Best Seller" ? "Laris" :
                               lang === "ID" && product.badge === "Hot Pick" ? "Hot" : product.badge}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2" id={`wishlist-actions-${product.id}`}>
                        <span className="font-mono text-sm font-bold text-brand-primary">
                          {formatProductPrice(product.price, lang)}
                        </span>

                        <div className="flex items-center gap-2" id="wishlist-btn-actions">
                          <button
                            onClick={() => {
                              onAddToCart(product);
                              onToggleWishlist(product); // remove from wishlist once added to bag
                            }}
                            className="bg-brand-teal hover:bg-brand-teal-dark text-white p-2 rounded-lg transition-colors flex items-center gap-1 text-xs font-semibold"
                            title="Add to Cart"
                            id="move-to-cart-btn"
                          >
                            <ShoppingCart className="h-3.5 w-3.5" />
                            <span>{lang === "ID" ? "Beli" : "Add"}</span>
                          </button>
                          <button
                            onClick={() => onToggleWishlist(product)}
                            className="text-gray-400 hover:text-rose-500 p-2 rounded-lg hover:bg-rose-50 transition-colors"
                            aria-label="Remove from wishlist"
                            id="remove-wishlist-btn"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
