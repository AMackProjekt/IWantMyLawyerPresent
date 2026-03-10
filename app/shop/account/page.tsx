"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";
import { Button } from "@/components/ui/Button";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "orders" | "settings">("profile");

  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    joinDate: "January 2026",
    ordersCount: 3,
    totalSpent: 149.97,
  };

  const orders = [
    {
      id: "ORD-001",
      date: "Feb 10, 2026",
      total: 59.99,
      status: "Delivered",
      items: 2,
    },
    {
      id: "ORD-002",
      date: "Feb 5, 2026",
      total: 29.99,
      status: "Shipped",
      items: 1,
    },
    {
      id: "ORD-003",
      date: "Jan 28, 2026",
      total: 59.99,
      status: "Delivered",
      items: 2,
    },
  ];

  return (
    <div className="min-h-screen bg-bg">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-dash-glow" />

      <header className="border-b border-border bg-panel/50 backdrop-blur-xl">
        <div className="mx-auto max-w-container px-7 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/shop/products" className="text-xl font-extrabold tracking-tight text-text">
              I Want My Lawyer Present
            </a>
            <span className="text-muted">|</span>
            <span className="text-sm text-muted">Account</span>
          </div>
          
          <div className="flex items-center gap-4">
            <a href="/shop/products" className="text-sm font-semibold text-muted hover:text-text transition-colors">
              Continue Shopping
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-container px-7 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-text">My Account</h1>
          <p className="mt-2 text-muted">Manage your profile and orders</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <GlowCard className="p-6">
              <div className="flex items-center gap-4">
                <div className="text-3xl">��</div>
                <div>
                  <div className="text-2xl font-extrabold tracking-tight text-text">{user.ordersCount}</div>
                  <div className="text-xs text-muted mt-1">Total Orders</div>
                </div>
              </div>
            </GlowCard>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <GlowCard className="p-6">
              <div className="flex items-center gap-4">
                <div className="text-3xl">💰</div>
                <div>
                  <div className="text-2xl font-extrabold tracking-tight text-text">${user.totalSpent}</div>
                  <div className="text-xs text-muted mt-1">Total Spent</div>
                </div>
              </div>
            </GlowCard>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <GlowCard className="p-6">
              <div className="flex items-center gap-4">
                <div className="text-3xl">📅</div>
                <div>
                  <div className="text-sm font-extrabold tracking-tight text-text">{user.joinDate}</div>
                  <div className="text-xs text-muted mt-1">Member Since</div>
                </div>
              </div>
            </GlowCard>
          </motion.div>
        </div>

        <div className="flex gap-3 mb-6 border-b border-border">
          {(["profile", "orders", "settings"] as const).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 font-semibold text-sm capitalize transition-all ${
                activeTab === tab ? "text-brand border-b-2 border-brand" : "text-muted hover:text-text"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          {activeTab === "profile" && (
            <GlowCard className="p-6">
              <h2 className="text-xl font-extrabold tracking-tight text-text mb-6">Profile Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-muted mb-2">Full Name</label>
                  <input type="text" defaultValue={user.name}
                    className="w-full px-4 py-3 bg-panel border border-border rounded-lg text-text focus:outline-none focus:border-brand transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-muted mb-2">Email Address</label>
                  <input type="email" defaultValue={user.email}
                    className="w-full px-4 py-3 bg-panel border border-border rounded-lg text-text focus:outline-none focus:border-brand transition-colors"
                  />
                </div>
                <Button className="mt-4">Save Changes</Button>
              </div>
            </GlowCard>
          )}

          {activeTab === "orders" && (
            <div className="space-y-4">
              {orders.map((order) => (
                <GlowCard key={order.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-extrabold tracking-tight text-text">Order {order.id}</h3>
                      <p className="text-sm text-muted mt-1">{order.date} • {order.items} items</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-brand">${order.total}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.status === "Delivered" ? "bg-electric-400/20 text-electric-400" : "bg-brand/20 text-brand"
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                </GlowCard>
              ))}
            </div>
          )}

          {activeTab === "settings" && (
            <GlowCard className="p-6">
              <h2 className="text-xl font-extrabold tracking-tight text-text mb-6">Account Settings</h2>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 bg-panel border border-border rounded-lg text-text hover:border-brand transition-colors">
                  Change Password
                </button>
                <button className="w-full text-left px-4 py-3 bg-panel border border-border rounded-lg text-text hover:border-brand transition-colors">
                  Manage Payment Methods
                </button>
              </div>
            </GlowCard>
          )}
        </motion.div>
      </div>
    </div>
  );
}
