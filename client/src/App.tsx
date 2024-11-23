import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Chat from './features/chat/Chat';
import NotFound from './pages/NotFound';
import MainLayout from './layouts/MainLayout';
import PrivateRoute from './utils/auth/PrivateRoute';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Private Routes */}
      <Route element={<PrivateRoute />}>
        <Route
          path="/chat"
          element={
            <MainLayout>
              <Chat />
            </MainLayout>
          }
        />
      </Route>

      {/* Not Found Route */}
      <Route
        path="*"
        element={
          <MainLayout>
            <NotFound />
          </MainLayout>
        }
      />
    </Routes>
  );
}

export default App;
