import React from 'react';
import { observer, inject } from 'mobx-react';
import WhiteCardConfigWelcome from './WhiteCardConfigWelcome';
import WhiteCardConfigBuildConfig from './WhiteCardConfigBuildConfig';
import styles from '../../stylesheets/modules/tab3/configGeneration.module';
import { generate } from 'astring';


@inject('store')
@observer
class ConfigGeneration extends React.Component {
  // _isMounted = false;

  constructor() {
    super();
    this.state = {
      checkedReact: false,
      checkedCSS: false,
      checkedSass: false,
      checkedLess: false,
      checkedStylus: false,
      checkedSVG: false,
      checkedPNG: false,
      isFrameWorkSelected: false,
      rootCustomDirectory: '',
      formattedCode: '',
      customAST: null,
      ReactAST: null,
      CSSAST: null,
      SassAST: null,
      LessAST: null,
      StylusAST: null,
      svgAST: null,
      pngAST: null,
      numberOfRules: 0,
      moduleExist: false,
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/AST/')
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        //turn AST back to string for display
        const formattedCode = generate(json.customAST, {
          comments: true,
        })
        this.setState({ 
          customAST: json.customAST, 
          ReactAST : json.ReactAST, 
          CSSAST : json.CSSAST, 
          SassAST : json.SassAST, 
          LessAST: json.LessAST,
          StylusAST: json.StylusAST,
          pngAST : json.pngAST,
          svgAST : json.svgAST,
          formattedCode, 
        })
      })
  }

  handleChangeCheckboxReact = () => {
    let { checkedReact, ReactAST, numberOfRules, moduleExist } = this.state;
    let customAST = JSON.parse(JSON.stringify(this.state.customAST));
    let formattedCode;
    const customASTPropertyKey = [];
    customAST.body[customAST.body.length - 1].expression.right.properties.forEach((el) => {
     customASTPropertyKey.push(el.key.name)
    })
    if (!checkedReact) {
      //Add React AST 
      if (numberOfRules === 0) {
        customAST.body[customAST.body.length - 1].expression.right.properties.push(
          JSON.parse(JSON.stringify(ReactAST.body[0].expression.right.properties[0]))
        )
        moduleExist = true;
        numberOfRules += 1;
      } else {
        customAST.body[customAST.body.length - 1].expression.right.properties.forEach((el, i) => {
          if (el.key.name === "module") {
            let moduleArr = el.value.properties    
            moduleArr.forEach((moduleEl) => {
              if (moduleEl.key.name === "rules") {
                moduleEl.value.elements.unshift(
                  JSON.parse(JSON.stringify(ReactAST.body[0].expression.right.properties[0].value.properties[0].value.elements[0]))
                )
              }
            })
          }
        })
        moduleExist = true;
        numberOfRules += 1;
      }
      if (customASTPropertyKey.indexOf("resolve") === -1) {
        customAST.body[customAST.body.length - 1].expression.right.properties.push(JSON.parse(JSON.stringify(ReactAST.body[0].expression.right.properties[1])))
      }
      if (customASTPropertyKey.indexOf("devServer") === -1) {
        customAST.body[customAST.body.length - 1].expression.right.properties.push(JSON.parse(JSON.stringify(ReactAST.body[0].expression.right.properties[2])))
      }
    } else {
      let module_index = 0;
      let resolve_index = 0;
      let devServer_index = 0;
      for (let i = 0; i < customAST.body[customAST.body.length - 1].expression.right.properties.length; i += 1) {
        if (customAST.body[customAST.body.length - 1].expression.right.properties[i].key.name === "module") module_index = i
      }
      if (numberOfRules === 1 && customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties.length === 1) {
        customAST.body[customAST.body.length - 1].expression.right.properties.splice(module_index, 1)
        numberOfRules -= 1;
      } else if (numberOfRules > 1 && customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties.length === 1) {
        let tempCustomAST = [];
        for (let j = 0; j < customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties[0].value.elements.length; j += 1) {
          if (customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties[0].value.elements[j].properties[0].value.raw.includes("js|jsx")) {
            tempCustomAST = [
              ...customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties[0].value.elements.slice(0,j),
              ...customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties[0].value.elements.slice(j+1)
            ]
            numberOfRules -= 1;
          }
        }
        customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties[0].value.elements = tempCustomAST;
      }
      for (let i = 0; i < customAST.body[customAST.body.length - 1].expression.right.properties.length; i += 1) {
        if (customAST.body[customAST.body.length - 1].expression.right.properties[i].key.name === "resolve") resolve_index = i
      }
      customAST.body[customAST.body.length - 1].expression.right.properties = [
        ...customAST.body[customAST.body.length - 1].expression.right.properties.slice(0,resolve_index),
        ...customAST.body[customAST.body.length - 1].expression.right.properties.slice(resolve_index+1)
      ]
      for (let i = 0; i < customAST.body[customAST.body.length - 1].expression.right.properties.length; i += 1) {
        if (customAST.body[customAST.body.length - 1].expression.right.properties[i].key.name === "devServer") devServer_index = i
      }

      customAST.body[customAST.body.length - 1].expression.right.properties = [
        ...customAST.body[customAST.body.length - 1].expression.right.properties.slice(0,devServer_index),
        ...customAST.body[customAST.body.length - 1].expression.right.properties.slice(devServer_index+1)
      ]
    }
    formattedCode = generate(customAST, {
      comments: true,
    })
    this.setState({ checkedReact: !this.state.checkedReact, formattedCode, moduleExist, numberOfRules, customAST });
  }


  handleChangeCheckboxCSS = () => {
    let { checkedCSS, CSSAST, numberOfRules, moduleExist } = this.state
    const customAST = JSON.parse(JSON.stringify(this.state.customAST));
    let formattedCode;
    const customASTPropertyKey = [];
    customAST.body[customAST.body.length - 1].expression.right.properties.forEach((el) => {
      customASTPropertyKey.push(el.key.name)
    })
    if (!checkedCSS) {
      if (customASTPropertyKey.indexOf(CSSAST.body[0].expression.right.properties[0].key.name) === -1) {
        customAST.body[customAST.body.length - 1].expression.right.properties.push(JSON.parse(JSON.stringify(CSSAST.body[0].expression.right.properties[0])))
        moduleExist = true;
        numberOfRules += 1;
      } else {
        customAST.body[customAST.body.length - 1].expression.right.properties.forEach((el) => {
          if (el.key.name === "module") {
            let moduleArr = el.value.properties
            moduleArr.forEach((moduleEl) => {
              if (moduleEl.key.name === "rules") {   
                moduleEl.value.elements.push(JSON.parse(JSON.stringify(CSSAST.body[0].expression.right.properties[0].value.properties[0].value.elements[0])))
              }
            })
          }
        })
        moduleExist = true;
        numberOfRules += 1;
      }
    } else {
      let module_index = 0;
      for (let i = 0; i < customAST.body[customAST.body.length - 1].expression.right.properties.length; i += 1) {
        if (customAST.body[customAST.body.length - 1].expression.right.properties[i].key.name === "module") module_index = i
      }
      if (numberOfRules === 1 && customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties.length === 1) {
        customAST.body[customAST.body.length - 1].expression.right.properties.splice(module_index, 1)
        numberOfRules -= 1;
      } else if (numberOfRules > 1 && customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties.length === 1) {
        for (let j = 0; j < customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties[0].value.elements.length; j += 1) {
          if (customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties[0].value.elements[j].properties[0].value.raw.includes(".css")) {
            customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties[0].value.elements.splice(j, 1)
            numberOfRules -= 1;
          }
        }
      }  
    }
    formattedCode = generate(customAST, {
      comments: true,
    })    
    this.setState({ checkedCSS: !this.state.checkedCSS, formattedCode, numberOfRules, moduleExist, customAST });
  }

  handleChangeCheckboxSass = () => {
    let { checkedSass, SassAST, numberOfRules, moduleExist } = this.state
    const customAST = JSON.parse(JSON.stringify(this.state.customAST));
    let formattedCode;
    const customASTPropertyKey = [];
    customAST.body[customAST.body.length - 1].expression.right.properties.forEach((el) => {
      customASTPropertyKey.push(el.key.name)
    })
    if (!checkedSass) {
      if (customASTPropertyKey.indexOf(SassAST.body[0].expression.right.properties[0].key.name) === -1) {
        moduleExist = true;
        numberOfRules += 1;
        customAST.body[customAST.body.length - 1].expression.right.properties.push(JSON.parse(JSON.stringify(SassAST.body[0].expression.right.properties[0])))
      } else {
        customAST.body[customAST.body.length - 1].expression.right.properties.forEach((el) => {
          if (el.key.name === "module") {
            let moduleArr = el.value.properties
            moduleArr.forEach((moduleEl) => {
              if (moduleEl.key.name === "rules") {
                moduleEl.value.elements.push(JSON.parse(JSON.stringify(SassAST.body[0].expression.right.properties[0].value.properties[0].value.elements[0])))
              }
            })
          }
        })
        moduleExist = true;
        numberOfRules += 1;
      }
    } else {
      let module_index = 0;
      for (let i = 0; i < customAST.body[customAST.body.length - 1].expression.right.properties.length; i += 1) {
        if (customAST.body[customAST.body.length - 1].expression.right.properties[i].key.name === "module") module_index = i
      }  
      if (numberOfRules === 1 && customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties.length === 1) {  
        customAST.body[customAST.body.length - 1].expression.right.properties.splice(module_index, 1)
        numberOfRules -= 1;
      } else if (numberOfRules > 1 && customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties.length === 1) {
        for (let j = 0; j < customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties[0].value.elements.length; j += 1) {
          if (customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties[0].value.elements[j].properties[0].value.raw.includes(".scss")) {
            customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties[0].value.elements.splice(j, 1)
            numberOfRules -= 1;
          }
        }
      }
    }
    formattedCode = generate(customAST, {
      comments: true,
    })
    this.setState({
      checkedSass: !this.state.checkedSass,
      numberOfRules,
      moduleExist,
      customAST,
      formattedCode });
  }

  handleChangeCheckboxLess = () => {
    let { checkedLess, LessAST, numberOfRules, moduleExist } = this.state
    const customAST = JSON.parse(JSON.stringify(this.state.customAST));
    let formattedCode;
    const customASTPropertyKey = [];
    customAST.body[customAST.body.length - 1].expression.right.properties.forEach((el) => {
      customASTPropertyKey.push(el.key.name)
    })
    if (!checkedLess) {
      if (customASTPropertyKey.indexOf(LessAST.body[0].expression.right.properties[0].key.name) === -1) {
        moduleExist = true;
        numberOfRules += 1;
        customAST.body[customAST.body.length - 1].expression.right.properties.push(JSON.parse(JSON.stringify(LessAST.body[0].expression.right.properties[0])))
      } else {
        customAST.body[customAST.body.length - 1].expression.right.properties.forEach((el) => {
          if (el.key.name === "module") {
            let moduleArr = el.value.properties;
            moduleArr.forEach((moduleEl) => {
              if (moduleEl.key.name === "rules") {
                moduleEl.value.elements.push(JSON.parse(JSON.stringify(LessAST.body[0].expression.right.properties[0].value.properties[0].value.elements[0])))
              }
            })
          }
        })
        moduleExist = true;
        numberOfRules += 1;
      }
      formattedCode = generate(customAST, {
        comments: true,
      })
    } else {
      let module_index = 0;
      for (let i = 0; i < customAST.body[customAST.body.length - 1].expression.right.properties.length; i += 1) {
        if (customAST.body[customAST.body.length - 1].expression.right.properties[i].key.name === "module") module_index = i
      }
      if (numberOfRules === 1 && customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties.length === 1) {
        customAST.body[customAST.body.length - 1].expression.right.properties.splice(module_index, 1)
        numberOfRules -= 1;
      } else if (numberOfRules > 1 && customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties.length === 1) {
        for (let j = 0; j < customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties[0].value.elements.length; j += 1) {
          if (customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties[0].value.elements[j].properties[0].value.raw.includes(".less")) {
            customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties[0].value.elements.splice(j, 1)
            numberOfRules -= 1;
          }
        }
      }  
    }
    formattedCode = generate(customAST, {
      comments: true,
    })
    this.setState({ 
      checkedLess: !this.state.checkedLess,
      numberOfRules,
      moduleExist,
      customAST,
      formattedCode
    });
  }

  handleChangeCheckboxStylus = () => {
    let { checkedStylus, StylusAST, numberOfRules, moduleExist } = this.state
    const customAST = JSON.parse(JSON.stringify(this.state.customAST));
    let formattedCode;
    const customASTPropertyKey = [];
    customAST.body[customAST.body.length - 1].expression.right.properties.forEach((el) => {
      customASTPropertyKey.push(el.key.name)
    })
    if (!checkedStylus) {
      if (customASTPropertyKey.indexOf(StylusAST.body[0].expression.right.properties[0].key.name) === -1) {
        moduleExist = true;
        numberOfRules += 1;
        customAST.body[customAST.body.length - 1].expression.right.properties.push(JSON.parse(JSON.stringify(StylusAST.body[0].expression.right.properties[0])))
      } else {
        customAST.body[customAST.body.length - 1].expression.right.properties.forEach((el) => {
          if (el.key.name === "module") {
            let moduleArr = el.value.properties
            moduleArr.forEach((moduleEl) => {
              if (moduleEl.key.name === "rules") {
                moduleEl.value.elements.push(JSON.parse(JSON.stringify(StylusAST.body[0].expression.right.properties[0].value.properties[0].value.elements[0])))
              }
            })
          }
        })
        moduleExist = true;
        numberOfRules += 1;
      }
    } else {
      let module_index = 0;
      for (let i = 0; i < customAST.body[customAST.body.length - 1].expression.right.properties.length; i += 1) {
        if (customAST.body[customAST.body.length - 1].expression.right.properties[i].key.name === "module") module_index = i
      }
      if (numberOfRules === 1 && customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties.length === 1) {
        customAST.body[customAST.body.length - 1].expression.right.properties.splice(module_index, 1)
        numberOfRules -= 1;
      } else if (numberOfRules > 1 && customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties.length === 1) {
        for (let j = 0; j < customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties[0].value.elements.length; j += 1) {
          if (customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties[0].value.elements[j].properties[0].value.raw.includes(".styl")) {
            customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties[0].value.elements.splice(j, 1)
            numberOfRules -= 1;
          }
        }
      }
    }
    formattedCode = generate(customAST, {
        comments: true,
      })
      this.setState({ 
        checkedStylus: !this.state.checkedStylus,
        numberOfRules,
        moduleExist,
        customAST,
        formattedCode
      });
    }

  handleChangeCheckboxSVG = () => {
    let { checkedSVG, svgAST, numberOfRules, moduleExist } = this.state
    const customAST = JSON.parse(JSON.stringify(this.state.customAST))
    let formattedCode;
    const customASTPropertyKey = [];
    customAST.body[customAST.body.length - 1].expression.right.properties.forEach((el) => {
      customASTPropertyKey.push(el.key.name)
    })
    if (!checkedSVG) {
      if (customASTPropertyKey.indexOf(svgAST.body[0].expression.right.properties[0].key.name) === -1) {
        moduleExist = true;
        numberOfRules += 1;
        customAST.body[customAST.body.length - 1].expression.right.properties.push(JSON.parse(JSON.stringify(svgAST.body[0].expression.right.properties[0])))
      } else {
        customAST.body[customAST.body.length - 1].expression.right.properties.forEach((el) => {
          if (el.key.name === "module") {
            let moduleArr = el.value.properties
            moduleArr.forEach((moduleEl) => {
              if (moduleEl.key.name === "rules") {
                moduleEl.value.elements.push(JSON.parse(JSON.stringify(svgAST.body[0].expression.right.properties[0].value.properties[0].value.elements[0])))
              }
            })
          }
        })
        moduleExist = true;
        numberOfRules += 1;
      }
    } else {
      let module_index = 0;
      for (let i = 0; i < customAST.body[customAST.body.length - 1].expression.right.properties.length; i += 1) {
        if (customAST.body[customAST.body.length - 1].expression.right.properties[i].key.name === "module") module_index = i
      }
      if (numberOfRules === 1 && customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties.length === 1) {
        customAST.body[customAST.body.length - 1].expression.right.properties.splice(module_index, 1)
        numberOfRules -= 1;
      } else if (numberOfRules > 1 && customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties.length === 1) {
        for (let j = 0; j < customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties[0].value.elements.length; j += 1) {
          if (customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties[0].value.elements[j].properties[0].value.raw.includes(".svg")) {
            customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties[0].value.elements.splice(j, 1);
            numberOfRules -= 1;
          }
        }
      }
    }
    formattedCode = generate(customAST, {
      comments: true,
    });
    this.setState({ 
      checkedSVG: !this.state.checkedSVG,
      numberOfRules,
      moduleExist,
      customAST,
      formattedCode
    });
  }

  handleChangeCheckboxPNG = () => {
    let { checkedPNG, pngAST, numberOfRules, moduleExist } = this.state;
    const customAST = JSON.parse(JSON.stringify(this.state.customAST));
    let formattedCode;
    const customASTPropertyKey = [];
    customAST.body[customAST.body.length - 1].expression.right.properties.forEach((el) => {
      customASTPropertyKey.push(el.key.name)
    })
    if (!checkedPNG) {
      if (customASTPropertyKey.indexOf(pngAST.body[0].expression.right.properties[0].key.name) === -1) {
        moduleExist = true;
        numberOfRules += 1;
        customAST.body[customAST.body.length - 1].expression.right.properties.push(JSON.parse(JSON.stringify(pngAST.body[0].expression.right.properties[0])));
      } else {
        customAST.body[customAST.body.length - 1].expression.right.properties.forEach((el) => {
          if (el.key.name === "module") {
            let moduleArr = el.value.properties
            moduleArr.forEach((moduleEl) => {
              if (moduleEl.key.name === "rules") {
                moduleEl.value.elements.push(JSON.parse(JSON.stringify(pngAST.body[0].expression.right.properties[0].value.properties[0].value.elements[0])));
              }
            })
          }
        })
        moduleExist = true;
        numberOfRules += 1;
      }
    } else {
      let module_index = 0;
      for (let i = 0; i < customAST.body[customAST.body.length - 1].expression.right.properties.length; i += 1) {
        if (customAST.body[customAST.body.length - 1].expression.right.properties[i].key.name === "module") module_index = i
      }
    
      if (numberOfRules === 1 && customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties.length === 1) {
        customAST.body[customAST.body.length - 1].expression.right.properties.splice(module_index, 1)
        numberOfRules -= 1;
      } else if (numberOfRules > 1 && customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties.length === 1) {
        for (let j = 0; j < customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties[0].value.elements.length; j += 1) {
          if (customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties[0].value.elements[j].properties[0].value.raw.includes(".png")) {
            customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties[0].value.elements.splice(j, 1)
            numberOfRules -= 1;
          }
        }
      }
    }
    formattedCode = generate(customAST, {
      comments: true,
    })
    this.setState({ 
      checkedPNG: !this.state.checkedPNG,
      numberOfRules,
      moduleExist,
      customAST,
      formattedCode
    });  
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
            formattedCode={this.state.formattedCode}
            checkedReact={this.state.checkedReact}
            checkedCSS={this.state.checkedCSS}
            checkedSass={this.state.checkedSass}
            checkedLess={this.state.checkedLess}
            checkedStylus={this.state.checkedStylus}
            checkedSVG={this.state.checkedSVG}
            checkedPNG={this.state.checkedPNG}
            />
        </div>
      </div>
    );
  }
}

export default ConfigGeneration;
