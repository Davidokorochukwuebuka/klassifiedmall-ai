/**
 * Account-type-specific profile templates.
 * Provides sample content, tips, and navigation structure for each account type.
 * Requirement 2.2: Pre-Built Profile Templates
 */

export interface ProfileTemplate {
  accountType: string;
  label: string;
  description: string;
  sampleProducts: Array<{ name: string; category: string; price: string }>;
  tips: string[];
  quickActions: Array<{ label: string; href: string; icon: string }>;
  dashboardWidgets: string[];
}

export const PROFILE_TEMPLATES: Record<string, ProfileTemplate> = {
  FARMER: {
    accountType: 'FARMER',
    label: 'Farm Produce Catalog',
    description: 'Showcase your fresh farm produce directly to buyers',
    sampleProducts: [
      { name: 'Fresh Tomatoes (basket)', category: 'Vegetables', price: '₦5,000' },
      { name: 'Red Onions (50kg bag)', category: 'Vegetables', price: '₦25,000' },
      { name: 'Palm Oil (25 liters)', category: 'Oils', price: '₦18,000' },
    ],
    tips: [
      'Add clear photos of your produce for better sales',
      'Set competitive prices by checking nearby farmers',
      'Update stock levels daily to avoid order cancellations',
      'Respond to buyer messages within 1 hour for better ratings',
    ],
    quickActions: [
      { label: 'Add Product', href: '/vendor/products/new', icon: '📦' },
      { label: 'View Orders', href: '/vendor/orders', icon: '📋' },
      { label: 'Manage Branches', href: '/vendor/branches', icon: '📍' },
    ],
    dashboardWidgets: ['revenue', 'orders', 'products', 'ratings'],
  },
  RESTAURANT: {
    accountType: 'RESTAURANT',
    label: 'Restaurant Menu',
    description: 'List your menu items and accept online orders',
    sampleProducts: [
      { name: 'Jollof Rice & Chicken', category: 'Main Dishes', price: '₦3,500' },
      { name: 'Pepper Soup (Goat)', category: 'Soups', price: '₦4,000' },
      { name: 'Chapman Drink', category: 'Beverages', price: '₦1,500' },
    ],
    tips: [
      'Upload appetizing photos of your dishes',
      'Set preparation time for each menu item',
      'Offer combo meals for higher order values',
      'Enable live kitchen status for real-time order tracking',
    ],
    quickActions: [
      { label: 'Add Menu Item', href: '/vendor/menu', icon: '🍽️' },
      { label: 'Active Orders', href: '/vendor/orders', icon: '🔥' },
      { label: 'Kitchen View', href: '/vendor/kitchen', icon: '👨‍🍳' },
    ],
    dashboardWidgets: ['revenue', 'activeOrders', 'menuItems', 'ratings'],
  },
  CHEF: {
    accountType: 'CHEF',
    label: 'Chef Services',
    description: 'Offer your cooking services, catering, and meal prep',
    sampleProducts: [
      { name: 'Private Dinner (4 guests)', category: 'Catering', price: '₦50,000' },
      { name: 'Weekly Meal Prep (5 days)', category: 'Meal Prep', price: '₦35,000' },
      { name: 'Cooking Class (2 hours)', category: 'Classes', price: '₦15,000' },
    ],
    tips: [
      'Showcase your signature dishes with photos',
      'Offer tasting menus for new clients',
      'Set your service area and delivery radius',
      'Get certified to increase trust and bookings',
    ],
    quickActions: [
      { label: 'Add Service', href: '/vendor/products/new', icon: '👨‍🍳' },
      { label: 'Bookings', href: '/vendor/reservations', icon: '📅' },
      { label: 'Reviews', href: '/vendor/reviews', icon: '⭐' },
    ],
    dashboardWidgets: ['revenue', 'bookings', 'services', 'ratings'],
  },
  STREET_KIOSK: {
    accountType: 'STREET_KIOSK',
    label: 'Kiosk Menu',
    description: 'Quick bites, snacks, and drinks on the go',
    sampleProducts: [
      { name: 'Suya (per stick)', category: 'Snacks', price: '₦500' },
      { name: 'Shawarma (Large)', category: 'Wraps', price: '₦2,500' },
      { name: 'Fresh Juice', category: 'Drinks', price: '₦800' },
    ],
    tips: [
      'Keep your menu simple and focused',
      'Update availability for sold-out items quickly',
      'Enable location services so nearby customers find you',
      'Offer bundle deals for better margins',
    ],
    quickActions: [
      { label: 'Update Menu', href: '/vendor/menu', icon: '📝' },
      { label: 'Today Orders', href: '/vendor/orders', icon: '📦' },
      { label: 'Location', href: '/vendor/branches', icon: '📍' },
    ],
    dashboardWidgets: ['revenue', 'todayOrders', 'menuItems', 'quickSales'],
  },
  PHARMACY: {
    accountType: 'PHARMACY',
    label: 'Pharmacy Catalog',
    description: 'List medications, health products, and wellness items',
    sampleProducts: [
      { name: 'Paracetamol (pack of 10)', category: 'Pain Relief', price: '₦500' },
      { name: 'Vitamin C 1000mg (30 tabs)', category: 'Vitamins', price: '₦3,500' },
      { name: 'First Aid Kit', category: 'Health Supplies', price: '₦8,000' },
    ],
    tips: [
      'Always include dosage information in descriptions',
      'Mark prescription-only items clearly',
      'Keep stock levels accurate — health products are time-sensitive',
      'Add pharmacy license number to build trust',
    ],
    quickActions: [
      { label: 'Add Product', href: '/vendor/products/new', icon: '💊' },
      { label: 'Orders', href: '/vendor/orders', icon: '📋' },
      { label: 'Inventory', href: '/vendor/inventory', icon: '📊' },
    ],
    dashboardWidgets: ['revenue', 'orders', 'products', 'stockAlerts'],
  },
  SUPERMARKET: {
    accountType: 'SUPERMARKET',
    label: 'Store Departments',
    description: 'Organize your store by departments and categories',
    sampleProducts: [
      { name: 'Indomie Noodles (carton)', category: 'Packaged Foods', price: '₦7,500' },
      { name: 'Peak Milk 400g', category: 'Dairy', price: '₦2,200' },
      { name: 'Golden Penny Flour (2kg)', category: 'Baking', price: '₦3,000' },
    ],
    tips: [
      'Organize products by department for easy browsing',
      'Run weekly promotions to attract repeat customers',
      'Enable bulk order discounts for businesses',
      'Set up multiple branches for wider coverage',
    ],
    quickActions: [
      { label: 'Add Product', href: '/vendor/products/new', icon: '🛒' },
      { label: 'Inventory', href: '/vendor/inventory', icon: '📊' },
      { label: 'Promotions', href: '/vendor/promotions', icon: '🏷️' },
    ],
    dashboardWidgets: ['revenue', 'orders', 'inventory', 'departments'],
  },
  EXPORTER: {
    accountType: 'EXPORTER',
    label: 'Export Documentation',
    description: 'Manage export orders, documentation, and international shipping',
    sampleProducts: [
      { name: 'Dried Hibiscus (1 ton)', category: 'Agricultural', price: '$2,500' },
      { name: 'Shea Butter (500kg)', category: 'Beauty/Health', price: '$3,000' },
      { name: 'Cashew Nuts (1 ton)', category: 'Nuts & Seeds', price: '$4,500' },
    ],
    tips: [
      'Add export certifications to your profile',
      'Set pricing in USD for international buyers',
      'Include MOQ (minimum order quantity) for each product',
      'Upload quality certificates and lab results',
    ],
    quickActions: [
      { label: 'Add Product', href: '/vendor/products/new', icon: '🌍' },
      { label: 'Export Orders', href: '/vendor/orders', icon: '📄' },
      { label: 'Certificates', href: '/vendor/certificates', icon: '📜' },
    ],
    dashboardWidgets: ['revenue', 'orders', 'products', 'countries'],
  },
  SUPPLIER: {
    accountType: 'SUPPLIER',
    label: 'Wholesale Pricing',
    description: 'Set wholesale prices and minimum order quantities',
    sampleProducts: [
      { name: 'Rice (50kg bag x 10)', category: 'Grains', price: '₦350,000' },
      { name: 'Cooking Oil (25L x 20)', category: 'Oils', price: '₦480,000' },
      { name: 'Sugar (50kg x 5)', category: 'Sweeteners', price: '₦200,000' },
    ],
    tips: [
      'Set clear MOQ for bulk buyers',
      'Offer volume discounts for larger orders',
      'Specify delivery timeframes for each product',
      'Connect with logistics providers for reliable shipping',
    ],
    quickActions: [
      { label: 'Add Product', href: '/vendor/products/new', icon: '📦' },
      { label: 'Bulk Orders', href: '/vendor/orders', icon: '🏗️' },
      { label: 'Price Lists', href: '/vendor/products', icon: '💰' },
    ],
    dashboardWidgets: ['revenue', 'orders', 'products', 'topBuyers'],
  },
  DROPSHIPPER: {
    accountType: 'DROPSHIPPER',
    label: 'Product Sourcing',
    description: 'Source and list products from other vendors with your markup',
    sampleProducts: [
      { name: 'Linked Product 1', category: 'Sourced', price: 'Set your price' },
      { name: 'Linked Product 2', category: 'Sourced', price: 'Set your price' },
    ],
    tips: [
      'Browse vendor catalogs to find products to list',
      'Set your markup above the wholesale price',
      'Your listings auto-update when the source changes',
      'Focus on marketing — fulfillment is handled by the vendor',
    ],
    quickActions: [
      { label: 'Browse Products', href: '/products', icon: '🔍' },
      { label: 'My Listings', href: '/vendor/products', icon: '📋' },
      { label: 'Earnings', href: '/vendor/wallet', icon: '💰' },
    ],
    dashboardWidgets: ['revenue', 'linkedListings', 'orders', 'margins'],
  },
  DISTRIBUTOR: {
    accountType: 'DISTRIBUTOR',
    label: 'Distribution Network',
    description: 'Manage your distribution routes and retail customers',
    sampleProducts: [
      { name: 'Distribution Route A (Lagos)', category: 'Routes', price: 'Variable' },
      { name: 'Retail Partner Pack', category: 'Bundles', price: '₦150,000' },
    ],
    tips: [
      'Map your distribution routes for efficient delivery',
      'Set up recurring orders for regular customers',
      'Track stock across all distribution points',
      'Offer credit terms for trusted retailers',
    ],
    quickActions: [
      { label: 'Routes', href: '/vendor/branches', icon: '🗺️' },
      { label: 'Orders', href: '/vendor/orders', icon: '📋' },
      { label: 'Customers', href: '/vendor/storefront', icon: '👥' },
    ],
    dashboardWidgets: ['revenue', 'routes', 'orders', 'retailers'],
  },
  PROCESSOR: {
    accountType: 'PROCESSOR',
    label: 'Processing Capabilities',
    description: 'Showcase your processing services and finished products',
    sampleProducts: [
      { name: 'Processed Garri (50kg)', category: 'Processed Foods', price: '₦15,000' },
      { name: 'Ground Pepper (10kg)', category: 'Spices', price: '₦12,000' },
      { name: 'Packaged Chin-Chin (carton)', category: 'Snacks', price: '₦8,000' },
    ],
    tips: [
      'Show your processing facility and equipment',
      'Get NAFDAC certification for processed foods',
      'Offer private-label processing for other vendors',
      'List both raw materials needed and finished products',
    ],
    quickActions: [
      { label: 'Add Product', href: '/vendor/products/new', icon: '⚙️' },
      { label: 'Orders', href: '/vendor/orders', icon: '📋' },
      { label: 'Certifications', href: '/vendor/certificates', icon: '📜' },
    ],
    dashboardWidgets: ['revenue', 'orders', 'products', 'processing'],
  },
};

/**
 * Get the profile template for an account type.
 * Falls back to a generic template if type not found.
 */
export function getProfileTemplate(accountType: string): ProfileTemplate {
  return PROFILE_TEMPLATES[accountType] || {
    accountType,
    label: 'Your Store',
    description: 'Set up your store and start selling',
    sampleProducts: [],
    tips: ['Add your first product to get started', 'Complete your profile for better visibility'],
    quickActions: [
      { label: 'Add Product', href: '/vendor/products/new', icon: '📦' },
      { label: 'Orders', href: '/vendor/orders', icon: '📋' },
    ],
    dashboardWidgets: ['revenue', 'orders', 'products'],
  };
}
