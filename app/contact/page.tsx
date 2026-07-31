"use client";

// use native <img> for a resilient fallback when the public PNG may be missing
import { useState } from "react";
import { User, Phone, Mail, FileText, MessageSquare } from "lucide-react";
import { Playfair_Display, Poppins } from "next/font/google";
import { addContactMessage } from "@/app/lib/adminStore";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export default function ContactPage() {
  // keep the expected public path; render with <img> to avoid next/image parsing errors
  const [contactForm, setContactForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [newsletterForm, setNewsletterForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  function handleContactSubmit(e: import("react").SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    addContactMessage({
      from: contactForm.name,
      email: contactForm.email,
      phone: contactForm.phone,
      subject: contactForm.subject || "General Enquiry",
      body: contactForm.message,
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      date: "Today",
      tag: "Contact",
    });
    setContactSubmitted(true);
  }

  function handleNewsletterSubmit(e: import("react").SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setNewsletterSubmitted(true);
  }

 return (
  <main className={`min-h-screen bg-[#CAF0F8] ${poppins.className}`}>
    {/* Hero Section */}
    <section className="bg-[#CAF0F8]">
      <div className="mx-auto max-w-5xl px-6 py-12 lg:py-16">
        <div className="text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#0077B6]">
            CONTACT US
          </p>

          <h1
            className={`${playfairDisplay.className} mt-4 text-4xl font-semibold leading-none text-[#023047] sm:text-5xl lg:text-6xl`}
          >
            Let's Build
            <br />
            <span className="text-[#0096C7]">Meaningful Connections</span>
          </h1>

        </div>
      </div>
    </section>

            <section id="contact-forms" className="bg-[#CAF0F8] px-6 pb-16 pt-4 lg:px-8 lg:pb-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">

          <section className="rounded-[24px] border border-[#8ECAE6] bg-white p-6 shadow-[0_8px_24px_rgba(2,48,71,0.08)] sm:p-8 lg:p-10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#0077B6]">
                Contact Form
              </p>

              <h2 className={`${playfairDisplay.className} mt-3 text-3xl font-semibold tracking-tight text-[#023047] sm:text-4xl`}>
                Get In Touch
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-7 text-[#023047] sm:text-base">
                Tell us what you need and our team will connect with you as soon as possible.
              </p>
            </div>

            {contactSubmitted ? (
              <div className="mt-8 rounded-4xl border border-[#8ECAE6] bg-[#ADE8F4] px-6 py-10 text-center">

                <h3 className={`${playfairDisplay.className} mt-4 text-2xl font-semibold text-[#023047]`}>
                  Message Sent!
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#023047]">
                  Thank you for reaching out. We&apos;ll respond as soon as possible.
                </p>

                <button
                  onClick={() => {
                    setContactSubmitted(false);
                    setContactForm({
                      name: "",
                      phone: "",
                      email: "",
                      subject: "",
                      message: "",
                    });
                  }}
                  className={`mt-6 inline-flex items-center justify-center rounded-full bg-[#0077B6] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0096C7] ${poppins.className}`}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="mt-8 space-y-4">

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                  <label className="block">
  <span className="mb-2 block text-sm font-medium text-[#023047]">
    Name
  </span>

  <div className="relative">
    <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0077B6]" />

    <input
      type="text"
      value={contactForm.name}
      onChange={(e) =>
        setContactForm((current) => ({
          ...current,
          name: e.target.value,
        }))
      }
      className="w-full rounded-xl border border-[#8ECAE6] bg-white py-3 pl-11 pr-4 text-sm text-[#023047] outline-none placeholder:text-[#219EBC]"
      placeholder="Your name"
      required
    />
  </div>
</label>


<label className="block">
  <span className="mb-2 block text-sm font-medium text-[#023047]">
    Phone Number
  </span>

  <div className="relative">
    <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0077B6]" />

    <input
      type="tel"
      value={contactForm.phone}
      onChange={(e) =>
        setContactForm((current) => ({
          ...current,
          phone: e.target.value,
        }))
      }
      className="w-full rounded-xl border border-[#8ECAE6] bg-white py-3 pl-11 pr-4 text-sm text-[#023047] outline-none placeholder:text-[#219EBC]"
      placeholder="Your number"
      required
    />
  </div>
</label>

</div>


<label className="block">
  <span className="mb-2 block text-sm font-medium text-[#023047]">
    Email
  </span>

  <div className="relative">
    <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0077B6]" />

    <input
      type="email"
      value={contactForm.email}
      onChange={(e) =>
        setContactForm((current) => ({
          ...current,
          email: e.target.value,
        }))
      }
      className="w-full rounded-xl border border-[#8ECAE6] bg-white py-3 pl-11 pr-4 text-sm text-[#023047] outline-none placeholder:text-[#219EBC]"
      placeholder="Your email"
      required
    />
  </div>
</label>


<label className="block">
  <span className="mb-2 block text-sm font-medium text-[#023047]">
    Subject
  </span>

  <div className="relative">
    <FileText className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0077B6]" />

    <input
      type="text"
      value={contactForm.subject}
      onChange={(e) =>
        setContactForm((current) => ({
          ...current,
          subject: e.target.value,
        }))
      }
      className="w-full rounded-xl border border-[#8ECAE6] bg-white py-3 pl-11 pr-4 text-sm text-[#023047] outline-none placeholder:text-[#219EBC]"
      placeholder="Subject"
      required
    />
  </div>
</label>


<label className="block">
  <span className="mb-2 block text-sm font-medium text-[#023047]">
    Message
  </span>

  <div className="relative">
    <MessageSquare className="absolute left-4 top-5 h-4 w-4 text-[#0077B6]" />

    <textarea
      rows={5}
      value={contactForm.message}
      onChange={(e) =>
        setContactForm((current) => ({
          ...current,
          message: e.target.value,
        }))
      }
      className="w-full rounded-4xl border border-[#8ECAE6] bg-white py-4 pl-11 pr-4 text-sm text-[#023047] outline-none placeholder:text-[#219EBC]"
      placeholder="Tell us about your inquiry"
      required
    />
  </div>
</label>

                <button
                  type="submit"
                  className={`inline-flex w-full items-center justify-center rounded-full bg-[#0077B6] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#0096C7] ${poppins.className}`}
                >
                  Send Message
                </button>

              </form>
            )}
          </section>


          <section className="pt-2 lg:pt-10">
            <div className="max-w-2xl">

              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#0077B6]">
                Newsletter
              </p>

              <h2 className={`${playfairDisplay.className} mt-3 text-3xl font-semibold tracking-tight text-[#023047] sm:text-4xl`}>
                Subscribe to our Newsletter
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-7 text-[#023047] sm:text-base">
                Stay updated with our latest stories, community initiatives, events, and opportunities to make an impact.
              </p>

            </div>         
               {newsletterSubmitted ? (
              <div className="mt-8 max-w-2xl px-0 py-4">

                <h3
                  className={`${playfairDisplay.className} mt-4 text-2xl font-semibold text-[#023047]`}
                >
                  Thanks for subscribing!
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#023047]">
                  We&apos;ll send our latest updates to your inbox.
                </p>

                <button
                  onClick={() => {
                    setNewsletterSubmitted(false);
                    setNewsletterForm({
                      firstName: "",
                      lastName: "",
                      email: "",
                      message: "",
                    });
                  }}
                  className={`mt-6 inline-flex items-center justify-center rounded-full bg-[#0077B6] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0096C7] ${poppins.className}`}
                >
                  Subscribe Another Email
                </button>

              </div>
            ) : (

              <form onSubmit={handleNewsletterSubmit} className="mt-8 space-y-6">

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">

                  <label className="block">
                    <span className="sr-only">First Name</span>
                    <input
                      type="text"
                      placeholder="First Name"
                      value={newsletterForm.firstName}
                      onChange={(e) =>
                        setNewsletterForm((current) => ({
                          ...current,
                          firstName: e.target.value,
                        }))
                      }
                      className="w-full border-0 border-b border-[#8ECAE6] bg-transparent px-0 pb-3 text-sm text-[#023047] outline-none transition placeholder:text-[#219EBC] focus:border-[#0077B6] focus:ring-0"
                      required
                    />
                  </label>


                  <label className="block">
                    <span className="sr-only">Last Name</span>
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={newsletterForm.lastName}
                      onChange={(e) =>
                        setNewsletterForm((current) => ({
                          ...current,
                          lastName: e.target.value,
                        }))
                      }
                      className="w-full border-0 border-b border-[#8ECAE6] bg-transparent px-0 pb-3 text-sm text-[#023047] outline-none transition placeholder:text-[#219EBC] focus:border-[#0077B6] focus:ring-0"
                      required
                    />
                  </label>

                </div>


                <label className="block">
                  <span className="sr-only">Email</span>

                  <input
                    type="email"
                    placeholder="Email"
                    value={newsletterForm.email}
                    onChange={(e) =>
                      setNewsletterForm((current) => ({
                        ...current,
                        email: e.target.value,
                      }))
                    }
                    className="w-full border-0 border-b border-[#8ECAE6] bg-transparent px-0 pb-3 text-sm text-[#023047] outline-none transition placeholder:text-[#219EBC] focus:border-[#0077B6] focus:ring-0"
                    required
                  />

                </label>


                <label className="block">
                  <span className="sr-only">Message</span>

                  <textarea
                    rows={5}
                    placeholder="Message"
                    value={newsletterForm.message}
                    onChange={(e) =>
                      setNewsletterForm((current) => ({
                        ...current,
                        message: e.target.value,
                      }))
                    }
                    className="w-full resize-none rounded-[18px] border border-[#8ECAE6] bg-white px-4 py-4 text-sm text-[#023047] outline-none placeholder:text-[#219EBC] focus:border-[#0077B6]"
                    required
                  />

                </label>


                <button
                  type="submit"
                  className={`inline-flex items-center justify-center rounded-full bg-[#0077B6] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#0096C7] ${poppins.className}`}
                >
                  Submit
                </button>

              </form>
            )}
          </section>
          </div>
      </section>

      <p className="px-6 pb-8 text-center text-xs text-[#64748B] lg:px-8">
        © 2026 Pavdhan Foundation • Empowering Students through the Sustainable Development Goals
      </p>
    </main>
  );
}
