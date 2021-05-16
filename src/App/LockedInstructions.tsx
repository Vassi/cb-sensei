import styles from './LockedInstructions.module.scss';

function LockedInstructions() {
  return (
    <div className={styles.main}>
      <h1>Instructions:</h1>
      <p>Position the overlay so that it encompasses your button bars at a minimum, otherwise you will not receive indicators appropriately.</p>
      <p>Once you are happy with this position, <strong>Lock</strong> the overlay but do not mark it as click-through until you have finished the
        configuration steps for your Job(s)</p>
    </div>
  );
}

export default LockedInstructions;
