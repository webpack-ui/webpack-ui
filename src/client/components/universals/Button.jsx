import * as React from 'react';
import styles from '../../stylesheets/modules/universals/universals.module';

const Button = (props) => {
  const { idName, classes } = props;

  // const classesWithStyles = classes.split(' ').forEach(class => class = 'styles')

  return (
    <button
      className={`${styles.btn} ${styles.stats}`}
      disabled={props.condition}
      id={idName ? `${styles.idName}` : ''}
      onClick={props.func}
    >
      {props.textContent}
    </button >
  );
}

export default Button;