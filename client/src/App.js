import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Grid, Row, Col, FlexboxGrid } from 'rsuite';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { init } from './reducers/costCenterReducer'
import 'rsuite/dist/styles/rsuite-default.css';
import './App.css'

import NavTop from './components/NavTop'
import CostCenterList from './components/CostCenterList'
import CostCenterForm from './components/CostCenterFrom'
import Notification from './components/Notification'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(init())
  }, [dispatch])

  return (
    <div  className="App">
      <Router>
        <Grid fluid={true}>
          <Row>
            <Col>
              <NavTop />
            </Col>
          </Row>
          <Row>
            <Col xs={0} sm={0} md={3} lg={5}/>
            <Col xs={24} sm={24} md={18} lg={14}>
              <Switch>
                <Route path="/form">
                  <FlexboxGrid justify="space-around">
                    <CostCenterForm />
                  </FlexboxGrid>
                </Route>
                <Route path="/">
                  <CostCenterList />
                </Route>
              </Switch>
              
              <Notification />
            </Col>
            <Col xs={0} sm={0} md={3} lg={5}/>
          </Row>
        </Grid>
      </Router>
    </div>
  );
}

export default App;
