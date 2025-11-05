import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { CheckCircle2, Clock, Home } from "lucide-react";
import { useEffect, useState } from "react";

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

interface OrderStatusProps {
  cafe: Cafe;
  items: CartItem[];
  total: number;
  pickupTime: string;
  orderNumber: string;
  onBackToHome: () => void;
}

export function OrderStatus({
  cafe,
  items,
  total,
  pickupTime,
  orderNumber,
  onBackToHome,
}: OrderStatusProps) {
  const [orderStatus, setOrderStatus] = useState<"confirmed" | "preparing" | "ready">("confirmed");
  const [estimatedTime, setEstimatedTime] = useState(cafe.waitTime);
  const [progress, setProgress] = useState(25);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setOrderStatus("preparing");
      setProgress(60);
      setEstimatedTime(Math.max(5, cafe.waitTime - 5));
    }, 3000);

    const timer2 = setTimeout(() => {
      setOrderStatus("ready");
      setProgress(100);
      setEstimatedTime(0);
    }, 8000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [cafe.waitTime]);

  const getStatusInfo = () => {
    switch (orderStatus) {
      case "confirmed":
        return {
          title: "Order Confirmed",
          message: "Your order has been received and will be prepared soon",
          badgeVariant: "secondary" as const,
          badgeColor: "bg-blue-100 text-blue-700"
        };
      case "preparing":
        return {
          title: "Preparing Your Order",
          message: "Our baristas are crafting your items",
          badgeVariant: "secondary" as const,
          badgeColor: "bg-orange-100 text-orange-700"
        };
      case "ready":
        return {
          title: "Order Ready!",
          message: "Your order is ready for pickup",
          badgeVariant: "secondary" as const,
          badgeColor: "bg-green-100 text-green-700"
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="flex flex-col h-full">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="mb-2">Order Placed!</h1>
        <p className="text-neutral-600">Order #{orderNumber}</p>
      </div>

      <Card className="p-6 mb-4">
        <div className="flex items-start justify-between mb-4">
          <div>
            <Badge variant={statusInfo.badgeVariant} className={statusInfo.badgeColor}>
              {statusInfo.title}
            </Badge>
            <p className="text-sm text-neutral-600 mt-2">{statusInfo.message}</p>
          </div>
        </div>

        <Progress value={progress} className="h-2 mb-4" />

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              orderStatus === "confirmed" || orderStatus === "preparing" || orderStatus === "ready"
                ? "bg-green-100"
                : "bg-neutral-100"
            }`}>
              <CheckCircle2 className={`h-5 w-5 ${
                orderStatus === "confirmed" || orderStatus === "preparing" || orderStatus === "ready"
                  ? "text-green-600"
                  : "text-neutral-400"
              }`} />
            </div>
            <div className="flex-1">
              <p className="text-sm">Order Confirmed</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              orderStatus === "preparing" || orderStatus === "ready"
                ? "bg-green-100"
                : "bg-neutral-100"
            }`}>
              {orderStatus === "preparing" || orderStatus === "ready" ? (
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              ) : (
                <Clock className="h-5 w-5 text-neutral-400" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm">Preparing Order</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              orderStatus === "ready"
                ? "bg-green-100"
                : "bg-neutral-100"
            }`}>
              {orderStatus === "ready" ? (
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              ) : (
                <Clock className="h-5 w-5 text-neutral-400" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm">Ready for Pickup</p>
            </div>
          </div>
        </div>

        {estimatedTime > 0 && (
          <div className="mt-4 pt-4 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600">Estimated time:</span>
              <span className="text-sm">{estimatedTime} min</span>
            </div>
          </div>
        )}
      </Card>

      <Card className="p-4 mb-4">
        <h3 className="mb-3">Pickup Details</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-neutral-600">Location</span>
            <span className="text-right">{cafe.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-600">Address</span>
            <span className="text-right">{cafe.address}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-600">Pickup Time</span>
            <span>{pickupTime}</span>
          </div>
        </div>
      </Card>

      <Card className="p-4 mb-4">
        <h3 className="mb-3">Order Items</h3>
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.menuItem.id} className="flex justify-between text-sm">
              <span className="text-neutral-600">
                {item.quantity}x {item.menuItem.name}
              </span>
              <span>${(item.menuItem.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t pt-2 flex justify-between">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </Card>

      <div className="mt-auto">
        <Button className="w-full h-12" size="lg" onClick={onBackToHome}>
          <Home className="h-5 w-5 mr-2" />
          Back to Home
        </Button>
      </div>
    </div>
  );
}
