import axios from "axios";

export const axiosPublic = axios.create({
    //  baseURL: 'https://scic-jobtask-satyajit-server.vercel.app/'
     baseURL: 'https://scic-jobtask-satyajit-server.vercel.app/'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;