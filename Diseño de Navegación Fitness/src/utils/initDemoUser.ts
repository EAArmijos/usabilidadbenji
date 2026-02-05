// Initialize demo user if not exists
import { db } from "../firebase";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

export async function initializeDemoUser() {
	try {
		const demoEmail = "demo@fitpro.test";
		const q = query(collection(db, "User"), where("email", "==", demoEmail));
		const snapshot = await getDocs(q);
		if (!snapshot.empty) return; // demo user already exists

		const demo = {
			name: "Demo User",
			email: demoEmail,
			password: "demo123",
			avatar: `https://ui-avatars.com/api/?name=Demo+User&background=random`,
			createdAt: new Date().toISOString(),
		};

		await addDoc(collection(db, "User"), demo);
	} catch (err) {
		// Fail silently — initialization is optional for environments without Firestore
		console.warn("initializeDemoUser error:", err);
	}
}
