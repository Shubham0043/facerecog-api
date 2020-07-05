const Clarifai=require('clarifai');

const app = new Clarifai.App({
 apiKey: 'f8a83b9039a44429b8822f7f1db7c473'
});

const handleapiCall = (req,res)=>{
app.models
.predict('c0c0ac362b03416da06ab3fa36fb58e3',req.body.input)
.then(data =>{
	res.json(data);
})
.catch(err =>res.status(400).json('unable to work with api'))
}


const handleImage=(req,res,db) =>{
	const {id}=req.body;
	  db('users').where('id', '=', id)
		.increment('entries',1)
		.returning('entries')
		.then(entries =>{
			res.json(entries[0]);
		})
		.catch(err => res.status(400).json('error'))
}
module.exports={
	handleImage,
	handleapiCall
}