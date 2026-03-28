import node_childProcess from "node:child_process"
import node_fs from "node:fs"
import node_path from "node:path"

const
	workspacePath =
		node_path.join(import.meta.dirname, ".."),

	/**
	 * It should've read the pnpm-workspace.yaml
	 */
	pnpmPackages =
		[
			"examples/expo",
			"examples/shared",
			"package",
			"package-builder",
		],

	/**
	 * Additional files or dirs to remove
	 */
	additionalPaths =
		[
			node_path.join(workspacePath, "node_modules"),
			node_path.join(workspacePath, "pnpm-lock.yaml"),
		]

Promise
	.all([
		...pnpmPackages.reduce((promises, pnpmPkgPath) => {
			const nodeModulesPath = node_path.join(workspacePath, pnpmPkgPath, "node_modules")
			if(node_fs.existsSync(nodeModulesPath)) {
				promises.push(
					node_fs.promises.rm(nodeModulesPath, { recursive: true, force: true }),
				)
			}
			return promises
		}, []),

		...additionalPaths.reduce((promises, rmPath) => {
			if(node_fs.existsSync(rmPath)) {
				promises.push(
					node_fs.promises.rm(rmPath, { recursive: true, force: true }),
				)
			}
			return promises
		}, []),
	])
	.then(() => {
		node_childProcess.execSync(
			"pnpm install",
			{
				cwd: workspacePath,
				stdio: "inherit",
			},
		)
	})
