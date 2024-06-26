import React, { useEffect, useState } from "react";

interface FoodMenuItem {
  _id: string;
  menuCategory: string;
  pizzaType?: string;
  name: string;
  imageUrl?: string;
  ingredients: string[];
  price: number;
}

const FoodMenuCard: React.FC = () => {
  const [foodItems, setFoodItems] = useState<FoodMenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/v1/foodMenu");
        const text = await response.text();
        console.log("API response text:", text); // Log the raw response text
        const data = JSON.parse(text);
        console.log("API response JSON:", data); // Log the parsed response
        if (Array.isArray(data)) {
          setFoodItems(data);
        } else {
          console.error("API response is not an array:", data);
          setError("Unexpected API response format.");
        }
      } catch (error) {
        console.error("Error fetching food items:", error);
        setError("Error fetching food items.");
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchFoodItems();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (foodItems.length === 0) {
    return <div>No food items found.</div>;
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 justify-center items-center">
      {foodItems.map((food) => (
        <article
          key={food._id}
          className="w-80 h-96 border border-slate-400 rounded-lg p-2 bg-slate-300 bg-opacity-20"
        >
          <div className="w-full h-full flex flex-col">
            {food.imageUrl ? (
              <img
                src={food.imageUrl || "/placeholder.jpg"}
                alt={food.name}
                className="h-3/5 w-full object-cover border border-slate-300 rounded-md"
              />
            ) : (
              <img
                src={food.imageUrl || "/placeholder.jpg"}
                alt="No image available"
                className="h-3/5 w-full object-cover flex border border-slate-300 bg-white items-center justify-center rounded-md text-xl font-cinzel"
              />
            )}

            <div className="flex flex-col justify-center items-center p-3">
              <h2 className="text-lg font-bold">{food.name}</h2>
              <p className="text-sm text-gray-600 text-center">
                {food.ingredients.join(", ")}
              </p>
              <p className="text-lg font-semibold mt-2">${food.price}</p>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
};

export default FoodMenuCard;
