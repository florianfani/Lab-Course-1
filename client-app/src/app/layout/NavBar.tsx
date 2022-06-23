import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";



export default function NavBar(){
    const {jobStore} = useStore();
    return(
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
                    Klinika
                </Menu.Item>
                <Menu.Item name='Jobs'/>
                <Menu.Item>
                    <Button onClick={() => jobStore.openForm()} positive content='Create Job'/>
                </Menu.Item>
            </Container>
        </Menu>
        
    )
}