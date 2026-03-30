import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { GROCERY_CATEGORIES } from '../utils/nutritionData';

const chipVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 400, damping: 20 } },
  exit: { scale: 0.8, opacity: 0, transition: { duration: 0.15 } },
};

export default function GroceryInput({ groceries, setGroceries }) {
  const [expandedCategory, setExpandedCategory] = useState('Proteins');
  const [customInput, setCustomInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef(null);

  const isSelected = (name) => groceries.some((g) => g.name === name);

  const toggle = (name) => {
    if (isSelected(name)) {
      setGroceries((prev) => prev.filter((g) => g.name !== name));
    } else {
      setGroceries((prev) => [...prev, { name }]);
    }
  };

  const addCustom = () => {
    const trimmed = customInput.trim().toLowerCase();
    if (trimmed && !isSelected(trimmed)) {
      setGroceries((prev) => [...prev, { name: trimmed }]);
      setCustomInput('');
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addCustom();
    }
  };

  // Filter categories by search
  const filteredCategories = searchQuery
    ? Object.entries(GROCERY_CATEGORIES).reduce((acc, [cat, items]) => {
        const filtered = items.filter((item) =>
          item.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (filtered.length > 0) acc[cat] = filtered;
        return acc;
      }, {})
    : GROCERY_CATEGORIES;

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-light/50" />
        <input
          type="text"
          placeholder="Search ingredients..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white rounded-2xl border border-charcoal/10
                     text-sm placeholder:text-charcoal-light/40 focus:outline-none
                     focus:border-terracotta/40 focus:ring-2 focus:ring-terracotta/10
                     transition-all"
        />
      </div>

      {/* Selected groceries */}
      <AnimatePresence>
        {groceries.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white rounded-2xl border border-charcoal/5 p-3">
              <p className="text-xs font-medium text-charcoal-light/60 uppercase tracking-wider mb-2">
                Selected ({groceries.length})
              </p>
              <div className="flex flex-wrap gap-2">
                <AnimatePresence mode="popLayout">
                  {groceries.map((g) => (
                    <motion.button
                      key={g.name}
                      variants={chipVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      layout
                      onClick={() => toggle(g.name)}
                      className="ingredient-chip active group"
                    >
                      <span className="capitalize">{g.name}</span>
                      <X className="w-3 h-3 opacity-70 group-hover:opacity-100" />
                    </motion.button>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom ingredient input */}
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          placeholder="Add custom ingredient..."
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-4 py-2.5 bg-white rounded-2xl border border-charcoal/10
                     text-sm placeholder:text-charcoal-light/40 focus:outline-none
                     focus:border-terracotta/40 focus:ring-2 focus:ring-terracotta/10
                     transition-all"
        />
        <button
          onClick={addCustom}
          disabled={!customInput.trim()}
          className="px-4 py-2.5 bg-terracotta text-white rounded-2xl
                     disabled:opacity-30 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Category accordions */}
      <div className="space-y-2">
        {Object.entries(filteredCategories).map(([category, items]) => {
          const isOpen = expandedCategory === category || searchQuery;
          const selectedCount = items.filter((i) => isSelected(i)).length;

          return (
            <div key={category} className="bg-white rounded-2xl border border-charcoal/5 overflow-hidden">
              <button
                onClick={() => !searchQuery && setExpandedCategory(isOpen ? null : category)}
                className="w-full flex items-center justify-between px-4 py-3 text-left"
              >
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-charcoal">{category}</span>
                  {selectedCount > 0 && (
                    <span className="text-xs bg-terracotta/10 text-terracotta px-2 py-0.5 rounded-full font-medium">
                      {selectedCount}
                    </span>
                  )}
                </div>
                {!searchQuery && (
                  isOpen
                    ? <ChevronUp className="w-4 h-4 text-charcoal-light/50" />
                    : <ChevronDown className="w-4 h-4 text-charcoal-light/50" />
                )}
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-3 flex flex-wrap gap-2">
                      {items.map((item) => (
                        <button
                          key={item}
                          onClick={() => toggle(item)}
                          className={`ingredient-chip ${isSelected(item) ? 'active' : ''}`}
                        >
                          <span className="capitalize">{item}</span>
                          {isSelected(item) && <X className="w-3 h-3" />}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
