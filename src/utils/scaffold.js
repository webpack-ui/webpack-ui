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

function mapOptionsToTransform(config) {
	return Object.keys(config.webpackOptions).filter((k) => propTypes.has(k));
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

export default function runTransform(transformConfig, action) {
	// webpackOptions.name sent to nameTransform if match
	const webpackConfig = Object.keys(transformConfig).filter((p) => {
		return p !== "configFile" && p !== "configPath";
	});
	const initActionNotDefined = action && action !== "init" ? true : false;

	return new Promise((resolve, reject) => {
		webpackConfig.forEach((scaffoldPiece) => {
		const config = transformConfig[scaffoldPiece];

		const transformations = mapOptionsToTransform(config);

		if (config.topScope) {
			transformations.push("topScope");
		}

		if (config.merge) {
			transformations.push("merge");
		}

		const ast = j(
			initActionNotDefined
				? transformConfig.configFile
				: "module.exports = {}",
		);

		const transformAction = action || null;

		pEachSeries(transformations, (f) => {
			if (f === "merge" || f === "topScope") {
				return astTransform(j, ast, f, config[f], transformAction);
			}
			return astTransform(j, ast, f, config.webpackOptions[f], transformAction);
		})
			.then((value) => {
				let configurationName;
				if (!config.configName) {
					configurationName = "webpack.config.js";
				} else {
					configurationName = "webpack." + config.configName + ".js";
				}

				const outputPath = initActionNotDefined
					? transformConfig.configPath
					: path.join(process.cwd(), configurationName);
				const source = ast.toSource({
					quote: "single",
				});
				runPrettier(outputPath, source);
			})
			.catch((err) => {
				console.error(err.message ? err.message : err);
			});
		});
		resolve();
	});
}
