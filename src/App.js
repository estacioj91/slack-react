import React from 'react';
import styled from "styled-components";
import {useAuthState} from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import Login from './components/Login';
import Spinner from "react-spinkit";
function App() {
  const [user, loading]= useAuthState(auth);

  if(loading) {
    return (
      <AppLoading>
        <AppLoadingContainer>
          <img src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg" alt="slack" />

          <Spinner
            name="ball-spin-fade-loader"
            fadeIn="none"
            color="purple"
          />
        </AppLoadingContainer>
      </AppLoading>
    )
  }
  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login/>
        ): <>
          <Header/>
          <AppBody>
            <Sidebar/>
            <Switch>
              <Route path="/" exact>
                <Chat/>
              </Route>
            </Switch>
          </AppBody>
        </>}
        </Router>
    </div>
  );
}

export default App;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;

const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`
const AppLoadingContainer = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  >img {
    height: 100px;
    padding: 20px;
    margin-bottom: 40px;
  }
`
