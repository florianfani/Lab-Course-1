import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { Job } from "../../../app/models/job";

interface Props{
    job: Job
    cancelSelectJob: () => void;
    openForm: (id: string) => void;
}

export default function JobDetails({job, cancelSelectJob, openForm}: Props){
    return(
        <Card fluid>
           <Image src={`/assets/categoryImages/${job.category}.jpg`} />
              <Card.Content>
                 <Card.Header>{job.title}</Card.Header>
                    <Card.Meta>
                       <span></span>
                    </Card.Meta>
                       <Card.Description>
                           {job.description}
                       </Card.Description>
              </Card.Content>
              <Card.Content extra>
                 <Button.Group widths='2'>
                     <Button onClick={() => openForm(job.id)} basic color='blue' content='Edit' />
                     <Button onClick={cancelSelectJob} basic color='grey' content='Cancel' />
                 </Button.Group>
              </Card.Content>
        </Card>
    )
}