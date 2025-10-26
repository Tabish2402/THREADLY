import React from "react";
import { SignedIn,SignedOut,SignInButton,UserButton } from "@clerk/clerk-react";
import { Navigate, Route, Routes } from "react-router";

import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import toast from "react-hot-toast";
import * as Sentry from "@sentry/react";
const SentryRoutes = Sentry.withSentryReactRouterV7Routing(Routes);


const App = () => {
  


return (
  <>
  <button onClick={()=>toast.error("congrats")}>success</button>
     <SignedIn>
      <SentryRoutes>
        
         <Route path="/" element={<HomePage />} />
         <Route path="/auth" element={<Navigate to={"/"} replace />} />
       </SentryRoutes>
     </SignedIn>

     <SignedOut>
        <Routes>
         <Route path="/auth" element={<AuthPage />} />
         <Route path="*" element={<Navigate to={"/auth"} replace />} />
       </Routes>
     </SignedOut>
   </>
 );
};
export default App;
// first version of routing:
// return (
//   <>
//     <SignedIn>
//       <SentryRoutes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/auth" element={<Navigate to={"/"} replace />} />
//       </SentryRoutes>
//     </SignedIn>

//     <SignedOut>
//       <SentryRoutes>
//         <Route path="/auth" element={<AuthPage />} />
//         <Route path="*" element={<Navigate to={"/auth"} replace />} />
//       </SentryRoutes>
//     </SignedOut>
//   </>
// );