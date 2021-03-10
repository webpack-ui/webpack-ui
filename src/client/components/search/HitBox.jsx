import React, { Component } from 'react';
import styles from '../../stylesheets/modules/search/hitbox.module';

function htmlDecode(input) {
  //eslint-disable-next-line
  return input.replace(/[^a-z0-9\s]/gi, '').replace(/(gt)/gi, '');
}

class HitBox extends Component {
  constructor(props) {
    super(props);
    this.getScaffold = this.getScaffold.bind(this);
  }

  getScaffold(scaffoldUrl) {
    console.log('scaffoldUrl: ', scaffoldUrl);
  }

  render() {
    const { hit } = this.props;
    console.log('hit: ', hit);

    const scaffoldUrl =
      hit.repository && hit.repository.url
        ? hit.repository.url
        : `https://npmjs.com/package/${hit.name}`;

    return (
      <article className={styles['btn-container']}>
        {hit && (
          <div className={styles['product-wrapper']}>
            <a
              className={styles['hit-btn']}
              onClick={() => this.getScaffold(scaffoldUrl)}>
              <p className={styles['product-title']}>{hit.name}</p>
              {/* <img className={styles['product-title']} src={hit.owner.avatar} height='40' width='40' />*/}
              <p className={styles['product-name']}>{hit.owner.name}</p>
              {/* <p className={styles['product-desc']}>{htmlDecode(hit.description)}</p>*/}
            </a>
            <span className={styles['hit-icon']}>
              <svg className={styles['svg-icon']} viewBox="0 0 20 20">
                <path d="M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z"></path>
              </svg>
            </span>
          </div>
        )}
      </article>
    );
  }
}

export default HitBox;
