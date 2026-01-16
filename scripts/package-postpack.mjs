import node_fs from "node:fs"
import node_path from "node:path"

const
	__dirname =
		import.meta.dirname,

	root =
		node_path.resolve(__dirname, ".."),

	packagePath =
		node_path.join(root, "package")

try {
	node_fs.rmSync(node_path.join(packagePath, "README.md"))
	node_fs.renameSync(
		node_path.join(packagePath, "README-original.md"),
		node_path.join(packagePath, "README.md"),
	)
	console.info("/scripts/package-postpack.mjs :: Done")
} catch(err) {
	console.error(`/scripts/package-postpack.mjs :: ${err instanceof Error ? err.message : "Unknown error"}`)
}
