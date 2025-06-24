import './App.css'
import NavBar from './components/navBar'
import { Route, Router, Routes } from 'react-router-dom'
import Home from './pages/home'
import RegisterPage from './pages/register'
import WishList from './pages/wishlist'
import Footer from './components/footer'
import { ToastContainer } from "react-toastify";
import SingleHome from './pages/singleHome'
import Login from './pages/login'
import Host from './pages/host'
import ProfilePage from './pages/profile'
import ListHome from './pages/listHome'
import ProtectedRoute from './ProtectedRoute'
import BottomNav from './components/bottomNav'
import HostBookings from './pages/hostBookings'
import NotFound from './pages/not-found'


function App() {

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/singleHome/:id" element={<SingleHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/*" element={<ProfilePage />} />
         <Route path="/*" element={<NotFound />} />

        <Route
          path="/host"
          element={
            <ProtectedRoute>
              <Host />
            </ProtectedRoute>
          }
        />
        <Route
          path="/host/listhome"
          element={
            <ProtectedRoute>
              <ListHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/host/bookings"
          element={
            <ProtectedRoute>
              <HostBookings/>
            </ProtectedRoute>
          }
        />
      </Routes>
          <div className='md:hidden'><BottomNav></BottomNav></div>
      <Footer></Footer>
    </>
  );
}


export default App
