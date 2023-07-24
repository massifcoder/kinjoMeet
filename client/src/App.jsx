import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Front from './components/front'
import GetCall from './components/activity/getCall'
import Extra from './components/extra';

function App(props) {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Front socket={props.socket}/>}/>
        <Route path='/mail' element={<Extra/>}/>
        <Route path='/account' element={<Extra/>}/>
        <Route path='/getCall' element={<GetCall/>}/>
        <Route path='/calender' element={<Extra/>}/>
        <Route path='/bell' element={<Extra/>}/>
      </Routes>
    </Router>
  )
}

export default App
