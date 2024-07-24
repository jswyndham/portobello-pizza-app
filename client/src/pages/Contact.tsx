import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import AccessJSONLD from "../components/seo/AccessJSONLD";

const Contact = () => {
  const [animationTriggered, setAnimationTriggered] = useState(false);

  useEffect(() => {
    setAnimationTriggered(true);
  }, []);

  return (
    <>
      <Helmet>
        <title>Contact Us - Portobello, Koh Tao</title>
        <meta
          name="description"
          content="Contact Portobello, the best Koh Tao restaurant for Italian and Mediterranean cuisine. Find our location, contact information, and opening hours."
        />
        <link rel="canonical" href="https://www.portobello.com/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Contact Us - Portobello, Koh Tao" />
        <meta
          property="og:description"
          content="Contact Portobello, the best Koh Tao restaurant for Italian and Mediterranean cuisine. Find our location, contact information, and opening hours."
        />
        <meta property="og:url" content="https://www.portobello.com/contact" />
        <meta
          property="og:image"
          content="./images/portobello-logo-round-black.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us - Portobello, Koh Tao" />
        <meta
          name="twitter:description"
          content="Contact Portobello, the best Koh Tao restaurant for Italian and Mediterranean cuisine. Find our location, contact information, and opening hours."
        />
      </Helmet>

      {/* JSON-LD - SEO */}
      <AccessJSONLD
        name="Portobello, Koh Tao"
        address={{
          streetAddress: "Sai Ree Road, Ban Koh Tao, Thailand, Surat Thani",
          imagePath: "/images/portobello-logo-round-black.png",
        }}
        telephone="+66 77 457 029"
        url="https://www.portobello.com/"
        latitude="10.099187716862039"
        longitude="99.82905053111142"
      />

      <section className="contact-section">
        <h1>Contact Us</h1>
        <p>
          Visit us at Sai Ree Road, Ban Koh Tao, Thailand, Surat Thani. Call us
          at +66 77 457 029 or email us at info@portobello.com. We are open
          daily from 16:00 to 22:30.
        </p>
      </section>
    </>
  );
};

export default Contact;
