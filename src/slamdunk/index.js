import Vue from 'vue';
import Logger from './logger';
const logger = Logger();


Vue.prototype.logger = logger;
window.logger = logger;