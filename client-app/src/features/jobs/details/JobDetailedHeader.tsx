import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image, Label} from 'semantic-ui-react'
import {Job} from "../../../app/models/job";
import {format} from 'date-fns';
import { useStore } from '../../../app/stores/store';

const jobImageStyle = {
    filter: 'brightness(30%)'
};

const jobImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    job: Job
}

export default observer (function JobDetailedHeader({job}: Props) {
    const {jobStore: {updateAttendance, loading, cancelJobToggle}} = useStore();
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                {job.isCancelled && 
                    <Label style={{position: 'absolute', zIndex: 1000, left: -14, top: 20}} 
                        ribbon color='red' content='Cancelled' />
                }
                <Image src={`/assets/categoryImages/${job.category}.jpg`} fluid style={jobImageStyle}/>
                <Segment style={jobImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={job.title}
                                    style={{color: 'white'}}
                                />
                                <p>{format(job.date!, 'dd MMM yyyy')}</p>
                                <p>
                                    Posted by <strong><Link to={`/profiles/${job.post?.username}`}>{job.post?.displayName}</Link></strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                {job.isPost ? (
                    <>
                        <Button 
                            color={job.isCancelled ? 'green' : 'red'}
                            floated='left'
                            basic
                            content={job.isCancelled ? 'Re-activate Job' : 'Cancel Job'}
                            onClick={cancelJobToggle}
                            loading={loading}
                        />
                        <Button as={Link} 
                            disabled={job.isCancelled}
                            to={`/manage/${job.id}`} 
                            color='orange' 
                            floated='right'>
                            Manage Job
                        </Button>
                    </>
                    
                ) : job.isGoing ? (
                    <Button loading={loading} onClick={updateAttendance}>Cancel attendance</Button>
                ) : (
                    <Button disabled={job.isCancelled} 
                        loading={loading} onClick={updateAttendance} color='teal'>
                            Join Job Interview
                    </Button>
                )}
            </Segment>
        </Segment.Group>
    )
})