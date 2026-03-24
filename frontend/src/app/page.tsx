import styles from "./page.module.css";
import { MatchDashboard } from "@/components/MatchDashboard";

export default function Home() {
  return (
    <main className={styles.main}>
      <MatchDashboard />
    </main>
  );
}
