import { useState, useEffect } from "react";
import { HomeScreen } from "./components/HomeScreen";
import { LocationList } from "./components/LocationList";
import { CafeMenu } from "./components/CafeMenu";
import { Cart } from "./components/Cart";
import { OrderStatus } from "./components/OrderStatus";
import { OrdersScreen } from "./components/OrdersScreen";
import { AccountScreen } from "./components/AccountScreen";
import { BottomNav } from "./components/BottomNav";


interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface CartItem {
  menuItem: MenuItem;
  quantity: number;
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

interface RecentOrder {
  id: string;
  cafeName: string;
  items: string[];
  total: number;
  date: string;
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
}

type MainScreen = "home" | "orders" | "account";
type AppScreen = MainScreen | "locations" | "menu" | "cart" | "order-status";

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
  const [orders, setOrders] = useState<Order[]>([]);

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
      distance: 0.1,   // example placeholder
      waitTime: 5,     // example placeholder
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
      name: "Fen’s Cafe",
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
      image: '/images/koelbelviolet.png',
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
      image: '/images/southviolet.png',
      isOpen: true
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setOrders(prevOrders =>
        prevOrders.map(order => {
          if (order.status === "preparing") {
            const orderTime = new Date(parseInt(order.id.replace('order-', ''))).getTime();
            const now = Date.now();
            const minutesPassed = (now - orderTime) / 1000 / 60;

            // Find the cafe's wait time
            const cafe = cafes.find(c => c.name === order.cafeName);
            const waitTime = cafe?.waitTime || 5; // Default 5 minutes

            // Change this back to use actual wait time
            if (minutesPassed >= 0.1) {
              return { ...order, status: "ready" as const };
            }
          }
          return order;
        })
      );
    }, 5000); // Check every 5 seconds (faster than 10 seconds)

    return () => clearInterval(interval);
  }, [cafes]);

  const menuItems: MenuItem[] = [
    {
      id: "m1",
      name: "Espresso",
      description: "Rich and bold single shot espresso",
      price: 3.50,
      image: "https://images.unsplash.com/photo-1606310553997-7a01e22900ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3ByZXNzbyUyMGNvZmZlZSUyMGN1cHxlbnwxfHx8fDE3NjIyMjgwOTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Coffee",
    },
    {
      id: "m2",
      name: "Latte",
      description: "Smooth espresso with steamed milk and delicate foam",
      price: 4.75,
      image: "https://images.unsplash.com/photo-1529892485617-25f63cd7b1e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXR0ZSUyMGFydHxlbnwxfHx8fDE3NjIyNjg0MjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Coffee",
    },
    {
      id: "m3",
      name: "Cappuccino",
      description: "Perfect balance of espresso, steamed milk, and foam",
      price: 4.50,
      image: "https://images.unsplash.com/photo-1708430651927-20e2e1f1e8f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXBwdWNjaW5vJTIwY29mZmVlfGVufDF8fHx8MTc2MjIzOTA0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Coffee",
    },
    {
      id: "m4",
      name: "Americano",
      description: "Espresso shots topped with hot water for a light layer of crema",
      price: 3.75,
      image: "https://images.unsplash.com/photo-1606310553997-7a01e22900ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3ByZXNzbyUyMGNvZmZlZSUyMGN1cHxlbnwxfHx8fDE3NjIyMjgwOTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Coffee",
    },
    {
      id: "m5",
      name: "Mocha",
      description: "Espresso with chocolate, steamed milk, and whipped cream",
      price: 5.25,
      image: "https://images.unsplash.com/photo-1529892485617-25f63cd7b1e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXR0ZSUyMGFydHxlbnwxfHx8fDE3NjIyNjg0MjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Coffee",
    },
    {
      id: "m6",
      name: "Iced Latte",
      description: "Chilled espresso with cold milk over ice",
      price: 5.00,
      image: "https://images.unsplash.com/photo-1529892485617-25f63cd7b1e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXR0ZSUyMGFydHxlbnwxfHx8fDE3NjIyNjg0MjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Iced Drinks",
    },
    {
      id: "m7",
      name: "Cold Brew",
      description: "Smooth, slow-steeped coffee served over ice",
      price: 4.25,
      image: "https://images.unsplash.com/photo-1606310553997-7a01e22900ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3ByZXNzbyUyMGNvZmZlZSUyMGN1cHxlbnwxfHx8fDE3NjIyMjgwOTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Iced Drinks",
    },
    {
      id: "m8",
      name: "Croissant",
      description: "Buttery, flaky French pastry baked fresh daily",
      price: 3.50,
      image: "https://images.unsplash.com/photo-1733754348873-feeb45df3bab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9pc3NhbnQlMjBwYXN0cnl8ZW58MXx8fHwxNzYyMjY2MzE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Pastries",
    },
    {
      id: "m9",
      name: "Chocolate Muffin",
      description: "Moist chocolate muffin with chocolate chips",
      price: 4.00,
      image: "https://images.unsplash.com/photo-1733754348873-feeb45df3bab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9pc3NhbnQlMjBwYXN0cnl8ZW58MXx8fHwxNzYyMjY2MzE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Pastries",
    },
    {
      id: "m10",
      name: "Blueberry Scone",
      description: "Fresh baked scone with blueberries and vanilla glaze",
      price: 3.75,
      image: "https://images.unsplash.com/photo-1733754348873-feeb45df3bab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9pc3NhbnQlMjBwYXN0cnl8ZW58MXx8fHwxNzYyMjY2MzE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Pastries",
    },
  ];

// Mock orders
const mockOrders = [
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
];


  const handleSelectCafe = (cafeId: string) => {
    const cafe = cafes.find((c) => c.id === cafeId);
    if (cafe && cafe.isOpen) {
      setSelectedCafe(cafe);
      setCurrentScreen("menu");
    }
  };

  const handleAddToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.menuItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.menuItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { menuItem: item, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.menuItem.id === itemId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((cartItem) =>
          cartItem.menuItem.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      } else {
        return prevCart.filter((cartItem) => cartItem.menuItem.id !== itemId);
      }
    });
  };

  const handleClearItem = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem.menuItem.id !== itemId));
  };

  const handlePlaceOrder = (time: string) => {
    setPickupTime(time);
    const newOrderNumber = Math.random().toString(36).substring(2, 8).toUpperCase();
    setOrderNumber(newOrderNumber);
    const timestamp = Date.now(); // Capture timestamp
    setOrderTimestamp(timestamp);
    
    // Add to orders
    if (selectedCafe) {
      const cartTotal = cart.reduce((sum, item) => sum + (item.menuItem.price * item.quantity), 0);
      const orderTotal = cartTotal * 1.08;
      const newOrder: Order = {
        id: `order-${timestamp}`,
        orderNumber: newOrderNumber,
        cafeName: selectedCafe.name,
        cafeAddress: selectedCafe.address,
        items: cart.map(item => `${item.quantity}x ${item.menuItem.name}`),
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
    console.log(`Order ${orderId} picked up with rating: ${rating}`);
    // Update the order status to completed
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId
          ? { ...order, status: "completed" as const }
          : order
      )
    );
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
    console.log("Reorder clicked:", orderId);

    // Find the order
    const order = orders.find(o => o.id === orderId);
    if (!order) {
      console.log("Order not found");
      return;
    }

    // Find the cafe
    const cafe = cafes.find(c => c.name === order.cafeName);
    if (!cafe) {
      console.log("Cafe not found");
      return;
    }

    // Set the selected cafe
    setSelectedCafe(cafe);

    // Rebuild the cart from order items
    const newCart = order.items.map(itemString => {
      // Parse items "2x Latte" -> quantity: 2, name: "Latte"
      const match = itemString.match(/(\d+)x\s+(.+)/);
      if (!match) return null;

      const quantity = parseInt(match[1]);
      const itemName = match[2];

      // Find the menu item from menuItems (not cafe.menu)
      const menuItem = menuItems.find(m => m.name === itemName);
      if (!menuItem) {
        console.log("Menu item not found:", itemName);
        return null;
      }

      return { menuItem, quantity };
    }).filter((item): item is CartItem => item !== null); // Type-safe filter

    console.log("New cart:", newCart);
    setCart(newCart);
    setCurrentScreen("cart"); // Changed from "checkout" to "cart"
  };

  const handleNavigate = (screen: MainScreen) => {
    setNavScreen(screen);
    setCurrentScreen(screen);
  };

  const handleLogin = (email: string, password: string) => {
    // Mock login
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
  };

  const handleViewOrder = (orderId: string) => {
    // In a real app, this would show order details
    console.log("View order:", orderId);
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.menuItem.price * item.quantity), 0);
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
              menuItems={menuItems}
              cart={cart}
              onAddToCart={handleAddToCart}
              onRemoveFromCart={handleRemoveFromCart}
              onBack={() => setCurrentScreen("locations")}
              onViewCart={() => setCurrentScreen("cart")}
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
              orders={mockOrders}
              onViewOrder={handleViewOrder}
              onConfirmPickup={handleConfirmPickup}
            />
          )}

          {currentScreen === "account" && (
            <AccountScreen
              isLoggedIn={isLoggedIn}
              userEmail={userEmail}
              userName={userName}
              onLogin={handleLogin}
              onLogout={handleLogout}
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
