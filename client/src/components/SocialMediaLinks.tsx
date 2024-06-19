const SocialMediaLinks = () => {
  return (
    <div className="flex flex-row gap-10 p-1">
      <div className="w-10 h-10">
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
      <div className="w-10 h-10">
        <a
          href="https://www.facebook.com/portobellokohtao/"
          target="_blank"
          rel="noopener noreferrer"
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
