import './App.css';
import {useContext} from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Home from './Components/Home';
import Pricing from './Components/Home/Pricing';
import Product from './Components/Home/Product';
import Login from './Components/Home/Login';
import SignUp from './Components/Home/SignUp';
import Main from './Components/Main';
import Cities from './Components/Main/Cities';
import Countries from './Components/Main/Countries';
import AddForm from './Components/Main/AddForm';
import {useAuth} from './Providers/AuthProvider';
import {TripsProvider} from './Providers/TripsProvider';

import {useState} from 'react';

function App() {

  const {userData} = useAuth();


  return (
    <>
        <Router>
          <Routes>
            <Route path='/' element={<Home/>}>
              <Route path='/pricing' element={<Pricing/>} />
              <Route path='/product' element={<Product/>} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<SignUp />} />
            </Route>
           {userData.api_token !== null && <Route path='/app' element={<Main/>} >

             <Route path='/app/cities' element={<TripsProvider><Cities/></TripsProvider>} />
             <Route path='/app/countries' element={<TripsProvider><Countries/></TripsProvider>} />
             <Route path='/app/add' element={<TripsProvider><AddForm/></TripsProvider>} />

            </Route>}
          </Routes>
        </Router>
    </>
  );
}

export default App;
