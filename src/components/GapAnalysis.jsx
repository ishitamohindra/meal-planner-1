import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, ShoppingCart, TrendingUp } from 'lucide-react';
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

export default function GapAnalysis({ weekPlan }) {
  const analysis = useMemo(() => {
    if (!weekPlan || weekPlan.length === 0) return null;

    // Sum all meals across the week
    const weeklyTotals = {
      calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0,
      iron: 0, calcium: 0, vitC: 0, vitB12: 0, zinc: 0, folate: 0, vitD: 0,
    };

    let mealCount = 0;
    for (const day of weekPlan) {
      for (const meal of day.meals || []) {
        const mealNutrition = estimateMealNutrition(meal.ingredients || []);
        for (const key of Object.keys(weeklyTotals)) {
          weeklyTotals[key] += mealNutrition[key];
        }
        mealCount++;
      }
    }

    // Daily averages
    const dailyAvg = {};
    for (const key of Object.keys(weeklyTotals)) {
      dailyAvg[key] = Math.round((weeklyTotals[key] / 7) * 10) / 10;
    }

    // Identify gaps (< 70% of RDA on average)
    const gaps = [];
    const adequate = [];
    const allKeys = [...MACRO_KEYS, ...MICRO_KEYS];

    for (const key of allKeys) {
      const pct = (dailyAvg[key] / RDA[key].value) * 100;
      const entry = {
        nutrient: key,
        label: NUTRIENT_LABELS[key],
        dailyAvg: dailyAvg[key],
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

    // Sort gaps by severity
    gaps.sort((a, b) => a.pct - b.pct);

    return { weeklyTotals, dailyAvg, gaps, adequate, mealCount };
  }, [weekPlan]);

  if (!analysis) return null;

  return (
    <div className="space-y-6">
      {/* Weekly overview */}
      <div className="card p-4">
        <h3 className="font-display text-lg font-bold text-charcoal mb-1">
          Weekly Nutrition Summary
        </h3>
        <p className="text-sm text-charcoal-light/60 mb-4">
          Averaged across {analysis.mealCount} meals over 7 days
        </p>
        <NutritionPanel nutrition={analysis.dailyAvg} title="Daily Average" />
      </div>

      {/* Gaps */}
      {analysis.gaps.length > 0 && (
        <div className="card p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-terracotta" />
            <h3 className="font-display text-lg font-bold text-charcoal">
              Nutritional Gaps
            </h3>
          </div>
          <p className="text-sm text-charcoal-light/60 mb-4">
            These nutrients are below 70% of recommended daily intake
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
                    Getting ~{Math.round(gap.dailyAvg)}{gap.unit}/day vs {gap.rda}{gap.unit} recommended
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
