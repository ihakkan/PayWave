import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

const transactions = [
  {
    name: "Amit Sharma",
    amount: "500.00",
    date: "20 May 2024",
    type: "paid",
    avatar: "https://picsum.photos/seed/amit/100",
    avatarHint: "man portrait"
  },
  {
    name: "Priya Patel",
    amount: "250.50",
    date: "19 May 2024",
    type: "received",
    avatar: "https://picsum.photos/seed/priya/100",
    avatarHint: "woman portrait"
  },
  {
    name: "Electricity Bill",
    amount: "750.20",
    date: "18 May 2024",
    type: "paid",
    avatar: "https://picsum.photos/seed/bill/100",
    avatarHint: "electricity bulb"
  },
  {
    name: "Swiggy",
    amount: "150.00",
    date: "17 May 2024",
    type: "paid",
    avatar: "https://picsum.photos/seed/swiggy/100",
    avatarHint: "food delivery"
  },
  {
    name: "Rajesh Kumar",
    amount: "1000.00",
    date: "16 May 2024",
    type: "received",
    avatar: "https://picsum.photos/seed/rajesh/100",
    avatarHint: "man face"
  },
];

interface TransactionItemProps {
  name: string;
  amount: string;
  date: string;
  type: 'paid' | 'received';
  avatar: string;
  avatarHint: string;
}

function TransactionItem({ name, amount, date, type, avatar, avatarHint }: TransactionItemProps) {
  const isPaid = type === 'paid';
  return (
    <div className="flex items-center space-x-4 py-3 hover:bg-secondary/50 rounded-lg px-2 -mx-2 transition-colors cursor-pointer">
      <Avatar>
        <AvatarImage src={avatar} alt={name} data-ai-hint={avatarHint} />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <p className="font-semibold text-sm">{name}</p>
        <p className="text-xs text-muted-foreground">{date}</p>
      </div>
      <div className="text-right flex items-center space-x-2">
        <p className={`font-bold text-sm ${isPaid ? 'text-destructive' : 'text-success'}`}>
          {isPaid ? '- ' : '+ '}₹{amount}
        </p>
        {isPaid ? <ArrowUpRight className="h-4 w-4 text-destructive" /> : <ArrowDownLeft className="h-4 w-4 text-success" />}
      </div>
    </div>
  );
}

export function RecentPayments() {
  return (
    <Card className="shadow-lg bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg">Recent Payments</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-1">
          {transactions.map((tx, index) => (
            <TransactionItem key={index} {...tx} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
