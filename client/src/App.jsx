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
import useAuthStore from './store/authStore'
import NotFoundPage from './pages/NotFoundPage'

const queryClient = new QueryClient()

function ProtectedRoute({ children }) {
  const token = useAuthStore(s => s.token)
  return token ? children : <Navigate to="/login" />
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/career/:slug" element={<CareerDetailPage />} />
              <Route path="/stories" element={<StoriesPage />} />
              <Route path="/hidden" element={<HiddenCareersPage />} />
              <Route path="/hidden/:id" element={<HiddenCareerDetailPage />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/profile" element={
                <ProtectedRoute><ProfilePage /></ProtectedRoute>
              } />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}