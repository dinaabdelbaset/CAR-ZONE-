export function CarZoneLogo({ size = "default" }: { size?: "default" | "small" | "large" }) {
  const dimensions = {
    small: { width: 32, height: 32, fontSize: "text-lg" },
    default: { width: 40, height: 40, fontSize: "text-2xl" },
    large: { width: 56, height: 56, fontSize: "text-4xl" }
  };

  const { width, height, fontSize } = dimensions[size];

  return (
    <div className="flex items-center gap-2">
      {/* Creative Logo - Stylized C with speed lines */}
      <div 
        className="relative bg-gradient-to-br from-black via-gray-800 to-black rounded-lg flex items-center justify-center overflow-hidden"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-full h-0.5 bg-white transform -skew-y-12"></div>
          <div className="absolute top-1/3 right-0 w-full h-0.5 bg-white transform -skew-y-12"></div>
          <div className="absolute top-2/3 right-0 w-full h-0.5 bg-white transform -skew-y-12"></div>
        </div>
        
        {/* Stylized "C" for Car */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="relative z-10"
          style={{ width: `${width * 0.6}px`, height: `${height * 0.6}px` }}
        >
          <path
            d="M18 8C18 5.79086 16.2091 4 14 4H10C7.79086 4 6 5.79086 6 8V16C6 18.2091 7.79086 20 10 20H14C16.2091 20 18 18.2091 18 16"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Speed accent */}
          <path
            d="M20 10L22 10"
            stroke="#3B82F6"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M20 14L22 14"
            stroke="#3B82F6"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      
      {/* Text */}
      <div className="flex flex-col -space-y-1">
        <span className={`${fontSize} text-black leading-none tracking-tight`}>
          Car Zone
        </span>
        {size === "large" && (
          <span className="text-xs text-gray-500 tracking-wider uppercase">
            Your Drive, Our Passion
          </span>
        )}
      </div>
    </div>
  );
}
