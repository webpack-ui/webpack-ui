import React from 'react';
import { observer, inject } from 'mobx-react';
import WhiteCardConfigWelcome from './WhiteCardConfigWelcome';
import WhiteCardConfigSelectRoot from './WhiteCardConfigSelectRoot';
// import WhiteCardConfigBuildConfig from './WhiteCardConfigBuildConfig';
import styles from '../../stylesheets/modules/tab3/configGeneration.module';

const initialState = {
  checkedReact: false,
  checkedTypescript: false,
  checkedCSS: false,
  checkedSass: false,
  checkedLess: false,
  checkedStylus: false,
  checkedSVG: false,
  checkedPNG: false,
  rootCustomDirectory: '',
  defaultFormattedCode: '',
  AST: {},
}

@inject('store')
@observer

class ConfigGeneration extends React.Component {
  state = initialState;
  _isMounted = false;

  constructor() {
    super();
    this.state = {

    }
  }

  render() {
    const codeString = '(num) => num + 1';
    const { store } = this.props;
    return (
      <div className={styles.mainContainerHome}>
        <div>

          <WhiteCardConfigWelcome
            isRootSelected={store.isRootSelected}
          />

          {!store.isRootSelected &&
            <WhiteCardConfigSelectRoot
              // selectCustomWebConfigRoot={this.selectCustomWebConfigRoot}
            />
          }

        </div>
      </div>
    );
  }
}

export default ConfigGeneration;
