import './App.css';
import { Route, Switch } from 'react-router-dom';

import { PrivateRouteClient, PrivateRouteInstructor } from './Unit3/utils/PrivateRoute'
import InstructorManageClasses from './Unit3/components/InstrucorManageClasses/InstructorManageClasses';
import ClientDashboard from './Unit3/components/Client/ClientDashboard'
//Unit 2 Component Imports:
import Header from './Unit2/Header'
import Home from './Unit2/HomeSectional'
import Login from './Unit2/LoginSectional'
import Signup from './Unit2/SignupSectional'




function App() {
  return (
    <div className="App">
      <header className="App-header">    
          {
            //Header Component:
          }      
          <Header />
          {
            //Header Signup, Login Page Links:
          }          
      </header>
      <Switch>
        <PrivateRouteClient path='/dashboard' component={ClientDashboard} />
        <PrivateRouteInstructor path='/manage' component={InstructorManageClasses} />
        <Route path='/login' component={Login} /> 
        <Route path='/signup' component={Signup} /> 
        <Route exact path='/' component={Home} /> 
      </Switch>

    </div>
  );
}

export default App;
