'use strict';

/**
 * event-table router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::event-table.event-table');
