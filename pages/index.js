import { useState, useEffect } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    fetch("/api/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  function handleAddUser() {
    if (!name.trim()) return;

    fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    })
      .then(res => res.json())
      .then(newUser => {
        setUsers([...users, newUser]);
        setName("");
      });
  }

  function handleDeleteUser(id) {
    fetch(`/api/users/${id}`, {
      method: "DELETE",
    }).then(() => {
      setUsers(users.filter((u) => u.id !== id));
    });
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-green-600 mb-4">Tailwind działa! 🎉</h1>
      <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
        <span>👤</span> Użytkownicy
      </h2>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Imię użytkownika"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleAddUser}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Dodaj
        </button>
      </div>

      <ul className="space-y-2">
      {users.map((user) => (
        <li
          key={user.id}
          className="bg-white shadow-md border rounded px-4 py-2 flex justify-between items-center"
        >
         <span>{user.name}</span>
        <button
          onClick={() => handleDeleteUser(user.id)}
          className="text-red-500 hover:text-red-700 transition"
        >
        ❌
        </button>
        </li>
      ))}
      </ul>
    </div>
  );
}
