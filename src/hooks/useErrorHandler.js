import { useDispatch } from "react-redux";
import { todoActions } from "../shop/todoSlice";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function useErrorHandler() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (err) => {
    if (err.status >= 400) {
      if (err.status === 401) {
        dispatch(todoActions.changeloggedInState(false));
        localStorage.removeItem("loggedIn");
        navigate("/");
      }
      if (err.response.data.detail === "default password has to be changed") {
        toast.error("default password has to be changed");
        navigate("/change-password");
        return;
      }
      if (err.response.data.detail) toast.error(err.response.data.detail);
      else if (err.response.data.error) toast.error(err.response.data.error);
      else toast.error(JSON.stringify(err.response.data));
    }
  };
}
