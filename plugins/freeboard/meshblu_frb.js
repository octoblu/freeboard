
(function()
{
	freeboard.loadDatasourcePlugin({
		"type_name"   : "meshblu",
		"display_name": "Octoblu",
		"description" : "app.octoblu.com",
		"external_scripts" : [
			"https://cdn.octoblu.com/js/meshblu/latest/meshblu.bundle.js"
		],
		"settings"    : [
			{
				"name"         : "uuid",
				"display_name" : "UUID",
				"type"         : "text",
				"default_value": "device uuid",
				"description"  : "your device UUID",
				"required" : true
			},
			{
				"name"         : "token",
				"display_name" : "Token",
				"type"         : "text",
				"default_value": "device token",
				"description"  : "your device TOKEN",
				"required" : true
			},
			{
				"name"         : "server",
				"display_name" : "Server",
				"type"         : "text",
				"default_value": "meshblu.octoblu.com",
				"description"  : "your server",
				"required" : true
			},
			{
				"name"         : "port",
				"display_name" : "Port",
				"type"         : "number",
				"default_value": 443,
				"description"  : "server port",
				"required" : true
			}

		],
		newInstance   : function(settings, newInstanceCallback, updateCallback)
		{
			newInstanceCallback(new meshbluSource(settings, updateCallback));
		}
	});

	var meshbluSource = function(settings, updateCallback)
	{
		var self = this;
		var currentSettings = settings;

		function getData()
		{
			var conn = meshblu.createConnection({
				"uuid": currentSettings.uuid,
				"token": currentSettings.token,
				"server": currentSettings.server,
				"port": currentSettings.port
			});

			conn.on('ready', function(data){

				conn.on('message', function(message){

					var newData = message;
					updateCallback(newData);

				});

			});
		}

		self.onSettingsChanged = function(newSettings)
		{
			currentSettings = newSettings;
		}

		self.updateNow = function()
		{
			getData();
		}
		
		self.onDispose = function()
		{
			//conn.close();
		}
	}

}());
