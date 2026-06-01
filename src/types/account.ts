/**
 * Account types supported by the platform.
 * Mirrors the shared AccountType enum for frontend use.
 */
export enum AccountType {
  FARMER = 'FARMER',
  EXPORTER = 'EXPORTER',
  SUPPLIER = 'SUPPLIER',
  DISTRIBUTOR = 'DISTRIBUTOR',
  PROCESSOR = 'PROCESSOR',
  STREET_KIOSK = 'STREET_KIOSK',
  SUPERMARKET = 'SUPERMARKET',
  DROPSHIPPER = 'DROPSHIPPER',
  CUSTOMER = 'CUSTOMER',
  LOGISTICS_PROVIDER = 'LOGISTICS_PROVIDER',
  ADMIN = 'ADMIN',
}

/** Navigation item definition */
export interface NavItem {
  label: string;
  href: string;
  icon: string;
}

/** Account-type-specific navigation configuration */
export interface AccountNavConfig {
  accountType: AccountType;
  label: string;
  primaryNav: NavItem[];
  sidebarSections: SidebarSection[];
}

/** Sidebar section grouping */
export interface SidebarSection {
  title: string;
  items: NavItem[];
}
