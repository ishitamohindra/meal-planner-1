// Nutritional data per 100g for common Indian kitchen ingredients
// Sources: IFCT 2017 (Indian Food Composition Tables), USDA FoodData Central

export const NUTRITION_DB = {
  // ── Proteins ──
  'chicken breast': { calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0, iron: 1.0, calcium: 15, vitC: 0, vitB12: 0.3, zinc: 1.0, folate: 4, vitD: 0.1 },
  'chicken thigh': { calories: 209, protein: 26, carbs: 0, fat: 10.9, fiber: 0, iron: 1.3, calcium: 12, vitC: 0, vitB12: 0.3, zinc: 2.4, folate: 6, vitD: 0.1 },
  eggs: { calories: 155, protein: 13, carbs: 1.1, fat: 11, fiber: 0, iron: 1.8, calcium: 56, vitC: 0, vitB12: 0.9, zinc: 1.3, folate: 47, vitD: 2.0 },
  paneer: { calories: 265, protein: 18, carbs: 1.2, fat: 20.8, fiber: 0, iron: 0.2, calcium: 480, vitC: 0, vitB12: 0.8, zinc: 2.7, folate: 38, vitD: 0.5 },
  tofu: { calories: 76, protein: 8, carbs: 1.9, fat: 4.8, fiber: 0.3, iron: 5.4, calcium: 350, vitC: 0, vitB12: 0, zinc: 0.8, folate: 15, vitD: 0 },
  fish: { calories: 136, protein: 20, carbs: 0, fat: 5.6, fiber: 0, iron: 0.5, calcium: 26, vitC: 0, vitB12: 2.8, zinc: 0.5, folate: 7, vitD: 11.0 },
  prawns: { calories: 99, protein: 24, carbs: 0.2, fat: 0.3, fiber: 0, iron: 2.4, calcium: 70, vitC: 2, vitB12: 1.1, zinc: 1.6, folate: 3, vitD: 0.1 },

  // ── Lentils & Legumes ──
  'toor dal': { calories: 343, protein: 22, carbs: 57, fat: 1.7, fiber: 5, iron: 5.8, calcium: 73, vitC: 0, vitB12: 0, zinc: 2.8, folate: 216, vitD: 0 },
  'moong dal': { calories: 347, protein: 24, carbs: 56, fat: 1.2, fiber: 4.1, iron: 4.4, calcium: 75, vitC: 0, vitB12: 0, zinc: 2.5, folate: 194, vitD: 0 },
  'masoor dal': { calories: 352, protein: 25, carbs: 60, fat: 1.1, fiber: 7.9, iron: 6.5, calcium: 38, vitC: 1.5, vitB12: 0, zinc: 3.3, folate: 181, vitD: 0 },
  'chana dal': { calories: 360, protein: 20, carbs: 58, fat: 5.3, fiber: 10, iron: 5.3, calcium: 56, vitC: 3, vitB12: 0, zinc: 3.0, folate: 172, vitD: 0 },
  'urad dal': { calories: 341, protein: 24, carbs: 59, fat: 1.4, fiber: 4.8, iron: 7.6, calcium: 154, vitC: 0, vitB12: 0, zinc: 2.0, folate: 140, vitD: 0 },
  'rajma': { calories: 333, protein: 23, carbs: 60, fat: 0.8, fiber: 15, iron: 8.2, calcium: 143, vitC: 0, vitB12: 0, zinc: 2.8, folate: 394, vitD: 0 },
  'chole': { calories: 364, protein: 19, carbs: 61, fat: 6, fiber: 12, iron: 4.3, calcium: 105, vitC: 4, vitB12: 0, zinc: 3.4, folate: 172, vitD: 0 },
  'black dal': { calories: 341, protein: 24, carbs: 59, fat: 1.4, fiber: 4.8, iron: 7.6, calcium: 154, vitC: 0, vitB12: 0, zinc: 2.0, folate: 140, vitD: 0 },

  // ── Grains ──
  rice: { calories: 130, protein: 2.7, carbs: 28, fat: 0.3, fiber: 0.4, iron: 0.2, calcium: 10, vitC: 0, vitB12: 0, zinc: 0.5, folate: 3, vitD: 0 },
  'brown rice': { calories: 123, protein: 2.6, carbs: 26, fat: 0.9, fiber: 1.8, iron: 0.5, calcium: 10, vitC: 0, vitB12: 0, zinc: 0.6, folate: 4, vitD: 0 },
  'atta': { calories: 340, protein: 12, carbs: 72, fat: 1.7, fiber: 11, iron: 4.9, calcium: 48, vitC: 0, vitB12: 0, zinc: 2.9, folate: 44, vitD: 0 },
  'roti': { calories: 264, protein: 9, carbs: 50, fat: 3.7, fiber: 4, iron: 3.5, calcium: 30, vitC: 0, vitB12: 0, zinc: 1.7, folate: 26, vitD: 0 },
  'poha': { calories: 358, protein: 6.5, carbs: 77, fat: 2.7, fiber: 2.4, iron: 20, calcium: 12, vitC: 0, vitB12: 0, zinc: 0.5, folate: 8, vitD: 0 },
  'oats': { calories: 389, protein: 17, carbs: 66, fat: 6.9, fiber: 10.6, iron: 4.7, calcium: 54, vitC: 0, vitB12: 0, zinc: 3.6, folate: 56, vitD: 0 },
  'shirataki noodles': { calories: 9, protein: 0, carbs: 3, fat: 0, fiber: 3, iron: 0, calcium: 43, vitC: 0, vitB12: 0, zinc: 0, folate: 0, vitD: 0 },
  'cauliflower rice': { calories: 25, protein: 1.9, carbs: 5, fat: 0.3, fiber: 2, iron: 0.4, calcium: 22, vitC: 48, vitB12: 0, zinc: 0.3, folate: 57, vitD: 0 },

  // ── Vegetables ──
  onion: { calories: 40, protein: 1.1, carbs: 9.3, fat: 0.1, fiber: 1.7, iron: 0.2, calcium: 23, vitC: 7.4, vitB12: 0, zinc: 0.2, folate: 19, vitD: 0 },
  tomato: { calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, fiber: 1.2, iron: 0.3, calcium: 10, vitC: 14, vitB12: 0, zinc: 0.2, folate: 15, vitD: 0 },
  potato: { calories: 77, protein: 2, carbs: 17, fat: 0.1, fiber: 2.2, iron: 0.8, calcium: 12, vitC: 20, vitB12: 0, zinc: 0.3, folate: 15, vitD: 0 },
  'green peas': { calories: 81, protein: 5.4, carbs: 14, fat: 0.4, fiber: 5.1, iron: 1.5, calcium: 25, vitC: 40, vitB12: 0, zinc: 1.2, folate: 65, vitD: 0 },
  spinach: { calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2, iron: 2.7, calcium: 99, vitC: 28, vitB12: 0, zinc: 0.5, folate: 194, vitD: 0 },
  'methi leaves': { calories: 49, protein: 4.4, carbs: 6, fat: 0.9, fiber: 4, iron: 17, calcium: 160, vitC: 52, vitB12: 0, zinc: 0.9, folate: 84, vitD: 0 },
  'palak': { calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2, iron: 2.7, calcium: 99, vitC: 28, vitB12: 0, zinc: 0.5, folate: 194, vitD: 0 },
  'gobhi': { calories: 25, protein: 1.9, carbs: 5, fat: 0.3, fiber: 2, iron: 0.4, calcium: 22, vitC: 48, vitB12: 0, zinc: 0.3, folate: 57, vitD: 0 },
  'bandgobhi': { calories: 25, protein: 1.3, carbs: 5.8, fat: 0.1, fiber: 2.5, iron: 0.5, calcium: 40, vitC: 36, vitB12: 0, zinc: 0.2, folate: 43, vitD: 0 },
  'bhindi': { calories: 33, protein: 1.9, carbs: 7.5, fat: 0.2, fiber: 3.2, iron: 0.6, calcium: 82, vitC: 23, vitB12: 0, zinc: 0.6, folate: 60, vitD: 0 },
  'baingan': { calories: 25, protein: 1, carbs: 6, fat: 0.2, fiber: 3, iron: 0.2, calcium: 9, vitC: 2.2, vitB12: 0, zinc: 0.2, folate: 22, vitD: 0 },
  'lauki': { calories: 14, protein: 0.6, carbs: 3.4, fat: 0, fiber: 0.5, iron: 0.2, calcium: 26, vitC: 10, vitB12: 0, zinc: 0.7, folate: 6, vitD: 0 },
  'tinda': { calories: 21, protein: 1.4, carbs: 3.4, fat: 0.2, fiber: 1.6, iron: 0.7, calcium: 32, vitC: 18, vitB12: 0, zinc: 0.5, folate: 18, vitD: 0 },
  'tori': { calories: 18, protein: 1.2, carbs: 3.3, fat: 0.3, fiber: 1.1, iron: 0.5, calcium: 18, vitC: 12, vitB12: 0, zinc: 0.3, folate: 12, vitD: 0 },
  capsicum: { calories: 31, protein: 1, carbs: 6, fat: 0.3, fiber: 2.1, iron: 0.4, calcium: 7, vitC: 128, vitB12: 0, zinc: 0.2, folate: 46, vitD: 0 },
  carrot: { calories: 41, protein: 0.9, carbs: 10, fat: 0.2, fiber: 2.8, iron: 0.3, calcium: 33, vitC: 6, vitB12: 0, zinc: 0.2, folate: 19, vitD: 0 },
  cucumber: { calories: 15, protein: 0.7, carbs: 3.6, fat: 0.1, fiber: 0.5, iron: 0.3, calcium: 16, vitC: 2.8, vitB12: 0, zinc: 0.2, folate: 7, vitD: 0 },
  beans: { calories: 31, protein: 1.8, carbs: 7, fat: 0.2, fiber: 2.7, iron: 1, calcium: 37, vitC: 12, vitB12: 0, zinc: 0.2, folate: 33, vitD: 0 },
  mushroom: { calories: 22, protein: 3.1, carbs: 3.3, fat: 0.3, fiber: 1, iron: 0.5, calcium: 3, vitC: 2.1, vitB12: 0.04, zinc: 0.5, folate: 17, vitD: 0.2 },
  'sweet potato': { calories: 86, protein: 1.6, carbs: 20, fat: 0.1, fiber: 3, iron: 0.6, calcium: 30, vitC: 2.4, vitB12: 0, zinc: 0.3, folate: 11, vitD: 0 },
  broccoli: { calories: 34, protein: 2.8, carbs: 7, fat: 0.4, fiber: 2.6, iron: 0.7, calcium: 47, vitC: 89, vitB12: 0, zinc: 0.4, folate: 63, vitD: 0 },
  zucchini: { calories: 17, protein: 1.2, carbs: 3.1, fat: 0.3, fiber: 1, iron: 0.4, calcium: 16, vitC: 18, vitB12: 0, zinc: 0.3, folate: 24, vitD: 0 },

  // ── Dairy ──
  curd: { calories: 60, protein: 3.5, carbs: 4.7, fat: 3.3, fiber: 0, iron: 0.1, calcium: 121, vitC: 0.5, vitB12: 0.4, zinc: 0.6, folate: 7, vitD: 0.1 },
  milk: { calories: 62, protein: 3.2, carbs: 4.8, fat: 3.3, fiber: 0, iron: 0, calcium: 119, vitC: 0, vitB12: 0.4, zinc: 0.4, folate: 5, vitD: 1.3 },
  ghee: { calories: 900, protein: 0, carbs: 0, fat: 100, fiber: 0, iron: 0, calcium: 0, vitC: 0, vitB12: 0, zinc: 0, folate: 0, vitD: 1.5 },
  butter: { calories: 717, protein: 0.9, carbs: 0.1, fat: 81, fiber: 0, iron: 0, calcium: 24, vitC: 0, vitB12: 0.2, zinc: 0.1, folate: 3, vitD: 0.6 },
  'hung curd': { calories: 98, protein: 11, carbs: 3.6, fat: 4.3, fiber: 0, iron: 0.1, calcium: 110, vitC: 0, vitB12: 0.8, zinc: 1.2, folate: 18, vitD: 0.1 },
  cream: { calories: 195, protein: 2.1, carbs: 3.4, fat: 19.1, fiber: 0, iron: 0, calcium: 65, vitC: 0.6, vitB12: 0.2, zinc: 0.3, folate: 4, vitD: 0.3 },
  cheese: { calories: 402, protein: 25, carbs: 1.3, fat: 33, fiber: 0, iron: 0.7, calcium: 721, vitC: 0, vitB12: 1.5, zinc: 3.1, folate: 18, vitD: 0.6 },

  // ── Pantry Staples ──
  'coconut milk': { calories: 230, protein: 2.3, carbs: 5.5, fat: 24, fiber: 0, iron: 1.6, calcium: 16, vitC: 2.8, vitB12: 0, zinc: 0.7, folate: 16, vitD: 0 },
  'peanuts': { calories: 567, protein: 26, carbs: 16, fat: 49, fiber: 8.5, iron: 4.6, calcium: 92, vitC: 0, vitB12: 0, zinc: 3.3, folate: 240, vitD: 0 },
  'sesame seeds': { calories: 573, protein: 18, carbs: 23, fat: 50, fiber: 12, iron: 14.5, calcium: 975, vitC: 0, vitB12: 0, zinc: 7.8, folate: 97, vitD: 0 },
  'flax seeds': { calories: 534, protein: 18, carbs: 29, fat: 42, fiber: 27, iron: 5.7, calcium: 255, vitC: 0.6, vitB12: 0, zinc: 4.3, folate: 87, vitD: 0 },
  oil: { calories: 884, protein: 0, carbs: 0, fat: 100, fiber: 0, iron: 0, calcium: 0, vitC: 0, vitB12: 0, zinc: 0, folate: 0, vitD: 0 },
  jaggery: { calories: 383, protein: 0.4, carbs: 98, fat: 0.1, fiber: 0, iron: 11, calcium: 80, vitC: 0, vitB12: 0, zinc: 0.2, folate: 0, vitD: 0 },
  honey: { calories: 304, protein: 0.3, carbs: 82, fat: 0, fiber: 0.2, iron: 0.4, calcium: 6, vitC: 0.5, vitB12: 0, zinc: 0.2, folate: 2, vitD: 0 },
  'tamarind': { calories: 239, protein: 2.8, carbs: 63, fat: 0.6, fiber: 5.1, iron: 2.8, calcium: 74, vitC: 3.5, vitB12: 0, zinc: 0.1, folate: 14, vitD: 0 },
  'coconut': { calories: 354, protein: 3.3, carbs: 15, fat: 33, fiber: 9, iron: 2.4, calcium: 14, vitC: 3.3, vitB12: 0, zinc: 1.1, folate: 26, vitD: 0 },
  'besan': { calories: 387, protein: 22, carbs: 58, fat: 6.7, fiber: 10, iron: 4.9, calcium: 45, vitC: 0, vitB12: 0, zinc: 2.8, folate: 437, vitD: 0 },

  // ── Spices (per 100g, but used in small quantities) ──
  'turmeric': { calories: 312, protein: 9.7, carbs: 67, fat: 3.3, fiber: 22.7, iron: 55, calcium: 168, vitC: 0.7, vitB12: 0, zinc: 4.5, folate: 20, vitD: 0 },
  'cumin seeds': { calories: 375, protein: 18, carbs: 44, fat: 22, fiber: 10.5, iron: 66, calcium: 931, vitC: 7.7, vitB12: 0, zinc: 4.8, folate: 10, vitD: 0 },
  'coriander powder': { calories: 298, protein: 12, carbs: 55, fat: 18, fiber: 42, iron: 16, calcium: 709, vitC: 0, vitB12: 0, zinc: 4.7, folate: 0, vitD: 0 },
  'garam masala': { calories: 379, protein: 13, carbs: 45, fat: 15, fiber: 26, iron: 29, calcium: 450, vitC: 5, vitB12: 0, zinc: 3.5, folate: 10, vitD: 0 },
  'red chilli powder': { calories: 282, protein: 14, carbs: 50, fat: 6, fiber: 28, iron: 7.8, calcium: 148, vitC: 76, vitB12: 0, zinc: 2.5, folate: 106, vitD: 0 },
  ginger: { calories: 80, protein: 1.8, carbs: 18, fat: 0.8, fiber: 2, iron: 0.6, calcium: 16, vitC: 5, vitB12: 0, zinc: 0.3, folate: 11, vitD: 0 },
  garlic: { calories: 149, protein: 6.4, carbs: 33, fat: 0.5, fiber: 2.1, iron: 1.7, calcium: 181, vitC: 31, vitB12: 0, zinc: 1.2, folate: 3, vitD: 0 },
  'mustard seeds': { calories: 508, protein: 26, carbs: 28, fat: 36, fiber: 12, iron: 9.2, calcium: 266, vitC: 7, vitB12: 0, zinc: 6.1, folate: 162, vitD: 0 },
  'curry leaves': { calories: 108, protein: 6.1, carbs: 19, fat: 1, fiber: 6.4, iron: 0.9, calcium: 830, vitC: 4, vitB12: 0, zinc: 0.2, folate: 94, vitD: 0 },
  'green chilli': { calories: 40, protein: 1.9, carbs: 9, fat: 0.4, fiber: 1.5, iron: 1.0, calcium: 14, vitC: 243, vitB12: 0, zinc: 0.3, folate: 23, vitD: 0 },
  'cinnamon': { calories: 247, protein: 4, carbs: 81, fat: 1.2, fiber: 53, iron: 8.3, calcium: 1002, vitC: 3.8, vitB12: 0, zinc: 1.8, folate: 6, vitD: 0 },
  'lemon': { calories: 29, protein: 1.1, carbs: 9.3, fat: 0.3, fiber: 2.8, iron: 0.6, calcium: 26, vitC: 53, vitB12: 0, zinc: 0.1, folate: 11, vitD: 0 },
};

// Recommended Daily Allowances (adult)
export const RDA = {
  calories: { value: 2000, unit: 'kcal' },
  protein: { value: 50, unit: 'g' },
  carbs: { value: 275, unit: 'g' },
  fat: { value: 65, unit: 'g' },
  fiber: { value: 28, unit: 'g' },
  iron: { value: 18, unit: 'mg' },
  calcium: { value: 1000, unit: 'mg' },
  vitC: { value: 90, unit: 'mg' },
  vitB12: { value: 2.4, unit: 'mcg' },
  zinc: { value: 11, unit: 'mg' },
  folate: { value: 400, unit: 'mcg' },
  vitD: { value: 15, unit: 'mcg' },
};

export const NUTRIENT_LABELS = {
  calories: 'Calories',
  protein: 'Protein',
  carbs: 'Carbs',
  fat: 'Fat',
  fiber: 'Fiber',
  iron: 'Iron',
  calcium: 'Calcium',
  vitC: 'Vitamin C',
  vitB12: 'Vitamin B12',
  zinc: 'Zinc',
  folate: 'Folate',
  vitD: 'Vitamin D',
};

export const MACRO_KEYS = ['calories', 'protein', 'carbs', 'fat', 'fiber'];
export const MICRO_KEYS = ['iron', 'calcium', 'vitC', 'vitB12', 'zinc', 'folate', 'vitD'];

// Flag nutrients commonly low in vegetarian Indian diets
export const VEG_RISK_NUTRIENTS = ['vitB12', 'vitD', 'iron', 'zinc', 'calcium'];

// Quick-add grocery categories
export const GROCERY_CATEGORIES = {
  Proteins: ['chicken breast', 'chicken thigh', 'eggs', 'paneer', 'tofu', 'fish', 'prawns'],
  Vegetables: ['onion', 'tomato', 'potato', 'green peas', 'spinach', 'gobhi', 'bandgobhi', 'bhindi', 'baingan', 'capsicum', 'carrot', 'beans', 'mushroom', 'broccoli', 'lauki', 'methi leaves', 'palak', 'cucumber', 'zucchini', 'sweet potato', 'tinda', 'tori'],
  'Grains & Legumes': ['rice', 'brown rice', 'atta', 'oats', 'poha', 'shirataki noodles', 'cauliflower rice', 'toor dal', 'moong dal', 'masoor dal', 'chana dal', 'urad dal', 'rajma', 'chole', 'black dal', 'besan'],
  Dairy: ['paneer', 'curd', 'milk', 'ghee', 'butter', 'hung curd', 'cream', 'cheese'],
  'Pantry Staples': ['coconut milk', 'peanuts', 'sesame seeds', 'flax seeds', 'oil', 'jaggery', 'honey', 'tamarind', 'coconut', 'lemon'],
  Spices: ['turmeric', 'cumin seeds', 'coriander powder', 'garam masala', 'red chilli powder', 'ginger', 'garlic', 'mustard seeds', 'curry leaves', 'green chilli', 'cinnamon'],
};

// Estimate nutrition for a dish based on rough ingredient proportions
export function estimateMealNutrition(ingredients) {
  const totals = {
    calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0,
    iron: 0, calcium: 0, vitC: 0, vitB12: 0, zinc: 0, folate: 0, vitD: 0,
  };

  for (const { name, grams } of ingredients) {
    const key = name.toLowerCase();
    const data = NUTRITION_DB[key];
    if (!data) continue;
    const factor = (grams || 100) / 100;
    for (const nutrient of Object.keys(totals)) {
      totals[nutrient] += (data[nutrient] || 0) * factor;
    }
  }

  // Round values
  for (const key of Object.keys(totals)) {
    totals[key] = Math.round(totals[key] * 10) / 10;
  }

  return totals;
}
