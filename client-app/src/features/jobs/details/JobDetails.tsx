import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";



export default function JobDetails(){
    const {jobStore} = useStore();
    const {selectedJob: job, openForm, cancelSelectedJob} = jobStore;

    if(!job) return <LoadingComponent />;

    return(
        <Card fluid>
           <Image src={`/assets/categoryImages/${job.category}.jpg`} />
              <Card.Content>
                 <Card.Header>{job.title}</Card.Header>
                    <Card.Meta>
                       <span>{job.date}</span>
                    </Card.Meta>
                       <Card.Description>
                           {job.description}
                       </Card.Description>
              </Card.Content>
              <Card.Content extra>
                 <Button.Group widths='2'>
                     <Button onClick={() => openForm(job.id)} basic color='blue' content='Edit' />
                     <Button onClick={cancelSelectedJob} basic color='grey' content='Cancel' />
                 </Button.Group>
              </Card.Content>
        </Card>
    )
}