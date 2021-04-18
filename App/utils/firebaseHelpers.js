import { Alert } from "react-native";
import firebaseInstance from "./firebaseInstance";

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

/*export function getRealTimeData(collectionName){
    let ref = firebaseInstance
    .firestore()
    .collection(collectionName) 

    ref.onSnapshot((snapshot => {
        let data = []
        snapshot.forEach((doc) => {
            data.push({
                id: doc.id,
                ...doc.data()
            })
        })
        return console.log('cleaned up')
    }))
}*/

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