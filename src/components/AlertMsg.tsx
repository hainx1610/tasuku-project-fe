import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

function AlertMsg() {
  return (
    <ToastContainer
      position="bottom-right"
      hideProgressBar={false}
      newestOnTop={false}
      pauseOnHover
    />
  );
}

export default AlertMsg;
