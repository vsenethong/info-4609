import { Home, ShoppingBag, User } from "lucide-react";

type NavScreen = "home" | "orders" | "account";

interface BottomNavProps {
  currentScreen: NavScreen;
  onNavigate: (screen: NavScreen) => void;
  orderCount?: number;
}

export function BottomNav({ currentScreen, onNavigate, orderCount = 0 }: BottomNavProps) {
  const navItems = [
    { id: "home" as NavScreen, icon: Home, label: "Home" },
    { id: "orders" as NavScreen, icon: ShoppingBag, label: "Orders" },
    { id: "account" as NavScreen, icon: User, label: "Account" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
      <div className="max-w-md mx-auto">
        <div className="grid grid-cols-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center justify-center py-3 transition-colors relative ${
                  isActive 
                    ? "text-blue-600" 
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                <div className="relative">
                  <Icon className="h-6 w-6 mb-1" />
                  {item.id === "orders" && orderCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white">{orderCount}</span>
                    </div>
                  )}
                </div>
                <span className="text-xs">{item.label}</span>
                {isActive && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-blue-600 rounded-t-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
