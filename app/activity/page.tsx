"use client";
import { useEffect, useState } from "react";

import { collection, getDocs, deleteDoc, doc, addDoc } from "firebase/firestore";

import { CollectionTable } from "@/components/ui/collection-table";
import { getCollectionData } from "@/services/firestoreService";
import { firestore } from "@/firebase";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CreateItemModal } from "@/components/create-items";

export default function FarmsPage() {
  const [farms, setFarms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFarmModalOpen, setFarmModalOpen] = useState(false);

  const fetchFarms = async () => {
    setLoading(true);
    const data = await getCollectionData("Activity");
    setFarms(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchFarms();
  }, []);

  const handleDelete = async (id: any) => {
    await deleteDoc(doc(firestore, "Activity", id));
    fetchFarms();
  };

  const handleEdit = (row: any) => {
    // Implement your edit logic/modal here
    alert("Edit: " + JSON.stringify(row));
  };

  const columns = [
    { key: "category", label: "Category" },
    { key: "name", label: "Name" },
  ];

  const activityFields = [
    { key: "category", label: "Category", type: "text" as const },
    { key: "name", label: "Name", type: "text" as const },
  ];

  const handleAddFarm = () => {
      setFarmModalOpen(true);
    };
  
    const handleCreateFarm = async (data: any) => {
      try {
        await addDoc(collection(firestore, "Activity"), data);
        fetchFarms();
      } catch (error) {
          console.error("Error adding farm: ", error);
      }
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between space-y-2 mb-4">
        <h2 className="text-3xl font-bold tracking-tight">Activities</h2>
        <div className="flex items-center space-x-2">
          <Button
            onClick={handleAddFarm}
            className="flex items-center gap-2 bg-forest-600 hover:bg-forest-700"
          >
            <Plus className="h-4 w-4" />
            Add New Activity
          </Button>
        </div>
      </div>

      <CollectionTable
        data={farms}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CreateItemModal
        isOpen={isFarmModalOpen}
        onClose={() => setFarmModalOpen(false)}
        onCreate={handleCreateFarm}
        fields={activityFields}
        title="Add New Farm"
      />
    </div>
  );
}
