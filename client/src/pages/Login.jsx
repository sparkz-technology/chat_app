import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import LoginForm from '../features/authentication/LoginForm';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const notify = (user, email, password) => {
    toast(` ${user}: email: ${email}, password: ${password}`, {
      position: 'top-right',
      autoClose: "false", // 5000
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  useEffect(() => {
    notify('user1', 'user1@gmail.com', 'TestUser1@0');
    notify('user2', 'user2@gmail.com', 'TestUser2@0');
  }, []);

  return (
    <>
      <LoginForm />
      <ToastContainer
        position="top-center"
        autoClose={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"
      />
    </>
  );
}

export default Login;
