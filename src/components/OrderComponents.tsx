import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import {
  Clock,
  MapPin,
  CheckCircle2,
  Package,
  Star,
  X,
  ArrowLeft,
  Receipt,
  Calendar,
  Home,
  Coffee
} from "lucide-react";
import { useState, useEffect } from "react";
import { Portal } from "./Portal";

export interface Order {
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

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface Cafe {
  id: string;
  name: string;
  address: string;
  waitTime: number;
}

// utility components
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

function getStatusColor(status: Order["status"]) {
  switch (status) {
    case "preparing":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "ready":
      return "bg-green-100 text-green-800 border-green-200";
    default:
      return "bg-neutral-100 text-neutral-800 border-neutral-200";
  }
}


// MODAL COMPONENT
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Portal>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
        onClick={handleBackdropClick}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-neutral-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
}

// ============================================================================
// RECEIPT MODAL COMPONENT
// ============================================================================
export function ReceiptModal({ order, onClose, onReorder }: ReceiptModalProps) {
  if (!order) return null;

  const subtotal = order.total / 1.08;
  const tax = order.total - subtotal;
  const tip = 0;

  return (
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
        onClick={onClose}
      >
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            width: '100%',
            maxWidth: '448px',
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'relative',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div style={{
            position: 'sticky',
            top: 0,
            backgroundColor: 'white',
            borderBottom: '1px solid #e5e7eb',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Order Receipt</h2>
            <button
              onClick={onClose}
              style={{
                padding: '8px',
                borderRadius: '4px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Cafe Info */}
            <div style={{ textAlign: 'center', borderBottom: '1px solid #e5e7eb', paddingBottom: '24px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                backgroundColor: '#CFB87C',
                marginBottom: '12px'
              }}>
                <Coffee className="h-8 w-8" style={{ color: 'white' }} />
              </div>
              <h3 style={{ fontWeight: 600, fontSize: '1.125rem', marginBottom: '4px' }}>{order.cafeName}</h3>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.875rem', color: '#6b7280' }}>
                <MapPin className="h-4 w-4" />
                <span>{order.cafeAddress}</span>
              </div>
            </div>

            {/* Order Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem' }}>
                <span style={{ color: '#6b7280' }}>Order Number</span>
                <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{order.orderNumber}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem' }}>
                <span style={{ color: '#6b7280' }}>Date & Time</span>
                <span style={{ fontWeight: 500 }}>{order.date} at {order.pickupTime}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem' }}>
                <span style={{ color: '#6b7280' }}>Status</span>
                <span style={{
                  padding: '4px 8px',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  backgroundColor: order.status === 'completed' ? '#dcfce7' : order.status === 'ready' ? '#dbeafe' : '#fef3c7',
                  color: order.status === 'completed' ? '#166534' : order.status === 'ready' ? '#1e40af' : '#92400e'
                }}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            </div>

            {/* Items */}
            <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h4 style={{ fontWeight: 600, fontSize: '0.875rem', color: '#374151' }}>Order Items</h4>
              {order.items.map((item, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: '0.875rem' }}>{item}</span>
                  </div>
                  <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                    ${(subtotal / order.items.length).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span style={{ color: '#6b7280' }}>Subtotal</span>
                <span style={{ fontWeight: 500 }}>${subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span style={{ color: '#6b7280' }}>Tax</span>
                <span style={{ fontWeight: 500 }}>${tax.toFixed(2)}</span>
              </div>
              {tip > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <span style={{ color: '#6b7280' }}>Tip</span>
                  <span style={{ fontWeight: 500 }}>${tip.toFixed(2)}</span>
                </div>
              )}
              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '1rem', fontWeight: 600 }}>
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Footer Message */}
            <div style={{
              background: 'linear-gradient(to bottom right, #eff6ff, #faf5ff)',
              borderRadius: '8px',
              padding: '16px',
              textAlign: 'center'
            }}>
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                Thank you for your order! 🎉
              </p>
              <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '4px' }}>
                We hope you enjoyed your {order.cafeName} experience
              </p>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '8px', paddingTop: '8px' }}>
              <button
                onClick={onClose}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '8px',
                  fontWeight: 500,
                  backgroundColor: 'white',
                  color: '#374151',
                  border: '1px solid #d1d5db',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}
              >
                Close
              </button>
              {onReorder && (
                <button
                  onClick={() => {
                    onReorder(order.id);
                    onClose();
                  }}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '8px',
                    fontWeight: 500,
                    backgroundColor: '#CFB87C',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <Clock className="h-4 w-4" />
                  Order Again
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
}

// ============================================================================
// ORDER DETAILS COMPONENT
// ============================================================================
export interface OrderDetailsProps {
  order: Order;
  onBack: () => void;
  onReorder: () => void;
}

export function OrderDetails({ order, onBack, onReorder }: OrderDetailsProps) {
  const subtotal = order.total / 1.08;
  const tax = order.total - subtotal;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-xl font-semibold">Order Receipt</h2>
          <p className="text-sm text-neutral-600 mt-1">Order #{order.orderNumber}</p>
        </div>
      </div>

      <div className="flex-1 overflow-auto space-y-4">
        {/* Cafe & Status Info */}
        <Card className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
              <Receipt className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold">{order.cafeName}</h3>
                <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </div>
              </div>
              <p className="text-sm text-neutral-600">{order.cafeAddress}</p>

              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1 text-sm text-neutral-600">
                  <Calendar className="h-4 w-4" />
                  {order.date}
                </div>
                {order.rating && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-yellow-50 rounded-full border border-yellow-200">
                    <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                    <span className="text-xs font-semibold">{order.rating}.0</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Pickup Information */}
        <Card className="p-4">
          <h3 className="font-semibold mb-3">Pickup Information</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-neutral-600">Pickup Time</p>
                <p className="font-medium">{order.pickupTime}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-neutral-600">Location</p>
                <p className="font-medium">{order.cafeAddress}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Order Items */}
        <Card className="p-4">
          <h3 className="font-semibold mb-3">Order Items</h3>
          <div className="space-y-3">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2 border-b border-neutral-100 last:border-0"
              >
                <div className="flex-1">
                  <p className="text-sm">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Order Summary */}
        <Card className="p-4">
          <h3 className="font-semibold mb-3">Order Summary</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-600">Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Tax</span>
              <span className="font-medium">${tax.toFixed(2)}</span>
            </div>
            <div className="border-t pt-3 flex justify-between text-base font-semibold">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom Actions */}
      <div className="sticky bottom-0 bg-white border-t pt-4 mt-4">
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onBack}>
            Back to Orders
          </Button>
          <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={onReorder}>
            <Clock className="h-4 w-4 mr-2" />
            Order Again
          </Button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// ORDER STATUS COMPONENT (Live Tracking)
// ============================================================================
export interface OrderStatusProps {
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

// ============================================================================
// ORDER CARD COMPONENTS (for OrdersScreen)
// ============================================================================
export function OrderCard({
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

export function PastOrderCard({
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