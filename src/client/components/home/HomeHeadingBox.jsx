import * as React from 'react';
import styles from '../../stylesheets/modules/home/home.module';


const HomeHeadingBox = (props) => {
  return (
    <div className={styles.chartStatsHeadingBox}>
      <div className={styles.boxTextContainer}>
        <div>{props.textContent}</div>
        <div className={styles.textPrimaryColor}>
          {props.displayDataString || props.displayData}
        </div>
      </div>
    </div>
  );
}

export default HomeHeadingBox;