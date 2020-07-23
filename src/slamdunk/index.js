import Vue from 'vue';
import Logger from './logger';
import Listener from './listener';
const logger = Logger();

Listener()

Vue.prototype.logger = logger;
window.logger = logger;