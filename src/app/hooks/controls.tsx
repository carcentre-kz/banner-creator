import { useContext } from "react";
import { ControlsrContext } from "../contexts/controls";

export const useControls = () => useContext(ControlsrContext);