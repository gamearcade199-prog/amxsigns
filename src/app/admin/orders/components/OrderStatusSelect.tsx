"use client";

import { useState, useRef, useEffect } from "react";
import { Loader2, ChevronDown, Check, AlertTriangle, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const STATUSES = ["Confirmed", "Handcrafting", "Quality Check", "Shipped", "Delivered", "Cancelled"];

export default function OrderStatusSelect({ orderId, currentStatus }: { orderId: string, currentStatus: string }) {
  const [status, setStatus] = useState(currentStatus || "Confirmed");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{title: string, desc: string} | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-hide toast
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handleSelectStatus = (newStatus: string) => {
    if (newStatus === status) {
      setIsOpen(false);
      return;
    }
    setPendingStatus(newStatus);
    setIsOpen(false);
  };

  const confirmStatusChange = async () => {
    if (!pendingStatus) return;
    
    setIsUpdating(true);
    const originalStatus = status;
    setStatus(pendingStatus); // Optimistic UI update

    try {
      const res = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: pendingStatus }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update status");
      }

      setPendingStatus(null);
      
      // Show toast if email was sent
      if (data.emailSent) {
        setToastMessage({
          title: "Status Updated",
          desc: `Email sent to ${data.customerEmail} \u2713`
        });
      } else {
        setToastMessage({
          title: "Status Updated",
          desc: `Email already sent previously or skipping email.`
        });
      }
      
    } catch (err) {
      console.error("Failed to update status", err);
      // Revert on failure
      setStatus(originalStatus);
      setToastMessage({
        title: "Error",
        desc: "Failed to update status. Please try again."
      });
    } finally {
      setIsUpdating(false);
      setPendingStatus(null);
    }
  };

  const cancelStatusChange = () => {
    setPendingStatus(null);
  };

  const getStatusColor = (s: string) => {
    const norm = s?.toLowerCase();
    switch (norm) {
      case "confirmed":
      case "order placed": return "text-white bg-white/10 border-white/20";
      case "handcrafting": return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
      case "quality check": return "text-blue-500 bg-blue-500/10 border-blue-500/20";
      case "shipped": return "text-primary bg-primary/20 border-primary/30";
      case "delivered": return "text-green-500 bg-green-500/10 border-green-500/20";
      case "cancelled": return "text-red-500 bg-red-500/10 border-red-500/20";
      default: return "text-text-muted bg-white/5 border-white/10";
    }
  };

  return (
    <>
      <div className="relative inline-block text-left" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => !isUpdating && setIsOpen(!isOpen)}
          disabled={isUpdating}
          className={`flex items-center gap-2 text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded border transition-colors ${getStatusColor(status)} ${isUpdating ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:brightness-125"}`}
        >
          {isUpdating ? <Loader2 className="w-3 h-3 animate-spin" /> : status}
          {!isUpdating && <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -5, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -5, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-xl bg-surface border border-white/10 shadow-2xl overflow-hidden"
            >
              <div className="py-1">
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSelectStatus(s)}
                    className={`block w-full text-left px-4 py-2.5 text-[10px] font-black uppercase tracking-widest transition-colors ${
                      status.toLowerCase() === s.toLowerCase()
                        ? "bg-primary/10 text-primary" 
                        : "text-text-muted hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Confirmation Dialog */}
      <AnimatePresence>
        {pendingStatus && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm bg-surface border border-white/10 rounded-2xl p-6 shadow-2xl relative"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                </div>
                <h3 className="text-lg font-black uppercase tracking-tighter">Update Order Status?</h3>
              </div>
              
              <p className="text-sm text-text-muted mb-6">
                Are you sure you want to change the status of order <span className="font-mono text-white">#{orderId.slice(0, 8)}</span> from <span className="text-white font-bold">{status}</span> to <span className="text-primary font-bold">{pendingStatus}</span>?
                <br/><br/>
                <span className="text-xs text-white/70 flex items-center gap-1.5"><Mail className="w-3 h-3" /> An email will be automatically sent to the customer.</span>
              </p>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={cancelStatusChange}
                  disabled={isUpdating}
                  className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest text-text-muted hover:bg-white/5 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmStatusChange}
                  disabled={isUpdating}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest bg-primary text-black hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                  Confirm & Send
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-[200] bg-surface border border-white/10 rounded-xl p-4 shadow-2xl flex items-start gap-3 max-w-sm"
          >
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
              <Check className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">{toastMessage.title}</p>
              <p className="text-xs text-text-muted mt-0.5">{toastMessage.desc}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
