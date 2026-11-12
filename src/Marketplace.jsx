
import { useMemo, useState } from "react";
import {
  GraduationCap,
  Search,
  Plus,
  ShoppingCart,
  BookOpen,
  Laptop,
  Shirt,
  Dumbbell,
  Package,
  Tag,
  X,
  Eye,
  MapPin,
} from "lucide-react";

// INITIAL MARKETPLACE PRODUCTS

const initialProducts = [
  {
    id: 1,
    name: "MacBook Air (M1)",
    price: 45000,
    category: "Electronics",
    type: "For Sale",
    condition: "Used",
    image:
      "Macbook-air.jpg",
    description:
      "MacBook Air M1 in excellent working condition. Ideal for students.",
  },
  {
    id: 2,
    name: "Textbooks (Set)",
    price: 800,
    category: "Books",
    type: "For Sale",
    condition: "Used",
    image:
      "Books.jpg",
    description:
      "Collection of useful college textbooks in good condition.",
  },
  {
    id: 3,
    name: "Acoustic Guitar",
    price: 5000,
    category: "Others",
    type: "For Sale",
    condition: "Used",
    image:
      "Guitar.jpg",
    description:
      "Acoustic guitar suitable for beginners and music enthusiasts.",
  },
  {
    id: 4,
    name: "College Backpack",
    price: 1200,
    category: "Clothing & Accessories",
    type: "For Sale",
    condition: "New",
    image:
      "Bag.jpg",
    description:
      "Spacious backpack with multiple compartments.",
  },
  {
    id: 5,
    name: "Wireless Earbuds",
    price: 2000,
    category: "Electronics",
    type: "For Sale",
    condition: "Used",
    image:
      "Earbuds.jpg",
    description:
      "Wireless earbuds with charging case.",
  },
  {
    id: 6,
    name: "Study Table",
    price: 2000,
    category: "Others",
    type: "For Sale",
    condition: "Used",
    image:
      "Table.jpg",
    description:
      "Compact study table, perfect for a student room.",
  },
];

// PRODUCT CATEGORIES

const categories = [
  { name: "All Categories", icon: ShoppingCart },
  { name: "Electronics", icon: Laptop },
  { name: "Books", icon: BookOpen },
  { name: "Clothing & Accessories", icon: Shirt },
  { name: "Stationery", icon: Package },
  { name: "Sports & Fitness", icon: Dumbbell },
  { name: "Others", icon: Tag },
];


// MAIN MARKETPLACE COMPONENT

function Marketplace({ onBack }) {
  const [products, setProducts] = useState(initialProducts);

  const [activeCategory, setActiveCategory] =
    useState("All Categories");

  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPostForm, setShowPostForm] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "Electronics",
    type: "For Sale",
    condition: "New",
    image: "",
    description: "",
  });

  // FILTER PRODUCTS

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "All Categories" ||
        product.category === activeCategory;

      const matchesFilter =
        activeFilter === "All" ||
        product.type === activeFilter;

      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase());

      return (
        matchesCategory &&
        matchesFilter &&
        matchesSearch
      );
    });
  }, [products, activeCategory, activeFilter, search]);

  // FORMAT PRICE

  const formatPrice = (price) =>
    `₹ ${Number(price).toLocaleString("en-IN")}`;

  // POST NEW PRODUCT

  const handlePostItem = (e) => {
    e.preventDefault();

    const product = {
      ...newProduct,
      id: Date.now(),
      price: Number(newProduct.price),
      image:
        newProduct.image.trim() ||
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600",
    };

    setProducts((prev) => [product, ...prev]);

    setNewProduct({
      name: "",
      price: "",
      category: "Electronics",
      type: "For Sale",
      condition: "New",
      image: "",
      description: "",
    });

    setShowPostForm(false);
    setActiveCategory("All Categories");
    setActiveFilter("All");
    setSearch("");
  };

  return (
    <div className="min-h-screen bg-[#F5F8F8] text-[#123D50]">

      {/* ================= HEADER ================= */}

      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:gap-6 lg:px-8">

          {/* CAMPUSCONNECT LOGO */}

          <button
            type="button"
            onClick={onBack}
            className="flex shrink-0 items-center gap-3 self-start lg:w-[245px]"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#123D50] text-white">
              <GraduationCap size={25} />
            </div>

            <span className="text-xl font-extrabold tracking-tight text-[#123D50]">
              CampusConnect
            </span>
          </button>

          {/* SEARCH BAR */}

          <div className="flex h-11 min-w-0 flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-[#0F766E] focus-within:bg-white">
            <Search
              size={19}
              className="shrink-0 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search for products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-full min-w-0 flex-1 bg-transparent text-sm text-[#123D50] outline-none placeholder:text-slate-400"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="shrink-0 text-slate-400 hover:text-slate-700"
              >
                <X size={17} />
              </button>
            )}
          </div>

          {/* POST ITEM BUTTON */}

          <button
            type="button"
            onClick={() => setShowPostForm(true)}
            className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0F766E] px-5 text-sm font-bold text-white shadow-sm transition hover:bg-[#123D50]"
          >
            <Plus size={19} />
            Post Item
          </button>

        </div>
      </header>


      {/* ================= MAIN CONTENT ================= */}

      <main className="mx-auto w-full max-w-[1500px] px-4 py-7 sm:px-6 lg:px-8 lg:py-9">

        {/* PAGE HEADING */}

        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[2px] text-[#0F766E]">
              Student Marketplace
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-[#123D50] sm:text-4xl">
              Campus Cart
            </h1>

            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Buy, sell and discover products within your campus.
            </p>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-full bg-[#E0F2F1] px-4 py-2 text-sm font-semibold text-[#0F766E]">
            <ShoppingCart size={17} />
            Marketplace
          </div>

        </div>


        {/* SIDEBAR AND PRODUCTS */}

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-7">

          {/* ================= SIDEBAR ================= */}

          <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

            <h2 className="mb-4 px-2 text-sm font-bold text-[#123D50]">
              Categories
            </h2>

            <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-1">

              {categories.map((category) => {
                const Icon = category.icon;

                const active =
                  activeCategory === category.name;

                return (
                  <button
                    key={category.name}
                    type="button"
                    onClick={() =>
                      setActiveCategory(category.name)
                    }
                    className={`flex min-w-0 items-center gap-2.5 rounded-lg px-3 py-3 text-left text-sm font-medium transition ${
                      active
                        ? "bg-[#E0F2F1] text-[#0F766E]"
                        : "text-slate-600 hover:bg-slate-50 hover:text-[#123D50]"
                    }`}
                  >
                    <Icon size={17} className="shrink-0" />

                    <span className="truncate">
                      {category.name}
                    </span>
                  </button>
                );
              })}

            </div>
          </aside>


          {/* ================= PRODUCT SECTION ================= */}

          <section className="min-w-0">

            {/* FILTER BUTTONS */}

            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">

              <div className="flex flex-wrap gap-2">

                {["All", "For Sale", "For Rent"].map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition ${
                      activeFilter === filter
                        ? "bg-[#123D50] text-white shadow-sm"
                        : "border border-slate-200 bg-white text-slate-600 hover:border-[#0F766E] hover:text-[#0F766E]"
                    }`}
                  >
                    {filter}
                  </button>
                ))}

              </div>

              <p className="text-sm text-slate-500">
                {filteredProducts.length} products found
              </p>

            </div>


            {/* PRODUCT GRID */}

            {filteredProducts.length > 0 ? (

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">

                {filteredProducts.map((product) => (

                  <article
                    key={product.id}
                    className="group min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#B7D8D0] hover:shadow-md"
                  >

                    {/* PRODUCT IMAGE */}

                    <div className="relative overflow-hidden rounded-xl bg-slate-100">

                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-40 w-full object-contain transition duration-500 group-hover:scale-105"
                      />

                      {/* CONDITION */}

                      <span className="absolute left-3 top-3 rounded-md bg-white px-2.5 py-1 text-[11px] font-semibold text-[#123D50] shadow-sm">
                        {product.condition}
                      </span>

                      {/* SALE OR RENT */}

                      <span className="absolute right-3 top-3 rounded-md bg-[#0F766E] px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
                        {product.type}
                      </span>

                    </div>


                    {/* PRODUCT INFORMATION */}

                    <div className="px-1 pb-1 pt-4">

                      <p className="text-xs font-medium text-slate-400">
                        {product.category}
                      </p>

                      <h3 className="mt-1 truncate text-base font-bold text-[#123D50]">
                        {product.name}
                      </h3>

                      <p className="mt-2 text-lg font-bold text-[#123D50]">
                        {formatPrice(product.price)}

                        {product.type === "For Rent" && (
                          <span className="ml-1 text-xs font-medium text-slate-400">
                            / day
                          </span>
                        )}
                      </p>


                      {/* PRODUCT BUTTONS */}

                      <div className="mt-4 flex gap-2">

                        <button
                          type="button"
                          onClick={() =>
                            setSelectedProduct(product)
                          }
                          className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-lg bg-[#E0F2F1] px-2 py-2.5 text-xs font-bold text-[#0F766E] transition hover:bg-[#CDE9E3]"
                        >
                          <Eye size={15} />
                          View Details
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setSelectedProduct(product)
                          }
                          className="shrink-0 rounded-lg bg-[#123D50] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#0F766E]"
                        >
                          {product.type === "For Rent" ? "Rent" : "Buy"}
                        </button>

                      </div>

                    </div>

                  </article>

                ))}

              </div>

            ) : (

              /* EMPTY SEARCH RESULTS */

              <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-5 text-center">

                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E0F2F1] text-[#0F766E]">
                  <Package size={30} />
                </div>

                <h3 className="mt-4 text-lg font-bold text-[#123D50]">
                  No products found
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Try another search or choose a different category.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setActiveCategory("All Categories");
                    setActiveFilter("All");
                  }}
                  className="mt-5 rounded-lg bg-[#123D50] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0F766E]"
                >
                  Clear Filters
                </button>

              </div>

            )}

          </section>

        </div>
      </main>


      {/* ================= PRODUCT DETAILS MODAL ================= */}

      {selectedProduct && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
          onClick={() => setSelectedProduct(null)}
        >

          <div
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-7"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              className="absolute right-4 top-4 z-10 rounded-full bg-white p-2 text-slate-600 shadow hover:bg-slate-100"
            >
              <X size={19} />
            </button>

            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="h-56 w-full rounded-xl object-cover"
            />

            <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-[#0F766E]">
              {selectedProduct.category}
            </p>

            <h2 className="mt-2 text-2xl font-bold text-[#123D50]">
              {selectedProduct.name}
            </h2>

            <p className="mt-3 text-2xl font-bold text-[#0F766E]">
              {formatPrice(selectedProduct.price)}

              {selectedProduct.type === "For Rent" && (
                <span className="text-sm font-medium text-slate-500">
                  {" "}/ day
                </span>
              )}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">

              <span className="rounded-full bg-[#E0F2F1] px-3 py-1.5 text-xs font-semibold text-[#0F766E]">
                {selectedProduct.type}
              </span>

              <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                {selectedProduct.condition}
              </span>

            </div>

            <p className="mt-5 text-sm leading-7 text-slate-600">
              {selectedProduct.description}
            </p>

            <div className="mt-5 flex items-center gap-2 rounded-xl bg-slate-50 p-3 text-sm text-slate-500">
              <MapPin size={17} />
              Available within campus
            </div>

            <button
              type="button"
              onClick={() => {
                alert(
                  "Purchase functionality will be connected later."
                );
                setSelectedProduct(null);
              }}
              className="mt-6 w-full rounded-xl bg-[#123D50] py-3.5 text-sm font-bold text-white transition hover:bg-[#0F766E]"
            >
              {selectedProduct.type === "For Rent"
                ? "Rent Item"
                : "Buy Item"}
            </button>

          </div>

        </div>

      )}


      {/* ================= POST ITEM MODAL ================= */}

      {showPostForm && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
          onClick={() => setShowPostForm(false)}
        >

          <form
            onSubmit={handlePostItem}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
          >

            <button
              type="button"
              onClick={() => setShowPostForm(false)}
              className="absolute right-5 top-5 rounded-full bg-slate-100 p-2 text-slate-600 transition hover:bg-slate-200"
            >
              <X size={19} />
            </button>

            <p className="text-xs font-bold uppercase tracking-widest text-[#0F766E]">
              Campus Marketplace
            </p>

            <h2 className="mt-2 text-2xl font-bold text-[#123D50]">
              Post an Item
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Add your product details to list it on CampusConnect.
            </p>


            <div className="mt-6 space-y-4">

              {/* PRODUCT NAME */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Product Name
                </label>

                <input
                  required
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      name: e.target.value,
                    })
                  }
                  placeholder="Enter product name"
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#0F766E]"
                />
              </div>


              {/* PRICE */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Price (₹)
                </label>

                <input
                  required
                  type="number"
                  min="1"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      price: e.target.value,
                    })
                  }
                  placeholder="Enter price"
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#0F766E]"
                />
              </div>


              {/* CATEGORY AND TYPE */}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Category
                  </label>

                  <select
                    value={newProduct.category}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        category: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-[#0F766E]"
                  >
                    {categories.slice(1).map((category) => (
                      <option
                        key={category.name}
                        value={category.name}
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>


                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Listing Type
                  </label>

                  <select
                    value={newProduct.type}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        type: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-[#0F766E]"
                  >
                    <option>For Sale</option>
                    <option>For Rent</option>
                  </select>
                </div>

              </div>


              {/* CONDITION */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Condition
                </label>

                <select
                  value={newProduct.condition}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      condition: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#0F766E]"
                >
                  <option>New</option>
                  <option>Like New</option>
                  <option>Used</option>
                </select>
              </div>


              {/* IMAGE URL */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Image URL (Optional)
                </label>

                <input
                  type="url"
                  value={newProduct.image}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      image: e.target.value,
                    })
                  }
                  placeholder="Paste image URL"
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#0F766E]"
                />
              </div>


              {/* DESCRIPTION */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Description
                </label>

                <textarea
                  rows="3"
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    })
                  }
                  placeholder="Describe your product..."
                  className="w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#0F766E]"
                />
              </div>

            </div>


            {/* SUBMIT */}

            <button
              type="submit"
              className="mt-6 w-full rounded-xl bg-[#0F766E] py-3.5 text-sm font-bold text-white transition hover:bg-[#123D50]"
            >
              Publish Item
            </button>

          </form>

        </div>

      )}

    </div>
  );
}

export default Marketplace;
