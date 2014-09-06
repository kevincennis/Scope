module.exports = {
  src: {
    // i know this is ridiculous, but i already
    // had a grunt template and i'm lazy...
    src: [
      'src/Scope.js'
    ],
    dest: 'dist/<%= pkg.name %>.js'
  }
};
