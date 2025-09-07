import React, { useEffect, useState } from "react";
import { apiService } from "../utils/api";
import { FaFire } from "react-icons/fa";

const StrikeBadge = () => {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const fetchStrike = async () => {
      try {
        const res = await apiService.get("/api/my-strike");
        const data = res?.data || res;
        setStreak(data?.streak || 0);
      } catch (err) {
        console.error("Error fetching strike:", err);
      }
    };
    fetchStrike();
  }, []);

  return (
    <div className="relative flex items-center justify-center">
      <FaFire className="text-orange-500 text-2xl" />
      {streak > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          {streak}
        </span>
      )}
    </div>
  );
};

export default StrikeBadge;
