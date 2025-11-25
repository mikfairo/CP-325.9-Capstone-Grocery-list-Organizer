import Nav from "../components/Nav";
import "../index.css";
import { useLocation } from "react-router-dom";

export default function GroceryListPage() {
  const { state } = useLocation();

  return (
    <div className="bg-blue-100 w-full h-full p-4">
      <h1 className="text-black text-5xl text-center front-extrabold mb-6">
        Grocery List
      </h1>
      <br />
      <Nav />

      <div className="p-4">
        {state ? (
          <>
            <div className="bg-white m-4 p-6 rounded shadow w-1/2 place-self-center">
              <table className="w-full text-center text-lg">
                <thead>
                  <tr className="text-gray-600">
                    <th className="py-2">Ingredient</th>
                    <th className="py-2">Quantity</th>
                    <th className="py-2">Measurement</th>
                  </tr>
                </thead>

                <tbody>
                  {state.list.map((grocery, index) => (
                    <tr key={index} className="border-t">
                      <td className="py-3 w-1/3">{grocery.name}</td>
                      <td className="py-3 w-1/3">{grocery.quantity}</td>
                      <td className="py-3 w-1/3">{grocery.measurement}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h1 className="text-center text-4xl mt-20">Please Save Your Grocery List Before Leaving This Page</h1>
          </>
        ) : (
          <div className="bg-white m-4 p-4 rounded shadow text-center text-lg">
            Generate a new Grocery List from the My Recipes page!
          </div>
        )}
      </div>
    </div>
  );
}
