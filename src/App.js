import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Layout from './components/Layout/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import CourseDetails from './pages/CourseDetails';
import MyCourses from './pages/MyCourses';
import InstructorProfile from './pages/InstructorProfile';
import Landing from './pages/Landing';
import SignUpModern from './pages/SignUpModern';
import SignIn from './pages/SignIn';
import ResetPassword from './pages/ResetPassword';
import TeacherSignUp from './pages/TeacherSignUp';
import TeacherVerification from './pages/TeacherVerification';
import CourseDiscussion from './pages/CourseDiscussion';
import Checkout from './pages/Checkout';
import CourseBrowser from './pages/courses/CourseBrowser';
import ProfilePage from './pages/profile/ProfilePage';
import WalletPage from './pages/wallet/WalletPage';
import CertificatesPage from './pages/certificates/CertificatesPage';
import TodoPage from './pages/todo/TodoPage';
import LeaderboardPage from './pages/leaderboard/LeaderboardPage';
import TrainerDashboard from './pages/trainer/TrainerDashboard';
import Cart from './pages/Cart';
import UserManagement from './pages/admin/UserManagement';
import CategoryManagement from './pages/admin/CategoryManagement';
import NotificationsPage from './pages/notifications/NotificationsPage';
import SettingsPage from './pages/settings/SettingsPage';
import Blog from './pages/newsSettler/Blog';
import UserGuides from './pages/newsSettler/UserGuides';
import Webinars from './pages/newsSettler/Webinars';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import SubAdminPage from './pages/subadmin/SubAdminPage';
import AddAdmin from './pages/admin/AddAdmin';
import ProtectedRoute from './components/ProtectedRoute';
import DistributeAdmin from './pages/admin/DistributeAdmin';
import EmailVerification from './pages/EmailVerification';
import TeachersPage from './pages/subadmin/TeachersPage';
import StudentsPage from './pages/subadmin/StudentsPage';
import Promotions from './pages/Promotions';
import Support from './pages/Support';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ErrorBoundary>
          <Router>
            <Layout>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Landing />} />
                <Route path="/signup" element={<SignUpModern />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/teacher-signup" element={<TeacherSignUp />} />
                <Route path="/teacher-verification" element={<TeacherVerification />} />
                <Route path="/email-verification" element={<EmailVerification />} />
                <Route path="/Checkout" element={<Checkout />} />
                <Route path="/WalletPage" element={<WalletPage />} />
                <Route path="/Cart" element={<Cart />} />
                <Route path="/TrainerDashboard" element ={<TrainerDashboard/>}/>
                <Route path ="/SettingsPage" element ={<SettingsPage />}/>
                <Route path="/Mycourses" element ={<MyCourses/>}/>
                <Route path="/certificates" element ={<CertificatesPage/>}/>
                <Route path="/to-do" element = {<TodoPage/>}/>
                <Route path= "/AdminDashboard" element ={<AdminDashboard/>}/>


                {/* User routes (guest, child, woman) */}
                <Route path="/home" element={
                  <ProtectedRoute allowedRoles={['guest', 'child', 'woman']}>
                    <Home />
                  </ProtectedRoute>
                } />
                <Route path="/courses" element={
                  <ProtectedRoute allowedRoles={['guest', 'child', 'woman']}>
                    <CourseBrowser />
                  </ProtectedRoute>
                } />
                <Route path="/course/:id" element={
                  <ProtectedRoute allowedRoles={['guest', 'child', 'woman']}>
                    <CourseDetails />
                  </ProtectedRoute>
                } />
                <Route path="/course/:id/discussion" element={
                  <ProtectedRoute allowedRoles={['guest', 'child', 'woman']}>
                    <CourseDiscussion />
                  </ProtectedRoute>
                } />
                <Route path="/my-courses" element={
                  <ProtectedRoute allowedRoles={['guest', 'child', 'woman']}>
                    <MyCourses />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute allowedRoles={['guest', 'child', 'woman', 'teacher', 'supervisor', 'admin']}>
                    <ProfilePage />
                  </ProtectedRoute>
                } />
                <Route path="/wallet" element={
                  <ProtectedRoute allowedRoles={['guest', 'child', 'woman']}>
                    <WalletPage />
                  </ProtectedRoute>
                } />
                <Route path="/certificates" element={
                  <ProtectedRoute allowedRoles={['guest', 'child', 'woman']}>
                    <CertificatesPage />
                  </ProtectedRoute>
                } />
                <Route path="/todo" element={
                  <ProtectedRoute allowedRoles={['guest', 'child', 'woman']}>
                    <TodoPage />
                  </ProtectedRoute>
                } />
                <Route path="/leaderboard" element={
                  <ProtectedRoute allowedRoles={['guest', 'child', 'woman']}>
                    <LeaderboardPage />
                  </ProtectedRoute>
                } />
                <Route path="/cart" element={
                  <ProtectedRoute allowedRoles={['guest', 'child', 'woman']}>
                    <Cart />
                  </ProtectedRoute>
                } />
                <Route path="/checkout" element={
                  <ProtectedRoute allowedRoles={['guest', 'child', 'woman']}>
                    <Checkout />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard" element={
                  <ProtectedRoute allowedRoles={['guest', 'child', 'woman']}>
                    <Dashboard />
                  </ProtectedRoute>
                } />

                {/* Teacher routes (rename from trainer) */}
                <Route path="/teacher/dashboard" element={
                  <ProtectedRoute allowedRoles={['teacher','supervisor','admin']}>
                    <TrainerDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/my-teaching-profile" element={
                  <ProtectedRoute allowedRoles={['teacher']}>
                    <InstructorProfile />
                  </ProtectedRoute>
                } />

                {/* Supervisor routes */}
                <Route path="/supervisor/dashboard" element={
                  <ProtectedRoute allowedRoles={['supervisor']}>
                    <SubAdminPage />
                  </ProtectedRoute>
                } />
                <Route path="/supervisor/teachers" element={
                  <ProtectedRoute allowedRoles={['supervisor']}>
                    <TeachersPage />
                  </ProtectedRoute>
                } />
                <Route path="/supervisor/students" element={
                  <ProtectedRoute allowedRoles={['supervisor']}>
                    <StudentsPage />
                  </ProtectedRoute>
                } />
                
                {/* Admin routes */}
                <Route path="/admin/dashboard" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/admin/users" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <UserManagement />
                  </ProtectedRoute>
                } />
                <Route path="/admin/categories" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <CategoryManagement />
                  </ProtectedRoute>
                } />
                <Route path="/admin/add" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AddAdmin />
                  </ProtectedRoute>
                } />
                <Route path="/distribute-admin" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <DistributeAdmin />
                  </ProtectedRoute>
                } />
                
                {/* Shared routes */}
                <Route path="/notifications" element={
                  <ProtectedRoute allowedRoles={['guest', 'child', 'woman', 'teacher', 'supervisor', 'admin']}>
                    <NotificationsPage />
                  </ProtectedRoute>
                } />
                <Route path="/settings" element={
                  <ProtectedRoute allowedRoles={['guest', 'child', 'woman', 'teacher', 'supervisor', 'admin']}>
                    <SettingsPage />
                  </ProtectedRoute>
                } />
                <Route path="/instructor/:instructorId" element={
                  <ProtectedRoute allowedRoles={['guest', 'child', 'woman', 'teacher']}>
                    <InstructorProfile />
                  </ProtectedRoute>
                } />
                <Route path="/instructor-profile" element={
                  <ProtectedRoute allowedRoles={['guest', 'child', 'woman', 'teacher']}>
                    <InstructorProfile />
                  </ProtectedRoute>
                } />
                
                {/* Legacy routes for backward compatibility */}
                <Route path="/blog" element={
                  <ProtectedRoute allowedRoles={['guest', 'child', 'woman']}>
                    <Blog />
                  </ProtectedRoute>
                } />
                <Route path="/user-guides" element={
                  <ProtectedRoute allowedRoles={['guest', 'child', 'woman']}>
                    <UserGuides />
                  </ProtectedRoute>
                } />
                <Route path="/webinars" element={
                  <ProtectedRoute allowedRoles={['guest', 'child', 'woman']}>
                    <Webinars />
                  </ProtectedRoute>
                } />
                <Route path="/promotions" element={
                  <ProtectedRoute allowedRoles={['guest', 'child', 'woman']}>
                    <Promotions />
                  </ProtectedRoute>
                } />
                <Route path="/support" element={
                  <ProtectedRoute allowedRoles={['guest', 'child', 'woman']}>
                    <Support />
                  </ProtectedRoute>
                } />
              </Routes>
            </Layout>
          </Router>
        </ErrorBoundary>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;