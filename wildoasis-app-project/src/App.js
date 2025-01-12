// import './App.css';
import GlobalStyles from './styles/GlobalStyles';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import AppLayout from './ui/AppLayout.jsx';
import Account from './pages/Account.jsx';
import Bookings from './pages/Bookings.jsx';
import Cabins from './pages/Cabins.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import Settings from './pages/Settings.jsx';
import Users from './pages/Users.jsx';




function App() {
  return (
    <>
      <GlobalStyles/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout/>}>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/Account" element={<Account/>}/>
            <Route path="/bookings" element={<Bookings/>}/>
            <Route path="/cabins" element={<Cabins/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/users" element={<Users/>}/>
            <Route path="/settings" element={<Settings/>}/>
            <Route path="/pageNotFound" element={<PageNotFound/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
