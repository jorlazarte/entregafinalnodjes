import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config()

const login = (req, res) => {

	const { email, password } = req.body
	console.log('login', email, password)

	if( email === "admin@mail.com" && password === "123456"){
		console.log('login OK')

		const token = jwt.sign( 
								{email, fecha: Date.now()}, 
								process.env.SECRETKEY, 
								{expiresIn: '1h'} 
								)
		
		return res.json( {success: true, token} )
	}else{
		console.log('login error')
		return res.status(401).json( {success: false, message: "credenciales error", email: email, password: password} )
	}

	
}

const dashboard = (req, res) => {

	console.log('dashboard')
	return res.json( {success: true, message: "bienvenidos al dashboard - login OK"} )
	
}

export const authController = {login, dashboard}