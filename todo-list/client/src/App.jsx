import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AllTasks from './components/AllTasks'
import CreateTask from './components/CreateTask'
import UpdateTask from './components/UpdateTask'
import TaskDetails from './components/TaskDetails'
import Navbar from './components/Navbar'
import ErrorPage from './components/ErrorPage'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className="app-container">
      <Navbar/>
      <div className="main-content">
      <Routes>
        <Route path='/' element={<AllTasks/>}/>
        <Route path='/create-task' element={<CreateTask/>}/>
        <Route path='/edit-task/:id' element={<UpdateTask/>}/>
        <Route path='/task-details/:id' element={<TaskDetails/>}/>
        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
      </div>
      <Footer/>
    </div>
  )
}

export default App
