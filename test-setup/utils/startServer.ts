import execa from 'execa'
import waitOn from 'wait-on'
import getPort from 'get-port'

export async function startViteDevServer(
  playgroundPath: string,
  returnValues: { port?: number; subprocess?: any }
) {
  const port = await getPort()
  returnValues.port = port

  await startServer(playgroundPath, returnValues, [
    'dev',
    '--strictPort',
    '--port',
    port.toString(),
  ])

  console.log('vite dev server is ready.')
}

export async function startBuildServer(
  playgroundPath: string,
  returnValues: { port?: number; subprocess?: any }
) {
  const port = await getPort()
  returnValues.port = port

  await startServer(playgroundPath, returnValues, [
    'build',
    '--no-port-switching',
    '-p',
    port.toString(),
  ])

  console.log('build server is ready.')
}

export async function startSSRServer(
  playgroundPath: string,
  returnValues: { port?: number; subprocess?: any }
) {
  const port = await getPort()
  returnValues.port = port

  await startServer(playgroundPath, returnValues, [
    'ssr',
    '--no-port-switching',
    '-p',
    port.toString(),
  ])

  console.log('ssr server is ready.')
}

export async function startServer(
  playgroundPath: string,
  returnValues: { port?: number; subprocess?: any },
  args: string[]
) {
  if (!returnValues.port || returnValues.subprocess)
    throw new Error('assertion fail')

  const subprocess = execa('pnpm', args, {
    cwd: playgroundPath,
    detached: true,
  })
  subprocess.stdout?.pipe(process.stdout)
  subprocess.stderr?.pipe(process.stderr)
  // return values early so caller can handler error
  returnValues.subprocess = subprocess
  // wait for the server to be available
  await Promise.race([
    waitOn({
      resources: [`http-get://localhost:${returnValues.port}`],
      // should ignore http_proxy env variable from my shell...
      proxy: false as any,
      headers: { Accept: 'text/html' },
      timeout: 60 * 1000,
    }),
    // if the subprocess faill, it should throw too
    subprocess,
  ])
}
