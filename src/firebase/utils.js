import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { firebaseConfig } from "./config";

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({ prompt: "select_account" });

//takes user auth
export const handleUserProfile = async ({ userAuth, additionalData }) => {
    if (!userAuth) return;
    const { uid } = userAuth;

    //checking if user is in db
    const userRef = firestore.doc(`users/${uid}`);
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
        const { displayName, email } = userAuth;
        const timestamp = new Date();

        //if not register them
        try {
            await userRef.set({
                displayName,
                email,
                createdDate: timestamp,
                ...additionalData,
            });
        } catch (err) {
            // console.log(err)
        }
    }
    console.log(userRef, 1);
    return userRef;
};

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged((userAuth) => {
            unsubscribe();
            resolve(userAuth);
        }, reject);
    });
};
