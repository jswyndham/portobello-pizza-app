import { menuCategories } from "../../data/menuCategories";
import { Link } from "react-router-dom";

function MenuCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 justify-center">
      {menuCategories.map((category) => (
        <Link to={category.link} key={category.title} className="block w-full">
          <div className="relative w-full h-48 xl:h-72 border border-primary rounded-lg shadow-lg drop-shadow-lg overflow-hidden">
            <img
              src={category.imageUrl}
              alt={category.title}
              className="w-full h-full object-cover rounded-lg transition-transform duration-300 ease-in-out hover:scale-110 hover:rotate-1"
            />
            <div className="absolute w-full h-48 z-10 top-0 p-4 bg-slate-700 bg-opacity-30">
              <h2 className="text-3xl font-semibold text-white">
                {category.title}
              </h2>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default MenuCards;
