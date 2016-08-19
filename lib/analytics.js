const KeenTracking = require('keen-tracking');
const Keyring = require('keyring');
const analyticsEnabledKey = `${require('../package.json').name}.analytics.enabled`;
	
function Analytics(config) {
	this.client = new KeenTracking({
		projectId: config.projectId,
		writeKey: config.writeKey
	});
	this.enabled = false;
}

Analytics.prototype.checkPermission = function() {
	const keyring = Keyring.instance().load();
	const analyticsEnabled = keyring.retrieve(analyticsEnabledKey);
	if(analyticsEnabled === null) {
		//Ask permission

		return;
	}
	this.enabled = analyticsEnabled;
};

Analytics.prototype.record = function(event) {
	client.recordEvent(event.name, event.args);
};

module.exports = Analytics;