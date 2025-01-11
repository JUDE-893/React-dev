import './App.css';
import {lazy,Suspense} from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
// import Home from './Components/Home';
// import Pricing from './Components/Home/Pricing';
// import Product from './Components/Home/Product';
// import Login from './Components/Home/Login';
// import SignUp from './Components/Home/SignUp';
// import Main from './Components/Main';
import Cities from './Components/Main/Cities';
import Trip from './Components/Main/Trip';
import Countries from './Components/Main/Countries';
import AddForm from './Components/Main/AddForm';
import Loader from './Components/Loader';
import {useAuth} from './Providers/AuthProvider';
import {TripsProvider} from './Providers/TripsProvider';
import {ActiveTripProvider} from './Providers/ActiveTripProvider';

const Home = lazy( () => import('./Components/Home'));
const Pricing = lazy( () => import('./Components/Home/Pricing'));
const Product = lazy( () => import('./Components/Home/Product'));
const Login = lazy( () => import('./Components/Home/Login'));
const SignUp = lazy( () => import('./Components/Home/SignUp'));
const Main = lazy( () => import('./Components/Main'));

function App() {

  const {userData} = useAuth();

  return (
    <>
      <ActiveTripProvider>
        <Router>
          <Suspense fallback={<Loader/>}>
            <Routes>
              <Route path='/' element={<Home/>}>
                <Route path='/pricing' element={<Pricing/>} />
                <Route path='/product' element={<Product/>} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUp />} />
              </Route>
             {userData.api_token !== null && <Route path='/app' element={<TripsProvider><Main/></TripsProvider>} >
               <Route path='/app/cities' element={<Cities/>} />
               <Route path='/app/countries' element={<Countries/>} />
               <Route path='/app/trip/add' element={<AddForm/>} />
               <Route path='/app/trip/modify' element={<AddForm/>} />
               <Route path='/app/trip/:cityName' element={<Trip/>} />
              </Route>}
            </Routes>
          </Suspense>
        </Router>
      </ActiveTripProvider>
    </>
  );
}

export default App;
