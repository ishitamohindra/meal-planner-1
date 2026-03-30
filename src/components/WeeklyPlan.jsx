import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, CloudSun, Moon } from 'lucide-react';
import MealCard from './MealCard';

const MEAL_TYPES = [
  { id: 'breakfast', label: 'Breakfast', icon: Sun },
  { id: 'lunch', label: 'Lunch', icon: CloudSun },
  { id: 'dinner', label: 'Dinner', icon: Moon },
];

export default function WeeklyPlan({ mealOptions }) {
  const [selectedType, setSelectedType] = useState('breakfast');

  if (!mealOptions) return null;

  const meals = mealOptions[selectedType] || [];

  return (
    <div className="space-y-4">
      {/* Meal type selector */}
      <div className="flex gap-2">
        {MEAL_TYPES.map(({ id, label, icon: Icon }) => {
          const isActive = selectedType === id;
          return (
            <button
              key={id}
              onClick={() => setSelectedType(id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold
                         transition-all duration-200
                         ${isActive
                           ? 'bg-terracotta text-white shadow-md shadow-terracotta/25'
                           : 'bg-white text-charcoal-light border border-charcoal/5 hover:bg-cream-dark'
                         }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          );
        })}
      </div>

      {/* Section header */}
      <div className="flex items-baseline gap-2">
        <h3 className="font-display text-xl font-bold text-charcoal capitalize">
          {selectedType} Options
        </h3>
        <span className="text-sm text-charcoal-light/50">
          {meals.length} choices
        </span>
      </div>

      {/* Meal cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedType}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="space-y-3"
        >
          {meals.map((meal, i) => (
            <MealCard key={`${selectedType}-${i}`} meal={{ ...meal, type: selectedType }} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Dots indicator */}
      <div className="flex justify-center gap-1.5 py-2">
        {MEAL_TYPES.map(({ id }) => (
          <button
            key={id}
            onClick={() => setSelectedType(id)}
            className={`rounded-full transition-all duration-200
                       ${selectedType === id
                         ? 'w-6 h-1.5 bg-terracotta'
                         : 'w-1.5 h-1.5 bg-charcoal/15'
                       }`}
          />
        ))}
      </div>
    </div>
  );
}
