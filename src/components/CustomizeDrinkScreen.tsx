import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowLeft, Check, Plus, Minus } from "lucide-react";
import { Textarea } from "./ui/textarea";

interface CustomizationOption {
  id: string;
  name: string;
  choices: {
    id: string;
    name: string;
    price: number;
    allergens?: string[]; // milk alternatives
  }[];
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  allergens?: string[];
  customizations?: CustomizationOption[];
}

interface CustomizeDrinkProps {
  menuItem: MenuItem;
  userAllergens: string[];
  onAddToCart: (item: MenuItem, customizations: CustomizedItem) => void;
  onBack: () => void;
}

export interface CustomizedItem {
  baseItem: MenuItem;
  size?: string;
  milk?: string;
  syrups: string[];
  specialInstructions: string;
  totalPrice: number;
}

export function CustomizeDrink({
  menuItem,
  userAllergens,
  onAddToCart,
  onBack
}: CustomizeDrinkProps) {
  // Default customizations
  const [size, setSize] = useState("M");
  const [milk, setMilk] = useState("whole");
  const [syrups, setSyrups] = useState<string[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState("");

  // Size options
  const sizeOptions = [
    { id: "S", name: "Small (12oz)", price: 0 },
    { id: "M", name: "Medium (16oz)", price: 0.50 },
    { id: "L", name: "Large (20oz)", price: 1.00 },
  ];

  // Milk options (with allergen info)
  const milkOptions = [
    { id: "whole", name: "Whole Milk", price: 0, allergens: ["dairy"] },
    { id: "skim", name: "Skim Milk", price: 0, allergens: ["dairy"] },
    { id: "oat", name: "Oat Milk", price: 0.75, allergens: [] },
    { id: "almond", name: "Almond Milk", price: 0.75, allergens: ["nuts"] },
    { id: "soy", name: "Soy Milk", price: 0.75, allergens: ["soy"] },
    { id: "coconut", name: "Coconut Milk", price: 0.75, allergens: [] },
  ];

  // Syrup options
  const syrupOptions = [
    { id: "vanilla", name: "Vanilla", price: 0.50 },
    { id: "caramel", name: "Caramel", price: 0.50 },
    { id: "hazelnut", name: "Hazelnut", price: 0.50 },
    { id: "pumpkin", name: "Pumpkin Spice", price: 0.75, seasonal: true },
    { id: "peppermint", name: "Peppermint", price: 0.75, seasonal: true },
  ];


  const calculateTotalPrice = () => {
    let total = menuItem.price;

    const selectedSize = sizeOptions.find(s => s.id === size);
    if (selectedSize) total += selectedSize.price;

    const selectedMilk = milkOptions.find(m => m.id === milk);
    if (selectedMilk) total += selectedMilk.price;

    syrups.forEach(syrupId => {
      const syrup = syrupOptions.find(s => s.id === syrupId);
      if (syrup) total += syrup.price;
    });

    return total;
  };

  const toggleSyrup = (syrupId: string) => {
    setSyrups(prev => {
      if (prev.includes(syrupId)) {
        return prev.filter(id => id !== syrupId);
      } else {
        return [...prev, syrupId];
      }
    });
  };

  const getSelectedSyrupNames = () => {
    return syrups.map(id => {
      const syrup = syrupOptions.find(s => s.id === id);
      return syrup?.name || id;
    });
  };

  const handleAddToCart = () => {
    const customizedItem: CustomizedItem = {
      baseItem: menuItem,
      size,
      milk,
      syrups,
      specialInstructions,
      totalPrice: calculateTotalPrice(),
    };

    onAddToCart(menuItem, customizedItem);
  };

  const totalPrice = calculateTotalPrice();

  // if selected milk contains user allergens
  const selectedMilkOption = milkOptions.find(m => m.id === milk);
  const hasMilkAllergen = selectedMilkOption?.allergens?.some(allergen =>
    userAllergens.includes(allergen)
  );

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 px-4 py-4 flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-100pt font-semibold">Customize Drink</h1>
          <p className="text-sm text-neutral-600">{menuItem.name}</p>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Allergen Warning for Selected Milk */}
        {hasMilkAllergen && selectedMilkOption && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-sm text-amber-800 font-medium">
              ⚠️ Note: {selectedMilkOption.name} contains allergens you've selected
            </p>
          </div>
        )}

        {/* Size Selection */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">Size</h2>
          <div className="grid grid-cols-3 gap-2">
            {sizeOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setSize(option.id)}
                className={`
                  p-3 rounded-lg border-2 text-center transition-all
                  ${size === option.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                  }
                `}
              >
                <div className="font-medium">{option.id}</div>
                <div className="text-sm text-neutral-600">{option.name.split('(')[0]}</div>
                {option.price > 0 && (
                  <div className="text-sm font-medium text-blue-600 mt-1">
                    +${option.price.toFixed(2)}
                  </div>
                )}
              </button>
            ))}
          </div>
        </Card>

        {/* Milk Selection */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">Milk</h2>
          <div className="space-y-2">
            {milkOptions.map((option) => {
              const containsAllergen = option.allergens?.some(allergen =>
                userAllergens.includes(allergen)
              );

              return (
                <button
                  key={option.id}
                  onClick={() => setMilk(option.id)}
                  className={`
                    w-full p-3 rounded-lg border-2 flex items-center justify-between transition-all
                    ${milk === option.id
                      ? containsAllergen
                        ? 'border-amber-500 bg-amber-50'
                        : 'border-blue-500 bg-blue-50'
                      : containsAllergen
                        ? 'border-amber-200 bg-amber-50/30 hover:border-amber-300'
                        : 'border-neutral-200 bg-white hover:border-neutral-300'
                    }
                  `}
                >
                  <div className="text-left">
                    <div className="font-medium flex items-center gap-2">
                      {option.name}
                      {containsAllergen && (
                        <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                          Allergen
                        </span>
                      )}
                    </div>
                    {option.price > 0 && (
                      <div className="text-sm text-neutral-600">
                        +${option.price.toFixed(2)}
                      </div>
                    )}
                  </div>
                  {milk === option.id && (
                    <Check className="w-5 h-5 text-blue-500" />
                  )}
                </button>
              );
            })}
          </div>
        </Card>

        {/* Syrup Selection */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">Syrups & Flavors</h2>
          <p className="text-sm text-neutral-600 mb-4">Select additional flavors</p>
          <div className="space-y-2">
            {syrupOptions.map((option) => {
              const isSelected = syrups.includes(option.id);

              return (
                <button
                  key={option.id}
                  onClick={() => toggleSyrup(option.id)}
                  className={`
                    w-full p-3 rounded-lg border-2 flex items-center justify-between transition-all
                    ${isSelected
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-neutral-200 bg-white hover:border-neutral-300'
                    }
                  `}
                >
                  <div className="text-left">
                    <div className="font-medium flex items-center gap-2">
                      {option.name}
                      {option.seasonal && (
                        <span className="text-xs bg-orange-100 text-orange-800 px-2 py-0.5 rounded">
                          Seasonal
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-neutral-600">
                      +${option.price.toFixed(2)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {isSelected && <Check className="w-5 h-5 text-blue-500" />}
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center ${isSelected ? 'bg-blue-500 text-white' : 'bg-neutral-100'}`}>
                      {isSelected ? '−' : '+'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Syrups Summary */}
          {syrups.length > 0 && (
            <div className="mt-4 pt-4 border-t border-neutral-200">
              <p className="text-sm font-medium text-neutral-700 mb-2">Selected syrups:</p>
              <div className="flex flex-wrap gap-2">
                {getSelectedSyrupNames().map((name, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </Card>

        {/* Special Instructions */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">Special Instructions</h2>
          <Textarea
            placeholder="Add any special requests or instructions (optional)"
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
            className="min-h-[100px] resize-none"
            maxLength={200}
          />
          <div className="text-right text-sm text-neutral-500 mt-2">
            {specialInstructions.length}/200 characters
          </div>
        </Card>

        {/* Price Summary */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">Price Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-neutral-600">{menuItem.name}</span>
              <span>${menuItem.price.toFixed(2)}</span>
            </div>

            {/* Size Price */}
            {sizeOptions.find(s => s.id === size)?.price > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Size upgrade</span>
                <span>+${sizeOptions.find(s => s.id === size)!.price.toFixed(2)}</span>
              </div>
            )}

            {/* Milk Price */}
            {milkOptions.find(m => m.id === milk)?.price > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Milk alternative</span>
                <span>+${milkOptions.find(m => m.id === milk)!.price.toFixed(2)}</span>
              </div>
            )}

            {/* Syrup Prices */}
            {syrups.map(syrupId => {
              const syrup = syrupOptions.find(s => s.id === syrupId);
              if (!syrup) return null;
              return (
                <div key={syrupId} className="flex justify-between text-sm">
                  <span className="text-neutral-600">{syrup.name} syrup</span>
                  <span>+${syrup.price.toFixed(2)}</span>
                </div>
              );
            })}

            {/* Divider */}
            <div className="border-t border-neutral-200 my-2"></div>

            {/* Total */}
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </Card>

        {/* Add to Cart Button */}
        <Button
          className="w-full h-12 text-lg font-semibold"
          size="lg"
          onClick={handleAddToCart}
        >
          Add to Cart · ${totalPrice.toFixed(2)}
        </Button>
      </div>
    </div>
  );
}