export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  allergens?: string[];
  type?: 'drink' | 'food'; // Add this field
  sizes?: {
    S: number;
    M: number;
    L: number;
  };
}

// Helper function to get menu items for a specific cafe
export const getMenuForCafe = (cafeId: string): MenuItem[] => {
  return menuData[cafeId] || [];
};

// Menu data for all cafes
export const menuData: Record<string, MenuItem[]> = {
  'starbucks_umc': [
    // Drinks
    {
      id: 'latte_1',
      name: 'Latte',
      description: 'Espresso with steamed milk',
      price: 4.50,
      image: '/images/menu/latte.png',
      category: 'Coffee',
      allergens: ['dairy'],
      type: 'drink',
      sizes: {
        S: 4.00,
        M: 4.50,
        L: 5.00
      }
    },
    {
      id: 'cappuccino_2',
      name: 'Cappuccino',
      description: 'Espresso with foamed milk',
      price: 4.50,
      image: '/images/menu/cappuccino.png',
      category: 'Coffee',
      allergens: ['dairy'],
      type: 'drink',
      sizes: {
        S: 4.00,
        M: 4.50,
        L: 5.00
      }
    },
    {
      id: 'americano_3',
      name: 'Americano',
      description: 'Espresso with hot water',
      price: 3.50,
      image: '/images/menu/americano.png',
      category: 'Coffee',
      type: 'drink',
      sizes: {
        S: 3.00,
        M: 3.50,
        L: 4.00
      }
    },
    {
      id: 'mocha_4',
      name: 'Mocha',
      description: 'Espresso with chocolate and steamed milk',
      price: 5.00,
      image: '/images/menu/mocha.png',
      category: 'Coffee',
      allergens: ['dairy'],
      type: 'drink',
      sizes: {
        S: 4.50,
        M: 5.00,
        L: 5.50
      }
    },
    {
      id: 'iced_coffee_5',
      name: 'Iced Coffee',
      description: 'Chilled coffee over ice',
      price: 3.50,
      image: '/images/menu/iced-coffee.png',
      category: 'Iced Drinks',
      type: 'drink',
      sizes: {
        S: 3.00,
        M: 3.50,
        L: 4.00
      }
    },
    {
      id: 'cold_brew_6',
      name: 'Cold Brew',
      description: 'Slow-steeped cold coffee',
      price: 4.00,
      image: '/images/menu/cold-brew.png',
      category: 'Iced Drinks',
      type: 'drink',
      sizes: {
        S: 3.50,
        M: 4.00,
        L: 4.50
      }
    },
    {
      id: 'matcha_latte_7',
      name: 'Matcha Latte',
      description: 'Green tea powder with steamed milk',
      price: 5.50,
      image: '/images/menu/matcha-latte.png',
      category: 'Tea',
      allergens: ['dairy'],
      type: 'drink',
      sizes: {
        S: 5.00,
        M: 5.50,
        L: 6.00
      }
    },
    {
      id: 'chai_latte_8',
      name: 'Chai Latte',
      description: 'Spiced tea with steamed milk',
      price: 5.00,
      image: '/images/menu/chai-latte.png',
      category: 'Tea',
      allergens: ['dairy'],
      type: 'drink',
      sizes: {
        S: 4.50,
        M: 5.00,
        L: 5.50
      }
    },

    // Food
    {
      id: 'avocado_toast_9',
      name: 'Avocado Toast',
      description: 'Sourdough toast with avocado, cherry tomatoes, and microgreens',
      price: 8.50,
      image: '/images/menu/avocado-toast.png',
      category: 'Food',
      allergens: ['gluten'],
      type: 'food'
    },
    {
      id: 'croissant_10',
      name: 'Butter Croissant',
      description: 'Freshly baked French croissant',
      price: 3.50,
      image: '/images/menu/croissant.png',
      category: 'Pastries',
      allergens: ['dairy', 'gluten'],
      type: 'food'
    },
    {
      id: 'blueberry_muffin_11',
      name: 'Blueberry Muffin',
      description: 'Fresh blueberry muffin with streusel topping',
      price: 3.75,
      image: '/images/menu/blueberry-muffin.png',
      category: 'Pastries',
      allergens: ['dairy', 'gluten', 'eggs'],
      type: 'food'
    },
    {
      id: 'chocolate_chip_cookie_12',
      name: 'Chocolate Chip Cookie',
      description: 'Freshly baked cookie with chocolate chips',
      price: 2.50,
      image: '/images/menu/chocolate-chip-cookie.png',
      category: 'Pastries',
      allergens: ['dairy', 'gluten', 'eggs'],
      type: 'food'
    },
    {
      id: 'fruit_yogurt_parfait_13',
      name: 'Fruit Yogurt Parfait',
      description: 'Greek yogurt with granola and mixed berries',
      price: 6.50,
      image: '/images/menu/yogurt-parfait.png',
      category: 'Food',
      allergens: ['dairy', 'gluten'],
      type: 'food'
    }
  ],

  'weathertech': [
    // Drinks
    {
      id: 'weathertech_latte_1',
      name: 'WeatherTech Latte',
      description: 'Signature latte with house-made vanilla syrup',
      price: 5.00,
      image: '/images/menu/weathertech-latte.png',
      category: 'Coffee',
      allergens: ['dairy'],
      type: 'drink',
      sizes: {
        S: 4.50,
        M: 5.00,
        L: 5.50
      }
    },
    {
      id: 'espresso_2',
      name: 'Single Espresso',
      description: 'A shot of our premium espresso',
      price: 2.50,
      image: '/images/menu/espresso.png',
      category: 'Coffee',
      type: 'drink',
      sizes: {
        S: 2.50,
        M: 3.00,
        L: 3.50
      }
    },
    {
      id: 'hot_chocolate_3',
      name: 'Hot Chocolate',
      description: 'Rich dark chocolate with steamed milk',
      price: 4.50,
      image: '/images/menu/hot-chocolate.png',
      category: 'Hot Drinks',
      allergens: ['dairy'],
      type: 'drink',
      sizes: {
        S: 4.00,
        M: 4.50,
        L: 5.00
      }
    },

    // Food (Bakery items)
    {
      id: 'banana_bread_4',
      name: 'Banana Bread',
      description: 'Freshly baked banana bread with walnuts',
      price: 4.25,
      image: '/images/menu/banana-bread.png',
      category: 'Bakery',
      allergens: ['gluten', 'eggs', 'nuts'],
      type: 'food'
    },
    {
      id: 'quiche_5',
      name: 'Spinach & Feta Quiche',
      description: 'Flaky crust with spinach, feta, and eggs',
      price: 7.50,
      image: '/images/menu/quiche.png',
      category: 'Food',
      allergens: ['dairy', 'gluten', 'eggs'],
      type: 'food'
    },
    {
      id: 'bagel_6',
      name: 'Everything Bagel',
      description: 'Fresh bagel with cream cheese',
      price: 3.75,
      image: '/images/menu/bagel.png',
      category: 'Bakery',
      allergens: ['gluten', 'dairy'],
      type: 'food'
    }
  ],

  'laughinggoat': [
    // Drinks
    {
      id: 'goat_blend_1',
      name: 'Laughing Goat Blend',
      description: 'Our signature house blend coffee',
      price: 4.00,
      image: '/images/menu/goat-blend.png',
      category: 'Coffee',
      type: 'drink',
      sizes: {
        S: 3.50,
        M: 4.00,
        L: 4.50
      }
    },
    {
      id: 'turmeric_latte_2',
      name: 'Turmeric Golden Latte',
      description: 'Turmeric, ginger, and coconut milk',
      price: 5.50,
      image: '/images/menu/turmeric-latte.png',
      category: 'Specialty Drinks',
      type: 'drink',
      sizes: {
        S: 5.00,
        M: 5.50,
        L: 6.00
      }
    },
    {
      id: 'herbal_tea_3',
      name: 'Herbal Tea',
      description: 'Selection of loose-leaf herbal teas',
      price: 3.50,
      image: '/images/menu/herbal-tea.png',
      category: 'Tea',
      type: 'drink',
      sizes: {
        S: 3.00,
        M: 3.50,
        L: 4.00
      }
    },

    // Food
    {
      id: 'veggie_wrap_4',
      name: 'Veggie Wrap',
      description: 'Grilled vegetables with hummus in a wrap',
      price: 8.00,
      image: '/images/menu/veggie-wrap.png',
      category: 'Food',
      allergens: ['gluten'],
      type: 'food'
    },
    {
      id: 'energy_balls_5',
      name: 'Energy Balls',
      description: 'Dates, oats, and peanut butter protein balls',
      price: 3.00,
      image: '/images/menu/energy-balls.png',
      category: 'Snacks',
      allergens: ['nuts'],
      type: 'food'
    }
  ],

  'fens': [
    // Drinks
    {
      id: 'fen_special_1',
      name: "Fen's Special Brew",
      description: 'Our exclusive single-origin coffee',
      price: 4.75,
      image: '/images/menu/fen-special.png',
      category: 'Coffee',
      type: 'drink',
      sizes: {
        S: 4.25,
        M: 4.75,
        L: 5.25
      }
    },
    {
      id: 'bubble_tea_2',
      name: 'Bubble Tea',
      description: 'Milk tea with tapioca pearls',
      price: 5.50,
      image: '/images/menu/bubble-tea.png',
      category: 'Specialty Drinks',
      allergens: ['dairy'],
      type: 'drink',
      sizes: {
        S: 5.00,
        M: 5.50,
        L: 6.00
      }
    },

    // Food
    {
      id: 'bao_buns_3',
      name: 'Pork Bao Buns',
      description: 'Steamed buns with braised pork',
      price: 7.50,
      image: '/images/menu/bao-buns.png',
      category: 'Food',
      type: 'food'
    },
    {
      id: 'spring_rolls_4',
      name: 'Vegetable Spring Rolls',
      description: 'Crispy spring rolls with dipping sauce',
      price: 6.50,
      image: '/images/menu/spring-rolls.png',
      category: 'Food',
      type: 'food'
    }
  ],

  'foolishcraig': [
    // Drinks
    {
      id: 'drip_coffee_1',
      name: 'Drip Coffee',
      description: 'Freshly brewed coffee',
      price: 3.00,
      image: '/images/menu/drip-coffee.png',
      category: 'Coffee',
      type: 'drink',
      sizes: {
        S: 2.50,
        M: 3.00,
        L: 3.50
      }
    },

    // Food
    {
      id: 'grilled_cheese_2',
      name: 'Grilled Cheese',
      description: 'Three-cheese blend on sourdough',
      price: 7.00,
      image: '/images/menu/grilled-cheese.png',
      category: 'Food',
      allergens: ['dairy', 'gluten'],
      type: 'food'
    },
    {
      id: 'tomato_soup_3',
      name: 'Tomato Soup',
      description: 'Creamy tomato soup with basil',
      price: 5.50,
      image: '/images/menu/tomato-soup.png',
      category: 'Food',
      allergens: ['dairy'],
      type: 'food'
    }
  ],

  'northvioletpeak': [
    // Drinks
    {
      id: 'nitro_cold_brew_1',
      name: 'Nitro Cold Brew',
      description: 'Cascading cold brew on tap',
      price: 4.50,
      image: '/images/menu/nitro-cold-brew.png',
      category: 'Iced Drinks',
      type: 'drink',
      sizes: {
        S: 4.00,
        M: 4.50,
        L: 5.00
      }
    },
    {
      id: 'hot_tea_2',
      name: 'Hot Tea',
      description: 'Selection of premium teas',
      price: 3.25,
      image: '/images/menu/hot-tea.png',
      category: 'Tea',
      type: 'drink',
      sizes: {
        S: 2.75,
        M: 3.25,
        L: 3.75
      }
    },

    // Food
    {
      id: 'scone_3',
      name: 'Blueberry Scone',
      description: 'Buttery scone with fresh blueberries',
      price: 3.50,
      image: '/images/menu/scone.png',
      category: 'Pastries',
      allergens: ['dairy', 'gluten'],
      type: 'food'
    }
  ],

  'southvioletpeak': [
    // Same as North Violet Peak for now
    {
      id: 'south_nitro_1',
      name: 'Nitro Cold Brew',
      description: 'Cascading cold brew on tap',
      price: 4.50,
      image: '/images/menu/nitro-cold-brew.png',
      category: 'Iced Drinks',
      type: 'drink',
      sizes: {
        S: 4.00,
        M: 4.50,
        L: 5.00
      }
    },
    {
      id: 'south_hot_tea_2',
      name: 'Hot Tea',
      description: 'Selection of premium teas',
      price: 3.25,
      image: '/images/menu/hot-tea.png',
      category: 'Tea',
      type: 'drink',
      sizes: {
        S: 2.75,
        M: 3.25,
        L: 3.75
      }
    }
  ],

  'violetpeak': [
    // Drinks
    {
      id: 'violet_special_1',
      name: 'Violet Peak Blend',
      description: 'Our exclusive Koelbel blend',
      price: 4.25,
      image: '/images/menu/violet-blend.png',
      category: 'Coffee',
      type: 'drink',
      sizes: {
        S: 3.75,
        M: 4.25,
        L: 4.75
      }
    },
    {
      id: 'smoothie_2',
      name: 'Berry Smoothie',
      description: 'Mixed berries with yogurt',
      price: 6.00,
      image: '/images/menu/berry-smoothie.png',
      category: 'Smoothies',
      allergens: ['dairy'],
      type: 'drink',
      sizes: {
        S: 5.50,
        M: 6.00,
        L: 6.50
      }
    },

    // Food
    {
      id: 'salad_3',
      name: 'Kale Caesar Salad',
      description: 'Kale with Caesar dressing and croutons',
      price: 8.50,
      image: '/images/menu/kale-salad.png',
      category: 'Food',
      allergens: ['dairy', 'gluten'],
      type: 'food'
    },
    {
      id: 'brownie_4',
      name: 'Chocolate Brownie',
      description: 'Fudgy chocolate brownie',
      price: 3.75,
      image: '/images/menu/brownie.png',
      category: 'Pastries',
      allergens: ['dairy', 'gluten', 'eggs', 'nuts'],
      type: 'food'
    }
  ]
};