// =========================
// Navigation (menu container)
// =========================
export interface Navigation {
  id: number;
  documentId: string;
  name: string;
  code: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// =========================
// Nav Item (menu + submenu)
// =========================
export interface NavItem {
  id: number;
  documentId: string;

  label: string;
  type: "internal" | "external";
  path: string;

  order: number;
  isVisible: boolean;

  navigation: Navigation;

  parent: NavItem | null;
  children: NavItem[];

  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// =========================
// API Response
// =========================
export interface NavItemsResponse {
  data: NavItem[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
