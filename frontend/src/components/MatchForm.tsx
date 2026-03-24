"use client";

import { useState, useCallback, FormEvent } from "react";
import styles from "./MatchForm.module.css";

interface Props {
  onSubmit: (items: string[]) => void;
  isSubmitting: boolean;
  error: string | null;
}

export function MatchForm({ onSubmit, isSubmitting, error }: Props) {
  const [text, setText] = useState("");

  const validate = useCallback((input: string): { items: string[]; errors: string[] } => {
    const lines = input.split("\n");
    const errors: string[] = [];
    const seen = new Set<string>();
    const cleaned: string[] = [];

    lines.forEach((line, idx) => {
      const value = line.trim();
      if (!value) return;
      if (seen.has(value.toLowerCase())) {
        errors.push(`Line ${idx + 1}: duplicate entry`);
        return;
      }
      seen.add(value.toLowerCase());
      cleaned.push(value);
    });

    if (cleaned.length === 0) errors.push("Add at least 1 job description.");
    if (cleaned.length > 10) errors.push("Maximum 10 items per batch.");

    cleaned.forEach((value, idx) => {
      if (value.length < 10) errors.push(`Line ${idx + 1}: too short to score.`);
      if (value.length > 50000) errors.push(`Line ${idx + 1}: too long.`);
    });

    return { items: cleaned, errors };
  }, []);

  const { items, errors } = validate(text);
  const hasErrors = errors.length > 0;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (hasErrors || isSubmitting) return;
    onSubmit(items);
    setText("");
  };

  const loadDemo = () => {
    setText([
      "Senior Python Engineer — FastAPI, PostgreSQL, Docker, Kubernetes. 5+ years. Remote or Singapore.",
      "Frontend Developer — React, TypeScript, design systems, Next.js. 3+ years. Hybrid.",
      "Staff Backend Engineer — distributed systems, microservices, AWS, observability. 8+ years.",
      "Full-Stack Engineer — Python, React, PostgreSQL, CI/CD. 4+ years. Remote.",
    ].join("\n"));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="descriptions">Job descriptions</label>
        <textarea
          id="descriptions"
          className={styles.textarea}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={"Paste 1–10 job descriptions or URLs, one per line.\n\nExample:\nSenior Python Engineer — 5+ years, FastAPI, PostgreSQL\nhttps://company.com/jobs/senior-backend"}
          spellCheck={false}
          rows={8}
        />
        <div className={styles.help}>One item per line. Text or URLs accepted.</div>
      </div>

      {hasErrors && (
        <div className={styles.validation}>
          <strong>Validation issues:</strong>
          {errors.slice(0, 4).map((e, i) => (
            <span key={i}> • {e}</span>
          ))}
          {errors.length > 4 && <span> • …</span>}
        </div>
      )}

      {!hasErrors && text.trim().length > 0 && (
        <div className={styles.validationOk}>
          Ready. {items.length} item(s) to submit.
        </div>
      )}

      {error && (
        <div className={styles.submitError}>
          <strong>Submission failed:</strong> {error}
        </div>
      )}

      <div className={styles.actions}>
        <button
          type="submit"
          className={styles.btnPrimary}
          disabled={hasErrors || isSubmitting}
        >
          {isSubmitting ? "Submitting..." : `Submit batch${items.length > 0 ? ` (${items.length})` : ""}`}
        </button>
        <button type="button" className={styles.btnGhost} onClick={() => setText("")}>
          Clear
        </button>
        <button type="button" className={styles.btnGhost} onClick={loadDemo}>
          Load demo
        </button>
      </div>
    </form>
  );
}
