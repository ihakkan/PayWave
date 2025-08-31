import { Scan, Send, University, PieChart, Smartphone, Receipt, Clapperboard, Plane } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const services = [
  { name: "Scan & Pay", icon: Scan },
  { name: "Send Money", icon: Send },
  { name: "To Bank", icon: University },
  { name: "Check Balance", icon: PieChart },
  { name: "Mobile Recharge", icon: Smartphone },
  { name: "Bill Pay", icon: Receipt },
  { name: "Movie Tickets", icon: Clapperboard },
  { name: "Travel", icon: Plane },
];

interface ServiceIconProps {
  name: string;
  icon: LucideIcon;
}

function ServiceIcon({ name, icon: Icon }: ServiceIconProps) {
  return (
    <button className="flex flex-col items-center justify-center space-y-2 group">
      <div className="bg-card p-4 rounded-full shadow-md group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300 transform group-hover:scale-110 group-hover:shadow-lg">
        <Icon className="h-7 w-7 text-primary group-hover:text-accent-foreground" />
      </div>
      <p className="text-xs text-center font-medium text-foreground/80">{name}</p>
    </button>
  );
}

export function Services() {
  return (
    <section aria-labelledby="services-title">
      <h2 id="services-title" className="sr-only">Our Services</h2>
      <div className="grid grid-cols-4 gap-y-6 gap-x-4">
        {services.map((service) => (
          <ServiceIcon key={service.name} {...service} />
        ))}
      </div>
    </section>
  );
}
