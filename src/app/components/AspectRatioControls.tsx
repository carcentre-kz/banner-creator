import { Fragment } from "react"
import { useControls } from "../hooks/controls";

export const AspectRatioControls = () => {
    const {
        aspectRatio: [, setAspectRatio],
    } = useControls();
    
    return <Fragment>
        <button 
      style={{
        padding: 12
      }}
      onClick={() => setAspectRatio(9 / 16)}>
        Aspect Ratio: 9 / 16
    </button>
    <button 
      style={{
        padding: 12
      }}
      onClick={() => setAspectRatio(1)}>
        Aspect Ratio: 1
    </button>
    <button 
      style={{
        padding: 12
      }}
      onClick={() => setAspectRatio(16 / 9)}>
        Aspect Ratio: 16 / 9
    </button>
    </Fragment>
}