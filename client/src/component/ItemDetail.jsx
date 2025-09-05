import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { APIContext } from "./Context";

function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { quantities } = useContext(APIContext);

  const [item, setItem] = useState([]);

  // need to find a better way to match the quantities from intentory.jsx to the param fetch. Create Utils function to trigger comparisons of quantites[index] to data.item_id
  useEffect(() => {
    fetch(`http://localhost:8000/items/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const details = {
          item_name: data.item_name,
          description: data.description,
          quantity: quantities[data.item_id - 1],
        };
        setItem(details);
      })
      .catch((err) => console.error(err));
  }, []);

  console.log(item);

  if (!item) return <div>Loading....</div>;

  console.log(item);
  return (
    <>
      <header>
        <h1>Inventory Manager</h1>
        <nav>
          <button onClick={() => navigate("/")} className="btn">
            Home
          </button>
        </nav>
      </header>
      <main>
        <label>Item: {item.item_name}</label>
        <p>Discription: {item.description}</p>
        <h4>Quantity: {item.quantity}</h4>
      </main>
    </>
  );
}

export default ItemDetail;
