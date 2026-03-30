import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, UtensilsCrossed, BarChart3, ShoppingBasket, ArrowRight, Loader2 } from 'lucide-react';
import GroceryInput from './components/GroceryInput';
import WeeklyPlan from './components/WeeklyPlan';
import GapAnalysis from './components/GapAnalysis';
import { generateMealPlan } from './utils/mealPrompts';
import { getAllIngredients } from './utils/nutritionData';

const TABS = [
  { id: 'groceries', label: 'Pantry', icon: ShoppingBasket },
  { id: 'plan', label: 'Meals', icon: UtensilsCrossed },
  { id: 'analysis', label: 'Nutrition', icon: BarChart3 },
];

function LoadingOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-cream/95 backdrop-blur-sm flex flex-col items-center justify-center gap-6 px-8"
    >
      <motion.div
        animate={{ rotate: [0, -10, 10, -10, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChefHat className="w-16 h-16 text-terracotta" />
      </motion.div>
      <div className="text-center space-y-2">
        <h2 className="font-display text-2xl font-bold text-charcoal">
          Cooking up your week...
        </h2>
        <p className="text-sm text-charcoal-light/60 max-w-xs">
          Crafting 21 meals with your ingredients. This takes about 30 seconds.
        </p>
      </div>
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
            className="w-2 h-2 rounded-full bg-terracotta"
          />
        ))}
      </div>
    </motion.div>
  );
}

function LandingHero({ onStart }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-[100dvh] flex flex-col items-center justify-center px-6 text-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
        className="mb-6"
      >
        <div className="w-20 h-20 rounded-3xl bg-terracotta/10 flex items-center justify-center mx-auto mb-4">
          <ChefHat className="w-10 h-10 text-terracotta" />
        </div>
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="font-display text-4xl sm:text-5xl font-extrabold text-charcoal tracking-tight leading-[1.1]"
      >
        Pantry to{' '}
        <span className="text-terracotta">Plate</span>
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-charcoal-light/70 mt-3 max-w-xs text-base leading-relaxed"
      >
        Turn your kitchen ingredients into a week of delicious Indian-fusion meals with full nutritional analysis.
      </motion.p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8"
      >
        <button onClick={onStart} className="btn-primary flex items-center gap-2 text-lg px-8 py-4">
          What's in your kitchen?
          <ArrowRight className="w-5 h-5" />
        </button>
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-12 flex flex-wrap justify-center gap-2 max-w-sm"
      >
        {['dal chawal', 'paneer tikka', 'Thai curry', 'curd rice', 'methi paratha', 'khao suey'].map((dish) => (
          <span key={dish} className="px-3 py-1 rounded-full bg-cream-dark text-xs text-charcoal-light/50 font-medium">
            {dish}
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default function App() {
  const [screen, setScreen] = useState('landing'); // landing | input | plan
  const [activeTab, setActiveTab] = useState('groceries');
  const [groceries, setGroceries] = useState(() => getAllIngredients());
  const [mealPlan, setMealPlan] = useState(null);
  const [selectedMeals, setSelectedMeals] = useState({ breakfast: 0, lunch: 0, dinner: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = useCallback(async () => {
    if (groceries.length === 0) return;

    setLoading(true);
    setError(null);

    try {
      const result = await generateMealPlan(groceries);
      setMealPlan(result.mealOptions);
      setSelectedMeals({ breakfast: 0, lunch: 0, dinner: 0 });
      setScreen('plan');
      setActiveTab('plan');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [groceries]);

  // Landing screen
  if (screen === 'landing') {
    return <LandingHero onStart={() => setScreen('input')} />;
  }

  return (
    <div className="min-h-[100dvh] pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur-xl border-b border-charcoal/5">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center">
          <button
            onClick={() => setScreen('landing')}
            className="flex items-center gap-2"
          >
            <ChefHat className="w-6 h-6 text-terracotta" />
            <span className="font-display text-lg font-bold text-charcoal">
              Pantry to <span className="text-terracotta">Plate</span>
            </span>
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-lg mx-auto px-4 py-4">
        <AnimatePresence mode="wait">
          {activeTab === 'groceries' && (
            <motion.div
              key="groceries"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="space-y-1">
                <h2 className="section-title">What's in your kitchen?</h2>
                <p className="text-sm text-charcoal-light/60">
                  Select your available ingredients or add custom ones
                </p>
              </div>

              <GroceryInput groceries={groceries} setGroceries={setGroceries} />

              {/* Error display */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* Generate button */}
              <div className="sticky bottom-20 z-30 pt-2">
                <button
                  onClick={handleGenerate}
                  disabled={groceries.length < 3 || loading}
                  className="btn-primary w-full flex items-center justify-center gap-2 text-base"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Generate My Week
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
                {groceries.length < 3 && groceries.length > 0 && (
                  <p className="text-xs text-center text-charcoal-light/50 mt-1.5">
                    Select at least 3 ingredients
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'plan' && (
            <motion.div
              key="plan"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              {mealPlan ? (
                <WeeklyPlan mealOptions={mealPlan} selectedMeals={selectedMeals} onSelectMeal={setSelectedMeals} />
              ) : (
                <div className="text-center py-16 space-y-3">
                  <UtensilsCrossed className="w-12 h-12 text-charcoal-light/20 mx-auto" />
                  <p className="text-charcoal-light/50">
                    No meal plan yet. Add groceries and generate!
                  </p>
                  <button
                    onClick={() => setActiveTab('groceries')}
                    className="btn-secondary"
                  >
                    Go to Pantry
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'analysis' && (
            <motion.div
              key="analysis"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              {mealPlan ? (
                <GapAnalysis mealOptions={mealPlan} selectedMeals={selectedMeals} />
              ) : (
                <div className="text-center py-16 space-y-3">
                  <BarChart3 className="w-12 h-12 text-charcoal-light/20 mx-auto" />
                  <p className="text-charcoal-light/50">
                    Generate a meal plan to see nutritional analysis
                  </p>
                  <button
                    onClick={() => setActiveTab('groceries')}
                    className="btn-secondary"
                  >
                    Go to Pantry
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom navigation */}
      <nav className="bottom-nav bottom-nav-safe">
        <div className="max-w-lg mx-auto flex">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const hasContent = tab.id === 'groceries' || mealPlan;

            return (
              <button
                key={tab.id}
                onClick={() => hasContent && setActiveTab(tab.id)}
                className={`flex-1 flex flex-col items-center gap-0.5 py-3 transition-all duration-200
                           ${isActive
                             ? 'text-terracotta'
                             : hasContent
                               ? 'text-charcoal-light/40 hover:text-charcoal-light/60'
                               : 'text-charcoal-light/20 cursor-not-allowed'
                           }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium uppercase tracking-wider">
                  {tab.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute top-0 left-0 right-0 h-0.5 bg-terracotta"
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Overlays */}
      <AnimatePresence>
        {loading && <LoadingOverlay />}
      </AnimatePresence>
    </div>
  );
}
