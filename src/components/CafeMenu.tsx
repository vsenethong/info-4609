import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowLeft, Clock, Plus, Minus, ShoppingCart, AlertTriangle } from "lucide-react";
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
  type?: 'drink' | 'food';
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
  userAllergens: string[];
  onAddToCart: (item: MenuItem) => void;
  onRemoveFromCart: (itemId: string) => void;
  onBack: () => void;
  onViewCart: () => void;
  onCustomizeDrink: (item: MenuItem) => void;
}

const ALLERGEN_LABELS: Record<string, string> = {
  "dairy": "Dairy",
  "gluten": "Gluten",
  "eggs": "Eggs",
  "nuts": "Nuts",
  "soy": "Soy",
  "shellfish": "Shellfish",
  "fish": "Fish",
  "sesame": "Sesame",
};

export function CafeMenu({
  cafe,
  menuItems,
  cart,
  userAllergens,
  onAddToCart,
  onRemoveFromCart,
  onBack,
  onViewCart,
  onCustomizeDrink
}: CafeMenuProps) {
  const categories = Array.from(new Set(menuItems.map(item => item.category)));
  const cartTotal = cart.reduce((sum, item) => sum + (item.menuItem.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const getItemQuantity = (itemId: string) => {
    const cartItem = cart.find(item => item.menuItem.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const hasUserAllergen = (item: MenuItem): boolean => {
    if (!item.allergens || item.allergens.length === 0) return false;
    if (userAllergens.length === 0) return false;

    return item.allergens.some(allergen => userAllergens.includes(allergen));
  };

  const getMatchingAllergens = (item: MenuItem): string[] => {
    if (!item.allergens || userAllergens.length === 0) return [];
    return item.allergens.filter(allergen => userAllergens.includes(allergen));
  };

  const handleAddItem = (item: MenuItem) => {
    if (item.type === 'drink') {
      onCustomizeDrink(item);
    } else {
      // if it's food, add directly to cart
      onAddToCart(item);
    }
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

        {/* allergen warning banner */}
        {userAllergens.length > 0 && (
          <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-amber-800">
              <span className="font-medium">⚠️ Allergen warnings enabled:</span> Items containing your allergens will be highlighted below.
            </div>
          </div>
        )}
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
                const hasAllergen = hasUserAllergen(item);
                const matchingAllergens = getMatchingAllergens(item);
                const isDrink = item.type === 'drink';

                return (
                  <Card
                    key={item.id}
                    className={`overflow-hidden ${hasAllergen ? 'border-amber-300 bg-amber-50/50' : ''}`}
                  >
                    <div className="flex gap-4">
                      <div className="w-28 h-28 flex-shrink-0 relative">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        {hasAllergen && (
                          <div className="absolute top-2 left-2">
                            <Badge variant="destructive" className="text-xs font-medium">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Allergen
                            </Badge>
                          </div>
                        )}
                        {isDrink && (
                          <div className="absolute bottom-2 right-2">
                            <Badge variant="secondary" className="text-xs font-medium">
                              Customizable
                            </Badge>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 py-3 pr-4">
                        <div className="flex items-start justify-between">
                          <h3 className="mb-1">{item.name}</h3>
                          {hasAllergen && (
                            <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-sm text-neutral-600 mb-2 line-clamp-2">
                          {item.description}
                        </p>

                        {/* Allergen details */}
                        {hasAllergen && matchingAllergens.length > 0 && (
                          <div className="mb-2">
                            <p className="text-xs text-amber-700 font-medium mb-1">
                              Contains: {matchingAllergens.map(id => ALLERGEN_LABELS[id] || id).join(', ')}
                            </p>
                          </div>
                        )}

                        {/* natural allergens (if any) */}
                        {item.allergens && item.allergens.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {item.allergens.map(allergen => (
                              <Badge
                                key={allergen}
                                variant="outline"
                                className={`text-xs ${userAllergens.includes(allergen) ? 'border-amber-300 bg-amber-100 text-amber-800' : 'border-gray-200'}`}
                              >
                                {ALLERGEN_LABELS[allergen] || allergen}
                              </Badge>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center justify-between mt-auto">
                          <span className="text-lg">${item.price.toFixed(2)}</span>
                          {quantity === 0 ? (
                            <Button
                              size="sm"
                              onClick={() => handleAddItem(item)}
                              className={hasAllergen ? 'bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-300' : ''}
                            >
                              <Plus className="h-4 w-4 mr-1" />
                              {isDrink ? "Add" : "Add"}
                            </Button>
                          ) : (
                            <div className="flex items-center gap-2">
                              <Button
                                size="icon"
                                variant="outline"
                                className={`h-8 w-8 ${hasAllergen ? 'border-amber-300' : ''}`}
                                onClick={() => onRemoveFromCart(item.id)}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className={`w-8 text-center ${hasAllergen ? 'font-medium' : ''}`}>{quantity}</span>
                              <Button
                                size="icon"
                                className={`h-8 w-8 ${hasAllergen ? 'bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-300' : ''}`}
                                onClick={() => handleAddItem(item)}
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