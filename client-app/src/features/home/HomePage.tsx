import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";

export default observer(function HomePage() {
    const {userStore, modalStore} = useStore();
    return(
       <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/logo.png' alt='logo' style={{marginBotton: 12}} />
                    Klinika
                </Header>
                {userStore.isLoggedIn ? (
                    <>
                    <Header as='h2' inverted content='Welcome to Klinika' />
                    <Button as={Link} to='/jobs' size='huge' inverted>
                        Go to Jobs!
                    </Button>
                    </>
                ) : (
                    <>
                    <Button onClick={() => modalStore.openModal(<LoginForm />)} size='huge' inverted>
                        Login!
                    </Button>
                    <Button onClick={() => modalStore.openModal(<RegisterForm />)} size='huge' inverted>
                        Register!
                    </Button>
                    </>
                   
                )}
                
                
            </Container>
       </Segment>
    )
})