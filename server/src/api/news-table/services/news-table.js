'use strict';

/**
 * news-table service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::news-table.news-table');
