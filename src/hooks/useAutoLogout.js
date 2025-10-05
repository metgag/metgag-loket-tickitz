import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, tokenExpired } from "../redux/slices/tokenSlice";
import { useNavigate } from "react-router";

const useAutoLogout = () => {
    const dispatch = useDispatch();
    const { expiresAt, token } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token || !expiresAt) return;

        const now = Date.now();
        const expiryTime = new Date(expiresAt).getTime();
        const timeout = expiryTime - now;

        if (timeout <= 0) {
            dispatch(tokenExpired());
            dispatch(logout());
            navigate("/auth/login", { replace: true });
            return;
        }

        const timer = setTimeout(() => {
            dispatch(tokenExpired());
            dispatch(logout());
            navigate("/auth/login", { replace: true });
        }, timeout);

        return () => clearTimeout(timer);
    }, [dispatch, expiresAt, token, navigate]);
};

export default useAutoLogout;