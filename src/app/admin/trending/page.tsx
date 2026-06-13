"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { Search, Loader2, CheckCircle, GripVertical } from "lucide-react";
import Image from "next/image";

interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  image_url?: string;
  is_trending: boolean;
  trending_order: number | null;
  display_order: number | null;
}

export default function PositionsManagerPage() {
  const [categories, setCategories] = useState<string[]>(["Trending"]);
  const [selectedCategory, setSelectedCategory] = useState("Trending");
  
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [orderedProducts, setOrderedProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragSource, setDragSource] = useState<"catalog" | "grid" | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  const [isDirty, setIsDirty] = useState(false);
  const [selectedCatalogFilter, setSelectedCatalogFilter] = useState("All");

  // Prevent accidental exits on unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  const handleCategoryChange = (newCat: string) => {
    if (isDirty) {
      if (!confirm("You have unsaved layout changes. Switch categories and discard changes?")) {
        return;
      }
    }
    setSelectedCategory(newCat);
    setSelectedCatalogFilter("All");
    setIsDirty(false);
  };

  const handleDiscard = async () => {
    if (confirm("Are you sure you want to discard unsaved changes?")) {
      setIsDirty(false);
      await fetchProducts();
    }
  };

  // 1. Fetch Categories dynamically and load initial catalog
  useEffect(() => {
    const fetchCats = async () => {
      const { data } = await supabase
        .from("category_thumbnails")
        .select("slug, label")
        .order("slug");
      if (data) {
        // Exclude the dynamic "Under 4K" virtual collection
        const filtered = data
          .filter((c) => c.slug !== "under-4k")
          .map((c) => c.label);
        setCategories(["Trending", "Shop All", ...filtered]);
      }
    };
    fetchCats();
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("products")
      .select("id, title, category, price, image_url, is_trending, trending_order, display_order")
      .order("created_at", { ascending: false });
    
    if (data) {
      setAllProducts(data);
    }
    setLoading(false);
    setIsDirty(false);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // 2. Set the right-hand grid based on the selected category or trending tab
  useEffect(() => {
    if (allProducts.length === 0) return;

    if (selectedCategory === "Trending") {
      const trending = allProducts
        .filter((p) => p.is_trending)
        .sort((a, b) => (a.trending_order ?? 9999) - (b.trending_order ?? 9999));
      setOrderedProducts(trending);
    } else if (selectedCategory === "Shop All") {
      const shopAll = [...allProducts]
        .sort((a, b) => (a.display_order ?? 9999) - (b.display_order ?? 9999));
      setOrderedProducts(shopAll);
    } else {
      const categoryProducts = allProducts
        .filter((p) => p.category?.toLowerCase() === selectedCategory.toLowerCase())
        .sort((a, b) => (a.display_order ?? 9999) - (b.display_order ?? 9999));
      setOrderedProducts(categoryProducts);
    }
  }, [selectedCategory, allProducts]);

  // 3. Drag and Drop Actions
  const handleDragStart = (e: React.DragEvent, id: string, source: "catalog" | "grid") => {
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.effectAllowed = "move";
    setDraggedId(id);
    setDragSource(source);
  };

  const handleDragOver = (e: React.DragEvent, index?: number) => {
    e.preventDefault();
    if (index !== undefined) {
      setDragOverIndex(index);
    }

    // Programmatic auto-scrolling during drag
    const scrollContainer = document.querySelector("main");
    if (scrollContainer) {
      const threshold = 180; // pixels from top/bottom boundary
      const rect = scrollContainer.getBoundingClientRect();
      const mouseY = e.clientY;

      if (mouseY < rect.top + threshold) {
        // Scroll up
        const speed = Math.max(5, Math.min(25, (rect.top + threshold - mouseY) / 4));
        scrollContainer.scrollTop -= speed;
      } else if (mouseY > rect.bottom - threshold) {
        // Scroll down
        const speed = Math.max(5, Math.min(25, (mouseY - (rect.bottom - threshold)) / 4));
        scrollContainer.scrollTop += speed;
      }
    }
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDropOnGrid = (targetIndex: number) => {
    setDragOverIndex(null);
    if (!draggedId) return;

    // Find the product being dragged
    const draggedProduct = allProducts.find((p) => p.id === draggedId);
    if (!draggedProduct) return;

    if (dragSource === "catalog") {
      // Dragged from Left (Catalog) to Right (Active Grid)
      setOrderedProducts((prev) => {
        const exists = prev.some((p) => p.id === draggedId);
        if (exists) return prev; // Already in this list

        const updatedProduct = { ...draggedProduct };
        if (selectedCategory !== "Trending") {
          // Reassign category dynamically on drop
          updatedProduct.category = selectedCategory;
        } else {
          updatedProduct.is_trending = true;
        }

        const next = [...prev];
        next.splice(targetIndex, 0, updatedProduct);
        return next;
      });

      // Update in local master list
      setAllProducts((prev) =>
        prev.map((p) => {
          if (p.id === draggedId) {
            return {
              ...p,
              category: selectedCategory !== "Trending" ? selectedCategory : p.category,
              is_trending: selectedCategory === "Trending" ? true : p.is_trending,
            };
          }
          return p;
        })
      );
      setIsDirty(true);
    } else if (dragSource === "grid") {
      // Reorder within the Right Grid
      setOrderedProducts((prev) => {
        const next = [...prev];
        const sourceIndex = next.findIndex((p) => p.id === draggedId);
        if (sourceIndex === -1) return prev;

        const [movedItem] = next.splice(sourceIndex, 1);
        next.splice(targetIndex, 0, movedItem);
        return next;
      });
      setIsDirty(true);
    }

    setDraggedId(null);
    setDragSource(null);
  };

  const handleDropOnCatalog = () => {
    if (!draggedId || dragSource !== "grid") return;

    // Remove from the Right Grid
    setOrderedProducts((prev) => prev.filter((p) => p.id !== draggedId));

    // Reset status in local master list
    setAllProducts((prev) =>
      prev.map((p) => {
        if (p.id === draggedId) {
          return {
            ...p,
            category: selectedCategory !== "Trending" ? "" : p.category,
            is_trending: selectedCategory === "Trending" ? false : p.is_trending,
            display_order: selectedCategory !== "Trending" ? null : p.display_order,
            trending_order: selectedCategory === "Trending" ? null : p.trending_order,
          };
        }
        return p;
      })
    );

    setIsDirty(true);
    setDraggedId(null);
    setDragSource(null);
  };

  const handleManualPositionChange = (productId: string, targetPosition: number) => {
    if (isNaN(targetPosition) || targetPosition < 1 || targetPosition > orderedProducts.length) return;
    const targetIndex = targetPosition - 1;
    setOrderedProducts((prev) => {
      const next = [...prev];
      const sourceIndex = next.findIndex((p) => p.id === productId);
      if (sourceIndex === -1 || sourceIndex === targetIndex) return prev;

      const [movedItem] = next.splice(sourceIndex, 1);
      next.splice(targetIndex, 0, movedItem);
      return next;
    });
    setIsDirty(true);
  };

  const handleRemoveAll = () => {
    if (confirm(`Are you sure you want to remove all designs from the ${selectedCategory} grid?`)) {
      setOrderedProducts([]);
      
      if (selectedCategory === "Trending") {
        setAllProducts((prev) =>
          prev.map((p) => ({
            ...p,
            is_trending: false,
            trending_order: null,
          }))
        );
      } else {
        setAllProducts((prev) =>
          prev.map((p) => {
            if (p.category?.toLowerCase() === selectedCategory.toLowerCase()) {
              return {
                ...p,
                category: "",
                display_order: null,
              };
            }
            return p;
          })
        );
      }
      setIsDirty(true);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (selectedCategory === "Trending") {
        // Clear all trending
        await supabase
          .from("products")
          .update({ is_trending: false, trending_order: null })
          .neq("id", "00000000-0000-0000-0000-000000000000");

        // Save new trending orders concurrently
        const promises = orderedProducts.map((p, i) =>
          supabase
            .from("products")
            .update({ is_trending: true, trending_order: i + 1 })
            .eq("id", p.id)
        );
        await Promise.all(promises);
      } else if (selectedCategory === "Shop All") {
        // Save new global display orders concurrently
        const promises = orderedProducts.map((p, i) =>
          supabase
            .from("products")
            .update({ display_order: i + 1 })
            .eq("id", p.id)
        );
        await Promise.all(promises);
      } else {
        // Category Order Management
        if (orderedProducts.length === 0) {
          // Bulk clear all products in this category in a single query
          await supabase
            .from("products")
            .update({ category: "", display_order: null })
            .eq("category", selectedCategory);
        } else {
          // 1. Reset display order for ALL products in this category
          await supabase
            .from("products")
            .update({ display_order: null })
            .eq("category", selectedCategory);

          // 2. Set display order and categories for active ones concurrently
          const promises = orderedProducts.map((p, i) =>
            supabase
              .from("products")
              .update({ category: selectedCategory, display_order: i + 1 })
              .eq("id", p.id)
          );

          // 3. Clear category string for any products that were dragged out (removed)
          const currentIds = orderedProducts.map((p) => p.id);
          const removedProducts = allProducts.filter(
            (p) =>
              p.category?.toLowerCase() === selectedCategory.toLowerCase() &&
              !currentIds.includes(p.id)
          );

          const removePromises = removedProducts.map((removed) =>
            supabase
              .from("products")
              .update({ category: "", display_order: null })
              .eq("id", removed.id)
          );

          await Promise.all([...promises, ...removePromises]);
        }
      }

      // Re-fetch clean database records
      await fetchProducts();
      setSaved(true);
      setIsDirty(false);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Error saving positions:", err);
      alert("Failed to save layout changes.");
    } finally {
      setSaving(false);
    }
  };

  // Filter left catalog search results
  const leftCatalogFiltered = allProducts.filter((p) => {
    // If managing Trending: show products that are not currently in Trending
    if (selectedCategory === "Trending") {
      const isCurrentlyTrending = orderedProducts.some((t) => t.id === p.id);
      if (isCurrentlyTrending) return false;
    } else if (selectedCategory === "Shop All") {
      // If managing Shop All, all products are in the grid, so left catalog filter can be empty
      const isAlreadyOnGrid = orderedProducts.some((t) => t.id === p.id);
      if (isAlreadyOnGrid) return false;
    } else {
      // If managing a Category: only show products belonging to this category or unassigned
      const hasOtherCategory = p.category && p.category.toLowerCase() !== selectedCategory.toLowerCase();
      if (hasOtherCategory) return false;

      // And hide if already active in the grid
      const isAlreadyOnGrid = orderedProducts.some((t) => t.id === p.id);
      if (isAlreadyOnGrid) return false;
    }

    // Filter by Catalog category filter dropdown (only active on Trending/Shop All)
    if ((selectedCategory === "Trending" || selectedCategory === "Shop All") && selectedCatalogFilter !== "All") {
      const catMatch = p.category?.toLowerCase() === selectedCatalogFilter.toLowerCase();
      if (!catMatch) return false;
    }

    const matchesSearch =
      search === "" ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase());

    return matchesSearch;
  });

  return (
    <div className="p-6 md:p-8 min-h-screen">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-primary font-mono text-xs uppercase tracking-[0.3em] mb-1">Admin</p>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black uppercase tracking-tighter">Positions Manager</h1>
            {isDirty && (
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 font-mono text-[9px] uppercase tracking-wider animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                Unsaved Changes
              </span>
            )}
          </div>
          <p className="text-text-muted text-sm mt-1">
            Drag products from the left to add, drag within the grid to sort. Drag back to left to remove.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {isDirty && (
            <button
              onClick={handleDiscard}
              disabled={saving}
              className="flex items-center bg-white/5 border border-white/10 text-white px-5 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all disabled:opacity-60"
            >
              Discard
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-primary text-black px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-all disabled:opacity-60 shadow-[0_0_15px_rgba(198,255,0,0.3)]"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <CheckCircle className="w-4 h-4" /> : null}
            {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Categories Horizontal Selector Tabs */}
      <div className="mb-8 overflow-x-auto scrollbar-hide border-b border-white/5 pb-2">
        <div className="flex gap-2 min-w-max">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-colors ${
                selectedCategory === cat
                  ? "bg-primary text-black font-black"
                  : "bg-surface border border-white/10 text-white hover:border-primary/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* LEFT 30% PANEL: All Catalog Products (Draggable source & remove target) */}
          <div
            className="w-full lg:w-[30%] bg-surface border border-white/5 rounded-2xl p-4 shrink-0 transition-colors"
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => {
              e.preventDefault();
              handleDropOnCatalog();
            }}
          >
            <h2 className="text-xs font-black uppercase tracking-widest text-text-muted mb-4">
              Product Catalog ({leftCatalogFiltered.length})
            </h2>
            <div className="space-y-2 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="text"
                  placeholder="Search catalog by name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              {(selectedCategory === "Trending" || selectedCategory === "Shop All") && (
                <div className="flex gap-2">
                  <select
                    value={selectedCatalogFilter}
                    onChange={(e) => setSelectedCatalogFilter(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-text-muted focus:outline-none focus:border-primary transition-colors cursor-pointer"
                  >
                    <option value="All" className="bg-surface text-white">All Categories</option>
                    {categories.filter(c => c !== "Trending" && c !== "Shop All").map((cat) => (
                      <option key={cat} value={cat} className="bg-surface text-white">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1 thin-scrollbar">
              {leftCatalogFiltered.map((product) => (
                <div
                  key={product.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, product.id, "catalog")}
                  className="flex items-center gap-3 bg-white/[0.02] border border-white/10 rounded-xl p-2.5 hover:border-primary/40 hover:bg-primary/5 transition-all cursor-grab active:cursor-grabbing group"
                >
                  <GripVertical className="w-3.5 h-3.5 text-white/10 group-hover:text-primary transition-colors pointer-events-none" />
                  <div className="w-10 h-10 rounded bg-black overflow-hidden shrink-0 relative border border-white/5 pointer-events-none">
                    {product.image_url ? (
                      <Image src={product.image_url} alt={product.title} fill className="object-cover" sizes="40px" draggable={false} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[7px] text-primary font-black uppercase">
                        Mock
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 pointer-events-none">
                    <p className="text-xs font-bold truncate text-white">{product.title}</p>
                    <p className="text-[9px] text-text-muted mt-0.5 uppercase tracking-wider">
                      {product.category || "Unassigned"} · ₹{product.price}
                    </p>
                  </div>
                </div>
              ))}
              {leftCatalogFiltered.length === 0 && (
                <p className="text-center text-text-muted text-xs py-8">No products found.</p>
              )}
            </div>
            <p className="text-[10px] text-center text-text-muted/60 mt-4 font-mono uppercase">
              Drag from here to add • Drop here to remove
            </p>
          </div>

          {/* RIGHT 70% PANEL: Visual 4-Column Drag-and-Drop Grid Layout */}
          <div className="flex-1 w-full bg-surface/50 border border-white/5 rounded-2xl p-6 min-h-[680px]">
            <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
              <h2 className="text-sm font-black uppercase tracking-widest text-white">
                Active Display Grid <span className="text-primary">({orderedProducts.length} designs)</span>
              </h2>
              <div className="flex items-center gap-4">
                {selectedCategory !== "Shop All" && orderedProducts.length > 0 && (
                  <button
                    onClick={handleRemoveAll}
                    className="text-[10px] bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 px-3 py-1.5 rounded-lg font-black uppercase tracking-wider transition-all"
                  >
                    Remove All
                  </button>
                )}
                <p className="text-xs font-mono text-text-muted uppercase tracking-widest">
                  Category: {selectedCategory}
                </p>
              </div>
            </div>

            {orderedProducts.length === 0 ? (
              <div
                className="border border-dashed border-white/10 rounded-2xl p-16 text-center text-text-muted text-sm min-h-[500px] flex flex-col items-center justify-center gap-4 transition-colors"
                onDragOver={(e) => handleDragOver(e)}
                onDrop={(e) => {
                  e.preventDefault();
                  handleDropOnGrid(0);
                }}
              >
                <div className="w-12 h-12 rounded-full border border-dashed border-white/20 flex items-center justify-center text-white/20 text-xl font-bold pointer-events-none">
                  +
                </div>
                <div className="pointer-events-none">
                  <p className="font-bold text-white mb-1">Grid is Empty</p>
                  <p className="text-xs">Drag and drop products from the left panel to display them here.</p>
                </div>
              </div>
            ) : (
              <div 
                className="grid grid-cols-2 xl:grid-cols-4 gap-4"
                onDragOver={(e) => handleDragOver(e)}
                onDrop={(e) => {
                  e.preventDefault();
                  handleDropOnGrid(orderedProducts.length);
                }}
              >
                {orderedProducts.map((product, index) => {
                  const isOver = dragOverIndex === index;
                  return (
                    <div
                      key={product.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, product.id, "grid")}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleDropOnGrid(index);
                      }}
                      className={`relative flex flex-col bg-black/30 border rounded-xl overflow-hidden p-2 transition-all cursor-grab active:cursor-grabbing group ${
                        isOver
                          ? "border-primary bg-primary/5 scale-[1.03] shadow-[0_0_15px_rgba(198,255,0,0.15)]"
                          : "border-white/5 hover:border-primary/20"
                      }`}
                    >
                      {/* Grid Position Rank Badge Input */}
                      <input
                        type="text"
                        defaultValue={index + 1}
                        key={`${product.id}-${index}`}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            const val = parseInt((e.target as HTMLInputElement).value);
                            handleManualPositionChange(product.id, val);
                            (e.target as HTMLInputElement).blur();
                          }
                        }}
                        onBlur={(e) => {
                          const val = parseInt(e.target.value);
                          handleManualPositionChange(product.id, val);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        onDragStart={(e) => e.stopPropagation()}
                        className="absolute top-3 left-3 bg-black/80 border border-white/20 text-primary font-black font-mono text-[10px] w-8 h-6 rounded text-center z-20 focus:outline-none focus:border-primary cursor-text hover:border-primary transition-colors"
                      />

                      {/* Card Image */}
                      <div className="aspect-square w-full bg-surface rounded-lg overflow-hidden relative border border-white/5 mb-3 flex items-center justify-center pointer-events-none">
                        {product.image_url ? (
                          <Image src={product.image_url} alt={product.title} fill className="object-cover" sizes="160px" draggable={false} />
                        ) : (
                          <span className="text-[8px] text-primary font-black uppercase text-center leading-none p-1">
                            {product.title}
                          </span>
                        )}
                      </div>

                      {/* Card Content */}
                      <div className="flex flex-col flex-1 pointer-events-none">
                        <span className="text-[8px] font-mono text-primary uppercase tracking-wider mb-1 block">
                          {product.category || "Unassigned"}
                        </span>
                        <h3 className="text-xs font-black uppercase tracking-tight text-white line-clamp-2 leading-tight flex-1">
                          {product.title}
                        </h3>
                        <p className="text-[10px] font-mono text-white/80 font-bold mt-2">
                          ₹{product.price.toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  );
                })}
                
                {/* Visual drag target block at the end of the grid */}
                <div
                  onDragOver={(e) => handleDragOver(e)}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDropOnGrid(orderedProducts.length);
                  }}
                  className="border border-dashed border-white/10 hover:border-primary/30 rounded-xl p-4 flex flex-col items-center justify-center text-center text-text-muted hover:text-primary transition-all cursor-pointer min-h-[160px]"
                >
                  <span className="text-lg font-bold mb-1 pointer-events-none">+</span>
                  <span className="text-[9px] uppercase tracking-widest font-mono pointer-events-none">Drop at end</span>
                </div>
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
