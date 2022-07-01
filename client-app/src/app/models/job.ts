import { Profile } from "./profile";

export interface Job {
    id: string;
    title: string;
    description: string;
    date: Date | null;
    category: string;
    city: string;
    postUsername: string;
    isCancelled: boolean;
    isGoing: boolean;
    isPost: boolean;
    post?: Profile;
    attendees: Profile []
}

export class Job implements Job{
    constructor(init?: JobFormValues){
        Object.assign(this, init);
    }
}

export class JobFormValues {
    id?: string = undefined;
    title: string = '';
    category: string = '';
    description: string = '';
    date: Date | null = null;
    city: string = '';

    constructor(job?: JobFormValues){
        if(job){
            this.id = job.id;
            this.title = job.title;
            this.category = job.category;
            this.description = job.description;
            this.date = job.date;
            this.city = job.city;
        }
    }
}