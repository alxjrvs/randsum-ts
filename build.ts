import dts from 'bun-plugin-dts'

const results = await Bun.build({
  entrypoints: [
    './src/dice/index.ts',
    './src/faces/index.ts',
    './src/notation/index.ts',
    './src/tower/index.ts',
    './src/types.ts'
  ],
  outdir: './dist',
  splitting: true,
  sourcemap: 'inline',
  plugins: [dts()]
})

if (results.success == false) {
  console.error('Build failed')
  for (const message of results.logs) {
    console.error(message)
  }
} else {
  console.log('Compiled ' + results.outputs.length + ' javascript files...')
}

export {}
