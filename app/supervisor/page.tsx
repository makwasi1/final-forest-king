"use client";
import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
  updateDoc,
} from "firebase/firestore";

import { CollectionTable } from "@/components/ui/collection-table";
import { getCollectionData } from "@/services/firestoreService";
import { firestore } from "@/firebase";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ItemModal } from "@/components/create-items";
import { AlertDialogHeader, AlertDialogFooter } from "@/components/ui/alert-dialog";
import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "@radix-ui/react-alert-dialog";

export default function SupervisorPage() {
   const [data, setData] = useState<any[]>([]);
   const [loading, setLoading] = useState(true);
   const [isFarmModalOpen, setFarmModalOpen] = useState(false);
   const [showAlert, setShowAlert] = useState(false);
   const [selectedId, setSelectedId] = useState<any>(null);
   const [isEditing, setIsEditing] = useState(false);
   const [initialData, setInitialData] = useState<any>(null);
   const fetchSupervisors = async () => {
     setLoading(true);
     const data = await getCollectionData("supervisor");
     setData(data);
     setLoading(false);
   };

   useEffect(() => {
     fetchSupervisors();
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
     { key: "name", label: "Name" },
     { key: "email", label: "Email" },
     { key: "role", label: "Role" },
     { key: "is_active", label: "Status" },
     { key: "userId", label: "User ID" },
   ];

   const userFields = [
     { key: "name", label: "Name", type: "text" as const },
     { key: "email", label: "Email", type: "text" as const },
     {
       key: "role",
       label: "Role",
       type: "select" as const,
       options: [
         { value: "admin", label: "Admin" },
         { value: "supervisor", label: "Supervisor" },
         { value: "labour", label: "Labour" },
       ],
     },
     {
       key: "is_active",
       label: "Status",
       type: "select" as const,
       options: [
         { value: "1", label: "Active" },
         { value: "0", label: "Inactive" },
       ],
     },
     { key: "userId", label: "User ID", type: "text" as const },
   ];

   const handleAddFarm = () => {
     setFarmModalOpen(true);
   };

   const handleCreateFarm = async (data: any) => {
     try {
       await addDoc(collection(firestore, "supervisor"), data);
       fetchSupervisors();
     } catch (error) {
       console.error("Error adding farm: ", error);
     }
   };

   const handleUpdateFarm = async (data: any) => {
     try {
       console.log(data);
       await updateDoc(doc(firestore, "supervisor", selectedId), data);
       fetchSupervisors();
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
     await deleteDoc(doc(firestore, "supervisor", selectedId));
     fetchSupervisors();
     setShowAlert(false);
   };

   if (showAlert) {
     return (
       <AlertDialog open={showAlert} onOpenChange={handleCloseAlert}>
         <AlertDialogContent>
           <AlertDialogHeader>
             <AlertDialogTitle>Delete Supervisor</AlertDialogTitle>
             <AlertDialogDescription>
               Are you sure you want to delete this supervisor?
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
         fields={userFields}
         title={isEditing ? "Supervisor Details" : "Add New Supervisor"}
         isEditing={isEditing}
         initialData={initialData}
       />
     </div>
   );
}