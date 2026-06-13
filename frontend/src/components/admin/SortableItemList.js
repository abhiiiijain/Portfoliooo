import { Reorder } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { persistItemOrder } from "@/lib/persistOrder";

function DragHandle() {
  return (
    <span
      className="cursor-grab active:cursor-grabbing text-slate-500 hover:text-slate-300 touch-none shrink-0"
      aria-hidden>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <circle cx="7" cy="5" r="1.5" />
        <circle cx="13" cy="5" r="1.5" />
        <circle cx="7" cy="10" r="1.5" />
        <circle cx="13" cy="10" r="1.5" />
        <circle cx="7" cy="15" r="1.5" />
        <circle cx="13" cy="15" r="1.5" />
      </svg>
    </span>
  );
}

export default function SortableItemList({
  items,
  setItems,
  apiPath,
  renderItem,
  className = "space-y-3",
}) {
  const [savingOrder, setSavingOrder] = useState(false);
  const persistTimer = useRef(null);

  useEffect(() => {
    return () => clearTimeout(persistTimer.current);
  }, []);

  const handleReorder = useCallback(
    (newOrder) => {
      setItems(newOrder);
      clearTimeout(persistTimer.current);
      persistTimer.current = setTimeout(async () => {
        setSavingOrder(true);
        try {
          const updated = await persistItemOrder(apiPath, newOrder);
          setItems(updated);
        } finally {
          setSavingOrder(false);
        }
      }, 400);
    },
    [apiPath, setItems]
  );

  if (!items.length) {
    return <p className="text-slate-400 text-sm">No items yet.</p>;
  }

  return (
    <div>
      {savingOrder && (
        <p className="text-xs text-violet-400 mb-2">Saving order…</p>
      )}
      <p className="text-xs text-slate-500 mb-3">Drag items to reorder</p>
      <Reorder.Group axis="y" values={items} onReorder={handleReorder} className={className}>
        {items.map((item) => (
          <Reorder.Item
            key={item.id}
            value={item}
            className="bg-slate-950/50 border border-white/10 rounded-xl p-4 flex gap-3 items-start list-none cursor-grab active:cursor-grabbing"
            whileDrag={{
              scale: 1.02,
              boxShadow: "0 8px 30px rgba(0,0,0,0.35)",
              zIndex: 10,
            }}>
            <DragHandle />
            <div className="flex-1 min-w-0">{renderItem(item)}</div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
}
