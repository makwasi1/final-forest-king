"use client";
import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
} from "firebase/firestore";

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
    const data = await getCollectionData("Supervisor");
    setFarms(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchFarms();
  }, []);

  const handleDelete = async (id: any) => {
    await deleteDoc(doc(firestore, "Supervisor", id));
    fetchFarms();
  };

  const handleEdit = (row: any) => {
    // Implement your edit logic/modal here
    alert("Edit: " + JSON.stringify(row));
  };

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "is_active", label: "Status" },
    { key: "userId", label: "User ID" },
  ];

  const userFields = [
    { key: "name", label: "Name", type: "text" as const },
    { key: "email", label: "Email", type: "text" as const },
    { key: "role", label: "Role", type: "select" as const, options: [{ value: "admin", label: "Admin" }, { value: "supervisor", label: "Supervisor" }, { value: "labour", label: "Labour" }] },
    { key: "is_active", label: "Status", type: "select" as const, options: [{ value: "1", label: "Active" }, { value: "0", label: "Inactive" }] },
    { key: "userId", label: "User ID", type: "text" as const },
  ];

  const handleAddFarm = () => {
    setFarmModalOpen(true);
  };

  const handleCreateFarm = async (data: any) => {
    try {
      await addDoc(collection(firestore, "Farm"), data);
      fetchFarms();
    } catch (error) {
      console.error("Error adding farm: ", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between space-y-2 mb-4">
        <h2 className="text-3xl font-bold tracking-tight">Supervisors</h2>
        <div className="flex items-center space-x-2">
          <Button
            onClick={handleAddFarm}
            className="flex items-center gap-2 bg-forest-600 hover:bg-forest-700"
          >
            <Plus className="h-4 w-4" />
            Add New Supervisor
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
        fields={userFields}
        title="Add New Farm"
      />
    </div>
  );
}
