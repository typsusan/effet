const originalConsoleError = console.error;
console.error = function (...args) {
    const errorMsg = args.join(" ");
    if (/Calculator|solutions_wasm\.embind\.cc/.test(errorMsg) || errorMsg.trim() === '') {
        const stack = new Error().stack;
        if (stack && stack.includes('effet.js')) {
            return;
        }
    }
    originalConsoleError.apply(console, args);
};

const originalConsoleWarn = console.warn;
console.warn = function (...args) {
    const warnMsg = args.join(" ");
    if (/Calculator|--------------------------|EnableFaceGeometryConstant|solutions_wasm\.embind\.cc|gl_context_webgl\.cc|gl_context\.cc/.test(warnMsg) || warnMsg.trim() === '') {
        const stack = new Error().stack;
        if (stack && stack.includes('effet.js')) {
            return;
        }
    }
    originalConsoleWarn.apply(console, args);
};
