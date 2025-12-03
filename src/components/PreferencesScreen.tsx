import { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";

interface PreferencesScreenProps {
  userAllergens: string[];
  userPreferences?: {
    notificationsEnabled: boolean;
    orderReminders: boolean;
    promotionalEmails: boolean;
    defaultPickupTime: string;
    favoriteLocation: string;
  };
  onUpdateAllergens: (allergens: string[]) => void;
  onUpdatePreferences?: (preferences: {
    notificationsEnabled: boolean;
    orderReminders: boolean;
    promotionalEmails: boolean;
    defaultPickupTime: string;
    favoriteLocation: string;
  }) => void;
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
  userPreferences,
  onUpdateAllergens,
  onUpdatePreferences,
  onBack
}: PreferencesScreenProps) {
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>(userAllergens);

  // Initialize preferences from props or use defaults
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    userPreferences?.notificationsEnabled ?? true
  );
  const [orderReminders, setOrderReminders] = useState(
    userPreferences?.orderReminders ?? true
  );
  const [promotionalEmails, setPromotionalEmails] = useState(
    userPreferences?.promotionalEmails ?? false
  );
  const [defaultPickupTime, setDefaultPickupTime] = useState(
    userPreferences?.defaultPickupTime ?? "asap"
  );
  const [favoriteLocation, setFavoriteLocation] = useState(
    userPreferences?.favoriteLocation ?? "none"
  );

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
    console.log("Saving allergens:", selectedAllergens);
    console.log("Saving preferences:", {
      notificationsEnabled,
      orderReminders,
      promotionalEmails,
      defaultPickupTime,
      favoriteLocation,
    });

    onUpdateAllergens(selectedAllergens);

    // Save preferences if the callback is provided
    if (onUpdatePreferences) {
      onUpdatePreferences({
        notificationsEnabled,
        orderReminders,
        promotionalEmails,
        defaultPickupTime,
        favoriteLocation,
      });
    } else {
      console.log("onUpdatePreferences callback is not provided!");
    }

    onBack();
    alert(`Your preferences have been changed!`);
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
          <h2 className="text-lg font-semibold mb-6">Notifications</h2>

          <div className="space-y-6">
            {/* Push Notifications Toggle */}
            <div className="flex items-center justify-between py-2">
              <div className="flex-1">
                <div className="font-medium text-gray-900">Push Notifications</div>
                <div className="text-sm text-gray-600 mt-1">
                  Get notified when your order is ready
                </div>
              </div>
              <button
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                type="button"
                className={`
                  relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full
                  border-2 border-transparent transition-colors duration-200 ease-in-out
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  ${notificationsEnabled ? 'bg-blue-600' : 'bg-gray-100'}
                `}
                role="switch"
                aria-checked={notificationsEnabled}
              >
                <span
                  className={`
                    pointer-events-none inline-block h-6 w-6 transform rounded-full
                    bg-white shadow-lg ring-0 transition duration-200 ease-in-out
                    ${notificationsEnabled ? 'translate-x-5' : 'translate-x-0'}
                  `}
                />
              </button>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Order Reminders Toggle */}
            <div className="flex items-center justify-between py-2">
              <div className="flex-1">
                <div className="font-medium text-gray-900">Order Reminders</div>
                <div className="text-sm text-gray-600 mt-1">
                  Remind me to pick up my order
                </div>
              </div>
              <button
                onClick={() => setOrderReminders(!orderReminders)}
                type="button"
                className={`
                  relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full
                  border-2 border-transparent transition-colors duration-200 ease-in-out
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  ${orderReminders ? 'bg-blue-600' : 'bg-gray-100'}
                `}
                role="switch"
                aria-checked={orderReminders}
              >
                <span
                  className={`
                    pointer-events-none inline-block h-6 w-6 transform rounded-full
                    bg-white shadow-lg ring-0 transition duration-200 ease-in-out
                    ${orderReminders ? 'translate-x-5' : 'translate-x-0'}
                  `}
                />
              </button>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Promotional Emails Toggle */}
            <div className="flex items-center justify-between py-2">
              <div className="flex-1">
                <div className="font-medium text-gray-900">Promotional Emails</div>
                <div className="text-sm text-gray-600 mt-1">
                  Receive deals and special offers
                </div>
              </div>
              <button
                onClick={() => setPromotionalEmails(!promotionalEmails)}
                type="button"
                className={`
                  relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full
                  border-2 border-transparent transition-colors duration-200 ease-in-out
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  ${promotionalEmails ? 'bg-blue-600' : 'bg-gray-100'}
                `}
                role="switch"
                aria-checked={promotionalEmails}
              >
                <span
                  className={`
                    pointer-events-none inline-block h-6 w-6 transform rounded-full
                    bg-white shadow-lg ring-0 transition duration-200 ease-in-out
                    ${promotionalEmails ? 'translate-x-5' : 'translate-x-0'}
                  `}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Order Preferences */}
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
          <h2 className="text-lg font-semibold mb-6">Order Preferences</h2>

          <div className="space-y-6">
            {/* Default Pickup Time */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">
                Default Pickup Time
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         bg-white text-gray-900"
                value={defaultPickupTime}
                onChange={(e) => setDefaultPickupTime(e.target.value)}
              >
                <option value="asap">ASAP</option>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
              </select>
            </div>

            {/* Favorite Location */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">
                Favorite Location
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         bg-white text-gray-900"
                value={favoriteLocation}
                onChange={(e) => setFavoriteLocation(e.target.value)}
              >
                <option value="none">None</option>
                <option value="umc">Starbucks (UMC)</option>
                <option value="weathertech">WeatherTech Cafe & Bakery</option>
                <option value="laughing-goat">The Laughing Goat</option>
                <option value="fens">Fen's Cafe</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold
                   hover:bg-blue-700 transition-colors duration-200
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
}