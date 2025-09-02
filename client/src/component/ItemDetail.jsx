import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/items/${id}`)
      .then((res) => res.json())
      .then((d) => setItem(d));
  }, []);

  return (
    <>
      <ul>
        {item.map((i) => (
          <li>
            <label>Item: {item_name}</label>
            <p>Discription: {i.description}</p>
            <h4>Quantity: {i.quantity}</h4>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ItemDetail;
