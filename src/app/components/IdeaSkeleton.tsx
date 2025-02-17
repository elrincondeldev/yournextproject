export default function IdeaSkeleton() {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-5 md:p-7 bg-gradient-to-br from-indigo-950 to-violet-900 rounded-2xl shadow-lg animate-pulse border border-indigo-500/20">
      <div className="flex flex-col gap-4 w-full md:w-10/12 mb-6 md:mb-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="h-7 bg-fuchsia-400/10 border border-fuchsia-500/10 rounded-lg w-48"></div>
          <div className="h-6 bg-fuchsia-400/10 border border-fuchsia-500/10 rounded-full w-24"></div>
        </div>
        
        <div className="space-y-5">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="space-y-2">
              <div className="h-5 bg-fuchsia-400/10 border border-fuchsia-500/10 rounded w-32"></div>
              <div className="space-y-1.5 ml-1">
                <div className="h-4 bg-fuchsia-400/10 border border-fuchsia-500/10 rounded w-full"></div>
                <div className="h-4 bg-fuchsia-400/10 border border-fuchsia-500/10 rounded w-11/12"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex md:flex-col items-center gap-4 md:gap-3 bg-white/5 backdrop-blur-sm rounded-xl p-3 w-full md:w-auto border border-indigo-500/20">
        <div className="flex-1 md:flex-none h-11 bg-fuchsia-400/10 border border-fuchsia-500/10 rounded-lg w-full md:w-11"></div>
        <div className="h-8 bg-fuchsia-400/10 border border-fuchsia-500/10 rounded w-8"></div>
        <div className="flex-1 md:flex-none h-11 bg-fuchsia-400/10 border border-fuchsia-500/10 rounded-lg w-full md:w-11"></div>
      </div>
    </div>
  );
}
