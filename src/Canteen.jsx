
import { useMemo, useState } from "react";
import {
  GraduationCap,
  Search,
  Settings,
  Bell,
  UserCircle,
  LayoutGrid,
  Coffee,
  Utensils,
  Sandwich,
  CupSoda,
  Cake,
  ShoppingCart,
  Clock,
  Plus,
  Minus,
  Truck,
  ShoppingBag,
  LogOut,
  LayoutDashboard,
  ChevronDown,
} from "lucide-react";

import OrderTracking from "./OrderTracking";

// FOOD ITEMS

const menuItems = [
  {
    id: 1,
    name: "Veg Thali",
    price: 80,
    category: "Main Course",
    image: "/veg-thali.jpg",
  },
  {
    id: 2,
    name: "Paneer Wrap",
    price: 70,
    category: "Snacks",
    image: "/paneer-wrap.jpg",
  },
  {
    id: 3,
    name: "Veg Burger",
    price: 60,
    category: "Snacks",
    image: "/veg-burger.jpg",
  },
  {
    id: 4,
    name: "French Fries",
    price: 50,
    category: "Snacks",
    image: "/french-fries.jpg",
  },
  {
    id: 5,
    name: "Cold Coffee",
    price: 60,
    category: "Beverages",
    image: "/cold-coffee.jpg",
  },
  {
    id: 6,
    name: "Momos",
    price: 70,
    category: "Snacks",
    image: "/momos.jpg",
  },
];

// CATEGORIES

const categories = [
  { name: "All", icon: LayoutGrid },
  { name: "Breakfast", icon: Coffee },
  { name: "Main Course", icon: Utensils },
  { name: "Snacks", icon: Sandwich },
  { name: "Beverages", icon: CupSoda },
  { name: "Desserts", icon: Cake },
];

// USER INITIALS

const getInitials = (name = "") => {
  return (
    name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join("") || "U"
  );
};

// ROLE FORMAT

const formatRole = (role) => {
  const roles = {
    student: "Student",
    faculty: "Faculty",
    teacher: "Teacher",
    admin: "Admin",
  };

  return roles[(role || "").toLowerCase()] || "Member";
};

// MAIN CANTEEN COMPONENT

function Canteen({ user, onDashboardClick, onLogout }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [pickupTime, setPickupTime] = useState("12:30 PM");

  const [deliveryMethod, setDeliveryMethod] = useState("pickup");
  const [classroom, setClassroom] = useState("");

  const [showTracking, setShowTracking] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // LOGGED-IN USER DETAILS

  const displayName = user?.name?.trim() || "User";
  const displayRole = formatRole(user?.role);
  const profileImage = user?.profileImage || "";
  const initials = getInitials(displayName);

  // LOAD PREVIOUS ORDER

  const [currentOrder, setCurrentOrder] = useState(() => {
    try {
      const savedOrder = localStorage.getItem(
        "campusconnectCurrentOrder"
      );

      return savedOrder ? JSON.parse(savedOrder) : null;
    } catch (error) {
      console.error("Could not load saved order:", error);
      return null;
    }
  });

  // FILTER FOOD ITEMS

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const categoryMatch =
        activeCategory === "All" ||
        item.category === activeCategory;

      const searchMatch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [activeCategory, search]);

  // ADD TO CART

  const addToCart = (item) => {
    setCart((previous) => {
      const existing = previous.find(
        (food) => food.id === item.id
      );

      if (existing) {
        return previous.map((food) =>
          food.id === item.id
            ? { ...food, quantity: food.quantity + 1 }
            : food
        );
      }

      return [...previous, { ...item, quantity: 1 }];
    });
  };

  // CHANGE QUANTITY

  const changeQuantity = (id, amount) => {
    setCart((previous) =>
      previous
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // BILL CALCULATION

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const deliveryFee = deliveryMethod === "delivery" ? 20 : 0;
  const total = subtotal + deliveryFee;

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // PLACE ORDER

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      alert("Please add items to your cart.");
      return;
    }

    if (deliveryMethod === "delivery" && !classroom.trim()) {
      alert("Please enter your classroom number.");
      return;
    }

    const orderDetails = {
      id: "CC" + Date.now().toString().slice(-5),

      items: cart.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),

      subtotal,
      deliveryFee,
      total,
      method: deliveryMethod,

      classroom:
        deliveryMethod === "delivery"
          ? classroom.trim()
          : "",

      pickupTime,
      date: new Date().toLocaleDateString(),
      status: 0,
    };

    setCurrentOrder(orderDetails);

    localStorage.setItem(
      "campusconnectCurrentOrder",
      JSON.stringify(orderDetails)
    );

    setCart([]);
    setDeliveryMethod("pickup");
    setClassroom("");

    setShowTracking(true);
  };

  // OPEN ORDER TRACKING

  const handleTrackOrders = () => {
    if (!currentOrder) {
      alert("You haven't placed an order yet.");
      return;
    }

    setShowTracking(true);
  };

  // ORDER TRACKING PAGE

  if (showTracking) {
    return (
      <OrderTracking
        order={currentOrder}
        onBack={() => setShowTracking(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F0FAFA] p-3 sm:p-5">
      <div className="mx-auto max-w-[1700px] overflow-hidden rounded-2xl border border-[#DCE9E8] bg-white shadow-[0_4px_20px_rgba(18,61,80,0.08)]">

        {/* NAVBAR */}

        <header className="relative flex min-h-[82px] flex-wrap items-center gap-4 border-b border-[#E5EEEE] bg-white px-5 py-4 md:px-7">

          {/* LOGO */}

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#E0F2F1] p-2">
              <GraduationCap
                size={30}
                className="text-[#123D50]"
              />
            </div>

            <h1 className="whitespace-nowrap text-xl font-extrabold text-[#123D50] sm:text-2xl">
              CampusConnect
            </h1>
          </div>

          {/* SEARCH BAR */}

          <div className="flex h-11 min-w-[150px] flex-1 items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 focus-within:border-teal-600">
            <Search
              size={19}
              className="shrink-0 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search food items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-full min-w-0 flex-1 border-0 bg-transparent p-0 text-sm outline-none focus:ring-0"
            />
          </div>

          {/* NAVBAR RIGHT SIDE */}

          <div className="ml-auto flex items-center gap-3 text-[#123D50]">

            {/* TRACK ORDERS */}

            <button
              type="button"
              onClick={handleTrackOrders}
              className="group inline-flex h-11 items-center gap-2.5 rounded-xl bg-[#123D50] px-4 text-sm font-semibold tracking-wide text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#0F766E]"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/15">
                <Truck size={17} />
              </span>
              <span>Track Orders</span>
            </button>

            {/* SETTINGS */}

            <button
              type="button"
              title="Settings"
              className="hidden transition hover:text-[#0F766E] sm:block"
            >
              <Settings size={22} />
            </button>

            {/* NOTIFICATIONS */}

            <button
              type="button"
              title="Notifications"
              className="relative hidden transition hover:text-[#0F766E] sm:block"
            >
              <Bell size={22} />
              <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-[#D6A84B]" />
            </button>

            {/* USER PROFILE */}

            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setShowProfileMenu((previous) => !previous)
                }
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-white p-1.5 transition hover:border-[#0F766E] hover:bg-[#F0FAFA]"
                aria-label="Open profile menu"
              >
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt={displayName}
                    className="h-9 w-9 rounded-full border border-slate-200 object-cover"
                  />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E0F2F1] text-sm font-bold text-[#0F766E]">
                    {initials}
                  </div>
                )}

                <span className="hidden max-w-[110px] truncate text-sm font-semibold text-[#123D50] lg:block">
                  {displayName}
                </span>

                <ChevronDown
                  size={15}
                  className="mr-1 hidden text-slate-500 sm:block"
                />
              </button>

              {/* PROFILE DROPDOWN */}

              {showProfileMenu && (
                <>
                  <button
                    type="button"
                    aria-label="Close profile menu"
                    className="fixed inset-0 z-40 cursor-default"
                    onClick={() => setShowProfileMenu(false)}
                  />

                  <div className="absolute right-0 top-14 z-50 w-64 overflow-hidden rounded-xl border border-slate-200 bg-white p-3 shadow-xl">

                    {/* USER INFORMATION */}

                    <div className="flex items-center gap-3 border-b border-slate-100 px-2 pb-3">
                      {profileImage ? (
                        <img
                          src={profileImage}
                          alt={displayName}
                          className="h-11 w-11 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E0F2F1] font-bold text-[#0F766E]">
                          {initials}
                        </div>
                      )}

                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-[#123D50]">
                          {displayName}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-500">
                          {displayRole}
                        </p>
                      </div>
                    </div>

                    {/* DASHBOARD */}

                    <button
                      type="button"
                      onClick={() => {
                        setShowProfileMenu(false);
                        onDashboardClick?.();
                      }}
                      className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-[#F0FAFA] hover:text-[#0F766E]"
                    >
                      <LayoutDashboard size={18} />
                      Dashboard
                    </button>

                    {/* LOGOUT */}

                    <button
                      type="button"
                      onClick={() => {
                        setShowProfileMenu(false);
                        onLogout?.();
                      }}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* MAIN LAYOUT */}

        <div className="grid grid-cols-1 lg:grid-cols-[200px_minmax(0,1fr)_360px] 2xl:grid-cols-[220px_minmax(0,1fr)_420px]">

          {/* LEFT SIDEBAR */}

          <aside className="border-b border-[#E5EEEE] bg-white p-5 lg:border-b-0 lg:border-r">
            <h2 className="mb-5 text-lg font-bold text-[#123D50]">
              Canteen Menu
            </h2>

            <div className="flex gap-2 overflow-x-auto lg:flex-col">
              {categories.map((category) => {
                const Icon = category.icon;

                return (
                  <button
                    key={category.name}
                    type="button"
                    onClick={() =>
                      setActiveCategory(category.name)
                    }
                    className={`flex min-w-fit items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${
                      activeCategory === category.name
                        ? "bg-[#E0F2F1] text-[#0F766E]"
                        : "text-slate-600 hover:bg-[#F0FAFA] hover:text-[#0F766E]"
                    }`}
                  >
                    <Icon size={19} />
                    {category.name}
                  </button>
                );
              })}
            </div>
          </aside>

          {/* FOOD MENU */}

          <main className="min-w-0 bg-[#F7FAFA] p-5 sm:p-7">
            <div className="mb-7">
              <p className="mb-1 text-xs font-bold uppercase tracking-[2px] text-[#0F766E]">
                Freshly prepared for you
              </p>

              <h2 className="text-2xl font-extrabold text-[#123D50]">
                Explore Our Menu
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Choose your favourite food and order before lunch.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 2xl:grid-cols-3">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#E3ECEA] bg-white p-3 shadow-[0_3px_12px_rgba(18,61,80,0.06)] transition duration-200 hover:-translate-y-1 hover:shadow-lg"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-40 w-full rounded-xl object-cover object-center"
                  />

                  <div className="flex flex-1 flex-col px-1 pb-1 pt-3">
                    <h3 className="text-base font-bold text-[#123D50]">
                      {item.name}
                    </h3>

                    <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                      <span className="text-lg font-extrabold text-[#0F766E]">
                        ₹ {item.price}
                      </span>

                      <span className="rounded-full bg-[#E0F2F1] px-2.5 py-1 text-xs font-medium text-[#0F766E]">
                        {item.category}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => addToCart(item)}
                      className="mt-3 w-full rounded-full bg-[#0F766E] py-2 text-sm font-bold text-white shadow-sm transition hover:bg-[#123D50]"
                    >
                      <span className="inline-flex items-center justify-center gap-2">
                        <Plus size={16} />
                        Add to Cart
                      </span>
                    </button>
                  </div>
                </div>
              ))}

              {filteredItems.length === 0 && (
                <div className="col-span-full rounded-xl bg-white p-10 text-center text-slate-500">
                  No food items found.
                </div>
              )}
            </div>
          </main>

          {/* RIGHT CART PANEL */}

          <aside className="min-w-0 border-t border-[#E5EEEE] bg-white p-6 sm:p-8 lg:border-l lg:border-t-0">

            <div className="mb-8 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl font-extrabold text-[#123D50]">
                  Your Cart
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Review your selected items
                </p>
              </div>

              <span className="rounded-full bg-[#E0F2F1] px-4 py-2 text-sm font-bold text-[#0F766E]">
                {cartCount} items
              </span>
            </div>

            {/* CART ITEMS */}

            <div className="space-y-7">
              {cart.length === 0 ? (
                <div className="rounded-2xl bg-[#F7FAFA] px-4 py-12 text-center">
                  <ShoppingCart
                    size={42}
                    className="mx-auto mb-4 text-[#0F766E]"
                  />

                  <p className="font-semibold text-[#123D50]">
                    Your cart is empty
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    Add something delicious!
                  </p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex min-w-0 items-center gap-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 shrink-0 rounded-xl object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-base font-bold text-[#123D50]">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-sm font-semibold text-[#0F766E]">
                        ₹ {item.price * item.quantity}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      <button
                        type="button"
                        aria-label={`Remove one ${item.name}`}
                        onClick={() =>
                          changeQuantity(item.id, -1)
                        }
                        className="rounded-full bg-[#E0F2F1] p-2 text-[#0F766E] transition hover:bg-[#C9E8E5]"
                      >
                        <Minus size={14} />
                      </button>

                      <span className="min-w-5 text-center text-sm font-bold text-[#123D50]">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        aria-label={`Add one ${item.name}`}
                        onClick={() =>
                          changeQuantity(item.id, 1)
                        }
                        className="rounded-full bg-[#E0F2F1] p-2 text-[#0F766E] transition hover:bg-[#C9E8E5]"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* PICKUP TIME */}

            <label className="mb-4 mt-8 block text-sm font-bold text-[#123D50]">
              <span className="mb-3 flex items-center gap-2 text-base">
                <Clock size={19} className="text-[#0F766E]" />
                Select Pickup Time
              </span>

              <select
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="w-full rounded-xl border border-[#DCE8E7] bg-[#F8FBFB] px-4 py-3.5 text-sm font-medium text-[#123D50] outline-none transition focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
              >
                <option>12:00 PM</option>
                <option>12:15 PM</option>
                <option>12:30 PM</option>
                <option>12:45 PM</option>
                <option>01:00 PM</option>
                <option>01:15 PM</option>
              </select>
            </label>

            {/* DELIVERY METHOD */}

            <div className="mt-6">
              <h3 className="mb-3 text-base font-bold text-[#123D50]">
                How would you like to receive your order?
              </h3>

              <div className="space-y-3">

                {/* SELF PICKUP */}

                <label
                  className={`flex cursor-pointer items-center justify-between rounded-xl border p-3 transition ${
                    deliveryMethod === "pickup"
                      ? "border-[#0F766E] bg-[#F0FAF8]"
                      : "border-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ShoppingBag
                      size={21}
                      className="text-[#0F766E]"
                    />

                    <div>
                      <p className="font-semibold text-[#123D50]">
                        Self Pickup
                      </p>

                      <p className="text-xs text-slate-500">
                        Collect food from the canteen
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-green-600">
                      Free
                    </span>

                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="pickup"
                      checked={deliveryMethod === "pickup"}
                      onChange={() => setDeliveryMethod("pickup")}
                      className="accent-[#0F766E]"
                    />
                  </div>
                </label>

                {/* CLASSROOM DELIVERY */}

                <div
                  className={`rounded-xl border p-3 transition ${
                    deliveryMethod === "delivery"
                      ? "border-[#0F766E] bg-[#F0FAF8]"
                      : "border-slate-200"
                  }`}
                >
                  <label className="flex cursor-pointer items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Truck
                        size={22}
                        className="text-[#0F766E]"
                      />

                      <div>
                        <p className="font-semibold text-[#123D50]">
                          Deliver to Classroom
                        </p>

                        <p className="text-xs text-slate-500">
                          Get food delivered to your class
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-amber-600">
                        + ₹20
                      </span>

                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="delivery"
                        checked={deliveryMethod === "delivery"}
                        onChange={() => setDeliveryMethod("delivery")}
                        className="accent-[#0F766E]"
                      />
                    </div>
                  </label>

                  {deliveryMethod === "delivery" && (
                    <div className="mt-3">
                      <label className="mb-2 block text-xs font-semibold text-[#123D50]">
                        Enter Classroom / Room Number
                      </label>

                      <input
                        type="text"
                        value={classroom}
                        onChange={(e) => setClassroom(e.target.value)}
                        placeholder="Example: Room 204"
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#0F766E]"
                      />

                      <p className="mt-2 text-xs text-slate-500">
                        Additional delivery charge of ₹20 applies.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* PRICE SUMMARY */}

            <div className="my-8 space-y-3 border-y border-[#E5EEEE] py-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-600">
                  Subtotal
                </span>

                <span className="font-bold text-[#123D50]">
                  ₹ {subtotal}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-600">
                  Delivery Charge
                </span>

                <span className="font-bold text-[#123D50]">
                  ₹ {deliveryFee}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xl font-extrabold text-[#123D50]">
                  Total
                </span>

                <span className="text-3xl font-extrabold text-[#0F766E]">
                  ₹ {total}
                </span>
              </div>
            </div>

            {/* PLACE ORDER */}

            <button
              type="button"
              disabled={cart.length === 0}
              onClick={handlePlaceOrder}
              className={`mt-4 w-full rounded-full py-4 text-base font-bold text-white shadow-md transition ${
                cart.length === 0
                  ? "cursor-not-allowed bg-slate-300"
                  : "bg-[#0F766E] hover:bg-[#123D50]"
              }`}
            >
              Place Order
            </button>

            <p className="mt-5 text-center text-sm text-slate-400">
              Fresh food, ready when you are!
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Canteen;
