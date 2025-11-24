import { useNavigate } from "react-router-dom";

export default function Nav() {
    const navigate = useNavigate()
    return (
        <div className=" bg-white flex flex-row justify-evenly p-2">
            <h1 className="w-fit px-3 py-2 rounded hover:bg-gray-300 transition"
            onClick={() => navigate('/')}
            >Homepage</h1>
            <h1 className="w-fit px-3 py-2 rounded hover:bg-gray-300 transition"
            onClick={() => navigate('/page1')}
            >My Meals</h1>
            <h1 className="w-fit px-3 py-2 rounded hover:bg-gray-300 transition"
            onClick={() => navigate('/page2')}
            >Grocery List</h1>
            <h1 className="w-fit px-3 py-2 rounded hover:bg-gray-300 transition"
            onClick={() => navigate('/page3')}
            >Ingredients</h1>
        </div>
    )
}