import { useState } from "react";
import { useRouter } from "next/router";

export default function NewAuction() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    startingPrice: "",
    category: "",
    image: "",
    userId: 1,
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleFileChange(e) {
    const f = e.target.files[0];
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  async function handleUpload() {
    const data = new FormData();
    data.append("file", file);

    const res = await fetch("/api/auctions/upload", {
      method: "POST",
      body: data,
    });
    const json = await res.json();
    return json.imageUrl;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let imageUrl = form.image;
    if (file) {
      imageUrl = await handleUpload();
    }

    const res = await fetch("/api/auctions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, image: imageUrl }),
    });

    if (res.ok) {
      router.push("/");
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📦 Dodaj nową aukcję</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Tytuł"
          value={form.title}
          onChange={handleChange}
          className="w-full border rounded px-4 py-2"
          required
        />
        <textarea
          name="description"
          placeholder="Opis"
          value={form.description}
          onChange={handleChange}
          className="w-full border rounded px-4 py-2"
        />
        <input
          type="number"
          name="startingPrice"
          placeholder="Cena startowa"
          value={form.startingPrice}
          onChange={handleChange}
          className="w-full border rounded px-4 py-2"
        />
        <input
          type="text"
          name="category"
          placeholder="Kategoria"
          value={form.category}
          onChange={handleChange}
          className="w-full border rounded px-4 py-2"
        />
        <input type="file" onChange={handleFileChange} className="w-full" />
        {preview && (
          <img
            src={preview}
            alt="Podgląd"
            className="w-full h-60 object-cover rounded shadow-md"
          />
        )}
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          Dodaj aukcję
        </button>
      </form>
    </div>
  );
}
