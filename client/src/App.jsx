import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home'; // Change the import
import About from './Pages/About'; // Change the import
import Profile from './Pages/Profile'; // Change the import
import Signin from './Pages/Signin'; // Change the import
import Header from './component/Header'; // Change the import
import Signup from './Pages/Signup'; // Change the import
import PrivateRoute from './component/PrivateRoute';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        {/* Place PrivateRoute inside a Route component */}
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;







