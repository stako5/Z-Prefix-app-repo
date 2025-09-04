import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ItemList({ item, quantities }) {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const newItems = item.map((i) => ({
      item_id: i.item_id,
      user_id: i.user_id,
      item_name: i.item_name,
      description: i.description,
      quantity: quantities[i.item_id - 1],
    }));
    setUserList(newItems);
  }, [item, quantities]);

  console.log(userList);

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
