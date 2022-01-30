import { FC, useState } from "react"
import { Job } from "../../utils"

import "./Single.scss"

interface SingleProps {
    job: Job
}
export const SingleJob:FC<SingleProps> = ({job}) => {
    const [isSelected, setSelected] = useState<boolean>(false)
    return(
        <div  onClick={()=> setSelected(prev => !prev)} className={!isSelected ? "single__wrap" : "single__wrap selected"}>

        </div>
    )
}