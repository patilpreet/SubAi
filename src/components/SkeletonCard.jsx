import styles from "./SkeletonCard.module.css";

export function SkeletonCard({ height = 220 }) {
  return (
    <div className={styles.card} style={{ height }}>
      <div className={styles.thumb} />
      <div className={styles.body}>
        <div className={styles.line} style={{ width: "70%", height: 12 }} />
        <div className={styles.line} style={{ width: "45%", height: 10, marginTop: 8 }} />
        <div className={styles.tags}>
          <div className={styles.tag} />
          <div className={styles.tag} />
        </div>
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 6 }) {
  return (
    <div className={styles.grid}>
      {Array.from({ length: count }, (_, i) => (
        <SkeletonCard
          key={i}
          height={[200, 260, 180, 240, 210, 280][i % 6]}
        />
      ))}
    </div>
  );
}
