import * as React from 'react';
import MDSpinner from "react-md-spinner";

import styles from '../stylesheets/modules/universals/universal.module';

export default class Spinner extends React.Component {
  render() {
    return (
      <div className={styles.spinner}>
        <MDSpinner
          duration={2000}
          color1="#515e6d"
          color2="#515e6d"
          color3="#515e6d"
          color4="#AAAAAA"
          size={26}
        />
      </div>
    );
  }
}