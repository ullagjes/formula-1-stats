import { Alert } from "react-native";
import firebaseInstance from "./firebaseInstance";

//REMOVES DOCUMENTS FROM COLLECTIONS IN FIRESTORE
export async function deleteFromFirestore(filterData, collectionName, driverId){
    const collection = firebaseInstance
    .firestore()
    .collection(collectionName)

    const document = await collection.doc(driverId).delete()
    .then(() => {
        Alert.alert(driverId + ' was deleted from your favorites!')
    }).catch((error) => {
        Alert.alert(driverId + ' was not deleted!' + error)
    }) 
}
//ADDS DOCUMENTS TO COLLECTIONS IN FIRESTORE
export async function addToFirestore(collectionName, documentId, name){
    const collection = firebaseInstance.firestore().collection(collectionName);
        const document = collection.doc(documentId)
        await document.get()
        .then((doc)=> {
            if(doc.exists){
                Alert.alert(name + ' is already added to your favorites!')
            } else {
                collection.doc(documentId).set({
                    racerId: documentId
                })
                return Alert.alert(name + ' is now added to your favorites!')
            }
        }).catch((error) => {
            console.error("Error adding document", error)
        })
}