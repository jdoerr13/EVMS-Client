// src/App.jsx
import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// --- Pages ---
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EventManager from "./pages/EventManager";
import ManagerCreateEvent from "./pages/ManagerCreateEvent";
import PublicView from "./pages/PublicView";
import ReviewRequests from "./pages/ReviewRequests";
import ContractGenerator from "./pages/ContractGenerator";
import InvoiceManager from "./pages/InvoiceManager";
import RegistrationPage from "./pages/RegistrationPage";
import SpeakerBios from "./pages/SpeakerBios";
import CRM from "./pages/CRM";
import ResourceManagement from "./pages/ResourceManagement";
import Reports from "./pages/Reports";
import AccessibilityDemo from "./pages/AccessibilityDemo";
import EventRequestForm from "./pages/EventRequestForm";
import EmailRegistrants from "./pages/EmailRegistrants";
import StudentDashboard from "./pages/StudentDashboard"; 

// --- Contexts ---
import { AuthProvider } from "./contexts/AuthContext";   // mock auth for now
import { RoleProvider } from "./contexts/RoleContext";   // mock roles for now
import { EventProvider } from "./contexts/EventContext"; // ✅ hooked to server API

// --- Components ---
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";

// --- RFP-specific / demo-only pages ---
import Venues from "./pages/Venues";                // demo/mock
import BreakoutSessions from "./pages/BreakoutSessions"; // demo/mock
import MobileApp from "./pages/MobileApp";          // demo/mock
import SecuritySettings from "./pages/SecuritySettings"; // demo/mock
import DataMigration from "./pages/DataMigration";  // demo/mock
import Compliance from "./pages/Compliance";        // demo/mock

// --- Layout wrapper ---
function AppLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}

export default function App() {
  const location = useLocation();
  const hideSidebar = location.pathname === "/login";

  return (
    <AuthProvider>
      <RoleProvider>
        <EventProvider>
          {hideSidebar ? (
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          ) : (
            <AppLayout>
              <Routes>
                {/* --- Public pages (real + mock) --- */}
                <Route path="/public" element={<PublicView />} />       {/* ✅ server-backed */}
                <Route path="/student" element={<StudentDashboard />} /> {/* mock/demo */}
                <Route path="/request-event" element={<EventRequestForm />} /> {/* ✅ server-backed */}
                <Route path="/speakers" element={<SpeakerBios />} />     {/* mock/demo */}
                <Route path="/registration/:id" element={<RegistrationPage />} />

                {/* --- Admin-only (server-connected) --- */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                      <AdminDashboard /> {/* ✅ server-backed */}
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/requests"
                  element={
                    <ProtectedRoute allowedRoles={["admin", "eventManager"]}>
                      <ReviewRequests /> {/* ✅ server-backed */}
                    </ProtectedRoute>
                  }
                />

                {/* --- Event Manager (server-connected) --- */}
                <Route
                  path="/event-manager"
                  element={
                    <ProtectedRoute allowedRoles={["eventManager"]}>
                      <EventManager /> {/* ✅ server-backed */}
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/manager/create"
                  element={
                    <ProtectedRoute allowedRoles={["eventManager"]}>
                      <ManagerCreateEvent /> {/* ✅ server-backed */}
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/email-registrants"
                  element={
                    <ProtectedRoute allowedRoles={["admin", "eventManager"]}>
                      <EmailRegistrants /> {/* mock/demo */}
                    </ProtectedRoute>
                  }
                />

                {/* --- Shared Tools --- */}
                <Route
                  path="/contracts"
                  element={
                    <ProtectedRoute allowedRoles={["admin", "eventManager"]}>
                      <ContractGenerator /> {/* mock/demo */}
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/invoices"
                  element={
                    <ProtectedRoute allowedRoles={["admin", "eventManager"]}>
                      <InvoiceManager /> {/* mock/demo */}
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/crm"
                  element={
                    <ProtectedRoute allowedRoles={["admin", "eventManager"]}>
                      <CRM /> {/* mock/demo */}
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/resources"
                  element={
                    <ProtectedRoute allowedRoles={["admin", "eventManager"]}>
                      <ResourceManagement /> {/* mock/demo */}
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/reports"
                  element={
                    <ProtectedRoute allowedRoles={["admin", "eventManager"]}>
                      <Reports /> {/* mock/demo */}
                    </ProtectedRoute>
                  }
                />

                {/* --- RFP add-on pages (all mock/demo) --- */}
                <Route path="/venues" element={<ProtectedRoute allowedRoles={["admin", "eventManager"]}><Venues /></ProtectedRoute>} />
                <Route path="/breakout-sessions" element={<ProtectedRoute allowedRoles={["admin", "eventManager"]}><BreakoutSessions /></ProtectedRoute>} />
                <Route path="/mobile-app" element={<ProtectedRoute allowedRoles={["admin", "eventManager"]}><MobileApp /></ProtectedRoute>} />
                <Route path="/security-settings" element={<ProtectedRoute allowedRoles={["admin"]}><SecuritySettings /></ProtectedRoute>} />
                <Route path="/data-migration" element={<ProtectedRoute allowedRoles={["admin"]}><DataMigration /></ProtectedRoute>} />
                <Route path="/compliance" element={<ProtectedRoute allowedRoles={["admin"]}><Compliance /></ProtectedRoute>} />

                {/* --- Misc --- */}
              <Route path="/accessibility-demo" element={<AccessibilityDemo />} /> {/* demo */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            </AppLayout>
          )}
        </EventProvider>
      </RoleProvider>
    </AuthProvider>
  );
}


