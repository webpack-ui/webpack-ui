import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

const WEBPACK_CONFIG_PATH = process.env.WEBPACK_CONFIG_PATH ? process.env.WEBPACK_CONFIG_PATH : "./webpack.config.js";

export function addConfig(req, res, next) {
    const configPath = resolve(process.cwd(), WEBPACK_CONFIG_PATH);
    const res_json = res.json;
    res.json = function (body) {
        if (existsSync(configPath)) {
            body.webpack = readFileSync(configPath).toString();
        }
        try {
            res_json.call(this, body);   
        } catch (error) {}
    }
    next();
}