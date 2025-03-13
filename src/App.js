import { BrowserRouter, Routes } from "react-router-dom";
import PublicRoutes from "./routes/public_routes";
import SecureRoutes from "./routes/secure_routes";

function App() {
  return (
    <div className="App">
<BrowserRouter>
        <Routes>
          {PublicRoutes()}
          {SecureRoutes()}
        </Routes>
      </BrowserRouter>    </div>
  );
}

export default App;
