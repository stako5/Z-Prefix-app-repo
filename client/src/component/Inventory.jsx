import { useContext, useEffect, useState } from "react";
import { APIContext } from "./Context";
import { Link } from "react-router-dom";

import ItemList from "./ItemList";

function Inventory() {
  const { data, quantities, setQuantities, user, addToList } =
    useContext(APIContext);

  if (!data) return <div>Loading...</div>;

  const [listItem, setListItem] = useState([]);

  useEffect(() => {
    if (data && quantities.length !== data.length) {
      setQuantities(data.map((d) => Number(d.quantity)));
    }
  }, [data]);

  function handleQuantities() {
    data.forEach((d, i) => {
      fetch(`http://localhost:8000/items/${d.item_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: quantities[i] }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Data submitted", data);
        });
    });
  }

  function handleAdd(i) {
    const add = quantities.slice();
    add[i] = add[i] + 1;
    setQuantities(add);
    handleQuantities(data[i].item_id, add[i]);
  }

  function handleSubtract(i) {
    const sub = quantities.slice();
    if (sub[i] > 0) sub[i] = sub[i] - 1;
    setQuantities(sub);
    handleQuantities(data[i].item_id, add[i]);
  }

  function handleListItem(newItem) {
    setListItem((arr) => {
      if (arr.find((d) => d.item_id === newItem.item_id)) {
        return arr;
      }
      return arr.concat([newItem]);
    });
  }

  console.log(quantities);

  return (
    <>
      <div className="body">
        <div className="container">
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
