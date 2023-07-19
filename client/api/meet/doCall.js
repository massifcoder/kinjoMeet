import Client from "../../../utility/connection";

export default async function DoCall(req,res){
    const body = JSON.parse(req.body);
    const rooms = body.room;
    const getter = body.to;
    await Client.connect();
    const db = Client.db('test')
    const userCollection = db.collection('userMeet');
    const user = await userCollection.findOne({email_id:getter});
    if(user){
        if(user.room !=null){
            return res.status(200).json({'user':true,'avail':false})
        }
        const update = { $set : { room : rooms } };
        await userCollection.updateOne({email_id:getter},update);
        return res.status(200).json({'user':true,'avail':true})
    }
    return res.status(200).json({'user':false})
}