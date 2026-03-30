import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MealCard from './MealCard';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const DAY_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function WeeklyPlan({ weekPlan }) {
  const [selectedDay, setSelectedDay] = useState(0);
  const scrollRef = useRef(null);

  const dayData = weekPlan?.[selectedDay];

  // Scroll active day pill into view
  useEffect(() => {
    if (scrollRef.current) {
      const activeBtn = scrollRef.current.children[selectedDay];
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [selectedDay]);

  if (!weekPlan || weekPlan.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* Day selector - horizontal scroll */}
      <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
        <div ref={scrollRef} className="flex gap-2 min-w-max">
          {DAYS.map((day, i) => {
            const isActive = selectedDay === i;
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(i)}
                className={`relative flex flex-col items-center px-4 py-2 rounded-2xl text-sm font-medium
                           transition-all duration-200 min-w-[60px]
                           ${isActive
                             ? 'bg-terracotta text-white shadow-md shadow-terracotta/25'
                             : 'bg-white text-charcoal-light border border-charcoal/5 hover:bg-cream-dark'
                           }`}
              >
                <span className="text-[10px] uppercase tracking-wider opacity-70">
                  {DAY_SHORT[i]}
                </span>
                <span className="text-xs mt-0.5">Day {i + 1}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Day header */}
      <div className="flex items-baseline gap-2">
        <h3 className="font-display text-xl font-bold text-charcoal">
          {DAYS[selectedDay]}
        </h3>
        <span className="text-sm text-charcoal-light/50">
          {dayData?.meals?.length || 0} meals
        </span>
      </div>

      {/* Meal cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedDay}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="space-y-3"
        >
          {dayData?.meals?.map((meal, i) => (
            <MealCard key={`${selectedDay}-${meal.type}-${i}`} meal={meal} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Swipe hint */}
      <div className="flex justify-center gap-1.5 py-2">
        {DAYS.map((_, i) => (
          <button
            key={i}
            onClick={() => setSelectedDay(i)}
            className={`rounded-full transition-all duration-200
                       ${selectedDay === i
                         ? 'w-6 h-1.5 bg-terracotta'
                         : 'w-1.5 h-1.5 bg-charcoal/15'
                       }`}
          />
        ))}
      </div>
    </div>
  );
}
