/*global require:false, QUnit:false, module:false, test:false, asyncTest:false, expect:false,
  start:false, stop:false, ok:false, equal:false, notEqual:false, deepEqual:false,
  notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false */

require.config({ baseUrl: '../src' });

require(['jquery'/*, 'fuelux-editor/all'*/], function($) {
    module('Fuel UX CKeditor', {
        setup: function() {
            this.elems = $('#qunit-fixture').children();
        }
    });

    test('empty string should be equal to empty string', function() {
        strictEqual('', '', 'empty string should be equal to empty string');
    });
});