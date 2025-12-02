import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowLeft, Clock, Plus, Minus, ShoppingCart } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  allergens?: string[];
}

interface Cafe {
  id: string;
  name: string;
  address: string;
  waitTime: number;
}

interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

interface CafeMenuProps {
  cafe: Cafe;
  menuItems: MenuItem[];
  cart: CartItem[];
  onAddToCart: (item: MenuItem) => void;
  onRemoveFromCart: (itemId: string) => void;
  onBack: () => void;
  onViewCart: () => void;
}

export function CafeMenu({ 
  cafe, 
  menuItems, 
  cart, 
  onAddToCart, 
  onRemoveFromCart,
  onBack,
  onViewCart 
}: CafeMenuProps) {
  const categories = Array.from(new Set(menuItems.map(item => item.category)));
  const cartTotal = cart.reduce((sum, item) => sum + (item.menuItem.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const getItemQuantity = (itemId: string) => {
    const cartItem = cart.find(item => item.menuItem.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 bg-white z-10 pb-4 border-b">
        <div className="flex items-center gap-3 mb-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h2>{cafe.name}</h2>
            <div className="flex items-center gap-1 text-neutral-600 mt-1">
              <Clock className="h-4 w-4 text-orange-600" />
              <span className="text-sm">{cafe.waitTime} min wait time</span>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue={categories[0]} className="flex-1 mt-4">
        <TabsList className="w-full justify-start overflow-x-auto">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category} value={category} className="space-y-3 mt-4">
            {menuItems
              .filter(item => item.category === category)
              .map((item) => {
                const quantity = getItemQuantity(item.id);
                return (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="flex gap-4">
                      <div className="w-28 h-28 flex-shrink-0">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 py-3 pr-4">
                        <h3 className="mb-1">{item.name}</h3>
                        <p className="text-sm text-neutral-600 mb-2 line-clamp-2">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between mt-auto">
                          <span className="text-lg">${item.price.toFixed(2)}</span>
                          {quantity === 0 ? (
                            <Button
                              size="sm"
                              onClick={() => onAddToCart(item)}
                            >
                              <Plus className="h-4 w-4 mr-1" />
                              Add
                            </Button>
                          ) : (
                            <div className="flex items-center gap-2">
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-8 w-8"
                                onClick={() => onRemoveFromCart(item.id)}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center">{quantity}</span>
                              <Button
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => onAddToCart(item)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
          </TabsContent>
        ))}
      </Tabs>

      {cartItemCount > 0 && (
        <div className="sticky bottom-0 bg-white border-t pt-4 mt-4">
          <Button className="w-full h-12" size="lg" onClick={onViewCart}>
            <ShoppingCart className="h-5 w-5 mr-2" />
            View Cart ({cartItemCount}) · ${cartTotal.toFixed(2)}
          </Button>
        </div>
      )}
    </div>
  );
}
