import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { googleLogin } from "../api/apiService";

const CLIENT_ID =
  "265214695919-psljrmhk4suorg6qmkll4asqfcmsq0op.apps.googleusercontent.com";

const GoogleLoginButton = () => {
  const navigate = useNavigate();

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          if (credentialResponse.credential) {
            const token = credentialResponse.credential;
            googleLogin(token)
              .then((response) => {
                toast.success("Login Successful");
                localStorage.setItem("token", response.data.access_token);
                navigate("/dashboard");
              })
              .catch((error) => {
                toast.error("Login failed:", error.response.data);
              });
          } else {
            toast.error("Login failed. Please try again.");
          }
        }}
        onError={() => {
          toast.error("Login failed. Please try again.");
        }}
        text="continue_with"
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
