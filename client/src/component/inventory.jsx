import { useContext } from "react";
import { APIContext } from "./Context";

function Inventory() {
  const { data } = useContext(APIContext);

  if (!data) return <div>Loading...</div>;

  return (
    <>
      <ul>
        {data.map((d) => (
          <li>
            <button>
              <label>Item: {d.item_name}</label>
              <p>Description: {d.description}</p>
              <h3>Quantity: {d.quantity}</h3>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Inventory;
