import { Routes, Route, Link } from "react-router-dom";
import { HomePage, EditBookPage, CreateBookPage, ErrorPage, ViewBookPage } from "./pages";

export const BACKEND_URL: string = "http://localhost:3000";

function App() {
  return (
    <div className="grid gap-2 px-4">
      <nav className="container flex justify-between px-10 py-4 mt-10 text-xl font-bold text-white sm:justify-normal gap-14 rounded-xl bg-sky-400">
        <Link to="/" className="hover:text-gray-200">Home</Link>
        <Link to="new" className="hover:text-gray-200">New Book</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="new" element={<CreateBookPage />} />
        <Route path="book/:id" element={<ViewBookPage />} />
        <Route path="edit/:id" element={<EditBookPage />} />
        <Route path=":path" element={<ErrorPage status={404} message="Not found"/>}/>
      </Routes>
    </div>
  );
}

export default App;
