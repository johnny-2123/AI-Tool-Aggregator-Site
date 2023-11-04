const AuthLayout = ({ children }) => {
  return (
    <div className="p-10 rounded-md outline-accent flex items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
