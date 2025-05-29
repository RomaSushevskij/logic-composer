import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/index.css";
import { App } from "./App.tsx";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DialogsProvider } from "@toolpad/core/useDialogs";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DialogsProvider>
        <App />
      </DialogsProvider>
    </LocalizationProvider>
  </StrictMode>,
);
