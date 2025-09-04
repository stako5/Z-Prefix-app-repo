import { useContext, useEffect, useState } from "react";
import { APIContext } from "./Context";
import { Link, useNavigate } from "react-router-dom";

import ItemList from "./ItemList";

function Inventory() {
  const { data, setData, quantities, setQuantities } = useContext(APIContext);
  const navigate = useNavigate();

  if (!data) return <div>Loading...</div>;

  const [listItem, setListItem] = useState([]);

  useEffect(() => {
    if (data) {
      setQuantities(data.map((d) => Number(d.quantity)));
    }
  }, [data]);

  function handleUpdate(item, newQuantity) {
    fetch(`http://localhost:8000/items/${item.item_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: newQuantity }),
    })
      .then((res) => res.json())
      .then((update) => {
        setData((arr) =>
          arr.map((d) =>
            d.item_id === item.item_id ? { ...d, quantity: update.quantity } : d
          )
        );
      });
  }

  function handleAdd(i) {
    const add = quantities.slice();
    add[i] = add[i] + 1;
    setQuantities(add);
    handleUpdate(data[i], add[i]);
  }

  function handleSubtract(i) {
    const sub = quantities.slice();
    if (sub[i] > 0) sub[i] = sub[i] - 1;
    setQuantities(sub);
    handleUpdate(data[i], sub[i]);
  }

  function handleListItem(newItem) {
    setListItem((arr) => {
      if (arr.find((d) => d.item_id === newItem.item_id)) {
        return arr;
      }
      return arr.concat([newItem]);
    });
  }

  function handleDelete(item) {
    fetch(`http://localhost:8000/items/${item.item_id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        setData((arr) => arr.filter((d) => d.item_id !== item.item_id));
      }
      console.log({ deleted: item.item_name });
    });
  }

  return (
    <>
      <div className="body">
        <div className="container">
          <button onClick={() => navigate("/items/newItem")} className="btn">
            ADD
          </button>
          <ul className="item-list">
            {data.map((d, i) => (
              <li key={d.item_id} className="item-card">
                <Link to={`/items/${d.item_id}`}>
                  <button>
                    <label>Item: {d.item_name}</label>
                    <p>Description: {d.description}</p>
                  </button>
                </Link>
                <h3 className="quantity">Quantity: {quantities[i]}</h3>
                <button onClick={() => handleAdd(i)}>+</button>
                <button onClick={() => handleSubtract(i)}>-</button>
                <button onClick={() => handleListItem(d)}>ADD to list</button>
                <button onClick={() => handleDelete(d)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <ItemList
            item={listItem}
            quantities={quantities}
            data={data}
          ></ItemList>
        </div>
      </div>
    </>
  );
}

export default Inventory;
