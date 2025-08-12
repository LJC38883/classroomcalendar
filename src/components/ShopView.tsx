import React, { useState } from 'react';
import { ShoppingBag, Coins, Lock, Check, Sparkles, Music, Palette, Star } from 'lucide-react';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export const ShopView: React.FC = () => {
  const { shopItems, userProfile, purchaseItem } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'theme' | 'music' | 'decoration'>('all');

  const categories = [
    { id: 'all', label: 'All Items', icon: ShoppingBag },
    { id: 'theme', label: 'Themes', icon: Palette },
    { id: 'music', label: 'Music', icon: Music },
    { id: 'decoration', label: 'Decorations', icon: Star },
  ];

  const filteredItems = selectedCategory === 'all' 
    ? shopItems 
    : shopItems.filter(item => item.type === selectedCategory);

  const handlePurchase = (itemId: string) => {
    const item = shopItems.find(i => i.id === itemId);
    if (!item) return;

    if (userProfile.purchasedItems.includes(itemId)) {
      toast.error('You already own this item!');
      return;
    }

    if (userProfile.coins < item.price) {
      toast.error(`Not enough coins! You need ${item.price - userProfile.coins} more coins.`);
      return;
    }

    purchaseItem(itemId);
    toast.success(`Purchased ${item.name}!`, {
      icon: '🎉',
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen pb-24 px-6 pt-8">
      {/* Header */}
      <div className="mb-6" data-aos="fade-down">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Classroom Shop
        </h1>
        <div className="flex items-center gap-2">
          <Coins className="text-yellow-500" size={20} />
          <span className="text-lg font-bold">{userProfile.coins} Coins</span>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'glass-card hover:scale-105'
              }`}
              data-aos="fade-up"
              data-aos-delay={categories.indexOf(category) * 100}
            >
              <Icon size={16} />
              <span className="text-sm font-medium">{category.label}</span>
            </button>
          );
        })}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => {
            const isPurchased = userProfile.purchasedItems.includes(item.id);
            const canAfford = userProfile.coins >= item.price;
            
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                className="glass-card p-4 hover:shadow-xl transition-shadow"
                data-aos="fade-up"
                data-aos-delay={index * 50}
              >
                {item.preview && (
                  <div className="aspect-video rounded-lg overflow-hidden mb-3">
                    <img 
                      src={item.preview} 
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}
                
                {!item.preview && (
                  <div className="aspect-video rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center mb-3">
                    <Sparkles className="text-purple-600 floating" size={32} />
                  </div>
                )}

                <h3 className="font-bold text-sm mb-1">{item.name}</h3>
                <p className="text-xs text-gray-600 mb-3">{item.description}</p>
                
                <button
                  onClick={() => handlePurchase(item.id)}
                  disabled={isPurchased || !canAfford}
                  className={`w-full py-2 px-3 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                    isPurchased
                      ? 'bg-green-100 text-green-600 cursor-not-allowed'
                      : canAfford
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:scale-105'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isPurchased ? (
                    <>
                      <Check size={16} />
                      Owned
                    </>
                  ) : canAfford ? (
                    <>
                      <Coins size={16} />
                      {item.price} Coins
                    </>
                  ) : (
                    <>
                      <Lock size={16} />
                      {item.price} Coins
                    </>
                  )}
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12" data-aos="fade-up">
          <ShoppingBag className="mx-auto text-gray-300 mb-4" size={48} />
          <p className="text-gray-600">No items in this category yet</p>
        </div>
      )}
    </div>
  );
};
