import * as core from '@actions/core'
import {wait} from './wait'

async function run(): Promise<void> {
  try {
    const ms: string = core.getInput('milliseconds')
    core.debug(`Waiting ${ms} milliseconds ...`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

    core.debug(new Date().toTimeString())
    await wait(parseInt(ms, 10))
    core.debug(new Date().toTimeString())

    await core.summary
      .addHeading('Test Results')
      // .addCodeBlock(generateTestResults(), "js")
      .addTable([
        [
          {data: 'File', header: true},
          {data: 'Result', header: true}
        ],
        ['foo.js', 'Pass ✅'],
        ['bar.js', 'Fail ❌'],
        ['test.js', 'Pass ✅']
      ])
      .addLink('View staging deployment!', 'https://github.com')
      .write()

    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
