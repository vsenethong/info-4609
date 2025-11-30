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
      image: 'public/images/cafes/koelbelviolet.png',
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
      image: 'public/images/cafes/southviolet.png',
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

  const cafeMenus: Record<string, MenuItem[]> = {
    'starbucks_umc': [
      {
        id: "sb_m1",
        name: "Pike Place Roast",
        description: "Starbucks signature medium roast coffee",
        price: 2.95,
        image: "https://images.unsplash.com/photo-1606310553997-7a01e22900ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3ByZXNzbyUyMGNvZmZlZSUyMGN1cHxlbnwxfHx8fDE3NjIyMjgwOTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
        category: "Coffee",
      },
      {
        id: "sb_m2",
        name: "Caffè Latte",
        description: "Espresso with steamed milk and light layer of foam",
        price: 5.25,
        image: "https://images.unsplash.com/photo-1529892485617-25f63cd7b1e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXR0ZSUyMGFydHxlbnwxfHx8fDE3NjIyNjg0MjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
        category: "Coffee",
      },
      {
        id: "sb_m3",
        name: "Caramel Macchiato",
        description: "Espresso with vanilla, steamed milk and caramel drizzle",
        price: 5.75,
        image: "https://images.unsplash.com/photo-1529892485617-25f63cd7b1e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXR0ZSUyMGFydHxlbnwxfHx8fDE3NjIyNjg0MjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
        category: "Coffee",
      },
      {
        id: "sb_m4",
        name: "Cappuccino",
        description: "Espresso with steamed milk and thick layer of foam",
        price: 4.95,
        image: "https://images.unsplash.com/photo-1708430651927-20e2e1f1e8f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXBwdWNjaW5vJTIwY29mZmVlfGVufDF8fHx8MTc2MjIzOTA0NHww&ixlib=rb-4.1.0&q=80&w=1080",
        category: "Coffee",
      },
      {
        id: "sb_m5",
        name: "Iced Caramel Macchiato",
        description: "Vanilla, milk, ice, espresso and caramel drizzle",
        price: 5.95,
        image: "https://images.unsplash.com/photo-1529892485617-25f63cd7b1e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXR0ZSUyMGFydHxlbnwxfHx8fDE3NjIyNjg0MjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
        category: "Iced Drinks",
      },
      {
        id: "sb_m6",
        name: "Butter Croissant",
        description: "Classic French buttery pastry",
        price: 3.95,
        image: "https://images.unsplash.com/photo-1733754348873-feeb45df3bab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9pc3NhbnQlMjBwYXN0cnl8ZW58MXx8fHwxNzYyMjY2MzE5fDA&ixlib=rb-4.1.0&q=80&w=1080",
        category: "Pastries",
      },
      {
        id: "sb_m7",
        name: "Chocolate Chip Cookie",
        description: "Soft and chewy chocolate chip cookie",
        price: 2.95,
        image: "https://images.unsplash.com/photo-1733754348873-feeb45df3bab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9pc3NhbnQlMjBwYXN0cnl8ZW58MXx8fHwxNzYyMjY2MzE5fDA&ixlib=rb-4.1.0&q=80&w=1080",
        category: "Pastries",
      },
    ],
    'weathertech': [
      {
        id: "wt_m1",
        name: "House Blend Coffee",
        description: "Fresh roasted daily blend, smooth and balanced",
        price: 3.25,
        image: "https://images.unsplash.com/photo-1606310553997-7a01e22900ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3ByZXNzbyUyMGNvZmZlZSUyMGN1cHxlbnwxfHx8fDE3NjIyMjgwOTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
        category: "Coffee",
      },
      {
        id: "wt_m2",
        name: "Cappuccino",
        description: "Rich espresso with velvety steamed milk foam",
        price: 4.50,
        image: "https://images.unsplash.com/photo-1708430651927-20e2e1f1e8f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXBwdWNjaW5vJTIwY29mZmVlfGVufDF8fHx8MTc2MjIzOTA0NHww&ixlib=rb-4.1.0&q=80&w=1080",
        category: "Coffee",
      },
      {
        id: "wt_m3",
        name: "Cinnamon Roll",
        description: "Freshly baked with cream cheese frosting",
        price: 4.50,
        image: "https://images.unsplash.com/photo-1733754348873-feeb45df3bab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9pc3NhbnQlMjBwYXN0cnl8ZW58MXx8fHwxNzYyMjY2MzE5fDA&ixlib=rb-4.1.0&q=80&w=1080",
        category: "Bakery",
      },
      {
        id: "wt_m4",
        name: "Blueberry Muffin",
        description: "Moist muffin packed with fresh blueberries",
        price: 3.75,
        image: "https://images.unsplash.com/photo-1733754348873-feeb45df3bab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9pc3NhbnQlMjBwYXN0cnl8ZW58MXx8fHwxNzYyMjY2MzE5fDA&ixlib=rb-4.1.0&q=80&w=1080",
        category: "Bakery",
      },
      {
        id: "wt_m5",
        name: "Breakfast Sandwich",
        description: "Egg, cheese, and choice of meat on English muffin",
        price: 6.95,
        image: "https://images.unsplash.com/photo-1733754348873-feeb45df3bab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9pc3NhbnQlMjBwYXN0cnl8ZW58MXx8fHwxNzYyMjY2MzE5fDA&ixlib=rb-4.1.0&q=80&w=1080",
        category: "Food",
      },
      {
        id: "wt_m6",
        name: "Iced Coffee",
        description: "Refreshing cold brewed coffee over ice",
        price: 3.95,
        image: "https://images.unsplash.com/photo-1606310553997-7a01e22900ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3ByZXNzbyUyMGNvZmZlZSUyMGN1cHxlbnwxfHx8fDE3NjIyMjgwOTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
        category: "Iced Drinks",
      },
    ],
    'laughinggoat': [
      {
        id: "lg_m1",
        name: "Cortado",
        description: "Espresso with equal parts warm steamed milk",
        price: 4.25,
        image: "https://images.unsplash.com/photo-1606310553997-7a01e22900ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3ByZXNzbyUyMGNvZmZlZSUyMGN1cHxlbnwxfHx8fDE3NjIyMjgwOTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
        category: "Coffee",
      },
      {
        id: "lg_m2",
        name: "Pour Over Coffee",
        description: "Single origin hand-brewed coffee",
        price: 4.50,
        image: "https://images.unsplash.com/photo-1606310553997-7a01e22900ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3ByZXNzbyUyMGNvZmZlZSUyMGN1cHxlbnwxfHx8fDE3NjIyMjgwOTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
        category: "Coffee",
      },
      {
        id: "lg_m3",
        name: "Flat White",
        description: "Espresso with microfoam steamed milk",
        price: 4.75,
        image: "https://images.unsplash.com/photo-1529892485617-25f63cd7b1e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXR0ZSUyMGFydHxlbnwxfHx8fDE3NjIyNjg0MjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
        category: "Coffee",
      },
      {
        id: "lg_m4",
        name: "Avocado Toast",
        description: "Fresh avocado on artisan bread with seasonings",
        price: 8.50,
        image: "https://images.unsplash.com/photo-1733754348873-feeb45df3bab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9pc3NhbnQlMjBwYXN0cnl8ZW58MXx8fHwxNzYyMjY2MzE5fDA&ixlib=rb-4.1.0&q=80&w=1080",
        category: "Food",
      },
      {
        id: "lg_m5",
        name: "Bagel with Cream Cheese",
        description: "Toasted bagel with house-made cream cheese",
        price: 4.95,
        image: "https://images.unsplash.com/photo-1733754348873-feeb45df3bab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9pc3NhbnQlMjBwYXN0cnl8ZW58MXx8fHwxNzYyMjY2MzE5fDA&ixlib=rb-4.1.0&q=80&w=1080",
        category: "Food",
      },
    ],
    'fens': [
      {
        id: "fn_m1",
        name: "Espresso",
        description: "Rich single shot of premium espresso",
        price: 3.00,
        image: "https://images.unsplash.com/photo-1606310553997-7a01e22900ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3ByZXNzbyUyMGNvZmZlZSUyMGN1cHxlbnwxfHx8fDE3NjIyMjgwOTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
        category: "Coffee",
      },
      {
        id: "fn_m2",
        name: "Matcha Latte",
        description: "Premium Japanese matcha with steamed milk",
        price: 5.50,
        image: "https://images.unsplash.com/photo-1529892485617-25f63cd7b1e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXR0ZSUyMGFydHxlbnwxfHx8fDE3NjIyNjg0MjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
        category: "Specialty",
      },
      {
        id: "fn_m3",
        name: "Chai Latte",
        description: "Spiced black tea with steamed milk",
        price: 4.95,
        image: "https://images.unsplash.com/photo-1529892485617-25f63cd7b1e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXR0ZSUyMGFydHxlbnwxfHx8fDE3NjIyNjg0MjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
        category: "Specialty",
      },
      {
        id: "fn_m4",
        name: "Cold Brew",
        description: "Smooth cold-steeped coffee concentrate",
        price: 4.50,
        image: "https://images.unsplash.com/photo-1606310553997-7a01e22900ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3ByZXNzbyUyMGNvZmZlZSUyMGN1cHxlbnwxfHx8fDE3NjIyMjgwOTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
        category: "Iced Drinks",
      },
      {
        id: "fn_m5",
        name: "Breakfast Burrito",
        description: "Eggs, cheese, potatoes, and salsa wrapped in tortilla",
        price: 7.50,
        image: "https://images.unsplash.com/photo-1733754348873-feeb45df3bab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9pc3NhbnQlMjBwYXN0cnl8ZW58MXx8fHwxNzYyMjY2MzE5fDA&ixlib=rb-4.1.0&q=80&w=1080",
        category: "Food",
      },
    ],
    'foolishcraig': [
      {
        id: "fc_m1",
        name: "Americano",
        description: "Espresso diluted with hot water",
        price: 3.75,
        image: "https://images.unsplash.com/photo-1606310553997-7a01e22900ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3ByZXNzbyUyMGNvZmZlZSUyMGN1cHxlbnwxfHx8fDE3NjIyMjgwOTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
        category: "Coffee",
      },
      {
        id: "fc_m2",
        name: "Latte",
        description: "Espresso with steamed milk",
        price: 4.50,
        image: "https://images.unsplash.com/photo-1529892485617-25f63cd7b1e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXR0ZSUyMGFydHxlbnwxfHx8fDE3NjIyNjg0MjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
        category: "Coffee",
      },
      {
        id: "fc_m3",
        name: "Mocha",
        description: "Espresso with chocolate and steamed milk",
        price: 5.00,
        image: "https://images.unsplash.com/photo-1529892485617-25f63cd7b1e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXR0ZSUyMGFydHxlbnwxfHx8fDE3NjIyNjg0MjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
        category: "Coffee",
      },
      {
        id: "fc_m4",
        name: "Cookies",
        description: "Assorted fresh-baked cookies",
        price: 2.50,
        image: "https://images.unsplash.com/photo-1733754348873-feeb45df3bab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9pc3NhbnQlMjBwYXN0cnl8ZW58MXx8fHwxNzYyMjY2MzE5fDA&ixlib=rb-4.1.0&q=80&w=1080",
        category: "Snacks",
      },
    ],
    'violetpeak': [
      {
        id: "vp_m1",
        name: "Cappuccino",
        description: "Espresso with steamed milk and foam",
        price: 4.50,
        image: "https://images.unsplash.com/photo-1708430651927-20e2e1f1e8f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXBwdWNjaW5vJTIwY29mZmVlfGVufDF8fHx8MTc2MjIzOTA0NHww&ixlib=rb-4.1.0&q=80&w=1080",
        category: "Coffee",
      },
      {
        id: "vp_m2",
        name: "Drip Coffee",
        description: "Fresh brewed house coffee",
        price: 2.75,
        image: "https://images.unsplash.com/photo-1606310553997-7a01e22900ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3ByZXNzbyUyMGNvZmZlZSUyMGN1cHxlbnwxfHx8fDE3NjIyMjgwOTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
        category: "Coffee",
      },
      {
        id: "vp_m3",
        name: "Iced Latte",
        description: "Espresso with cold milk over ice",
        price: 4.95,
        image: "https://images.unsplash.com/photo-1529892485617-25f63cd7b1e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXR0ZSUyMGFydHxlbnwxfHx8fDE3NjIyNjg0MjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
        category: "Iced Drinks",
      },
      {
        id: "vp_m4",
        name: "Muffin",
        description: "Daily selection of fresh muffins",
        price: 3.50,
        image: "https://images.unsplash.com/photo-1733754348873-feeb45df3bab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9pc3NhbnQlMjBwYXN0cnl8ZW58MXx8fHwxNzYyMjY2MzE5fDA&ixlib=rb-4.1.0&q=80&w=1080",
        category: "Pastries",
      },
    ],
    'northvioletpeak': [
      {
        id: "nvp_m1",
        name: "Latte",
        description: "Espresso with steamed milk and light foam",
        price: 4.75,
        image: "https://images.unsplash.com/photo-1529892485617-25f63cd7b1e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXR0ZSUyMGFydHxlbnwxfHx8fDE3NjIyNjg0MjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
        category: "Coffee",
      },
      {
        id: "nvp_m2",
        name: "Espresso",
        description: "Double shot of espresso",
        price: 3.50,
        image: "https://images.unsplash.com/photo-1606310553997-7a01e22900ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3ByZXNzbyUyMGNvZmZlZSUyMGN1cHxlbnwxfHx8fDE3NjIyMjgwOTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
        category: "Coffee",
      },
      {
        id: "nvp_m3",
        name: "Hot Chocolate",
        description: "Rich chocolate with steamed milk and whipped cream",
        price: 4.25,
        image: "https://images.unsplash.com/photo-1529892485617-25f63cd7b1e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXR0ZSUyMGFydHxlbnwxfHx8fDE3NjIyNjg0MjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
        category: "Specialty",
      },
      {
        id: "nvp_m4",
        name: "Croissant",
        description: "Buttery, flaky French pastry",
        price: 3.75,
        image: "https://images.unsplash.com/photo-1733754348873-feeb45df3bab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9pc3NhbnQlMjBwYXN0cnl8ZW58MXx8fHwxNzYyMjY2MzE5fDA&ixlib=rb-4.1.0&q=80&w=1080",
        category: "Pastries",
      },
    ],
    'southvioletpeak': [
     {
      id: "nvp_m1",
      name: "Latte",
      description: "Espresso with steamed milk and light foam",
      price: 4.75,
      image: "https://images.unsplash.com/photo-1529892485617-25f63cd7b1e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXR0ZSUyMGFydHxlbnwxfHx8fDE3NjIyNjg0MjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Coffee",
    },
    {
      id: "nvp_m2",
      name: "Espresso",
      description: "Double shot of espresso",
      price: 3.50,
      image: "https://images.unsplash.com/photo-1606310553997-7a01e22900ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3ByZXNzbyUyMGNvZmZlZSUyMGN1cHxlbnwxfHx8fDE3NjIyMjgwOTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Coffee",
    },
    {
      id: "nvp_m3",
      name: "Hot Chocolate",
      description: "Rich chocolate with steamed milk and whipped cream",
      price: 4.25,
      image: "https://images.unsplash.com/photo-1529892485617-25f63cd7b1e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXR0ZSUyMGFydHxlbnwxfHx8fDE3NjIyNjg0MjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Specialty",
    },
    {
      id: "nvp_m4",
      name: "Croissant",
      description: "Buttery, flaky French pastry",
      price: 3.75,
      image: "https://images.unsplash.com/photo-1733754348873-feeb45df3bab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9pc3NhbnQlMjBwYXN0cnl8ZW58MXx8fHwxNzYyMjY2MzE5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Pastries",
    },
    ],
  };

  const getMenuForCafe = (cafeId: string): MenuItem[] => {
      return cafeMenus[cafeId] || [];
  };

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
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const cafe = cafes.find(c => c.name === order.cafeName);
    if (!cafe) return;

    setSelectedCafe(cafe);

    // Use cafe-specific menu
    const cafeMenu = getMenuForCafe(cafe.id);

    const newCart = order.items.map(itemString => {
      const match = itemString.match(/(\d+)x\s+(.+)/);
      if (!match) return null;

      const quantity = parseInt(match[1]);
      const itemName = match[2];

      // Search in cafe-specific menu
      const menuItem = cafeMenu.find(m => m.name === itemName);
      if (!menuItem) return null;

      return { menuItem, quantity };
    }).filter((item): item is CartItem => item !== null);

    setCart(newCart);
    setCurrentScreen("cart");
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
              menuItems={getMenuForCafe(selectedCafe.id)}
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
