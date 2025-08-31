import { Send, University, PieChart, Smartphone, Receipt, Clapperboard, Plane, MoreHorizontal } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

const services = [
  { name: "Send Money", icon: Send },
  { name: "To Bank", icon: University },
  { name: "Check Balance", icon: PieChart },
  { name: "Mobile Recharge", icon: Smartphone },
  { name: "Bill Pay", icon: Receipt },
  { name: "Movie Tickets", icon: Clapperboard },
  { name: "Travel", icon: Plane },
  { name: "More", icon: MoreHorizontal },
];

interface ServiceIconProps {
  name: string;
  icon: LucideIcon;
}

function ServiceIcon({ name, icon: Icon }: ServiceIconProps) {
  return (
    <div className="flex flex-col items-center justify-start space-y-2 group h-full">
      <div className="bg-card p-4 rounded-2xl shadow-md group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300 transform group-hover:scale-110 group-hover:shadow-lg">
        <Icon className="h-7 w-7 text-primary group-hover:text-accent-foreground" />
      </div>
      <p className="text-xs text-center font-medium text-foreground/80 flex-grow flex items-center">{name}</p>
    </div>
  );
}

export function Services() {
  return (
    <section aria-labelledby="services-title">
      <h2 id="services-title" className="sr-only">Our Services</h2>
      <div className="grid grid-cols-4 gap-y-6 gap-x-4">
        {services.map((service) => (
          service.href ? (
            <Link href={service.href} key={service.name} className="contents">
              <ServiceIcon name={service.name} icon={service.icon} />
            </Link>
          ) : (
            <button key={service.name} className="contents">
              <ServiceIcon name={service.name} icon={service.icon} />
            </button>
          )
        ))}
      </div>
    </section>
  );
}
