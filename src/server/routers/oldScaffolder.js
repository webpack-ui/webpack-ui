const fs = require('fs');
const express = require('express');
const acorn = require('acorn');
const { generate } = require('astring');

const router = express.Router();

router.get('/AST', async (req, res) => {
  const ASTObj = {};
  fs.readFile(__dirname + '/src_custom_config/webpack.config.js', (err, data) => {
    ASTObj.customAST = acorn.parse(data.toString(), {
      ecmaVersion: 6,
      locations: true
    });
    fs.readFile(__dirname + '/src_custom_config/React.config.js', (err, data) => {
      ASTObj.ReactAST = acorn.parse(data.toString(), {
        ecmaVersion: 6,
        locations: true
      });
      fs.readFile(__dirname + '/src_custom_config/CSS.config.js', (err, data) => {
        ASTObj.CSSAST = acorn.parse(data.toString(), {
          ecmaVersion: 6,
          locations: true
        });
        fs.readFile(__dirname + '/src_custom_config/Sass.config.js', (err, data) => {
          ASTObj.SassAST = acorn.parse(data.toString(), {
            ecmaVersion: 6,
            locations: true
          });
          fs.readFile(__dirname + '/src_custom_config/Less.config.js', (err, data) => {
            ASTObj.LessAST = acorn.parse(data.toString(), {
              ecmaVersion: 6,
              locations: true
            });
            fs.readFile(__dirname + '/src_custom_config/Stylus.config.js', (err, data) => {
              ASTObj.StylusAST = acorn.parse(data.toString(), {
                ecmaVersion: 6,
                locations: true
              });
              fs.readFile(__dirname + '/src_custom_config/svg.config.js', (err, data) => {
                ASTObj.SvgAST = acorn.parse(data.toString(), {
                  ecmaVersion: 6,
                  locations: true
                });
                fs.readFile(__dirname + '/src_custom_config/momentLocalePlugin.config.js', (err, data) => {
                  ASTObj.MomentLocaleAST = acorn.parse(data.toString(), {
                    ecmaVersion: 6,
                    locations: true
                  });
                  fs.readFile(__dirname + '/src_custom_config/terserPlugin.config.js', (err, data) => {
                    ASTObj.TerserAST = acorn.parse(data.toString(), {
                      ecmaVersion: 6,
                      locations: true
                    });
                    fs.readFile(__dirname + '/src_custom_config/htmlPlugin.config.js', (err, data) => {
                      ASTObj.HtmlAST = acorn.parse(data.toString(), {
                        ecmaVersion: 6,
                        locations: true
                      });
                      fs.readFile(__dirname + '/src_custom_config/miniCssExtractPlugin.config.js', (err, data) => {
                        ASTObj.MiniCSSExtractAST = acorn.parse(data.toString(), {
                          ecmaVersion: 6,
                          locations: true
                        });
                        fs.readFile(__dirname + '/src_custom_config/png.config.js', (err, data) => {
                          ASTObj.PngAST = acorn.parse(data.toString(), {
                            ecmaVersion: 6,
                            locations: true
                          });
                          res.send(ASTObj);
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});

router.get('/mod', (req, res) => {
  const ASTObjPlugins = {};
  fs.readFile(__dirname + '/src_custom_config/momentLocalsPlugin.config.js', (err, data) => {
    ASTObjPlugins.momentLocaleAST = acorn.parse(data.toString(), {
      ecmaVersion: 6,
      locations: true
    });
    res.send(ASTObjPlugins);
  });
});
//

module.exports = router;