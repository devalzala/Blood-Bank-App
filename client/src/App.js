import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProtectedRoutes from "./components/Routes/ProtectedRoutes";
import PublicRoutes from "./components/Routes/PublicRoutes";
import Donar from "./pages/dashboard/Donar";
import { QueryClient, QueryClientProvider } from "react-query";
import Hospital from "./pages/dashboard/Hospital";
import OrganizationPage from "./pages/dashboard/OrganizationPage";
import Consumer from "./pages/dashboard/Consumer";
import Donation from "./pages/dashboard/Donation";
import Analytics from "./pages/dashboard/Analytics";
import DonarList from "./pages/Admin/DonarList";
import HospitalList from "./pages/Admin/HospitalList";
import OrganizationList from "./pages/Admin/OrganizationList";
import AdminHome from "./pages/Admin/AdminHome";

const queryClient = new QueryClient();

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={
              <PublicRoutes>
                <Login />
              </PublicRoutes>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoutes>
                <Register />
              </PublicRoutes>
            }
          />

          {/* Admin Routes */}

          <Route
            path="/admin"
            element={
              <ProtectedRoutes>
                <AdminHome />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/donar-list"
            element={
              <ProtectedRoutes>
                <DonarList />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/hospital-list"
            element={
              <ProtectedRoutes>
                <HospitalList />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/org-list"
            element={
              <ProtectedRoutes>
                <OrganizationList />
              </ProtectedRoutes>
            }
          />

          {/* Private Routes */}

          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/donar"
            element={
              <ProtectedRoutes>
                <Donar />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/hospital"
            element={
              <ProtectedRoutes>
                <Hospital />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/organization"
            element={
              <ProtectedRoutes>
                <OrganizationPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/consumer"
            element={
              <ProtectedRoutes>
                <Consumer />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/donation"
            element={
              <ProtectedRoutes>
                <Donation />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/analytics"
            element={
              <ProtectedRoutes>
                <Analytics />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;
