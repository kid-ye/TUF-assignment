import WallCalendar from "@/components/wall-calendar";

export default function Home() {
  return (
    <div className="min-h-screen p-4 sm:p-8 md:p-12 lg:p-16 flex flex-col items-center">
      <header className="mb-12 md:mb-16 flex flex-col items-center max-w-4xl mx-auto z-10 relative">
        <div className="flex space-x-0 mb-8 border-4 border-bau-black shadow-bauhaus-md bg-white">
          <div className="w-10 h-10 bg-bau-red border-r-4 border-bau-black"></div>
          <div className="w-10 h-10 bg-white border-r-4 border-bau-black flex items-center justify-center">
            <div className="w-4 h-4 bg-bau-black rounded-full"></div>
          </div>
          <div className="w-10 h-10 bg-bau-yellow"></div>
        </div>

        <h1 className="text-5xl sm:text-7xl md:text-[8rem] font-black uppercase tracking-tighter mb-6 text-center leading-[0.85] text-bau-black">
          Calendar
        </h1>
      </header>

      <main className="w-full max-w-4xl mx-auto relative z-10 px-0 sm:px-4">
        <WallCalendar />
      </main>
    </div>
  );
}
