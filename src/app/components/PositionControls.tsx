import { Fragment } from "react";
import { Input } from "./Input";
import { useControls } from "../hooks/controls";

export const PositionControls = () => {
    const {
        padding: [padding, setPadding],
        margin: [margin, setMargin],
      } = useControls();

    return (
        <Fragment>
            <Input label='padding' type="number" value={padding} onChange={(e) => setPadding(Number(e.target.value))} />
            <Input label='margin' type="number" value={margin} onChange={(e) => setMargin(Number(e.target.value))} />
        </Fragment>
    )
};