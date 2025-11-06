import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Clock, MapPin, CheckCircle2, Package, Star } from "lucide-react";
import { useState } from "react";

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
  onConfirmPickup?: (orderId: string, rating: number) => void;
}

export function OrdersScreen({ orders, onViewOrder, onConfirmPickup }: OrdersScreenProps) {
  const [showPickupModal, setShowPickupModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const activeOrders = orders.filter(o => {
    const status = o.status.toLowerCase().trim();
    return status === "preparing" || status === "ready";
  });
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

  const handleConfirmPickupClick = (orderId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // prevent triggering onViewOrder
    setSelectedOrderId(orderId);
    setShowPickupModal(true);
    setRating(0);
  };

  const handleSubmitPickup = () => {
    if (selectedOrderId && rating > 0 && onConfirmPickup) {
      onConfirmPickup(selectedOrderId, rating);
      setShowPickupModal(false);
      setSelectedOrderId(null);
      setRating(0);
    }
  };

  const handleCancel = () => {
    setShowPickupModal(false);
    setSelectedOrderId(null);
    setRating(0);
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
                <p className="text-sm mb-3">{order.items.join(", ")}</p>
              </div>

              <div className="flex items-center gap-2 mb-1">
                {order.status.toLowerCase().trim() === "ready" && (
                  <Button
                    className="bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-3 rounded-lg shadow-md"
                    onClick={(e) => handleConfirmPickupClick(order.id, e)}
                  >
                    Confirm Pickup
                  </Button>
                )}
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

      {/* Pickup Confirmation Modal */}
      {showPickupModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-sm p-6 space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Confirm Pickup</h2>
              <p className="text-neutral-600">Did you successfully pick up your order?</p>
            </div>

            <div className="space-y-4">
              <div className="text-center">
                <p className="text-sm font-medium mb-3">Rate your experience</p>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          star <= (hoveredRating || rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <p className="text-sm text-neutral-600 mt-2">
                    {rating === 5 && "Excellent!"}
                    {rating === 4 && "Great!"}
                    {rating === 3 && "Good"}
                    {rating === 2 && "Fair"}
                    {rating === 1 && "Needs improvement"}
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleCancel}
                >
                  Exit
                </Button>
                <Button
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={handleSubmitPickup}
                  disabled={rating === 0}
                >
                  Confirm
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}