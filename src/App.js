import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Stylings/GeneralStyling.css";

import MainPage from './Pages/MainPage';
import UploadAudio from './Components/UploadAudio';
import NoteListing from './Components/NoteListing';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage/>}>
          <Route path='record' element={<UploadAudio/>}/>
          <Route path='notes' element={<NoteListing/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
