#!/usr/bin/env node

const commander = require('commander')

const logger = require('@arkecosystem/core-plugin-manager').get('logger')
const config = require('@arkecosystem/core-plugin-manager').get('config')

const ForgerManager = require('../src/managers/forger')

commander
  .version(require('../package.json').version)
  .option('-c, --config <path>', 'config files path')
  .option('-b, --bip38 <bip38>', 'forger bip38')
  .option('-a, --address <address>', 'forger address')
  .option('-p, --password <password>', 'forger password')
  .option('-i, --interactive', 'launch cli')
  .parse(process.argv)

process.on('unhandledRejection', (reason, p) => logger.error(`Unhandled Rejection at: ${JSON.stringify(p)} reason: ${reason}`))

const start = async () => {
  try {
    await config.init(commander.config)
    await logger.init(config.server.logging, config.network.name + '-forger')

    const forgerManager = await new ForgerManager(config)
    const forgers = await forgerManager.loadDelegates(commander.bip38, commander.address, commander.password)

    logger.info(`ForgerManager started with ${forgers.length} forgers`)
    forgerManager.startForging(`http://127.0.0.1:${config.server.port}`)
  } catch (error) {
    console.error(error.stack)
    process.exit(1)
  }
}

start()
