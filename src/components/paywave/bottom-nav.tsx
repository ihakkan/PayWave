import { Home, Wallet, Tag, User } from "lucide-react";
import type { LucideIcon } from 'lucide-react';
import { Scan } from 'lucide-react';
import Link from 'next/link';

const navItems = [
  { name: "Home", icon: Home, active: true, href: "/" },
  { name: "Wallet", icon: Wallet, active: false, href: "#" },
  { name: "Offers", icon: Tag, active: false, href: "#" },
  { name: "Profile", icon: User, active: false, href: "#" },
];

interface NavItemProps {
    name: string;
    icon: LucideIcon;
    active: boolean;
    href: string;
}

function NavItem({ name, icon: Icon, active, href }: NavItemProps) {
  return (
    <Link href={href} className="flex-1">
      <div
        className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-all duration-200 ${
          active ? "text-primary scale-110" : "text-muted-foreground/80 hover:text-primary"
        }`}
      >
        <Icon className="h-6 w-6 mb-1" strokeWidth={active ? 2.5 : 2} />
        <span className="text-xs font-medium">{name}</span>
      </div>
    </Link>
  );
}

export function BottomNav() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-24 bg-transparent pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-card/80 backdrop-blur-sm border-t border-border/50 flex justify-around items-start">
            <div className="flex justify-around items-start w-full">
                {navItems.slice(0, 2).map((item) => (
                    <NavItem key={item.name} {...item} />
                ))}
                <div className="w-16" />
                {navItems.slice(2, 4).map((item) => (
                    <NavItem key={item.name} {...item} />
                ))}
            </div>
        </div>
        <Link href="/scan" className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 pointer-events-auto">
          <Scan className="h-8 w-8 text-primary-foreground" />
        </Link>
    </div>
  );
}
