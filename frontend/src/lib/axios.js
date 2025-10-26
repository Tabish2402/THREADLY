// https://slack-backend-beige.vercel.app/
import axios from "axios";

 //this was the first version, we just changed it at the end of the tutorial
 const BASE_URL =
   import.meta.env.MODE === "development"
     ? "http://localhost:5001/api"
    : "https://slack-backend-beige.vercel.app/api";

    export const axiosInstance=axios.create({
baseURL:BASE_URL,
withCredentials:true,

    })

