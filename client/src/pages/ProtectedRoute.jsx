import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'

import PropTypes from "prop-types";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token") && Cookies.get('token');
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  return isAuthenticated ? children : null;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;

