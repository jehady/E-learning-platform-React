import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import CourseDetails from './pages/CourseDetails';
import MyCourses from './pages/MyCourses';
import InstructorProfile from './pages/InstructorProfile';
import Landing from './pages/Landing';
import SignUp from './pages/SignUp';
import SignUpModern from './pages/SignUpModern';
import SignIn from './pages/SignIn';
import ResetPassword from './pages/ResetPassword';
import TeacherSignUp from './pages/TeacherSignUp';
import TeacherVerification from './pages/TeacherVerification';
import CourseDiscussion from './pages/CourseDiscussion';
import Checkout from './pages/Checkout';
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
    <ErrorBoundary>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<SignUpModern />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/teacher-signup" element={<TeacherSignUp />} />
          <Route path="/teacher-verification" element={<TeacherVerification />} />
          

          {/* Admin routes */}
          <Route path="/admin/*" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/add" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AddAdmin />
            </ProtectedRoute>
          } />

          {/* Subadmin routes */}
          <Route path="/subadmin/*" element={
            <ProtectedRoute allowedRoles={['supervisor']}>
              <SubAdminPage />
            </ProtectedRoute>
          } />

          {/* User routes (guest, child, woman) */}
          <Route path="/home" element={
            <ProtectedRoute allowedRoles={['guest', 'child', 'woman']}>
              <Home />
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
          <Route path="/my-teaching-profile" element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <InstructorProfile />
            </ProtectedRoute>
          } />
          <Route path="/checkout" element={
            <ProtectedRoute allowedRoles={['guest', 'child', 'woman']}>
              <Checkout />
            </ProtectedRoute>
          } />
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
          <Route path="/dashboard" element={
            <ProtectedRoute allowedRoles={['guest', 'child', 'woman']}>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/subadmin" element={<SubAdminPage />} />
          <Route path="/add-admin" element={<AddAdmin />} />
          <Route path="/distribute-admin" element={<DistributeAdmin />} />
          <Route path="/email-verification" element={<EmailVerification />} />
          <Route path="/teachers" element={<TeachersPage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/support" element={<Support />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;