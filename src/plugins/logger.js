export default {
  install(app, options) {
    // Add $log to all components
    app.config.globalProperties.$log = function (...args) {
      if (options?.prefix) {
        console.log(options.prefix, ...args)
      } else {
        console.log(...args)
      }
    }
  }
}
