import { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";

interface PreferencesScreenProps {
  userAllergens: string[];
  onUpdateAllergens: (allergens: string[]) => void;
  onBack: () => void;
}

const COMMON_ALLERGENS = [
  { id: "dairy", label: "Dairy", icon: "🥛" },
  { id: "gluten", label: "Gluten", icon: "🌾" },
  { id: "eggs", label: "Eggs", icon: "🥚" },
  { id: "nuts", label: "Nuts", icon: "🥜" },
  { id: "soy", label: "Soy", icon: "🫘" },
  { id: "shellfish", label: "Shellfish", icon: "🦐" },
  { id: "fish", label: "Fish", icon: "🐟" },
  { id: "sesame", label: "Sesame", icon: "🌱" },
];

export function PreferencesScreen({
  userAllergens,
  onUpdateAllergens,
  onBack
}: PreferencesScreenProps) {
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>(userAllergens);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [orderReminders, setOrderReminders] = useState(true);
  const [promotionalEmails, setPromotionalEmails] = useState(false);

  // Load preferences from localStorage on mount
  useState(() => {
    const savedPrefs = localStorage.getItem('userPreferences');
    if (savedPrefs) {
      const prefs = JSON.parse(savedPrefs);
      setNotificationsEnabled(prefs.notificationsEnabled ?? true);
      setOrderReminders(prefs.orderReminders ?? true);
      setPromotionalEmails(prefs.promotionalEmails ?? false);
    }
  });

  const toggleAllergen = (allergenId: string) => {
    setSelectedAllergens(prev => {
      if (prev.includes(allergenId)) {
        return prev.filter(id => id !== allergenId);
      } else {
        return [...prev, allergenId];
      }
    });
  };

  const handleSave = () => {
    onUpdateAllergens(selectedAllergens);

    // Save notification preferences to localStorage
    const preferences = {
      notificationsEnabled,
      orderReminders,
      promotionalEmails,
    };
    localStorage.setItem('userPreferences', JSON.stringify(preferences));

    onBack();
  };

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
        <h1 className="text-xl font-semibold">Preferences</h1>
      </div>

      <div className="p-6 space-y-6">
        {/* Dietary Restrictions */}
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
          <h2 className="text-lg font-semibold mb-2">Dietary Restrictions</h2>
          <p className="text-sm text-neutral-600 mb-4">
            Select your allergens to get warnings on menu items
          </p>

          <div className="grid grid-cols-2 gap-3">
            {COMMON_ALLERGENS.map((allergen) => {
              const isSelected = selectedAllergens.includes(allergen.id);
              return (
                <button
                  key={allergen.id}
                  onClick={() => toggleAllergen(allergen.id)}
                  className={`
                    relative p-4 rounded-lg border-2 transition-all
                    ${isSelected
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-neutral-200 bg-white hover:border-neutral-300'
                    }
                  `}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                  <div className="text-2xl mb-1">{allergen.icon}</div>
                  <div className="text-sm font-medium">{allergen.label}</div>
                </button>
              );
            })}
          </div>

          {selectedAllergens.length > 0 && (
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-800">
                <span className="font-medium">⚠️ Allergen warnings enabled:</span> Items containing{" "}
                {selectedAllergens.map((id, idx) => {
                  const allergen = COMMON_ALLERGENS.find(a => a.id === id);
                  return (
                    <span key={id}>
                      {allergen?.label}
                      {idx < selectedAllergens.length - 1 ? ", " : ""}
                    </span>
                  );
                })} will be highlighted.
              </p>
            </div>
          )}
        </div>

        {/* Notifications Section */}
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Notifications</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Push Notifications</div>
                <div className="text-sm text-neutral-600">
                  Get notified when your order is ready
                </div>
              </div>
              <button
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`
                  relative w-12 h-7 rounded-full transition-colors
                  ${notificationsEnabled ? 'bg-blue-500' : 'bg-neutral-300'}
                `}
              >
                <div
                  className={`
                    absolute top-1 w-5 h-5 bg-white rounded-full transition-transform
                    ${notificationsEnabled ? 'translate-x-6' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>

            <div className="border-t border-neutral-200 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Order Reminders</div>
                  <div className="text-sm text-neutral-600">
                    Remind me to pick up my order
                  </div>
                </div>
                <button
                  onClick={() => setOrderReminders(!orderReminders)}
                  className={`
                    relative w-12 h-7 rounded-full transition-colors
                    ${orderReminders ? 'bg-blue-500' : 'bg-neutral-300'}
                  `}
                >
                  <div
                    className={`
                      absolute top-1 w-5 h-5 bg-white rounded-full transition-transform
                      ${orderReminders ? 'translate-x-6' : 'translate-x-1'}
                    `}
                  />
                </button>
              </div>
            </div>

            <div className="border-t border-neutral-200 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Promotional Emails</div>
                  <div className="text-sm text-neutral-600">
                    Receive deals and special offers
                  </div>
                </div>
                <button
                  onClick={() => setPromotionalEmails(!promotionalEmails)}
                  className={`
                    relative w-12 h-7 rounded-full transition-colors
                    ${promotionalEmails ? 'bg-blue-500' : 'bg-neutral-300'}
                  `}
                >
                  <div
                    className={`
                      absolute top-1 w-5 h-5 bg-white rounded-full transition-transform
                      ${promotionalEmails ? 'translate-x-6' : 'translate-x-1'}
                    `}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Default Pickup Time */}
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Order Preferences</h2>

          <div className="space-y-3">
            <label className="block">
              <span className="text-sm font-medium text-neutral-700 mb-1 block">
                Default Pickup Time
              </span>
              <select className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>ASAP</option>
                <option>15 minutes</option>
                <option>30 minutes</option>
                <option>1 hour</option>
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-neutral-700 mb-1 block">
                Favorite Location
              </span>
              <select className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>None</option>
                <option>Starbucks (UMC)</option>
                <option>WeatherTech Cafe & Bakery</option>
                <option>The Laughing Goat</option>
                <option>Fen's Cafe</option>
              </select>
            </label>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
}