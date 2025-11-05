import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { MapPin, Clock, Navigation, ArrowLeft } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Cafe {
  id: string;
  name: string;
  address: string;
  distance: number;
  waitTime: number;
  image: string;
  isOpen: boolean;
}

interface LocationListProps {
  cafes: Cafe[];
  onSelectCafe: (cafeId: string) => void;
  onBack: () => void;
}

export function LocationList({ cafes, onSelectCafe, onBack }: LocationListProps) {
  return (
    <div className="space-y-4 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full hover:bg-[#CFB87C]/20">
            <ArrowLeft className="h-5 w-5 text-[#CFB87C]" />
          </Button>
          <div>
            <h1 className="font-semibold text-lg">Campus Cafes</h1>
            <p className="text-neutral-500 text-sm">Choose a location to order from</p>
          </div>
        </div>

        <Button variant="ghost" size="icon">
          <Navigation className="h-5 w-5 text-[#CFB87C]" />
        </Button>
      </div>

      {/* Cafe Cards */}
      <div className="space-y-3">
        {cafes.map((cafe) => (
          <Card
            key={cafe.id}
            className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onSelectCafe(cafe.id)}
          >
            <div className="flex gap-4">
              <div className="w-24 h-24 flex-shrink-0">
                <ImageWithFallback
                  src={cafe.image}
                  alt={cafe.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 py-3 pr-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="mb-1">{cafe.name}</h3>
                    {!cafe.isOpen && (
                      <Badge variant="secondary" className="bg-red-100 text-red-700">
                        Closed
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-neutral-600 mb-2">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{cafe.address}</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Navigation className="h-4 w-4 text-blue-600" />
                    <span>{cafe.distance} mi</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-orange-600" />
                    <span>{cafe.waitTime} min wait</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}