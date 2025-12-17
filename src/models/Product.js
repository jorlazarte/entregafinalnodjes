import {db} from "../config/firebase.js"

import { collection, getDocs, getDoc, doc, addDoc, updateDoc, serverTimestamp, deleteDoc } from "firebase/firestore"

const prodsColl = collection(db, "products")

const getAll = async () => {
    try {
        const snapshot = await getDocs(prodsColl)
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    } catch (error) {
        console.error('Error en model - findAll:', error)
        throw error // Propaga el error para manejarlo en el service
    }
}

const getProductById = async (id) => {
    try {
        const prodRef = doc(prodsColl, id)
        const snapshot = await getDoc(prodRef)

        return snapshot.exists() 
            ? { id: snapshot.id, ...snapshot.data() } 
            : null // Retorna null si no existe
        
    } catch (error) {
        console.error('Error en model - findById:', error)
        throw error
    }
}

const create = async (data) => {
    try {

        const newProd = {
            ...data,
            createAt: serverTimestamp(),
            updateAt: serverTimestamp()
        }

        const docRef = await addDoc(prodsColl, newProd)

        return { id: docRef.id, ...data }
    } catch (error) {
        console.error('Error en model - create:', error)
        throw error
    }
}

const updateProd = async (id, data) => {

    try {
        const prodRef = doc(db, 'products', id);
        
        const snapshot = await getDoc(prodRef);

        if (!snapshot.exists()) {
            return {
                success: false,
                error: "id no existe"
            }
        }

        await updateDoc(prodRef, data)
        
        return {
            success: true,
            updatedid: id,
            updatedFields: data
        }

    } catch (error) {
        console.error('Error en model - create:', error)
        throw error
    }
    
}

const deleteProd = async ( id ) => {

    try {
        const productRef = doc(db, 'products', id);
        const snapshot = await getDoc(productRef);
        
        if (!snapshot.exists()) {
          return {success: false, error: "id no encontrado"}
        }
        
        const prodDel = await deleteDoc(productRef);

        return {success: true}

      } catch (error) {
        console.error('Error:', error.message);
      }
        
}

export const productModel = {getAll, create, deleteProd, updateProd }