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
      className="relative bg-neutral-950 text-white"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 md:pt-20 pb-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Newsletter */}
          <div className="reveal">
            <span className="text-xs uppercase tracking-[0.22em] text-emerald-400 mb-4 block">
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
                className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-emerald-400/50 rounded-full px-5"
              />
              <Button
                type="submit"
                disabled={loading}
                data-testid="newsletter-submit"
                className="h-12 px-6 rounded-full bg-white text-neutral-900 hover:bg-white/90 text-sm font-medium"
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
            <p className="mt-3 text-xs text-white/40">
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
                <div className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">
                  {col.title}
                </div>
                <ul className="space-y-3">
                  {col.items.map((it) => (
                    <li key={it}>
                      <a
                        href="#"
                        data-testid={`footer-link-${it.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-sm text-white/70 hover:text-white transition-colors"
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

        {/* Wordmark + meta */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-display text-lg" data-testid="footer-logotype">
            <span className="inline-block w-2 h-2 rounded-sm bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.6)]" />
            <span className="font-semibold tracking-tight">Lockin</span>
          </div>
          <div className="text-xs text-white/45">
            © {new Date().getFullYear()} Lockin Labs. Crafted for deep work.
          </div>
        </div>
      </div>
    </footer>
  );
}
