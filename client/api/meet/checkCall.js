import Client from "../../../utility/connection";
import { ObjectId } from 'mongodb';

export default async function CheckCall(req,res){
    const bod = JSON.parse(req.body);
    const email_id = bod.username;
    console.log(email_id);
    await Client.connect();
    const db = Client.db('test')
    const userCollection = db.collection('userMeet');
    const result = await userCollection.findOne({email_id:email_id});
    if(result){
        console.log(result.room);
        if(result.room){
            const id = new ObjectId(result.room);
            const ursCollection = db.collection('mailusers');
            const urs = await ursCollection.findOne({_id:id});
            console.log("User with id is :",urs);
            return res.status(200).json({'user':true,'room':result.room,'caller':urs.email_id});
        }
        return res.status(200).json({'user':true,'room':result.room})
    }
    return res.status(200).json({'user':false})
}