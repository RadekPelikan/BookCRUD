import React, { SyntheticEvent, useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../App";
import { Link } from "react-router-dom";

type Istatus = {
  state: "error" | "success";
  message: string;
  id?: string;
};

const CreatePage = () => {
  const [status, setStatus] = useState<Istatus>();
  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);
  const pagesRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    const title = titleRef.current?.value;
    const author = authorRef.current?.value;
    const year = yearRef.current?.value;
    const pages = pagesRef.current?.value;

    if (!title || !author || !year || !pages)
      return setStatus({ state: "error", message: "Please fill all fields" });

    if (title.length < 3)
      return setStatus({
        state: "error",
        message: "Title least 3 characters",
      });

    if (isNaN(+year))
      return setStatus({ state: "error", message: "Year must be a number" });

    if (isNaN(+pages))
      return setStatus({ state: "error", message: "Pages must be a number" });

    titleRef.current!.value = "";
    authorRef.current!.value = "";
    yearRef.current!.value = "";
    pagesRef.current!.value = "";

    const response = await axios.post(`${BACKEND_URL}/book`, {
      title,
      author,
      year: +year,
      pages: +pages,
    });
    const {_id} = response.data;

    setStatus({ state: "success", message: "Book created successfully", id: _id });

    setTimeout(() => {
      setStatus(undefined);
    }, 5000);
  };

  return (
    <>
      <div className="container px-10 py-4 mt-10 rounded-xl bg-slate-400">
        <h1 className="mt-4 mb-6 text-4xl font-black text-center text-white sm:text-left">
          Create new book
        </h1>
        <form
          action="#"
          className="grid gap-x-8 gap-y-2 md:grid-cols-3"
          onSubmit={handleSubmit}
        >
          <div className="grid">
            <label className="text-lg font-semibold text-white">Title</label>
            <input
              type="text"
              className="px-2 py-1 font-semibold text-gray-800 rounded outline-none"
              ref={titleRef}
            />
          </div>
          <div className="grid">
            <label className="text-lg font-semibold text-white">Author</label>
            <input
              type="text"
              className="px-2 py-1 font-semibold text-gray-800 rounded outline-none"
              ref={authorRef}
            />
          </div>
          <div className="grid md:row-start-2">
            <label className="text-lg font-semibold text-white">Year</label>
            <input
              type="text"
              className="px-2 py-1 font-semibold text-gray-800 rounded outline-none"
              ref={yearRef}
            />
          </div>
          <div className="grid md:row-start-3">
            <label className="text-lg font-semibold text-white">
              Number of Pages
            </label>
            <input
              type="text"
              className="px-2 py-1 font-semibold text-gray-800 rounded outline-none"
              ref={pagesRef}
            />
          </div>
          <div className="grid md:grid-rows-2 md:row-start-2 md:col-start-2">
            <p
              className={`row-start-2 font-bold text-white rounded grid place-items-center
            ${status?.state === "error" && "bg-red-500"}
            ${status?.state === "success" && "bg-green-500"}
            `}
            >
              <span className="py-1">{status?.message}</span>
            </p>
          </div>
          {status?.state === "success" && (
            <div className="grid mt-2 md:grid-rows-2 md:row-start-3 md:col-start-2">
              <Link to={`/book/${status.id}`} className="font-bold text-center text-white rounded bg-sky-400 hover:bg-sky-500">
                View Book
              </Link>
            </div>
          )}

          <div className="grid mt-2 md:grid-rows-2 md:mt-0">
            <button
              type="submit"
              className="row-start-2 py-2 font-bold text-white rounded md:py-0 md:mx-8 bg-sky-400 hover:bg-sky-500"
            >
              Create new
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreatePage;
