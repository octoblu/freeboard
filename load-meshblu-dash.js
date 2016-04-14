var GET = {};
	var query = window.location.search.substring(1).split("&");
	for (var i = 0, max = query.length; i < max; i++)
	{
		if (query[i] === "")
		continue;
		var param = query[i].split("=");
		GET[decodeURIComponent(param[0])] = decodeURIComponent(param[1] || "");
	}

freeboard.initialize(true);

var conn = meshblu.createConnection({
  "uuid": GET.uuid,
  "token": GET.token
});

console.log(freeboard.datasourceData);
conn.on('ready', function(data){

  conn.whoami({}, function(result){
    if(!result.freeboardDash){
      var config = {
          "version": 1,
          "allow_edit": true,
          "plugins": [],
          "panes": [],
          "datasources": [
            {
              "name": "Main",
              "type": "meshblu",
              "settings": {
                "uuid": GET.uuid,
                "token": GET.token,
                "server": "meshblu.octoblu.com",
                "port": 443
              }
            }
          ],
          "columns": 3
        };
      conn.update({
        "uuid": GET.uuid,
        "freeboardDash": config
      });
      freeboard.loadDashboard(config, function() {
        freeboard.setEditing(false);
      });
    }else{
      freeboard.loadDashboard(result.freeboardDash, function() {
        freeboard.setEditing(false);
      });
    }
  });
});

var saveMeshbluDashboard = function(){
  conn.update({
    "uuid": GET.uuid,
    "freeboardDash": freeboard.serialize()
  })
}
