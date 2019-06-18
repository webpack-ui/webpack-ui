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

