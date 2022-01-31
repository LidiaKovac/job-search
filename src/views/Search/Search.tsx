import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { getJob, getSearchRes } from "../../api";
import { Loader } from "../../components/Loader/Loader";
import { SingleJob } from "../../components/Single/Single";
import { Job } from "../../utils";

import "./Search.scss";

export const Search = () => {
  const url = useLocation().search;
  let pos = new URLSearchParams(url).get("pos");
  let loc = new URLSearchParams(url).get("loc");
  let page = parseInt(new URLSearchParams(url).get("page")!)

  const [jobs, setJobs] = useState<Array<Job>>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [singleJob, setSingle] = useState<Job | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (pos && loc && page) {
      getSearchRes(pos!, loc!, page)
        .then(({ message, status }) => {
          if (status === 200) {
            let foundJobs = message as Array<Job>;
            setJobs(foundJobs);
            setSelected(foundJobs[0]?.job_id);
          } else setError(message as string);
        })
        .then(() => getJob(selected!))
        .then((res) => setSingle(res))
        .finally(() => setLoading(false));
    } else setError("No search parameters found");
  }, []);
  useEffect(() => {
    if (selected) {
      getJob(selected).then((res) => setSingle(res));
    }
  }, [selected]);
  return (
    <div className="search__wrap">
      <div className="search__results">
        {isLoading && (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loader />
          </div>
        )}
        {jobs?.length! > 0 &&
          jobs?.map((job) => (
            <SingleJob
              selected={(id: number) => setSelected(id)}
              isSelected={job.job_id === selected ? true : false}
              key={job.job_id}
              job={job}
            />
          ))}
          {!error && <div className="pagination" onClick={()=> window.location.search = `?pos=${pos}&loc=${loc}&page=${page! + 1}`}> See more </div>}
      </div>
      <div className="search__details">
        {isLoading ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loader />
          </div>
        ) : !error && (
          <>
            <div className="main__details">
              <div className="data">
                <h1>{singleJob?.title}</h1>
                <h2>
                  <span>{singleJob?.employment_type}</span> <span> // {singleJob?.location} </span>
                </h2>
              </div>
              <button className="smart__apply">Smart apply</button>
            </div>
            <div className="job__description">
              <h3>Job description</h3>
              <p>{singleJob?.description}</p>
              <h3>Required education</h3>
              <ul>
                {singleJob?.required_education.length! > 0
                  ? singleJob?.required_education.split(",").map((ed) => <li>{ed}</li>)
                  : "Not available"}
              </ul>
            </div>
          </>
        )}

        {jobs?.length === 0 && (
          <div className="jobs__errors">
            <span className="jobs__err-details"> No jobs! </span>
          </div>
        )}
      </div>
    </div>
  );
};
