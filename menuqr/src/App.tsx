import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './contexts/AuthContext'
import { ProtectedRoute } from './routes/ProtectedRoute'
import { LoginPage } from './pages/admin/LoginPage'
import { AdminLayout } from './pages/admin/AdminLayout'
import { DashboardPage } from './pages/admin/DashboardPage'
import { MenuItemsPage } from './pages/admin/MenuPage'
import { CategoriesPage } from './pages/admin/CategoriesPage'
import { QRPage } from './pages/admin/QRPage'
import { SettingsPage } from './pages/admin/SettingsPage'
import { MenuPage } from './pages/menu/MenuPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 30, retry: 1 },
  },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/admin" replace />} />
            <Route path="/menu/:slug" element={<MenuPage />} />
            <Route path="/admin/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path="menu" element={<MenuItemsPage />} />
                <Route path="categories" element={<CategoriesPage />} />
                <Route path="qr" element={<QRPage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>
            </Route>
            <Route
              path="*"
              element={
                <div className="flex min-h-screen items-center justify-center text-stone-400">
                  404
                </div>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  )
}
