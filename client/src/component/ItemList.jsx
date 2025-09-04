import { Link } from "react-router-dom";
import { useContext } from "react";
import { APIContext } from "./Context.jsx";

function ItemList() {
  const { userList } = useContext(APIContext);

  return (
    <>
      <h1>Items list</h1>
      <ul>
        {userList.map((i) => (
          <li key={i.item_id}>
            <Link to={`/items/${i.item_id}`}>
              <button>
                <label>Item: {i.item_name}</label>
                <p>Description: {i.description}</p>
                <h3>Quantity: {i.quantity}</h3>
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ItemList;
