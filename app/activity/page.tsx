"use client";
import { useEffect, useState } from "react";

import { collection, getDocs, deleteDoc, doc, addDoc, updateDoc } from "firebase/firestore";

import { CollectionTable } from "@/components/ui/collection-table";
import { getCollectionData } from "@/services/firestoreService";
import { firestore } from "@/firebase";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ItemModal } from "@/components/create-items";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

export default function OperationsPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFarmModalOpen, setFarmModalOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedId, setSelectedId] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [initialData, setInitialData] = useState<any>(null);
  const fetchOperations = async () => {
    setLoading(true);
    const data = await getCollectionData("operations");
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchOperations();
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
        await addDoc(collection(firestore, "operations"), data);
        fetchOperations();
      } catch (error) {
          console.error("Error adding operation: ", error);
      }
  }

  const handleUpdateFarm = async (data: any) => {
    try {
      console.log(data);
      await updateDoc(doc(firestore, "operations", selectedId), data);
      fetchOperations();
      setFarmModalOpen(false);
      setIsEditing(false);
      setInitialData(null);
    } catch (error) {
      console.error("Error updating operation: ", error);
    }
  }

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleConfirmDelete = async () => {
    await deleteDoc(doc(firestore, "operations", selectedId));
    fetchOperations();
    setShowAlert(false);
  };

  if (showAlert) {
    return (
      <AlertDialog open={showAlert} onOpenChange={handleCloseAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Operation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this operation?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={handleConfirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
  

  if (loading) return <div>Loading...</div>;

  return (
    <div className="px-2 sm:px-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0 mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Operations</h2>
        <div className="flex items-center">
          <Button
            onClick={handleAddFarm}
            className="flex items-center gap-2 bg-forest-600 hover:bg-forest-700 w-full sm:w-auto"
          >
            <Plus className="h-4 w-4" />
            <span className="whitespace-nowrap">Add New Operation</span>
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <CollectionTable
          data={data}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <ItemModal
        isOpen={isFarmModalOpen}
        onClose={() => {
          setFarmModalOpen(false);
          setIsEditing(false);
          setInitialData(null);
        }}
        onCreate={handleCreateFarm}
        onUpdate={handleUpdateFarm}
        fields={activityFields}
        title={isEditing ? "Operation" : "Add New Operation"}
        isEditing={isEditing}
        initialData={initialData}
      />
    </div>
  );
}
