export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  allergens?: string[];
  type?: 'drink' | 'food';
  sizes?: {
    S: number;
    M: number;
    L: number;
  };
}

export const getMenuForCafe = (cafeId: string): MenuItem[] => {
  return menuData[cafeId] || [];
};

// helper function since the Violet Peak Cafe's share the same menu no matter the location
function getVioletPeakMenu(): MenuItem[] {
  const violetPeakMenu: MenuItem[] = [
        // COFFEE
        {
          id: 'vp_brewed_coffee_1',
          name: 'Brewed Coffee',
          description: 'Freshly brewed coffee',
          price: 3.23, // 16oz medium price
          image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          category: 'Coffee',
          type: 'drink',
          sizes: {
            S: 2.82,  // 12oz
            M: 3.23,  // 16oz
            L: 3.59   // 20oz
          }
        },
        {
          id: 'vp_coffee_refill_2',
          name: 'Coffee Refill',
          description: 'Refill of brewed coffee',
          price: 2.62, // 16oz medium price
          image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          category: 'Coffee',
          type: 'drink',
          sizes: {
            S: 2.21,  // 12oz
            M: 2.62,  // 16oz
            L: 2.99   // 20oz
          }
        },
        {
          id: 'vp_cold_brew_3',
          name: 'Cold Brew',
          description: 'Slow-steeped cold coffee',
          price: 5.00, // 16oz medium price
          image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          category: 'Coffee',
          type: 'drink',
          sizes: {
            S: 4.32,  // 12oz
            M: 5.00,  // 16oz
            L: 5.37   // 20oz
          }
        },
        {
          id: 'vp_nitro_cold_brew_4',
          name: 'Nitro Cold Brew',
          description: 'Cascading cold brew on tap',
          price: 2.39, // 16oz medium price
          image: 'https://images.unsplash.com/photo-1644764399224-f7d18b1e8d1c?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          category: 'Coffee',
          type: 'drink',
          sizes: {
            S: 2.71,  // 12oz
            M: 2.39,  // 16oz
            L: 2.66   // 20oz
          }
        },
        {
          id: 'vp_red_eye_5',
          name: 'Red Eye',
          description: 'Coffee with a shot of espresso',
          price: 3.61, // 16oz medium price
          image: 'https://images.unsplash.com/photo-1592781959616-a5b5df495c40?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          category: 'Coffee',
          type: 'drink',
          sizes: {
            S: 3.05,  // 12oz
            M: 3.61,  // 16oz
            L: 3.85   // 20oz
          }
        },
        {
          id: 'vp_au_lait_6',
          name: 'Au Lait',
          description: 'Coffee with steamed milk',
          price: 4.32, // 16oz medium price
          image: 'https://images.unsplash.com/photo-1666600638856-dc0fb01c01bc?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          category: 'Coffee',
          allergens: ['dairy'],
          type: 'drink',
          sizes: {
            S: 3.86,  // 12oz
            M: 4.32,  // 16oz
            L: 5.00   // 20oz
          }
        },
        {
          id: 'vp_florentine_7',
          name: 'Florentine',
          description: 'Specialty coffee drink',
          price: 5.37, // 16oz medium price
          image: 'https://images.unsplash.com/photo-1724011415456-8a0d4d9e4381?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          category: 'Coffee',
          type: 'drink',
          sizes: {
            S: 5.00,  // 12oz
            M: 5.37,  // 16oz
            L: 5.68   // 20oz
          }
        },

        // TEA
        {
          id: 'vp_hot_tea_8',
          name: 'Hot Tea',
          description: 'Selection of premium teas',
          price: 3.86, // 16oz medium price
          image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          category: 'Tea',
          type: 'drink',
          sizes: {
            S: 3.37,  // 12oz
            M: 3.86,  // 16oz
            L: 4.37   // 20oz
          }
        },
        {
          id: 'vp_iced_tea_9',
          name: 'Iced Tea',
          description: 'Chilled tea over ice',
          price: 5.00, // 16oz medium price
          image: 'https://images.unsplash.com/photo-1499638673689-79a0b5115d87?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          category: 'Tea',
          type: 'drink',
          sizes: {
            S: 4.77,  // 12oz
            M: 5.00,  // 16oz
            L: 5.18   // 20oz
          }
        },
        {
          id: 'vp_cambric_10',
          name: 'Cambric (Tea Latte)',
          description: 'Tea with steamed milk',
          price: 5.00, // 16oz medium price
          image: 'https://images.unsplash.com/photo-1646325825271-0769c399e3e8?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          category: 'Tea',
          allergens: ['dairy'],
          type: 'drink',
          sizes: {
            S: 4.82,  // 12oz
            M: 5.00,  // 16oz
            L: 5.37   // 20oz
          }
        },
        {
          id: 'vp_chai_11',
          name: 'Chai (Sweet or Spicy)',
          description: 'Spiced tea with steamed milk',
          price: 5.23, // 16oz medium price
          image: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          category: 'Tea',
          allergens: ['dairy'],
          type: 'drink',
          sizes: {
            S: 4.82,  // 12oz
            M: 5.23,  // 16oz
            L: 5.68   // 20oz
          }
        },
        {
          id: 'vp_matcha_12',
          name: 'Matcha',
          description: 'Green tea powder beverage',
          price: 5.46, // 16oz medium price
          image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          category: 'Tea',
          type: 'drink',
          sizes: {
            S: 5.00,  // 12oz
            M: 5.46,  // 16oz
            L: 5.83   // 20oz
          }
        },

        // ESPRESSO
        {
          id: 'vp_espresso_13',
          name: 'Espresso',
          description: 'A shot of premium espresso',
          price: 3.26, // Double shot price
          image: 'https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          category: 'Espresso',
          type: 'drink'
        },
        {
          id: 'vp_italian_macchiato_14',
          name: 'Italian Macchiato',
          description: 'Espresso with a small amount of milk foam',
          price: 3.58, // Double shot price
          image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          category: 'Espresso',
          allergens: ['dairy'],
          type: 'drink'
        },
        {
          id: 'vp_americano_15',
          name: 'Americano',
          description: 'Espresso with hot water',
          price: 3.86, // 16oz medium price
          image: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          category: 'Espresso',
          type: 'drink',
          sizes: {
            S: 3.26,  // 12oz
            M: 3.86,  // 16oz
            L: 4.32   // 20oz
          }
        },
        {
          id: 'vp_latte_16',
          name: 'Latte',
          description: 'Espresso with steamed milk',
          price: 3.81, // 16oz medium price
          image: 'https://images.unsplash.com/photo-1593443320739-77f74939d0da?q=80&w=1036&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          category: 'Espresso',
          allergens: ['dairy'],
          type: 'drink',
          sizes: {
            S: 3.62,  // 12oz
            M: 3.81,  // 16oz
            L: 4.31   // 20oz
          }
        },
        {
          id: 'vp_mocha_17',
          name: 'Mocha',
          description: 'Espresso with chocolate and steamed milk',
          price: 4.32, // 16oz medium price
          image: 'https://images.unsplash.com/photo-1621221814631-e8bfdabd5ca4?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          category: 'Espresso',
          allergens: ['dairy'],
          type: 'drink',
          sizes: {
            S: 3.86,  // 12oz
            M: 4.32,  // 16oz
            L: 4.77   // 20oz
          }
        },
        {
          id: 'vp_cappuccino_18',
          name: 'Cappuccino',
          description: 'Espresso with foamed milk',
          price: 3.63, // 16oz medium price
          image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          category: 'Espresso',
          allergens: ['dairy'],
          type: 'drink',
          sizes: {
            S: 3.05,  // 12oz
            M: 3.63,  // 16oz
            L: 4.05   // 20oz
          }
        },

        // NON-CAFFINATED
        {
          id: 'vp_apple_cider_19',
          name: 'Apple Cider',
          description: 'Warm spiced apple cider',
          price: 3.75, // Assuming medium price
          image: 'https://images.unsplash.com/photo-1605199910378-edb0c0709ab4?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          category: 'Non-Caffeinated',
          type: 'drink',
          sizes: {
            S: 3.25,
            M: 3.75,
            L: 4.25
          }
        },
        {
          id: 'vp_italian_soda_20',
          name: 'Italian Soda',
          description: 'Sparkling water with flavored syrup',
          price: 4.25, // Assuming medium price
          image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3',
          category: 'Non-Caffeinated',
          type: 'drink',
          sizes: {
            S: 3.75,
            M: 4.25,
            L: 4.75
          }
        },
        {
          id: 'vp_hot_chocolate_21',
          name: 'Hot Chocolate',
          description: 'Rich chocolate with steamed milk',
          price: 4.50, // Assuming medium price
          image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          category: 'Non-Caffeinated',
          allergens: ['dairy'],
          type: 'drink',
          sizes: {
            S: 4.00,
            M: 4.50,
            L: 5.00
          }
        },
        {
          id: 'vp_steamer_22',
          name: 'Steamer',
          description: 'Steamed milk with flavored syrup',
          price: 4.00, // Assuming medium price
          image: 'https://images.unsplash.com/photo-1593443320739-77f74939d0da?q=80&w=1036&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          category: 'Non-Caffeinated',
          allergens: ['dairy'],
          type: 'drink',
          sizes: {
            S: 3.50,
            M: 4.00,
            L: 4.50
          }
        },
        {
          id: 'vp_smoothie_23',
          name: 'Smoothie',
          description: 'Blended fruit smoothie',
          price: 5.95, // Assuming medium price
          image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          category: 'Non-Caffeinated',
          type: 'drink',
          sizes: {
            S: 5.45,
            M: 5.95,
            L: 6.45
          }
        },

        // Food Items (added for completeness)
        {
          id: 'vp_breakfast_sandwich_24',
          name: 'Breakfast Sandwich',
          description: 'Egg, cheese, and choice of bacon or sausage on English muffin',
          price: 6.95,
          image: 'https://images.unsplash.com/photo-1608847569619-b5602f65ffa0?q=80&w=986&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          category: 'Food',
          allergens: ['eggs', 'dairy', 'gluten'],
          type: 'food'
        },
        {
          id: 'vp_avocado_toast_25',
          name: 'Avocado Toast',
          description: 'Sourdough toast with avocado, cherry tomatoes, and microgreens',
          price: 8.50,
          image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          category: 'Food',
          allergens: ['gluten'],
          type: 'food'
        },
        {
          id: 'vp_yogurt_parfait_26',
          name: 'Yogurt Parfait',
          description: 'Greek yogurt with granola and mixed berries',
          price: 5.95,
          image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          category: 'Food',
          allergens: ['dairy', 'gluten'],
          type: 'food'
        },
        {
          id: 'vp_muffin_27',
          name: 'Blueberry Muffin',
          description: 'Fresh blueberry muffin',
          price: 3.50,
          image: 'https://images.unsplash.com/photo-1558303420-f814d8a590f5?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          category: 'Pastries',
          allergens: ['dairy', 'gluten', 'eggs'],
          type: 'food'
        },
        {
          id: 'vp_croissant_28',
          name: 'Butter Croissant',
          description: 'Freshly baked French croissant',
          price: 3.25,
          image: 'https://images.unsplash.com/photo-1599940778173-e276d4acb2bb?q=80&w=1710&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          category: 'Pastries',
          allergens: ['dairy', 'gluten'],
          type: 'food'
        }
  ];

  return violetPeakMenu;
}

export const menuData: Record<string, MenuItem[]> = {
  'starbucks_umc': [
    // Drinks
    {
      id: 'latte_1',
      name: 'Latte',
      description: 'Espresso with steamed milk',
      price: 4.50,
      image: 'https://images.unsplash.com/photo-1593443320739-77f74939d0da?q=80&w=1036&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
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
      image: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
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
      image: 'https://images.unsplash.com/photo-1621221814631-e8bfdabd5ca4?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
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
      image: 'https://images.unsplash.com/photo-1592663527359-cf6642f54cff?q=80&w=1019&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
      image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
      image: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
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
      image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Food',
      allergens: ['gluten'],
      type: 'food'
    },
    {
      id: 'croissant_10',
      name: 'Butter Croissant',
      description: 'Freshly baked French croissant',
      price: 3.50,
      image: 'https://images.unsplash.com/photo-1599940778173-e276d4acb2bb?q=80&w=1710&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'Pastries',
      allergens: ['dairy', 'gluten'],
      type: 'food'
    },
    {
      id: 'blueberry_muffin_11',
      name: 'Blueberry Muffin',
      description: 'Fresh blueberry muffin with streusel topping',
      price: 3.75,
      image: 'https://images.unsplash.com/photo-1558303420-f814d8a590f5?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'Pastries',
      allergens: ['dairy', 'gluten', 'eggs'],
      type: 'food'
    },
    {
      id: 'chocolate_chip_cookie_12',
      name: 'Chocolate Chip Cookie',
      description: 'Freshly baked cookie with chocolate chips',
      price: 2.50,
      image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Pastries',
      allergens: ['dairy', 'gluten', 'eggs'],
      type: 'food'
    },
    {
      id: 'fruit_yogurt_parfait_13',
      name: 'Fruit Yogurt Parfait',
      description: 'Greek yogurt with granola and mixed berries',
      price: 6.50,
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
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
      image: 'https://images.unsplash.com/photo-1593443320739-77f74939d0da?q=80&w=1036&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
      image: 'https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
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
      image: 'https://images.unsplash.com/photo-1569762404472-026308ba6b64?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'Bakery',
      allergens: ['gluten', 'eggs', 'nuts'],
      type: 'food'
    },
    {
      id: 'quiche_5',
      name: 'Spinach & Feta Quiche',
      description: 'Flaky crust with spinach, feta, and eggs',
      price: 7.50,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Food',
      allergens: ['dairy', 'gluten', 'eggs'],
      type: 'food'
    },
    {
      id: 'bagel_6',
      name: 'Everything Bagel',
      description: 'Fresh bagel with cream cheese',
      price: 3.75,
      image: 'https://images.unsplash.com/photo-1582587931228-ea9fc296ffb0?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'Bakery',
      allergens: ['gluten', 'dairy'],
      type: 'food'
    }
  ],

    'laughinggoat': [
      // Espresso Drinks
      {
        id: 'lg_americano_1',
        name: 'Americano',
        description: 'The Caffè Americano is a classic coffee drink prepared by diluting one or more shots of espresso with hot water, resulting in a robust, yet less concentrated flavor than a straight espresso shot.',
        price: 3.95,
        image: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Espresso',
        allergens: ['dairy'],
        type: 'drink',
        sizes: {
          S: 3.95,
          M: 3.95,
          L: 3.95
        }
      },
      {
        id: 'lg_caffe_latte_2',
        name: 'Caffe Latte',
        description: 'Espresso with steamed milk and light layer of foam',
        price: 5.00,
        image: 'https://images.unsplash.com/photo-1593443320739-77f74939d0da?q=80&w=1036&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category: 'Espresso',
        allergens: ['dairy'],
        type: 'drink',
        sizes: {
          S: 4.75,
          M: 5.00,
          L: 5.50
        }
      },
      {
        id: 'lg_cappuccino_3',
        name: 'Cappuccino',
        description: 'An espresso drink made with equal parts of espresso, steamed milk, and milk foam.',
        price: 5.40,
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Espresso',
        allergens: ['dairy'],
        type: 'drink',
        sizes: {
          S: 4.80,
          M: 5.40,
          L: 6.00
        }
      },
      {
        id: 'lg_mocha_4',
        name: 'Mocha',
        description: 'A chocolate-flavored latte, combining a shot of espresso, steamed milk, and chocolate syrup or cocoa powder, often topped with whipped cream or a dusting of cocoa.',
        price: 5.50,
        image: 'https://images.unsplash.com/photo-1621221814631-e8bfdabd5ca4?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D0',
        category: 'Espresso',
        type: 'drink',
        sizes: {
          S: 5.00,
          M: 5.50,
          L: 6.00
        }
      },
      {
        id: 'lg_cafe_breve_5',
        name: 'Cafe Breve',
        description: 'A Caffè Breve is made by combining a shot of espresso with steamed half-and-half (a mixture of whole milk and light cream), creating a rich, creamy beverage.',
        price: 5.75,
        image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Espresso',
        allergens: ['dairy'],
        type: 'drink',
        sizes: {
          S: 5.00,
          M: 5.75,
          L: 6.25
        }
      },

      // One Size Espresso Drinks
      {
        id: 'lg_espresso_6',
        name: 'Espresso',
        description: 'A pump of espresso',
        price: 3.95,
        image: 'https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category: 'One Size',
        type: 'drink'
      },
      {
        id: 'lg_macchiato_7',
        name: 'Macchiato',
        description: 'A shot of espresso with a small amount of steamed milk or milk foam',
        price: 4.25,
        image: 'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'One Size',
        allergens: ['dairy'],
        type: 'drink'
      },
      {
        id: 'lg_espresso_con_panna_8',
        name: 'Espresso Con Panna',
        description: 'A single or double shot of espresso topped with a dollop of whipped cream',
        price: 4.25,
        image: 'https://images.unsplash.com/photo-1528401635478-821b5f89ff94?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category: 'One Size',
        allergens: ['dairy'],
        type: 'drink'
      },
      {
        id: 'lg_cortado_9',
        name: 'Cortado',
        description: 'Made with a shot of espresso that is "cut" with an approximately equal amount of lightly steamed milk to reduce the acidity and create a balanced, smooth flavor.',
        price: 4.75,
        image: 'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'One Size',
        allergens: ['dairy'],
        type: 'drink'
      },

      // Coffee Drinks
      {
        id: 'lg_house_coffee_10',
        name: 'House Coffee',
        description: 'A standard, freshly brewed coffee made by running hot water through ground coffee beans, typically served black or with customer-added milk and sugar.',
        price: 3.50,
        image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Coffee',
        allergens: ['dairy'],
        type: 'drink',
        sizes: {
          S: 3.20,
          M: 3.50,
          L: 3.80
        }
      },
      {
        id: 'lg_cafe_au_lait_11',
        name: 'Cafe Au Lait',
        description: 'Traditionally French, made by combining equal parts of strong brewed coffee (not espresso) and steamed milk.',
        price: 4.20,
        image: 'https://images.unsplash.com/photo-1666600638856-dc0fb01c01bc?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category: 'Coffee',
        allergens: ['dairy'],
        type: 'drink',
        sizes: {
          S: 3.20,
          M: 4.20,
          L: 4.75
        }
      },
      {
        id: 'lg_cafe_florentine_12',
        name: 'Cafe Florentine',
        description: 'Signature blend of rich espresso, steamed milk, and a decadent hint of pistachio and white chocolate, crowned with fresh whipped cream.',
        price: 4.40,
        image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Coffee',
        allergens: ['dairy'],
        type: 'drink',
        sizes: {
          S: 4.00,
          M: 4.40,
          L: 5.00
        }
      },
      {
        id: 'lg_iced_toddy_coffee_13',
        name: 'Iced Toddy Coffee',
        description: 'Made using the cold brew method, where coffee grounds are steeped in cold water for an extended period (12-24 hours) to create a smooth, highly concentrated coffee extract that is then diluted and served over ice',
        price: 4.00,
        image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Coffee',
        type: 'drink',
        sizes: {
          M: 4.00,
          L: 5.25
        }
      },
      {
        id: 'lg_venetian_cream_14',
        name: 'Venetian Cream',
        description: 'Espresso and steamed milk flavored with a luxurious blend of white chocolate, caramel, and almond, topped with whipped cream.',
        price: 4.75,
        image: 'https://images.unsplash.com/photo-1724011415456-8a0d4d9e4381?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category: 'Coffee',
        allergens: ['dairy'],
        type: 'drink',
        sizes: {
          M: 4.75,
          L: 5.50
        }
      },

      // Teas Et Cetera
      {
        id: 'lg_hot_chocolate_15',
        name: 'Hot Chocolate',
        description: 'Milk or water with cocoa powder',
        price: 3.50,
        image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Teas Et Cetera',
        allergens: ['dairy'],
        type: 'drink',
        sizes: {
          S: 3.25,
          M: 3.50,
          L: 4.00
        }
      },
      {
        id: 'lg_sherpa_chai_16',
        name: 'Sherpa Chai',
        description: 'A warm beverage made by steeping black tea with a blend of aromatic Indian spices (like cardamom, ginger, cinnamon, and cloves), combining it with steamed milk, and typically sweetened.',
        price: 4.75,
        image: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Teas Et Cetera',
        allergens: ['dairy'],
        type: 'drink',
        sizes: {
          S: 4.00,
          M: 4.75,
          L: 5.50
        }
      },
      {
        id: 'lg_apple_cider_17',
        name: 'Apple Cider',
        description: 'Spicy Apple Juice',
        price: 3.50,
        image: 'https://images.unsplash.com/photo-1605199910378-edb0c0709ab4?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category: 'Teas Et Cetera',
        type: 'drink',
        sizes: {
          S: 3.25,
          M: 3.50,
          L: 4.00
        }
      },
      {
        id: 'lg_mate_latte_18',
        name: 'Mate Latte',
        description: 'Caffeinated beverage that combines a serving of Yerba Mate (a South American herbal tea with an earthy flavor) with steamed milk and a sweetener, similar in preparation to a traditional tea latte.',
        price: 5.00,
        image: 'https://images.unsplash.com/photo-1593443320739-77f74939d0da?q=80&w=1036&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category: 'Teas Et Cetera',
        type: 'drink',
        sizes: {
          S: 4.25,
          M: 5.00,
          L: 5.25
        }
      },
      {
        id: 'lg_tea_latte_19',
        name: 'Tea Latte',
        description: 'Beverage made by combining a strong serving of brewed tea (often black or green tea), steamed milk, and typically a sweetener or flavored syrup.',
        price: 4.75,
        image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Teas Et Cetera',
        type: 'drink',
        sizes: {
          S: 4.00,
          M: 4.75,
          L: 5.00
        }
      },

      // Food (keeping the original food items)
      {
        id: 'lg_veggie_wrap_20',
        name: 'Veggie Wrap',
        description: 'Grilled vegetables with hummus in a wrap',
        price: 8.00,
        image: 'https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Food',
        allergens: ['gluten'],
        type: 'food'
      },
      {
        id: 'lg_energy_balls_21',
        name: 'Energy Balls',
        description: 'Dates, oats, and peanut butter protein balls',
        price: 3.00,
        image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Snacks',
        allergens: ['nuts'],
        type: 'food'
      }
    ],

'fens': [
    // DIM SUM
    {
      id: 'stuffed_sticky_rice_roll_1',
      name: 'Stuffed Sticky Rice Roll',
      description: 'Filling contains pork floss and Chinese cruiler',
      price: 6.98,
      image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3',
      category: 'Dim Sum',
      allergens: ['gluten', 'pork'],
      type: 'food'
    },
    {
      id: 'vegetable_dumpling_2',
      name: 'Vegetable Dumpling',
      description: '6 pieces, choose steamed or pan fried',
      price: 7.98,
      image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3',
      category: 'Dim Sum',
      allergens: ['gluten'],
      type: 'food'
    },
    {
      id: 'pork_chives_dumpling_3',
      name: 'Pork & Chives Dumpling',
      description: '6 pieces, choose steamed or pan fried',
      price: 7.98,
      image: 'https://images.unsplash.com/photo-1603894368800-6d43c8c34677?q=80&w=2024&auto=format&fit=crop&ixlib=rb-4.0.3',
      category: 'Dim Sum',
      allergens: ['gluten', 'pork'],
      type: 'food'
    },
    {
      id: 'congee_pork_egg_4',
      name: 'Congee w/ Pork & Preserved Egg',
      description: 'Traditional rice porridge with pork and preserved egg',
      price: 8.98,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
      category: 'Dim Sum',
      allergens: ['pork', 'egg'],
      type: 'food'
    },
    {
      id: 'vegetarian_congee_5',
      name: 'Vegetarian Congee',
      description: 'Contains taro, mushroom, & tofu skin',
      price: 8.98,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3',
      category: 'Dim Sum',
      type: 'food'
    },

    // FOOD & SNACKS
    {
      id: 'egg_potato_burrito_6',
      name: 'Egg & Potato Burrito',
      description: 'Breakfast burrito with egg and potato',
      price: 5.98,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop&ixlib=rb-4.0.3',
      category: 'Food & Snacks',
      allergens: ['egg', 'gluten'],
      type: 'food'
    },
    {
      id: 'beef_bean_burrito_7',
      name: 'Beef & Bean Burrito',
      description: 'Burrito with beef and beans',
      price: 5.98,
      image: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3',
      category: 'Food & Snacks',
      allergens: ['beef', 'gluten'],
      type: 'food'
    },
    {
      id: 'scallion_pancake_wrap_8',
      name: 'Scallion Pancake Wrap',
      description: 'Choose: Chinese BBQ Pork or Egg',
      price: 7.98,
      image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3',
      category: 'Food & Snacks',
      allergens: ['gluten', 'pork', 'egg'],
      type: 'food'
    },
    {
      id: 'chinese_golden_hamburger_9',
      name: 'Chinese Golden Hamburger',
      description: 'Steamed bun lightly fried with choice of braised tofu, Chinese BBQ pork, or braised pork belly',
      price: 9.98,
      image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3',
      category: 'Food & Snacks',
      allergens: ['gluten', 'pork', 'soy'],
      type: 'food'
    },
    {
      id: 'chinese_golden_hamburger_eel_10',
      name: 'Chinese Golden Hamburger w/ Roasted Eel',
      description: 'Steamed bun lightly fried with roasted eel',
      price: 12.98,
      image: 'https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3',
      category: 'Food & Snacks',
      allergens: ['gluten', 'fish'],
      type: 'food'
    },

    // BENTO BOX
    {
      id: 'fried_pork_chop_bento_11',
      name: 'Fried Pork Chop Bento',
      description: 'Includes white rice, braised egg, pickled cucumber, pickled mustard greens',
      price: 12.98,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
      category: 'Bento Box',
      allergens: ['pork', 'egg', 'gluten'],
      type: 'food'
    },
    {
      id: 'bbq_pork_bento_12',
      name: 'Chinese BBQ Pork Bento',
      description: 'Includes white rice, braised egg, pickled cucumber, pickled mustard greens',
      price: 12.98,
      image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3',
      category: 'Bento Box',
      allergens: ['pork', 'egg'],
      type: 'food'
    },
    {
      id: 'chopped_pork_bento_13',
      name: 'Chopped Pork Bento',
      description: 'Includes white rice, braised egg, pickled cucumber, pickled mustard greens',
      price: 12.98,
      image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3',
      category: 'Bento Box',
      allergens: ['pork', 'egg'],
      type: 'food'
    },
    {
      id: 'basil_chicken_bento_14',
      name: 'Basil Chicken Bento',
      description: 'Includes white rice, braised egg, pickled cucumber, pickled mustard greens',
      price: 12.98,
      image: 'https://images.unsplash.com/photo-1562967916-eb82221dfb92?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3',
      category: 'Bento Box',
      allergens: ['chicken', 'egg'],
      type: 'food'
    },
    {
      id: 'chicken_curry_bento_15',
      name: 'Chicken Curry Bento',
      description: 'Includes white rice, braised egg, pickled cucumber, pickled mustard greens',
      price: 12.98,
      image: 'https://images.unsplash.com/photo-1585937421612-70ca003675ed?q=80&w=1910&auto=format&fit=crop&ixlib=rb-4.0.3',
      category: 'Bento Box',
      allergens: ['chicken', 'egg'],
      type: 'food'
    },
    {
      id: 'braised_pork_belly_bento_16',
      name: 'Braised Pork Belly Bento',
      description: 'Includes white rice, braised egg, pickled cucumber, pickled mustard greens',
      price: 13.98,
      image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3',
      category: 'Bento Box',
      allergens: ['pork', 'egg'],
      type: 'food'
    },
    {
      id: 'roasted_eel_bento_17',
      name: 'Roasted Eel Bento',
      description: 'Includes white rice, braised egg, pickled cucumber, pickled mustard greens',
      price: 15.98,
      image: 'https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3',
      category: 'Bento Box',
      allergens: ['fish', 'egg'],
      type: 'food'
    },

    // BAKERY
    {
      id: 'scallion_pork_floss_roll_18',
      name: 'Scallion and Pork Floss Bread Roll',
      description: 'Soft bread roll with scallions and pork floss',
      price: 3.98,
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3',
      category: 'Bakery',
      allergens: ['gluten', 'pork'],
      type: 'food'
    },
    {
      id: 'pineapple_bun_19',
      name: 'Pineapple Bun w/ Milk Butter Filling',
      description: 'Sweet bun with milk butter filling',
      price: 3.98,
      image: 'https://images.unsplash.com/photo-1555507036-ab794f27d2e9?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3',
      category: 'Bakery',
      allergens: ['gluten', 'dairy'],
      type: 'food'
    },
    {
      id: 'taro_bun_20',
      name: 'Baked Bun w/ Taro Cream Filling',
      description: 'Baked bun filled with taro cream',
      price: 3.98,
      image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=2068&auto=format&fit=crop&ixlib=rb-4.0.3',
      category: 'Bakery',
      allergens: ['gluten', 'dairy'],
      type: 'food'
    },
    {
      id: 'custard_bun_21',
      name: 'Baked Bun w/ Custard Filling',
      description: 'Baked bun filled with custard',
      price: 3.98,
      image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=2068&auto=format&fit=crop&ixlib=rb-4.0.3',
      category: 'Bakery',
      allergens: ['gluten', 'dairy', 'egg'],
      type: 'food'
    },
    {
      id: 'sesame_ball_22',
      name: 'Fried Sesame Ball w/ Red Bean Filling',
      description: '6 pieces of fried sesame balls with red bean filling',
      price: 3.98,
      image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=1980&auto=format&fit=crop&ixlib=rb-4.0.3',
      category: 'Bakery',
      allergens: ['gluten'],
      type: 'food'
    },
    {
      id: 'egg_custard_tart_23',
      name: 'Egg Custard Tart',
      description: '2 pieces of traditional egg custard tarts',
      price: 4.98,
      image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=2068&auto=format&fit=crop&ixlib=rb-4.0.3',
      category: 'Bakery',
      allergens: ['gluten', 'dairy', 'egg'],
      type: 'food'
    },
    {
      id: 'red_bean_egg_yolk_pastry_24',
      name: 'Red Bean & Egg Yolk Pastry',
      description: '2 pieces of pastry with red bean and egg yolk filling',
      price: 5.98,
      image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=1980&auto=format&fit=crop&ixlib=rb-4.0.3',
      category: 'Bakery',
      allergens: ['gluten', 'egg'],
      type: 'food'
    },
    {
      id: 'croissant_filled_25',
      name: 'Croissant w/ Homemade Filling',
      description: 'Choose: Strawberry, Mango, or Taro',
      price: 5.98,
      image: 'https://images.unsplash.com/photo-1599744330961-4f5e6d6f57c2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3',
      category: 'Bakery',
      allergens: ['gluten', 'dairy'],
      type: 'food'
    },
    {
      id: 'pineapple_cake_bites_26',
      name: 'Pineapple Cake Bites',
      description: 'Small bite-sized pineapple cakes',
      price: 6.98,
      image: 'https://images.unsplash.com/photo-1559622214-f8a9850965bb?q=80&w=2065&auto=format&fit=crop&ixlib=rb-4.0.3',
      category: 'Bakery',
      allergens: ['gluten', 'dairy'],
      type: 'food'
    },
    {
      id: 'matcha_chiffon_cake_27',
      name: 'Matcha Chiffon Cake',
      description: 'Light and fluffy matcha-flavored chiffon cake',
      price: 7.98,
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1989&auto=format&fit=crop&ixlib=rb-4.0.3',
      category: 'Bakery',
      allergens: ['gluten', 'egg'],
      type: 'food'
    },
    {
      id: 'chocolate_chiffon_cake_28',
      name: 'Chocolate Chiffon Cake',
      description: 'Light and fluffy chocolate-flavored chiffon cake',
      price: 7.98,
      image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3',
      category: 'Bakery',
      allergens: ['gluten', 'egg', 'dairy'],
      type: 'food'
    }
  ],

  'foolishcraig': [
      // Coffee
      {
        id: 'fc_boulder_coffee_1',
        name: 'Boulder Organic Fair Trade Coffee',
        description: 'Premium organic fair trade coffee',
        price: 4.25,
        image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Coffee',
        type: 'drink',
        sizes: {
          S: 3.75,
          M: 4.25,
          L: 4.75
        }
      },
      {
        id: 'fc_stok_cold_brew_2',
        name: 'Stok Cold Brew',
        description: 'Black or vanilla',
        price: 5.75,
        image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Coffee',
        type: 'drink',
        sizes: {
          M: 5.75,
          L: 6.25
        }
      },
      {
        id: 'fc_latte_3',
        name: 'Latte',
        description: 'Espresso with steamed milk',
        price: 5.60,
        image: 'https://images.unsplash.com/photo-1593443320739-77f74939d0da?q=80&w=1036&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category: 'Coffee',
        allergens: ['dairy'],
        type: 'drink',
        sizes: {
          S: 5.00,
          M: 5.60,
          L: 6.10
        }
      },
      {
        id: 'fc_mocha_latte_4',
        name: 'Mocha Latte with Whipped Cream',
        description: 'Chocolate espresso with steamed milk and whipped cream',
        price: 6.25,
        image: 'https://images.unsplash.com/photo-1621221814631-e8bfdabd5ca4?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category: 'Coffee',
        allergens: ['dairy'],
        type: 'drink',
        sizes: {
          S: 5.75,
          M: 6.25,
          L: 6.75
        }
      },
      {
        id: 'fc_salted_caramel_latte_5',
        name: 'Salted Caramel Latte',
        description: 'Latte with salted caramel syrup',
        price: 6.25,
        image: 'https://images.unsplash.com/photo-1579888071069-c107a6f79d82?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category: 'Coffee',
        allergens: ['dairy'],
        type: 'drink',
        sizes: {
          S: 5.75,
          M: 6.25,
          L: 6.75
        }
      },
      {
        id: 'fc_lavender_oat_latte_6',
        name: 'Lauren\'s Lavender Oat Milk Latte',
        description: 'Lavender-infused latte with oat milk',
        price: 6.25,
        image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Coffee',
        type: 'drink',
        sizes: {
          S: 5.75,
          M: 6.25,
          L: 6.75
        }
      },
      {
        id: 'fc_caramel_brown_sugar_latte_7',
        name: 'Bella\'s Caramel Brown Sugar Latte',
        description: 'Latte with caramel and brown sugar syrup',
        price: 5.95,
        image: 'https://images.unsplash.com/photo-1632277671195-f255ec604563?q=80&w=986&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category: 'Coffee',
        allergens: ['dairy'],
        type: 'drink',
        sizes: {
          S: 5.45,
          M: 5.95,
          L: 6.45
        }
      },
      {
        id: 'fc_matcha_latte_8',
        name: 'Matcha Latte',
        description: 'Green tea powder with steamed milk',
        price: 6.25,
        image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category: 'Tea',
        allergens: ['dairy'],
        type: 'drink',
        sizes: {
          S: 5.75,
          M: 6.25,
          L: 6.75
        }
      },
      {
        id: 'fc_hot_chocolate_9',
        name: 'Hot Chocolate with Whipped Cream',
        description: 'Rich chocolate with whipped cream topping',
        price: 5.25,
        image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Hot Drinks',
        allergens: ['dairy'],
        type: 'drink',
        sizes: {
          S: 4.75,
          M: 5.25,
          L: 5.75
        }
      },
      {
        id: 'fc_pot_of_tea_10',
        name: 'Pot of Tea',
        description: 'Loose leaf tea from the tea spot',
        price: 3.95,
        image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Tea',
        type: 'drink',
        sizes: {
          S: 3.45,
          M: 3.95,
          L: 4.45
        }
      },
      {
        id: 'fc_sherpa_chai_11',
        name: 'Sherpa Chai',
        description: 'Spicy or traditional',
        price: 5.25,
        image: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Tea',
        type: 'drink',
        sizes: {
          S: 4.75,
          M: 5.25,
          L: 5.75
        }
      },
      {
        id: 'fc_dirty_chai_12',
        name: 'Dirty Chai',
        description: 'Chai tea with a shot of espresso',
        price: 6.50,
        image: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Coffee',
        type: 'drink',
        sizes: {
          S: 6.00,
          M: 6.50,
          L: 7.00
        }
      },
      {
        id: 'fc_americano_13',
        name: 'Americano',
        description: 'Espresso with hot water',
        price: 4.25,
        image: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Coffee',
        type: 'drink',
        sizes: {
          S: 3.75,
          M: 4.25,
          L: 4.75
        }
      },
      {
        id: 'fc_cappuccino_14',
        name: 'Cappuccino',
        description: 'Espresso with foamed milk',
        price: 5.25,
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Coffee',
        allergens: ['dairy'],
        type: 'drink',
        sizes: {
          S: 4.75,
          M: 5.25,
          L: 5.75
        }
      },
      {
        id: 'fc_double_espresso_15',
        name: 'Double Espresso',
        description: 'Two shots of premium espresso',
        price: 4.25,
        image: 'https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category: 'Coffee',
        type: 'drink'
      },

      // Food Items (random additions)
      {
        id: 'fc_avocado_toast_16',
        name: 'Avocado Toast',
        description: 'Sourdough toast with mashed avocado, cherry tomatoes, and microgreens',
        price: 9.50,
        image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Breakfast',
        allergens: ['gluten'],
        type: 'food'
      },
      {
        id: 'fc_breakfast_burrito_17',
        name: 'Breakfast Burrito',
        description: 'Eggs, potatoes, cheese, and choice of bacon or sausage',
        price: 8.95,
        image: 'https://images.unsplash.com/photo-1662478839359-751ffc3cbbd8?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category: 'Breakfast',
        allergens: ['eggs', 'dairy', 'gluten'],
        type: 'food'
      },
      {
        id: 'fc_quiche_lorraine_18',
        name: 'Quiche Lorraine',
        description: 'Flaky crust with bacon, Swiss cheese, and eggs',
        price: 7.50,
        image: 'https://images.unsplash.com/photo-1591985666643-1ecc67616216?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category: 'Breakfast',
        allergens: ['dairy', 'gluten', 'eggs'],
        type: 'food'
      },
      {
        id: 'fc_butter_croissant_19',
        name: 'Butter Croissant',
        description: 'Freshly baked French croissant',
        price: 3.75,
        image: 'https://images.unsplash.com/photo-1599940778173-e276d4acb2bb?q=80&w=1710&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category: 'Pastries',
        allergens: ['dairy', 'gluten'],
        type: 'food'
      },
      {
        id: 'fc_blueberry_muffin_20',
        name: 'Blueberry Muffin',
        description: 'Fresh blueberry muffin with streusel topping',
        price: 3.95,
        image: 'https://images.unsplash.com/photo-1558303420-f814d8a590f5?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category: 'Pastries',
        allergens: ['dairy', 'gluten', 'eggs'],
        type: 'food'
      },
      {
        id: 'fc_chocolate_chip_cookie_21',
        name: 'Chocolate Chip Cookie',
        description: 'Freshly baked cookie with chocolate chips',
        price: 2.75,
        image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Pastries',
        allergens: ['dairy', 'gluten', 'eggs'],
        type: 'food'
      },
      {
        id: 'fc_grilled_cheese_22',
        name: 'Grilled Cheese Sandwich',
        description: 'Three-cheese blend on sourdough bread',
        price: 7.95,
        image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3',
        category: 'Lunch',
        allergens: ['dairy', 'gluten'],
        type: 'food'
      },
      {
        id: 'fc_turkey_club_23',
        name: 'Turkey Club Sandwich',
        description: 'Roasted turkey, bacon, lettuce, tomato on toasted bread',
        price: 10.50,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1999&auto=format&fit=crop&ixlib=rb-4.0.3',
        category: 'Lunch',
        allergens: ['gluten'],
        type: 'food'
      },
      {
        id: 'fc_caesar_salad_24',
        name: 'Caesar Salad',
        description: 'Romaine lettuce, Parmesan cheese, croutons with Caesar dressing',
        price: 9.25,
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Salads',
        allergens: ['dairy', 'gluten'],
        type: 'food'
      },
      {
        id: 'fc_soup_of_the_day_25',
        name: 'Soup of the Day',
        description: 'Ask about today\'s freshly made soup',
        price: 5.95,
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3',
        category: 'Lunch',
        type: 'food'
      }
    ],

  'northvioletpeak': [
    ...getVioletPeakMenu(),
  ],

  'southvioletpeak': [
    ...getVioletPeakMenu(),
  ],

  'violetpeak': [
    ...getVioletPeakMenu(),
  ]
};