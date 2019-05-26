import React , {PureComponent}from 'react';
import styles from '../../stylesheets/modules/configModification/configModification.module';

class WhiteCardConfigModWelcome extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={`${styles.whiteCard} ${styles.welcomeCard}`} id={styles.welcomeMarginConfig}>
        <div id={styles.welcomeHeaderTabThree}>Modify Webpack.config File</div>
          <div id={styles.welcomeMessageTabThree}>
            Please upload your webpack.config file to begin
          </div>
      </div>
    );
  }
}

export default WhiteCardConfigModWelcome;