import { action, makeAutoObservable, makeObservable, observable, runInAction } from "mobx";
import agent from "../api/agent";
import { Job } from "../models/job";
import { v4 as uuid } from "uuid";

export default class JobStore {
    jobRegistry = new Map<string, Job>();
    selectedJob: Job | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this)
    }

    get jobsByDate() {
        return Array.from(this.jobRegistry.values()).sort((a, b) => 
        Date.parse(a.date) - Date.parse(b.date));
    }
    
    loadJobs = async () => {
        try{
            const jobs = await agent.Jobs.list();
                jobs.forEach(job => {
                    job.date = job.date.split('T')[0];
                    this.jobRegistry.set(job.id, job);
                  })
                  this.setLoadingInitial(false);
        }
        catch(error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }
    
    setLoadingInitial = (state: boolean) =>{
        this.loadingInitial = state;
    }

    selectJob = (id: string) => {
        this.selectedJob = this.jobRegistry.get(id);
    }

    cancelSelectedJob = () => {
        this.selectedJob = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectJob(id) : this.cancelSelectedJob();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createJob = async (job: Job) => {
        this.loading = true;
        job.id = uuid();
        try {
            await agent.Jobs.create(job);
            runInAction(() => {
                this.jobRegistry.set(job.id, job);
                this.selectedJob = job;
                this.editMode = false;
                this.loading = false;
            })
        }
        catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateJob = async(job: Job) => {
        this.loading = true;
        try{
            await agent.Jobs.update(job);
            runInAction(() => {
                this.jobRegistry.set(job.id, job);
                this.selectedJob = job;
                this.editMode = false;
                this.loading = false;
            })
        }
        catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteJob = async (id: string) => {
        this.loading = true;
        try{
            await agent.Jobs.delete(id);
            runInAction(() => {
                this.jobRegistry.delete(id);
                if (this.selectedJob?.id === id) this.cancelSelectedJob();
                this.loading = false;
            })
        }
        catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}