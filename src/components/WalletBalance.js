import React, { useEffect, useState } from "react";
import { apiService } from "../utils/api";
import { FaWallet } from "react-icons/fa";

const WalletBalance = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const res = await apiService.get("/api/my_wallet");
        const data = res?.data || res;
        setBalance(data?.balance || 0);
      } catch (err) {
        console.error("Error fetching wallet:", err);
      }
    };
    fetchWallet();
  }, []);

  return (
    <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
      <FaWallet className="text-blue-500" />
      <span className="text-sm font-semibold text-gray-700">${balance}</span>
    </div>
  );
};

export default WalletBalance;
