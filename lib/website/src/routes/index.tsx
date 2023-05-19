import React, { useContext } from "react";

import SignRoutes from "./SiginRoutes";
import OtherRoutes from "./OtherRoutes";
import AuthContext from "../contexts/auth";

const AppRoutes: React.FC = () => {
  const { signed } = useContext(AuthContext);

  return signed ? <OtherRoutes /> : <SignRoutes/>
};

export default AppRoutes;