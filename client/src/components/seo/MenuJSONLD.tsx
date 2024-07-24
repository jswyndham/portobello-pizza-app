import { FC } from "react";
import { MenuSection } from "../../types/seoInterface";

interface MenuJSONLDProps {
  menuItems: MenuSection[];
}

const MenuJSONLD: FC<MenuJSONLDProps> = ({ menuItems }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: "Menu at Porto Bello, Koh Tao Thailand",
    description:
      "Explore our menu of Italian and Mediterranean cuisine, including pizza, pasta, calzone, and main dishes. Also, check out our original cocktail list on Koh Tao Island",
    hasMenuSection: menuItems
      .filter((section) => section.items.length > 0)
      .map((section) => ({
        "@type": "MenuSection",
        name: section.sectionName,
        hasMenuItem: section.items.map((item) => ({
          "@type": "MenuItem",
          name: item.name,
          description: item.description,
          offers: {
            "@type": "Offer",
            price: item.price,
            priceCurrency: item.currency,
          },
          additionalType: item.additionalType, // Include this if needed
        })),
      })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default MenuJSONLD;
