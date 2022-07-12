import { action, makeAutoObservable, makeObservable, observable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { Job, JobFormValues } from "../models/job";
import { v4 as uuid } from "uuid";
import {format} from 'date-fns';
import { store } from "./store";
import { Profile } from "../models/profile";
import { Pagination, PagingParams } from "../models/pagination";


export default class JobStore {
    jobRegistry = new Map<string, Job>();
    selectedJob: Job | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    pagination: Pagination | null = null;
    pagingParams = new PagingParams();
    predicate = new Map().set('all', true);

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.predicate.keys(),
            () => {
                this.pagingParams = new PagingParams();
                this.jobRegistry.clear();
                this.loadJobs();
            }
        )
    }

    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    }

    setPredicate = (predicate: string, value: string | Date) => {
        const resetPredicate = () => {
            this.predicate.forEach((value, key) => {
                if (key !== 'startDate') this.predicate.delete(key);
            })
        }
        switch (predicate) {
            case 'all':
                resetPredicate();
                this.predicate.set('all', true);
                break;
            case 'isGoing':
                resetPredicate();
                this.predicate.set('isGoing', true);
                break;
            case 'isPost':
                resetPredicate();
                this.predicate.set('isPost', true);
                break;
            case 'startDate':
                this.predicate.delete('startDate');
                this.predicate.set('startDate', value);
        }
    } 

    get axiosParams() {
        const params = new URLSearchParams();
        params.append('pageNumber', this.pagingParams.pageNumber.toString());
        params.append('pageSize', this.pagingParams.pageSize.toString());
        this.predicate.forEach((value, key) => {
            if (key === 'startDate') {
                params.append(key, (value as Date).toISOString())
            } else {
                params.append(key, value);
            }
        })
        return params;
    }

    get jobsByDate() {
        return Array.from(this.jobRegistry.values()).sort((a, b) => 
        a.date!.getTime() - b.date!.getTime());
    }

    get groupedJobs() {
        return Object.entries(
            this.jobsByDate.reduce((jobs, job) => {
                const date = format(job.date!, 'dd MMM yyyy');
                jobs[date] = jobs[date] ? [...jobs[date], job] : [job];
                return jobs;
            }, {} as {[key: string]: Job[]})
        )
    }
    
    loadJobs = async () => {
        this.loadingInitial = true;
        try{
            const result = await agent.Jobs.list(this.axiosParams);
                result.data.forEach(job => {
                    this.setJob(job);
                  })
                  this.setPagination(result.pagination);
                  this.setLoadingInitial(false);
        }
        catch(error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    setPagination = (pagination: Pagination) => {
        this.pagination = pagination;
    }

    loadJob = async (id: string) => {
        let job = this.getJob(id);
        if(job) {
            this.selectedJob = job;
            return job;
        }
        else {
            this.loadingInitial = true;
            try{
                job = await agent.Jobs.details(id);
                this.setJob(job);
                runInAction(() => {
                    this.selectedJob = job;
                })
                this.setLoadingInitial(false);
                return job;
            }
            catch (error){
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setJob = (job: Job) => {
        const user = store.userStore.user;
        if(user) {
            job.isGoing = job.attendees!.some(
              a => a.username === user.username  
            )
            job.isPost = job.postUsername === user.username;
            job.post = job.attendees?.find(x => x.username === job.postUsername);
        }
        job.date = new Date(job.date!);
        this.jobRegistry.set(job.id, job);
    }

    private getJob = (id: string) => {
        return this.jobRegistry.get(id);
    }
    
    setLoadingInitial = (state: boolean) =>{
        this.loadingInitial = state;
    }


    createJob = async (job: JobFormValues) => {
        const user = store.userStore.user;
        const attendee = new Profile(user!)
        try {
            await agent.Jobs.create(job);
            const newJob = new Job(job);
            newJob.postUsername = user!.username;
            newJob.attendees = [attendee];
            this.setJob(newJob);
            runInAction(() => {
                this.selectedJob = newJob;
            })
        }
        catch (error) {
            console.log(error);
        }
    }

    updateJob = async(job: JobFormValues) => {

        try{
            await agent.Jobs.update(job);
            runInAction(() => {
                if(job.id){
                    let updatedJob = {...this.getJob(job.id), ...job}
                    this.jobRegistry.set(job.id, updatedJob as Job);
                    this.selectedJob = updatedJob as Job;
                }
            })
        }
        catch (error) {
            console.log(error);
        }
    }

    deleteJob = async (id: string) => {
        this.loading = true;
        try{
            await agent.Jobs.delete(id);
            runInAction(() => {
                this.jobRegistry.delete(id);
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

    updateAttendance = async () => {
        const user = store.userStore.user;
        this.loading = true;
        try{
            await agent.Jobs.attend(this.selectedJob!.id);
            runInAction(() => {
                if(this.selectedJob?.isGoing){
                    this.selectedJob.attendees = 
                        this.selectedJob.attendees?.filter(a => a.username !== user?.username);
                    this.selectedJob.isGoing = false;    
                }
                else{
                    const attendee = new Profile(user!);
                    this.selectedJob?.attendees?.push(attendee);
                    this.selectedJob!.isGoing = true;
                }
                this.jobRegistry.set(this.selectedJob!.id, this.selectedJob!);
            })
        }
        catch(error){
            console.log(error);
        }
        finally{
            runInAction(() => this.loading = false);
        }
    }

    cancelJobToggle = async () => {
        this.loading = true;
        try{
            await agent.Jobs.attend(this.selectedJob!.id);
            runInAction(() => {
                this.selectedJob!.isCancelled = !this.selectedJob?.isCancelled;
                this.jobRegistry.set(this.selectedJob!.id, this.selectedJob!);
            })
        }
        catch(error) {
            console.log(error);
        }
        finally{
            runInAction(() => this.loading = false);
        }
    }

    clearSelectedJob = () => {
        this.selectedJob = undefined;
    }

    updateAttendeeFollowing = (username: string) => {
        this.jobRegistry.forEach(job => {
            job.attendees.forEach(attentee => {
                if(attentee.username === username) {
                    attentee.following ? attentee.followersCount-- : attentee.followersCount++;
                    attentee.following = !attentee.following;
                }
            })
        })
    }
}