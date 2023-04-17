import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { RiPencilFill } from "react-icons/ri";
import axios from "axios";
import { BACKEND_URL } from "../App";
import { Ibook } from "../interfaces/book";
import ErrorPage from "./ErrorPage";

type Ireponse = {
  status: number;
  data: {
    message: string;
  };
};

const ViewBookPage = () => {
  const [book, setBook] = useState<Ibook>();
  const [loading, setLoading] = useState<boolean>(true);
  const [response, setResponse] = useState<Ireponse>();
  const { id } = useParams<{ id: string }>();

  const fetchBook = async () => {
    const response = await fetch(`${BACKEND_URL}/book/${id}`);
    const data = await response.json();
    setLoading(false);
    if (response.status !== 200)
      return setResponse({ status: response.status, data });

    setBook(data as Ibook);
  };

  useEffect(() => {
    fetchBook();
  }, []);

  if (response && response.status !== 200) {
    return (
      <ErrorPage status={response.status} message={response.data.message} />
    );
  }

  return (
    <div className="container px-10 py-4 mt-10 rounded-xl bg-slate-400">
      {loading ? (
        <p className="mt-4 mb-6 text-4xl font-black text-white">Loading...</p>
      ) : (
        <>
          <div className="flex items-baseline justify-between">
            <h1 className="mt-4 mb-6 text-4xl font-black text-white">
              {book?.title}
            </h1>
            <Link
              to={`/edit/${id}`}
              className="flex gap-0.5 text-2xl font-bold text-white hover:text-gray-200"
            >
              Edit
              <RiPencilFill className="relative text-[1.5em] bottom-[0.1em]" />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {book &&
              Object.keys(book).map((key: string, index) => (
                <div
                  className="flex flex-col p-4 bg-slate-500 rounded-xl"
                  key={index}
                >
                  <h2 className="mb-2 text-2xl font-bold text-white">{key}</h2>
                  <p className="text-lg font-semibold text-white">
                    {(book as any)[key]}
                  </p>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ViewBookPage;
