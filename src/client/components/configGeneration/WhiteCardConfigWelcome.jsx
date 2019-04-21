import React from 'react';
import styles from '../../stylesheets/modules/tab3/configGeneration.module';

const WhiteCardConfigWelcome = (props) => {
  return (
    <div className={`${styles.whiteCard} ${styles.welcomeCard}`}>
      <div id={styles.welcomeHeaderTabThree}>Build Customized Webpack.config File</div>
      {!props.isRootSelected && <div id={styles.welcomeMessageTabThree}>Select your project's root directory where you would like to generate your <span className={styles.codeTextStatsTabThree}>Webpack.config</span> file</div>}
    </div>
  );
}

export default WhiteCardConfigWelcome;