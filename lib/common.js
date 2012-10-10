var _ = require('underscore');

exports.createFileName = function (input, output) {
	if (_.isUndefined(output)) {
		output = _.first(input.split('.')) + '.min.' + _.last(input.split('.'));
	}
	return output;
}
