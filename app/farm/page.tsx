"use client";
import { useEffect, useState } from "react";

import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

import { CollectionTable } from "@/components/ui/collection-table";
import { getCollectionData } from "@/services/firestoreService";
import { firestore } from "@/firebase";

export default function FarmsPage() {
  const [farms, setFarms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFarms = async () => {
    setLoading(true);
     const data = await getCollectionData('Farm');
    setFarms(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchFarms();
  }, []);

  const handleDelete = async (id: any) => {
    await deleteDoc(doc(firestore, "Farm", id));
    fetchFarms();
  };

  const handleEdit = (row: any) => {
    // Implement your edit logic/modal here
    alert("Edit: " + JSON.stringify(row));
  };

  const columns = [
    { key: "name", label: "Name" }
  ];

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Farms</h1>
      <CollectionTable data={farms} columns={columns} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}