const handleSignin =(req,res,db,bcrypt) =>{
	const {email,password}=req.body;
	if(!email||!password){
		return res.status(400).json('incorrect credentials');
	}
		return db.select('email','hash').from ('login')
		.where('email' , '=' , req.body.email)
		.then(data =>{
			const isValid = bcrypt.compareSync(password, data[0].hash);
			if(isValid){
				db.select('*').from('users')
				.where('email', '=',email)
				.then(user =>{
					res.json(user[0])
				})
				.catch(err => res.status(400).json('error fetching user'))
			}else{
				res.json('wrong Credentials')
			}	
		})
		.catch(err => res.status(400).json('Wrong Credentials'))
}
module.exports = {
		handleSignin: handleSignin
	};