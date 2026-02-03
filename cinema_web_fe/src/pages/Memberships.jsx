import React from "react";
import { CheckCircle, Minus } from "lucide-react";
import { plans, comparisonData } from "../data/membershipData";
import Footer from "../components/Footer";

export default function Memberships() {
  return (
    <>
      <div className="min-h-screen bg-[#0a0a0a] font-sans text-slate-200">
        {/* Page Heading */}
        <div className="px-4 md:px-20 lg:px-40 flex justify-center py-10">
          <div className="flex flex-col max-w-[1200px] flex-1 text-center gap-4">
            <h1 className="text-white text-5xl md:text-6xl font-black leading-tight tracking-[-0.033em]">
              Upgrade Your Movie Experience
            </h1>
            <p className="text-[#92a4c9] text-lg md:text-xl font-normal max-w-2xl mx-auto leading-relaxed">
              Unlock exclusive rewards, free tickets, and premium lounge access
              with our membership tiers.
            </p>
          </div>
        </div>

        {/* Pricing Cards Section */}
        <div className="px-4 md:px-20 lg:px-40 flex justify-center py-5">
          <div className="flex flex-col max-w-[1200px] flex-1">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 py-3 items-start">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`
                  flex flex-col gap-6 rounded-xl border border-solid p-8 transition-transform 
                  ${plan.borderColor} ${plan.bg} 
                  ${plan.isPopular ? "relative transform scale-105 z-10 border-2 shadow-2xl shadow-black/50" : "backdrop-blur-sm hover:scale-[1.02]"}
                `}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-amber-500 text-white text-xs font-black uppercase tracking-widest rounded-full px-4 py-1.5 shadow-lg">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div
                    className={`flex flex-col gap-2 ${plan.isPopular ? "pt-2" : ""}`}
                  >
                    <h2
                      className={`${plan.color} text-lg font-bold uppercase tracking-wider`}
                    >
                      {plan.name}
                    </h2>
                    <p className="flex items-baseline gap-1 text-white">
                      <span className="text-white text-5xl font-black tracking-[-0.033em]">
                        ${plan.price}
                      </span>
                      <span className="text-[#92a4c9] text-base font-medium">
                        /mo
                      </span>
                    </p>
                  </div>

                  <button
                    className={`flex w-full cursor-pointer items-center justify-center rounded-lg h-12 px-4 text-base font-bold transition-all ${plan.buttonColor}`}
                  >
                    Join Now
                  </button>

                  <div className="flex flex-col gap-4 border-t border-[#324467] pt-6">
                    {plan.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex gap-3 text-white items-center"
                      >
                        <CheckCircle className={`w-5 h-5 ${plan.iconColor}`} />
                        <span className="text-[15px]">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Comparison Table Section Header */}
        <div className="px-4 md:px-20 lg:px-40 flex justify-center pt-16 pb-6">
          <div className="flex flex-col max-w-[1200px] flex-1 px-4">
            <h2 className="text-white text-3xl font-bold leading-tight tracking-[-0.015em]">
              Compare All Benefits
            </h2>
            <p className="text-[#92a4c9] text-base mt-2">
              Get a detailed breakdown of what's included in each plan.
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="px-4 md:px-20 lg:px-40 flex justify-center pb-20">
          <div className="flex flex-col max-w-[1200px] flex-1">
            <div className="px-4 py-3 w-full overflow-x-auto">
              <div className="flex overflow-hidden rounded-xl border border-[#324467] bg-[#111722]/80 backdrop-blur min-w-[600px]">
                <table className="flex-1 w-full border-collapse">
                  <thead>
                    <tr className="bg-[#192233]">
                      <th className="px-6 py-5 text-left text-white text-sm font-semibold uppercase tracking-wider w-1/4">
                        Benefit
                      </th>
                      <th className="px-6 py-5 text-center text-white text-sm font-semibold uppercase tracking-wider w-1/4">
                        Classic
                      </th>
                      <th className="px-6 py-5 text-center text-amber-500 text-sm font-semibold uppercase tracking-wider w-1/4">
                        Gold
                      </th>
                      <th className="px-6 py-5 text-center text-purple-400 text-sm font-semibold uppercase tracking-wider w-1/4">
                        Platinum
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#324467]">
                    {comparisonData.map((row, index) => (
                      <tr
                        key={index}
                        className="hover:bg-white/5 transition-colors"
                      >
                        <td className="px-6 py-5 text-white text-sm font-medium">
                          {row.feature}
                        </td>
                        {/* Render Cells Helper */}
                        {[row.classic, row.gold, row.platinum].map(
                          (cell, idx) => (
                            <td key={idx} className="px-6 py-5 text-center">
                              {cell.type === "badge" && (
                                <span
                                  className={`px-4 py-1.5 rounded-full text-white text-xs font-bold ${cell.color}`}
                                >
                                  {cell.label}
                                </span>
                              )}
                              {cell.type === "text" && (
                                <span
                                  className={`font-medium text-sm ${cell.color || "text-white"}`}
                                >
                                  {cell.label}
                                </span>
                              )}
                              {cell.type === "icon" && (
                                <div
                                  className={`flex justify-center ${cell.color || "text-[#324467]"}`}
                                >
                                  {cell.value ? (
                                    <CheckCircle className="w-6 h-6" />
                                  ) : (
                                    <Minus className="w-6 h-6" />
                                  )}
                                </div>
                              )}
                            </td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
