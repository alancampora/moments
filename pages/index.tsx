import { useState, useContext, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/app";
import "firebase/auth";
import { Login, Feed, Upload } from "../components";
import { UserContext } from "../providers";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyC8uOxm4j--AB4Xi0pBGJpQQWmh10SWS6Q",
    authDomain: "amigues.firebaseapp.com",
    projectId: "amigues",
    storageBucket: "amigues.appspot.com",
    messagingSenderId: "524700812198",
    appId: "1:524700812198:web:c94b9d9f3f9abd0e860567",
    measurementId: "G-ECCZCZHWBM",
  });
}

const login = async () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  await firebase.auth().signInWithPopup(googleProvider);
};

const logout = () => {
  firebase.auth().signOut();
};

export default function Home() {
  const [user, loading, error] = useAuthState(firebase.auth());
  const [showUploadModal, setShowUploadModal] = useState(false);
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    setUser(user);
  }, [user]);

  if (loading) {
    return <p>Loading</p>;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }

  if (user) {
    return (
      <div>
        <Upload
          onClose={() => setShowUploadModal(false)}
          show={showUploadModal}
        />
        <Feed onLogout={logout} onUpload={() => setShowUploadModal(true)} />;
      </div>
    );
  }
  return <Login onLogin={login}></Login>;
}
