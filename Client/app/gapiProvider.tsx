import { ReactNode } from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';
const GapiContext = ({ children }: { children: ReactNode }) => {
  return (
    <GoogleOAuthProvider clientId={process.env.GOOGLE || ""}>
        {children}
    </GoogleOAuthProvider>
  );
}

export default GapiContext;
