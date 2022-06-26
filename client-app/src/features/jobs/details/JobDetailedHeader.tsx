import { observer } from 'mobx-react-lite';
import React from 'react'
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import {Job} from "../../../app/models/job";

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
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
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
                                <p>{job.date}</p>
                                <p>
                                    Posted by <strong>Aurel</strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button color='teal'>Join Job</Button>
                <Button>Cancel attendance</Button>
                <Button color='orange' floated='right'>
                    Manage Job
                </Button>
            </Segment>
        </Segment.Group>
    )
})