import { useState } from "react";
import { auth, googleProvider, db } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const saveUserToFirestore = async (user) => {
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      uid: user.uid,
      createdAt: new Date(),
    });
  };

  const handleLogin = async () => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    setUser(res.user);
  };

  const handleSignup = async () => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await saveUserToFirestore(res.user);
    setUser(res.user);
  };

  const handleGoogle = async () => {
    const res = await signInWithPopup(auth, googleProvider);
    await saveUserToFirestore(res.user);
    setUser(res.user);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div className="flex flex-col items-center gap-3 text-white p-5 bg-black/60 rounded-xl shadow-lg max-w-md mx-auto mt-10">
      {user ? (
        <>
          <p>Welcome, {user.email}</p>
          <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
            Logout
          </button>
        </>
      ) : (
        <>
          <input
            className="p-2 rounded text-black"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="p-2 rounded text-black"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex gap-2">
            <button onClick={handleLogin} className="bg-green-500 px-3 py-2 rounded">Login</button>
            <button onClick={handleSignup} className="bg-blue-500 px-3 py-2 rounded">Signup</button>
          </div>
          <button onClick={handleGoogle} className="bg-purple-500 mt-2 px-3 py-2 rounded">
            Sign in with Google
          </button>
        </>
      )}
    </div>
  );
}