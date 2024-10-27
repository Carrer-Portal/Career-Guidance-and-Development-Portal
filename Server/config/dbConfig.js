import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

export default {
    HOST :  'localhost',
    USER :  'root',
    PASSWORD :  '123456789',
    DB :  'cgd',
    dialect:'mysql',
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
    
};

