import React from 'react';
import { observer, inject } from 'mobx-react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { paraisoLight, docco, dark } from 'react-syntax-highlighter/dist/styles/hljs';
import { generate } from 'astring';
import styles from '../stylesheets/modules/DefaultStarter.module';

@inject('store')
@observer
class DefaultStarter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayFramework: true,
      displayLoader: false,
      displayPlugin: false,
      displaySavePage: false,
      checkedReact: false,
      checkedVue: false,
      checkedCSS: false,
      checkedSass: false,
      checkedLess: false,
      checkedStylus: false,
      checkedSVG: false,
      checkedPNG: false,
      checkedTerser: false,
      checkedHTMLPlugin: false,
      checkedMomentLocale: false,
      checkedMiniCssExtract: false,
      formattedCode: '',
      customAST: null,
      ReactAST: null,
      CSSAST: null,
      SassAST: null,
      LessAST: null,
      StylusAST: null,
      SvgAST: null,
      PngAST: null,
      HtmlAST: null,
      MomentLocaleAST: null,
      TerserAST: null,
      MiniCSSExtractAST: null,
      numberOfRules: 0,
      moduleExist: false,
      cssOriginallyChecked: false
    };
  }

  componentDidMount() {
    fetch('http://localhost:3000/AST/').then((res) => res.json()).then((json) => {
      //turn AST back to string for display
      const formattedCode = generate(json.customAST, {
        comments: true
      });
      this.setState({
        customAST: json.customAST,
        ReactAST: json.ReactAST,
        CSSAST: json.CSSAST,
        SassAST: json.SassAST,
        LessAST: json.LessAST,
        StylusAST: json.StylusAST,
        PngAST: json.PngAST,
        SvgAST: json.SvgAST,
        MomentLocaleAST: json.MomentLocaleAST,
        TerserAST: json.TerserAST,
        HtmlAST: json.HtmlAST,
        MiniCSSExtractAST: json.MiniCSSExtractAST,
        formattedCode
      });
    });
  }

  handleChangeCheckboxReact = () => {
    let { checkedReact, ReactAST, numberOfRules, moduleExist } = this.state;
    let customAST = JSON.parse(JSON.stringify(this.state.customAST));
    let formattedCode;
    const customASTPropertyKey = [];
    customAST.body[customAST.body.length - 1].expression.right.properties.forEach((el) => {
      customASTPropertyKey.push(el.key.name);
    });
    if (!checkedReact) {
      // Add React AST
      if (numberOfRules === 0) {
        customAST.body[customAST.body.length - 1].expression.right.properties.push(
          JSON.parse(JSON.stringify(ReactAST.body[0].expression.right.properties[0]))
        );
        moduleExist = true;
        numberOfRules += 1;
      } else {
        customAST.body[customAST.body.length - 1].expression.right.properties.forEach((el, i) => {
          if (el.key.name === 'module') {
            let moduleArr = el.value.properties;
            moduleArr.forEach((moduleEl) => {
              if (moduleEl.key.name === 'rules') {
                moduleEl.value.elements.unshift(
                  JSON.parse(
                    JSON.stringify(
                      ReactAST.body[0].expression.right.properties[0].value.properties[0].value.elements[0]
                    )
                  )
                );
              }
            });
          }
        });
        moduleExist = true;
        numberOfRules += 1;
      }
      if (customASTPropertyKey.indexOf('resolve') === -1) {
        customAST.body[customAST.body.length - 1].expression.right.properties.push(
          JSON.parse(JSON.stringify(ReactAST.body[0].expression.right.properties[1]))
        );
      }
      if (customASTPropertyKey.indexOf('devServer') === -1) {
        customAST.body[customAST.body.length - 1].expression.right.properties.push(
          JSON.parse(JSON.stringify(ReactAST.body[0].expression.right.properties[2]))
        );
      }
    } else {
      let module_index = 0;
      let resolve_index = 0;
      let devServer_index = 0;
      for (let i = 0; i < customAST.body[customAST.body.length - 1].expression.right.properties.length; i += 1) {
        if (customAST.body[customAST.body.length - 1].expression.right.properties[i].key.name === 'module')
          module_index = i;
      }
      if (
        numberOfRules === 1 &&
        customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties.length ===
          1
      ) {
        customAST.body[customAST.body.length - 1].expression.right.properties.splice(module_index, 1);
        numberOfRules -= 1;
      } else if (
        numberOfRules > 1 &&
        customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties.length ===
          1
      ) {
        let tempCustomAST = [];
        for (
          let j = 0;
          j <
          customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties[0].value
            .elements.length;
          j += 1
        ) {
          if (
            customAST.body[customAST.body.length - 1].expression.right.properties[
              module_index
            ].value.properties[0].value.elements[j].properties[0].value.raw.includes('js|jsx')
          ) {
            tempCustomAST = [
              ...customAST.body[customAST.body.length - 1].expression.right.properties[
                module_index
              ].value.properties[0].value.elements.slice(0, j),
              ...customAST.body[customAST.body.length - 1].expression.right.properties[
                module_index
              ].value.properties[0].value.elements.slice(j + 1)
            ];
            numberOfRules -= 1;
          }
        }
        customAST.body[customAST.body.length - 1].expression.right.properties[
          module_index
        ].value.properties[0].value.elements = tempCustomAST;
      }
      for (let i = 0; i < customAST.body[customAST.body.length - 1].expression.right.properties.length; i += 1) {
        if (customAST.body[customAST.body.length - 1].expression.right.properties[i].key.name === 'resolve')
          resolve_index = i;
      }
      customAST.body[customAST.body.length - 1].expression.right.properties = [
        ...customAST.body[customAST.body.length - 1].expression.right.properties.slice(0, resolve_index),
        ...customAST.body[customAST.body.length - 1].expression.right.properties.slice(resolve_index + 1)
      ];
      for (let i = 0; i < customAST.body[customAST.body.length - 1].expression.right.properties.length; i += 1) {
        if (customAST.body[customAST.body.length - 1].expression.right.properties[i].key.name === 'devServer')
          devServer_index = i;
      }

      customAST.body[customAST.body.length - 1].expression.right.properties = [
        ...customAST.body[customAST.body.length - 1].expression.right.properties.slice(0, devServer_index),
        ...customAST.body[customAST.body.length - 1].expression.right.properties.slice(devServer_index + 1)
      ];
    }
    formattedCode = generate(customAST, {
      comments: true
    });
    this.setState({ checkedReact: !this.state.checkedReact, formattedCode, moduleExist, numberOfRules, customAST });
  };

  handleChangeCheckboxCSS = (originCall) => {
    // if (!originCall) originCall = false;
    let { checkedCSS, CSSAST, numberOfRules, moduleExist } = this.state;
    const customAST = JSON.parse(JSON.stringify(this.state.customAST));
    let formattedCode;
    const customASTPropertyKey = [];
    customAST.body[customAST.body.length - 1].expression.right.properties.forEach((el) => {
      customASTPropertyKey.push(el.key.name);
    });
    if (!checkedCSS) {
      if (customASTPropertyKey.indexOf(CSSAST.body[0].expression.right.properties[0].key.name) === -1) {
        customAST.body[customAST.body.length - 1].expression.right.properties.push(
          JSON.parse(JSON.stringify(CSSAST.body[0].expression.right.properties[0]))
        );
        moduleExist = true;
        numberOfRules += 1;
      } else {
        customAST.body[customAST.body.length - 1].expression.right.properties.forEach((el) => {
          if (el.key.name === 'module') {
            let moduleArr = el.value.properties;
            moduleArr.forEach((moduleEl) => {
              if (moduleEl.key.name === 'rules') {
                moduleEl.value.elements.push(
                  JSON.parse(
                    JSON.stringify(CSSAST.body[0].expression.right.properties[0].value.properties[0].value.elements[0])
                  )
                );
              }
            });
          }
        });
        moduleExist = true;
        numberOfRules += 1;
      }
    } else {
      let module_index = 0;
      for (let i = 0; i < customAST.body[customAST.body.length - 1].expression.right.properties.length; i += 1) {
        if (customAST.body[customAST.body.length - 1].expression.right.properties[i].key.name === 'module')
          module_index = i;
      }
      if (
        numberOfRules === 1 &&
        customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties.length ===
          1
      ) {
        customAST.body[customAST.body.length - 1].expression.right.properties.splice(module_index, 1);
        numberOfRules -= 1;
      } else if (
        numberOfRules > 1 &&
        customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties.length ===
          1
      ) {
        for (
          let j = 0;
          j <
          customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties[0].value
            .elements.length;
          j += 1
        ) {
          if (
            customAST.body[customAST.body.length - 1].expression.right.properties[
              module_index
            ].value.properties[0].value.elements[j].properties[0].value.raw.includes('.css')
          ) {
            customAST.body[customAST.body.length - 1].expression.right.properties[
              module_index
            ].value.properties[0].value.elements.splice(j, 1);
            numberOfRules -= 1;
          }
        }
      }
    }
    formattedCode = generate(customAST, {
      comments: true
    });
    this.setState({
      checkedCSS: !this.state.checkedCSS,
      cssOriginallyChecked: !!originCall,
      formattedCode,
      numberOfRules,
      moduleExist,
      customAST
    });
  };

  handleChangeCheckboxSass = () => {
    let { checkedSass, SassAST, numberOfRules, moduleExist } = this.state;
    const customAST = JSON.parse(JSON.stringify(this.state.customAST));
    let formattedCode;
    const customASTPropertyKey = [];
    customAST.body[customAST.body.length - 1].expression.right.properties.forEach((el) => {
      customASTPropertyKey.push(el.key.name);
    });
    if (!checkedSass) {
      if (customASTPropertyKey.indexOf(SassAST.body[0].expression.right.properties[0].key.name) === -1) {
        moduleExist = true;
        numberOfRules += 1;
        customAST.body[customAST.body.length - 1].expression.right.properties.push(
          JSON.parse(JSON.stringify(SassAST.body[0].expression.right.properties[0]))
        );
      } else {
        customAST.body[customAST.body.length - 1].expression.right.properties.forEach((el) => {
          if (el.key.name === 'module') {
            let moduleArr = el.value.properties;
            moduleArr.forEach((moduleEl) => {
              if (moduleEl.key.name === 'rules') {
                moduleEl.value.elements.push(
                  JSON.parse(
                    JSON.stringify(SassAST.body[0].expression.right.properties[0].value.properties[0].value.elements[0])
                  )
                );
              }
            });
          }
        });
        moduleExist = true;
        numberOfRules += 1;
      }
    } else {
      let module_index = 0;
      for (let i = 0; i < customAST.body[customAST.body.length - 1].expression.right.properties.length; i += 1) {
        if (customAST.body[customAST.body.length - 1].expression.right.properties[i].key.name === 'module')
          module_index = i;
      }
      if (
        numberOfRules === 1 &&
        customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties.length ===
          1
      ) {
        customAST.body[customAST.body.length - 1].expression.right.properties.splice(module_index, 1);
        numberOfRules -= 1;
      } else if (
        numberOfRules > 1 &&
        customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties.length ===
          1
      ) {
        for (
          let j = 0;
          j <
          customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties[0].value
            .elements.length;
          j += 1
        ) {
          if (
            customAST.body[customAST.body.length - 1].expression.right.properties[
              module_index
            ].value.properties[0].value.elements[j].properties[0].value.raw.includes('.scss')
          ) {
            customAST.body[customAST.body.length - 1].expression.right.properties[
              module_index
            ].value.properties[0].value.elements.splice(j, 1);
            numberOfRules -= 1;
          }
        }
      }
    }
    formattedCode = generate(customAST, {
      comments: true
    });
    this.setState({
      checkedSass: !this.state.checkedSass,
      numberOfRules,
      moduleExist,
      customAST,
      formattedCode
    });
  };

  handleChangeCheckboxLess = () => {
    let { checkedLess, LessAST, numberOfRules, moduleExist } = this.state;
    const customAST = JSON.parse(JSON.stringify(this.state.customAST));
    let formattedCode;
    const customASTPropertyKey = [];
    customAST.body[customAST.body.length - 1].expression.right.properties.forEach((el) => {
      customASTPropertyKey.push(el.key.name);
    });
    if (!checkedLess) {
      if (customASTPropertyKey.indexOf(LessAST.body[0].expression.right.properties[0].key.name) === -1) {
        moduleExist = true;
        numberOfRules += 1;
        customAST.body[customAST.body.length - 1].expression.right.properties.push(
          JSON.parse(JSON.stringify(LessAST.body[0].expression.right.properties[0]))
        );
      } else {
        customAST.body[customAST.body.length - 1].expression.right.properties.forEach((el) => {
          if (el.key.name === 'module') {
            let moduleArr = el.value.properties;
            moduleArr.forEach((moduleEl) => {
              if (moduleEl.key.name === 'rules') {
                moduleEl.value.elements.push(
                  JSON.parse(
                    JSON.stringify(LessAST.body[0].expression.right.properties[0].value.properties[0].value.elements[0])
                  )
                );
              }
            });
          }
        });
        moduleExist = true;
        numberOfRules += 1;
      }
      formattedCode = generate(customAST, {
        comments: true
      });
    } else {
      let module_index = 0;
      for (let i = 0; i < customAST.body[customAST.body.length - 1].expression.right.properties.length; i += 1) {
        if (customAST.body[customAST.body.length - 1].expression.right.properties[i].key.name === 'module')
          module_index = i;
      }
      if (
        numberOfRules === 1 &&
        customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties.length ===
          1
      ) {
        customAST.body[customAST.body.length - 1].expression.right.properties.splice(module_index, 1);
        numberOfRules -= 1;
      } else if (
        numberOfRules > 1 &&
        customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties.length ===
          1
      ) {
        for (
          let j = 0;
          j <
          customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties[0].value
            .elements.length;
          j += 1
        ) {
          if (
            customAST.body[customAST.body.length - 1].expression.right.properties[
              module_index
            ].value.properties[0].value.elements[j].properties[0].value.raw.includes('.less')
          ) {
            customAST.body[customAST.body.length - 1].expression.right.properties[
              module_index
            ].value.properties[0].value.elements.splice(j, 1);
            numberOfRules -= 1;
          }
        }
      }
    }
    formattedCode = generate(customAST, {
      comments: true
    });
    this.setState({
      checkedLess: !this.state.checkedLess,
      numberOfRules,
      moduleExist,
      customAST,
      formattedCode
    });
  };

  handleChangeCheckboxStylus = () => {
    let { checkedStylus, StylusAST, numberOfRules, moduleExist } = this.state;
    const customAST = JSON.parse(JSON.stringify(this.state.customAST));
    let formattedCode;
    const customASTPropertyKey = [];
    customAST.body[customAST.body.length - 1].expression.right.properties.forEach((el) => {
      customASTPropertyKey.push(el.key.name);
    });
    if (!checkedStylus) {
      if (customASTPropertyKey.indexOf(StylusAST.body[0].expression.right.properties[0].key.name) === -1) {
        moduleExist = true;
        numberOfRules += 1;
        customAST.body[customAST.body.length - 1].expression.right.properties.push(
          JSON.parse(JSON.stringify(StylusAST.body[0].expression.right.properties[0]))
        );
      } else {
        customAST.body[customAST.body.length - 1].expression.right.properties.forEach((el) => {
          if (el.key.name === 'module') {
            let moduleArr = el.value.properties;
            moduleArr.forEach((moduleEl) => {
              if (moduleEl.key.name === 'rules') {
                moduleEl.value.elements.push(
                  JSON.parse(
                    JSON.stringify(
                      StylusAST.body[0].expression.right.properties[0].value.properties[0].value.elements[0]
                    )
                  )
                );
              }
            });
          }
        });
        moduleExist = true;
        numberOfRules += 1;
      }
    } else {
      let module_index = 0;
      for (let i = 0; i < customAST.body[customAST.body.length - 1].expression.right.properties.length; i += 1) {
        if (customAST.body[customAST.body.length - 1].expression.right.properties[i].key.name === 'module')
          module_index = i;
      }
      if (
        numberOfRules === 1 &&
        customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties.length ===
          1
      ) {
        customAST.body[customAST.body.length - 1].expression.right.properties.splice(module_index, 1);
        numberOfRules -= 1;
      } else if (
        numberOfRules > 1 &&
        customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties.length ===
          1
      ) {
        for (
          let j = 0;
          j <
          customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties[0].value
            .elements.length;
          j += 1
        ) {
          if (
            customAST.body[customAST.body.length - 1].expression.right.properties[
              module_index
            ].value.properties[0].value.elements[j].properties[0].value.raw.includes('.styl')
          ) {
            customAST.body[customAST.body.length - 1].expression.right.properties[
              module_index
            ].value.properties[0].value.elements.splice(j, 1);
            numberOfRules -= 1;
          }
        }
      }
    }
    formattedCode = generate(customAST, {
      comments: true
    });
    this.setState({
      checkedStylus: !this.state.checkedStylus,
      numberOfRules,
      moduleExist,
      customAST,
      formattedCode
    });
  };

  handleChangeCheckboxSVG = () => {
    let { checkedSVG, SvgAST, numberOfRules, moduleExist } = this.state;
    const customAST = JSON.parse(JSON.stringify(this.state.customAST));
    let formattedCode;
    const customASTPropertyKey = [];
    customAST.body[customAST.body.length - 1].expression.right.properties.forEach((el) => {
      customASTPropertyKey.push(el.key.name);
    });
    if (!checkedSVG) {
      if (customASTPropertyKey.indexOf(SvgAST.body[0].expression.right.properties[0].key.name) === -1) {
        moduleExist = true;
        numberOfRules += 1;
        customAST.body[customAST.body.length - 1].expression.right.properties.push(
          JSON.parse(JSON.stringify(SvgAST.body[0].expression.right.properties[0]))
        );
      } else {
        customAST.body[customAST.body.length - 1].expression.right.properties.forEach((el) => {
          if (el.key.name === 'module') {
            let moduleArr = el.value.properties;
            moduleArr.forEach((moduleEl) => {
              if (moduleEl.key.name === 'rules') {
                moduleEl.value.elements.push(
                  JSON.parse(
                    JSON.stringify(SvgAST.body[0].expression.right.properties[0].value.properties[0].value.elements[0])
                  )
                );
              }
            });
          }
        });
        moduleExist = true;
        numberOfRules += 1;
      }
    } else {
      let module_index = 0;
      for (let i = 0; i < customAST.body[customAST.body.length - 1].expression.right.properties.length; i += 1) {
        if (customAST.body[customAST.body.length - 1].expression.right.properties[i].key.name === 'module')
          module_index = i;
      }
      if (
        numberOfRules === 1 &&
        customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties.length ===
          1
      ) {
        customAST.body[customAST.body.length - 1].expression.right.properties.splice(module_index, 1);
        numberOfRules -= 1;
      } else if (
        numberOfRules > 1 &&
        customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties.length ===
          1
      ) {
        for (
          let j = 0;
          j <
          customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties[0].value
            .elements.length;
          j += 1
        ) {
          if (
            customAST.body[customAST.body.length - 1].expression.right.properties[
              module_index
            ].value.properties[0].value.elements[j].properties[0].value.raw.includes('.svg')
          ) {
            customAST.body[customAST.body.length - 1].expression.right.properties[
              module_index
            ].value.properties[0].value.elements.splice(j, 1);
            numberOfRules -= 1;
          }
        }
      }
    }
    formattedCode = generate(customAST, {
      comments: true
    });
    this.setState({
      checkedSVG: !this.state.checkedSVG,
      numberOfRules,
      moduleExist,
      customAST,
      formattedCode
    });
  };

  handleChangeCheckboxPNG = () => {
    let { checkedPNG, PngAST, numberOfRules, moduleExist } = this.state;
    const customAST = JSON.parse(JSON.stringify(this.state.customAST));
    let formattedCode;
    const customASTPropertyKey = [];
    customAST.body[customAST.body.length - 1].expression.right.properties.forEach((el) => {
      customASTPropertyKey.push(el.key.name);
    });
    if (!checkedPNG) {
      if (customASTPropertyKey.indexOf(PngAST.body[0].expression.right.properties[0].key.name) === -1) {
        moduleExist = true;
        numberOfRules += 1;
        customAST.body[customAST.body.length - 1].expression.right.properties.push(
          JSON.parse(JSON.stringify(PngAST.body[0].expression.right.properties[0]))
        );
      } else {
        customAST.body[customAST.body.length - 1].expression.right.properties.forEach((el) => {
          if (el.key.name === 'module') {
            let moduleArr = el.value.properties;
            moduleArr.forEach((moduleEl) => {
              if (moduleEl.key.name === 'rules') {
                moduleEl.value.elements.push(
                  JSON.parse(
                    JSON.stringify(PngAST.body[0].expression.right.properties[0].value.properties[0].value.elements[0])
                  )
                );
              }
            });
          }
        });
        moduleExist = true;
        numberOfRules += 1;
      }
    } else {
      let module_index = 0;
      for (let i = 0; i < customAST.body[customAST.body.length - 1].expression.right.properties.length; i += 1) {
        if (customAST.body[customAST.body.length - 1].expression.right.properties[i].key.name === 'module')
          module_index = i;
      }

      if (
        numberOfRules === 1 &&
        customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties.length ===
          1
      ) {
        customAST.body[customAST.body.length - 1].expression.right.properties.splice(module_index, 1);
        numberOfRules -= 1;
      } else if (
        numberOfRules > 1 &&
        customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties.length ===
          1
      ) {
        for (
          let j = 0;
          j <
          customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties[0].value
            .elements.length;
          j += 1
        ) {
          if (
            customAST.body[customAST.body.length - 1].expression.right.properties[
              module_index
            ].value.properties[0].value.elements[j].properties[0].value.raw.includes('.png')
          ) {
            customAST.body[customAST.body.length - 1].expression.right.properties[
              module_index
            ].value.properties[0].value.elements.splice(j, 1);
            numberOfRules -= 1;
          }
        }
      }
    }
    formattedCode = generate(customAST, {
      comments: true
    });
    this.setState({
      checkedPNG: !this.state.checkedPNG,
      numberOfRules,
      moduleExist,
      customAST,
      formattedCode
    });
  };

  handleChangeCheckboxMomentLocale = () => {
    let { checkedMomentLocale, MomentLocaleAST, numberOfRules, moduleExist } = this.state;
    const customAST = JSON.parse(JSON.stringify(this.state.customAST));
    let formattedCode;
    const customASTPropertyKey = [];
    let webpackObjEntries = { properties: [] };
    for (let index in customAST.body) {
      if (customAST.body[index].type === 'ExpressionStatement') {
        webpackObjEntries = customAST.body[index].expression.right;
      }
    }
    webpackObjEntries.properties.forEach((el) => {
      customASTPropertyKey.push(el.key.name);
    });
    if (!checkedMomentLocale) {
      moduleExist = true;
      numberOfRules += 1;
      if (customASTPropertyKey.indexOf(MomentLocaleAST.body[0].expression.right.properties[0].key.name) === -1) {
        webpackObjEntries.properties.unshift(
          JSON.parse(JSON.stringify(MomentLocaleAST.body[0].expression.right.properties[0]))
        );
      } else {
        webpackObjEntries.properties.forEach((el) => {
          if (el.key.name === 'plugins') {
            el.value.elements.unshift(
              JSON.parse(JSON.stringify(MomentLocaleAST.body[0].expression.right.properties[0].value.elements[0]))
            );
          }
        });
        moduleExist = true;
        numberOfRules += 1;
      }
    } else {
      webpackObjEntries.properties.forEach((el) => {
        if (el.key.name === 'plugins') {
          for (let j = 0; j < el.value.elements.length; j += 1) {
            if (el.value.elements[j].callee) {
              if (
                (el.value.elements[j].callee.object && el.value.elements[j].callee.object.name === 'webpack') ||
                (el.value.elements[j].callee.property && el.value.elements[j].callee.property.name === 'IgnorePlugin')
              ) {
                el.value.elements.splice(j, 1);
                numberOfRules -= 1;
              }
            }
          }
        }
      });
    }
    formattedCode = generate(customAST, {
      comments: true
    });

    this.setState({
      checkedMomentLocale: !this.state.checkedMomentLocale,
      numberOfRules,
      moduleExist,
      formattedCode,
      customAST
    });
  };

  handleChangeCheckboxTerser = () => {
    let { checkedTerser, TerserAST, numberOfRules, moduleExist } = this.state;
    const customAST = JSON.parse(JSON.stringify(this.state.customAST));
    let formattedCode;
    const customASTPropertyKey = [];
    let webpackObjEntries = { properties: [] };
    for (let index in customAST.body) {
      if (customAST.body[index].type === 'ExpressionStatement') {
        webpackObjEntries = customAST.body[index].expression.right;
      }
    }
    webpackObjEntries.properties.forEach((el) => {
      customASTPropertyKey.push(el.key.name);
    });
    if (!checkedTerser) {
      // add const at start of webpack config before module.exports
      for (let i = 0; i < customAST.body.length; i += 1) {
        if (customAST.body[i].type === 'ExpressionStatement') {
          customAST.body.splice(i, 0, JSON.parse(JSON.stringify(TerserAST.body[0])));
          break;
        }
      }
      moduleExist = true;
      numberOfRules += 1;
      if (customASTPropertyKey.indexOf(TerserAST.body[1].expression.right.properties[0].key.name) === -1) {
        webpackObjEntries.properties.unshift(
          JSON.parse(JSON.stringify(TerserAST.body[1].expression.right.properties[0]))
        );
      } else {
        webpackObjEntries.properties.forEach((el) => {
          if (el.key.name === 'optimization') {
            el.value.properties[0].value.elements.unshift(
              JSON.parse(
                JSON.stringify(TerserAST.body[1].expression.right.properties[0].value.properties[0].value.elements[0])
              )
            );
          }
        });
        moduleExist = true;
        numberOfRules += 1;
      }
    } else {
      //remove the const statement for terser plugin
      customAST.body.forEach((el, index) => {
        if (el.declarations) {
          if (el.declarations[0].id.name === 'TerserPlugin') {
            customAST.body.splice(index, 1);
          }
        }
      });

      webpackObjEntries.properties.forEach((el) => {
        if (el.key.name === 'optimization') {
          for (let j = 0; j < el.value.properties[0].value.elements.length; j += 1) {
            if (el.value.properties[0].value.elements[j].callee) {
              if (el.value.properties[0].value.elements[j].callee.name === 'TerserPlugin') {
                el.value.properties[0].value.elements.splice(j, 1);
                numberOfRules -= 1;
              }
            }
          }
        }
      });
    }
    formattedCode = generate(customAST, {
      comments: true
    });

    this.setState({
      checkedTerser: !this.state.checkedTerser,
      numberOfRules,
      moduleExist,
      formattedCode,
      customAST
    });
  };

  handleChangeCheckboxHTMLPlugin = () => {
    let { checkedHTMLPlugin, HtmlAST, numberOfRules, moduleExist } = this.state;
    const customAST = JSON.parse(JSON.stringify(this.state.customAST));
    let formattedCode;
    const customASTPropertyKey = [];
    let webpackObjEntries = { properties: [] };
    for (let index in customAST.body) {
      if (customAST.body[index].type === 'ExpressionStatement') {
        webpackObjEntries = customAST.body[index].expression.right;
      }
    }
    webpackObjEntries.properties.forEach((el) => {
      customASTPropertyKey.push(el.key.name);
    });
    if (!checkedHTMLPlugin) {
      // add const at start of webpack config before module.exports
      for (let i = 0; i < customAST.body.length; i += 1) {
        if (customAST.body[i].type === 'ExpressionStatement') {
          customAST.body.splice(i, 0, JSON.parse(JSON.stringify(HtmlAST.body[0])));
          break;
        }
      }
      moduleExist = true;
      numberOfRules += 1;
      if (customASTPropertyKey.indexOf(HtmlAST.body[1].expression.right.properties[0].key.name) === -1) {
        webpackObjEntries.properties.unshift(
          JSON.parse(JSON.stringify(HtmlAST.body[1].expression.right.properties[0]))
        );
      } else {
        webpackObjEntries.properties.forEach((el) => {
          if (el.key.name === 'plugins') {
            el.value.elements.unshift(
              JSON.parse(JSON.stringify(HtmlAST.body[1].expression.right.properties[0].value.elements[0]))
            );
          }
        });
        moduleExist = true;
        numberOfRules += 1;
      }
    } else {
      //remove the const statement for HTML plugin
      customAST.body.forEach((el, index) => {
        if (el.declarations) {
          if (el.declarations[0].id.name === 'HtmlWebpackPlugin') {
            customAST.body.splice(index, 1);
          }
        }
      });

      webpackObjEntries.properties.forEach((el) => {
        if (el.key.name === 'plugins') {
          for (let j = 0; j < el.value.elements.length; j += 1) {
            if (el.value.elements[j].callee) {
              if (el.value.elements[j].callee.name === 'HtmlWebpackPlugin') {
                el.value.elements.splice(j, 1);
                numberOfRules -= 1;
              }
            }
          }
        }
      });
    }
    formattedCode = generate(customAST, {
      comments: true
    });

    this.setState({
      checkedHTMLPlugin: !this.state.checkedHTMLPlugin,
      numberOfRules,
      moduleExist,
      formattedCode,
      customAST
    });
  };

  handleChangeCheckboxMiniCSSExtract = () => {
    let { checkedMiniCssExtract, MiniCSSExtractAST, numberOfRules, moduleExist } = this.state;
    const customAST = JSON.parse(JSON.stringify(this.state.customAST));
    let formattedCode;
    const customASTPropertyKey = [];
    let webpackObjEntries = { properties: [] };
    for (let index in customAST.body) {
      if (customAST.body[index].type === 'ExpressionStatement') {
        webpackObjEntries = customAST.body[index].expression.right;
      }
    }
    webpackObjEntries.properties.forEach((el) => {
      customASTPropertyKey.push(el.key.name);
    });
    if (!checkedMiniCssExtract) {
      // add const at start of webpack config before module.exports
      for (let i = 0; i < customAST.body.length; i += 1) {
        if (customAST.body[i].type === 'ExpressionStatement') {
          customAST.body.splice(i, 0, JSON.parse(JSON.stringify(MiniCSSExtractAST.body[0])));
          break;
        }
      }
      moduleExist = true;
      numberOfRules += 1;
      if (customASTPropertyKey.indexOf(MiniCSSExtractAST.body[1].expression.right.properties[0].key.name) === -1) {
        webpackObjEntries.properties.unshift(
          JSON.parse(JSON.stringify(MiniCSSExtractAST.body[1].expression.right.properties[0]))
        );
      }
      if (customASTPropertyKey.indexOf(MiniCSSExtractAST.body[1].expression.right.properties[1].key.name) === -1) {
        webpackObjEntries.properties.unshift(
          JSON.parse(JSON.stringify(MiniCSSExtractAST.body[1].expression.right.properties[1]))
        );
      } else {
        webpackObjEntries.properties.forEach((el) => {
          if (el.key.name === 'plugins') {
            el.value.elements.unshift(
              JSON.parse(JSON.stringify(MiniCSSExtractAST.body[1].expression.right.properties[0].value.elements[0]))
            );
          }
          if (el.key.name === 'module') {
            el.value.properties[0].value.elements.unshift(
              JSON.parse(
                JSON.stringify(
                  MiniCSSExtractAST.body[1].expression.right.properties[1].value.properties[0].value.elements[0]
                    .properties[1].value.elements[0]
                )
              )
            );
          }
        });
        moduleExist = true;
        numberOfRules += 1;
      }
    } else {
      //remove the const statement for mini css extract plugin
      customAST.body.forEach((el, index) => {
        if (el.declarations) {
          if (el.declarations[0].id.name === 'MiniCssExtractPlugin') {
            customAST.body.splice(index, 1);
          }
        }
      });

      webpackObjEntries.properties.forEach((el) => {
        if (el.key.name === 'plugins') {
          for (let j = 0; j < el.value.elements.length; j += 1) {
            if (el.value.elements[j].callee) {
              if (el.value.elements[j].callee.name === 'MiniCssExtractPlugin') {
                el.value.elements.splice(j, 1);
                numberOfRules -= 1;
              }
            }
          }
        }
        if (el.key.name === 'module') {
          console.log('elll: ', el);
          el.value.properties[0].value.elements[0].properties.splice(1, 1); /////

          // for (let x = 0; x < el.value.properties[0].value.elements[0].properties.length; x += 1) {
          //   console.log(el.value.properties[0].value.elements[0].properties[x]);
          //   el.value.properties[0].value.elements.splice(1, 1);
          //   // if (el.value.properties[0].value.elements[0].properties[x].key.name === 'use') {

          //   //   el.value.properties[0].value.elements[0].properties.splice(x, 1);

          //   //   numberOfRules -= 1;
          //   // }
          // }

          // el.value.properties[0].value.elements.unshift(
          //   JSON.parse(
          //     JSON.stringify(
          //       MiniCSSExtractAST.body[1].expression.right.properties[1].value.properties[0].value.elements[0]
          //         .properties[1].value.elements[0]
          //     )
          //   )
          // );
        }
      });
    }
    formattedCode = generate(customAST, {
      comments: true
    });

    this.setState(
      {
        checkedMiniCssExtract: !this.state.checkedMiniCssExtract,
        numberOfRules,
        moduleExist,
        formattedCode,
        customAST
      }
      // () => {
      //   if (!this.state.checkedCSS && this.state.checkedMiniCssExtract) {
      //     this.handleChangeCheckboxCSS();
      //   }
      //   if (this.state.checkedCSS && !this.state.cssOriginallyChecked && !this.state.checkedMiniCssExtract) {
      //     this.handleChangeCheckboxCSS();
      //   }
      // }
    );
  };

  saveWebpackConfig = () => {
    const link = document.createElement('a');
    link.download = 'webpack.config.js';
    const blob = new Blob(
      [
        this.state.formattedCode
      ],
      { type: 'text/plain' }
    );
    link.href = window.URL.createObjectURL(blob);
    link.click();
    this.doSetCustomConfigSaved();
  };

  render() {
    const { store } = this.props;

    const frameWorkQuestion = (
      <div className={styles.questionContainer}>
        <div className={styles.question}>What type of project would you want?</div>
        <div className={styles.questionDescription}>No description provided</div>
        <label>
          <input
            type='checkbox'
            name='framework'
            value='react'
            checked={this.state.checkedReact}
            onChange={this.handleChangeCheckboxReact}
          />
          React
        </label>
        <label>
          <input type='checkbox' name='framework' value='vue' disabled={true} />
          Vue
        </label>
        <div className={styles.navigationContainer}>
          <button disabled={true}>
            <FiChevronLeft className={styles.navIcon} />
          </button>
          <button onClick={() => this.setState({ displayLoader: true, displayFramework: false })}>
            <FiChevronRight className={styles.navIcon} />
          </button>
        </div>
      </div>
    );

    const LoaderMenu = (
      <div className={styles.questionContainer}>
        <div className={styles.question}>What loaders would you want?</div>
        <div className={styles.questionDescription}>No description provided</div>
        <label>
          <input
            type='checkbox'
            name='framework'
            value='CSS'
            checked={this.state.checkedCSS}
            onChange={this.handleChangeCheckboxCSS}
          />
          css-loader
        </label>
        <label>
          <input
            type='checkbox'
            name='framework'
            value='SASS'
            checked={this.state.checkedSass}
            onChange={this.handleChangeCheckboxSass}
          />
          sass-loader
        </label>
        <label>
          <input
            type='checkbox'
            name='framework'
            value='LESS'
            checked={this.state.checkedLess}
            onChange={this.handleChangeCheckboxLess}
          />
          less-loader
        </label>
        <label>
          <input
            type='checkbox'
            name='framework'
            value='STYLUS'
            checked={this.state.checkedStylus}
            onChange={this.handleChangeCheckboxStylus}
          />
          stylus-loader
        </label>
        <label>
          <input
            type='checkbox'
            name='framework'
            value='SVG'
            checked={this.state.checkedSVG}
            onChange={this.handleChangeCheckboxSVG}
          />
          svg-loader
        </label>
        <label>
          <input
            type='checkbox'
            name='framework'
            value='PNG'
            checked={this.state.checkedPNG}
            onChange={this.handleChangeCheckboxPNG}
          />
          png-loader
        </label>
        <div className={styles.navigationContainer}>
          <button onClick={() => this.setState({ displayLoader: false, displayFramework: true })}>
            <FiChevronLeft className={styles.navIcon} />
          </button>
          <button onClick={() => this.setState({ displayLoader: false, displayPlugin: true })}>
            <FiChevronRight className={styles.navIcon} />
          </button>
        </div>
      </div>
    );

    const PluginsMenu = (
      <div className={styles.questionContainer}>
        <div className={styles.question}>What plugins would you want?</div>
        <div className={styles.questionDescription}>No description provided</div>
        <label>
          <input
            type='checkbox'
            name='framework'
            value='TerserWebpackPlugin'
            checked={this.state.checkedTerser}
            onChange={this.handleChangeCheckboxTerser}
          />
          TerserWebpackPlugin
        </label>
        <label>
          <input
            type='checkbox'
            name='framework'
            value='HTMLWebpackPlugin'
            checked={this.state.checkedHTMLPlugin}
            onChange={this.handleChangeCheckboxHTMLPlugin}
          />
          HTMLWebpackPlugin
        </label>
        {/*<label>
          <input
            type='checkbox'
            name='framework'
            value='HTMLWebpackPlugin'
            checked={this.state.checkedMiniCssExtract}
            onChange={this.handleChangeCheckboxMiniCSSExtract}
          />
          MiniCSSExtractPlugin
        </label>*/}
        <label>
          <input
            type='checkbox'
            name='framework'
            value='MomentLocaleIgnorePlugin'
            checked={this.state.checkedMomentLocale}
            onChange={this.handleChangeCheckboxMomentLocale}
          />
          Moment Locale Ignore Plugin
        </label>
        <div className={styles.navigationContainer}>
          <button
            onClick={() =>
              this.setState({
                displayPlugin: false,
                displayLoader: true
              })}>
            <FiChevronLeft className={styles.navIcon} />
          </button>
          <button
            onClick={() =>
              this.setState({
                displayPlugin: false,
                displaySavePage: true
              })}>
            <FiChevronRight className={styles.navIcon} />
          </button>
        </div>
      </div>
    );

    const SaveMenu = (
      <div className={styles.questionContainer}>
        <div className={styles.question}>Go Ahead and save your config!</div>
        <div className={styles.navigationContainer}>
          <button onClick={() => this.setState({ displayLoader: true, displaySavePage: false })}>
            <FiChevronLeft className={styles.navIcon} />
          </button>
          <button>
            <FiChevronRight className={styles.navIcon} />
          </button>
        </div>
      </div>
    );

    return (
      <div className={styles.mainContainer}>
        <div className={styles.headerContainer}>
          <div
            onClick={() => {
              this.props.history.push('/selectStarterPack');
            }}>
            <FiChevronLeft className={styles.chevronLeft} />
          </div>
          <div className={styles.header}>Default Starter</div>
        </div>
        <div className={styles.lowerContainer}>
          <div className={styles.lowerLeftContainer}>
            {this.state.displayFramework && frameWorkQuestion}
            {this.state.displayLoader && LoaderMenu}
            {this.state.displayPlugin && PluginsMenu}
            {this.state.displaySavePage && SaveMenu}
          </div>
          <div style={{ position: 'relative' }} className={styles.lowerRightContainer}>
            <SyntaxHighlighter
              language='javascript'
              style={dark}
              customStyle={{
                borderRadius: '5px',
                padding: '15px',
                width: '570px',
                height: '420px',
                backgroundColor: '#2b3a42',
                opacity: '0.95',
                marginTop: '28px'
              }}>
              {this.state.formattedCode}
            </SyntaxHighlighter>
            {this.state.displaySavePage && (
              <button style={{ position: 'absolute', top: '417', left: '450' }} onClick={this.saveWebpackConfig}>
                Download
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default DefaultStarter;
