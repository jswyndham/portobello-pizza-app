import italianRestaurant from "/images/italian-restaurant.jpg";
import pastaPic from "/images/pasta.jpg";

const AboutUs = () => {
  return (
    <article className="h-fit w-full p-1 lg:p-14 2xl:px-32 2xl:py-12 flex flex-col justify-center items-center">
      <div className=" w-full mb-6 mt-12 border-t-2 border-b-2 border-forth text-center">
        <h2 className="text-3xl lg:text-4xl 2xl:text-5xl py-3 lg:px-24 font-cinzel">
          Porto Bello - About Us
        </h2>
      </div>
      <div className="h-fit flex flex-col lg:flex-row w-full 2xl:w-11/12 3xl:w-8/12 items-center mx-1 my-4 lg:mb-16 lg:mt-8 lg:mx-6 ">
        <div className="my-2 lg:my-0 lg:mr-4 ">
          <img
            src={italianRestaurant}
            alt="Welcome to Portobello"
            className="rounded-md"
          />
        </div>
        <div className="flex flex-col w-fit bg-slate-300 bg-opacity-30 lg:bg-opacity-30 px-1 pb-4 lg:p-4 rounded-md">
          <h3 className="text-2xl lg:text-4xl font-cinzel mx-2 lg:mx-16 pt-6 pb-3 lg:py-6">
            Welcome to Portobello!
          </h3>
          <p className="w-full mx-3 lg:ml-6 text-sans text-xl text-forth tracking-wide lg:tracking-wider p-2 font-montserrat">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row-reverse w-full 2xl:w-11/12 3xl:w-8/12 rounded-xl mx-1 my-4">
        <div className="my-2 lg:my-0 ml-4">
          <img
            src={pastaPic}
            alt="Italian Cuisine on the Thai Island of Koh Toa"
            className="rounded-md w-96"
          />
        </div>
        <div className="flex flex-col w-fit mb-8 bg-slate-300 bg-opacity-30 px-1 pb-4 rounded-md">
          <h3 className="text-2xl lg:text-4xl font-cinzel mx-2 lg:mx-16 pt-6 pb-3 pl-3 lg:py-6">
            Italian Cuisine on the Thai Island of Koh Toa
          </h3>
          <p className="w-11/12 mx-3 lg:mx-16 font-sans text-xl text-forth tracking-wide lg:tracking-wider p-2 font-montserrat">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
      </div>
    </article>
  );
};

export default AboutUs;
