import { useEffect, useState } from "react";

export default function Winner({ auctionId }) {
  const [winner, setWinner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/auctions/${auctionId}/winner`)
      .then((res) => res.json())
      .then((data) => {
        setWinner(data);
        setLoading(false);
      });
  }, [auctionId]);

  if (loading) return null; // lub <p>Ładowanie...</p>
  if (!winner || !winner.userId) return <p>Brak zwycięzcy 😢</p>;

  return (
    <p>
      Zwycięzca: <strong>Użytkownik #{winner.userId}</strong> z ofertą{" "}
      <strong>{winner.amount} zł</strong>
    </p>
  );
}

