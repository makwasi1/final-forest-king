import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Users, CreditCard, TrendingUp, LandPlot } from "lucide-react"
import { getCollectionCounts } from "@/services/firestoreService";


const cards = [
  { title: "Farms", icon: LandPlot, key: "Farm", description: "+20.1% from last month", trend: "up" },
  { title: "Supervisors", icon: Users, key: "Supervisor", description: "+180.1% from last month", trend: "up" },
  { title: "Activities", icon: CreditCard, key: "Activities", description: "+19% from last month", trend: "up" },
  { title: "Labour", icon: TrendingUp, key: "Labour", description: "+5.4% from last month", trend: "up" },
];

export function OverviewCards() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCounts() {
      const data = await getCollectionCounts();
      setCounts(data);
      setLoading(false);
    }
    fetchCounts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <card.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{counts[card.key] ?? 0}</div>
            <p className="text-xs text-muted-foreground">{card.description}</p>
            <div
              className={`mt-2 flex items-center text-xs ${card.trend === "up" ? "text-green-500" : "text-red-500"}`}
            >
              {card.trend === "up" ? (
                <TrendingUp className="mr-1 h-3 w-3" />
              ) : (
                <TrendingUp className="mr-1 h-3 w-3 transform rotate-180" />
              )}
              {card.description.split(" ")[0]}
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  )
}