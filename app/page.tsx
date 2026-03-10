"use client";
import { Navbar } from "@/components/ui/Navbar";
import { GlowCard } from "@/components/ui/GlowCard";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ChatBot } from "@/components/ui/ChatBot";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { ElectricText, ElectricButton, ElectricDivider } from "@/components/ui/ElectricEffects";
import { Footer } from "@/components/ui/Footer";

export default function Page() {
  return (
    <main className="min-h-screen bg-bg">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-electric-glow" />
      <Navbar />

      {/* HERO */}
      <section className="mx-auto max-w-container px-7 pt-24 pb-16 text-center">
        <h1 className="h1">
          <ElectricText color="gold">I Want My</ElectricText>
          <br />
          <span className="relative inline-block">
            <span className="absolute inset-0 blur-xl bg-gradient-to-r from-brand to-brand2 opacity-70"></span>
            <span className="relative bg-gradient-to-r from-brand to-brand2 bg-clip-text text-transparent">
              Lawyer Present
            </span>
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-[760px] p-lead">
          Premium merchandise celebrating your constitutional rights. Shop our collection of 
          apparel, accessories, and educational materials.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <ElectricButton color="gold" variant="solid" onClick={() => window.location.href = '/shop/products'}>
            Shop Now
          </ElectricButton>
          <Button variant="primary" href="/shop/categories">Browse Categories</Button>
          <Button variant="ghost" href="/shop/account">My Account</Button>
        </div>
      </section>

      <ElectricDivider className="mx-auto max-w-container px-7" color="gold" />

      {/* FOUNDER PROFILE */}
      <section className="mx-auto max-w-container px-7 py-20">
        <SectionHeading
          eyebrow="Founder Profile"
          title={'Meet Donyale "DThree" Mack'}
          subtitle="A mission-driven founder building products that protect rights, expand access, and create real opportunity."
        />

        <div className="mt-10">
          <GlowCard className="p-8 lg:p-10">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="lg:col-span-1">
                <div className="flex aspect-square items-center justify-center rounded-2xl bg-gradient-to-br from-brand/20 to-brand2/20 border border-brand/25">
                  <div className="text-center">
                    <div className="text-5xl font-extrabold tracking-tight text-brand">DM</div>
                    <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted">Founder</p>
                  </div>
                </div>
              </div>

              <div className="space-y-5 text-text/90 lg:col-span-2">
                <div>
                  <h3 className="text-2xl font-extrabold tracking-tight text-text">Donyale &quot;DThree&quot; Mack</h3>
                  <p className="text-brand2 font-semibold">Founder and CEO, MackEnterprises</p>
                  <p className="text-sm text-muted">Chief Innovation Officer, A MackProjekt</p>
                </div>

                <p className="leading-relaxed">
                  Donyale Mack is an entrepreneur and technologist focused on using AI, data, and product design to solve
                  practical problems for people who are too often left out of traditional systems. The work behind I Want My
                  Lawyer Present is rooted in lived experience, civic responsibility, and a commitment to constitutional rights.
                </p>

                <p className="leading-relaxed">
                  Through MackEnterprises and A MackProjekt, Donyale builds high-impact platforms that combine public
                  education, community support, and accessible digital tools. The mission is simple: build products that work,
                  inform, and create measurable social impact.
                </p>

                <div className="rounded-xl border border-border bg-glass p-4">
                  <p className="text-sm italic text-brand2">
                    &quot;Innovation happens when technology meets purpose. We are not building ideas for attention, we are
                    building products for real people.&quot;
                  </p>
                </div>
              </div>
            </div>
          </GlowCard>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section id="products" className="mx-auto max-w-container px-7 pt-8 pb-20">
        <SectionHeading
          eyebrow="Featured Collection"
          title="Know Your Rights Merchandise"
          subtitle="Quality products that remind you of your constitutional rights."
        />

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: "👕", name: "Legal Rights T-Shirt", price: "$29.99", description: "Premium cotton tee" },
            { icon: "🧥", name: "Constitutional Hoodie", price: "$59.99", description: "Comfortable hoodie" },
            { icon: "🧢", name: "Know Your Rights Cap", price: "$24.99", description: "Adjustable cap" },
            { icon: "☕", name: "Legal Defense Mug", price: "$19.99", description: "Ceramic mug" },
            { icon: "📚", name: "Rights Reference Guide", price: "$34.99", description: "Comprehensive guide" },
            { icon: "🎁", name: "Legal Rights Gift Set", price: "$79.99", description: "Curated collection" }
          ].map((product) => (
            <GlowCard key={product.name} className="group hover:shadow-neon transition-all duration-300 p-6">
              <div className="text-6xl mb-4 text-center">{product.icon}</div>
              <div className="text-lg font-extrabold tracking-tight text-text mb-2">{product.name}</div>
              <div className="text-brand text-xl font-bold mb-3">{product.price}</div>
              <div className="text-sm text-muted leading-relaxed mb-4">{product.description}</div>
              <Button variant="primary" href="/shop/products" className="w-full">View Details</Button>
            </GlowCard>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="primary" href="/shop/products" className="px-8 py-4 text-lg">View All Products →</Button>
        </div>
      </section>

      <ElectricDivider className="mx-auto max-w-container px-7" color="gold" />

      {/* CATEGORIES */}
      <section className="mx-auto max-w-container px-7 py-20">
        <SectionHeading
          eyebrow="Shop by Category"
          title="Find What You Need"
          subtitle="Browse our organized collection."
        />

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: "👕", name: "Apparel", count: "12 products", description: "T-shirts, hoodies, more" },
            { icon: "🎒", name: "Accessories", count: "8 products", description: "Caps, bags, essentials" },
            { icon: "🏠", name: "Home & Office", count: "6 products", description: "Decor and desk items" },
            { icon: "📚", name: "Books & Media", count: "15 products", description: "Educational materials" }
          ].map((category) => (
            <a key={category.name} href="/shop/categories">
              <GlowCard className="group hover:shadow-neon transition-all duration-300 cursor-pointer p-6">
                <div className="text-5xl mb-4">{category.icon}</div>
                <div className="text-lg font-extrabold tracking-tight text-text mb-1">{category.name}</div>
                <div className="text-xs text-brand mb-2">{category.count}</div>
                <div className="text-sm text-muted">{category.description}</div>
              </GlowCard>
            </a>
          ))}
        </div>
      </section>

      <ElectricDivider className="mx-auto max-w-container px-7" color="gold" />

      {/* WHY CHOOSE US */}
      <section className="mx-auto max-w-container px-7 py-20">
        <SectionHeading eyebrow="Why Choose Us" title="Quality & Purpose" subtitle="Every purchase supports legal education." />

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          <GlowCard className="p-6 text-center">
            <div className="text-5xl mb-4">⚖️</div>
            <h3 className="text-xl font-extrabold tracking-tight text-text mb-3">Know Your Rights</h3>
            <p className="text-sm text-muted leading-relaxed">Reminders of your fundamental legal rights.</p>
          </GlowCard>

          <GlowCard className="p-6 text-center">
            <div className="text-5xl mb-4">✨</div>
            <h3 className="text-xl font-extrabold tracking-tight text-text mb-3">Premium Quality</h3>
            <p className="text-sm text-muted leading-relaxed">High-quality materials and printing.</p>
          </GlowCard>

          <GlowCard className="p-6 text-center">
            <div className="text-5xl mb-4">🎓</div>
            <h3 className="text-xl font-extrabold tracking-tight text-text mb-3">Educational Impact</h3>
            <p className="text-sm text-muted leading-relaxed">Supporting legal education programs.</p>
          </GlowCard>
        </div>
      </section>

      <ElectricDivider className="mx-auto max-w-container px-7" color="gold" />

      {/* CTA */}
      <section className="mx-auto max-w-container px-7 py-20 text-center">
        <GlowCard className="p-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-text mb-4">Ready to Shop?</h2>
          <p className="mx-auto max-w-[600px] text-muted mb-8">Browse our collection of legal rights merchandise.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <ElectricButton color="gold" variant="solid" onClick={() => window.location.href = '/shop/products'}>
              Start Shopping
            </ElectricButton>
            <Button variant="ghost" href="/shop/categories">Browse Categories</Button>
          </div>
        </GlowCard>
      </section>

      <Footer />
      <ChatBot />
      <CookieConsent />
    </main>
  );
}
