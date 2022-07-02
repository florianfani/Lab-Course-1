import React, { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { Job } from "../../../app/models/job";
import { useStore } from "../../../app/stores/store";
import {format} from 'date-fns';
import JobListItemAttendee from "./JobListItemAttendee";

interface Props {
    job: Job
}

export default function JobListItem({job}: Props) {

    
    return(
        <Segment.Group>
            <Segment>
                {job.isCancelled &&
                    <Label attached='top' color='red' content='Cancelled' style={{textAlign: 'center'}} />
                }
                <Item.Group>
                    <Item>
                        <Item.Image style={{marginBottom: 4}} size='tiny' circular src={job.post?.image || '/assets/user.png'} />
                        <Item.Content>
                            <Item.Header as={Link} to={`/jobs/${job.id}`}>
                                {job.title}
                            </Item.Header>
                            <Item.Description>Posted by <Link to={`/profiles/${job.postUsername}`}>{job.post?.displayName}</Link></Item.Description>
                            {job.isPost && (
                                <Item.Description>
                                    <Label basic color='orange'>
                                        You are posting this job interview
                                    </Label>
                                </Item.Description>
                            )}
                            {job.isGoing && !job.isPost && (
                                <Item.Description>
                                    <Label basic color='green'>
                                        You are going to this job interview
                                    </Label>
                                </Item.Description>
                            )}
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {format(job.date!, 'dd MMM yyyy h:mm aa')}
                    <Icon name='marker' /> {job.city}
                </span>
            </Segment>
            <Segment secondary>
                <JobListItemAttendee attendees={job.attendees!} />
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