import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Clock, MapPin, CheckCircle2, Package } from "lucide-react";

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

interface OrdersScreenProps {
  orders: Order[];
  onViewOrder: (orderId: string) => void;
}

export function OrdersScreen({ orders, onViewOrder }: OrdersScreenProps) {
  const activeOrders = orders.filter(o => o.status === "preparing" || o.status === "ready");
  const pastOrders = orders.filter(o => o.status === "completed");

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "preparing":
        return <Badge className="bg-orange-100 text-orange-700">Preparing</Badge>;
      case "ready":
        return <Badge className="bg-green-100 text-green-700">Ready</Badge>;
      case "completed":
        return <Badge variant="secondary">Completed</Badge>;
    }
  };

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "preparing":
        return <Clock className="h-5 w-5 text-orange-600" />;
      case "ready":
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case "completed":
        return <Package className="h-5 w-5 text-neutral-600" />;
    }
  };

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center py-16">
        <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
          <Package className="h-10 w-10 text-neutral-400" />
        </div>
        <h2 className="mb-2">No Orders Yet</h2>
        <p className="text-neutral-600 mb-6">
          Start ordering from your favorite campus cafes
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="pt-6">
        <h1 className="mb-2">My Orders</h1>
        <p className="text-neutral-600">Track your campus cafe orders</p>
      </div>

      {/* Active Orders */}
      {activeOrders.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg px-1">Active Orders</h2>
          {activeOrders.map((order) => (
            <Card 
              key={order.id} 
              className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => onViewOrder(order.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    {getStatusIcon(order.status)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm">{order.cafeName}</h3>
                      {getStatusBadge(order.status)}
                    </div>
                    <p className="text-sm text-neutral-600">Order #{order.orderNumber}</p>
                  </div>
                </div>
                <span className="text-sm">${order.total.toFixed(2)}</span>
              </div>
              
              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <Clock className="h-4 w-4" />
                  <span>Pickup: {order.pickupTime}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <MapPin className="h-4 w-4" />
                  <span>{order.cafeAddress}</span>
                </div>
              </div>

              <div className="pt-3 border-t">
                <p className="text-sm text-neutral-600 mb-2">Items:</p>
                <p className="text-sm">{order.items.join(", ")}</p>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Past Orders */}
      {pastOrders.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg px-1">Past Orders</h2>
          {pastOrders.map((order) => (
            <Card 
              key={order.id} 
              className="p-4 cursor-pointer hover:bg-neutral-50 transition-colors"
              onClick={() => onViewOrder(order.id)}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-sm mb-1">{order.cafeName}</h3>
                  <p className="text-sm text-neutral-600">{order.items.join(", ")}</p>
                </div>
                <span className="text-sm">${order.total.toFixed(2)}</span>
              </div>
              
              <div className="flex items-center justify-between mt-3 pt-3 border-t">
                <span className="text-xs text-neutral-500">{order.date}</span>
                <Button variant="outline" size="sm" className="h-7 text-xs">
                  Reorder
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
