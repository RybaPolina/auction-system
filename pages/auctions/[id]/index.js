import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Winner from "@/components/Winner";

export default function AuctionPage() {
  const router = useRouter();
  const { id } = router.query;

  const [auction, setAuction] = useState(null);
  const [bids, setBids] = useState([]);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    fetch(`/api/auctions/${id}`)
      .then((res) => res.json())
      .then((data) => setAuction(data));

    fetch(`/api/bids?auctionId=${id}`)
      .then((res) => res.json())
      .then((data) => setBids(data));
  }, [id]);

  function handleBidSubmit(e) {
    e.preventDefault();
    setError("");
  
    const highestBid = bids.length > 0 ? bids[0].amount : auction.startingPrice;
  
    if (parseFloat(amount) <= highestBid) {
      setError("Oferta musi być wyższa niż aktualna!");
      return;
    }
  
    fetch("/api/bids", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        auctionId: parseInt(id),
        userId: 1,
        amount: parseFloat(amount),
      }),
    })
      .then((res) => res.json())
      .then((newBid) => {
        setBids([newBid, ...bids]);
        setAmount("");
      });
  }

  if (!auction) return <p className="text-center p-6">Ładowanie aukcji...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">{auction.title}</h1>
      {auction.image && (
        <img
          src={auction.image}
          alt={auction.title}
          className="w-full h-64 object-cover rounded-md shadow"
        />
      )}
      <p className="text-gray-600">{auction.description}</p>
      <p className="font-semibold text-green-700 text-xl">
        Cena wywoławcza: {auction.startingPrice} zł
      </p>
      <p className="text-sm text-gray-400">Kategoria: {auction.category}</p>

      <form onSubmit={handleBidSubmit} className="flex gap-4">
        <input
          type="number"
          min={auction.startingPrice}
          placeholder="Twoja oferta"
          className="border px-4 py-2 rounded w-full"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Licytuj
        </button>
      </form>

      <div>
        {error && (
            <p className="text-red-600 text-sm font-medium mt-2">{error}</p>
        )}
        <h2 className="text-xl font-semibold mt-6 mb-2">💬 Ostatnie oferty</h2>
        <ul className="divide-y divide-gray-200">
            {bids.length === 0 && (
            <li className="text-gray-400">Brak ofert jeszcze 😢</li>
            )}
            {bids.map((bid, index) => {
                const isTop = index === 0;
                return (
                    <li
                        key={bid.id}
                        className={`py-2 text-sm flex justify-between items-center ${
                        isTop ? "bg-green-100 font-bold text-green-800 px-3 rounded" : ""
            }`}
        >
            💰 {bid.amount} zł — użytkownik #{bid.userId}
            <span className="text-xs text-gray-400 ml-4">
                {new Date(bid.timestamp).toLocaleString()}
            </span>
            {isTop && <span className="ml-2 text-green-600 text-xs">🔥 najwyższa</span>}
            </li>
            );
            })}
        </ul>
        {!auction.ended ? (
            <button
                onClick={() => {
                    fetch(`/api/auctions/${id}/end`, { method: "POST" })
                    .then((res) => res.json())
                    .then(() => setAuction({ ...auction, ended: 1 }));
                }}
                 className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
            Zakończ aukcję
             </button>
            ) : (
                <div className="mt-6 p-4 border rounded bg-yellow-100">
                    <h2 className="text-lg font-semibold mb-2">🏁 Aukcja zakończona</h2>
                    <Winner auctionId={id} />
                </div>
            )}
      </div>
    </div>
  );
}
