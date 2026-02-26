"use client";
import React, { useState, useEffect } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import Image from "next/image";
import { useSession } from "next-auth/react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Order = {
  _id: string;
  orderDate: string;
  orderStatus: string;
  paymentStatus: string;
  totalAmount: number;
  items: { productTitle: string; quantity: number; price: number; productImage?: string }[];
};

type Profile = {
  name: string;
  email: string;
  phone: string;
  address: string;
  provider: string;
};

// ─── Toast ───────────────────────────────────────────────────────────────────

const Toast = ({ msg, type, onClose }: { msg: string; type: "success" | "error"; onClose: () => void }) => (
  <div
    className={`fixed top-6 right-6 z-[9999] flex items-center gap-3 px-5 py-4 rounded-xl shadow-lg text-white text-sm font-medium transition-all ${type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
  >
    <span>{type === "success" ? "✓" : "✗"}</span>
    <span>{msg}</span>
    <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">✕</button>
  </div>
);

// ─── Status Badge ─────────────────────────────────────────────────────────────

const statusColor: Record<string, string> = {
  processing: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  shipped: "bg-indigo-100 text-indigo-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const statusLabel: Record<string, string> = {
  processing: "Đang xử lý",
  confirmed: "Đã xác nhận",
  shipped: "Đang giao",
  delivered: "Đã giao",
  cancelled: "Đã huỷ",
};

// ─── Main Component ───────────────────────────────────────────────────────────

const MyAccount = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { data: session } = useSession();

  // Profile state
  const [profile, setProfile] = useState<Profile>({ name: "", email: "", phone: "", address: "", provider: "" });
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileSaving, setProfileSaving] = useState(false);

  // Password state
  const [passForm, setPassForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [passSaving, setPassSaving] = useState(false);

  // Orders state
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  // Toast state
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const showToast = (msg: string, type: "success" | "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Load profile when Account Details tab is opened
  useEffect(() => {
    if (activeTab === "account-details" && session?.user) {
      setProfileLoading(true);
      fetch("/api/user/profile")
        .then((r) => r.json())
        .then((data) => {
          if (data.user) {
            setProfile({
              name: data.user.name || "",
              email: data.user.email || "",
              phone: data.user.phone || "",
              address: data.user.address || "",
              provider: data.user.provider || "",
            });
          }
        })
        .catch(() => { })
        .finally(() => setProfileLoading(false));
    }
  }, [activeTab, session]);

  // Load orders when Orders tab is opened
  useEffect(() => {
    if (activeTab === "orders" && session?.user) {
      setOrdersLoading(true);
      fetch("/api/user/orders")
        .then((r) => r.json())
        .then((data) => setOrders(data.orders || []))
        .catch(() => setOrders([]))
        .finally(() => setOrdersLoading(false));
    }
  }, [activeTab, session]);

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaving(true);
    try {
      const res = await fetch("/api/user/update-profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: profile.name, phone: profile.phone, address: profile.address }),
      });
      const data = await res.json();
      if (res.ok) showToast(data.message || "Cập nhật thành công!", "success");
      else showToast(data.error || "Có lỗi xảy ra", "error");
    } catch {
      showToast("Lỗi kết nối server", "error");
    } finally {
      setProfileSaving(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassSaving(true);
    try {
      const res = await fetch("/api/user/change-password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(passForm),
      });
      const data = await res.json();
      if (res.ok) {
        showToast(data.message || "Đổi mật khẩu thành công!", "success");
        setPassForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        showToast(data.error || "Có lỗi xảy ra", "error");
      }
    } catch {
      showToast("Lỗi kết nối server", "error");
    } finally {
      setPassSaving(false);
    }
  };

  // ─── Sidebar tabs ──────────────────────────────────────────────────────────

  const tabs = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: (
        <svg className="fill-current" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M5.91002 1.60413C5.08642 1.6041 4.39962 1.60408 3.85441 1.67738C3.27893 1.75475 2.75937 1.92495 2.34185 2.34246C1.92434 2.75998 1.75414 3.27954 1.67677 3.85502C1.60347 4.40023 1.60349 5.08701 1.60352 5.9106V6.00596C1.60349 6.82956 1.60347 7.51636 1.67677 8.06157C1.75414 8.63705 1.92434 9.15661 2.34185 9.57413C2.75937 9.99164 3.27893 10.1618 3.85441 10.2392C4.39962 10.3125 5.0864 10.3125 5.90999 10.3125H6.00535C6.82894 10.3125 7.51575 10.3125 8.06096 10.2392C8.63644 10.1618 9.156 9.99164 9.57352 9.57413C9.99103 9.15661 10.1612 8.63705 10.2386 8.06157C10.3119 7.51636 10.3119 6.82958 10.3119 6.00599V5.91063C10.3119 5.08704 10.3119 4.40023 10.2386 3.85502C10.1612 3.27954 9.99103 2.75998 9.57352 2.34246C9.156 1.92495 8.63644 1.75475 8.06096 1.67738C7.51575 1.60408 6.82897 1.6041 6.00538 1.60413H5.91002ZM3.31413 3.31474C3.43358 3.19528 3.61462 3.09699 4.03763 3.04012C4.48041 2.98059 5.07401 2.97913 5.95768 2.97913C6.84136 2.97913 7.43496 2.98059 7.87774 3.04012C8.30075 3.09699 8.48179 3.19528 8.60124 3.31474C8.7207 3.43419 8.81899 3.61523 8.87586 4.03824C8.93539 4.48102 8.93685 5.07462 8.93685 5.9583C8.93685 6.84197 8.93539 7.43557 8.87586 7.87835C8.81899 8.30136 8.7207 8.4824 8.60124 8.60186C8.48179 8.72131 8.30075 8.8196 7.87774 8.87647C7.43496 8.936 6.84136 8.93746 5.95768 8.93746C5.07401 8.93746 4.48041 8.936 4.03763 8.87647C3.61462 8.8196 3.43358 8.72131 3.31413 8.60186C3.19467 8.4824 3.09638 8.30136 3.03951 7.87835C2.97998 7.43557 2.97852 6.84197 2.97852 5.9583C2.97852 5.07462 2.97998 4.48102 3.03951 4.03824C3.09638 3.61523 3.19467 3.43419 3.31413 3.31474Z" fill="" />
          <path fillRule="evenodd" clipRule="evenodd" d="M15.9934 11.6875C15.1697 11.6874 14.483 11.6874 13.9377 11.7607C13.3623 11.8381 12.8427 12.0083 12.4252 12.4258C12.0077 12.8433 11.8375 13.3629 11.7601 13.9384C11.6868 14.4836 11.6868 15.1704 11.6869 15.994V16.0893C11.6868 16.9129 11.6868 17.5997 11.7601 18.1449C11.8375 18.7204 12.0077 19.2399 12.4252 19.6575C12.8427 20.075 13.3623 20.2452 13.9377 20.3225C14.4829 20.3958 15.1697 20.3958 15.9933 20.3958H16.0887C16.9123 20.3958 17.5991 20.3958 18.1443 20.3225C18.7198 20.2452 19.2393 20.075 19.6569 19.6575C20.0744 19.2399 20.2446 18.7204 20.3219 18.1449C20.3952 17.5997 20.3952 16.913 20.3952 16.0894V15.994C20.3952 15.1704 20.3952 14.4836 20.3219 13.9384C20.2446 13.3629 20.0744 12.8433 19.6569 12.4258C19.2393 12.0083 18.7198 11.8381 18.1443 11.7607C17.5991 11.6874 16.9123 11.6874 16.0887 11.6875H15.9934ZM13.3975 13.3981C13.5169 13.2786 13.698 13.1803 14.121 13.1235C14.5637 13.0639 15.1573 13.0625 16.041 13.0625C16.9247 13.0625 17.5183 13.0639 17.9611 13.1235C18.3841 13.1803 18.5651 13.2786 18.6846 13.3981C18.804 13.5175 18.9023 13.6986 18.9592 14.1216C19.0187 14.5644 19.0202 15.158 19.0202 16.0416C19.0202 16.9253 19.0187 17.5189 18.9592 17.9617C18.9023 18.3847 18.804 18.5657 18.6846 18.6852C18.5651 18.8046 18.3841 18.9029 17.9611 18.9598C17.5183 19.0193 16.9247 19.0208 16.041 19.0208C15.1573 19.0208 14.5637 19.0193 14.121 18.9598C13.698 18.9029 13.5169 18.8046 13.3975 18.6852C13.278 18.5657 13.1797 18.3847 13.1228 17.9617C13.0633 17.5189 13.0619 16.9253 13.0619 16.0416C13.0619 15.158 13.0633 14.5644 13.1228 14.1216C13.1797 13.6986 13.278 13.5175 13.3975 13.3981Z" fill="" />
          <path fillRule="evenodd" clipRule="evenodd" d="M5.91002 11.6875H6.00535C6.82896 11.6874 7.51574 11.6874 8.06096 11.7607C8.63644 11.8381 9.156 12.0083 9.57352 12.4258C9.99103 12.8433 10.1612 13.3629 10.2386 13.9384C10.3119 14.4836 10.3119 15.1703 10.3119 15.9939V16.0893C10.3119 16.9129 10.3119 17.5997 10.2386 18.1449C10.1612 18.7204 9.99103 19.2399 9.57352 19.6575C9.156 20.075 8.63644 20.2452 8.06096 20.3225C7.51575 20.3958 6.82899 20.3958 6.0054 20.3958H5.91002C5.08644 20.3958 4.39962 20.3958 3.85441 20.3225C3.27893 20.2452 2.75937 20.075 2.34185 19.6575C1.92434 19.2399 1.75414 18.7204 1.67677 18.1449C1.60347 17.5997 1.60349 16.9129 1.60352 16.0893V15.994C1.60349 15.1704 1.60347 14.4836 1.67677 13.9384C1.75414 13.3629 1.92434 12.8433 2.34185 12.4258C2.75937 12.0083 3.27893 11.8381 3.85441 11.7607C4.39963 11.6874 5.08641 11.6874 5.91002 11.6875ZM4.03763 13.1235C3.61462 13.1803 3.43358 13.2786 3.31413 13.3981C3.19467 13.5175 3.09638 13.6986 3.03951 14.1216C2.97998 14.5644 2.97852 15.158 2.97852 16.0416C2.97852 16.9253 2.97998 17.5189 3.03951 17.9617C3.09638 18.3847 3.19467 18.5657 3.31413 18.6852C3.43358 18.8046 3.61462 18.9029 4.03763 18.9598C4.48041 19.0193 5.07401 19.0208 5.95768 19.0208H5.95769C6.84136 19.0208 7.43496 19.0193 7.87774 18.9598C8.30075 18.9029 8.48179 18.8046 8.60124 18.6852C8.7207 18.5657 8.81899 18.3847 8.87586 17.9617C8.93539 17.5189 8.93685 16.9253 8.93685 16.0416C8.93685 15.158 8.93539 14.5644 8.87586 14.1216C8.81899 13.6986 8.7207 13.5175 8.60124 13.3981C8.48179 13.2786 8.30075 13.1803 7.87774 13.1235C7.43496 13.0639 6.84136 13.0625 5.95768 13.0625C5.07401 13.0625 4.48041 13.0639 4.03763 13.1235Z" fill="" />
          <path fillRule="evenodd" clipRule="evenodd" d="M15.9934 1.60413C15.1698 1.6041 14.483 1.60408 13.9377 1.67738C13.3623 1.75475 12.8427 1.92495 12.4252 2.34246C12.0077 2.75998 11.8375 3.27954 11.7601 3.85502C11.6868 4.40024 11.6868 5.08702 11.6869 5.91063V6.00596C11.6868 6.82957 11.6868 7.51635 11.7601 8.06157C11.8375 8.63705 12.0077 9.15661 12.4252 9.57413C12.8427 9.99164 13.3623 10.1618 13.9377 10.2392C14.483 10.3125 15.1697 10.3125 15.9933 10.3125H16.0887C16.9123 10.3125 17.5991 10.3125 18.1443 10.2392C18.7198 10.1618 19.2393 9.99164 19.6569 9.57413C20.0744 9.15661 20.2446 8.63705 20.3219 8.06157C20.3952 7.51636 20.3952 6.82958 20.3952 6.00599V5.91063C20.3952 5.08704 20.3952 4.40023 20.3219 3.85502C20.2446 3.27954 20.0744 2.75998 19.6569 2.34246C19.2393 1.92495 18.7198 1.75475 18.1443 1.67738C17.5991 1.60408 16.9123 1.6041 16.0887 1.60413H15.9934ZM13.3975 3.31474C13.5169 3.19528 13.698 3.09699 14.121 3.04012C14.5637 2.98059 15.1573 2.97913 16.041 2.97913C16.9247 2.97913 17.5183 2.98059 17.9611 3.04012C18.3841 3.09699 18.5651 3.19528 18.6846 3.31474C18.804 3.43419 18.9023 3.61523 18.9592 4.03824C19.0187 4.48102 19.0202 5.07462 19.0202 5.9583C19.0202 6.84197 19.0187 7.43557 18.9592 7.87835C18.9023 8.30136 18.804 8.4824 18.6846 8.60186C18.5651 8.72131 18.3841 8.8196 17.9611 8.87647C17.5183 8.936 16.9247 8.93746 16.041 8.93746C15.1573 8.93746 14.5637 8.936 14.121 8.87647C13.698 8.8196 13.5169 8.72131 13.3975 8.60186C13.278 8.4824 13.1797 8.30136 13.1228 7.87835C13.0633 7.43557 13.0619 6.84197 13.0619 5.9583C13.0619 5.07462 13.0633 4.48102 13.1228 4.03824C13.1797 3.61523 13.278 3.43419 13.3975 3.31474Z" fill="" />
        </svg>
      ),
    },
    {
      id: "orders",
      label: "Đơn hàng",
      icon: (
        <svg className="fill-current" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.0203 11.9167C8.0203 11.537 7.71249 11.2292 7.3328 11.2292C6.9531 11.2292 6.6453 11.537 6.6453 11.9167V15.5833C6.6453 15.963 6.9531 16.2708 7.3328 16.2708C7.71249 16.2708 8.0203 15.963 8.0203 15.5833V11.9167Z" fill="" />
          <path d="M14.6661 11.2292C15.0458 11.2292 15.3536 11.537 15.3536 11.9167V15.5833C15.3536 15.963 15.0458 16.2708 14.6661 16.2708C14.2864 16.2708 13.9786 15.963 13.9786 15.5833V11.9167C13.9786 11.537 14.2864 11.2292 14.6661 11.2292Z" fill="" />
          <path d="M11.687 11.9167C11.687 11.537 11.3792 11.2292 10.9995 11.2292C10.6198 11.2292 10.312 11.537 10.312 11.9167V15.5833C10.312 15.963 10.6198 16.2708 10.9995 16.2708C11.3792 16.2708 11.687 15.963 11.687 15.5833V11.9167Z" fill="" />
          <path fillRule="evenodd" clipRule="evenodd" d="M15.8338 3.18356C15.3979 3.01319 14.9095 2.98443 14.2829 2.97987C14.0256 2.43753 13.473 2.0625 12.8328 2.0625H9.16613C8.52593 2.0625 7.97332 2.43753 7.716 2.97987C7.08942 2.98443 6.60107 3.01319 6.16515 3.18356C5.64432 3.38713 5.19129 3.73317 4.85788 4.18211C4.52153 4.63502 4.36363 5.21554 4.14631 6.01456L3.57076 8.12557C3.21555 8.30747 2.90473 8.55242 2.64544 8.88452C2.07527 9.61477 1.9743 10.4845 2.07573 11.4822C2.17415 12.4504 2.47894 13.6695 2.86047 15.1955L2.88467 15.2923C3.12592 16.2573 3.32179 17.0409 3.55475 17.6524C3.79764 18.2899 4.10601 18.8125 4.61441 19.2095C5.12282 19.6064 5.70456 19.7788 6.38199 19.8598C7.03174 19.9375 7.8394 19.9375 8.83415 19.9375H13.1647C14.1594 19.9375 14.9671 19.9375 15.6169 19.8598C16.2943 19.7788 16.876 19.6064 17.3844 19.2095C17.8928 18.8125 18.2012 18.2899 18.4441 17.6524C18.6771 17.0409 18.8729 16.2573 19.1142 15.2923L19.1384 15.1956C19.5199 13.6695 19.8247 12.4504 19.9231 11.4822C20.0245 10.4845 19.9236 9.61477 19.3534 8.88452C19.0941 8.55245 18.7833 8.30751 18.4282 8.12562L17.8526 6.01455C17.6353 5.21554 17.4774 4.63502 17.141 4.18211C16.8076 3.73317 16.3546 3.38713 15.8338 3.18356Z" fill="" />
        </svg>
      ),
    },
    {
      id: "account-details",
      label: "Thông tin tài khoản",
      icon: (
        <svg className="fill-current" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M10.9995 1.14581C8.59473 1.14581 6.64531 3.09524 6.64531 5.49998C6.64531 7.90472 8.59473 9.85415 10.9995 9.85415C13.4042 9.85415 15.3536 7.90472 15.3536 5.49998C15.3536 3.09524 13.4042 1.14581 10.9995 1.14581ZM8.02031 5.49998C8.02031 3.85463 9.35412 2.52081 10.9995 2.52081C12.6448 2.52081 13.9786 3.85463 13.9786 5.49998C13.9786 7.14533 12.6448 8.47915 10.9995 8.47915C9.35412 8.47915 8.02031 7.14533 8.02031 5.49998Z" fill="" />
          <path fillRule="evenodd" clipRule="evenodd" d="M10.9995 11.2291C8.87872 11.2291 6.92482 11.7112 5.47697 12.5256C4.05066 13.3279 2.97864 14.5439 2.97864 16.0416L2.97858 16.1351C2.97754 17.2001 2.97624 18.5368 4.14868 19.4916C4.7257 19.9614 5.53291 20.2956 6.6235 20.5163C7.71713 20.7377 9.14251 20.8541 10.9995 20.8541C12.8564 20.8541 14.2818 20.7377 15.3754 20.5163C16.466 20.2956 17.2732 19.9614 17.8503 19.4916C19.0227 18.5368 19.0214 17.2001 19.0204 16.1351L19.0203 16.0416C19.0203 14.5439 17.9483 13.3279 16.522 12.5256C15.0741 11.7112 13.1202 11.2291 10.9995 11.2291Z" fill="" />
        </svg>
      ),
    },
  ];

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      <Breadcrumb title="Tài khoản của tôi" pages={["Tài khoản"]} />

      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-col xl:flex-row gap-7.5">

            {/* ── Sidebar ── */}
            <div className="xl:max-w-[370px] w-full bg-white rounded-xl shadow-1">
              <div className="flex xl:flex-col">
                {/* User info */}
                <div className="hidden lg:flex flex-wrap items-center gap-5 py-6 px-4 sm:px-7.5 xl:px-9 border-r xl:border-r-0 xl:border-b border-gray-3">
                  <div className="max-w-[64px] w-full h-16 rounded-full overflow-hidden">
                    <Image
                      src={session?.user?.image || "/images/users/user-04.jpg"}
                      alt="user"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-dark mb-0.5">{session?.user?.name || "Guest"}</p>
                    <p className="text-custom-xs text-gray-500">Thành viên</p>
                  </div>
                </div>

                {/* Navigation */}
                <div className="p-4 sm:p-7.5 xl:p-9">
                  <div className="flex flex-wrap xl:flex-nowrap xl:flex-col gap-4">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center rounded-md gap-2.5 py-3 px-4.5 ease-out duration-200 hover:bg-blue hover:text-white ${activeTab === tab.id ? "text-white bg-blue" : "text-dark-2 bg-gray-1"
                          }`}
                      >
                        {tab.icon}
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Content ── */}

            {/* Dashboard */}
            <div className={`xl:max-w-[770px] w-full bg-white rounded-xl shadow-1 py-9.5 px-4 sm:px-7.5 xl:px-10 ${activeTab === "dashboard" ? "block" : "hidden"}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden shrink-0">
                  <Image
                    src={session?.user?.image || "/images/users/user-04.jpg"}
                    alt="avatar"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-dark text-xl">{session?.user?.name || "Guest"}</p>
                  <p className="text-gray-500 text-sm">{session?.user?.email}</p>
                </div>
              </div>
              <p className="text-dark-4 leading-relaxed">
                Chào mừng bạn trở lại! Từ đây bạn có thể xem đơn hàng, cập nhật thông tin cá nhân và đổi mật khẩu.
              </p>
              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setActiveTab("orders")}
                  className="flex items-center gap-3 p-5 rounded-xl bg-blue/5 hover:bg-blue/10 border border-blue/10 transition-all text-left"
                >
                  <span className="text-2xl">📦</span>
                  <div>
                    <p className="font-semibold text-dark">Đơn hàng của tôi</p>
                    <p className="text-sm text-dark-4">Xem lịch sử mua hàng</p>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("account-details")}
                  className="flex items-center gap-3 p-5 rounded-xl bg-green-50 hover:bg-green-100 border border-green-100 transition-all text-left"
                >
                  <span className="text-2xl">👤</span>
                  <div>
                    <p className="font-semibold text-dark">Thông tin tài khoản</p>
                    <p className="text-sm text-dark-4">Cập nhật hồ sơ & mật khẩu</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Orders */}
            <div className={`xl:max-w-[770px] w-full bg-white rounded-xl shadow-1 ${activeTab === "orders" ? "block" : "hidden"}`}>
              <div className="py-5 px-4 sm:px-7.5 xl:px-10 border-b border-gray-3">
                <h2 className="font-semibold text-xl text-dark">Đơn hàng của tôi</h2>
              </div>
              <div className="py-6 px-4 sm:px-7.5 xl:px-10">
                {ordersLoading ? (
                  <div className="flex items-center justify-center py-20">
                    <div className="w-8 h-8 border-4 border-blue border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-20">
                    <span className="text-5xl">📦</span>
                    <p className="text-dark-4 mt-4 text-lg">Bạn chưa có đơn hàng nào</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {orders.map((order) => (
                      <div key={order._id} className="border border-gray-3 rounded-xl p-5">
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                          <div>
                            <p className="text-xs text-dark-4 mb-1">Mã đơn hàng</p>
                            <p className="font-semibold text-dark font-mono text-sm">#{order._id.slice(-8).toUpperCase()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-dark-4 mb-1">Ngày đặt</p>
                            <p className="text-sm text-dark">
                              {new Date(order.orderDate).toLocaleDateString("vi-VN")}
                            </p>
                          </div>
                          <div>
                            <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${statusColor[order.orderStatus] || "bg-gray-100 text-gray-600"}`}>
                              {statusLabel[order.orderStatus] || order.orderStatus}
                            </span>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-dark-4 mb-1">Tổng tiền</p>
                            <p className="font-bold text-dark">
                              {order.totalAmount?.toLocaleString("vi-VN")} đ
                            </p>
                          </div>
                        </div>
                        <div className="border-t border-gray-2 pt-3 flex flex-col gap-2">
                          {order.items?.map((item, i) => (
                            <div key={i} className="flex justify-between text-sm text-dark-4">
                              <span>{item.productTitle} × {item.quantity}</span>
                              <span>{(item.price * item.quantity)?.toLocaleString("vi-VN")} đ</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Account Details */}
            <div className={`xl:max-w-[770px] w-full ${activeTab === "account-details" ? "block" : "hidden"}`}>
              {profileLoading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="w-8 h-8 border-4 border-blue border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <>
                  {/* Profile Form */}
                  <form onSubmit={handleProfileSave}>
                    <div className="bg-white shadow-1 rounded-xl p-4 sm:p-8.5 mb-6">
                      <h2 className="font-semibold text-xl text-dark mb-6">Thông tin cá nhân</h2>

                      <div className="mb-5">
                        <label htmlFor="name" className="block mb-2 font-medium text-dark-2">
                          Họ và tên <span className="text-red">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={profile.name}
                          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                          placeholder="Nhập họ và tên"
                          className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                          required
                        />
                      </div>

                      <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 font-medium text-dark-2">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={profile.email}
                          disabled
                          className="rounded-md border border-gray-3 bg-gray-2 text-dark-4 w-full py-2.5 px-5 outline-none cursor-not-allowed"
                        />
                        <p className="text-xs text-dark-4 mt-1">Email không thể thay đổi</p>
                      </div>

                      <div className="mb-5">
                        <label htmlFor="phone" className="block mb-2 font-medium text-dark-2">
                          Số điện thoại
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          value={profile.phone}
                          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                          placeholder="Ví dụ: 0912 345 678"
                          className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                        />
                      </div>

                      <div className="mb-7">
                        <label htmlFor="address" className="block mb-2 font-medium text-dark-2">
                          Địa chỉ
                        </label>
                        <input
                          type="text"
                          id="address"
                          value={profile.address}
                          onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                          placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành"
                          className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={profileSaving}
                        className="inline-flex items-center gap-2 font-medium text-white bg-blue py-3 px-7 rounded-md ease-out duration-200 hover:bg-blue-dark disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {profileSaving && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>}
                        {profileSaving ? "Đang lưu..." : "Lưu thay đổi"}
                      </button>
                    </div>
                  </form>

                  {/* Password Change Form */}
                  <form onSubmit={handlePasswordChange}>
                    <div className="bg-white shadow-1 rounded-xl p-4 sm:p-8.5">
                      <h2 className="font-semibold text-xl text-dark mb-2">Đổi mật khẩu</h2>

                      {profile.provider && profile.provider !== "credentials" ? (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-800 text-sm">
                          ⚠️ Tài khoản của bạn đăng nhập bằng <strong>{profile.provider}</strong>. Không thể đổi mật khẩu cho tài khoản này.
                        </div>
                      ) : (
                        <>
                          <p className="text-sm text-dark-4 mb-6">Để bảo mật, hãy dùng mật khẩu mạnh mà bạn chưa dùng ở nơi khác.</p>

                          <div className="mb-5">
                            <label htmlFor="currentPassword" className="block mb-2 font-medium text-dark-2">
                              Mật khẩu hiện tại
                            </label>
                            <input
                              type="password"
                              id="currentPassword"
                              value={passForm.currentPassword}
                              onChange={(e) => setPassForm({ ...passForm, currentPassword: e.target.value })}
                              autoComplete="current-password"
                              placeholder="••••••••"
                              className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                              required
                            />
                          </div>

                          <div className="mb-5">
                            <label htmlFor="newPassword" className="block mb-2 font-medium text-dark-2">
                              Mật khẩu mới
                            </label>
                            <input
                              type="password"
                              id="newPassword"
                              value={passForm.newPassword}
                              onChange={(e) => setPassForm({ ...passForm, newPassword: e.target.value })}
                              autoComplete="new-password"
                              placeholder="Ít nhất 6 ký tự"
                              className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                              required
                            />
                          </div>

                          <div className="mb-7">
                            <label htmlFor="confirmPassword" className="block mb-2 font-medium text-dark-2">
                              Xác nhận mật khẩu mới
                            </label>
                            <input
                              type="password"
                              id="confirmPassword"
                              value={passForm.confirmPassword}
                              onChange={(e) => setPassForm({ ...passForm, confirmPassword: e.target.value })}
                              autoComplete="new-password"
                              placeholder="Nhập lại mật khẩu mới"
                              className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                              required
                            />
                          </div>

                          <button
                            type="submit"
                            disabled={passSaving}
                            className="inline-flex items-center gap-2 font-medium text-white bg-blue py-3 px-7 rounded-md ease-out duration-200 hover:bg-blue-dark disabled:opacity-60 disabled:cursor-not-allowed"
                          >
                            {passSaving && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>}
                            {passSaving ? "Đang đổi..." : "Đổi mật khẩu"}
                          </button>
                        </>
                      )}
                    </div>
                  </form>
                </>
              )}
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default MyAccount;
