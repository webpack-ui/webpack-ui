import * as React from 'react';
import styles from '../stylesheets/modules/universals/universal.module';

const Button = (props) => {
  const { idName, classes } = props;

  // const classesWithStyles = classes.split(' ').forEach(class => class = 'styles')

  return (
    <button
      className={classes}
      disabled={props.condition}
      id={idName ? `${styles.idName}` : ''}
      onClick={props.func}
    >
      {props.textContent}
    </button >
  );
}

export default Button;