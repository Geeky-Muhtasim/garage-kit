import Link from 'next/link';
import {
  Wind, Droplets, Shield, Layers, Filter, Minus, PanelBottom,
  Lightbulb, Gauge, AirVent, Fuel, Grid2X2, Package,
  LucideIcon,
} from 'lucide-react';
import { toTitleCase } from '@/lib/utils';

const ICON_MAP: Record<string, LucideIcon> = {
  'SPOILER':       Wind,
  'LUBRICANT':     Droplets,
  'BRAKES':        Shield,
  'SKIRTS':        Layers,
  'AC FILTER':     Filter,
  'WIPER BLADE':   Minus,
  'REAR SKIRT':    PanelBottom,
  'LED BULB':      Lightbulb,
  'OIL FILTER':    Gauge,
  'AIRFILTER':     AirVent,
  'FUEL PUMP':     Fuel,
  'FRONT GRILLE':  Grid2X2,
};

const DISPLAY_NAMES: Record<string, string> = {
  'AC FILTER':    'AC Filter',
  'AIRFILTER':    'Air Filter',
  'LED BULB':     'LED Bulbs',
  'OIL FILTER':   'Oil Filter',
  'WIPER BLADE':  'Wiper Blades',
  'REAR SKIRT':   'Rear Skirt',
  'FRONT GRILLE': 'Front Grille',
  'FUEL PUMP':    'Fuel Pump',
};

interface CategoryGridProps {
  categories: { name: string; count: number }[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
      {categories.map(cat => {
        const Icon = ICON_MAP[cat.name] ?? Package;
        const displayName = DISPLAY_NAMES[cat.name] ?? toTitleCase(cat.name);
        return (
          <Link key={cat.name} href={`/catalog?category=${encodeURIComponent(cat.name)}`}>
            <div className="bg-surf border-[0.5px] border-bdr rounded-xl p-3 flex flex-col items-center gap-1.5 cursor-pointer hover:border-amber hover:bg-amber-dim transition-all">
              <div className="w-9 h-9 bg-surf2 rounded-[9px] flex items-center justify-center">
                <Icon size={18} className="text-amber" />
              </div>
              <p className="text-[10px] text-txt-2 text-center leading-tight">{displayName}</p>
              {cat.count > 0 && (
                <p className="text-[9px] text-txt-3 font-mono">{cat.count}</p>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
