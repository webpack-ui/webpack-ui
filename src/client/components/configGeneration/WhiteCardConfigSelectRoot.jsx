import * as React from 'react';
import Button from '../universals/Button';
import styles from '../../stylesheets/modules/tab3/configGeneration.module';

const WhiteCardTabThreeSelectRoot = (props) => {
  return (
    <div className={styles.whiteCard}>
      <div className={styles.tabThreeHeading}>Select your root directory</div>
      <Button
        classes={`${styles.btn} ${styles.stats}`}
        func={props.selectCustomWebConfigRoot}
        textContent="Select"
      />
    </div>
  );
}

export default WhiteCardTabThreeSelectRoot;