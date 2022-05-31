import axios, { AxiosResponse } from "axios";
import { Job } from "../models/job";

const sleep = (delay: number) =>{
    return new Promise((resolve) =>{
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response =>{
    try {
        await sleep(300);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;


const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const Jobs = {
    list: () => requests.get<Job[]>('/jobs'),
    details: (id: string) => requests.get<Job>(`/jobs/${id}`),
    create: (job: Job) => axios.post<void>('/jobs', job),
    update: (job: Job) => axios.put<void>(`/jobs/${job.id}`, job),
    delete: (id: string) => axios.delete<void>(`/jobs/${id}`)
}

const agent = {
    Jobs
}

export default agent;