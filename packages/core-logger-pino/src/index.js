'use strict';

const logger = require('@arkecosystem/core-plugin-manager').get('logger')
const pino = require('./logger')

exports.plugin = {
  pkg: require('../package.json'),
  register: async (hook, config, app) => {
    const instance = await pino.init(config)

    await logger.setDriver(instance)
  }
}
