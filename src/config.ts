import dotenv from 'dotenv';

dotenv.config();

export default{
    SCOPE :  process.env.SCOPE || "",
    BASE_URL : process.env.BASE_URL || "",
    API_KEY : process.env.API_KEY || ""
}