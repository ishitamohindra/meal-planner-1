import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, CloudSun, Moon, Check } from 'lucide-react';
import MealCard from './MealCard';

const MEAL_TYPES = [
  { id: 'breakfast', label: 'Breakfast', icon: Sun },
  { id: 'lunch', label: 'Lunch', icon: CloudSun },
  { id: 'dinner', label: 'Dinner', icon: Moon },
];

export default function WeeklyPlan({ mealOptions, selectedMeals, onSelectMeal }) {
  const [selectedType, setSelectedType] = useState('breakfast');

  if (!mealOptions) return null;

  const meals = mealOptions[selectedType] || [];
  const selectedIndex = selectedMeals[selectedType];

  const handleSelect = (index) => {
    onSelectMeal((prev) => ({ ...prev, [selectedType]: index }));
  };

  return (
    <div className="space-y-4">
      {/* Meal type selector */}
      <div className="flex gap-2">
        {MEAL_TYPES.map(({ id, label, icon: Icon }) => {
          const isActive = selectedType === id;
          const hasSelection = selectedMeals[id] !== undefined;
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
              {hasSelection && !isActive && (
                <Check className="w-3 h-3 text-sage-dark" />
              )}
            </button>
          );
        })}
      </div>

      {/* Section header */}
      <div>
        <h3 className="font-display text-xl font-bold text-charcoal capitalize">
          {selectedType} Options
        </h3>
        <p className="text-sm text-charcoal-light/50 mt-0.5">
          Tap a meal to select it for your day
        </p>
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
          {meals.map((meal, i) => {
            const isSelected = selectedIndex === i;
            return (
              <div key={`${selectedType}-${i}`} className="relative">
                {/* Selection indicator */}
                <button
                  onClick={() => handleSelect(i)}
                  className={`absolute top-4 right-4 z-10 w-6 h-6 rounded-full border-2 flex items-center justify-center
                             transition-all duration-200
                             ${isSelected
                               ? 'bg-terracotta border-terracotta text-white scale-110'
                               : 'bg-white border-charcoal/20 hover:border-terracotta/50'
                             }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                </button>
                <div
                  onClick={() => handleSelect(i)}
                  className={`cursor-pointer rounded-3xl transition-all duration-200
                             ${isSelected
                               ? 'ring-2 ring-terracotta ring-offset-2'
                               : ''
                             }`}
                >
                  <MealCard meal={{ ...meal, type: selectedType }} index={i} />
                </div>
              </div>
            );
          })}
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
