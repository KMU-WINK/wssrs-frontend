import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RecoilRoot, useRecoilValue } from 'recoil';
import MainPage from './pages/user/MainPage/MainPage';
import PostDetailPage from './pages/user/PostDetailPage/PostDetailPage';
import ApplyPage from './pages/user/ApplyPage/ApplyPage';
import SignUpPage from './pages/auth/SignUpPage/SignUpPage';
import PasswordFindPage from './pages/auth/PasswordFindPage/PasswordFindPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage/ResetPasswordPage';
import SignInPage from './pages/auth/SignInPage/SignInPage';
import RecruitManagePage from './pages/admin/RecruitManagePage/RecruitManagePage';
import RecruitDetailPage from './pages/admin/RecruitDetailPage/RecruitDetailPage';
import RecruitAddPage from './pages/admin/RecruitAddPage/RecruitAddPage';
import userState from './recoil/userState';

const ProtectedRoute = ({ element, adminOnly }) => {
  const { isAuthenticated, email } = useRecoilValue(userState);
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }
  if (adminOnly && email !== 'admin') {
    return <Navigate to="/" />;
  }
  return element;
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <RecoilRoot>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/post-detail/:noticeId" element={<PostDetailPage />} />
            <Route path="/apply/:noticeId" element={<ApplyPage />} />
            <Route path="sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/find-password" element={<PasswordFindPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route
              path="/recruit-manage"
              element={
                <ProtectedRoute
                  element={<RecruitManagePage />}
                  adminOnly={true}
                />
              }
            />
            <Route
              path="/recruit-detail/:noticeId"
              element={
                <ProtectedRoute
                  element={<RecruitDetailPage />}
                  adminOnly={true}
                />
              }
            />
            <Route
              path="/recruit-add"
              element={
                <ProtectedRoute element={<RecruitAddPage />} adminOnly={true} />
              }
            />
          </Routes>
        </RecoilRoot>
      </BrowserRouter>
    </div>
  );
}

export default App;
