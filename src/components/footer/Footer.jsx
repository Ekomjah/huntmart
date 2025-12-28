import { Link } from "react-router";
export default function Footer() {
  const convertToSentenceCase = (str) => {
    return str
      .toLowerCase()
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-gray-50 text-gray-700">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center justify-center gap-2">
              <img
                src="/favicons/favicon-dark.svg"
                className="h-8 w-8"
                alt="huntmart_logo"
              />
              <h3 className="text-xl font-semibold text-(--hunt-primary)">
                HuntMart
              </h3>
            </div>
            <p className="mt-3 text-sm text-gray-600">
              A electronic shopping mall that lets you live the true experience
              of shopping by letting you hunt down your most desired products at
              unbeatable prices.
            </p>

            <div className="mt-6">
              <p className="text-sm font-medium text-gray-900">
                Accepted payments
              </p>
              <div className="mt-3 flex items-center space-x-3" aria-hidden>
                <span className="flex h-6 w-10 items-center justify-center rounded-sm bg-gray-200 text-xs">
                  <img
                    src="https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63eb1ce8816711ebecac46d8_stripe.png"
                    alt="stripe_logo"
                  />
                </span>
                <span className="flex h-6 w-10 items-center justify-center rounded-sm bg-gray-200 text-xs">
                  <img
                    src="https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63eb1ce82d440b7ab84a993f_visa.png"
                    alt="visa_logo"
                  />
                </span>
                <span className="flex h-6 w-10 items-center justify-center rounded-sm bg-gray-200 text-xs">
                  <img
                    src="https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63eb1ce8f032504012a5896b_Mastercard.png"
                    alt="mastercard_logo"
                  />
                </span>
                <span className="flex h-6 w-10 items-center justify-center rounded-sm bg-gray-200 text-xs">
                  <img
                    src="https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63eb1ce7c4510cf9a55828a0_PayPal.png"
                    alt="paypal_logo"
                  />
                </span>
                <span className="flex h-6 w-10 items-center justify-center rounded-sm bg-gray-200 text-xs">
                  <img
                    src="https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e4707380264b25e680_ApplePay.png"
                    alt="applepay_logo"
                  />
                </span>
                <span className="flex h-6 w-10 items-center justify-center rounded-sm bg-gray-200 text-xs">
                  <img
                    src="https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63eb1f55dc68c5ee83d0cbf8_GooglePay.png"
                    alt="gpay_logo"
                  />
                </span>
              </div>
            </div>
          </div>

          {/* Departments */}
          <nav aria-label="Departments" className="text-sm">
            <h4 className="text-sm font-semibold text-gray-900">Department</h4>
            <ul className="mt-4 space-y-2 text-gray-600">
              {[
                "electronics",
                "fashion",
                "beauty-personal-care",
                "home-living",
                "groceries",
                "sports-outdoors",
                "automotive",
              ]
                .map((el) => convertToSentenceCase(el))
                .map((el) => {
                  return (
                    <li>
                      <Link className="text-(--hunt-text) hover:underline">
                        {el}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </nav>

          <div className="text-sm">
            <h4 className="text-sm font-semibold text-gray-900">
              Products & Services
            </h4>
            <ul className="mt-4 space-y-2 text-(--hunt-text)">
              <li>
                <a className="hover:underline" href="#">
                  Office Supplies
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  Beauty Products
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  Books
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  Electronics & Gadget
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  Travel Accessories
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  Fitness
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  Sneakers
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  Toys
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  Furniture
                </a>
              </li>
            </ul>
          </div>

          {/* Company & Help */}
          <div className="text-sm">
            <h4 className="text-sm font-semibold text-gray-900">Company</h4>
            <ul className="mt-4 space-y-2 text-(--hunt-text)">
              <li>
                <a className="hover:underline" href="#">
                  About us
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  About shopcart
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  Careers
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  News & Blog
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  Press Center
                </a>
              </li>
            </ul>

            <h4 className="mt-6 text-sm font-semibold text-gray-900">
              Customer
            </h4>
            <ul className="mt-4 space-y-2 text-(--hunt-text)">
              <li>
                <a className="hover:underline" href="#">
                  Help
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  Shopcart Help
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  Returns
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  Track orders
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  Contact us
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  Feedback
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-6 border-t border-gray-200 pt-6 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-gray-600">
            <span className="font-medium text-gray-900">HuntMart brands</span>
            <span className="ml-3">
              • Affiliate & Partners • Ideas & Guides • Services • Gift Card
            </span>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <a href="#" className="hover:underline">
              Shipping & Delivery
            </a>
            <a href="#" className="hover:underline">
              Order Pickup
            </a>
            <a href="#" className="hover:underline">
              Account Signup
            </a>
          </div>
        </div>

        <div className="mt-6 flex flex-col border-t border-gray-100 pt-6 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
          <p> &copy; {year} HuntMart. All rights reserved.</p>
          <div className="mt-3 md:mt-0">
            <p className="text-xs text-(--hunt-text)">🔒 Security</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// <div className="mx-auto flex max-w-[1000px] flex-wrap items-center justify-center p-8">
//   <h2 className="gap-4 text-lg font-semibold text-(--hunt-primary)">
//     HuntMart
//   </h2>
//   <div>
//     <h2 className="gap-4 text-lg font-semibold text-(--hunt-primary)">
//       Categories
//     </h2>
//
//   </div>
// </div>
