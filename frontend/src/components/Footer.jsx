import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { subscribeNewsletter } from "@/lib/api";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await subscribeNewsletter(email, "footer");
      toast.success("Subscribed!", {
        description: "We'll keep you posted on Lockin updates.",
      });
      setEmail("");
    } catch (err) {
      const status = err?.response?.status;
      if (status === 409) {
        toast.info("You're already on the list.");
      } else {
        toast.error("Could not subscribe", {
          description: err?.response?.data?.detail || "Try again later.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer
      data-testid="site-footer"
      className="relative border-t border-white/5 bg-[#0A0A0B]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-24 md:pt-32 pb-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Newsletter */}
          <div className="reveal">
            <span className="text-xs uppercase tracking-[0.22em] text-emerald-400/80 mb-4 block">
              Stay in the loop
            </span>
            <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-light tracking-tighter leading-tight">
              The next chapter of focus.
              <br />
              <span className="text-white/50">In your inbox.</span>
            </h3>
            <form
              onSubmit={onSubmit}
              data-testid="newsletter-form"
              className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md"
            >
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@focus.com"
                data-testid="newsletter-input"
                required
                className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-emerald-500/40 rounded-full px-5"
              />
              <Button
                type="submit"
                disabled={loading}
                data-testid="newsletter-submit"
                className="h-12 px-6 rounded-full bg-white text-black hover:bg-white/90 text-sm font-medium"
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>
                    Subscribe <ArrowRight size={14} className="ml-2" />
                  </>
                )}
              </Button>
            </form>
            <p className="mt-3 text-xs text-white/35">
              No spam. Unsubscribe anytime.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            {[
              {
                title: "Product",
                items: ["Features", "How it works", "Store", "FAQ"],
              },
              {
                title: "Company",
                items: ["About", "Press", "Careers", "Contact"],
              },
              {
                title: "Resources",
                items: ["Help center", "Privacy", "Terms", "Returns"],
              },
            ].map((col) => (
              <div key={col.title}>
                <div className="text-xs uppercase tracking-[0.2em] text-white/35 mb-4">
                  {col.title}
                </div>
                <ul className="space-y-3">
                  {col.items.map((it) => (
                    <li key={it}>
                      <a
                        href="#"
                        data-testid={`footer-link-${it.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-sm text-white/65 hover:text-white transition-colors"
                      >
                        {it}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Massive logotype */}
        <div className="mt-24 md:mt-32 select-none">
          <h2
            data-testid="footer-logotype"
            className="font-display font-light tracking-tighter text-[20vw] md:text-[18vw] leading-none text-white/[0.05]"
          >
            LOCKIN.
          </h2>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <div>© {new Date().getFullYear()} Lockin Labs. All rights reserved.</div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Crafted for deep work.
          </div>
        </div>
      </div>
    </footer>
  );
}
