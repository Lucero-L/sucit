"use client";

import { useState } from "react";
import Link from "next/link";
import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/menuitem";
import { NavItem } from "@/src/models/navigation.model";

interface NavbarProps {
  items: NavItem[];
}

export function Navbar({ items }: NavbarProps) {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  // Convertir NavItem de Strapi a MenuItem de PrimeReact
  const mapNavItemToMenuItem = (navItem: NavItem): MenuItem => {
    const menuItem: MenuItem = {
      label: navItem.label,
      icon: undefined,
      command: () => setActiveItem(navItem.documentId),
    };

    // Si es interno, agregar el template con Link
    if (navItem.type === "internal") {
      menuItem.template = (item, options) => (
        <Link
          href={navItem.path}
          className={options.className}
          style={{ textDecoration: "none" }}
        >
          <span className={options.labelClassName}>{item.label}</span>
        </Link>
      );
    } else {
      // Enlace externo
      menuItem.url = navItem.path;
      menuItem.target = "_blank";
    }

    // Procesar hijos recursivamente
    if (navItem.children && navItem.children.length > 0) {
      menuItem.items = navItem.children
        .filter((child) => child.isVisible)
        .sort((a, b) => a.order - b.order)
        .map(mapNavItemToMenuItem);
    }

    return menuItem;
  };

  const menuItems: MenuItem[] = items
    .filter((item) => item.isVisible)
    .sort((a, b) => a.order - b.order)
    .map(mapNavItemToMenuItem);

  return (
    <header>
      {/* Barra superior azul */}
      <div 
        className="flex align-items-center justify-content-start gap-4 px-4 py-2"
        style={{ backgroundColor: "#1e3a5f", color: "white", fontSize: "0.85rem" }}
      >
        <div className="flex align-items-center gap-2">
          <i className="pi pi-phone text-sm"></i>
          <span>593 99 299 8884</span>
        </div>
        <div className="flex align-items-center gap-2">
          <i className="pi pi-envelope text-sm"></i>
          <span>info@iecap.edu.ec</span>
        </div>
      </div>

      {/* Barra de navegación */}
      <div 
        className="flex align-items-center justify-content-between px-4"
        style={{ backgroundColor: "#0d2137", minHeight: "70px" }}
      >
        {/* Logo */}
        <Link href="/" className="flex align-items-center no-underline">
          <div 
            className="flex align-items-center justify-content-center"
            style={{ width: "120px", height: "50px" }}
          >
            {/* Placeholder para logo - reemplazar con Image cuando tengas el logo */}
            <span className="text-2xl font-bold text-white">SUCIT</span>
          </div>
        </Link>

        {/* Menú a la derecha */}
        <div className="navbar-menu">
          <Menubar
            model={menuItems}
            className="border-none p-0"
            style={{ 
              backgroundColor: "transparent",
            }}
          />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
