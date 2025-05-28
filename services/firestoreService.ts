import { firestore } from '../firebase';
import { collection, getCountFromServer, getDocs } from 'firebase/firestore';

export async function getCollectionCounts() {
  const collections = ['farms', 'supervisor', 'operations', 'labour'];
  const counts: Record<string, number> = {};

  await Promise.all(
    collections.map(async (col) => {
      const snapshot = await getCountFromServer(collection(firestore, col));
      counts[col] = snapshot.data().count || 0;
    })
  );

  return counts;
}


//get activity all data
export async function getCollectionData(coll: string) {
    const snapshot = await getDocs(collection(firestore, coll));
    const activities: any[] = [];
    snapshot.forEach((doc) => {
        activities.push({ id: doc.id, ...doc.data() });
    });
    activities.sort((a, b) => b.timestamp - a.timestamp); // Sort by timestamp in descending order
    console.log(activities);
    return activities;
    
}

//get all farm data
