"use client";
import { useEffect, useState } from "react";

import { collection, getDocs, deleteDoc, doc, addDoc, updateDoc } from "firebase/firestore";

import { CollectionTable } from "@/components/ui/collection-table";
import { getCollectionData } from "@/services/firestoreService";
import { firestore } from "@/firebase";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ItemModal } from "@/components/create-items";
import { AlertDialogHeader, AlertDialogFooter } from "@/components/ui/alert-dialog";
import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "@radix-ui/react-alert-dialog";
`import { CreateItemModal } from "@/components/create-items";`


export default function FarmsPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFarmModalOpen, setFarmModalOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedId, setSelectedId] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [initialData, setInitialData] = useState<any>(null);
  const fetchFarms = async () => {
    setLoading(true);
    const data = await getCollectionData("farms");
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchFarms();
  }, []);

  const handleDelete = async (id: any) => {
    setSelectedId(id);
    setShowAlert(true);
  };

  const handleEdit = (row: any) => {
    setIsEditing(true);
    setInitialData(row);
    setSelectedId(row.id);
    setFarmModalOpen(true);
  };

  const columns = [
    { key: "name", label: "Farm Name" },
    { key: "client", label: "Client" },
  ];

  const farmFields = [
    { key: "name", label: "Farm Name", type: "text" as const },
    { key: "client", label: "Client", type: "text" as const }
  ];

  const handleAddFarm = () => {
    setFarmModalOpen(true);
  };

  const handleCreateFarm = async (data: any) => {
    try {
      await addDoc(collection(firestore, "farms"), data);
      fetchFarms();
    } catch (error) {
      console.error("Error adding farm: ", error);
    }
  };

  const handleUpdateFarm = async (data: any) => {
    try {
      console.log(data);
      await updateDoc(doc(firestore, "farms", selectedId), data);
      fetchFarms();
      setFarmModalOpen(false);
      setIsEditing(false);
      setInitialData(null);
    } catch (error) {
      console.error("Error updating farms: ", error);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleConfirmDelete = async () => {
    await deleteDoc(doc(firestore, "farms", selectedId));
    fetchFarms();
    setShowAlert(false);
  };

  if (showAlert) {
    return (
      <AlertDialog open={showAlert} onOpenChange={handleCloseAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Farm</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this famr?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleConfirmDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between space-y-2 mb-4">
        <h2 className="text-3xl font-bold tracking-tight">Farms</h2>
        <div className="flex items-center space-x-2">
          <Button
            onClick={handleAddFarm}
            className="flex items-center gap-2 bg-forest-600 hover:bg-forest-700"
          >
            <Plus className="h-4 w-4" />
            Add New Farm
          </Button>
        </div>
      </div>

      <CollectionTable
        data={data}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ItemModal
        isOpen={isFarmModalOpen}
        onClose={() => setFarmModalOpen(false)}
        onCreate={handleCreateFarm}
        onUpdate={handleUpdateFarm}
        fields={farmFields}
        title={isEditing ? "Farm Details" : "Add New Farm"}
        isEditing={isEditing}
        initialData={initialData}
      />
    </div>
  );
}