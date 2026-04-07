"use client";

import { useMemo, useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  isWithinInterval,
  isBefore,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function WallCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 3, 1)); // April 2026
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [notesData, setNotesData] = useState<Record<string, string>>({});

  const days = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const gridStart = startOfWeek(monthStart, { weekStartsOn: 1 }); // Monday is 1
    const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

    return eachDayOfInterval({ start: gridStart, end: gridEnd });
  }, [currentMonth]);

  const handleDateClick = (day: Date) => {
    if (!isSameMonth(day, currentMonth)) return;

    if (!startDate || (startDate && endDate)) {
      setStartDate(day);
      setEndDate(null);
    } else {
      if (isBefore(day, startDate)) {
        setEndDate(startDate);
        setStartDate(day);
      } else {
        setEndDate(day);
      }
    }
  };

  const nextMonth = () => setCurrentMonth((prev) => addMonths(prev, 1));
  const prevMonth = () => setCurrentMonth((prev) => subMonths(prev, 1));

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const key = startDate
      ? format(startDate, "yyyy-MM-dd")
      : format(currentMonth, "yyyy-MM");
    setNotesData((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const currentNoteKey = startDate
    ? format(startDate, "yyyy-MM-dd")
    : format(currentMonth, "yyyy-MM");

  return (
    <div className="relative w-full max-w-4xl mx-auto pt-6">
      {/* 
        ========================================
        WALL CALENDAR WIRE BINDINGS 
        ========================================
      */}
      <div className="absolute top-0 left-0 right-0 flex justify-center space-x-3 md:space-x-6 z-20 w-full px-4 md:px-12 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="w-3 sm:w-4 h-10 md:h-14 bg-bau-black rounded-b-full border-4 border-white shadow-[0px_4px_0px_0px_rgba(0,0,0,0.8)]"
          ></div>
        ))}
      </div>

      <div className="flex flex-col bg-white bauhaus-border shadow-bauhaus-lg">
        {/* 
          ========================================
          TOP: "ART" / HEADER (Constructivist geometric layout inside the card)
          ========================================
        */}
        <div className="h-64 sm:h-80 md:h-96 bg-bau-blue border-b-4 border-bau-black relative overflow-hidden flex flex-col justify-center p-6 sm:p-12 z-10 w-full group">
          {/* Abstract Geometric Composition */}
          <div className="absolute top-[-30%] right-[5%] sm:right-[15%] w-64 h-64 sm:w-96 sm:h-96 bg-bau-red rounded-full border-4 border-bau-black shadow-bauhaus-md mix-blend-multiply sm:mix-blend-normal"></div>
          <div className="absolute bottom-[-15%] sm:bottom-[-20%] left-[2%] sm:left-[5%] w-40 sm:w-56 h-40 sm:h-56 bg-bau-yellow border-4 border-bau-black rotate-12 shadow-bauhaus-md"></div>

          {/* Dynamic "Page Turn" Abstract shape */}
          <div className="absolute top-[30%] left-[50%] w-0 h-0 border-l-[30px] border-r-[30px] border-b-[52px] sm:border-l-[60px] sm:border-r-[60px] sm:border-b-[104px] border-l-transparent border-r-transparent border-b-white rotate-[15deg] border-b-[-4px] filter drop-shadow-[4px_4px_0px_#121212]"></div>

          {/* Text Info */}
          <div className="relative z-20 w-full flex flex-col sm:flex-row sm:justify-between items-start sm:items-center text-white h-full justify-between">
            <div className="flex flex-col drop-shadow-[5px_5px_0px_#121212]">
              <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[7rem] font-black uppercase tracking-tighter leading-[0.8] mb-2 sm:mb-4 break-all sm:break-normal">
                {format(currentMonth, "MMMM")}
              </h2>
              <p className="text-2xl sm:text-4xl md:text-5xl font-bold uppercase tracking-widest text-bau-yellow drop-shadow-[4px_4px_0px_#121212]">
                {format(currentMonth, "yyyy")}
              </p>
            </div>

            {/* Navigation - stark buttons */}
            <div className="flex space-x-2 md:space-x-4 self-end sm:self-auto mt-4 sm:mt-0">
              <button
                onClick={prevMonth}
                aria-label="Previous month"
                className="w-12 h-12 sm:w-16 sm:h-16 bg-white border-4 border-bau-black text-bau-black flex items-center justify-center shadow-bauhaus-sm active-press hover:-translate-y-1 hover:shadow-bauhaus-md focus:outline-none focus:ring-4 focus:ring-white"
              >
                <ChevronLeft className="w-8 h-8" strokeWidth={3} />
              </button>
              <button
                onClick={nextMonth}
                aria-label="Next month"
                className="w-12 h-12 sm:w-16 sm:h-16 bg-white border-4 border-bau-black text-bau-black flex items-center justify-center shadow-bauhaus-sm active-press hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#121212] focus:outline-none focus:ring-4 focus:ring-white"
              >
                <ChevronRight className="w-8 h-8" strokeWidth={3} />
              </button>
            </div>
          </div>
        </div>

        {/* 
          ========================================
          BOTTOM: CALENDAR GRID & NOTES
          ========================================
        */}
        <div className="flex flex-col lg:flex-row w-full z-10">
          {/* Calendar Grid */}
          <div className="w-full lg:w-2/3 p-4 sm:p-8 bg-bau-bg border-b-4 lg:border-b-0 lg:border-r-4 border-bau-black">
            <div className="grid grid-cols-7 gap-x-2 mb-4 sm:mb-6 text-center">
              {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day, i) => (
                <div
                  key={day}
                  className={`text-lg sm:text-xl font-bold uppercase tracking-wider ${i >= 5 ? "text-bau-red" : "text-bau-black"}`}
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2 sm:gap-3">
              {days.map((day, i) => {
                const isCurrentMonthDate = isSameMonth(day, currentMonth);

                const isStart = startDate && isSameDay(day, startDate);
                const isEnd = endDate && isSameDay(day, endDate);
                const isInRange =
                  startDate &&
                  endDate &&
                  isWithinInterval(day, { start: startDate, end: endDate });

                let bgClasses = "bg-white";
                let textClasses = "text-bau-black";
                let borderStyle = "border-4 border-transparent";
                let hoverActive =
                  "hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#121212] hover:border-bau-black transition-all";

                if (isStart && isEnd) {
                  bgClasses = "bg-bau-red";
                  textClasses = "text-white font-black";
                  borderStyle = "border-4 border-bau-black";
                  hoverActive =
                    "shadow-bauhaus-sm active-press transition-transform";
                } else if (isStart) {
                  bgClasses = "bg-bau-red";
                  textClasses = "text-white font-black";
                  borderStyle = "border-4 border-bau-black";
                  hoverActive =
                    "shadow-bauhaus-sm transition-transform z-10 relative";
                } else if (isEnd) {
                  bgClasses = "bg-bau-blue";
                  textClasses = "text-white font-black";
                  borderStyle = "border-4 border-bau-black";
                  hoverActive =
                    "shadow-bauhaus-sm transition-transform z-10 relative";
                } else if (isInRange) {
                  bgClasses = "bg-bau-yellow";
                  textClasses = "text-bau-black font-bold";
                  borderStyle = "border-4 border-bau-black";
                  hoverActive =
                    "shadow-[2px_2px_0px_0px_#121212] transition-transform";
                } else if (!isCurrentMonthDate) {
                  bgClasses = "bg-white/50 opacity-40";
                  textClasses = "text-bau-black font-bold";
                  hoverActive = "pointer-events-none cursor-default";
                } else {
                  borderStyle = "border-4 border-bau-black";
                  hoverActive =
                    "hover:-translate-y-[2px] transition-transform hover:shadow-bauhaus-sm active-press";
                }

                return (
                  <button
                    key={day.toISOString()}
                    onClick={() => handleDateClick(day)}
                    disabled={!isCurrentMonthDate}
                    aria-label={`${format(day, "MMMM d, yyyy")}`}
                    aria-pressed={isStart || isEnd || isInRange ? true : false}
                    className={`aspect-square sm:aspect-auto sm:h-14 md:h-16 w-full flex items-center justify-center ${borderStyle} ${bgClasses} ${textClasses} ${hoverActive}`}
                  >
                    <span className="text-lg sm:text-2xl tracking-tighter">
                      {format(day, "d")}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notes Sidebar */}
          <div className="w-full lg:w-1/3 flex flex-col p-6 sm:p-8 bg-white relative">
            <div className="flex items-center mb-6 space-x-3">
              <div className="w-[18px] h-[18px] bg-bau-red border-4 border-bau-black rounded-full" />
              <h3 className="text-3xl font-black uppercase tracking-tighter text-bau-black">
                Notes
              </h3>
            </div>

            {/* Small visual tag indicator & Clear Button */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
              <div className="inline-block bg-bau-black text-white px-3 py-1.5 text-sm font-bold uppercase tracking-widest w-fit border-2 border-bau-black shadow-[2px_2px_0px_#121212]">
                {startDate
                  ? `${format(startDate, "MMM d")}${endDate ? ` — ${format(endDate, "MMM d")}` : ""}`
                  : format(currentMonth, "MMM yyyy")}
              </div>

              {startDate && (
                <button
                  onClick={() => {
                    setStartDate(null);
                    setEndDate(null);
                  }}
                  className="text-xs font-black uppercase tracking-widest bg-bau-yellow text-bau-black px-3 py-1.5 border-2 border-bau-black shadow-[2px_2px_0px_#121212] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#121212] active-press transition-all w-fit"
                >
                  Clear Dates
                </button>
              )}
            </div>

            <textarea
              className="flex-grow w-full min-h-[200px] lg:min-h-[auto] bg-bau-bg border-4 border-bau-black p-4 text-lg font-medium resize-none shadow-[6px_6px_0px_0px_#121212] focus:outline-none focus:-translate-y-1 focus:shadow-bauhaus-lg transition-all"
              value={notesData[currentNoteKey] || ""}
              onChange={handleNoteChange}
              placeholder="BE BOLD. TYPE HERE."
            />

            {/* Corner geometric decoration native to Bauhaus style spec */}
            <div className="absolute bottom-4 right-4 w-6 h-6 bg-bau-blue border-2 border-bau-black" />
          </div>
        </div>
      </div>
    </div>
  );
}
