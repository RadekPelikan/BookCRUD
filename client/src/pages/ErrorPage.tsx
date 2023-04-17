import React from "react";

type IErrorPageProps = {
  status?: number;
  message?: string;
};

const ErrorPage = (props: IErrorPageProps) => {
  return (
    <div className="container px-10 py-4 mt-10 rounded-xl bg-slate-400">
      <p className="mt-4 mb-6 text-4xl font-black text-center text-red-500 pb-[20rem]">
        {props.status} - {props.message}
      </p>
    </div>
  );
};

export default ErrorPage;
