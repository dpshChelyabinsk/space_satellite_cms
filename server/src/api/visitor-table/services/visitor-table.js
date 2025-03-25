'use strict';

/**
 * visitor-table service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::visitor-table.visitor-table');
