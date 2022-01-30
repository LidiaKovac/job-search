import { Job } from "../utils";

export const getSearchRes = async (pos: string, loc: string) => {
  //regular fetching of json file (very big, hence the await)
  let raw = await fetch("/jobs.json");
  let jobs: Array<Job> = await raw.json();
  let found = jobs
    .filter(
      (job) =>
        job.location.toLowerCase().includes(loc.toLowerCase()) &&
        job.title.toLowerCase().includes(pos.toLowerCase())
    )
    .slice(0, 8);
  if (found.length > 0) {
    return { status: 200, message: found };
  } else return { status: 404, message: "No jobs found!" };
};
