import Client from "../../../utility/connection";

export default async function CancelCall(req,res){
    const body = JSON.parse(req.body);
    const email_id = body.username;
    await Client.connect();
    const db = Client.db('test')
    const userCollection = db.collection('userMeet');
    const user = await userCollection.updateOne({email_id:email_id},{$set : { room : null} } );
    return res.status(200).json({'user':user})
}