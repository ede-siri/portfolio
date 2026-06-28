const inventoryCardClass =
  "group relative overflow-hidden border border-outline bg-surface-card p-5 transition-all duration-300 hover:border-white/30 hover:bg-surface-elevated md:p-6";

function InventoryCardAccent() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100"
    />
  );
}

export { inventoryCardClass, InventoryCardAccent };
