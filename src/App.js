import logo from './logo.svg';
import './App.css';
import InstructorPage from './instructor';
import StudentPage from './student';
import LabPage from './student/labPage';
import AttemptPage from './student/attemptPage';
// import Home from './home';
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Link
} from "react-router-dom";



function App() {
  return (
      <Router>
        <Switch>

            {/* <Route exact path='/' element={<Home/>}/> */}
            <Route exact path='/instructor' element={<InstructorPage />}></Route>
            <Route exact path="/student" element={<StudentPage/>}></Route>
            <Route exact path="/student/lab/:labId" element={<LabPage/>}></Route>
            <Route exact path="/student/lab/attempt/:labId" element={<AttemptPage/>}></Route>
            <Route exact path='*' element={<div >Page Not Found</div>} />
          
        </Switch>
      </Router>

  );
}

export default App;