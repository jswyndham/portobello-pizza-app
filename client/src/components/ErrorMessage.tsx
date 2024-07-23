import { FC } from "react";

interface ErrorMessageProps {
  errorMessage: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ errorMessage }) => {
  return (
    <section className="w-screen h-screen bg-main-gradient-two">
      <article className="w-full h-full flex justify-center items-center">
        <div className="h-72 w-full p-8 mx-3 flex justify-center items-center text-center border-2 border-slate-300 bg-slate-200 text-xl text-primary font-montserrat rounded-lg drop-shadow-lg shadow-lg shadow-slate-300">
          {errorMessage}
        </div>
      </article>
    </section>
  );
};

export default ErrorMessage;
