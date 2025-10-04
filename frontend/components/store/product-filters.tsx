"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const categories = ["Tümü", "Valorant", "Steam", "Riot", "Gift Card"];

export function ProductFilters() {
  const [selected, setSelected] = useState("Tümü");

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <motion.button
            key={category}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelected(category)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition",
              selected === category
                ? "border-primary bg-primary text-primary-foreground"
                : "hover:border-primary/50 hover:bg-secondary"
            )}
          >
            {category}
          </motion.button>
        ))}
      </div>
      <select className="rounded-md border bg-background px-3 py-2 text-sm shadow-sm">
        <option>Varsayılan Sıralama</option>
        <option>Fiyat: Artan</option>
        <option>Fiyat: Azalan</option>
        <option>En Yeni</option>
      </select>
    </div>
  );
}
