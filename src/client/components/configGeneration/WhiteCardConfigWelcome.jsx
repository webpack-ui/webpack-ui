import React from 'react';
import styles from '../../stylesheets/modules/tab3/configGeneration.module';

const WhiteCardConfigWelcome = (props) => {
  return (
    <div className={`${styles.whiteCard} ${styles.welcomeCard}`}>
      <div id={styles.welcomeHeaderTabThree}>Build Customized Webpack.config File</div>
      {!props.isFrameWorkSelected && 
        <div id={styles.welcomeMessageTabThree}>
          Select whether you want to start a React or Vue Project 
        </div>}
    </div>
  );
}

export default WhiteCardConfigWelcome;