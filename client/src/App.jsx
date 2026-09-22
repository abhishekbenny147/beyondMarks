import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ExplorePage from './pages/ExplorePage'
import CareerDetailPage from './pages/CareerDetailPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import StoriesPage from './pages/StoriesPage'
import HiddenCareersPage from './pages/HiddenCareersPage'
import HiddenCareerDetailPage from './pages/HiddenCareerDetailPage'
import QuizPage from './pages/QuizPage'
import ProfilePage from './pages/ProfilePage'
import NotFoundPage from './pages/NotFoundPage'
import useAuthStore from './store/authStore'

const queryClient = new QueryClient()

function ProtectedRoute({ children }) {
  const token = useAuthStore(s => s.token)
  return token ? children : <Navigate to="/login" />
}

// Layout with Navbar + Footer
function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}

// Auth pages — full screen, no navbar, no footer
function AuthLayout({ children }) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>

          {/* Auth routes — no navbar */}
          <Route path="/login"    element={<AuthLayout><LoginPage /></AuthLayout>} />
          <Route path="/register" element={<AuthLayout><RegisterPage /></AuthLayout>} />

          {/* Main routes — with navbar + footer */}
          <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
          <Route path="/explore" element={<MainLayout><ExplorePage /></MainLayout>} />
          <Route path="/career/:slug" element={<MainLayout><CareerDetailPage /></MainLayout>} />
          <Route path="/stories" element={<MainLayout><StoriesPage /></MainLayout>} />
          <Route path="/hidden" element={<MainLayout><HiddenCareersPage /></MainLayout>} />
          <Route path="/hidden/:id" element={<MainLayout><HiddenCareerDetailPage /></MainLayout>} />
          <Route path="/quiz" element={<MainLayout><QuizPage /></MainLayout>} />
          <Route path="/profile" element={
            <MainLayout>
              <ProtectedRoute><ProfilePage /></ProtectedRoute>
            </MainLayout>
          } />
          <Route path="*" element={<MainLayout><NotFoundPage /></MainLayout>} />

        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}