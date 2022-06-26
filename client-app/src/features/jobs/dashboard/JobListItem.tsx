import React, { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { Job } from "../../../app/models/job";
import { useStore } from "../../../app/stores/store";

interface Props {
    job: Job
}

export default function JobListItem({job}: Props) {

    
    return(
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/jobs/${job.id}`}>
                                {job.title}
                            </Item.Header>
                            <Item.Description>Posted by Aurel</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {job.date}
                    <Icon name='marker' /> {job.city}
                </span>
            </Segment>
            <Segment secondary>
                Attendees go here
            </Segment>
            <Segment clearing>
                <span>{job.description}</span>
                <Button 
                    as={Link}
                    to={`/jobs/${job.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
}