// components/ui/MinimalCartLoader.tsx
"use client";

export const CartLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm z-50">
      <div className="relative flex flex-col items-center gap-4 p-6 bg-white/80 rounded-2xl shadow-lg">
        {/* Shopping Cart Icon */}
        <div className="relative w-24 h-24 animate-gentle-bounce">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-gray-800"
          >
            <path
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.3 2.7c-.3.4-.6.8-.6 1.3 0 1.1.9 2 2 2h12"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="9"
              cy="19"
              r="1"
              className="animate-pulse"
              style={{ animationDelay: '0.2s' }}
            />
            <circle
              cx="18"
              cy="19"
              r="1"
              className="animate-pulse"
              style={{ animationDelay: '0.4s' }}
            />
          </svg>

          {/* Animated Items */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="absolute w-4 h-4 bg-[#333333] rounded-sm opacity-0 
                  animate-item-drop origin-center"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            ))}
          </div>
        </div>

        {/* Progress Text */}
        <span className="text-sm font-medium text-black-600 animate-pulse">
          OneStopShop.com.ng
        </span>
        {/* Optional Footer Progress Bar */}
        <div className="w-full h-1.5 bg-gray-200 rounded overflow-hidden">
          <div className="h-full bg-gray-800 animate-loading-bar rounded" />
        </div>
      </div>
    </div>
  );
};