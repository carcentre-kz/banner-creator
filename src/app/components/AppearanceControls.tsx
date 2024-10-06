import { Fragment } from "react"
import { Input } from "./Input"
import { useControls } from "../hooks/controls";

export const AppearanceControls = () => {
    const {
        opacity: [opacity, setOpacity],
        color1: [color1, setColor1],
        color2: [color2, setColor2],
        clipPath: [clipPath, setClipPath],
        borderRadius: [borderRadius, setBorderRadius],
    } = useControls();

    return <Fragment>
        <Input label='color1' type="string" value={color1} onChange={(e) => setColor1(e.target.value)} />
        <Input label='color2' type="string" value={color2} onChange={(e) => setColor2(e.target.value)} />
        <Input label='opacity' type="number" value={opacity} min={0} max={1} step={0.05} onChange={(e) => setOpacity(Number(e.target.value))} />
        <Input label='borderRadius' type="number" value={borderRadius} step={1} onChange={(e) => setBorderRadius(Number(e.target.value))} />
        <Input label='clipPath' type="text" value={clipPath} onChange={(e) => setClipPath(e.target.value)} />
    
    </Fragment>
}