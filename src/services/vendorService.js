// Firestore operations for vendor registration and approval.
// Collection: "vendors" — each doc is one vendor application.

import { db } from "./firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

const VENDORS_COLLECTION = "vendors";

/**
 * Submits a new vendor registration to Firestore.
 * @param {object} vendorData - form fields (name, businessType, email, phone, etc.)
 * @returns {Promise<string>} the new document's Firestore ID
 */
export async function submitVendorRegistration(vendorData) {
  const docRef = await addDoc(collection(db, VENDORS_COLLECTION), {
    ...vendorData,
    status: "pending",
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

/**
 * Updates a vendor's approval status ("approved" | "rejected").
 * @param {string} vendorId - Firestore document ID
 * @param {string} status
 */
export async function updateVendorStatus(vendorId, status) {
  const vendorRef = doc(db, VENDORS_COLLECTION, vendorId);
  await updateDoc(vendorRef, { status });
}

/**
 * Subscribes to live vendor list updates, ordered by newest first.
 * @param {(vendors: Array) => void} callback - called with the full vendor list on every change
 * @returns {() => void} unsubscribe function
 */
export function subscribeToVendors(callback) {
  const q = query(collection(db, VENDORS_COLLECTION), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const vendors = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(vendors);
  });
}
