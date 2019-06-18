import { writeFileSync, existsSync } from "fs";
import {execSync} from 'child_process';
import {join, resolve} from 'path';
import { Router } from "express"

import defaultGenerator from "../../utils/generators/default";
import runAction from "../../utils/run-action";

const USER_DIRECTORY = process.env.PWD ? process.env.PWD : process.cwd();
const WEBPACK_CONFIG_PATH = process.env.WEBPACK_CONFIG_PATH ? process.env.WEBPACK_CONFIG_PATH : "webpack.config.js";
const router = Router();

router.get('/refresh', (req, res) => { res.json({ status: '200' }) });

router.post('/save', (req, res) => {
    writeFileSync(resolve(USER_DIRECTORY, WEBPACK_CONFIG_PATH), req.body.webpack);
    res.json( { status: '200' });
});

router.post('/init', async (req, res) => {
    if (req.body.type === 'defaults') {
        runAction('init', defaultGenerator).then(() => {
            res.json({value: true});
        });
        return;
    }

    if (!existsSync(resolve(`${USER_DIRECTORY}/node_modules/${req.body.type}`))) {
        await execSync(`cd ${USER_DIRECTORY} && npm install --save-dev ${req.body.type}`);
    }

    const Generator = require(`${USER_DIRECTORY}/node_modules/${req.body.type}`);
    Generator.prototype.templatePath = (file) => `${USER_DIRECTORY}/node_modules/${req.body.type}/templates/${file}`;
    Generator.prototype.destinationPath = (file) => `${USER_DIRECTORY}/${file}`;

    runAction('init', Generator, req.body.type, );
    res.json({value: true});    
});

router.post('/build', (req, res) => {
    try {
        await execSync(`cd ${USER_DIRECTORY} && npx webpack --config ${process.env.CONFIG_PATH}`);
        res.json({value: true});
    } catch (err) {
        res.json({value: err.message})
    }
})