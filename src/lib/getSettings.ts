import { db } from "./firebase";
import { getDoc, setDoc, doc } from "firebase/firestore";
import { COLLECTIONS, DEFAULT_SETTINGS } from "./const";

// Get settings from firestore
// If there is no settings, create one and return default settings
export async function getSettings(userEmail: string) {
  const docRef = doc(db, COLLECTIONS.SETTINGS, userEmail);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    await setDoc(docRef, { ...DEFAULT_SETTINGS });
    return DEFAULT_SETTINGS;
  } else {
    return docSnap.data();
  }
}
