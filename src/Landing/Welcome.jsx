import { Link } from "react-router";
import { ArrowRight, Sparkles, Truck, Shield, Zap } from "lucide-react";
import heroImg from "@/assets/pictures/freestocks-VFrcRtEQKL8-unsplash.jpg";
import bannerImg1 from "@/assets/pictures/charlesdeluvio-FK81rxilUXg-unsplash.jpg";
import bannerImg2 from "@/assets/pictures/maria-lin-kim-8RaUEd8zD-U-unsplash.jpg";
import bannerImg3 from "@/assets/pictures/nathan-waters-ykH4Wtocefc-unsplash.jpg";
import styles from "./welcome.module.css";

export default function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950">
      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-20">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={`${styles["animate-blob"]} absolute -top-40 -right-40 h-80 w-80 rounded-full bg-purple-500 opacity-20 mix-blend-multiply blur-3xl filter`}
          ></div>
          <div
            className={`${styles["animate-blob"]} ${styles["animation-delay-2000"]} absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-500 opacity-20 mix-blend-multiply blur-3xl filter`}
          ></div>
          <div
            className={`${styles["animate-blob"]} ${styles["animation-delay-4000"]} absolute top-1/2 left-1/2 h-80 w-80 rounded-full bg-pink-500 opacity-20 mix-blend-multiply blur-3xl filter`}
          ></div>
        </div>
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 md:grid-cols-2">
          {/* Left Content */}
          <div className={`${styles["animate-fadeInUp"]} space-y-6 text-white`}>
            <div className="flex items-center gap-2 font-semibold text-purple-400">
              <img src="/favicons/favicon-dark.svg" className="w-8" />
              <span>Welcome to HuntMart</span>
            </div>
            <h1 className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-5xl leading-tight font-bold text-transparent md:text-6xl">
              Hunt Down Amazing Deals
            </h1>
            <p className="text-xl leading-relaxed text-gray-300">
              Discover the most quality products at unbeatable prices. Your
              perfect shopping experience starts here.
            </p>
            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              <Link
                to="/shop"
                className="inline-flex transform items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-purple-700 hover:to-pink-700"
              >
                Start Shopping <ArrowRight size={20} />
              </Link>
              <button className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-purple-400 px-8 py-3 font-bold text-purple-400 transition-all duration-300 hover:bg-purple-400 hover:text-white">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div
            className={`${styles["animate-fadeInDown"]} relative h-96 min-h-96 md:h-full`}
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-30 blur-2xl"></div>
            <img
              src={heroImg}
              alt="Shopping"
              className="relative h-full w-full rounded-2xl object-cover shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative bg-gradient-to-b from-transparent via-slate-900 to-slate-950 px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-16 text-center text-4xl font-bold text-white">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              HuntMart?
            </span>
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="group rounded-xl border border-purple-500/20 bg-gradient-to-br from-purple-900/20 to-pink-900/20 p-8 transition-all duration-300 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/20">
              <div className="mb-4 w-fit rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 p-3">
                <Truck className="text-white" size={28} />
              </div>
              <h3 className="mb-3 text-xl font-bold text-white">
                Fast Delivery
              </h3>
              <p className="text-gray-300">
                Quick and reliable shipping to get your items when you need
                them.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group rounded-xl border border-purple-500/20 bg-gradient-to-br from-purple-900/20 to-pink-900/20 p-8 transition-all duration-300 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/20">
              <div className="mb-4 w-fit rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 p-3">
                <Shield className="text-white" size={28} />
              </div>
              <h3 className="mb-3 text-xl font-bold text-white">
                Secure Shopping
              </h3>
              <p className="text-gray-300">
                Your data and transactions are protected with enterprise-grade
                security.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group rounded-xl border border-purple-500/20 bg-gradient-to-br from-purple-900/20 to-pink-900/20 p-8 transition-all duration-300 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/20">
              <div className="mb-4 w-fit rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 p-3">
                <Zap className="text-white" size={28} />
              </div>
              <h3 className="mb-3 text-xl font-bold text-white">
                Unbeatable Prices
              </h3>
              <p className="text-gray-300">
                Hunt for the best deals and exclusive offers only on HuntMart.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Preview Section */}
      <section className="relative bg-slate-950 px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-16 text-center text-4xl font-bold text-white">
            Featured{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Collections
            </span>
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                img: bannerImg1,
                title: "Electronics",
                desc: "Latest tech gadgets",
              },
              { img: bannerImg2, title: "Fashion", desc: "Trendy apparel" },
              {
                img: bannerImg3,
                title: "Lifestyle",
                desc: "Quality essentials",
              },
            ].map((collection, idx) => (
              <div
                key={idx}
                className="group relative h-64 cursor-pointer overflow-hidden rounded-xl"
              >
                <img
                  src={collection.img}
                  alt={collection.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="mb-1 text-2xl font-bold text-white">
                    {collection.title}
                  </h3>
                  <p className="mb-3 text-sm text-gray-300">
                    {collection.desc}
                  </p>
                  <span className="inline-flex items-center gap-2 font-semibold text-purple-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    Explore <ArrowRight size={18} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative border-y border-purple-500/20 bg-gradient-to-r from-purple-900/40 via-slate-950 to-pink-900/40 px-4 py-20">
        <div className="mx-auto max-w-4xl space-y-8 text-center">
          <h2 className="text-4xl font-bold text-white md:text-5xl">
            Ready to Start Hunting?
          </h2>
          <p className="text-xl text-gray-300">
            Join thousands of satisfied shoppers finding amazing deals every day
          </p>
          <Link
            to="/shop"
            className="inline-flex transform items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-10 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-purple-700 hover:to-pink-700"
          >
            Explore Our Store <ArrowRight size={24} />
          </Link>
        </div>
      </section>
    </div>
  );
}
