import {
  getProductsByCategory,
  getAllCategories,
  getProductsUnderPrice,
} from "@/lib/products";
import Header from "@/components/Header";
import Link from "next/link";
import { mapDbCategoryToLabel, mapSlugToDbCategory } from "@/lib/categories";
import CollectionGrid from "./CollectionGrid";

interface CategoryPageProps {
  params: { category: string };
}

export const revalidate = 60; // Revalidate every minute
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const categories = await getAllCategories();
    return categories.map((category) => ({
      category: category.toLowerCase(),
    }));
  } catch {
    // Supabase env vars not available at build time (e.g. Vercel CI).
    // Pages will be rendered dynamically at request time instead.
    return [];
  }
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const dbCategory = mapSlugToDbCategory(params.category);
  let categoryName;
  if (params.category.toLowerCase() === "under-4k") {
    categoryName = "Under 4K";
  } else {
    categoryName = mapDbCategoryToLabel(dbCategory);
  }

  const title = `${categoryName} Neon Signs | Custom LED Neon India | AMX Signs`;
  const description = `Shop our premium ${categoryName} neon sign collection. Handcrafted, energy-efficient LED neon signs for your space. Free PAN-India shipping and 1-year warranty.`;
  const canonicalUrl = `https://www.amxsigns.com/collections/${params.category}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
    },
  };
}

// Category content map — makes category pages content-rich for SEO (Phase 2B)
const categoryContent: Record<string, { h1: string; h2: string; intro: string }> = {
  'cars': {
    h1: 'Car & Automotive Neon Signs',
    h2: 'Handcrafted LED Art for Garages & Showrooms',
    intro: 'Transform your garage, home showroom, or man cave with our automotive neon collection. Each sign features a precision-cut LED silhouette of iconic cars — from BMW and Ferrari to F1 racing machinery. Designed for car enthusiasts who want their passion on the wall. Handcrafted in India with 12V low-voltage LEDs, silent operation, and free PAN-India shipping.',
  },
  'anime': {
    h1: 'Anime Neon Signs India',
    h2: 'Display Your Passion with LED Neon Wall Art',
    intro: 'Show your love for Japanese animation with our anime neon sign collection. Featuring iconic characters and symbols from Dragon Ball, Naruto, and more — each sign is a handcrafted LED art piece. Perfect for bedrooms, study rooms, and collectors. All signs are made with silent, cool-running 12V LEDs and ship free across India.',
  },
  'anime-pop': {
    h1: 'Anime & Pop Culture Neon Signs',
    h2: 'Vibrant LED Wall Art for Gamers, Otaku, & Fans',
    intro: 'Transform your room with our premium Anime & Pop Culture neon collection. Featuring handcrafted LED outlines of iconic anime emblems, gaming motifs, and pop-culture symbols. Safe, silent 12V LED neon with free shipping across India.',
  },
  'f1': {
    h1: 'F1 & Racing Neon Signs',
    h2: 'Premium Formula 1 LED Wall Art for Race Fans',
    intro: 'Bring the racetrack home with our Formula 1 neon collection. Featuring iconic circuit layouts, team logos, and racing car silhouettes — these signs are designed for F1 fans, home offices, and premium man caves. Every piece is handcrafted in India with precision-cut LED neon and delivered free across the country.',
  },
  'aesthetic': {
    h1: 'Aesthetic Neon Signs India',
    h2: 'Minimalist LED Wall Art for Modern Interiors',
    intro: 'Our aesthetic neon collection features clean lines, mood-setting phrases, and visual art that works with minimalist and modern interiors. Ideal for bedrooms, cafés, photo studios, and creative workspaces. Each sign is handcrafted with low-heat, silent LEDs and ships free across India with a 1-year warranty.',
  },
  'gaming': {
    h1: 'Gaming Neon Signs India',
    h2: 'Transform Your Setup with LED Battle Station Art',
    intro: 'Elevate your gaming room or streaming station with our premium gaming neon collection. Featuring handcrafted LED designs of controllers, retro arcade graphics, and glowing gaming logos. Built with energy-efficient, cool-to-touch 12V LEDs that run completely silent.',
  },
  'wings': {
    h1: 'Wings Neon Signs India',
    h2: 'Statement LED Wall Art for Bedrooms & Photo Backdrops',
    intro: 'Our wings neon collection is a statement piece for bedrooms, dressing rooms, and photography backdrops. Each design captures the elegance of wing art in glowing LED form. Handcrafted with precision, these signs are silent, cool-running, and come with a full mounting kit for DIY installation.',
  },
  'cafe-bar': {
    h1: 'Café & Bar Neon Signs India',
    h2: 'Professional LED Signage for Hospitality Businesses & Home Bars',
    intro: 'Attract customers and define your brand identity with our café and bar neon collection. From coffee cup silhouettes to custom phrases, these signs are designed for commercial and home bar environments — cafés, bars, reception walls, and pop-up events. Built for continuous use with energy-efficient 12V LEDs and free shipping across India.',
  },
  'under-4k': {
    h1: 'Neon Signs Under ₹4K',
    h2: 'Premium LED Neon Art at Affordable Prices',
    intro: 'Premium neon art does not have to cost a premium. Our under ₹4K collection features handcrafted LED neon signs that deliver the same quality and impact as our full-price range. Free PAN-India shipping included on all orders. Browse our bestsellers and find your perfect piece within budget.',
  },
  'sports': {
    h1: 'Sports & Fitness Neon Signs',
    h2: 'Vibrant LED Art for Home Gyms, Studios & Sports Rooms',
    intro: 'Fuel your motivation with our Sports & Fitness neon sign collection. Handcrafted LED signs perfect for home gyms, workout spaces, sports bars, and team fan caves. Built with cool-running, silent 12V LEDs and shipped free across India.',
  },
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const dbCategory = mapSlugToDbCategory(params.category);
  
  let categoryProducts;
  let categoryName;

  if (params.category.toLowerCase() === "under-4k") {
    categoryProducts = await getProductsUnderPrice(4000);
    categoryName = "Under 4K";
  } else {
    categoryProducts = await getProductsByCategory(dbCategory);
    categoryName = mapDbCategoryToLabel(categoryProducts[0]?.category || dbCategory);
  }

  const siteUrl = 'https://www.amxsigns.com';
  const catSlug = params.category.toLowerCase();
  const content = categoryContent[catSlug];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": siteUrl },
      { "@type": "ListItem", "position": 2, "name": "Collections", "item": `${siteUrl}/collections` },
      { "@type": "ListItem", "position": 3, "name": categoryName, "item": `${siteUrl}/collections/${params.category}` }
    ]
  };

  // ItemList schema — enables Google carousel-style rich results for this category
  const itemListSchema = categoryProducts.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `${categoryName} Neon Signs`,
    "url": `${siteUrl}/collections/${params.category}`,
    "itemListElement": categoryProducts.slice(0, 20).map((p, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "url": `${siteUrl}/products/${p.slug}`,
      "name": `${p.title} Neon Sign`,
    }))
  } : null;

  if (categoryProducts.length === 0) {
    return (
      <main className="min-h-screen bg-black selection:bg-primary/30 selection:text-primary">
        <Header />
        <div className="pt-24 pb-24 max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="mb-6 md:mb-12">
            <span className="text-primary font-mono text-xs uppercase tracking-[0.3em] mb-4 block">
              Collection
            </span>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
              {content?.h1 || categoryName}
            </h1>
          </div>
          <div className="rounded-2xl border border-white/10 bg-surface p-8 text-center">
            <h2 className="text-xl font-black uppercase tracking-tight mb-2">No Products Yet</h2>
            <p className="text-text-muted text-sm mb-6">
              We are adding new {categoryName} designs soon.
            </p>
            <Link
              href="/collections"
              className="inline-block bg-primary text-black px-6 py-3 rounded-full font-black text-xs tracking-widest uppercase"
            >
              Browse All Collections
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black selection:bg-primary/30 selection:text-primary">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {itemListSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      )}
      <div className="pt-24 pb-24 max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="mb-6 md:mb-12">
          <span className="text-primary font-mono text-xs uppercase tracking-[0.3em] mb-4 block">
            Collection
          </span>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            {content?.h1 || categoryName}
          </h1>
          {content?.h2 && (
            <h2 className="text-lg md:text-xl font-semibold text-text-muted mt-2 tracking-tight">
              {content.h2}
            </h2>
          )}
        </div>

        <CollectionGrid products={categoryProducts} />

        {content?.intro && (
          <div className="mt-20 border-t border-white/5 pt-10 max-w-3xl">
            <h3 className="text-xs font-mono uppercase text-primary tracking-widest mb-3">
              About Our {categoryName} Signs
            </h3>
            <p className="text-text-muted text-sm leading-relaxed">
              {content.intro}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
