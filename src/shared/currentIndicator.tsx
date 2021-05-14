import styles from './currentIndicator.module.scss';

type currentIndicatorArgs = {
  xPos: number,
  yPos: number
};

export default function currentIndicator({ xPos, yPos }: currentIndicatorArgs) {
  return (
    <div className={styles.indicator}>
      <div></div>
      <div></div>
    </div>
  );
};