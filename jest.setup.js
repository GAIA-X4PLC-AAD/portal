const { TextEncoder, TextDecoder } = require('util');
require('dotenv').config();

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
