// import './App.css';
import GlobalStyles from './styles/GlobalStyles';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools, ReactQueryDevtoolsPanel} from '@tanstack/react-query-devtools';
import {Toaster} from 'react-hot-toast'
import AppLayout from './ui/AppLayout.jsx';
import Account from './pages/Account.jsx';
import Bookings from './pages/Bookings.jsx';
import Booking from './pages/Booking.jsx';
import CheckIn from './pages/CheckIn.jsx';
import Cabins from './pages/Cabins.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import Settings from './pages/Settings.jsx';
import Users from './pages/Users.jsx';




function App() {

  // Setting a Query Client
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60*1000
      }
    }
  })

  return (
    <>
      <GlobalStyles/>
      <QueryClientProvider client={client}>
        <ReactQueryDevtools default={false} />
        {/*<ReactQueryDevtoolsPanel default={false} />*/}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout/>}>
              <Route path="/" element={<Dashboard/>}/>
              <Route path="/Account" element={<Account/>}/>
              <Route path="/bookings" element={<Bookings/>}/>
              <Route path="/booking/:bookingId" element={<Booking/>}/>
              <Route path="/check-in/:bookingId" element={<CheckIn/>}/>
              <Route path="/cabins" element={<Cabins/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/users" element={<Users/>}/>
              <Route path="/settings" element={<Settings/>}/>
              <Route path="/pageNotFound" element={<PageNotFound/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
      <Toaster
        position='top-center'
        gutter='8'
        containerStyle={{margin:'8px'}}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style:{
            maxWidth:500,
            fontSize:15,
            padding: '10px 24px',
            backgroundColor: "var(--bg-grey-0)",
            color: "var(--bg-grey-700)"
          }
        }}
        />
    </>
  );
}

export default App;
