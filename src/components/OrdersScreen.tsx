import { Package, Star, X } from "lucide-react";
import { useState } from "react";
import { OrderCard, PastOrderCard, Order } from './OrderComponents';
import { Portal } from "./Portal";

interface OrdersScreenProps {
  orders: Order[];
  onViewOrder: (orderId: string) => void;
  onConfirmPickup?: (orderId: string, rating: number) => void;
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
    setHoveredRating(0);
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