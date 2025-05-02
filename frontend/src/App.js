import React, { useEffect, useState } from "react";
import axios from "axios";

const api = "http://localhost:5000/api/Contacts";

function App() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    isFavorite: false,
  });

  const fetchContacts = async () => {
    const res = await axios.get(api);
    setContacts(res.data);
  };

  const addContact = async () => {
    await axios.post(api, form);
    setForm({ fullName: "", email: "", phone: "", isFavorite: false });
    fetchContacts();
  };

  const deleteContact = async (id) => {
    await axios.delete(`${api}/${id}`);
    fetchContacts();
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Contact List Manager</h1>
      <div style={{ marginBottom: "1rem" }}>
        <input
          placeholder="Full Name"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <label>
          <input
            type="checkbox"
            checked={form.isFavorite}
            onChange={(e) => setForm({ ...form, isFavorite: e.target.checked })}
          />
          Favorite
        </label>
        <button onClick={addContact}>Add Contact</button>
      </div>

      <ul>
        {contacts.map((c) => (
          <li key={c.id}>
            <strong>{c.fullName}</strong> – {c.email} – {c.phone}{" "}
            {c.isFavorite && <span>⭐</span>}
            <button onClick={() => deleteContact(c.id)}>❌ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
