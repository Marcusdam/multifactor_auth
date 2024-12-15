import { connect } from "mongoose";

const dbConnect = async () =>{
    try {
        const mongoDbConnection  = await connect(process.env.CONNECTION_STRING)

        console.log('Database is connected !')
        
    } 
    
    catch (error) {
        console.log(`Database connection failed ${error}`)
        
    }
}



export default  dbConnect;
