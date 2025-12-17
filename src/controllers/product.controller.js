import { productModel } from "../models/Product.js"

import fs from 'fs/promises';
import path, { dirname, join } from 'path'

const getAll = async (req, res) => {

	//const {name, price} = req.body

	console.log('controller - getAll')
	
	const products = await productModel.getAll()

    return res.status(401).json({
    	success: true,
        message: 'listado ok',
        data: products
    });
}

const create = async (req, res) => {

	/*if (req.body === undefined) {
		console.log('req.body === undefined')
		return res.status(400).json({
			error: 'Datos incompletos',
			message: 'Los campos "name" y "price" son requeridos'
		});
	}else{*/
		const {name, price, description, categories} = req.body

		if(name === undefined || price === undefined){
			console.log('req.body === undefined')
			return res.status(400).json({
				error: 'Datos undefined',
				message: 'Los campos "name" y "price" son requeridos si o si'
			});
		}else{
			console.log('valores enviados', name, price)
			console.log('controller - createProduct', name, price)
			const newProduct = await productModel.create({name, price, description, categories})

			console.log('newProduct', newProduct)
		    return res.status(401).json({
		    	success: true,
		        message: 'create ok',
		        data: newProduct
		    });
		}


	//}
}

const deleteProd = async (req, res) => {
	const id = req.params.id
    console.log('services deleteProduct', id)
    
    try {   

        const productDel = await productModel.deleteProd( id )
        

        if( productDel.success ){
	        console.log('controller controller', productDel)

		    return res.status(401).json({
		    	success: true,
		        message: 'delete ok'
		    });

        }else{
		    return res.status(404).json({
		    	success: false,
		        message: productDel.error
		    });
        }
        
    } catch (error) {
        console.error('Error en service - deleteProd:', error)
        return {
            success: false,
            data: null,
            message: "Error al eliminar el producto"
        }
    }
}

const updateProd = async (req, res) => {
	const { id } = req.params
	const updates = req.body;
    console.log('controller updateProd', id, updates)

    if( !id ){
			return res.status(404).json({
		    	success: false,
		        message: 'update error'
		    })
    }
    
    try {   

        const productUpd = await productModel.updateProd( id, updates )
        
        if( productUpd.success ){

		    return res.status(401).json({
		    	success: true,
		        message: 'update ok'
		    });

        }else{
		    return res.status(404).json({
		    	success: false,
		        message: productUpd.error
		    });
        }
        
    } catch (error) {
        console.error('Error en service - updateProd:', error)
        return {
            success: false,
            data: null,
            message: "Error al eliminar el producto"
        }
    }
    
}

export const productController = {getAll, create, deleteProd, updateProd}