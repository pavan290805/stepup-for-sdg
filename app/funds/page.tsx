'use client'

import Image from 'next/image'
import { useState, type FormEvent } from 'react'
import {
  BadgeCheck,
  Check,
  CreditCard,
  GraduationCap,
  HandHeart,
  HeartHandshake,
  Landmark,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Smartphone,
  Users,
  X,
  type LucideIcon,
} from 'lucide-react'
import { addDonation } from '@/app/lib/adminStore'

const currencySymbol = '\u20B9'
const rightArrow = '\u2192'
const checkMark = '\u2713'

const presetAmounts = [500, 1000, 2500, 5000]
const featuredVideoId = 'BMgAM-PG0_I'

const communityProfiles = [
  '/team/pavan.png',
  '/team/vijay.png',
  '/team/eswar.png',
]

const impactCards: {
  label: string
  value: string
  icon: LucideIcon
  accent: string
}[] = [
  {
    label: 'Students Supported',
    value: '10,000+',
    icon: GraduationCap,
    accent: '#155DFC',
  },
  {
    label: 'Projects Funded',
    value: '200+',
    icon: HandHeart,
    accent: '#00A86B',
  },
  {
    label: 'Communities Impacted',
    value: '1,000+',
    icon: Users,
    accent: '#0099CC',
  },
]

const contactItems = [
  {
    label: 'General Enquiry',
    email: 'contact@stepupforsdg.org',
  },
  {
    label: 'Information',
    email: 'info@stepupforsdg.org',
  },
  {
    label: 'Partnerships',
    email: 'partner@stepupforsdg.org',
  },
]

const newsletterBenefits = [
  'We respect your privacy.',
  'No spam.',
  'Unsubscribe anytime.',
]

const inputClass =
  'w-full rounded-2xl border border-[#D7E0EA] bg-white px-4 py-3.5 text-sm font-medium text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#155DFC] focus:ring-4 focus:ring-[#155DFC]/10'

const paymentInputClass =
  'w-full rounded-xl border border-[#D7E0EA] bg-[#F8FAFC] px-3.5 py-3 text-sm font-medium text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#155DFC] focus:ring-4 focus:ring-[#155DFC]/10'

const labelClass =
  'mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-[#64748B]'

function FundsPageStyles() {
  return (
    <style>{`
      @keyframes fundsFadeIn {
        from {
          opacity: 0;
          transform: translateY(18px);
          filter: blur(8px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0);
        }
      }

      @keyframes fundsProfileFloat {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-8px);
        }
      }

      .funds-fade {
        animation: fundsFadeIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
      }

      .funds-delay-1 {
        animation-delay: 0.12s;
      }

      .funds-delay-2 {
        animation-delay: 0.22s;
      }

      .funds-profile-float {
        animation: fundsProfileFloat 4.8s ease-in-out infinite;
      }

      @media (prefers-reduced-motion: reduce) {
        .funds-fade,
        .funds-profile-float {
          animation: none !important;
        }
      }
    `}</style>
  )
}

function NewsletterSubscription() {
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleNewsletterSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!newsletterEmail.trim()) return
    setIsSubscribed(true)
  }

  return (
    <section className="relative z-10 px-5 pb-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[24px] border border-white/75 bg-[linear-gradient(135deg,rgba(234,244,255,0.96)_0%,rgba(255,255,255,0.94)_58%,rgba(255,255,255,0.88)_100%)] p-6 shadow-[0_32px_90px_-50px_rgba(21,93,252,0.42)] backdrop-blur-xl sm:p-8 lg:p-10">
        <form
          onSubmit={handleNewsletterSubmit}
          className="grid items-center gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.75fr)_auto] lg:gap-8"
        >
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <span className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,#155DFC_0%,#0099CC_58%,#00A86B_100%)] text-white shadow-[0_22px_48px_-26px_rgba(21,93,252,0.75)]">
              <Mail className="h-9 w-9" />
            </span>
            <div>
              <h2 className="font-display text-3xl font-extrabold text-[#0F172A] sm:text-4xl">
                Stay Updated
              </h2>
              <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-[#475569] sm:text-base">
                Subscribe to our newsletter and receive updates about SDG
                projects, community impact, volunteering opportunities, success
                stories, and upcoming initiatives.
              </p>
            </div>
          </div>

          <div>
            <input
              required
              type="email"
              value={newsletterEmail}
              onChange={(e) => {
                setNewsletterEmail(e.target.value)
                setIsSubscribed(false)
              }}
              placeholder="Enter your email address"
              className="h-14 w-full rounded-2xl border border-[#D7E0EA] bg-white/95 px-5 text-base font-semibold text-[#0F172A] outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] transition placeholder:text-[#94A3B8] focus:border-[#155DFC] focus:ring-4 focus:ring-[#155DFC]/15"
            />
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold text-[#64748B]">
              {newsletterBenefits.map((benefit) => (
                <span key={benefit} className="inline-flex items-center gap-1.5">
                  <span className="font-extrabold text-[#00A86B]">
                    {checkMark}
                  </span>
                  {benefit}
                </span>
              ))}
            </div>
            {isSubscribed && (
              <p className="mt-3 text-sm font-bold text-[#00A86B]">
                Thank you for subscribing.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="inline-flex h-14 w-full items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#00A86B_0%,#16C784_100%)] px-8 text-base font-extrabold text-white shadow-[0_20px_44px_-26px_rgba(0,168,107,0.85)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_58px_-28px_rgba(0,168,107,0.95)] lg:w-auto"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  )
}

function ContactInformation() {
  return (
    <section className="relative z-10 px-5 pb-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[24px] border border-white/70 bg-white/85 p-6 shadow-[0_28px_80px_-48px_rgba(15,23,42,0.34)] backdrop-blur-xl sm:p-8">
        <div className="grid gap-4 md:grid-cols-3">
          {contactItems.map((item) => (
            <a
              key={item.email}
              href={`mailto:${item.email}`}
              className="group flex items-center gap-4 rounded-[20px] border border-[#E2E8F0] bg-white px-5 py-5 shadow-[0_18px_45px_-36px_rgba(15,23,42,0.42)] transition duration-300 hover:-translate-y-1 hover:border-[#BBDCFB] hover:shadow-[0_26px_60px_-38px_rgba(21,93,252,0.42)]"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#EAF4FF] text-[#155DFC] transition duration-300 group-hover:bg-[#155DFC] group-hover:text-white">
                <Mail className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-[#64748B]">
                  {item.label}
                </span>
                <span className="mt-1 block break-words text-base font-bold text-[#0F172A] transition group-hover:text-[#155DFC]">
                  {item.email}
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function CopyrightLine() {
  return (
    <div className="relative z-10 px-5 pb-10 pt-5 text-center text-xs font-medium text-[#64748B] sm:px-6">
      {'\u00A9 2026 Pavdhan Foundation \u2022 Empowering Students through the Sustainable Development Goals'}
    </div>
  )
}

export default function FundsPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [amount, setAmount] = useState('')
  const [customAmount, setCustomAmount] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [showPayModal, setShowPayModal] = useState(false)
  const [payTab, setPayTab] = useState<'upi' | 'card' | 'netbanking'>('upi')
  const [upiId, setUpiId] = useState('')
  const [cardNo, setCardNo] = useState('')
  const [cardExp, setCardExp] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [cardName, setCardName] = useState('')
  const [selectedBank, setSelectedBank] = useState('')
  const [paying, setPaying] = useState(false)

  const finalAmount = customAmount || amount

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!finalAmount) return
    setShowPayModal(true)
  }

  const handlePay = () => {
    setPaying(true)
    setTimeout(() => {
      addDonation({
        name,
        email,
        phone,
        amount: Number(finalAmount),
        message,
        method: payTab,
      })
      setPaying(false)
      setShowPayModal(false)
      setSubmitted(true)
    }, 2000)
  }

  if (submitted) {
    return (
      <div className="relative isolate overflow-hidden bg-[#F8FAFC] text-[#0F172A]">
        <FundsPageStyles />
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div
            className="absolute inset-0 scale-105 bg-cover bg-center opacity-25 blur-2xl"
            style={{ backgroundImage: "url('/assets/images/1.jpeg')" }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(248,250,252,0.94)_52%,rgba(239,253,244,0.92)_100%)]" />
        </div>

        <section className="relative z-10 flex min-h-[72vh] items-center justify-center px-5 py-16 sm:px-6 lg:px-8">
          <div className="funds-fade w-full max-w-md rounded-[24px] border border-white/80 bg-white p-8 text-center shadow-[0_34px_90px_-44px_rgba(15,23,42,0.42)]">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-500 text-white shadow-[0_18px_36px_-20px_rgba(5,150,105,0.9)]">
              <Check className="h-8 w-8" />
            </div>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700">
              <BadgeCheck className="h-4 w-4" />
              Donation Successful
            </div>
            <h1 className="mt-5 font-display text-3xl font-bold text-[#0F172A]">
              Thank You, {name}!
            </h1>
            <p className="mt-3 text-4xl font-extrabold text-[#155DFC]">
              {currencySymbol}
              {Number(finalAmount).toLocaleString()}
            </p>
            <p className="mx-auto mt-4 max-w-xs text-sm leading-6 text-[#64748B]">
              Confirmation will be sent to{' '}
              <strong className="font-bold text-[#0F172A]">{email}</strong>.
            </p>
            <button
              onClick={() => {
                setSubmitted(false)
                setName('')
                setEmail('')
                setPhone('')
                setAmount('')
                setCustomAmount('')
                setMessage('')
              }}
              className="mt-7 inline-flex items-center justify-center rounded-full bg-[#155DFC] px-7 py-3 text-sm font-bold text-white shadow-[0_16px_36px_-20px_rgba(21,93,252,0.8)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#0F46CC]"
            >
              Make Another Donation
            </button>
          </div>
        </section>

        <NewsletterSubscription />
        <ContactInformation />
        <CopyrightLine />
      </div>
    )
  }

  return (
    <div className="relative isolate overflow-hidden bg-[#F8FAFC] text-[#0F172A]">
      <FundsPageStyles />
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute inset-0 scale-105 bg-cover bg-center opacity-25 blur-2xl"
          style={{ backgroundImage: "url('/assets/images/2.jpeg')" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.95)_0%,rgba(248,250,252,0.93)_48%,rgba(239,253,244,0.9)_100%)]" />
      </div>

      <section className="relative z-10 px-5 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-stretch gap-8 lg:grid-cols-[minmax(0,0.45fr)_minmax(0,0.55fr)] lg:gap-10">
          <div className="funds-fade flex h-full flex-col justify-between">
            <div>
              <h1 className="mt-7 font-display text-5xl font-extrabold leading-[1.02] text-[#0F172A] sm:text-6xl lg:text-[72px]">
                Your Support.
                <br />
                <span className="bg-[linear-gradient(90deg,#155DFC_0%,#00A86B_82%)] bg-clip-text text-transparent">
                  Their Tomorrow.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg font-medium leading-8 text-[#475569]">
                Every contribution you make helps build a better, more equal
                and sustainable India.
              </p>

              <div className="mt-7 flex flex-col gap-4 rounded-[22px] border border-white/75 bg-white/70 p-4 shadow-[0_22px_60px_-42px_rgba(15,23,42,0.38)] backdrop-blur-xl sm:flex-row sm:items-center">
                <div className="flex -space-x-3">
                  {communityProfiles.map((src, index) => (
                    <Image
                      key={src}
                      src={src}
                      alt=""
                      width={48}
                      height={48}
                      sizes="48px"
                      className="funds-profile-float h-12 w-12 rounded-full border-2 border-white object-cover shadow-[0_12px_26px_-18px_rgba(15,23,42,0.7)]"
                      style={{ animationDelay: `${index * 0.22}s` }}
                    />
                  ))}
                </div>
                <p className="max-w-sm text-sm font-semibold leading-6 text-[#334155]">
                  Join 12,000+ changemakers already making an impact.
                </p>
              </div>

              <div className="mt-7 overflow-hidden rounded-[24px] border border-white/70 bg-white shadow-[0_32px_80px_-42px_rgba(15,23,42,0.55)]">
                <div className="relative aspect-video overflow-hidden bg-[#EAF4FF]">
                  <iframe
                    src={`https://www.youtube.com/embed/${featuredVideoId}?autoplay=1&mute=1&loop=1&playlist=${featuredVideoId}&rel=0`}
                    title="StepUp for SDG - Impact Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.04)_0%,rgba(15,23,42,0.28)_100%)] pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="mt-7">
              <div className="grid gap-3 sm:grid-cols-3">
                {impactCards.map(({ icon: Icon, value, label, accent }) => (
                  <div
                    key={label}
                    className="rounded-[20px] border border-white/75 bg-white/85 p-5 shadow-[0_20px_55px_-40px_rgba(15,23,42,0.45)] backdrop-blur-xl transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_70px_-42px_rgba(21,93,252,0.45)]"
                  >
                    <div
                      className="grid h-11 w-11 place-items-center rounded-2xl text-white shadow-[0_14px_30px_-18px_rgba(15,23,42,0.7)]"
                      style={{ background: accent }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="mt-4 text-2xl font-extrabold text-[#0F172A]">
                      {value}
                    </div>
                    <div className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-[#64748B]">
                      {label}
                    </div>
                  </div>
                ))}
              </div>

              <blockquote className="mt-7 border-l-4 border-[#00A86B] pl-5 text-base font-semibold italic leading-7 text-[#334155]">
                &quot;Small acts, when multiplied by millions of people, can
                transform the world.&quot;
              </blockquote>
            </div>
          </div>

          <div className="funds-fade funds-delay-1 flex h-full">
            <div className="flex h-full w-full flex-col overflow-hidden rounded-[24px] border border-white/80 bg-white shadow-[0_34px_90px_-44px_rgba(15,23,42,0.5)]">
              <div className="flex items-center justify-between gap-4 bg-[linear-gradient(135deg,#155DFC_0%,#0099CC_58%,#00A86B_100%)] px-5 py-5 sm:px-7">
                <div>
                  <h2 className="font-display text-2xl font-bold text-white">
                    Make a Donation
                  </h2>
                  <p className="mt-1 text-sm font-medium text-white/78">
                    100% goes directly to SDG projects
                  </p>
                </div>
                <div className="hidden items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3.5 py-2 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] backdrop-blur-md sm:inline-flex">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="text-xs font-extrabold uppercase tracking-[0.14em]">
                    Razorpay Secure
                  </span>
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="flex flex-1 flex-col p-5 sm:p-7"
              >
                <div>
                  <label className={labelClass}>Your Details</label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full Name"
                      className={inputClass}
                    />
                    <input
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone Number"
                      type="tel"
                      className={inputClass}
                    />
                  </div>
                  <input
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    type="email"
                    className={`${inputClass} mt-3`}
                  />
                </div>

                <div className="mt-7">
                  <label className={labelClass}>
                    Donation Amount ({currencySymbol})
                  </label>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {presetAmounts.map((presetAmount) => {
                      const selected =
                        amount === String(presetAmount) && !customAmount

                      return (
                        <div key={presetAmount} className="relative pt-2">
                          {presetAmount === 1000 && (
                            <span className="absolute left-1/2 top-0 z-10 -translate-x-1/2 rounded-full bg-[#00A86B] px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.16em] text-white shadow-[0_10px_22px_-14px_rgba(0,168,107,0.9)]">
                              Popular
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              setAmount(String(presetAmount))
                              setCustomAmount('')
                            }}
                            className={`h-14 w-full rounded-2xl border text-sm font-extrabold transition duration-300 hover:-translate-y-0.5 ${
                              selected
                                ? 'border-[#155DFC] bg-[linear-gradient(135deg,#155DFC,#0099CC)] text-white shadow-[0_18px_36px_-24px_rgba(21,93,252,0.9)]'
                                : 'border-[#D7E0EA] bg-[#F8FAFC] text-[#334155] hover:border-[#BBDCFB] hover:bg-white'
                            }`}
                          >
                            {currencySymbol}
                            {presetAmount.toLocaleString()}
                          </button>
                        </div>
                      )
                    })}
                  </div>

                  <div className="relative mt-4">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-extrabold text-[#64748B]">
                      {currencySymbol}
                    </span>
                    <input
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value)
                        setAmount('')
                      }}
                      placeholder="Enter custom amount"
                      type="number"
                      min="1"
                      className={`${inputClass} pl-8`}
                    />
                  </div>
                </div>

                <div className="mt-7">
                  <label className={labelClass}>
                    Message{' '}
                    <span className="font-semibold normal-case tracking-normal text-[#94A3B8]">
                      (Optional)
                    </span>
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Why are you donating? Leave a message..."
                    rows={5}
                    className={`${inputClass} resize-none leading-6`}
                  />
                </div>

                <div className="mt-5 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
                    <LockKeyhole className="h-4 w-4" />
                  </span>
                  <span>Your donation is secure and tax-deductible.</span>
                </div>

                {finalAmount && (
                  <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-[#D7E0EA] bg-[#F8FAFC] px-4 py-3">
                    <span className="text-sm font-semibold text-[#64748B]">
                      Selected amount
                    </span>
                    <span className="text-lg font-extrabold text-[#155DFC]">
                      {currencySymbol}
                      {Number(finalAmount).toLocaleString()}
                    </span>
                  </div>
                )}

                <div className="mt-auto pt-5">
                  <button
                    type="submit"
                    disabled={!finalAmount || !name || !email || !phone}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#155DFC_0%,#0099CC_58%,#00A86B_100%)] px-6 py-4 text-base font-extrabold text-white shadow-[0_22px_48px_-28px_rgba(21,93,252,0.85)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_26px_58px_-30px_rgba(0,168,107,0.85)] disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                  >
                    Donate Securely {rightArrow}
                  </button>
                  <div className="mt-3 flex items-center justify-center gap-2 text-xs font-bold text-[#64748B]">
                    <ShieldCheck className="h-4 w-4 text-[#155DFC]" />
                    Powered by Razorpay
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <NewsletterSubscription />
      <ContactInformation />
      <CopyrightLine />

      {showPayModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#0F172A]/55 p-5 backdrop-blur-md">
          <div className="w-full max-w-md overflow-hidden rounded-[24px] bg-white shadow-[0_34px_90px_-34px_rgba(15,23,42,0.7)]">
            <div className="flex items-center justify-between gap-4 bg-[linear-gradient(135deg,#155DFC,#0099CC)] px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/16 text-white">
                  <HeartHandshake className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-white">
                    StepUp for SDG
                  </div>
                  <div className="text-xs font-medium text-white/72">
                    Amount: {currencySymbol}
                    {Number(finalAmount).toLocaleString()}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowPayModal(false)}
                className="grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
                aria-label="Close payment modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 border-b border-[#E2E8F0]">
              {(
                [
                  ['upi', 'UPI', Smartphone],
                  ['card', 'Card', CreditCard],
                  ['netbanking', 'Net Banking', Landmark],
                ] as const
              ).map(([id, label, Icon]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setPayTab(id)}
                  className={`flex items-center justify-center gap-1.5 px-2 py-3 text-[11px] font-extrabold transition ${
                    payTab === id
                      ? 'bg-white text-[#155DFC] shadow-[inset_0_-3px_0_#155DFC]'
                      : 'bg-[#F8FAFC] text-[#64748B] hover:bg-white'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              ))}
            </div>

            <div className="p-5">
              {payTab === 'upi' && (
                <div className="flex flex-col gap-4">
                  <div className="text-center">
                    <div className="text-sm font-extrabold text-[#0F172A]">
                      Scan QR Code
                    </div>
                    <div className="text-xs font-medium text-[#64748B]">
                      Use any UPI app to scan and pay
                    </div>
                  </div>
                  <div className="mx-auto grid h-36 w-36 place-items-center rounded-2xl border border-[#E2E8F0] bg-white p-2 shadow-[0_18px_45px_-35px_rgba(15,23,42,0.55)]">
                    <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                      <rect x="4" y="4" width="34" height="34" rx="3" fill="#155DFC" />
                      <rect x="11" y="11" width="20" height="20" rx="1.5" fill="white" />
                      <rect x="15" y="15" width="12" height="12" rx="1" fill="#155DFC" />
                      <rect x="82" y="4" width="34" height="34" rx="3" fill="#155DFC" />
                      <rect x="89" y="11" width="20" height="20" rx="1.5" fill="white" />
                      <rect x="93" y="15" width="12" height="12" rx="1" fill="#155DFC" />
                      <rect x="4" y="82" width="34" height="34" rx="3" fill="#155DFC" />
                      <rect x="11" y="89" width="20" height="20" rx="1.5" fill="white" />
                      <rect x="15" y="93" width="12" height="12" rx="1" fill="#155DFC" />
                      {[46, 54, 62, 70, 46, 62, 70, 50, 58, 66, 50, 66].map(
                        (x, i) => (
                          <rect
                            key={i}
                            x={x}
                            y={[4, 4, 4, 4, 14, 14, 14, 24, 24, 24, 34, 34][i]}
                            width="6"
                            height="6"
                            rx="1"
                            fill="#155DFC"
                          />
                        ),
                      )}
                      {[46, 54, 62, 70, 46, 54, 62, 70, 46, 54, 62, 70].map(
                        (x, i) => (
                          <rect
                            key={i + 20}
                            x={x}
                            y={[46, 46, 46, 46, 56, 56, 56, 56, 66, 66, 66, 66][i]}
                            width="6"
                            height="6"
                            rx="1"
                            fill="#155DFC"
                          />
                        ),
                      )}
                    </svg>
                  </div>
                  <div className="flex gap-2">
                    <input
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="yourname@upi"
                      className={`${paymentInputClass} flex-1`}
                    />
                    <button
                      type="button"
                      onClick={handlePay}
                      className="rounded-xl bg-[#155DFC] px-4 text-xs font-extrabold text-white transition hover:bg-[#0F46CC]"
                    >
                      Verify
                    </button>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map((app) => (
                      <button
                        key={app}
                        type="button"
                        onClick={handlePay}
                        className="rounded-full border border-[#CFE4FF] bg-[#EAF4FF] px-3 py-1.5 text-xs font-extrabold text-[#155DFC] transition hover:bg-white"
                      >
                        {app}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {payTab === 'card' && (
                <div className="flex flex-col gap-3">
                  <input
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="Name on Card"
                    className={paymentInputClass}
                  />
                  <input
                    value={cardNo}
                    onChange={(e) =>
                      setCardNo(
                        e.target.value
                          .replace(/\D/g, '')
                          .slice(0, 16)
                          .replace(/(\d{4})/g, '$1 ')
                          .trim(),
                      )
                    }
                    placeholder="Card Number"
                    className={paymentInputClass}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      value={cardExp}
                      onChange={(e) => setCardExp(e.target.value)}
                      placeholder="MM / YY"
                      className={paymentInputClass}
                    />
                    <input
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value.slice(0, 3))}
                      placeholder="CVV"
                      type="password"
                      className={paymentInputClass}
                    />
                  </div>
                </div>
              )}

              {payTab === 'netbanking' && (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {[
                    { name: 'SBI', color: '#1A3A8F' },
                    { name: 'HDFC', color: '#004C8F' },
                    { name: 'ICICI', color: '#B5261E' },
                    { name: 'Axis', color: '#97144D' },
                    { name: 'Kotak', color: '#E8222B' },
                    { name: 'Others', color: '#475569' },
                  ].map((bank) => (
                    <button
                      key={bank.name}
                      type="button"
                      onClick={() => setSelectedBank(bank.name)}
                      className="rounded-xl border px-3 py-3 text-sm font-extrabold transition hover:-translate-y-0.5"
                      style={{
                        borderColor:
                          selectedBank === bank.name
                            ? bank.color
                            : `${bank.color}30`,
                        background:
                          selectedBank === bank.name
                            ? `${bank.color}15`
                            : `${bank.color}08`,
                        color: bank.color,
                      }}
                    >
                      {bank.name}
                    </button>
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={handlePay}
                disabled={paying}
                className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#155DFC,#0099CC)] px-5 py-3.5 text-sm font-extrabold text-white shadow-[0_18px_42px_-26px_rgba(21,93,252,0.8)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {paying
                  ? 'Processing...'
                  : `Pay ${currencySymbol}${Number(finalAmount).toLocaleString()}`}
              </button>
              <div className="mt-3 flex items-center justify-center gap-1.5 text-xs font-bold text-[#64748B]">
                <ShieldCheck className="h-4 w-4 text-[#155DFC]" />
                Secured by <span className="text-[#155DFC]">Razorpay</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
