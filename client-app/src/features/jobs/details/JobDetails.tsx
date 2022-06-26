import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";



export default observer(function JobDetails(){
    const {jobStore} = useStore();
    const {selectedJob: job, loadJob, loadingInitial} = jobStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
      if(id) loadJob(id);
    }, [id, loadJob]);

    if(loadingInitial || !job) return <LoadingComponent />;

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
                     <Button as={Link} to={`/manage/${job.id}`} basic color='blue' content='Edit' />
                     <Button as={Link} to='/jobs' basic color='grey' content='Cancel' />
                 </Button.Group>
              </Card.Content>
        </Card>
    )
})