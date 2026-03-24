"use client";

import { type MatchJob } from "@/lib/api";
import { JobCard } from "./JobCard";
import styles from "./ResultsList.module.css";

interface Props {
  jobs: MatchJob[];
}

export function ResultsList({ jobs }: Props) {
  if (jobs.length === 0) return null;

  return (
    <div className={styles.list}>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
