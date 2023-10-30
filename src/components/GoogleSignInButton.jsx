import { Button } from "./ui/button";

const GoogleSignInButton = ({ children }) => {
  const loginWithGoogle = () => {
    console.log("Login with google");
  };
  return (
    <Button onClick={loginWithGoogle} className="w-full">
      {children}
    </Button>
  );
};

export default GoogleSignInButton;
