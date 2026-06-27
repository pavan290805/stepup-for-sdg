import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SpaceBackdrop } from "@/components/site/SpaceBackdrop";
import { FadeUp } from "@/components/site/FadeUp";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — StepUp for SDG" },
      { name: "description", content: "Get in touch to partner, register a school, or collaborate on projects." },
      { property: "og:title", content: "Contact StepUp for SDG" },
      { property: "og:description", content: "Reach out to start a partnership or collaboration." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <section className="relative overflow-hidden py-24 px-6">
      <SpaceBackdrop />
      <div className="relative mx-auto max-w-6xl grid gap-12 lg:grid-cols-2">
        <FadeUp>
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-cyan-glow">Get in Touch</span>
            <h1 className="mt-4 font-display text-4xl md:text-5xl font-bold leading-tight">
              Let's build <span className="grad-text">impact together</span>
            </h1>
            <p className="mt-5 text-muted-text max-w-md">
              Get in touch to partner, register a school, or collaborate on projects.
            </p>
            <ul className="mt-10 space-y-5 text-sm">
              {[
                { icon: Mail, t: "hello@stepupforsdg.org" },
                { icon: Phone, t: "+91 98765 43210" },
                { icon: MapPin, t: "Hyderabad, India · Worldwide" },
              ].map((row, i) => (
                <li key={i} className="flex items-center gap-4 text-muted-text">
                  <span className="h-10 w-10 grid place-items-center rounded-lg bg-deep-blue border border-border text-cyan-glow">
                    <row.icon className="h-4 w-4" />
                  </span>
                  <span className="text-white">{row.t}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeUp>

        <FadeUp delay={150}>
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="glass rounded-3xl p-8 space-y-5"
          >
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-text">Your Name</label>
              <input required className="mt-2 w-full bg-navy/50 border border-border rounded-xl px-4 py-3 outline-none focus:border-cyan-glow transition" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-text">Email</label>
              <input type="email" required className="mt-2 w-full bg-navy/50 border border-border rounded-xl px-4 py-3 outline-none focus:border-cyan-glow transition" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-text">Message</label>
              <textarea required rows={5} className="mt-2 w-full bg-navy/50 border border-border rounded-xl px-4 py-3 outline-none focus:border-cyan-glow transition resize-none" />
            </div>
            <button
              type="submit"
              className="btn-arrow w-full inline-flex justify-center items-center gap-2 bg-cta text-white font-semibold rounded-xl px-6 py-3 shadow-[0_0_24px_rgba(255,122,0,0.5)] hover:brightness-110 transition"
            >
              {sent ? "Message Sent ✓" : (<>Send Message <Send className="arr h-4 w-4" /></>)}
            </button>
          </form>
        </FadeUp>
      </div>
    </section>
  );
}