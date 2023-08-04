import React from 'react';
import {Route, Routes} from 'react-router-dom';
import s from './App.module.css';
import { CreatePage } from './components/CreatePage/CreatePage';
import FilesPage from './components/FilesPage/FilesPage';
import Layout from './components/Layout/Layout';
import LoginPage from './components/LoginPage/LoginPage';
import { MainPage } from './components/MainPage/MainPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import ViewSitePage from './components/VIewSitePage/ViewSitePage';



function App() {
  return (
    <>
      <div className={s.appWwrapper}>
      </div>
        <div className={s.appWrapperContent}>
          <Routes>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/home' element={<MainPage/>}/>
            <Route path='/' element={ <Layout/>}>
            ViewSitePage
                <Route path='/view_site_page' element={<ViewSitePage/>}/>
                <Route path='/create_page' element={<CreatePage/>}/>
                <Route path='/blog_articles'/>
                <Route path='/files' element={<FilesPage/>}/>
                <Route path='/users' />
                <Route path='/subscriptions' />
                <Route path='/archived_pages' />
                <Route path='/themes'/>
                <Route path='/plugins' />
                <Route path='/upgrade_plans'/>
            </Route>
          </Routes>      
        </div>
    </>
  );
}

export default App;
