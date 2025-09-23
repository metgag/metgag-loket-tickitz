import { jwtDecode } from "jwt-decode";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

// export function PrivateRoute({ redirectTo, children }) {
//     const navigate = useNavigate();
//     const { token } = useSelector((state) => state.auth);
//     const decoded = jwtDecode(token.token);

//     if (decoded.role == "user") {
//         navigate("/", { replace: true });
//         return
//     }

//     return children;
// }

export function AdminRoute({ children, redirectTo = "/" }) {
    const { token } = useSelector((state) => state.auth);
    // const location = useLocation();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    const decoded = jwtDecode(token.token);
    if (decoded.role !== "admin") {
        toast.error("access permission denied");
        return (
            <>
                <Toaster />
                <Navigate to={redirectTo} replace />
            </>
        );
    }

    return children;
}