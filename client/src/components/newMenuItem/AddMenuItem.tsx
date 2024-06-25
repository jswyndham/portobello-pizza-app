import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { MENU_CATEGORY } from "../../../../server/src/constants";
import { MEAT_OR_VEG } from "../../../../server/src/constants";

interface FoodMenuFormProps {
  initialData: {
    menuCategory?: string[];
    pizzaType?: string;
    name?: string;
    imageUrl?: string;
    ingredients?: string[];
    price?: number;
  };
}

interface FoodMenuFormData {
  menuCategory: string;
  pizzaType: string;
  name: string;
  imageUrl: string;
  ingredients: string;
  price: number;
}

const AddMenuItem = ({ initialData }: FoodMenuFormProps) => {
  const [foodMenuItem, setFoodMenuItem] = useState({
    menuCategory: initialData.menuCategory || [],
    pizzaType: initialData.pizzaType || "",
    name: initialData.name || "",
    imageUrl: initialData.imageUrl || "",
    ingredients: initialData.ingredients || [""],
    price: initialData.price || 0,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FoodMenuFormData>();

  useEffect(() => {
    console.log(foodMenuItem); // Log the updated state
  }, [foodMenuItem]);

  const onSubmit: SubmitHandler<FoodMenuFormData> = async (data) => {
    try {
      const response = await fetch("/api/foodMenu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log(data);

      if (response.ok) {
        console.log("Menu item created:", await response.json());
        reset();
      } else {
        console.error("Failed to create menu item");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="flex justify-center items-center w-screen sm:w-full h-fit">
      <form
        className="w-11/12 md:w-9/12 lg:w-6/12 2xl:w-4/12 z-10 flex flex-col border shadow-md shadow-slate-400 rounded-lg px-6 py-8 mb-10 bg-slate-50"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label
          htmlFor="menuCategory"
          className="font-handlee-regular text-lg p-2 font-semibold"
        >
          Menu Category
        </label>
        <select
          {...register("menuCategory", { required: true })}
          className="p-3 mb-3 bg-amber-50 drop-shadow-sm rounded-md border border-slate-300"
          defaultValue=""
        >
          <option value="" disabled>
            -- Select --
          </option>
          {Object.values(MENU_CATEGORY).map((category, index) => (
            <option key={index} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
        {errors.menuCategory && (
          <p className="text-md text-red-500">Menu category is required.</p>
        )}

        <label
          htmlFor="pizzaType"
          className="font-handlee-regular text-lg p-2 font-semibold"
        >
          'Meat' or 'Veg'
        </label>
        <select
          {...register("pizzaType")}
          className="p-3 mb-3 bg-amber-50 drop-shadow-sm rounded-md border border-slate-300"
          defaultValue=""
        >
          <option value="" disabled>
            -- Select --
          </option>
          {Object.values(MEAT_OR_VEG).map((category, index) => (
            <option key={index} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>

        <label
          htmlFor="name"
          className="font-handlee-regular text-lg p-2 font-semibold"
        >
          Menu Item Name
        </label>
        <input
          {...register("name", { required: true })}
          placeholder="Enter name..."
          className="p-3 mb-3 bg-amber-50 drop-shadow-sm rounded-md border border-slate-300"
        />
        {errors.name && (
          <p className="text-md text-red-500">Name is required.</p>
        )}

        <label
          htmlFor="imageUrl"
          className="font-handlee-regular text-lg p-2 font-semibold"
        >
          Image URL
        </label>
        <input
          type="file"
          {...register("imageUrl", {
            required: "Image URL is required",
          })}
          placeholder="Find image file"
          className="p-3 mb-3 bg-amber-50 drop-shadow-sm rounded-md border border-slate-300"
          onChange={handleImageUpload}
        />
        {errors.imageUrl && (
          <p className="text-md text-red-500">Image URL is required.</p>
        )}

        {imagePreview && (
          <div className="mb-3">
            <p>Image Preview:</p>
            <img
              src={imagePreview}
              alt="Image Preview"
              className="w-56 h-48 object-cover drop-shadow-lg shadow-md shadow-slate-400 rounded-md"
            />
          </div>
        )}

        <label
          htmlFor="ingredients"
          className="font-handlee-regular text-lg p-2 font-semibold"
        >
          Ingredients
        </label>
        <input
          {...register("ingredients", { required: true })}
          placeholder="Enter ingredients..."
          className="p-3 mb-3 bg-amber-50 drop-shadow-sm rounded-md border border-slate-300"
        />
        {errors.ingredients && (
          <p className="text-md text-red-500">Ingredients are required.</p>
        )}

        <label
          htmlFor="price"
          className="font-handlee-regular text-lg p-2 font-semibold"
        >
          Price
        </label>
        <input
          type="number"
          {...register("price", { required: true })}
          placeholder="Enter price..."
          className="p-3 mb-3 bg-amber-50 drop-shadow-sm rounded-md border border-slate-300"
        />
        {errors.price && (
          <p className="text-md text-red-500">Price is required.</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-11/12 my-3 p-2 mx-auto bg-blue-500 border border-slate-200 text-white text-lg font-bold rounded-lg drop-shadow-lg hover:shadow-lg hover:shadow-slate-400 hover:bg-blue-600 hover:text-slate-100 disabled:shadow-none focus:shadow-md focus:shadow-slate-400 focus:text-slate-200 ${
            isSubmitting ? "opacity-50" : "opacity-100"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </section>
  );
};

export default AddMenuItem;
