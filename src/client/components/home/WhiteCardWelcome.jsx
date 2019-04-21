import * as React from 'react';
import styles from '../../stylesheets/modules/home/home.module';

const WhiteCardWelcome = (props) => {
  return (
    <div className={props.isWelcomeCardDisplayed ? `${styles.whiteCard} ${styles.welcomeCard}` : 'displayOff'} >
      <div id={styles.welcomeHeader}>Welcome to WebpackOps</div>
      {!props.isPackageSelected &&
        <div id={styles.welcomeMessage}>Please load your package.json file to begin optimizing your Webpack bundle</div>
      }
    </div>
  );
}

export default WhiteCardWelcome;