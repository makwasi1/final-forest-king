"use client"

import { Card, CardContent } from "@/components/ui/card"
import { firestore } from "@/firebase";
import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";



export function RecentTransactions() {
  const [supervisor, setSupervisor] = useState<any[]>([]);

  useEffect(() => {
      async function fetchSupervisorData() {
        const querySnapshot = await getDocs(collection(firestore, 'supervisors'));
        const fetchedItems: any[] = [];
        querySnapshot.forEach((doc) => {
          fetchedItems.push({ id: doc.id, ...doc.data() });
        });
        console.log(fetchedItems);
        setSupervisor(fetchedItems.slice(0, 5)); // Limit to 5 items
      }
      fetchSupervisorData();
    }, []);


  return (
    <div className="space-y-4">
      {supervisor.map((transaction) => (
        <Card key={transaction.id} className="p-4">
          <CardContent className="flex items-center p-0">
  
            <div className="ml-4 flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">{transaction.name}</p>
              <p className="text-xs text-muted-foreground">{transaction.email}</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-xs text-muted-foreground">{transaction.role}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
