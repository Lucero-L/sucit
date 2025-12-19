import { NavItemsResponse, NavItem } from "@/src/models/navigation.model";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN || "";

export async function getMainMenu(): Promise<NavItem[]> {
  const res = await fetch(
    `${STRAPI_URL}/api/nav-items?filters[navigation][code][$eq]=main&filters[parent][$null]=true&sort=order:asc&populate=*`,
    {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    console.error("Error fetching menu:", res.status);
    return [];
  }

  const json: NavItemsResponse = await res.json();
  return json.data;
}

export async function getNavItemsByCode(code: string): Promise<NavItem[]> {
  const res = await fetch(
    `${STRAPI_URL}/api/nav-items?filters[navigation][code][$eq]=${code}&filters[parent][$null]=true&sort=order:asc&populate=*`,
    {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    console.error("Error fetching navigation:", res.status);
    return [];
  }

  const json: NavItemsResponse = await res.json();
  return json.data;
}
