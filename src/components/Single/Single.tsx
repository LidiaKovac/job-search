import { FC, useState } from "react";
import { Job } from "../../utils";

import "./Single.scss";

interface SingleProps {
  job: Job;
  selected: Function,
  isSelected: boolean
}
export const SingleJob: FC<SingleProps> = ({ job, selected, isSelected }) => {
//   const [isSelected, setSelected] = useState<number | undefined>(undefined);
  return (
    <div
      onClick={() => selected(job.job_id)}
      className={!isSelected ? "single__wrap" : "single__wrap selected"}
    >
      <h3 className="job__title">{job?.title}</h3>
      <div className="job__industry-location">
        
        {job?.industry && <div className="job__industry">{job?.employment_type}</div>}
        {job?.location && <div className="job__location"> // {job?.location} </div>}
      </div>
    </div>
  );
};
