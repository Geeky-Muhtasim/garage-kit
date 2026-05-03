import { ShieldCheck, Truck, BadgeCheck, Headphones } from 'lucide-react';

const ITEMS = [
  {
    icon: ShieldCheck,
    title: '100% Genuine',
    sub: 'All parts sourced directly from Japan',
  },
  {
    icon: Truck,
    title: '24–48h Delivery',
    sub: 'Nationwide shipping across Bangladesh',
  },
  {
    icon: BadgeCheck,
    title: 'Warranty covered',
    sub: 'All products carry manufacturer warranty',
  },
  {
    icon: Headphones,
    title: 'Expert support',
    sub: '01905 400 666 · 10am – 8pm daily',
  },
];

export function TrustBar() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
      {ITEMS.map(item => {
        const Icon = item.icon;
        return (
          <div key={item.title} className="bg-surf border-[0.5px] border-bdr rounded-xl p-4 text-center">
            <Icon className="w-5 h-5 text-amber mx-auto mb-2" />
            <p className="text-xs font-medium text-txt mb-1">{item.title}</p>
            <p className="text-[10px] text-txt-2 leading-snug">{item.sub}</p>
          </div>
        );
      })}
    </div>
  );
}
