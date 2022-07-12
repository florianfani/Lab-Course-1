import { observer } from "mobx-react-lite";
import React from "react";
import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function JobFilters() {
    const {jobStore: {predicate, setPredicate}} = useStore();
    return(
        <>
            <Menu vertical size='large' style={{width: '100%', marginTop: 25}}>
                <Header icon='filter' attached color='teal' content='Filters' />
                <Menu.Item 
                    content='All Jobs' 
                    active={predicate.has('all')}
                    onClick={() => setPredicate('all', 'true')}
                />
                <Menu.Item 
                    content="I'm going" 
                    active={predicate.has('isGoing')}
                    onClick={() => setPredicate('isGoing', 'true')}
                />
                <Menu.Item 
                    content="I'm posting"
                    active={predicate.has('isPost')}
                    onClick={() => setPredicate('isPost', 'true')}
                />

            </Menu>
            <Header  />
            <Calendar 
                onChange={(date: Date) => setPredicate('startDate', date as Date)}
                value={predicate.get('startDate') || new Date()}
            />
        </>

    )
})