'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  ShieldCheck,
  Truck,
  Minus,
  Plus,
  ShoppingBag,
  Check,
  Zap,
  Package,
  Sparkles,
  Wrench,
  Info,
  Mail,
  Loader2,
  AlertCircle,
  X,
} from 'lucide-react';
import { Product } from '@/lib/products';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import Header from '@/components/Header';

interface ProductDetailClientProps {
  product: Product;
  related?: Product[];
}

// Notify-me form for sold-out products
function SoldOutNotify({ productTitle, productId }: { productTitle: string; productId: string }) {
  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/notify-restock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, productId, productTitle }),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('done');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'done') {
    return (
      <div className="w-full py-4 rounded-2xl bg-accent-mint/10 border border-accent-mint/20 flex items-center justify-center gap-2 text-accent-mint">
        <Check className="w-5 h-5" />
        <span className="text-sm font-black uppercase tracking-widest">You&apos;ll be notified when it&apos;s back!</span>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="w-full py-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center gap-2 text-red-400">
        <AlertCircle className="w-5 h-5" />
        <span className="text-sm font-black uppercase tracking-widest">Failed to register — try again.</span>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-text-muted font-mono">This item is sold out. Drop your email and we&apos;ll let you know when it&apos;s back.</p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full bg-surface border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-white/10 hover:bg-white/20 border border-white/10 text-white px-5 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          {status === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Notify Me'}
        </button>
      </form>
    </div>
  );
}

// Category-specific use-case sentence — seals search intent match
const useCaseByCategory: Record<string, string> = {
  'cars':        'A reliable choice for garage walls, home showrooms, or as a gift for automotive enthusiasts.',
  'Cars':        'A reliable choice for garage walls, home showrooms, or as a gift for automotive enthusiasts.',
  'gaming':      'Designed for gaming setups, streaming backgrounds, and bedroom accent lighting.',
  'Gaming':      'Designed for gaming setups, streaming backgrounds, and bedroom accent lighting.',
  'anime':       'Popular among collectors and fans looking to display their passion for Japanese animation.',
  'Anime':       'Popular among collectors and fans looking to display their passion for Japanese animation.',
  'pop culture': 'Popular among collectors and fans looking to display their passion for anime and pop culture.',
  'Pop Culture': 'Popular among collectors and fans looking to display their passion for anime and pop culture.',
  'f1':          'Ideal for race fans, home offices, and premium man caves.',
  'F1':          'Ideal for race fans, home offices, and premium man caves.',
  'aesthetic':   'Pairs well with minimalist interiors, café setups, and creative studio spaces.',
  'Aesthetic':   'Pairs well with minimalist interiors, café setups, and creative studio spaces.',
  'love':        'A meaningful personalised gift for anniversaries, Valentine\'s Day, or home décor.',
  'Love':        'A meaningful personalised gift for anniversaries, Valentine\'s Day, or home décor.',
  'wings':       'Works as a statement wall piece for bedrooms, dressing rooms, and photo backdrops.',
  'Wings':       'Works as a statement wall piece for bedrooms, dressing rooms, and photo backdrops.',
  'cafe-bar':    'Designed for café and bar environments, reception walls, and hospitality interiors.',
  'CAFE/BAR':    'Designed for café and bar environments, reception walls, and hospitality interiors.',
  'sports':      'Designed for home gyms, fitness centres, and sports clubs.',
  'Sports':      'Designed for home gyms, fitness centres, and sports clubs.',
};

const ProductDetailClient: React.FC<ProductDetailClientProps> = ({ product, related = [] }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('Regular');
  const [activeSection, setActiveSection] = useState('details');
  const [hasBanner, setHasBanner] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openMainFaq, setOpenMainFaq] = useState<number | null>(null);
  const [imageError, setImageError] = useState(false);

  const sections = [
    { id: 'details', label: 'Details' },
    { id: 'install', label: 'Install' },
    { id: 'customise', label: 'Customise' },
    { id: 'faq', label: 'FAQs' }
  ];

  useEffect(() => {
    // Check for banner class on mount
    setHasBanner(document.body.classList.contains('has-banner'));

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 196;
      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sec.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const isMobile = window.innerWidth < 768;
      const headerOffset = hasBanner 
        ? (isMobile ? 196 : 220) 
        : (isMobile ? 156 : 176);
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);
  const [added, setAdded] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Related products scroll
  const relatedScrollRef = React.useRef<HTMLDivElement>(null);
  const [relatedScroll, setRelatedScroll] = React.useState({ canLeft: false, canRight: true });

  const updateRelatedScroll = () => {
    const el = relatedScrollRef.current;
    if (!el) return;
    setRelatedScroll({
      canLeft: el.scrollLeft > 8,
      canRight: el.scrollLeft < el.scrollWidth - el.clientWidth - 8,
    });
  };

  const scrollRelated = (dir: 'left' | 'right') => {
    relatedScrollRef.current?.scrollBy({ left: dir === 'right' ? 500 : -500, behavior: 'smooth' });
  };

  const images = product.images && product.images.length > 0 ? product.images : (product.image_url ? [product.image_url] : []);

  const variants = {
    regular: product.variants?.regular ?? { dimensions: '14" x 12"', price: product.price, original_price: product.original_price },
    medium: product.variants?.medium ?? { dimensions: '20" x 16"', price: product.price + 1500, original_price: null },
    large: product.variants?.large ?? { dimensions: '28" x 22"', price: product.price + 3500, original_price: null },
  };

  const currentVariant = selectedSize.toLowerCase() === 'regular'
    ? variants.regular
    : selectedSize.toLowerCase() === 'medium'
      ? variants.medium
      : variants.large;

  const finalPrice = currentVariant.price;
  const finalOriginalPrice = currentVariant.original_price;
  const savings = finalOriginalPrice ? finalOriginalPrice - finalPrice : 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedSize, finalPrice);
    }
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      openCart();
    }, 600);
  };

  return (
    <main className="min-h-screen bg-black selection:bg-primary/30 selection:text-primary" itemScope itemType="https://schema.org/Product">
      <Header />
      <div className="pt-24 pb-10 md:pb-12 container mx-auto px-4 lg:px-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-text-muted uppercase tracking-widest">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link href="/" className="hover:text-primary transition-colors" itemProp="item">
                <span itemProp="name">Home</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <li className="text-white/20">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link href="/collections" className="hover:text-primary transition-colors" itemProp="item">
                <span itemProp="name">Shop</span>
              </Link>
              <meta itemProp="position" content="2" />
            </li>
            <li className="text-white/20">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link href={`/collections/${product.category.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-primary transition-colors" itemProp="item">
                <span itemProp="name">{product.category}</span>
              </Link>
              <meta itemProp="position" content="3" />
            </li>
            <li className="text-white/20">/</li>
            <li className="text-white" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name">{product.title}</span>
              <meta itemProp="position" content="4" />
            </li>
          </ol>
        </nav>

        <article className="grid lg:grid-cols-[56px_1fr_1fr] xl:grid-cols-[64px_1fr_1fr] gap-4 lg:gap-6 xl:gap-10">
          {/* Vertical Thumbnail Strip — desktop only */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden lg:flex flex-col gap-2.5"
          >
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                className={`relative aspect-square w-full rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                  selectedImageIndex === idx
                    ? 'border-primary shadow-[0_0_10px_rgba(198,255,0,0.4)]'
                    : 'border-white/10 hover:border-white/30'
                }`}
                title={`View ${product.title} Detail ${idx + 1}`}
              >
                <Image 
                  src={img} 
                  alt={`${product.title} LED Neon Sign Detail View - ${idx + 1}`} 
                  fill 
                  className="object-cover" 
                  sizes="64px" 
                />
              </button>
            ))}
          </motion.div>

          {/* Main Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-3"
          >
            <div className="relative aspect-square lg:max-h-[calc(100vh-180px)] rounded-2xl lg:rounded-3xl overflow-hidden border border-white/10 bg-surface flex items-center justify-center">
              {images.length > 0 && images[selectedImageIndex] ? (
                <Image 
                  src={images[selectedImageIndex]} 
                  alt={`${product.title} ${product.category} LED Neon Wall Art - Handcrafted Premium Decor`}
                  title={`${product.title} | AMX Signs High Quality LED Neon`}
                  fill 
                  className="object-cover" 
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  itemProp="image"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f0f1a] flex items-center justify-center">
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(198,255,0,0.08) 0%, transparent 70%)' }} />
                  <div className="relative z-10 flex flex-col items-center justify-center px-8 text-center">
                    <span className="text-2xl md:text-3xl font-black uppercase tracking-widest text-primary drop-shadow-[0_0_16px_rgba(198,255,0,0.8)] block">
                      {product.title}
                    </span>
                    <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mt-4">Premium Handcrafted Neon Art</p>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Thumbnails */}
            {images.length > 1 && (
              <div className="flex lg:hidden gap-2.5 overflow-x-auto pb-1 scrollbar-hide">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative aspect-square w-14 sm:w-16 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImageIndex === idx ? 'border-primary' : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <Image src={img} alt={`${product.title} view ${idx + 1}`} fill className="object-cover" sizes="64px" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Details */}
          <div className="flex flex-col lg:pr-1">
            <span className="text-xs font-mono text-primary uppercase tracking-[0.3em] mb-2">{product.category} Collection</span>
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4" itemProp="name">{product.title}</h1>
            <meta itemProp="brand" content="AMX Signs" />
            <meta itemProp="manufacturer" content="AMX Signs" />

            <div className="flex items-baseline gap-3 mb-1" itemProp="offers" itemScope itemType="https://schema.org/Offer">
              <span className="text-3xl font-mono font-black text-primary" itemProp="price" content={finalPrice.toString()}>{formatPrice(finalPrice)}</span>
              <meta itemProp="priceCurrency" content="INR" />
              {finalOriginalPrice && <span className="text-lg font-mono text-text-muted line-through">{formatPrice(finalOriginalPrice)}</span>}
            </div>
            
            <p className="text-white/80 text-xs leading-relaxed mb-6 max-w-lg">Handcrafted with high quality LED technology. Perfect for garages, gaming setups, and modern home decor.</p>

            {/* Size Selector */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-widest text-text-muted">Available Sizes</span>
                <span className="text-[10px] font-mono text-primary">{(currentVariant.dimensions?.replace(/""+/g, '"') || '')}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { name: 'Regular', data: variants.regular },
                  { name: 'Medium', data: variants.medium },
                  { name: 'Large', data: variants.large },
                ].map((size) => (
                  <button
                    key={size.name}
                    onClick={() => setSelectedSize(size.name)}
                    className={`relative py-3.5 px-3 rounded-xl text-sm font-black uppercase tracking-wider border transition-all ${selectedSize === size.name ? 'bg-primary text-black border-primary' : 'bg-surface border-white/10 text-text-muted hover:border-white/30'
                      }`}
                  >
                    {size.name}
                    <span className="block text-xs font-mono mt-1 opacity-80">{formatPrice(size.data.price)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Section */}
            {product.in_stock ? (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono uppercase tracking-widest text-text-muted">Quantity</span>
                  <div className="flex items-center gap-2 bg-surface rounded-full border border-white/10">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:text-primary transition-colors">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-mono w-8 text-center">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:text-primary transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={handleAddToCart}
                  className={`w-full py-5 rounded-full font-black text-sm tracking-[0.2em] uppercase flex items-center justify-center gap-3 transition-all ${added ? 'bg-accent-mint text-black' : 'bg-primary text-black neon-bloom-lime'
                    }`}
                >
                  {added ? <><Check className="w-5 h-5" /> Added to Cart</> : <><ShoppingBag className="w-5 h-5" /> Add to Cart</>}
                </motion.button>
              </div>
            ) : (
              <SoldOutNotify productTitle={product.title} productId={product.id} />
            )}

            {/* Trust Badges */}
            <div className="pt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/10">
              <div className="flex items-center sm:flex-col gap-3 sm:gap-2 sm:text-center">
                <ShieldCheck className="text-primary w-6 h-6 shrink-0" />
                <span className="text-xs sm:text-[10px] font-mono text-text-muted uppercase tracking-widest">1 Year Warranty</span>
              </div>
              <div className="flex items-center sm:flex-col gap-3 sm:gap-2 sm:text-center">
                <Truck className="text-primary w-6 h-6 shrink-0" />
                <span className="text-xs sm:text-[10px] font-mono text-text-muted uppercase tracking-widest">Fast India Shipping</span>
              </div>
              <div className="flex items-center sm:flex-col gap-3 sm:gap-2 sm:text-center">
                <Check className="text-primary w-6 h-6 shrink-0" />
                <span className="text-xs sm:text-[10px] font-mono text-text-muted uppercase tracking-widest">Handcrafted in India</span>
              </div>
            </div>
          </div>
        </article>

        {/* Sticky Sub-Navigation Bar Container */}
        <div 
          className={`sticky z-40 w-full transition-all duration-300 py-2 md:py-3 pointer-events-none ${
            hasBanner ? 'top-[128px] md:top-[136px]' : 'top-[92px] md:top-[100px]'
          }`}
        >
          {/* Floating Capsule Bar */}
          <div className="mx-auto w-max max-w-[calc(100%-1.5rem)] rounded-full border border-white/10 bg-black/90 md:bg-black/80 backdrop-blur-xl py-2 px-3 md:py-2 md:px-5 flex gap-2 md:gap-3 justify-center items-center shadow-[0_8px_32px_rgba(0,0,0,0.8)] pointer-events-auto overflow-x-auto scrollbar-hide">
            {sections.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className={`px-3.5 py-2 md:px-4 md:py-2 text-[11px] xs:text-[12px] md:text-xs font-black uppercase tracking-widest rounded-full transition-all duration-300 whitespace-nowrap ${
                    isActive
                      ? 'bg-primary text-black shadow-[0_0_12px_rgba(198,255,0,0.4)] md:shadow-[0_0_10px_rgba(198,255,0,0.3)]'
                      : 'text-text-muted hover:text-white'
                  }`}
                >
                  {sec.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Stacked Layout Sections */}
        <div className="space-y-5 md:space-y-8 mt-6 md:mt-8">
          {/* Section 1: Product Details */}
          <section id="details" className="scroll-mt-44 space-y-6 text-center flex flex-col items-center">
            {/* Main Description card */}
            <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-5 sm:p-6 md:py-7 md:px-10 w-full max-w-5xl mx-auto flex flex-col items-center">
              <span className="text-primary font-mono text-xs md:text-sm uppercase tracking-[0.3em] mb-2.5 block">Product Details</span>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">About {product.title} Neon Wall Art</h2>
              <p className="text-text-muted leading-relaxed text-base sm:text-lg max-w-4xl mx-auto" itemProp="description">{product.description}</p>
              {useCaseByCategory[product.category] && (
                <p className="text-text-muted/60 text-sm sm:text-base leading-relaxed mt-4 italic border-l-2 border-primary/45 pl-5 max-w-4xl mx-auto text-left">
                  {useCaseByCategory[product.category]}
                </p>
              )}

              {/* Static Hardware Callout Image Container */}
              <div className="mt-6 pt-6 border-t border-white/5 w-full flex flex-col items-center">
                <div className="flex flex-col sm:flex-row items-center gap-2 mb-5 justify-center">
                  <span className="text-primary font-mono text-xs md:text-sm uppercase tracking-[0.3em]">What&apos;s in the Box</span>
                </div>
                <div className="relative w-full max-w-4xl aspect-[1.6] rounded-xl overflow-hidden bg-black/40 border border-white/5 flex items-center justify-center group mx-auto">
                  {imageError ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-black/60">
                      <Zap className="w-8 h-8 text-primary/40 mb-3 animate-pulse" />
                      <span className="text-primary font-mono text-xs md:text-sm uppercase tracking-[0.3em] mb-2">What&apos;s in the Box Diagram</span>
                      <p className="text-text-muted/80 text-sm max-w-md leading-relaxed">
                        Please save your custom hardware graphic as <code className="text-white bg-white/5 px-1.5 py-0.5 rounded font-mono text-[11px]">public/images/hardware-guide.png</code> in the codebase to display it here.
                      </p>
                    </div>
                  ) : (
                    <Image
                      src="/images/hardware-guide.png"
                      alt={`${product.title} Neon Sign What's in the Box Guide - Backing, Cord, Dimmer, and Adapter details`}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                      onError={() => setImageError(true)}
                      sizes="(max-width: 1024px) 100vw, 920px"
                    />
                  )}
                </div>
              </div>
            </div>          </section>

          {/* Section 2: Easy Installation */}
          <section id="install" className="scroll-mt-44 border-t border-white/5 pt-4 md:pt-6 space-y-6 text-center flex flex-col items-center">
            <div>
              <span className="text-primary font-mono text-xs md:text-sm uppercase tracking-[0.3em] mb-2 block">Setup Guide</span>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">How to Install Your Neon Sign</h2>
            </div>
            {/* Horizontal timeline layout on desktop and 2x2 grid on mobile */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-5xl w-full text-left">
              {[
                { step: '01', title: 'Measure & Mark', desc: 'Use a tape measure to position your sign and mark the screw points.' },
                { step: '02', title: 'Drill Holes', desc: 'Safely drill small guide holes at your marked positions on the wall.' },
                { step: '03', title: 'Secure Mounts', desc: 'Use the provided stainless steel (SS) screws to mount the sign.' },
                { step: '04', title: 'Connect & Glow', desc: 'Plug the power adapter into your thin cable to light it up!' },
              ].map((item) => (
                <div key={item.step} className="bg-white/[0.01] border border-white/5 rounded-xl p-3.5 sm:p-5 hover:border-primary/30 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(198,255,0,0.04)] transition-all duration-300 group">
                  <span className="text-2xl sm:text-3xl font-mono font-black text-primary/30 group-hover:text-primary transition-colors block mb-1.5 sm:mb-2 drop-shadow-[0_0_8px_rgba(198,255,0,0.1)]">
                    {item.step}
                  </span>
                  <h4 className="text-[11px] xs:text-xs sm:text-sm md:text-base font-black uppercase text-white tracking-wider mb-1.5">{item.title}</h4>
                  <p className="text-[10px] xs:text-[11px] sm:text-xs md:text-sm text-text-muted leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Customise & Quality Comparison */}
          <section id="customise" className="scroll-mt-44 border-t border-white/5 pt-4 md:pt-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-6xl mx-auto w-full">
              {/* Left Column: FAQs & CTA */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="text-[#FF3B30] font-mono text-xs md:text-sm uppercase tracking-[0.3em] mb-2 block">AMX Guarantee</span>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight leading-none text-white">
                    Highest quality, with the lowest price guarantee
                  </h2>
                </div>
                <p className="text-text-muted leading-relaxed text-sm md:text-base">
                  You are guaranteed quality, service, and reliability. With over 10 years of experience, no project is unfeasible for us. We also guarantee the lowest price. Have you received a better quote? We compare and ensure the lowest prices.
                </p>

                {/* FAQ Accordions */}
                <div className="space-y-2 pt-2">
                  {[
                    {
                      num: '01',
                      q: 'What is the delivery time of a Custom Neon Sign?',
                      a: 'Every sign is handcrafted to order. Standard delivery across India takes 5-8 business days, with free shipping and real-time tracking provided.'
                    },
                    {
                      num: '02',
                      q: 'Why is the quality higher at our store?',
                      a: 'We build our signs using 5mm clear acrylic backing, premium double-layered LED neon tubing for maximum brightness, and solid stainless steel wall anchors. Plus, we cover every sign with a 12-month warranty.'
                    }
                  ].map((item, idx) => {
                    const isOpen = openFaq === idx;
                    return (
                      <div key={idx} className="border-b border-white/5">
                        <button
                          onClick={() => setOpenFaq(isOpen ? null : idx)}
                          className="w-full py-3 flex items-center justify-between text-left group"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-black text-primary font-mono">{item.num}</span>
                            <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-white/95 group-hover:text-primary transition-colors">
                              {item.q}
                            </span>
                          </div>
                          <span className="text-text-muted text-sm font-bold ml-2">
                            {isOpen ? '−' : '+'}
                          </span>
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              key="content"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <p className="pb-4 text-xs sm:text-sm text-text-muted leading-relaxed">
                                {item.a}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-center pt-2">
                  <a 
                    href={`https://wa.me/918822322905?text=${encodeURIComponent("Hi AMX Signs! I'm interested in getting a free quote and design for a custom neon sign.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <motion.span 
                      animate={{ scale: [1, 1.02, 1], boxShadow: ["0 0 10px rgba(198,255,0,0.15)", "0 0 22px rgba(198,255,0,0.45)", "0 0 10px rgba(198,255,0,0.15)"] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                      className="inline-block px-8 py-3.5 bg-primary text-black font-black uppercase tracking-widest rounded-full text-[10px] cursor-pointer transition-all hover:scale-[1.05] active:scale-[0.98] neon-bloom-lime"
                    >
                      Free Quote & Design
                    </motion.span>
                  </a>
                </div>
              </div>

              {/* Right Column: Comparison Table */}
              <div className="lg:col-span-7 overflow-x-auto rounded-2xl border border-white/5 bg-[#080808]/50 backdrop-blur-xl p-1">
                <table className="w-full min-w-0 border-collapse text-left text-[10px] sm:text-xs">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="py-2.5 px-2 md:p-3 text-[10px] md:text-xs font-black uppercase tracking-widest text-text-muted bg-black/10">Comparison</th>
                      <th className="py-2.5 px-2 md:p-3 text-[11px] md:text-sm font-black uppercase tracking-widest text-black bg-primary text-center rounded-t-xl shadow-[0_0_12px_rgba(198,255,0,0.15)]">
                        AMX Signs
                        <span className="block text-[8px] sm:text-[9px] font-mono tracking-widest mt-0.5 opacity-80">Premium Quality</span>
                      </th>
                      <th className="py-2.5 px-2 md:p-3 text-[11px] md:text-sm font-bold uppercase tracking-widest text-white/50 bg-[#121212]/90 text-center rounded-t-xl">
                        Regular Suppliers
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        label: 'LED Technology',
                        amx: 'Ultra Brightness LED',
                        reg: 'Cheap Generic LED',
                        highlight: true
                      },

                      {
                        label: 'Brightness',
                        amx: '1000 - 1400 lumen',
                        reg: '400 - 600 lumen'
                      },
                      {
                        label: 'Lifetime',
                        amx: '5X Greater Lifetime',
                        reg: 'Standard Lifetime'
                      },
                      {
                        label: 'Energy',
                        amx: 'Upto 50% More Efficient',
                        reg: 'Consumes More Energy'
                      },
                      {
                        label: 'Warranty',
                        amx: '12 Months Warranty',
                        reg: 'No Warranty',
                        highlight: true
                      },
                      {
                        label: 'Production',
                        amx: 'Handmade & Carefully Tested',
                        reg: 'Basic / DIY Wiring'
                      },
                      {
                        label: 'Safe / Cool to Touch',
                        amx: true,
                        reg: false
                      },
                      {
                        label: 'Top Notch Craftsmanship',
                        amx: true,
                        reg: false
                      }
                    ].map((row, i) => {
                      const isHighlightedRow = row.highlight;
                      return (
                        <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.01] transition-colors">
                          <td className="py-2.5 px-2 md:p-3 text-[10px] sm:text-xs font-mono uppercase tracking-wider text-text-muted">
                            {row.label}
                          </td>
                          <td className={`py-2.5 px-2 md:p-3 text-center bg-primary/5 font-semibold ${isHighlightedRow ? 'text-primary' : 'text-white/95'}`}>
                            {row.amx === true ? (
                              <Check className="w-4 h-4 text-primary mx-auto drop-shadow-[0_0_6px_rgba(198,255,0,0.5)]" />
                            ) : (
                              row.amx
                            )}
                          </td>
                          <td className="py-2.5 px-2 md:p-3 text-center text-white/40 bg-[#121212]/10">
                            {row.reg === false ? (
                              <X className="w-4 h-4 text-red-500/80 mx-auto" />
                            ) : (
                              row.reg
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section 4: FAQs */}
          <section id="faq" className="scroll-mt-44 border-t border-white/5 pt-4 md:pt-6 space-y-6 text-center flex flex-col items-center">
            <div>
              <span className="text-primary font-mono text-xs md:text-sm uppercase tracking-[0.3em] mb-3 block">FAQs</span>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Common Questions about {product.title}</h2>
            </div>
            {/* Expandable accordion list centered on desktop */}
            <div className="max-w-3xl w-full text-left space-y-3.5 mx-auto">
              {[
                { q: 'How do I power the sign and how long is the cable?', a: 'Every sign comes with a 12V low-voltage power adapter and a 10 Feet (3 Meters) thin power cord, making it easy to plug into any standard wall outlet without visible wire clutter.' },
                { q: 'Is it safe to leave the neon sign turned on 24/7?', a: 'Yes. Our LED neon signs are extremely energy-efficient, generate zero heat, and remain cool to the touch. They operate silently without any hum, making them completely safe for bedrooms and long-duration use.' },
                { q: 'What is the backing material made of?', a: 'We use premium, 5mm high-grade clear acrylic backing boards cut precisely to shape. This provides a rigid, ultra-durable support structure that is clear and looks sleek on any wall.' },
              ].map((faq, i) => {
                const isOpen = openMainFaq === i;
                return (
                  <div key={i} className="rounded-xl border border-white/5 bg-white/[0.01] overflow-hidden transition-all duration-300 hover:border-white/10">
                    <button
                      onClick={() => setOpenMainFaq(isOpen ? null : i)}
                      className="w-full py-3.5 px-4 md:py-4.5 md:px-5 flex items-center justify-between text-left group transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-black text-primary">0{i + 1}</span>
                        <span className="text-xs sm:text-sm font-black uppercase tracking-wide text-white group-hover:text-primary transition-colors">
                          {faq.q}
                        </span>
                      </div>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-text-muted text-xs font-bold ml-2 shrink-0"
                      >
                        ▼
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                          <div className="px-4 pb-4 pt-1 sm:px-5 sm:pb-5 sm:pt-1.5 text-xs sm:text-sm text-text-muted leading-relaxed border-t border-white/[0.03]">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
      {/* Sticky Mobile Add to Cart */}
      {product.in_stock && (
        <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md border-t border-white/10 px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] lg:hidden z-50">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <p className="text-lg font-mono font-black text-primary">{formatPrice(finalPrice)}</p>
            </div>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleAddToCart}
              className={`px-8 py-3.5 rounded-full font-black text-xs tracking-[0.15em] uppercase flex items-center gap-2 ${added ? 'bg-accent-mint text-black' : 'bg-primary text-black'
                }`}
            >
              {added ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
              {added ? 'Added' : 'Add to Cart'}
            </motion.button>
          </div>
        </div>
      )}

      {/* You May Also Like */}
      {related.length > 0 && (
        <section className="bg-black border-t border-white/5 pt-6 pb-20 md:pt-10 md:pb-12">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <span className="text-primary font-mono text-xs uppercase tracking-[0.3em] mb-3 block">Related Designs</span>
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">You May Also Like</h2>
              </div>
              {/* Desktop scroll arrows */}
              <div className="hidden md:flex items-center gap-2">
                <button
                  onClick={() => scrollRelated('left')}
                  disabled={!relatedScroll.canLeft}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-primary hover:text-primary transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                  aria-label="Scroll left"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button
                  onClick={() => scrollRelated('right')}
                  disabled={!relatedScroll.canRight}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-primary hover:text-primary transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                  aria-label="Scroll right"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </div>
            <div
              ref={relatedScrollRef}
              onScroll={updateRelatedScroll}
              className="flex overflow-x-auto gap-4 md:gap-6 pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 scroll-px-4 lg:-mx-6 lg:px-6 lg:scroll-px-6"
            >
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/products/${item.slug}`}
                  className="group shrink-0 w-[160px] sm:w-[200px] md:w-[220px] snap-start"
                  title={`View ${item.title} Neon Sign`}
                >
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-surface border border-white/5 group-hover:border-primary/30 transition-all duration-300 mb-3">
                    {item.image_url ? (
                       <Image 
                         src={item.image_url} 
                         alt={`${item.title} LED Neon Sign - Handcrafted Art`} 
                         fill 
                         className="object-cover group-hover:scale-105 transition-transform duration-500" 
                         sizes="220px" 
                       />
                     ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-primary font-black uppercase text-sm tracking-widest">{item.category[0]}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs font-bold uppercase tracking-wide truncate">{item.title}</p>
                  <p className="text-primary font-mono text-sm font-black mt-0.5">{formatPrice(item.price)}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default ProductDetailClient;
