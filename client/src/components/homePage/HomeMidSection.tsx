import MenuCards from "./MenuCards";

function HomeMidSection() {
  return (
    <article className="w-full h-fit flex justify-center bg-gradient-to-b from-third via-secondary to-white">
      <div className="w-10/12">
        <h1 className="text-3xl lg:text-4xl p-8 lg:px-24 lg:pt-20 font-bold font-noto-serif-display text-red-600">
          Choose from Porto Bello's menu categories...
        </h1>
        <div className="p-2 lg:p-12 2xl:px-32 2xl:py-16">
          <MenuCards />
        </div>
      </div>
    </article>
  );
}

export default HomeMidSection;
