import React from "react";
import { FaHome, FaThLarge, FaCompass, FaHeart, FaUser } from "react-icons/fa";

const BottomNavigation = () => {
  const tabs = [
    { label: "Home", icon: <FaHome />, href: "#" },
    { label: "Category", icon: <FaThLarge />, href: "#" },
    { label: "Explore", icon: <FaCompass />, href: "#" },
    { label: "Wishlist", icon: <FaHeart />, href: "#" },
    { label: "Account", icon: <FaUser />, href: "#" },
  ];

  return (
    <div className="fixed inset-x-0 bottom-0 z-10 bg-white shadow-md max-w-md mx-auto">
      <div className="flex justify-between">
        {tabs.map((tab, index) => (
          <a
            key={index}
            href={tab.href}
            className="w-full text-center pt-2 pb-1 text-gray-600 hover:text-teal-500 focus:text-teal-500"
          >
            <div className="inline-block text-lg mb-1">{tab.icon}</div>
            <span className="block text-xs">{tab.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
