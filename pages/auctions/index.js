import { useEffect, useState } from "react";
import Link from "next/link";

export default function AuctionList() {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    fetch("/api/auctions")
      .then((res) => res.json())
      .then((data) => setAuctions(data));
  }, []);

  function handleDelete(id) {
    if (!confirm("Czy na pewno chcesz usunąć tę aukcję?")) return;
  
    fetch(`/api/auctions/${id}`, {
      method: "DELETE",
    }).then(() => {
      setAuctions(auctions.filter((a) => a.id !== id));
    });
  }  

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🛍️ Aukcje</h1>
        <Link href="/auctions/new" className="text-blue-600 hover:underline">
          ➕ Dodaj aukcję
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {auctions.map((auction) => (
            <div>
            <Link key={auction.id} href={`/auctions/${auction.id}`} className="block">
            <div className="relative border rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition">
              {auction.image && (
                <img
                  src={auction.image}
                  alt={auction.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold">{auction.title}</h2>
                <p className="text-sm text-gray-500 mb-2">{auction.category}</p>
                <p className="text-lg font-bold text-green-600">
                  {auction.startingPrice} zł
                </p>
                <p className="text-sm mt-2 text-gray-600">{auction.description}</p>
              </div>
            </div>
          </Link>
          
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={() => handleDelete(auction.id)}
              className="text-red-500 hover:text-red-700 text-xl"
              title="Usuń aukcję"
            >
              ❌
            </button>
            <Link
              href={`/auctions/${auction.id}/edit`}
              className="text-blue-500 hover:underline text-sm"
            >
              ✏️ Edytuj
            </Link>
          </div>
          </div>
          
    ))}

    </div>
    </div>
  );
}
