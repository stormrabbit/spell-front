import Vue from 'vue';
import Logger from './logger';
import Listener from './listener';
import Sender from './sender';
const logger = Logger();

const listener = Listener();

const sender = Sender();

Vue.prototype.logger = logger;
window.logger = logger;
window.listener = listener;
window.sender = sender;