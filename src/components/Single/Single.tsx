import { FC } from "react"
import { Job } from "../../utils"

import "./Single.scss"

interface SingleProps {
    job: Job
}
export const SingleJob:FC<SingleProps> = ({job}) => {
    return(
        <div className="single__wrap">

        </div>
    )
}