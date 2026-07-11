import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const REQUESTS_COLLECTION = 'requests';

export const addRequest = async (requestData) => {
  const idPrefix = requestData.type === "service" ? "SEC-INIT-" : "SEC-TX-";
  const requestId = `${idPrefix}${Math.floor(100000 + Math.random() * 900000)}`;

  const newRequest = {
    requestId,
    type: requestData.type,
    name: requestData.name,
    contact: requestData.contact || requestData.email,
    scope: requestData.scope || requestData.subject,
    tier: requestData.tier || "General Inquiry",
    details: requestData.details || requestData.message,
    status: "Pending",
    timestamp: new Date().toISOString(),
    createdAt: serverTimestamp(),
    notes: ""
  };

  try {
    await addDoc(collection(db, REQUESTS_COLLECTION), newRequest);
    console.log("[Firestore] Request synced to cloud:", requestId);
  } catch (err) {
    console.error("[Firestore] Failed to sync request:", err);
  }

  return newRequest;
};
