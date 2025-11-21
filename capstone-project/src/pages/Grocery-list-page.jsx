import Nav from "../components/Nav";
import "../index.css";

export default function GroceryListPage() {
  return (
    <div className="bg-blue-100 w-full h-full">
          <h1 className="text-black text-5xl text-center front-extrabold">
            Grocery List
          </h1>
          <br />
          <Nav/>
    </div>
  )
};