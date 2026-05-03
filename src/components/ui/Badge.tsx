type Variant = 'amber' | 'green' | 'blue' | 'red';

interface BadgeProps {
  label: string;
  variant: Variant;
}

const styles: Record<Variant, string> = {
  amber: 'bg-amber-dim text-amber-lt border-amber',
  green: 'bg-green-dim text-green border-green',
  blue:  'bg-blue-dim text-blue border-blue',
  red:   'bg-red-dim text-red border-red',
};

export function Badge({ label, variant }: BadgeProps) {
  return (
    <span className={`px-2 py-0.5 rounded text-[9px] font-semibold tracking-wider border-[0.5px] inline-block ${styles[variant]}`}>
      {label}
    </span>
  );
}
