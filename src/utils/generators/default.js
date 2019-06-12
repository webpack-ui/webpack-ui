import * as Generator from 'yeoman-generator';

export default class WebpackGenerator extends Generator {
    configuration;
    dependencies = [
        "webpack",
        "webpack-cli"
    ]

    constructor(args, opts) {
        super(args, opts);
        this.configuration = {
            config: {
                topScope: [],
                webpackOptions
            }
        }
    }

    /**
     * writing()
     * @description write files in user directory
     */
    writing() {
        this.configuration.config.topScope.push(
            "const webpack = require('webpack');",
            "const path = require('path');"
        )
        this.configuration.config.webpackOptions.entry = '"index.js"';
        this.configuration.config.webpackOptions.output = {
            path : 'path.resolve(__dirname,"index.js")',
        };

        this.config.set('configuration', this.configuration);
        this.fs.write('index.js', '');
    }

    /**
     * install()
     * @description install dependencies in user directory
     */
    install() {
        this.npmInstall(this.dependencies);
    }
};