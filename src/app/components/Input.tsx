import { DetailedHTMLProps, InputHTMLAttributes } from "react";

type InputProps = {
    label: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Input = ({label, ...inputProps}: InputProps) => {
    return <div style={{
        padding: 12,
        borderRadius: 12,
        overflow: "hidden",
        border: '1px solid #aaa',
        display: 'inline-block',
    }}>
        <div>{label}</div>
        <input {...inputProps} />
    </div>
    
}