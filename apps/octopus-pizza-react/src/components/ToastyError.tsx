import { useState } from "react"

interface IProps { active: boolean, errorMsg: string }
export function ToastyError({ active, errorMsg }: IProps) {

    const [displayErr, setDisplayErr] = useState('')
    if (errorMsg === '' && displayErr) {
        // don't clear the error message until the toast has vanished
        setTimeout(() => { setDisplayErr("") }, 500)
    }
    else if (displayErr !== errorMsg)
        setDisplayErr(errorMsg)

    return (
        <div className={`container-error ${active ? "active" : ""}`}>
            <div>{displayErr}</div>
        </div>
    )

}