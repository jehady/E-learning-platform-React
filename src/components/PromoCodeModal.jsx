
import React, { useState } from "react";
import { apiService } from "../utils/api";

const PromoCodeModal = ({ isOpen, onClose, teacher, onSuccess }) => {
  const [discount, setDiscount] = useState("");
  const [expiresIn, setExpiresIn] = useState("");
  const [usageLimit, setUsageLimit] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = {
        discount_percentage: parseInt(discount, 10),
        expires_in: expiresIn, // e.g. 2025-12-31
        usage_limit: parseInt(usageLimit, 10),
        teacher_id: teacher.id,
      };

      const res = await apiService.post("/api/create_promo_code", body);
      console.log("Promo code created:", res);

      if (onSuccess) onSuccess(res);
      onClose();
    } catch (err) {
      console.error("Error creating promo code:", err);
      alert("Failed to create promo code.");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: 24,
          width: 400,
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ marginBottom: 16, fontSize: 20, fontWeight: 700 }}>
          Create Promo Code for {teacher.name}
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 12 }}>
            <label>Discount %</label>
            <input
              type="number"
              value={discount}
              min="0"
              max="100"
              onChange={(e) => setDiscount(e.target.value)}
              required
              style={{ width: "100%", padding: 8, marginTop: 4 }}
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label>Expires In (Date)</label>
            <input
              type="date"
              value={expiresIn}
              onChange={(e) => setExpiresIn(e.target.value)}
              required
              style={{ width: "100%", padding: 8, marginTop: 4 }}
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label>Usage Limit</label>
            <input
              type="number"
              value={usageLimit}
              min="1"
              onChange={(e) => setUsageLimit(e.target.value)}
              required
              style={{ width: "100%", padding: 8, marginTop: 4 }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                background: "#eee",
                border: "none",
                borderRadius: 8,
                padding: "8px 16px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                background: "#5d5fef",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "8px 16px",
                cursor: "pointer",
              }}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PromoCodeModal;
