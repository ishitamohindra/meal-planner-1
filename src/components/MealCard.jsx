import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ChevronDown, Flame, Drumstick, Wheat } from 'lucide-react';
import NutritionPanel from './NutritionPanel';
import { estimateMealNutrition } from '../utils/nutritionData';

const mealTypeColors = {
  breakfast: { bg: 'bg-turmeric/10', text: 'text-turmeric', border: 'border-turmeric/20' },
  lunch: { bg: 'bg-terracotta/10', text: 'text-terracotta', border: 'border-terracotta/20' },
  dinner: { bg: 'bg-sage-dark/10', text: 'text-sage-dark', border: 'border-sage-dark/20' },
};

const mealTypeEmoji = {
  breakfast: '\u2600\uFE0F',
  lunch: '\uD83C\uDF1E',
  dinner: '\uD83C\uDF19',
};

export default function MealCard({ meal, index }) {
  const [expanded, setExpanded] = useState(false);
  const colors = mealTypeColors[meal.type] || mealTypeColors.lunch;
  const nutrition = estimateMealNutrition(meal.ingredients || []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="card"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-4"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            {/* Meal type badge */}
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium
                            ${colors.bg} ${colors.text} border ${colors.border} mb-2`}>
              <span>{mealTypeEmoji[meal.type]}</span>
              <span className="capitalize">{meal.type}</span>
            </span>

            {/* Dish name */}
            <h3 className="font-display text-base font-bold text-charcoal leading-tight">
              {meal.name}
            </h3>

            {/* Description */}
            <p className="text-sm text-charcoal-light/70 mt-1 line-clamp-2">
              {meal.description}
            </p>

            {/* Quick stats */}
            <div className="flex items-center gap-3 mt-2 text-xs text-charcoal-light/60">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {meal.prepTime || '15 min'} + {meal.cookTime || '20 min'}
              </span>
              <span className="flex items-center gap-1">
                <Flame className="w-3 h-3" />
                {Math.round(nutrition.calories)} kcal
              </span>
              <span className="flex items-center gap-1">
                <Drumstick className="w-3 h-3" />
                {Math.round(nutrition.protein)}g
              </span>
            </div>
          </div>

          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="mt-1 p-1"
          >
            <ChevronDown className="w-4 h-4 text-charcoal-light/40" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-3 border-t border-charcoal/5 pt-3">
              {/* Ingredients */}
              <div>
                <p className="text-xs font-medium text-charcoal-light/60 uppercase tracking-wider mb-1.5">
                  Ingredients
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {(meal.ingredients || []).map((ing, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-cream-dark rounded-full text-xs text-charcoal"
                    >
                      <span className="capitalize">{ing.name}</span>
                      {ing.grams && (
                        <span className="text-charcoal-light/50">{ing.grams}g</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>

              {/* Nutrition */}
              <NutritionPanel nutrition={nutrition} compact title={null} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
