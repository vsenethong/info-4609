import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowLeft, Plus, Minus, Trash2, Clock, Check } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { RadioGroup } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  type?: 'drink' | 'food';
}

interface CustomizedItem {
  baseItem: MenuItem;
  size?: string;
  milk?: string;
  syrups: string[];
  specialInstructions: string;
  totalPrice: number;
}

// UPDATED: CartItem now uses CustomizedItem
interface CartItem {
  menuItem: MenuItem; // Keep menuItem for backward compatibility
  quantity: number;
  selectedSize?: 'S' | 'M' | 'L';
  customizations?: CustomizedItem; // NEW: Optional customizations
}

interface Cafe {
  id: string;
  name: string;
  address: string;
  waitTime: number;
}

interface CartProps {
  cafe: Cafe;
  cart: CartItem[];
  onAddToCart: (item: MenuItem, size?: 'S' | 'M' | 'L', customizations?: CustomizedItem) => void;
  onRemoveFromCart: (itemId: string, size?: 'S' | 'M' | 'L', customizations?: CustomizedItem) => void;
  onClearItem: (itemId: string, size?: 'S' | 'M' | 'L', customizations?: CustomizedItem) => void;
  onBack: () => void;
  onPlaceOrder: (pickupTime: string) => void;
}

// Reusable pickup time option component
interface PickupOptionProps {
  id: string;
  value: string;
  selected: boolean;
  onSelect: (value: string) => void;
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

function PickupOption({
  id,
  value,
  selected,
  onSelect,
  title,
  description,
  icon
}: PickupOptionProps) {
  return (
    <div
      className={`
        relative border rounded-lg p-4 cursor-pointer transition-all duration-200
        ${selected
          ? 'border-green-600 bg-green-50 shadow-sm'
          : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
        }
      `}
      onClick={() => onSelect(value)}
    >
      <div className="flex items-start gap-3">
        <div className={`
          flex items-center justify-center h-6 w-6 rounded-full border-2 flex-shrink-0 mt-0.5
          ${selected
            ? 'border-green-600 bg-green-600'
            : 'border-neutral-300'
          }
        `}>
          {selected && (
            <Check className="h-3.5 w-3.5 text-white stroke-[3]" />
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            {icon}
            <Label
              htmlFor={id}
              className={`text-base font-medium cursor-pointer ${selected ? 'text-green-700' : 'text-neutral-900'}`}
            >
              {title}
            </Label>
            {selected && value === "asap" && (
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 text-xs">
                Recommended
              </Badge>
            )}
          </div>
          {description && (
            <p className={`text-sm ${selected ? 'text-green-600' : 'text-neutral-600'}`}>
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export function Cart({
  cafe,
  cart,
  onAddToCart,
  onRemoveFromCart,
  onClearItem,
  onBack,
  onPlaceOrder,
}: CartProps) {
  // UPDATED: Calculate subtotal based on customizations if available
  const subtotal = cart.reduce((sum, item) => {
    // If item has customizations, use the customized price
    if (item.customizations) {
      return sum + (item.customizations.totalPrice * item.quantity);
    }

    // Otherwise, use size-based price or default price
    const price = item.selectedSize && item.menuItem.sizes
      ? item.menuItem.sizes[item.selectedSize]
      : item.menuItem.price;

    return sum + (price * item.quantity);
  }, 0);

  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const [pickupOption, setPickupOption] = useState<"asap" | "scheduled">("asap");
  const [scheduledTime, setScheduledTime] = useState<string>("");

  const generateTimeSlots = () => {
    const slots: string[] = [];
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const startMinutes = currentMinutes + cafe.waitTime + 15;

    for (let i = 0; i < 12; i++) {
      const slotMinutes = startMinutes + (i * 15);
      const hours = Math.floor(slotMinutes / 60) % 24;
      const minutes = slotMinutes % 60;
      const period = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12;
      slots.push(`${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handlePlaceOrder = () => {
    const time = pickupOption === "asap"
      ? `ASAP (~${cafe.waitTime} min)`
      : scheduledTime;
    onPlaceOrder(time);
  };

  // Generate a unique key for each cart item
  const getCartItemKey = (item: CartItem) => {
    if (item.customizations) {
      // For customized items, include customizations in the key
      return `${item.menuItem.id}-${item.selectedSize || 'default'}-${JSON.stringify(item.customizations)}`;
    }
    // For regular items
    return `${item.menuItem.id}-${item.selectedSize || 'default'}`;
  };

  // Format milk name for display
  const formatMilkName = (milkId: string) => {
    const milkNames: Record<string, string> = {
      'whole': 'Whole Milk',
      'skim': 'Skim Milk',
      'oat': 'Oat Milk',
      'almond': 'Almond Milk',
      'soy': 'Soy Milk',
      'coconut': 'Coconut Milk',
    };
    return milkNames[milkId] || milkId;
  };

  // Format syrup names for display
  const formatSyrupNames = (syrupIds: string[]) => {
    const syrupNames: Record<string, string> = {
      'vanilla': 'Vanilla',
      'caramel': 'Caramel',
      'hazelnut': 'Hazelnut',
      'pumpkin': 'Pumpkin Spice',
      'peppermint': 'Peppermint',
    };
    return syrupIds.map(id => syrupNames[id] || id).join(', ');
  };

  // Empty cart state
  if (cart.length === 0) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2>Your Cart</h2>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center text-center text-neutral-500">
          <p>Your cart is empty</p>
          <Button className="mt-4" onClick={onBack}>
            Browse Menu
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2>Your Cart</h2>
          <p className="text-sm text-neutral-600 mt-1">{cafe.name}</p>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-auto space-y-4">
        {/* Cart Items */}
        <div className="space-y-3">
          {cart.map((item) => {
            const price = item.customizations
              ? item.customizations.totalPrice
              : (item.selectedSize && item.menuItem.sizes
                ? item.menuItem.sizes[item.selectedSize]
                : item.menuItem.price);

            return (
              <Card key={getCartItemKey(item)} className="overflow-hidden">
                <div className="flex gap-4 p-4">
                  <div className="w-20 h-20 flex-shrink-0">
                    <ImageWithFallback
                      src={item.menuItem.image}
                      alt={item.menuItem.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-sm font-medium">{item.menuItem.name}</h3>

                        {/* Display size if selected */}
                        {item.selectedSize && (
                          <p className="text-xs text-neutral-600">Size: {item.selectedSize}</p>
                        )}

                        {/* Display customizations if available */}
                        {item.customizations && (
                          <div className="mt-1 space-y-0.5">
                            {item.customizations.size && (
                              <p className="text-xs text-neutral-600">Size: {item.customizations.size}</p>
                            )}
                            {item.customizations.milk && item.customizations.milk !== 'whole' && (
                              <p className="text-xs text-neutral-600">Milk: {formatMilkName(item.customizations.milk)}</p>
                            )}
                            {item.customizations.syrups.length > 0 && (
                              <p className="text-xs text-neutral-600">Syrups: {formatSyrupNames(item.customizations.syrups)}</p>
                            )}
                            {item.customizations.specialInstructions && (
                              <p className="text-xs text-neutral-500 italic">
                                Note: {item.customizations.specialInstructions.substring(0, 30)}
                                {item.customizations.specialInstructions.length > 30 ? '...' : ''}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 -mt-1"
                        onClick={() => onClearItem(
                          item.menuItem.id,
                          item.selectedSize,
                          item.customizations
                        )}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">${(price * item.quantity).toFixed(2)}</span>
                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-7 w-7"
                          onClick={() => onRemoveFromCart(
                            item.menuItem.id,
                            item.selectedSize,
                            item.customizations
                          )}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                        <Button
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => onAddToCart(
                            item.menuItem,
                            item.selectedSize,
                            item.customizations
                          )}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Pickup Time Section - IMPROVED VISIBILITY */}
        <Card className="p-4">
          <h3 className="mb-4 font-semibold">Pickup Time</h3>

          <RadioGroup
            value={pickupOption}
            onValueChange={(v) => setPickupOption(v as "asap" | "scheduled")}
            className="space-y-3"
          >
            {/* ASAP Option */}
            <PickupOption
              id="asap"
              value="asap"
              selected={pickupOption === "asap"}
              onSelect={() => setPickupOption("asap")}
              title="ASAP"
              description={`Ready in ~${cafe.waitTime} minutes`}
              icon={<Clock className="h-4 w-4 text-green-600" />}
            />

            {/* Schedule for Later Option */}
            <PickupOption
              id="scheduled"
              value="scheduled"
              selected={pickupOption === "scheduled"}
              onSelect={() => setPickupOption("scheduled")}
              title="Schedule for later"
              icon={<Clock className="h-4 w-4 text-neutral-500" />}
            />
          </RadioGroup>

          {/* Time Selector for Scheduled Pickup */}
          {pickupOption === "scheduled" && (
            <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="mb-2">
                <Label htmlFor="time-select" className="text-sm font-medium">
                  Select pickup time
                </Label>
              </div>
              <Select value={scheduledTime} onValueChange={setScheduledTime}>
                <SelectTrigger id="time-select" className="w-full">
                  <SelectValue placeholder="Choose a time slot" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-neutral-400" />
                        {slot}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-neutral-500 mt-2">
                Times are based on current preparation time
              </p>
            </div>
          )}
        </Card>

        {/* Order Summary */}
        <Card className="p-4">
          <h3 className="mb-3 font-semibold">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-600">Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="border-t pt-2 flex justify-between text-base font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Fixed Bottom Button */}
      <div className="sticky bottom-0 bg-white border-t pt-4 mt-4">
        <Button
          className="w-full h-12"
          size="lg"
          onClick={handlePlaceOrder}
          disabled={pickupOption === "scheduled" && !scheduledTime}
        >
          Place Order · ${total.toFixed(2)}
        </Button>
        {pickupOption === "scheduled" && !scheduledTime && (
          <p className="text-xs text-red-500 text-center mt-2">
            Please select a pickup time
          </p>
        )}
      </div>
    </div>
  );
}