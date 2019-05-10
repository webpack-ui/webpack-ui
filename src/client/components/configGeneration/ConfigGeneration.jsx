import React from 'react';
import { observer, inject } from 'mobx-react';
import WhiteCardConfigWelcome from './WhiteCardConfigWelcome';
import WhiteCardConfigBuildConfig from './WhiteCardConfigBuildConfig';
import styles from '../../stylesheets/modules/tab3/configGeneration.module';



@inject('store')
@observer
class ConfigGeneration extends React.Component {
  // _isMounted = false;

  constructor() {
    super();
    this.state = {
      checkedReact: false,
      checkedTypescript: false,
      checkedCSS: false,
      checkedSass: false,
      checkedLess: false,
      checkedStylus: false,
      checkedSVG: false,
      checkedPNG: false,
      isFrameWorkSelected: false,
      rootCustomDirectory: '',
      defaultFormattedCode: '',
      AST: {},
    }
  }

  componentDidMount() {
    // ipcRenderer.on('customRootDirectrySet', (event, customDirectory) => {
    //   this.setState({ rootCustomDirectory: customDirectory });
    // });

    // ipcRenderer.send('CustomAST', 'ping');
    // ipcRenderer.on('transferCustomAST', (event, formattedCode1) => {
    //   this.setState({ defaultFormattedCode: formattedCode1 });
    // });

    // ipcRenderer.on('root-is-selected', () => {
    //   this.doSetRootSelected();
    // });
  }

  handleChangeCheckboxReact = (event) => {
    // if (this.state.checkedReact === false) ipcRenderer.send('addReactToAST');
    // else ipcRenderer.send('removeReactToAST');

    this.setState({ checkedReact: !this.state.checkedReact });
  }

  handleChangeCheckboxCSS = (event) => {
    // if (this.state.checkedCSS === false) ipcRenderer.send('addCSSToAST');
    // else ipcRenderer.send('removeCSSToAST');

    this.setState({ checkedCSS: !this.state.checkedCSS });
  }

  handleChangeCheckboxSass = (event) => {
    // if (this.state.checkedSass === false) ipcRenderer.send('addSassToAST');
    // else ipcRenderer.send('removeSassToAST');

    this.setState({ checkedSass: !this.state.checkedSass });
  }

  handleChangeCheckboxLess = (event) => {
    // if (this.state.checkedLess === false) ipcRenderer.send('addLessToAST');
    // else ipcRenderer.send('removeLessToAST');

    this.setState({ checkedLess: !this.state.checkedLess });
  }

  handleChangeCheckboxStylus = (event) => {
    // if (this.state.checkedStylus === false) ipcRenderer.send('addStylusToAST');
    // else ipcRenderer.send('removeStylusToAST');

    this.setState({ checkedStylus: !this.state.checkedStylus });
  }

  handleChangeCheckboxSVG = (event) => {
    // console.log('infunction first')
    // if (this.state.checkedSVG === false) ipcRenderer.send('addSVGToAST');
    // else ipcRenderer.send('removeSVGToAST');

    this.setState({ checkedSVG: !this.state.checkedSVG });
  }

  handleChangeCheckboxPNG = (event) => {
    // if (this.state.checkedPNG === false) ipcRenderer.send('addPNGToAST');
    // else ipcRenderer.send('removePNGToAST');

    this.setState({ checkedPNG: !this.state.checkedPNG });
  }

  selectCustomWebConfigRoot = (event) => {
    // ipcRenderer.send('selectCustomWebConfig', 'ping');
  }

  selectGenerateWebConfigRoot = (event) => {
    // ipcRenderer.send('saveCustomConfig', this.state.rootCustomDirectory);

    this.doSetCustomConfigSaved();
  }

  doSetCustomConfigSaved() {
    this.props.store.setCustomConfigSavedTrue()
  }

  render() {
    const { store } = this.props;
    return (
      <div className={styles.mainContainerHome}>
        <div>
          <WhiteCardConfigWelcome
            isFrameWorkSelected={this.state.isFrameWorkSelected}
          />
          <WhiteCardConfigBuildConfig 
            handleChangeCheckboxReact={this.handleChangeCheckboxReact}
            handleChangeCheckboxCSS={this.handleChangeCheckboxCSS}
            handleChangeCheckboxSass={this.handleChangeCheckboxSass}
            handleChangeCheckboxLess={this.handleChangeCheckboxLess}
            handleChangeCheckboxStylus={this.handleChangeCheckboxStylus}
            handleChangeCheckboxSVG={this.handleChangeCheckboxSVG}
            handleChangeCheckboxPNG={this.handleChangeCheckboxPNG}
            selectGenerateWebConfigRoot={this.selectGenerateWebConfigRoot}
            defaultFormattedCode={this.state.defaultFormattedCode}
            />
        </div>
      </div>
    );
  }
}

export default ConfigGeneration;
