
import { useState } from "react";
import {
  ArrowLeft,
  ShoppingBag,
  CheckCircle2,
  ChefHat,
  PackageCheck,
  Clock,
  MapPin,
  Truck,
  CalendarDays,
  Utensils,
  ReceiptText,
} from "lucide-react";

const sampleOrders = [
  {
    id: "CC1024",
    items: [
      { name: "Paneer Wrap", quantity: 1, price: 70 },
      { name: "Cold Coffee", quantity: 1, price: 60 },
    ],
    total: 150,
    deliveryFee: 20,
    method: "delivery",
    classroom: "Room 204",
    date: "20 Apr",
    pickupTime: "12:30 PM",
    status: 2,
  },
  {
    id: "CC1023",
    items: [{ name: "Veg Thali", quantity: 1, price: 80 }],
    total: 80,
    deliveryFee: 0,
    method: "pickup",
    classroom: "",
    date: "19 Apr",
    pickupTime: "01:15 PM",
    status: 3,
  },
  {
    id: "CC1022",
    items: [{ name: "Momos", quantity: 1, price: 70 }],
    total: 70,
    deliveryFee: 0,
    method: "pickup",
    classroom: "",
    date: "18 Apr",
    pickupTime: "11:20 AM",
    status: 4,
  },
];

const trackingSteps = [
  { title: "Order Placed", icon: ShoppingBag, time: "12:00 PM" },
  { title: "Order Confirmed", icon: CheckCircle2, time: "12:05 PM" },
  { title: "Preparing Your Food", icon: ChefHat, time: "12:20 PM" },
  { title: "Ready", icon: PackageCheck, time: "12:45 PM" },
];

function OrderTracking({ order, onBack }) {
  const [activeTab, setActiveTab] = useState("active");

  const [selectedOrder, setSelectedOrder] = useState(
    order || sampleOrders[0]
  );

  const orders = order
    ? [order, ...sampleOrders.filter((item) => item.id !== order.id)]
    : sampleOrders;

  const activeOrders = orders.filter((item) => item.status < 4);
  const pastOrders = orders.filter((item) => item.status >= 4);

  const visibleOrders =
    activeTab === "active" ? activeOrders : pastOrders;

  const isDelivery = selectedOrder.method === "delivery";

  const statusText = (status) => {
    if (status >= 4) return "Completed";
    if (status === 3) return "Ready";
    if (status === 2) return "Preparing";
    if (status === 1) return "Confirmed";
    return "Order Placed";
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7F8] px-4 py-6 sm:px-6 lg:px-10">

      <div className="mx-auto max-w-[1400px]">

        {/* TOP HEADER */}
        <div className="mb-7">

          <button
            onClick={handleBack}
            className="mb-5 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-[#123D50] transition hover:bg-[#E7F1F0]"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-[#123D50] sm:text-3xl">
                My Canteen Orders
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Track your food orders and manage your order history.
              </p>
            </div>

            <div className="flex w-fit items-center gap-2 rounded-full border border-[#CFE6E1] bg-[#EAF6F3] px-4 py-2 text-sm font-semibold text-[#0F766E]">
              <Utensils size={16} />
              CampusConnect Canteen
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="overflow-hidden rounded-2xl border border-[#E0E9EC] bg-white shadow-[0_5px_25px_rgba(18,61,80,0.06)]">

          {/* CONTENT HEADER */}
          <div className="flex flex-col justify-between gap-3 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:px-7">

            <div>
              <h2 className="text-lg font-bold text-[#123D50]">
                Order Overview
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Select an order to view its tracking details.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <ReceiptText size={16} />
              {orders.length} Total Orders
            </div>
          </div>

          {/* TWO COLUMN LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr]">

            {/* LEFT SIDE - ORDER LIST */}
            <div className="border-b border-slate-100 p-5 sm:p-7 lg:border-b-0 lg:border-r">

              {/* TABS */}
              <div className="mb-6 flex gap-7 border-b border-slate-200">

                <button
                  onClick={() => setActiveTab("active")}
                  className={`relative flex items-center gap-2 pb-3 text-sm font-bold transition ${
                    activeTab === "active"
                      ? "text-[#0F766E]"
                      : "text-slate-400 hover:text-slate-700"
                  }`}
                >
                  Active Orders

                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] ${
                      activeTab === "active"
                        ? "bg-[#DDF3ED] text-[#0F766E]"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {activeOrders.length}
                  </span>

                  {activeTab === "active" && (
                    <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-[#0F766E]" />
                  )}
                </button>

                <button
                  onClick={() => setActiveTab("past")}
                  className={`relative flex items-center gap-2 pb-3 text-sm font-bold transition ${
                    activeTab === "past"
                      ? "text-[#0F766E]"
                      : "text-slate-400 hover:text-slate-700"
                  }`}
                >
                  Past Orders

                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] ${
                      activeTab === "past"
                        ? "bg-[#DDF3ED] text-[#0F766E]"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {pastOrders.length}
                  </span>

                  {activeTab === "past" && (
                    <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-[#0F766E]" />
                  )}
                </button>
              </div>

              {/* ORDER CARDS */}
              <div className="space-y-4">

                {visibleOrders.length === 0 && (
                  <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-5 py-12 text-center">
                    <ShoppingBag
                      size={32}
                      className="mx-auto mb-3 text-slate-300"
                    />
                    <h3 className="font-bold text-[#123D50]">
                      No {activeTab} orders
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Your orders will appear here.
                    </p>
                  </div>
                )}

                {visibleOrders.map((item) => {
                  const selected = selectedOrder.id === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedOrder(item)}
                      className={`w-full rounded-2xl border p-4 text-left transition duration-200 sm:p-5 ${
                        selected
                          ? "border-[#0F766E] bg-[#F0F9F7] shadow-[0_4px_15px_rgba(15,118,110,0.08)]"
                          : "border-slate-200 bg-white hover:border-[#B9DAD3] hover:bg-slate-50"
                      }`}
                    >

                      <div className="flex items-start justify-between gap-3">

                        <div className="min-w-0">

                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-bold text-[#123D50]">
                              Order #{item.id}
                            </h3>

                            {selected && (
                              <span className="rounded-full bg-[#DDF3ED] px-2 py-0.5 text-[10px] font-bold text-[#0F766E]">
                                SELECTED
                              </span>
                            )}
                          </div>

                          <p className="mt-2 text-sm text-slate-500">
                            {item.items
                              .map((food) => food.name)
                              .join(" • ")}
                          </p>

                        </div>

                        <span
                          className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
                            item.status >= 4
                              ? "bg-blue-100 text-blue-700"
                              : item.status === 3
                              ? "bg-green-100 text-green-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {statusText(item.status)}
                        </span>

                      </div>

                      <div className="my-4 flex items-center justify-between border-b border-slate-200/70 pb-3">
                        <span className="text-xs text-slate-400">
                          Total Amount
                        </span>

                        <span className="text-lg font-extrabold text-[#123D50]">
                          ₹{item.total}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3">

                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <CalendarDays size={14} />
                          {item.date}, {item.pickupTime}
                        </div>

                        <div className="flex items-center gap-2 text-xs font-semibold text-[#0F766E]">
                          {item.method === "delivery" ? (
                            <>
                              <Truck size={15} />
                              Classroom: {item.classroom}
                            </>
                          ) : (
                            <>
                              <ShoppingBag size={15} />
                              Self Pickup
                            </>
                          )}
                        </div>

                      </div>

                    </button>
                  );
                })}

              </div>
            </div>

            {/* RIGHT SIDE - TRACKING DETAILS */}
            <div className="bg-[#FAFCFC] p-5 sm:p-7">

              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-wider text-[#0F766E]">
                  Order Details
                </p>

                <h2 className="mt-1 text-xl font-extrabold text-[#123D50]">
                  #{selectedOrder.id}
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Follow your order progress below.
                </p>
              </div>

              {/* TRACKING CARD */}
              <div className="rounded-2xl border border-[#E1EAED] bg-white p-5 shadow-sm sm:p-6">

                <div className="mb-6 flex items-center justify-between">
                  <h3 className="font-bold text-[#123D50]">
                    Order Status
                  </h3>

                  <span className="rounded-full bg-[#EAF6F3] px-3 py-1 text-xs font-bold text-[#0F766E]">
                    {statusText(selectedOrder.status)}
                  </span>
                </div>

                {/* TIMELINE */}
                <div className="relative ml-2">

                  {trackingSteps.map((step, index) => {
                    const Icon = step.icon;
                    const completed = index <= selectedOrder.status;
                    const current = index === selectedOrder.status;

                    return (
                      <div
                        key={step.title}
                        className="relative flex min-h-[76px] gap-4"
                      >

                        {index !== trackingSteps.length - 1 && (
                          <div
                            className={`absolute left-[17px] top-9 h-[48px] w-[2px] ${
                              index < selectedOrder.status
                                ? "bg-[#0F766E]"
                                : "bg-slate-200"
                            }`}
                          />
                        )}

                        <div
                          className={`z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 transition ${
                            current
                              ? "border-[#0F766E] bg-[#0F766E] text-white shadow-md shadow-teal-100"
                              : completed
                              ? "border-[#0F766E] bg-[#EAF6F3] text-[#0F766E]"
                              : "border-slate-200 bg-white text-slate-300"
                          }`}
                        >
                          <Icon size={16} />
                        </div>

                        <div className="pt-1">
                          <p
                            className={`text-sm font-bold ${
                              completed
                                ? "text-[#123D50]"
                                : "text-slate-400"
                            }`}
                          >
                            {step.title}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {index < selectedOrder.status
                              ? step.time
                              : current
                              ? "Currently in progress"
                              : "Waiting for update"}
                          </p>
                        </div>

                        {current && (
                          <span className="ml-auto mt-1 h-2 w-2 animate-pulse rounded-full bg-[#0F766E]" />
                        )}

                      </div>
                    );
                  })}

                  {/* FINAL DELIVERY / PICKUP STEP */}
                  <div className="relative flex min-h-[65px] gap-4">

                    <div
                      className={`z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 ${
                        selectedOrder.status >= 4
                          ? "border-[#0F766E] bg-[#0F766E] text-white"
                          : "border-slate-200 bg-white text-slate-300"
                      }`}
                    >
                      {isDelivery ? (
                        <MapPin size={16} />
                      ) : (
                        <ShoppingBag size={16} />
                      )}
                    </div>

                    <div className="pt-1">
                      <p
                        className={`text-sm font-bold ${
                          selectedOrder.status >= 4
                            ? "text-[#123D50]"
                            : "text-slate-400"
                        }`}
                      >
                        {isDelivery
                          ? "Delivered to Classroom"
                          : "Picked Up"}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {selectedOrder.status >= 4
                          ? "Order completed"
                          : "Waiting for completion"}
                      </p>
                    </div>

                  </div>
                </div>
              </div>

              {/* DELIVERY INFORMATION */}
              <div className="mt-5 rounded-2xl border border-[#D8EAE5] bg-[#EDF7F4] p-5">

                <div className="mb-4 flex items-center gap-2">
                  {isDelivery ? (
                    <Truck size={18} className="text-[#0F766E]" />
                  ) : (
                    <ShoppingBag size={18} className="text-[#0F766E]" />
                  )}

                  <h3 className="text-sm font-bold text-[#123D50]">
                    Delivery Information
                  </h3>
                </div>

                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Delivery Method
                </p>

                <p className="mt-1 font-bold text-[#123D50]">
                  {isDelivery
                    ? `Classroom Delivery - ${selectedOrder.classroom}`
                    : "Self Pickup"}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-[#D6E8E2] pt-3">
                  <div>
                    <p className="text-xs text-slate-500">
                      {isDelivery ? "Delivery Charge" : "Pickup Charge"}
                    </p>
                    <p className="mt-1 text-sm font-bold text-[#123D50]">
                      ₹{selectedOrder.deliveryFee ?? 0}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-slate-500">
                      {isDelivery ? "Classroom" : "Collection Time"}
                    </p>
                    <p className="mt-1 text-sm font-bold text-[#123D50]">
                      {isDelivery
                        ? selectedOrder.classroom
                        : selectedOrder.pickupTime}
                    </p>
                  </div>
                </div>

              </div>

              {/* ORDER TOTAL */}
              <div className="mt-5 flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4">
                <div>
                  <p className="text-xs text-slate-500">
                    Total Order Amount
                  </p>
                  <p className="mt-1 text-xl font-extrabold text-[#123D50]">
                    ₹{selectedOrder.total}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF6F3] text-[#0F766E]">
                  <ReceiptText size={21} />
                </div>
              </div>

            </div>
          </div>
        </div>

        <p className="mt-5 text-center text-xs text-slate-400">
          CampusConnect • Smart Campus Food Ordering
        </p>

      </div>
    </div>
  );
}

export default OrderTracking;
