import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Projects from './pages/Projects'
import ProjectDetails from './pages/ProjectDetails'
import NotFound from './pages/NotFound'
import CustomCursor from './components/CustomCursor'
import CommandPalette from './components/CommandPalette'
import ScrollFeatures from './components/ScrollFeatures'
import { Analytics } from '@vercel/analytics/react'

function App() {
  return (
    <Layout>
      <Analytics />
      <CustomCursor />
      <CommandPalette />
      <ScrollFeatures />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}

export default App
