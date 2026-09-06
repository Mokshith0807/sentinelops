import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

function decodeRole(token) {
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.role || payload.roles || null;
    } catch {
        return null;
    }
}

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("user") || "null");
        } catch {
            return null;
        }
    });

    useEffect(() => {
        if (token) localStorage.setItem("token", token);
        else localStorage.removeItem("token");
    }, [token]);

    useEffect(() => {
        if (user) localStorage.setItem("user", JSON.stringify(user));
        else localStorage.removeItem("user");
    }, [user]);

    const login = (newToken, userInfo) => {
        setToken(newToken);
        if (userInfo) {
            const role = userInfo.role || decodeRole(newToken) || "ENGINEER";
            setUser({ ...userInfo, role });
        } else {
            setUser({ role: decodeRole(newToken) || "ENGINEER" });
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    const role = user?.role || decodeRole(token) || null;
    const isAdmin = role === "ADMIN";

    return (
        <AuthContext.Provider value={{ token, user, role, isAdmin, isAuthenticated: !!token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

export default AuthContext;
