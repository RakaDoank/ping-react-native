const
	node_childProcess =
		require('node:child_process'),

	node_fs =
		require('node:fs'),

	node_path =
		require('node:path')

const
	root =
		node_path.resolve(__dirname, '../..'),

	builderBobPath =
		node_path.join(root, 'builder-bob'),

	packagePath =
		node_path.join(root, 'package')

try {
	const libPath = node_path.join(packagePath, 'lib')

	if(node_fs.existsSync(libPath)) {
		node_fs.rmSync(
			libPath,
			{ recursive: true },
		)
	}

	node_childProcess.execSync(
		'npx bob build',
		{
			cwd: builderBobPath,
			stdio: 'inherit',
		},
	)
} catch(err) {
	throw new Error(`/builder-bob/scripts/build.js :: ${err instanceof Error ? `[${err.name}] ${err.message}` : 'Unknown error'}`)
}
