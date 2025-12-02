import { useState, useEffect } from "react";
import { HomeScreen } from "./components/HomeScreen";
import { LocationList } from "./components/LocationList";
import { CafeMenu } from "./components/CafeMenu";
import { Cart } from "./components/Cart";
import { OrderStatus } from "./components/OrderStatus";
import { OrdersScreen } from "./components/OrdersScreen";
import { AccountScreen } from "./components/AccountScreen";
import { BottomNav } from "./components/BottomNav";
import { getMenuForCafe, MenuItem } from "./data/menuData";
import { PreferencesScreen } from "./components/PreferencesScreen";

interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  selectedSize?: 'S' | 'M' | 'L';
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

interface Order {
  id: string;
  orderNumber: string;
  cafeName: string;
  cafeAddress: string;
  items: string[];
  total: number;
  status: "preparing" | "ready" | "completed";
  pickupTime: string;
  date: string;
  rating?: number;
}

type MainScreen = "home" | "orders" | "account";
type AppScreen = MainScreen | "locations" | "menu" | "cart" | "order-status" | "preferences";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>("home");
  const [navScreen, setNavScreen] = useState<MainScreen>("home");
  const [selectedCafe, setSelectedCafe] = useState<Cafe | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderNumber, setOrderNumber] = useState<string>("");
  const [orderTimestamp, setOrderTimestamp] = useState<number>(Date.now());
  const [pickupTime, setPickupTime] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "1",
      orderNumber: "QL95PP",
      cafeName: "Starbucks (UMC)",
      cafeAddress: "First Floor, UMC",
      items: ["1x Espresso"],
      total: 3.78,
      status: "ready",
      pickupTime: "ASAP (~15 min)",
      date: "2025-11-05",
    },
    {
      id: "2",
      orderNumber: "JK88WW",
      cafeName: "Ink Coffee",
      cafeAddress: "Basement Level, UMC",
      items: ["Latte", "Bagel"],
      total: 7.45,
      status: "completed",
      pickupTime: "10:15 AM",
      date: "2025-11-03",
    },
  ]);
  const [userAllergens, setUserAllergens] = useState<string[]>([]);

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

  const handleAddToCart = (item: MenuItem, size?: 'S' | 'M' | 'L') => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) =>
          cartItem.menuItem.id === item.id &&
          cartItem.selectedSize === size
      );

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.menuItem.id === item.id && cartItem.selectedSize === size
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { menuItem: item, quantity: 1, selectedSize: size }];
      }
    });
  };

  const handleRemoveFromCart = (itemId: string, size?: 'S' | 'M' | 'L') => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) =>
          cartItem.menuItem.id === itemId &&
          cartItem.selectedSize === size
      );

      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((cartItem) =>
          cartItem.menuItem.id === itemId && cartItem.selectedSize === size
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      } else {
        return prevCart.filter(
          (cartItem) =>
            !(cartItem.menuItem.id === itemId && cartItem.selectedSize === size)
        );
      }
    });
  };

  const handleClearItem = (itemId: string, size?: 'S' | 'M' | 'L') => {
    setCart((prevCart) =>
      prevCart.filter(
        (cartItem) =>
          !(cartItem.menuItem.id === itemId && cartItem.selectedSize === size)
      )
    );
  };

  const handlePlaceOrder = (time: string) => {
    setPickupTime(time);
    const newOrderNumber = Math.random().toString(36).substring(2, 8).toUpperCase();
    setOrderNumber(newOrderNumber);
    const timestamp = Date.now();
    setOrderTimestamp(timestamp);

    if (selectedCafe) {
      const cartTotal = cart.reduce((sum, item) => {
        const price = item.selectedSize && item.menuItem.sizes
          ? item.menuItem.sizes[item.selectedSize]
          : item.menuItem.price;
        return sum + (price * item.quantity);
      }, 0);

      const orderTotal = cartTotal * 1.08;

      const newOrder: Order = {
        id: `order-${timestamp}`,
        orderNumber: newOrderNumber,
        cafeName: selectedCafe.name,
        cafeAddress: selectedCafe.address,
        items: cart.map(item => {
          const sizeStr = item.selectedSize ? ` (${item.selectedSize})` : '';
          return `${item.quantity}x ${item.menuItem.name}${sizeStr}`;
        }),
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

    const cafeMenu = getMenuForCafe(cafe.id);

    const newCart = order.items.map(itemString => {
      // Parse "2x Latte (M)" or "1x Cookie"
      const match = itemString.match(/(\d+)x\s+([^(]+)(?:\s*\(([SML])\))?/);
      if (!match) return null;

      const quantity = parseInt(match[1]);
      const itemName = match[2].trim();
      const size = match[3] as 'S' | 'M' | 'L' | undefined;

      const menuItem = cafeMenu.find(m => m.name === itemName);
      if (!menuItem) return null;

      return { menuItem, quantity, selectedSize: size };
    }).filter((item): item is CartItem => item !== null);

    setCart(newCart);
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
  };

  const handleOpenPreferences = () => {
    setCurrentScreen("preferences");
  };

  const cartTotal = cart.reduce((sum, item) => {
    const price = item.selectedSize && item.menuItem.sizes
      ? item.menuItem.sizes[item.selectedSize]
      : item.menuItem.price;
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
              orders={orders}  // Now using the real orders state
              onViewOrder={handleViewOrder}
              onConfirmPickup={handleConfirmPickup}
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
              onUpdateAllergens={handleUpdateAllergens}
              onBack={() => setCurrentScreen("account")}
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
      </div>
    </div>
  );
}