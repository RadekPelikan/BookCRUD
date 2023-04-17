import React, { MouseEvent, useState } from "react";
import { Ibook } from "../interfaces/book";
import { Link } from "react-router-dom";
import { GiCancel } from "react-icons/gi";
import {RiPencilFill} from "react-icons/ri";
import axios from "axios";
import { BACKEND_URL } from "../App";

const BookCard = (props: Ibook) => {
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const handleDelete = async (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();

    // On firefox axios doesn't work on delete request
    // await axios.delete(`$${BACKEND_URL}/book/${props.id}`);
    await fetch(`${BACKEND_URL}/book/${props.id}`, {
      method: "DELETE",
    });
    setDeleted(true);
  };

  if (deleted) return null;

  return (
    <Link
      to={`/book/${props.id}`}
      className="px-3 py-2 bg-white rounded-xl hover:bg-gray-200"
      onMouseEnter={() => setButtonsVisible(true)}
      onMouseLeave={() => setButtonsVisible(false)}
    >
      <hgroup className="flex items-baseline justify-between">
        <h3 className="text-2xl font-semibold">{props.title}</h3>
        <p className="text-lg text-gray-500 ">{props.year}</p>
      </hgroup>
      <div className="flex items-end justify-between">
        <div>
          <p>{props.author}</p>
          <p>{props.pages} pages</p>
        </div>

        {buttonsVisible && (
          <div className="flex gap-2">
            <Link
              to={`/edit/${props.id}`}
              className="text-3xl text-slate-500 hover:text-cyan-500"
            >
              <RiPencilFill />
            </Link>
            <button
              onClick={handleDelete}
              className="text-3xl text-slate-500 hover:text-red-500"
            >
              <GiCancel />
            </button>
          </div>
        )}
      </div>
    </Link>
  );
};

export default BookCard;
