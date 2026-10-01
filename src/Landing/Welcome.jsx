import { Link } from "react-router";
import { ArrowRight, Truck, Shield, Zap } from "lucide-react";
import heroImg from "@/assets/pictures/landing/hero.jpg";
import fashionImg from "@/assets/pictures/landing/fashion.jpg";
import lifestyleImg from "@/assets/pictures/landing/lifestyle.jpg";
import electronicsImg from "@/assets/pictures/landing/electronics.jpg";
import groceriesImg from "@/assets/pictures/landing/groceries.jpg";
import homeDecorImg from "@/assets/pictures/landing/homedecor.jpg";

const FEATURES = [
  {
    icon: Truck,
    title: "Fast Delivery",
    body: "Quick and reliable shipping to get your items when you need them.",
  },
  {
    icon: Shield,
    title: "Secure Shopping",
    body: "Your data and transactions are protected with enterprise-grade security.",
  },
  {
    icon: Zap,
    title: "Unbeatable Prices",
    body: "Hunt for the best deals and exclusive offers only on HuntMart.",
  },
];

const COLLECTIONS = [
  { img: electronicsImg, title: "Electronics", desc: "Latest tech gadgets" },
  { img: fashionImg, title: "Fashion", desc: "Trendy apparel" },
  { img: lifestyleImg, title: "Lifestyle", desc: "Quality essentials" },
  {
    img: groceriesImg,
    title: "Groceries",
    desc: "Tasty food and good fruits for healthy living",
  },
  { img: homeDecorImg, title: "Home Decor", desc: "Stylish home accents" },
];

export default function Welcome() {
  return (
    <div className="min-h-screen bg-(--hunt-bg)">
      <section className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-16 md:grid-cols-2 md:py-24">
        <div className="space-y-6">
          <div className="flex items-center gap-2 font-semibold text-(--hunt-primary-deep)">
            <img src="/favicons/favicon-dark.svg" alt="" className="w-6" />
            <span>Welcome to HuntMart</span>
          </div>
          <h1 className="text-4xl leading-tight font-bold text-(--hunt-text) md:text-5xl">
            Hunt Down Amazing Deals
          </h1>
          <p className="text-lg leading-relaxed text-gray-600">
            Discover the most quality products at unbeatable prices. Your
            perfect shopping experience starts here.
          </p>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-(--hunt-primary-deep) px-8 py-3 font-semibold text-white transition-colors hover:bg-(--hunt-primary)"
            >
              Start Shopping <ArrowRight size={18} />
            </Link>
            <Link
              to="/shop"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-8 py-3 font-semibold text-(--hunt-text) transition-colors hover:border-gray-400 hover:bg-gray-50"
            >
              Learn More
            </Link>
          </div>
        </div>

        <div>
          <img
            src={heroImg}
            alt="Products ready to shop"
            width={1400}
            height={933}
            fetchPriority="high"
            decoding="async"
            className="aspect-4/3 w-full rounded-xl object-cover"
          />
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="mb-10 text-center text-3xl font-bold text-(--hunt-text)">
            Why Choose HuntMart?
          </h2>
          <ul className="grid list-none gap-8 p-0 md:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, body }) => (
              <li key={title}>
                <span className="mb-4 block w-fit rounded-lg bg-(--hunt-primary) p-3">
                  <Icon className="text-white" size={24} />
                </span>
                <h3 className="mb-2 text-lg font-bold text-(--hunt-text)">
                  {title}
                </h3>
                <p className="text-gray-600">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-(--hunt-search-bg)">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="mb-10 text-center text-3xl font-bold text-(--hunt-text)">
            Featured Collections
          </h2>
          <ul className="grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {COLLECTIONS.map(({ img, title, desc }) => (
              <li key={title}>
                <Link
                  to="/shop"
                  className="group block overflow-hidden rounded-xl bg-white"
                >
                  <img
                    src={img}
                    alt={title}
                    width={800}
                    height={533}
                    loading="lazy"
                    decoding="async"
                    className="aspect-3/2 w-full object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-(--hunt-text)">
                      {title}
                    </h3>
                    <p className="text-sm text-gray-600">{desc}</p>
                    <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-(--hunt-primary-deep)">
                      Explore{" "}
                      <ArrowRight
                        size={16}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center">
          <h2 className="text-3xl font-bold text-(--hunt-text)">
            Ready to Start Hunting?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Join thousands of satisfied shoppers finding amazing deals every day
          </p>
          <Link
            to="/shop"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-(--hunt-primary-deep) px-10 py-4 text-lg font-semibold text-white transition-colors hover:bg-(--hunt-primary)"
          >
            Explore Our Store <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}