import React, { Component } from 'react'
// import Footer from './Components/Footer'
// import LeftBar from './Components/LeftBar'
// import Main from './Components/Main'
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom'
import BigMain from './Components/BigMain'

import Personal from './Components/Personal'
import Login from './Components/Login'
import Reg from './Components/Reg'
import Check from './Components/Check'
import './App.css'


export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          {/* <Login /> */}
          <Route path="/login" component={Login}/>
          <Route path="/personal" component={Personal}/>
          <Route path="/reg" component={Reg}/>
          <Route path="/bigmain" component={BigMain}/>
          <Route path="/check" component={Check}/>
          <Redirect  to='/login'/>
        </Switch>


{/* 
          <BrowserRouter>
            <Switch>
                <Route path='/login' component={Login}/>
                <Route path='/'  render={()=>
                    localStorage.getItem('token')?
                      <NewsSandBox></NewsSandBox>:
                    <Redirect  to='/login'/>
                }/>

    
            </Switch>
        </BrowserRouter> */}
      </BrowserRouter>
    )
  }
}

