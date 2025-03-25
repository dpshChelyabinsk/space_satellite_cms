'use strict';

/**
 * visitor-table router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::visitor-table.visitor-table');
