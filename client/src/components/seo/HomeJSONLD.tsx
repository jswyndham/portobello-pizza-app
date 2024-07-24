import { FC } from "react";

export interface HomeJSONLDProps {
  name: string;
  address: {
    streetAddress: string;
    imagePath: string;
  };
  telephone: string;
  url: string;
  openingHours: string;
}

const HomeJSONLD: FC<HomeJSONLDProps> = ({
  name,
  address,
  telephone,
  url,
  openingHours,
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BarOrPub",
    name: "Porto Bello",
    description: `${name} is a Koh Tao restaurant, which offers Italian cuisine and a selection of drinks including original cocktails. Located on Koh Tao Island Thailand.`,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.streetAddress,
      addressLocality: "Ban Koh Tao",
      addressRegion: "Surat Thani",
      postalCode: "288-201",
      addressCountry: "Thailand",
    },
    telephone: telephone,
    url: url,
    openingHoursSpecification: openingHours,
    sameAs: [
      "https://www.facebook.com/portobellokohtao/",
      "https://www.instagram.com/portobellokohtao/",
    ],
    image: address.imagePath,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default HomeJSONLD;
