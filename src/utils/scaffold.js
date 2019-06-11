import * as j from "jscodeshift";
import pEachSeries from "p-each-series";
import * as path from "path";

import { Config, TransformConfig } from "./run-action";
import propTypes from "./prop-types";
import astTransform from "./recursive-parser";
import runPrettier from "./run-prettier";
import { INode } from "./types/NodePath";

/**
 *
 * Maps back transforms that needs to be run using the configuration
 * provided.
 *
 * @param	{Object} config 			- Configuration to transform
 * @returns {Array} - An array with keys on which transformations need to be run
 */

function mapOptionsToTransform(config: Config): string[] {
	return Object.keys(config.webpackOptions).filter((k: string) => propTypes.has(k));
}

/**
 *
 * Runs the transformations from an object we get from yeoman
 *
 * @param	{Object} transformConfig 	- Configuration to transform
 * @param	{String} action 			- Action to be done on the given ast
 * @returns {Promise} - A promise that writes each transform, runs prettier
 * and writes the file
 */

export default function runTransform(transformConfig: TransformConfig, action: string): Promise<void> {
	// webpackOptions.name sent to nameTransform if match
	const webpackConfig = Object.keys(transformConfig).filter((p: string) => {
		return p !== "configFile" && p !== "configPath";
	});
	const initActionNotDefined: boolean = action && action !== "init" ? true : false;

	return new Promise((resolve, reject) => {
		webpackConfig.forEach((scaffoldPiece: string) => {
		const config: Config = transformConfig[scaffoldPiece];

		const transformations: string[] = mapOptionsToTransform(config);

		if (config.topScope) {
			transformations.push("topScope");
		}

		if (config.merge) {
			transformations.push("merge");
		}

		const ast: INode = j(
			initActionNotDefined
				? transformConfig.configFile
				: "module.exports = {}",
		);

		const transformAction: string = action || null;

		pEachSeries(transformations, (f: string): boolean | INode => {
			if (f === "merge" || f === "topScope") {
				return astTransform(j, ast, f, config[f], transformAction);
			}
			return astTransform(j, ast, f, config.webpackOptions[f], transformAction);
		})
			.then((value: string[]): void | PromiseLike <void> => {
				let configurationName: string;
				if (!config.configName) {
					configurationName = "webpack.config.js";
				} else {
					configurationName = "webpack." + config.configName + ".js";
				}

				const outputPath: string = initActionNotDefined
					? transformConfig.configPath
					: path.join(process.cwd(), configurationName);
				const source: string = ast.toSource({
					quote: "single",
				});
				runPrettier(outputPath, source);
			})
			.catch((err: Error) => {
				console.error(err.message ? err.message : err);
			});
		});
		resolve();
	});
}
