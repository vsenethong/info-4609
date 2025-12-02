import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Clock, MapPin, CheckCircle2, Package, Star, X } from "lucide-react";
import { useState } from "react";
import { OrderCard, PastOrderCard, Order } from './OrderComponents';

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
  rating?: number;
}

interface OrdersScreenProps {
  orders: Order[];
  onViewOrder: (orderId: string) => void;
  onConfirmPickup?: (orderId: string, rating: number) => void;
}

function StatusBadge({ status }: { status: Order["status"] }) {
  switch (status) {
    case "preparing":
      return <Badge className="bg-orange-100 text-orange-700">Preparing</Badge>;
    case "ready":
      return <Badge className="bg-green-100 text-green-700">Ready</Badge>;
    default:
      return <Badge variant="secondary">Completed</Badge>;
  }
}

function StatusIcon({ status }: { status: Order["status"] }) {
  switch (status) {
    case "preparing":
      return <Clock className="h-5 w-5 text-orange-600" />;
    case "ready":
      return <CheckCircle2 className="h-5 w-5 text-green-600" />;
    default:
      return <Package className="h-5 w-5 text-neutral-600" />;
  }
}

function OrderCard({
  order,
  onViewOrder,
  onConfirmPickup,
}: {
  order: Order;
  onViewOrder: (id: string) => void;
  onConfirmPickup: (id: string, e: React.MouseEvent) => void;
}) {
  return (
    <Card
      className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => onViewOrder(order.id)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <StatusIcon status={order.status} />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-sm font-medium">{order.cafeName}</h3>
              <StatusBadge status={order.status} />
              {/* show rating if it exists */}
              {order.rating && (
                <div className="flex items-center gap-1 ml-auto">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-semibold">{order.rating}</span>
                </div>
              )}
            </div>

            <p className="text-sm text-neutral-600">
              Order #{order.orderNumber}
            </p>
          </div>
        </div>

        <span className="text-sm font-semibold">${order.total.toFixed(2)}</span>
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex items-center gap-2 text-sm text-neutral-600">
          <Clock className="h-4 w-4" /> Pickup: {order.pickupTime}
        </div>

        <div className="flex items-center gap-2 text-sm text-neutral-600">
          <MapPin className="h-4 w-4" /> {order.cafeAddress}
        </div>
      </div>

      <div className="pt-3 border-t">
        <p className="text-sm text-neutral-600 mb-2">Items:</p>
        <p className="text-sm mb-3">{order.items.join(", ")}</p>
      </div>

      {order.status === "ready" && !order.rating && (
        <Button
          className="w-full bg-green-50 hover:shadow-lg text-black font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-green-100"
          onClick={(e) => {
            e.stopPropagation();
            onConfirmPickup(order.id, e);
          }}
        >
          Confirm Pickup
        </Button>
      )}
    </Card>
  );
}

function PastOrderCard({
  order,
  onViewOrder,
}: {
  order: Order;
  onViewOrder: (id: string) => void;
}) {
  return (
    <Card
      className="p-4 cursor-pointer hover:bg-neutral-50 transition-colors"
      onClick={() => onViewOrder(order.id)}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-medium">{order.cafeName}</h3>
            {order.rating && (
              <div className="flex items-center gap-1 px-2 py-1 bg-yellow-50 rounded-full">
                <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                <span className="text-xs font-semibold">{order.rating}.0</span>
              </div>
            )}
          </div>
          <p className="text-sm text-neutral-600 mb-2">{order.items.join(", ")}</p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-500">{order.date}</span>
          </div>
        </div>
        <span className="text-sm font-semibold ml-2">${order.total.toFixed(2)}</span>
      </div>

      <div className="flex items-center justify-between mt-3 pt-3 border-t">
        <div className="text-xs text-neutral-500">
          {order.rating ? "Rated" : "Completed"}
        </div>
        <Button variant="outline" size="sm" className="h-7 text-xs">
          Reorder
        </Button>
      </div>
    </Card>
  );
}

export function OrdersScreen({
  orders,
  onViewOrder,
  onConfirmPickup,
}: OrdersScreenProps) {
  const [showPickupModal, setShowPickupModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const activeOrders = orders.filter((o) =>
    ["preparing", "ready"].includes(o.status.toLowerCase().trim())
  );
  const pastOrders = orders.filter((o) => o.status === "completed");

  const handleConfirmPickupClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedOrderId(id);
    setShowPickupModal(true);
  };

  const handleSubmitPickup = () => {
    if (selectedOrderId && rating > 0) {
      console.log("Submitting rating:", rating, "for order:", selectedOrderId);
      console.log("Current order status:", selectedOrder?.status);

      if (onConfirmPickup) {
        onConfirmPickup(selectedOrderId, rating);
      }

      setShowPickupModal(false);
      setSelectedOrderId(null);
      setRating(0);
      setHoveredRating(0);
    }
  };

  const handleCancel = () => {
    setShowPickupModal(false);
    setSelectedOrderId(null);
    setRating(0);
  };

  // find the selected order for display in the modal
  const selectedOrder = selectedOrderId
    ? orders.find(order => order.id === selectedOrderId)
    : null;

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

  console.log("🔄 OrdersScreen rendering, showPickupModal:", showPickupModal);
  console.log("🔄 selectedOrderId:", selectedOrderId);
  console.log("🔄 selectedOrder:", selectedOrder);

  return (
    <>
      <div className="space-y-6 px-1 pt-6">
        <h1 className="mb-2">My Orders</h1>
        <p className="text-neutral-600">Track your campus cafe orders</p>

        {activeOrders.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg">Active Orders</h2>
            {activeOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onViewOrder={onViewOrder}
                onConfirmPickup={handleConfirmPickupClick}
              />
            ))}
          </div>
        )}

        {pastOrders.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg">Past Orders</h2>
            {pastOrders.map((order) => (
              <PastOrderCard
                key={order.id}
                order={order}
                onViewOrder={onViewOrder}
              />
            ))}
          </div>
        )}
      </div>

      {/* Rating Modal */}
      {showPickupModal && selectedOrder && (
        <Portal>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              zIndex: 99999
            }}
            onClick={handleCancel}
          >
            <div
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                width: '100%',
                maxWidth: '380px',
                padding: '24px',
                position: 'relative',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={handleCancel}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  padding: '8px',
                  borderRadius: '50%',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X className="h-5 w-5" style={{ color: '#6b7280' }} />
              </button>

              <h2 style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                textAlign: 'center',
                marginBottom: '1rem'
              }}>
                Rate Your Experience
              </h2>

              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <p style={{ color: '#6b7280' }}>
                  How was your experience at{" "}
                  <span style={{ fontWeight: 600 }}>{selectedOrder.cafeName}</span>?
                </p>
              </div>

              {/* Stars - Using inline styles for full control */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '8px',
                marginBottom: '1.5rem'
              }}>
                {[1, 2, 3, 4, 5].map((star) => {
                  const isFilled = star <= (hoveredRating || rating);
                  return (
                    <button
                      key={star}
                      type="button"
                      style={{
                        padding: '4px',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                      onClick={() => {
                        console.log("Star clicked:", star);
                        setRating(star);
                      }}
                      onMouseEnter={() => {
                        console.log("Star hovered:", star);
                        setHoveredRating(star);
                      }}
                      onMouseLeave={() => {
                        console.log("Star hover left");
                        setHoveredRating(0);
                      }}
                    >
                      <Star
                        className="star-icon"
                        style={{
                          width: '40px',
                          height: '40px',
                          color: isFilled ? '#fbbf24' : '#d1d5db',
                          fill: isFilled ? '#fbbf24' : 'transparent',
                          transition: 'color 0.2s, fill 0.2s'
                        }}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Rating text */}
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <p style={{
                  fontSize: '0.875rem',
                  color: rating > 0 ? '#059669' : '#6b7280',
                  fontWeight: rating > 0 ? 500 : 'normal'
                }}>
                  {rating === 0 ? "Select a rating" : `${rating} star${rating > 1 ? 's' : ''} selected`}
                </p>
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button
                  onClick={handleSubmitPickup}
                  disabled={rating === 0}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    fontWeight: 500,
                    backgroundColor: rating === 0 ? '#e5e7eb' : '#059669',
                    color: rating === 0 ? '#6b7280' : 'white',
                    border: 'none',
                    cursor: rating === 0 ? 'not-allowed' : 'pointer',
                    transition: 'background-color 0.2s',
                    fontSize: '0.875rem'
                  }}
                  onMouseEnter={(e) => {
                    if (rating > 0) {
                      e.currentTarget.style.backgroundColor = '#047857';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (rating > 0) {
                      e.currentTarget.style.backgroundColor = '#059669';
                    }
                  }}
                >
                  {rating === 0 ? "Select rating first" : "Submit Rating"}
                </button>

                <button
                  onClick={handleCancel}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    fontWeight: 500,
                    backgroundColor: 'white',
                    color: '#374151',
                    border: '1px solid #d1d5db',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    fontSize: '0.875rem'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}
