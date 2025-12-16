import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config()

const auth_bkp = (req, res, next) => {
	const token = req.headers['authorization']?.split(' ')[1]

	if(!token) return res.sendStatus(401)

	console.log('authMiddleware_token', token)
	
	jwt.verify(token, process.env.SECRETKEY, (error) => {
		if(error){
			console.log('error', error)
			return res.sendStatus(403)
		} 

		next()
	})

	
}

const auth = (req, res, next) => {

	//console.log('----', process.env.SECRETKEY)

	try {

		const token = req.headers['authorization']?.split(' ')[1]

		if(!token){
            return res.status(401).json({
            	success: false,
                error: 'Acceso denegado',
                message: 'No se proporcionó token de autenticación'
            });
		}

		console.log('authMiddleware_token', token)
		
		jwt.verify(token, process.env.SECRETKEY, (error) => {
			if(error){
				console.log('error', error)

	            return res.status(403).json({
	            	success: false,
	                error: 'Acceso denegado',
	                message: 'validacion token'
	            });
			} 

			next()
		})


    } catch (error) {
        console.error('Error en autenticación JWT:', error.name, error.message);
        return res.status(401).json({
        	success: false,
            error: 'Acceso denegado',
            message: error.message
        });
    } 
}
	

export const authMiddleware = {auth}