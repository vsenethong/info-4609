import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowLeft, Plus, Minus, Trash2, Clock } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

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
  waitTime: number;
}

interface CartProps {
  cafe: Cafe;
  cart: CartItem[];
  onAddToCart: (item: MenuItem) => void;
  onRemoveFromCart: (itemId: string) => void;
  onClearItem: (itemId: string) => void;
  onBack: () => void;
  onPlaceOrder: (pickupTime: string) => void;
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
  const subtotal = cart.reduce((sum, item) => sum + (item.menuItem.price * item.quantity), 0);
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
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2>Your Cart</h2>
          <p className="text-sm text-neutral-600 mt-1">{cafe.name}</p>
        </div>
      </div>

      <div className="flex-1 overflow-auto space-y-4">
        <div className="space-y-3">
          {cart.map((item) => (
            <Card key={item.menuItem.id} className="overflow-hidden">
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
                    <h3 className="text-sm">{item.menuItem.name}</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 -mt-1"
                      onClick={() => onClearItem(item.menuItem.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">${(item.menuItem.price * item.quantity).toFixed(2)}</span>
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-7 w-7"
                        onClick={() => onRemoveFromCart(item.menuItem.id)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-6 text-center text-sm">{item.quantity}</span>
                      <Button
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => onAddToCart(item.menuItem)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-4">
          <h3 className="mb-4">Pickup Time</h3>
          <RadioGroup value={pickupOption} onValueChange={(v) => setPickupOption(v as "asap" | "scheduled")}>
            <div className="flex items-center space-x-2 mb-3">
              <RadioGroupItem value="asap" id="asap" />
              <Label htmlFor="asap" className="flex items-center gap-2 cursor-pointer">
                <Clock className="h-4 w-4 text-green-600" />
                <div>
                  <div>ASAP</div>
                  <div className="text-sm text-neutral-600">Ready in ~{cafe.waitTime} min</div>
                </div>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="scheduled" id="scheduled" />
              <Label htmlFor="scheduled" className="cursor-pointer">Schedule for later</Label>
            </div>
          </RadioGroup>

          {pickupOption === "scheduled" && (
            <div className="mt-3">
              <Select value={scheduledTime} onValueChange={setScheduledTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </Card>

        <Card className="p-4">
          <h3 className="mb-3">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-600">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="border-t pt-2 flex justify-between">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="sticky bottom-0 bg-white border-t pt-4 mt-4">
        <Button 
          className="w-full h-12" 
          size="lg"
          onClick={handlePlaceOrder}
          disabled={pickupOption === "scheduled" && !scheduledTime}
        >
          Place Order · ${total.toFixed(2)}
        </Button>
      </div>
    </div>
  );
}
