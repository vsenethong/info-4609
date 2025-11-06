import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Coffee, MapPin, Clock, ChevronRight } from "lucide-react";

interface Order {
  id: string;
  orderNumber: string;
  cafeName: string;
  cafeAddress: string;
  items: string[];
  total: number;
  status: string;
  pickupTime: string;
  date: string;
}

interface HomeScreenProps {
  orders: Order[];
  onReorder: (orderId: string) => void;
  onFindCafe: () => void;
}

export function HomeScreen({ orders, onReorder, onFindCafe }: HomeScreenProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center pt-8 pb-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-4" style={{ backgroundColor: '#CFB87C' }}>
          <Coffee className="h-10 w-10 text-white" />
        </div>

        <h1 className="mb-2">Campus Cafe Connect</h1>
        <p className="text-neutral-600">Buffs order fast from local cafes!</p>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h2 className="text-lg px-1">Quick Actions</h2>

        {/* Find Nearest Cafe */}
        <Card
          className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={onFindCafe}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-base mb-1">Find Nearest Cafe</h3>
                <p className="text-sm text-neutral-600">Browse all campus locations</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-neutral-400" />
          </div>
        </Card>

        {/* Recent Order Quick Reorder */}
        {orders.length > 0 && (
          <Card
            className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onReorder(orders[0].id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-base mb-1">Reorder Recent</h3>
                  <p className="text-sm text-neutral-600">
                    {orders[0].items[0]}
                    {orders[0].items.length > 1 && ` +${orders[0].items.length - 1} more`}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm">${orders[0].total.toFixed(2)}</div>
                <ChevronRight className="h-5 w-5 text-neutral-400 ml-auto" />
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Recent Orders */}
      {orders.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg px-1">Recent Orders</h2>
          <div className="space-y-2">
            {orders.slice(0, 3).map((order) => (
              <Card
                key={order.id}
                className="p-4 cursor-pointer hover:bg-neutral-50 transition-colors"
                onClick={() => onReorder(order.id)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-sm mb-1">{order.cafeName}</h3>
                    <p className="text-sm text-neutral-600">
                      {order.items.join(", ")}
                    </p>
                  </div>
                  <span className="text-sm">${order.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-neutral-500">
                  <span>{order.date}</span>
                  <Button variant="ghost" size="sm" className="h-7 text-xs">
                    Order Again
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Bottom pop up */}
      <Card className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-100">
        <div className="flex items-start gap-3">
          <Coffee className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm mb-1">Welcome CU Students and Faculty!</h3>
            <p className="text-sm text-neutral-600">
              Skip the line and order ahead from your favorite campus cafes.
              Use your student identikey to use your account.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}