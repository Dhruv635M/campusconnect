
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Star,
  MessageCircle,
  ShoppingBag,
  ShieldCheck,
  Package,
} from "lucide-react";

function ProductDetails({
  product,
  products,
  onBack,
  onSelectProduct,
}) {
  const images =
    product.images?.length > 0
      ? product.images
      : [product.image];

  const [activeImage, setActiveImage] = useState(images[0]);

  const similarProducts = useMemo(() => {
    return products
      .filter(
        (item) =>
          item.id !== product.id &&
          item.category === product.category
      )
      .slice(0, 3)
      .concat(
        products
          .filter(
            (item) =>
              item.id !== product.id &&
              item.category !== product.category
          )
          .slice(0, Math.max(0, 3 - products.filter(
            (item) =>
              item.id !== product.id &&
              item.category === product.category
          ).length))
      );
  }, [products, product]);

  const formatPrice = (price) =>
    `₹ ${Number(price).toLocaleString("en-IN")}`;

  const handleContactSeller = () => {
    alert("Seller chat functionality will be connected later.");
  };

  const handleBuyNow = () => {
    alert(
      product.type === "For Rent"
        ? "Rental functionality will be connected later."
        : "Purchase functionality will be connected later."
    );
  };

  return (
    <div className="min-h-screen bg-[#F5F8F8] text-[#123D50]">
      <div className="mx-auto w-full max-w-[1450px] px-4 py-6 sm:px-6 lg:px-8">

        {/* BACK BUTTON */}

        <button
          type="button"
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-[#0F766E]"
        >
          <ArrowLeft size={18} />
          Back to Marketplace
        </button>

        {/* PRODUCT DETAILS CONTAINER */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7 lg:p-8">

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_280px] xl:grid-cols-[minmax(0,1fr)_310px]">

            {/* LEFT: PRODUCT INFORMATION */}

            <div className="grid grid-cols-1 gap-6 md:grid-cols-[260px_minmax(0,1fr)] lg:gap-8">

              {/* IMAGE GALLERY */}

              <div>
                <div className="flex h-[260px] items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-slate-50 sm:h-[300px]">
                  <img
                    src={activeImage}
                    alt={product.name}
                    className="h-full w-full object-contain p-3"
                  />
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {images.map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() => setActiveImage(image)}
                      className={`flex h-[65px] w-[65px] items-center justify-center overflow-hidden rounded-lg border-2 bg-slate-50 transition ${
                        activeImage === image
                          ? "border-[#0F766E]"
                          : "border-slate-200 hover:border-[#9CCBC1]"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} view ${index + 1}`}
                        className="h-full w-full object-contain p-1"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* PRODUCT DETAILS */}

              <div className="flex min-w-0 flex-col">
                <p className="text-xs font-bold uppercase tracking-[1.5px] text-[#0F766E]">
                  {product.category}
                </p>

                <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-[#123D50] sm:text-3xl">
                  {product.name}
                </h1>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <p className="text-2xl font-extrabold text-[#123D50] sm:text-3xl">
                    {formatPrice(product.price)}
                  </p>

                  {product.type === "For Rent" && (
                    <span className="text-sm font-medium text-slate-500">
                      / day
                    </span>
                  )}

                  <span className="rounded-full bg-[#FFF2CC] px-3 py-1 text-xs font-bold text-[#946B00]">
                    {product.condition}
                  </span>
                </div>

                <div className="mt-5 space-y-3 border-b border-slate-100 pb-5 text-sm">
                  <div className="flex flex-wrap items-center gap-2 text-slate-500">
                    <ShieldCheck size={17} className="text-[#0F766E]" />
                    <span>Posted by:</span>
                    <span className="font-semibold text-[#123D50]">
                      {product.sellerName || "Campus Seller"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-500">
                    <MapPin size={17} className="text-[#0F766E]" />
                    <span>Location:</span>
                    <span className="font-semibold text-[#123D50]">
                      {product.location || "College Campus"}
                    </span>
                  </div>
                </div>

                {/* DESCRIPTION */}

                <div className="mt-5">
                  <h2 className="text-base font-bold text-[#123D50]">
                    Description
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {product.description ||
                      "Contact the seller for more information about this product."}
                  </p>
                </div>

                {/* ACTION BUTTONS */}

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleContactSeller}
                    className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-[#0F766E] bg-white px-5 py-3 text-sm font-bold text-[#0F766E] transition hover:bg-[#E0F2F1]"
                  >
                    <MessageCircle size={18} />
                    Contact Seller
                  </button>

                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#5145E5] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#4035C7]"
                  >
                    <ShoppingBag size={18} />
                    {product.type === "For Rent" ? "Rent Now" : "Buy Now"}
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT: SELLER INFORMATION */}

            <aside className="h-fit rounded-2xl border border-slate-200 bg-[#FBFDFD] p-5">
              <h2 className="text-base font-bold text-[#123D50]">
                Seller Info
              </h2>

              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E0F2F1] text-lg font-bold text-[#0F766E]">
                  {(product.sellerName || "C").charAt(0).toUpperCase()}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-[#123D50]">
                    {product.sellerName || "Campus Seller"}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    CampusConnect Member
                  </p>
                </div>
              </div>

              <div className="my-5 flex items-center justify-between border-y border-slate-100 py-4">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                  <ShieldCheck size={15} className="text-[#0F766E]" />
                  Verified listing
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-slate-700">
                  <Star size={14} className="fill-[#E7B544] text-[#E7B544]" />
                  New seller
                </div>
              </div>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleContactSeller}
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-[#123D50] transition hover:border-[#0F766E] hover:bg-[#F0FAF8]"
                >
                  View Profile
                </button>

                <button
                  type="button"
                  onClick={handleContactSeller}
                  className="w-full rounded-lg bg-[#5145E5] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#4035C7]"
                >
                  Chat Now
                </button>
              </div>
            </aside>

          </div>

          {/* SIMILAR PRODUCTS */}

          {similarProducts.length > 0 && (
            <section className="mt-10 border-t border-slate-100 pt-7">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-extrabold text-[#123D50]">
                  Similar Products
                </h2>

                <span className="text-xs font-medium text-slate-400">
                  You may also like
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {similarProducts.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelectProduct(item)}
                    className="group flex min-w-0 items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 text-left transition hover:-translate-y-0.5 hover:border-[#9CCBC1] hover:shadow-sm"
                  >
                    <div className="flex h-24 w-28 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-50">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-contain p-2 transition group-hover:scale-105"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-[#123D50]">
                        {item.name}
                      </p>

                      <p className="mt-2 text-sm font-extrabold text-[#0F766E]">
                        {formatPrice(item.price)}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {item.condition}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}

        </div>

        {/* FOOTER NOTE */}

        <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-400">
          <Package size={14} />
          Buy and sell safely within your campus community
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
