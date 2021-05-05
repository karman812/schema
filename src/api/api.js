import firebase from "firebase";

export const initializeApp = () => {
    let firebaseConfig = {
        apiKey: "AIzaSyD6DnGbVfdJlDJ_pEOUfDfTDJrA8j3lIs8",
        authDomain: "dv-inventory.firebaseapp.com",
        databaseURL: "https://dv-inventory.firebaseio.com",
        projectId: "dv-inventory",
        storageBucket: "dv-inventory.appspot.com",
        messagingSenderId: "130062240176",
        appId: "1:130062240176:web:ecbca5d29b37d25c6cee75"
    };
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
}

export const getPlaces = () => {
    return firebase.firestore().collection("places").get().then(response => {
        let docs = response.docs.map(x => ({
            id: x.id,
            data: x.data(),
            parts: x.data().parts && x.data().parts.map(part => part.id)
        }));
        return docs;
    });
}

export const getInventory = () => {
    return firebase.firestore().collection("inventory").get().then(response => {
        let docs = response.docs.map(x => ({
            id: x.id,
            data: x.data(),
            placeId: x.data().place.id
        }));
        return docs;
    });
}

export const updateInventory = (inventoryIteId, count) => {
    return firebase.firestore().collection("inventory").doc(inventoryIteId).update({
        count: count
    }).then(() => {
        console.info("Done");
    });
}

export const deleteInventory = (inventoryId) => {
    return firebase.firestore().collection("inventory").doc(inventoryId).delete().then(() => {
        console.info("Done");
    });
}

export const addInventory = (name, count, placeId) => {
    return firebase.firestore().collection("inventory").doc().set({
        name: name,
        count: count,
        place: firebase.firestore().collection("places").doc(placeId) // main-101 – id места
    }).then(() => {
        console.info("Done");
    });
}

