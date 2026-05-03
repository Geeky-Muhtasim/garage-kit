interface StockProps {
  qty: string;
  showBar?: boolean;
}

export function StockIndicator({ qty, showBar }: StockProps) {
  const n = parseInt(qty, 10);
  const hasQty = !isNaN(n) && qty !== '';
  const inStock = !hasQty || n > 0;

  if (showBar) {
    if (!hasQty) {
      return (
        <div className="flex items-center gap-3">
          <div className="flex-1 h-1 bg-bdr2 rounded-full" />
          <span className="text-[10px] text-txt-3 font-mono">In stock</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-3">
        <div className="flex-1 h-1 bg-bdr2 rounded-full relative">
          <div
            className="absolute inset-y-0 left-0 bg-green rounded-full"
            style={{ width: `${Math.min((n / 15) * 100, 100)}%` }}
          />
        </div>
        <span className="text-[10px] text-green font-mono">{n} / 15 units</span>
      </div>
    );
  }

  if (!inStock) {
    return (
      <div className="flex items-center gap-1">
        <div className="w-1.5 h-1.5 rounded-full bg-red" />
        <span className="text-[9px] text-red">Out of stock</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <div className="w-1.5 h-1.5 rounded-full bg-green" />
      <span className="text-[9px] text-green font-mono">
        {hasQty && n <= 5 ? `${n} left` : 'In stock'}
      </span>
    </div>
  );
}
