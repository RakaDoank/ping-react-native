import node_fs from "node:fs"
import node_path from "node:path"

const
	workspacePath =
		node_path.join(import.meta.dirname, "..", ".."),

	packagePath =
		node_path.join(workspacePath, "package"),

	/**
	 * @type {{
	 * 	src: string,
	 * 	dest: string,
	 * }[]}
	 */
	filesToCopy =
		[
			{
				src: node_path.join(workspacePath, "LICENSE"),
				dest: node_path.join(packagePath, "LICENSE"),
			},
			{
				src: node_path.join(workspacePath, "README.md"),
				dest: node_path.join(packagePath, "README.md"),
			},
		]

export function prepack() {

	Promise.all(
		filesToCopy.map(file => {
			return node_fs.promises.cp(
				file.src,
				file.dest,
			)
		}),
	)

}
