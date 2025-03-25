'use strict';

/**
 * event-table service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::event-table.event-table');
