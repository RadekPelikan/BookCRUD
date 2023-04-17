import React, { useEffect, useState, MouseEvent } from "react";
import axios from "axios";
import { BACKEND_URL } from "../App";
import { Ibook } from "../interfaces/book";
import BookCard from "../components/BookCard";

const HomePage = () => {
  const [books, setBooks] = useState<Ibook[]>([]);
  const [sure, setSure] = useState<boolean>(false);

  const fetchBooks = async () => {
    const response = await axios.get(`${BACKEND_URL}/book`);
    const books = response.data;
    books.forEach((book: any) => (book.id = book._id));

    setBooks(books as Ibook[]);
  };

  const handleDeleteAll = async (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (!sure) return setSure(true);
    await axios.delete(`${BACKEND_URL}/book`);
    fetchBooks();
    setSure(false);
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="container px-10 py-4 mt-10 rounded-xl bg-slate-400">
      <div className="flex flex-col items-baseline justify-between sm:flex-row">
        <h1 className="mt-4 mb-6 text-4xl font-black text-white">
          List of all books
        </h1>
        <button
        onClick={handleDeleteAll}
         className="w-56 py-2 mx-auto mb-8 font-bold text-center text-white bg-red-400 rounded sm:mb-0 sm:mx-0 hover:bg-red-500 ">
          {sure ? "Are you sure?" : "Delete all"}
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {books?.map((book, index) => (
          <BookCard {...book} key={index} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
