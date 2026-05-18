import React, { useState, useMemo } from "react";
import Header from "./Header.jsx";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import ArihantProductsSection from "./ArihantProducts.jsx";

export default function ClientCodeList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ direction: "asc", active: false });

  const clientCodesList = [
    "138000285",
    "138000286",
    "188001247",
    "188001885",
    "188003119",
    "188008438",
    "AP0110283",
  ];

  const handleSort = () => {
    setSortConfig((prev) => ({
      active: true,
      direction: prev.active && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const filteredClients = clientCodesList.filter((code) =>
    code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedClients = useMemo(() => {
    if (!sortConfig.active) return filteredClients;
    return [...filteredClients].sort((a, b) =>
      sortConfig.direction === "asc" ? a.localeCompare(b) : b.localeCompare(a)
    );
  }, [filteredClients, sortConfig]);

  const SortIcon = () => {
    if (!sortConfig.active) {
      return <ChevronsUpDown size={12} className="text-white/40 group-hover:text-white transition-colors" />;
    }
    return sortConfig.direction === "asc"
      ? <ChevronUp size={12} className="text-white" />
      : <ChevronDown size={12} className="text-white" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="pt-[80px]"></div>

      <div className="flex-1 p-6 md:p-10 w-full">
        {/* Full-width white card */}
        <div className="bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6 rounded-none border border-gray-100 w-full">

          <h1 className="text-[20px] font-semibold text-gray-800 mb-5">Client Code Lists</h1>

          {/* Search grey box — full width */}
          <div className="bg-[#f2f2f2] p-4 rounded-none mb-5 w-full">
            <div className="relative">
              <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10 pointer-events-none"></i>
              <input
                type="text"
                placeholder="Search client code"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white pl-10 pr-4 py-2 rounded-full border border-gray-200 outline-none text-sm placeholder-gray-400 focus:border-[#34b350] transition-colors"
              />
            </div>
          </div>

          {/* Result count */}
          <div className="text-[13px] font-bold text-gray-500 mb-3">
            Search results({sortedClients.length})
          </div>

          {/* Table — compact square box */}
          <div className="overflow-y-auto w-[280px] border border-gray-200 rounded-none shadow-sm">
            <table className="w-full border-collapse text-left text-[11px] font-medium">
              <thead className="bg-[#1EB04C] text-white uppercase">
                <tr>
                  <th
                    onClick={handleSort}
                    className="px-3 py-3 group cursor-pointer font-bold select-none hover:bg-[#18a045] transition-colors"
                  >
                    <div className="flex items-center justify-between gap-1.5 whitespace-nowrap">
                      <span>Client Code</span>
                      <SortIcon />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {sortedClients.map((code, idx) => (
                  <tr
                    key={code}
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                      idx % 2 === 0 ? "bg-white" : "bg-[#f0fdf4]"
                    }`}
                  >
                    <td className="px-3 py-2 text-gray-700 text-[11px]">{code}</td>
                  </tr>
                ))}
                {sortedClients.length === 0 && (
                  <tr>
                    <td className="px-3 py-12 text-center text-gray-400 text-[13px] font-medium">
                      No results found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Footer inside box */}
            <div className="px-3 py-2 bg-[#f9f9f9] text-gray-500 font-medium border-t border-gray-200 text-[11px]">
              {sortedClients.length} total
            </div>
          </div>

          {/* Arihant Products Section */}
          <ArihantProductsSection />

        </div>
      </div>
    </div>
  );
}
