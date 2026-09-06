import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Incidents from "./pages/Incidents";
import CreateIncident from "./pages/CreateIncident";
import IncidentDetails from "./pages/IncidentDetails";
import EditIncident from "./pages/EditIncident";
import AIAnalyzer from "./pages/AIAnalyzer";
import AIAssistant from "./pages/AIAssistant";
import AuditLogs from "./pages/AuditLogs";
import NotFound from "./pages/NotFound";

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/incidents" element={<ProtectedRoute><Incidents /></ProtectedRoute>} />
                <Route path="/incidents/new" element={<ProtectedRoute><CreateIncident /></ProtectedRoute>} />
                <Route path="/incidents/:id" element={<ProtectedRoute><IncidentDetails /></ProtectedRoute>} />
                <Route path="/incidents/:id/edit" element={<ProtectedRoute adminOnly><EditIncident /></ProtectedRoute>} />
                <Route path="/ai-analyzer" element={<ProtectedRoute><AIAnalyzer /></ProtectedRoute>} />
                <Route path="/ai-assistant" element={<ProtectedRoute><AIAssistant /></ProtectedRoute>} />
                <Route path="/audit-logs" element={<ProtectedRoute adminOnly><AuditLogs /></ProtectedRoute>} />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </AuthProvider>
    );
}

export default App;
