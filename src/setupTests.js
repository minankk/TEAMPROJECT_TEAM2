// ✅ src/setupTests.js
require('@testing-library/jest-dom');
import '@testing-library/jest-dom';


// Polyfill for TextEncoder / TextDecoder
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;