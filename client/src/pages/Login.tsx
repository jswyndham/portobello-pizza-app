import { useState } from "react";
import logo from "/images/portobello-logo-square.png";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginData } from "../types/loginInterface";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>();

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    try {
      const response = await fetch("http://localhost:5001/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
        }),
      });
      console.log(data);

      if (response.ok) {
        console.log("User logged in:", await response.json());
        reset();
      } else {
        console.error("Failed to login user");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <section className="flex flex-row justify-center align-middle h-full w-screen bg-third">
      <img
        src={logo}
        alt="Portobello logo"
        className="hidden lg:flex lg:bg-contain"
      />
      <article className="flex flex-col justify-start bg-white pl-4 align-middle lg:min-w-1/2 h-fit rounded-xl">
        <div className="m-6 h-12 w-44">
          <img src={logo} alt="Portobello logo" />
        </div>
        <div className="flex items-center align-middle w-fit">
          <form onSubmit={handleSubmit(onSubmit)} className="w-fit p-8 md:p-16">
            {/* EMAIL */}
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="font-montserrat text-lg p-2 font-semibold"
              >
                email
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                name="email"
                placeholder="email"
                value={formData.email}
              />
            </div>

            {/* PASSWORD */}
            <input
              {...register("email", { required: true })}
              type="password"
              placeholder="password"
              value={formData.password}
            />

            {/* BUTTON */}
            <div className="flex flex-col justify-center w-fit">
              <button
                type="submit"
                disabled={isSubmitting}
                className="h-8 w-96 mt-10 mb-4 bg-white text-secondary font-bold border-solid border-2 border-secondary rounded-lg drop-shadow-lg hover:bg-secondary hover:text-white hover:font-bold hover:shadow-2xl hover:drop-shadow-xl active:shadow-sm active:bg-third"
              >
                {isSubmitting ? "submitting..." : "login"}
              </button>
              {errors && (
                <p style={{ color: "red" }}>
                  There has been an error while trying to login
                </p>
              )}
              <div className="flex flex-row justify-center mt-6"></div>
            </div>
          </form>
        </div>
      </article>
    </section>
  );
};

export default Login;
