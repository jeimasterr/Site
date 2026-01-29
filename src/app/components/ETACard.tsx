export function ETACard() {
  return (
    <div className="bg-[#474a51] rounded-xl p-4 mx-4 lg:mx-0">
      <p className="text-white text-center mb-3" style={{ fontFamily: 'var(--font-inter)' }}>
        Прибудет через ~25 минут
      </p>
      
      {/* Progress line with dots */}
      <div className="relative">
        <div className="flex items-center justify-between">
          {/* Start point - yellow */}
          <div className="w-3 h-3 rounded-full bg-[#ffcc00] relative z-10" />
          
          {/* Middle dots */}
          <div className="flex-1 flex items-center justify-evenly px-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-[#d9d9d9]" />
            ))}
          </div>
          
          {/* End point - teal */}
          <div className="w-3 h-3 rounded-full bg-[#00af54] relative z-10" />
        </div>
        
        {/* Background line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#d9d9d9] -z-10 transform -translate-y-1/2" />
      </div>
    </div>
  );
}
