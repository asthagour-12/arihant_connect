import React from "react";

// Keeping the inline helper object intact so pages using style={L.wrapper} don't break.
export const L = {
  wrapper: {
    padding: "20px",
    backgroundColor: "#f4f7f6",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    padding: "24px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  },
  row: {
    display: "flex",
    gap: "20px",
    alignItems: "flex-end",
    flexWrap: "wrap",
  },
};

// 🔹 LField converted completely to Tailwind CSS
export const LField = ({ label, children }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[14px] font-semibold text-gray-500">
      {label}
    </label>
    {children}
  </div>
);

// 🔹 LDateInput converted completely to Tailwind CSS
export const LDateInput = ({ className = "", style, ...props }) => (
  <input
    type="date"
    {...props}
    style={style}
    className={`px-3.5 py-2.5 rounded border border-gray-300 text-[14px] outline-none focus:ring-2 focus:ring-green-400/50 focus:border-[#34b350] transition-all bg-white ${className}`}
  />
);

// 🔹 LSearchInput converted completely to Tailwind CSS
export const LSearchInput = ({ className = "", style, width, ...props }) => (
  <input
    type="text"
    {...props}
    style={{ width: width || "300px", ...style }}
    className={`px-3.5 py-2.5 rounded border border-gray-300 text-[14px] outline-none focus:ring-2 focus:ring-green-400/50 focus:border-[#34b350] transition-all bg-white ${className}`}
  />
);

// 🔹 LSelectInput converted completely to Tailwind CSS
export const LSelectInput = ({ options, value, onChange, width, className = "", style, ...props }) => (
  <select
    value={value}
    onChange={onChange}
    style={{ width: width || "100%", ...style }}
    {...props}
    className={`px-3.5 py-2.5 rounded border border-gray-300 text-[14px] outline-none bg-white focus:ring-2 focus:ring-green-400/50 focus:border-[#34b350] transition-all ${className}`}
  >
    {options.map((opt) => (
      <option key={opt} value={opt}>
        {opt}
      </option>
    ))}
  </select>
);

// 🔹 LApplyBtn converted completely to Tailwind CSS
export const LApplyBtn = ({ label, onClick, className = "", style }) => (
  <button
    onClick={onClick}
    style={style}
    className={`bg-[#34b350] hover:bg-[#2da145] text-white px-6 py-2.5 rounded border-none text-[14px] font-bold cursor-pointer h-[42px] transition-all active:scale-95 shadow-sm hover:shadow-md ${className}`}
  >
    {label}
  </button>
);
