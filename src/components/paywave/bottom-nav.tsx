import { Home, Wallet, Tag, User } from "lucide-react";
import type { LucideIcon } from 'lucide-react';

const navItems = [
  { name: "Home", icon: Home, active: true },
  { name: "Wallet", icon: Wallet, active: false },
  { name: "Offers", icon: Tag, active: false },
  { name: "Profile", icon: User, active: false },
];

interface NavItemProps {
    name: string;
    icon: LucideIcon;
    active: boolean;
}

function NavItem({ name, icon: Icon, active }: NavItemProps) {
  return (
    <button
      className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-all duration-200 ${
        active ? "text-primary scale-110" : "text-muted-foreground/80 hover:text-primary"
      }`}
    >
      <Icon className="h-6 w-6 mb-1" strokeWidth={active ? 2.5 : 2} />
      <span className="text-xs font-medium">{name}</span>
    </button>
  );
}

export function BottomNav() {
  return (
    <nav className="absolute bottom-0 left-0 right-0 h-16 bg-card/80 backdrop-blur-sm border-t border-border/50 flex justify-around items-start">
      {navItems.map((item) => (
        <NavItem key={item.name} {...item} />
      ))}
    </nav>
  );
}
