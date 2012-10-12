var runner = require('./helpers/runner');

describe('grunt-rigger transpiler tests', function() {
    it('should be able to transpile coffee -> js (requires coffee-script package)', runner('transpile-coffee'));
});