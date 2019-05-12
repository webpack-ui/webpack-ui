import * as React from 'react';
import styles from '../../stylesheets/modules/home/home.module';

const WhiteCardWelcome = (props) => {
  return (
    <div className={`${styles.whiteCard} ${styles.welcomeCard}`} id={styles.welcomeMargin}>
      <div id={styles.welcomeHeader}>Welcome to Webpack UI</div>
      <div id={styles.welcomeMessage}>Please load your stats.json file to begin optimizing your Webpack bundle</div>
    </div>
  );
}

export default WhiteCardWelcome;