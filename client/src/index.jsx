import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { BrowserRouter, Route, Routes, } from "react-router-dom";
import { DashBoard } from "./DashBoard/DashBoard";
import { Auth } from "./Auth/Auth";

// const router = createBrowserRouter([
//   {
//     path : "/",
//     element : <DashBoard/>,
//   },
//   {
//     path : "/auth",
//     element : <Auth/>,
//   }
// ]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App>
      <Routes>
        <Route path = '/auth' element = {<Auth/>}/>
        <Route path = '/*' element = {<DashBoard/>}/>
      </Routes>
    </App>
  </BrowserRouter>

);
