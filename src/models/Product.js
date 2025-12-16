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
        console.log('model product__', id)
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

const updateProduct = async (data) => {

    console.log('model updateProduct id', data.id)

    try {
        // Referencia al documento
        console.log('model product__', data.id)
        const prodRef = doc(db, 'products', data.id);
        
        // Verificar si el documento existe
        const snapshot = await getDoc(prodRef);

        if (!snapshot.exists()) {
            //return res.status(404).json({ error: 'Producto no encontrado' });
        }

        const updatedProd = {
                name: data.name,
                description: data.description,
                price: Number(data.price),
                categories: Array.isArray(data.categories) ? data.categories : [], //,
                image: data.image,
                updatedAt: serverTimestamp()
            }

        console.log('updatedProd', updatedProd)
        await updateDoc(prodRef, updatedProd);

        const updatedSnapshot = await getDoc(prodRef);

        return {
            id: updatedSnapshot.id,
            ...updatedSnapshot.data()
        };

    } catch (error) {
        console.error('Error en model - create:', error)
        throw error
    }
    
}

const deleteProd = async ( id ) => {

    console.log('model deleteProduct id', id)
    try {
        const productRef = doc(db, 'products', id);
        const snapshot = await getDoc(productRef);
        
        if (!snapshot.exists()) {
          throw new Error('Producto no encontrado');
        }
        
        const prodDel = await deleteDoc(productRef);
        console.log('Producto eliminado', prodDel);

        return {success: true}

      } catch (error) {
        console.error('Error:', error.message);
      }
        
}

const updateProd = async ( id ) => {

    console.log('model updateProd id', id)
    /*
    try {
        const productRef = doc(db, 'products', id);
        const snapshot = await getDoc(productRef);
        
        if (!snapshot.exists()) {
          throw new Error('Producto no encontrado');
        }
        
        const prodDel = await deleteDoc(productRef);
        console.log('Producto eliminado', prodDel);

        return {success: true}

      } catch (error) {
        console.error('Error:', error.message);
      }
      */
        
}
export const productModel = {getAll, create, deleteProd, updateProd }