import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { getSearchRes } from "../../api";
import { SingleJob } from "../../components/Single/Single";
import { Job } from "../../utils";

import "./Search.scss";

export const Search = () => {
  const url = useLocation().search;
  let pos = new URLSearchParams(url).get("pos");
  let loc = new URLSearchParams(url).get("loc");
 
  const [jobs, setJobs] = useState<Array<Job>>();
  const [error, setError] = useState("");
  useEffect(() => {
    (pos && loc) ? getSearchRes(pos!, loc!).then((res) =>
      res.status === 404 ? setError(res.message as string) : setJobs(res.message as Array<Job>)
    ) : setError("No jobs found!")
  }, []);
  return <div className="search__wrap">
      <div className="search__results">
        {jobs?.map(job => <SingleJob key={job.job_id} job={job}/>)}
        
      </div>
      <div className="search__details">
      {error && "No jobs found!"}
      </div>
  </div>;
};
