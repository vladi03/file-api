const assert = require("assert");
const {getName} = require("../src/file-middleware/");
describe('module is configured', function () {
    it('should have name', function () {
        assert.strictEqual(getName(), "file-api-mongodb");
    });
});