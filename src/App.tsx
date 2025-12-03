import { useState, useEffect } from "react";
import { HomeScreen } from "./components/HomeScreen";
import { LocationList } from "./components/LocationList";
import { CafeMenu } from "./components/CafeMenu";
import { Cart } from "./components/Cart";
import { OrdersScreen } from "./components/OrdersScreen";
import { AccountScreen } from "./components/AccountScreen";
import { BottomNav } from "./components/BottomNav";
import { getMenuForCafe, MenuItem } from "./data/menuData";
import { PreferencesScreen } from "./components/PreferencesScreen";
import { CustomizeDrink } from "./components/CustomizeDrinkScreen";
import type { CustomizedItem } from "./components/CustomizeDrinkScreen";
import {
  ReceiptModal,
  OrderDetails,
  OrderStatus,
  OrderCard,
  PastOrderCard,
  Order,
  Cafe as CafeType,
  CartItem as CartItemType
} from './components/OrderComponents';

interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  selectedSize?: 'S' | 'M' | 'L';
  customizations?: CustomizedItem;
}

interface Cafe {
  id: string;
  name: string;
  address: string;
  distance: number;
  waitTime: number;
  image: string;
  isOpen: boolean;
}

type MainScreen = "home" | "orders" | "account";
type AppScreen = MainScreen | "locations" | "menu" | "cart" | "order-status" | "preferences" | "customize-drink";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>("home");
  const [navScreen, setNavScreen] = useState<MainScreen>("home");
  const [selectedCafe, setSelectedCafe] = useState<Cafe | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderNumber, setOrderNumber] = useState<string>("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderTimestamp, setOrderTimestamp] = useState<number>(Date.now());
  const [pickupTime, setPickupTime] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [selectedDrinkForCustomization, setSelectedDrinkForCustomization] = useState<MenuItem | null>(null);
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "1",
      orderNumber: "QL95PP",
      cafeName: "Starbucks (UMC)",
      cafeAddress: "First Floor, UMC",
      items: ["1x Espresso"],
      total: 3.78,
      status: "completed",
      pickupTime: "10:15 AM",
      date: "2025-11-03",
    },
  ]);
  const [userAllergens, setUserAllergens] = useState<string[]>([]);
  const [userPreferences, setUserPreferences] = useState({
    notificationsEnabled: true,
    orderReminders: true,
    promotionalEmails: false,
    defaultPickupTime: "asap",
    favoriteLocation: "none",
  });

  // Campus cafe data
  const cafes: Cafe[] = [
    {
      id: 'starbucks_umc',
      name: 'Starbucks (UMC)',
      address: 'First Floor, UMC',
      distance: 0.7,
      waitTime: 15,
      image: '/images/cafes/starbucksumc.png',
      isOpen: true
    },
    {
      id: 'weathertech',
      name: 'WeatherTech Cafe & Bakery',
      address: 'Center for Community (C4C)',
      distance: 0.1,
      waitTime: 5,
      image: '/images/cafes/weathertech.png',
      isOpen: true
    },
    {
      id: 'laughinggoat',
      name: 'The Laughing Goat',
      address: 'Norlin Commons',
      distance: 0.2,
      waitTime: 4,
      image: '/images/cafes/laughinggoat.png',
      isOpen: true
    },
    {
      id: 'fens',
      name: "Fen's Cafe",
      address: 'ATLAS Center',
      distance: 0.3,
      waitTime: 6,
      image: '/images/cafes/fenscafe.png',
      isOpen: true
    },
    {
      id: 'foolishcraig',
      name: 'Foolish Craig’s Too',
      address: 'GOLD Biosciences Building',
      distance: 0.6,
      waitTime: 12,
      image: '/images/cafes/foolishcraig.png',
      isOpen: true
    },
    {
      id: 'violetpeak',
      name: 'Koelbel Violet Peak Cafe',
      address: 'Koelbel Building',
      distance: 0.4,
      waitTime: 8,
      image: '/images/cafes/koelbelviolet.png',
      isOpen: true
    },
    {
      id: 'northvioletpeak',
      name: 'North Violet Peak Cafe',
      address: 'Engineering Center Main Lobby',
      distance: 0.4,
      waitTime: 8,
      image: '/images/cafes/northviolet.png',
      isOpen: true
    },
    {
      id: 'southvioletpeak',
      name: 'South Violet Peak Cafe',
      address: 'Engineering Center South Lobby',
      distance: 0.4,
      waitTime: 8,
      image: '/images/cafes/southviolet.png',
      isOpen: true
    }
  ];

  // Order status update effect
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders(prevOrders =>
        prevOrders.map(order => {
          if (order.status === "preparing") {
            const orderTime = new Date(parseInt(order.id.replace('order-', ''))).getTime();
            const now = Date.now();
            const minutesPassed = (now - orderTime) / 1000 / 60;

            const cafe = cafes.find(c => c.name === order.cafeName);
            const waitTime = cafe?.waitTime || 5;

            if (minutesPassed >= 0.1) {
              return { ...order, status: "ready" as const };
            }
          }
          return order;
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [cafes]);

  const handleSelectCafe = (cafeId: string) => {
    const cafe = cafes.find((c) => c.id === cafeId);
    if (cafe && cafe.isOpen) {
      setSelectedCafe(cafe);
      setCurrentScreen("menu");
    }
  };

  const handleAddToCart = (item: MenuItem, size?: 'S' | 'M' | 'L', customizations?: CustomizedItem) => {
      setCart((prevCart) => {
        if (customizations) {
          const existingItem = prevCart.find(
            (cartItem) =>
              cartItem.menuItem.id === item.id &&
              cartItem.selectedSize === size &&
              JSON.stringify(cartItem.customizations) === JSON.stringify(customizations)
          );

          if (existingItem) {
            return prevCart.map((cartItem) =>
              cartItem.menuItem.id === item.id &&
              cartItem.selectedSize === size &&
              JSON.stringify(cartItem.customizations) === JSON.stringify(customizations)
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            );
          } else {
            return [...prevCart, {
              menuItem: item,
              quantity: 1,
              selectedSize: size,
              customizations: customizations
            }];
          }
        } else {
          // For regular items (food or drinks without customization)
          const existingItem = prevCart.find(
            (cartItem) =>
              cartItem.menuItem.id === item.id &&
              cartItem.selectedSize === size &&
              !cartItem.customizations // No customizations
          );

          if (existingItem) {
            return prevCart.map((cartItem) =>
              cartItem.menuItem.id === item.id &&
              cartItem.selectedSize === size &&
              !cartItem.customizations
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            );
          } else {
            return [...prevCart, {
              menuItem: item,
              quantity: 1,
              selectedSize: size
            }];
          }
        }
      });
    };

  const handleRemoveFromCart = (itemId: string, size?: 'S' | 'M' | 'L', customizations?: CustomizedItem) => {
      setCart((prevCart) => {
        const existingItem = prevCart.find(
          (cartItem) =>
            cartItem.menuItem.id === itemId &&
            cartItem.selectedSize === size &&
            (customizations ? JSON.stringify(cartItem.customizations) === JSON.stringify(customizations) : true)
        );

        if (existingItem && existingItem.quantity > 1) {
          return prevCart.map((cartItem) =>
            cartItem.menuItem.id === itemId &&
            cartItem.selectedSize === size &&
            (customizations ? JSON.stringify(cartItem.customizations) === JSON.stringify(customizations) : true)
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem
          );
        } else {
          return prevCart.filter(
            (cartItem) =>
              !(cartItem.menuItem.id === itemId &&
                cartItem.selectedSize === size &&
                (customizations ? JSON.stringify(cartItem.customizations) === JSON.stringify(customizations) : true))
          );
        }
      });
    };

    const handleClearItem = (itemId: string, size?: 'S' | 'M' | 'L', customizations?: CustomizedItem) => {
      setCart((prevCart) =>
        prevCart.filter(
          (cartItem) =>
            !(cartItem.menuItem.id === itemId &&
              cartItem.selectedSize === size &&
              (customizations ? JSON.stringify(cartItem.customizations) === JSON.stringify(customizations) : true))
        )
      );
    };

   // NEW: Handle customizing a drink
    const handleCustomizeDrink = (item: MenuItem) => {
      setSelectedDrinkForCustomization(item);
      setCurrentScreen("customize-drink");
    };

    // NEW: Handle adding a customized drink to cart
    const handleAddCustomizedDrink = (baseItem: MenuItem, customizations: CustomizedItem) => {
      // Add the customized drink to cart
      handleAddToCart(baseItem, customizations.size as 'S' | 'M' | 'L' | undefined, customizations);

      // Go back to menu
      setSelectedDrinkForCustomization(null);
      setCurrentScreen("menu");
    };

  const handlePlaceOrder = (time: string) => {
      setPickupTime(time);
      const newOrderNumber = Math.random().toString(36).substring(2, 8).toUpperCase();
      setOrderNumber(newOrderNumber);
      const timestamp = Date.now();
      setOrderTimestamp(timestamp);

      if (selectedCafe) {
        const cartTotal = cart.reduce((sum, item) => {
          // Calculate price based on size or customizations
          let price = item.menuItem.price;

          if (item.selectedSize && item.menuItem.sizes) {
            price = item.menuItem.sizes[item.selectedSize];
          }

          // If it's a customized drink, use the custom price
          if (item.customizations) {
            price = item.customizations.totalPrice;
          }

          return sum + (price * item.quantity);
        }, 0);

        const orderTotal = cartTotal * 1.08;

        // Build item descriptions that include customizations
        const itemDescriptions = cart.map(item => {
          let description = `${item.quantity}x ${item.menuItem.name}`;

          if (item.selectedSize) {
            description += ` (${item.selectedSize})`;
          }

          // Add customization info if available
          if (item.customizations) {
            const { milk, syrups, specialInstructions } = item.customizations;

            if (milk && milk !== 'whole') {
              description += `, ${milk} milk`;
            }

            if (syrups.length > 0) {
              description += `, ${syrups.join(', ')} syrup`;
            }

            if (specialInstructions) {
              description += `, [${specialInstructions.substring(0, 20)}...]`;
            }
          }

          return description;
        });

        const newOrder: Order = {
          id: `order-${timestamp}`,
          orderNumber: newOrderNumber,
          cafeName: selectedCafe.name,
          cafeAddress: selectedCafe.address,
          items: itemDescriptions,
          total: orderTotal,
          status: "preparing",
          pickupTime: time,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        };
        setOrders(prevOrders => [newOrder, ...prevOrders]);
      }

      setCurrentScreen("order-status");
    };

  const handleConfirmPickup = (orderId: string, rating: number) => {
      console.log("App: handleConfirmPickup called for order:", orderId, "rating:", rating);

      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId
            ? {
                ...order,
                status: "completed",
                rating: rating
              }
            : order
        )
      );

      console.log("App: Order status updated to 'completed' with rating:", rating);
      alert(`Thank you for your ${rating}-star rating!`);
    };

    const handleBackToHome = () => {
      setCurrentScreen("home");
      setNavScreen("home");
      setSelectedCafe(null);
      setSelectedDrinkForCustomization(null);
      setCart([]);
      setOrderNumber("");
      setPickupTime("");
    };

  const handleFindCafe = () => {
    setCurrentScreen("locations");
  };

  const handleReorder = (orderId: string) => {
      const order = orders.find(o => o.id === orderId);
      if (!order) return;

      const cafe = cafes.find(c => c.name === order.cafeName);
      if (!cafe) return;

      setSelectedCafe(cafe);
      setCart([]); // Clear current cart first

      // Note: For now, we'll just add the items without customizations
      // In a real app, you'd need to parse the customizations from the item descriptions
      const cafeMenu = getMenuForCafe(cafe.id);

      order.items.forEach(itemString => {
        // Simple parsing - in a real app, you'd need more sophisticated parsing
        const match = itemString.match(/(\d+)x\s+([^(]+)(?:\s*\(([SML])\))?/);
        if (!match) return;

        const quantity = parseInt(match[1]);
        const itemName = match[2].trim().split(',')[0].trim(); // Get base name before customizations
        const size = match[3] as 'S' | 'M' | 'L' | undefined;

        const menuItem = cafeMenu.find(m => m.name === itemName);
        if (!menuItem) return;

        // Add to cart multiple times for quantity
        for (let i = 0; i < quantity; i++) {
          handleAddToCart(menuItem, size);
        }
      });

      setCurrentScreen("cart");
    };


  const handleNavigate = (screen: MainScreen) => {
    setNavScreen(screen);
    setCurrentScreen(screen);
  };

  const handleLogin = (email: string, password: string) => {
    setIsLoggedIn(true);
    setUserEmail(email);
    setUserName(email.split('@')[0].split('.').map(part =>
      part.charAt(0).toUpperCase() + part.slice(1)
    ).join(' '));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail("");
    setUserName("");
    setUserAllergens([]);
  };

  const handleUpdateAllergens = (allergens: string[]) => {
    setUserAllergens(allergens);
  };

  const handleViewOrder = (orderId: string) => {
    console.log("View order:", orderId);
    const order = orders.find(o => o.id === orderId);
    if (order) {
      setSelectedOrder(order);
    }
  };

  const handleOpenPreferences = () => {
    setCurrentScreen("preferences");
  };

  const cartTotal = cart.reduce((sum, item) => {
      // Calculate price based on size or customizations
      let price = item.menuItem.price;

      if (item.selectedSize && item.menuItem.sizes) {
        price = item.menuItem.sizes[item.selectedSize];
      }

      // If it's a customized drink, use the custom price
      if (item.customizations) {
        price = item.customizations.totalPrice;
      }

      return sum + (price * item.quantity);
    }, 0);

    const orderTotal = cartTotal * 1.08;
    const activeOrdersCount = orders.filter(o => o.status === "preparing" || o.status === "ready").length;

    const showBottomNav = ["home", "orders", "account"].includes(currentScreen);

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl relative">
        <div className={`p-6 h-screen overflow-auto ${showBottomNav ? 'pb-24' : ''}`}>
          {currentScreen === "home" && (
            <HomeScreen
              orders={orders}
              onReorder={handleReorder}
              onFindCafe={handleFindCafe}
              onViewOrder={handleViewOrder}
            />
          )}

          {currentScreen === "locations" && (
            <LocationList
              cafes={cafes}
              onSelectCafe={handleSelectCafe}
              onBack={() => setCurrentScreen("home")}
            />
          )}

          {currentScreen === "menu" && selectedCafe && (
            <CafeMenu
              cafe={selectedCafe}
              menuItems={getMenuForCafe(selectedCafe.id)}
              cart={cart}
              onAddToCart={handleAddToCart}
              onRemoveFromCart={handleRemoveFromCart}
              onBack={() => setCurrentScreen("locations")}
              onViewCart={() => setCurrentScreen("cart")}
              userAllergens={userAllergens}
               onCustomizeDrink={handleCustomizeDrink}
            />
          )}

          {currentScreen === "customize-drink" && selectedDrinkForCustomization && (
              <CustomizeDrink
                menuItem={selectedDrinkForCustomization}
                userAllergens={userAllergens}
                onAddToCart={handleAddCustomizedDrink}
                onBack={() => {
                  setSelectedDrinkForCustomization(null);
                  setCurrentScreen("menu");
                }}
              />
            )}

          {currentScreen === "cart" && selectedCafe && (
            <Cart
              cafe={selectedCafe}
              cart={cart}
              onAddToCart={handleAddToCart}
              onRemoveFromCart={handleRemoveFromCart}
              onClearItem={handleClearItem}
              onBack={() => setCurrentScreen("menu")}
              onPlaceOrder={handlePlaceOrder}
              userAllergens={userAllergens}
            />
          )}

          {currentScreen === "order-status" && selectedCafe && (
            <OrderStatus
              cafe={selectedCafe}
              items={cart}
              total={orderTotal}
              pickupTime={pickupTime}
              orderNumber={orderNumber}
              onBackToHome={handleBackToHome}
              orderTimestamp={orderTimestamp}
            />
          )}

          {currentScreen === "orders" && (
            <OrdersScreen
              orders={orders}
              onViewOrder={handleViewOrder}
              onConfirmPickup={handleConfirmPickup}
              onViewOrder={handleViewOrder}
            />
          )}

          {currentScreen === "account" && (
            <AccountScreen
              isLoggedIn={isLoggedIn}
              userEmail={userEmail}
              userName={userName}
              userAllergens={userAllergens}
              onLogin={handleLogin}
              onLogout={handleLogout}
              onUpdateAllergens={handleUpdateAllergens}
              onOpenPreferences={handleOpenPreferences}
            />
          )}

          {currentScreen === "preferences" && (
            <PreferencesScreen
              userAllergens={userAllergens}
              userPreferences={userPreferences}
              onUpdateAllergens={setUserAllergens}
              onUpdatePreferences={setUserPreferences}
              onBack={() => setCurrentScreen('account')}
            />
          )}

        </div>

        {showBottomNav && (
          <BottomNav
            currentScreen={navScreen}
            onNavigate={handleNavigate}
            orderCount={activeOrdersCount}
          />
        )}

        <ReceiptModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onReorder={handleReorder}
        />
      </div>
    </div>
  );
}