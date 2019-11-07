import * as fs from "fs";
import * as path from "path";
import * as yeoman from "yeoman-environment";
import * as Generator from "yeoman-generator";


import runTransform from "./scaffold";
import Questioner from "./questioner";


const DEFAULT_WEBPACK_CONFIG_FILENAME = "webpack.config.js";

/**
 *
 * Looks up the webpack.config in the user's path and runs a given
 * generator scaffold followed up by a transform
 *
 * @param {String} action — action to be done (add, remove, update, init)
 * @param {Class} generator - Yeoman generator class
 * @param {String} configFile - Name of the existing/default webpack configuration file
 * @param {Array} packages - List of packages to resolve
 * @returns {Function} runTransform - Returns a transformation instance
 */

export default function runAction(
	action,
	generator,
	scaffold,
	configFile = DEFAULT_WEBPACK_CONFIG_FILENAME,
	packages,
)
	{

	let configPath = null;

	if (action !== "init") {
		configPath = path.resolve(process.cwd(), configFile);
        const webpackConfigExists = fs.existsSync(configPath);
	}

	const env = yeoman.createEnv("webpack", null);
	const generatorName = scaffold?`webpack-ui-${scaffold}-generator`:`webpack-ui-generator`;

	if (!generator) {
		generator = class extends Generator {
			initializing() {
				packages.forEach(
					(pkgPath) => {
						return this.composeWith(require.resolve(pkgPath), {});
					}
				);
			}
		};
	}

    const questioner = new Questioner();
	generator.prototype.prompt = questioner.question; // for changing prototype

	env.registerStub(generator, generatorName);

	return new Promise((resolve, reject) => {
		env.run(generatorName, () => {
			let configModule;
			try {
				const confPath = path.resolve(process.cwd(), ".yo-rc.json");
				configModule = require(confPath);
				
				// Change structure of the config to be transformed
				const tmpConfig = {};
				Object.keys(configModule).forEach((prop) => {
					const configs = Object.keys(configModule[prop].configuration);
					configs.forEach((conf) => {
						tmpConfig[conf] = configModule[prop].configuration[conf];
					});
				});
				configModule = tmpConfig;
	
			} catch (err) {
				return false;
			}
	
			const transformConfig = Object.assign(
				{
					configFile: !configPath ? null : fs.readFileSync(configPath, "utf8"),
					configPath,
				},
				configModule,
			);
			

			return runTransform(transformConfig, action).then(() => {
				return true;
			})	
		});
		resolve();
	})
}