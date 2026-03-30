import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, ShoppingCart, TrendingUp, Sun, CloudSun, Moon } from 'lucide-react';
import { estimateMealNutrition, RDA, NUTRIENT_LABELS, MACRO_KEYS, MICRO_KEYS, VEG_RISK_NUTRIENTS } from '../utils/nutritionData';
import NutritionPanel from './NutritionPanel';

const SUPPLEMENT_SUGGESTIONS = {
  vitB12: { foods: ['eggs', 'fish', 'paneer', 'curd'], supplement: 'Consider a B12 supplement if mostly plant-based' },
  vitD: { foods: ['eggs', 'fish', 'mushroom', 'milk (fortified)'], supplement: 'Sun exposure + Vitamin D3 supplement recommended' },
  iron: { foods: ['spinach', 'methi leaves', 'rajma', 'sesame seeds', 'jaggery'], supplement: 'Pair with Vitamin C foods for absorption' },
  calcium: { foods: ['curd', 'paneer', 'milk', 'sesame seeds', 'ragi'], supplement: 'Calcium citrate if dairy is insufficient' },
  zinc: { foods: ['peanuts', 'sesame seeds', 'chicken', 'chole'], supplement: 'Zinc picolinate supplement if needed' },
  folate: { foods: ['methi leaves', 'spinach', 'rajma', 'moong dal'], supplement: 'Usually sufficient with lentils and greens' },
  protein: { foods: ['paneer', 'chicken', 'eggs', 'tofu', 'dal varieties'], supplement: 'Add a protein source to every meal' },
  fiber: { foods: ['oats', 'rajma', 'chole', 'brown rice', 'vegetables'], supplement: 'Increase whole grains and legume portions' },
};

const MEAL_TYPE_ICONS = { breakfast: Sun, lunch: CloudSun, dinner: Moon };

export default function GapAnalysis({ mealOptions, selectedMeals }) {
  const analysis = useMemo(() => {
    if (!mealOptions) return null;

    // Build the day's nutrition from selected meals
    const dayTotals = {
      calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0,
      iron: 0, calcium: 0, vitC: 0, vitB12: 0, zinc: 0, folate: 0, vitD: 0,
    };

    const selectedDetails = [];

    for (const type of ['breakfast', 'lunch', 'dinner']) {
      const meals = mealOptions[type] || [];
      const idx = selectedMeals[type] ?? 0;
      const meal = meals[idx];
      if (!meal) continue;

      const nutrition = estimateMealNutrition(meal.ingredients || []);
      selectedDetails.push({ type, meal, nutrition });

      for (const key of Object.keys(dayTotals)) {
        dayTotals[key] += nutrition[key];
      }
    }

    // Round
    for (const key of Object.keys(dayTotals)) {
      dayTotals[key] = Math.round(dayTotals[key] * 10) / 10;
    }

    // Identify gaps (< 70% of RDA)
    const gaps = [];
    const adequate = [];
    const allKeys = [...MACRO_KEYS, ...MICRO_KEYS];

    for (const key of allKeys) {
      const pct = (dayTotals[key] / RDA[key].value) * 100;
      const entry = {
        nutrient: key,
        label: NUTRIENT_LABELS[key],
        value: dayTotals[key],
        rda: RDA[key].value,
        unit: RDA[key].unit,
        pct: Math.round(pct),
        isVegRisk: VEG_RISK_NUTRIENTS.includes(key),
      };

      if (pct < 70) {
        gaps.push(entry);
      } else {
        adequate.push(entry);
      }
    }

    gaps.sort((a, b) => a.pct - b.pct);

    return { dayTotals, gaps, adequate, selectedDetails };
  }, [mealOptions, selectedMeals]);

  if (!analysis) return null;

  return (
    <div className="space-y-6">
      {/* Selected meals summary */}
      <div className="card p-4">
        <h3 className="font-display text-lg font-bold text-charcoal mb-3">
          Your Day's Meals
        </h3>
        <div className="space-y-2">
          {analysis.selectedDetails.map(({ type, meal, nutrition }) => {
            const Icon = MEAL_TYPE_ICONS[type];
            return (
              <div key={type} className="flex items-center gap-3 bg-cream-dark rounded-xl p-3">
                <div className="w-8 h-8 rounded-full bg-terracotta/10 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-terracotta" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-charcoal truncate">{meal.name}</p>
                  <p className="text-xs text-charcoal-light/50 capitalize">{type}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-charcoal">{Math.round(nutrition.calories)}</p>
                  <p className="text-[10px] text-charcoal-light/50">kcal</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Daily totals */}
      <div className="card p-4">
        <h3 className="font-display text-lg font-bold text-charcoal mb-1">
          Daily Nutrition
        </h3>
        <p className="text-sm text-charcoal-light/60 mb-4">
          Based on your selected breakfast + lunch + dinner
        </p>
        <NutritionPanel nutrition={analysis.dayTotals} title={null} />
      </div>

      {/* Gaps */}
      {analysis.gaps.length > 0 && (
        <div className="card p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-terracotta" />
            <h3 className="font-display text-lg font-bold text-charcoal">
              What's Missing
            </h3>
          </div>
          <p className="text-sm text-charcoal-light/60 mb-4">
            Below 70% of daily recommended intake
          </p>

          <div className="space-y-4">
            {analysis.gaps.map((gap) => {
              const suggestion = SUPPLEMENT_SUGGESTIONS[gap.nutrient];
              return (
                <motion.div
                  key={gap.nutrient}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 rounded-2xl p-3 border border-red-100"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm text-charcoal flex items-center gap-1.5">
                      {gap.label}
                      {gap.isVegRisk && (
                        <span className="text-[10px] bg-red-100 text-red-500 px-1.5 py-0.5 rounded-full">
                          veg risk
                        </span>
                      )}
                    </span>
                    <span className="text-xs font-bold text-red-500">
                      {gap.pct}% of RDA
                    </span>
                  </div>

                  <div className="w-full h-2 bg-red-100 rounded-full overflow-hidden mb-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${gap.pct}%` }}
                      transition={{ duration: 0.6 }}
                      className="h-full bg-red-400 rounded-full"
                    />
                  </div>

                  <p className="text-xs text-charcoal-light/70">
                    Getting ~{Math.round(gap.value)}{gap.unit} vs {gap.rda}{gap.unit} recommended
                  </p>

                  {suggestion && (
                    <div className="mt-2 space-y-1">
                      <div className="flex items-start gap-1.5">
                        <ShoppingCart className="w-3 h-3 mt-0.5 text-sage-dark" />
                        <p className="text-xs text-charcoal-light/80">
                          <span className="font-medium">Add to groceries:</span>{' '}
                          {suggestion.foods.join(', ')}
                        </p>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <TrendingUp className="w-3 h-3 mt-0.5 text-turmeric" />
                        <p className="text-xs text-charcoal-light/80">{suggestion.supplement}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Adequate nutrients */}
      {analysis.adequate.length > 0 && (
        <div className="card p-4">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-5 h-5 text-sage-dark" />
            <h3 className="font-display text-lg font-bold text-charcoal">
              Looking Good
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {analysis.adequate.map((item) => (
              <div key={item.nutrient} className="bg-sage/10 rounded-xl p-2.5 border border-sage/20">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-charcoal">{item.label}</span>
                  <span className="text-xs font-bold text-sage-dark">{item.pct}%</span>
                </div>
                <div className="w-full h-1.5 bg-sage/20 rounded-full overflow-hidden mt-1">
                  <div
                    className="h-full bg-sage-dark rounded-full"
                    style={{ width: `${Math.min(item.pct, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
