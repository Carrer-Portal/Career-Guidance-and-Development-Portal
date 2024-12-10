import db from "../controllers/index.js";
import {run} from '../utils/chatHelper.js';

const rateMyResume = async (req, res) => {
    const result = main(req.body.prompt);
    console.log(result);
    if(result){
        res.status(200).json({ 
            message: "Resume rated successfully",
            rating: result 
        });
    }
    else{
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
};

export {rateMyResume};