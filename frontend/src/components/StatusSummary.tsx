"use client";

import styles from "./StatusSummary.module.css";

interface Props {
  counts: {
    pending: number;
    processing: number;
    completed: number;
    failed: number;
  };
  total: number;
}

export function StatusSummary({ counts, total }: Props) {
  return (
    <div className={styles.bar}>
      <div className={styles.metric}>
        <div className={styles.k}>Queued</div>
        <div className={styles.v}>{String(counts.pending).padStart(2, "0")}</div>
        <div className={styles.s}>Waiting for workers</div>
      </div>
      <div className={styles.metric}>
        <div className={styles.k}>Processing</div>
        <div className={styles.v}>{String(counts.processing).padStart(2, "0")}</div>
        <div className={styles.s}>Claimed via SKIP LOCKED</div>
      </div>
      <div className={styles.metric}>
        <div className={styles.k}>Completed</div>
        <div className={styles.v}>{String(counts.completed).padStart(2, "0")}</div>
        <div className={styles.s}>Scored and persisted</div>
      </div>
      <div className={styles.metric}>
        <div className={styles.k}>Failed</div>
        <div className={styles.v}>{String(counts.failed).padStart(2, "0")}</div>
        <div className={styles.s}>Recoverable and retryable</div>
      </div>
    </div>
  );
}
