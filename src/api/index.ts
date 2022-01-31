import { Job } from "../utils";

export const getSearchRes = async (pos: string, loc: string, page: number) => {
  //regular fetching of json file (very big, hence the await)
  let raw = await fetch(`https://job-search-api-lk.herokuapp.com/jobs?loc=${loc}&pos=${pos}&page=${page}`);
  let jobs: Array<Job> = await raw.json();
  if (jobs.length > 0) {
    return { status: 200, message: jobs };
  } else return { status: 404, message: "No jobs found!" };
};

export const getJob = async(id:number) => {
  if(id !== null) {
    let raw = await fetch(`https://job-search-api-lk.herokuapp.com/jobs/${id}`);
    let job:Job = await raw.json()
    return job
  } else return null
}
