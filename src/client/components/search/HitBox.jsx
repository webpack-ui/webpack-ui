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
      <article className="hit-card">
        {hit && (
          <div className={styles['product-wrapper']}>
            <button
              onClick={() => this.getScaffold(scaffoldUrl)}
              className={styles['scaffold-button']}>
              <h3 className={styles['product-title']}>{hit.name}</h3>
              {/* <img className={styles['product-title']} src={hit.owner.avatar} height='40' width='40' />*/}
              <h3 className={styles['product-name']}>{hit.owner.name}</h3>
              {/* <p className={styles['product-desc']}>{htmlDecode(hit.description)}</p>*/}
            </button>
          </div>
        )}
      </article>
    );
  }
}

export default HitBox;
