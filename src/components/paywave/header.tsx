import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Bell, Search } from "lucide-react";

export function Header() {
  return (
    <header className="bg-primary/90 backdrop-blur-sm text-primary-foreground p-4 flex items-center justify-between sticky top-0 z-10 shadow-md">
      <Avatar className="h-9 w-9 cursor-pointer">
        <AvatarImage src="https://picsum.photos/100" alt="User profile" data-ai-hint="profile person" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <div className="relative flex-1 mx-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search for people, bills..."
          className="bg-primary/50 border-0 pl-10 text-primary-foreground placeholder:text-muted-foreground/80 focus:bg-primary/70 focus:ring-accent"
        />
      </div>
      <button className="relative p-2 rounded-full hover:bg-primary/80 transition-colors">
        <Bell className="h-6 w-6" />
        <span className="absolute top-1.5 right-1.5 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-primary/90"></span>
        <span className="sr-only">Notifications</span>
      </button>
    </header>
  );
}
