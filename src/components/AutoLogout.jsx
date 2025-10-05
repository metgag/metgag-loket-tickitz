import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { clearUser } from "../redux/slices/authSlice";
import toast from "react-hot-toast";
import { clearSchedule } from "../redux/slices/scheduleSlice";
import { clearInfo } from "../redux/slices/userSlice";

export default function AutoLogout({ children }) {
    const { token, expiresAt } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token || !expiresAt) return;

        const now = Math.floor(Date.now() / 1000);
        const remaining = expiresAt - now;

        if (remaining <= 0) {
            dispatch(clearUser());
            dispatch(clearSchedule());
            dispatch(clearInfo());
            toast.error("Session expired, signed out");
            // navigate("/auth/login");
            return;
        }

        const timer = setTimeout(() => {
            dispatch(clearUser());
            dispatch(clearSchedule());
            dispatch(clearInfo());
            toast.error("Session expired, signed out");
            // navigate("/auth/login");
        }, remaining * 1000);

        return () => clearTimeout(timer);
    }, [token, expiresAt, dispatch, navigate]);

    return children;
}