import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { APIContext } from "./Context";

function NewItem() {
  const navigate = useNavigate();
  const { reFetch } = useContext(APIContext);

  async function handleNewItem(event) {
    event.preventDefault();
    const form = event.target;
    const item = {
      item_name: form.item.value,
      description: form.description.value,
      quantity: Number(form.quantity.value) || 0,
    };

    await fetch(`http://localhost:8000/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    })
      .then((res) => {
        res.json();
        reFetch();
      })
      .then(navigate("/"))
      .catch((err) => console.error("failed", err));
  }

  return (
    <>
      <header>
        <h1>Inventory Manager</h1>
        <nav>
          <button onClick={() => navigate("/")} className="btn">
            Home
          </button>
          <button onClick={() => navigate("/login")} className="btn">
            Login
          </button>
        </nav>
      </header>
      <div>
        <form onSubmit={handleNewItem}>
          <label>Item</label>
          <input type="text" name="item" />
          <label>Description</label>
          <input type="text" name="description" />
          <label>Quantity</label>
          <input type="text" name="quantity" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default NewItem;
