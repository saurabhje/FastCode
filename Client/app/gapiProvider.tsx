import { ReactNode } from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';

const GapiContext = ({ children }: { children: ReactNode }) => {
  return (
    <GoogleOAuthProvider clientId="745642142988-1edno4vb4uhhrn1gjodo1g0m27oqifba.apps.googleusercontent.com">
        {children}
    </GoogleOAuthProvider>
  );
}

export default GapiContext;
