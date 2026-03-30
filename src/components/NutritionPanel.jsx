import { motion } from 'framer-motion';
import { NUTRIENT_LABELS, MACRO_KEYS, MICRO_KEYS, RDA, VEG_RISK_NUTRIENTS } from '../utils/nutritionData';
import { AlertTriangle } from 'lucide-react';

function NutrientBar({ nutrientKey, value, compact = false }) {
  const label = NUTRIENT_LABELS[nutrientKey];
  const rda = RDA[nutrientKey];
  const pct = Math.min((value / rda.value) * 100, 150);
  const isLow = pct < 30;
  const isVegRisk = VEG_RISK_NUTRIENTS.includes(nutrientKey);

  const barColor = isLow
    ? 'bg-red-400'
    : pct < 70
      ? 'bg-turmeric'
      : 'bg-sage-dark';

  return (
    <div className={compact ? 'space-y-0.5' : 'space-y-1'}>
      <div className="flex items-center justify-between">
        <span className={`font-medium text-charcoal ${compact ? 'text-xs' : 'text-sm'}`}>
          {label}
          {isLow && isVegRisk && (
            <AlertTriangle className="inline w-3 h-3 ml-1 text-red-400" />
          )}
        </span>
        <span className={`text-charcoal-light ${compact ? 'text-xs' : 'text-xs'}`}>
          {Math.round(value)}{rda.unit}
          <span className="text-charcoal-light/40 ml-1">/ {rda.value}{rda.unit}</span>
        </span>
      </div>
      <div className={`w-full bg-cream-dark rounded-full overflow-hidden ${compact ? 'h-1.5' : 'h-2'}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(pct, 100)}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={`h-full rounded-full ${barColor}`}
        />
      </div>
    </div>
  );
}

export default function NutritionPanel({ nutrition, compact = false, title = 'Nutrition' }) {
  if (!nutrition) return null;

  return (
    <div className={compact ? 'space-y-2' : 'space-y-4'}>
      {title && !compact && (
        <h4 className="font-display text-lg font-bold text-charcoal">{title}</h4>
      )}

      {/* Macro summary cards */}
      {!compact && (
        <div className="grid grid-cols-5 gap-2">
          {MACRO_KEYS.map((key) => (
            <div key={key} className="bg-cream-dark rounded-xl p-2 text-center">
              <p className="text-lg font-bold text-charcoal">{Math.round(nutrition[key])}</p>
              <p className="text-[10px] uppercase tracking-wider text-charcoal-light/60 font-medium">
                {key === 'calories' ? 'kcal' : RDA[key].unit}
              </p>
              <p className="text-xs text-charcoal-light/80 mt-0.5 capitalize">{key}</p>
            </div>
          ))}
        </div>
      )}

      {/* Macro bars */}
      <div>
        {!compact && (
          <p className="text-xs font-medium text-charcoal-light/60 uppercase tracking-wider mb-2">
            Macronutrients
          </p>
        )}
        <div className="space-y-2">
          {MACRO_KEYS.map((key) => (
            <NutrientBar key={key} nutrientKey={key} value={nutrition[key]} compact={compact} />
          ))}
        </div>
      </div>

      {/* Micro bars */}
      <div>
        <p className="text-xs font-medium text-charcoal-light/60 uppercase tracking-wider mb-2">
          Micronutrients
        </p>
        <div className="space-y-2">
          {MICRO_KEYS.map((key) => (
            <NutrientBar key={key} nutrientKey={key} value={nutrition[key]} compact={compact} />
          ))}
        </div>
      </div>
    </div>
  );
}
