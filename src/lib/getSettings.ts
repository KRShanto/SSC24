import { db } from "./firebase";
import {
  getDoc,
  setDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { DEFAULT_SETTINGS } from "./const";

// Get settings from `settings` collection. where `userEmail` is equal to `userEmail`
// If there is no settings, create one and return default settings
export async function getSettings(userEmail: string) {
  const q = query(
    collection(db, "settings"),
    where("userEmail", "==", userEmail),
  );
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    const docRef = doc(collection(db, "settings"));
    await setDoc(docRef, { ...DEFAULT_SETTINGS, userEmail });
    return DEFAULT_SETTINGS;
  } else {
    const doc = querySnapshot.docs[0];
    return doc.data();
  }
}
