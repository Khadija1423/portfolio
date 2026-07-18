import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Projects from './pages/Projects'
import ProjectDetails from './pages/ProjectDetails'
import CustomCursor from './components/CustomCursor'
import CommandPalette from './components/CommandPalette'

function App() {
  return (
    <Layout>
      <CustomCursor />
      <CommandPalette />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
      </Routes>
    </Layout>
  )
}

export default App
