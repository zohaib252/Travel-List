import { useState } from "react";
import "./index.css";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 12, packed: false },
];

export default function App() {
  const [items, setItems] = useState(initialItems); // State for the list

  function addItem(newItem) {
    setItems((prevItems) => [...prevItems, newItem]); // Add new item to the list
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={addItem} />
      <PackingList items={items} />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴Far Away👜</h1>;
}

function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQunatity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    onAddItem(newItem); // Pass the new item to the parent
    setDescription("");
    setQunatity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for trip</h3>
      <select
        value={quantity}
        onChange={(e) => setQunatity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.description} {item.quantity}
      </span>
      <button>❌</button>
    </li>
  );
}

function Stats({ items }) {
  const totalItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const packedPercentage = totalItems
    ? Math.round((packedItems / totalItems) * 100)
    : 0;

  return (
    <footer className="stats">
      <em>
        You have {totalItems} item(s) in your list, and you already packed{" "}
        {packedItems} ({packedPercentage}%)
      </em>
    </footer>
  );
}
