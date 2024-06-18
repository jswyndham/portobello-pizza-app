const SocialMediaLinks = () => {
  return (
    <div className="flex flex-row gap-28 py-2">
      <div className="w-20 h-20">
        <a
          href="https://www.instagram.com/portobellokohtao/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/images/instagram-50-white-2.png"
            alt="Portobello, Koh Tao Instagram"
          />
        </a>
      </div>
      <div>
        <a
          href="https://www.facebook.com/portobellokohtao/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-4 h-4"
        >
          <img
            src="/images/facebook-50-white.png"
            alt="Portobello, Koh Tao Facebook"
          />
        </a>
      </div>
    </div>
  );
};

export default SocialMediaLinks;
