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

conn.on('ready', function(data){

  conn.whoami({}, function(result){
    freeboard.loadDashboard(result.freeboardDash, function() {
      freeboard.setEditing(false);
    });
  });

  conn.on('message', function(message){
  });

});

var saveMeshbluDashboard = function(){
  conn.update({
    "uuid": GET.uuid,
    "freeboardDash": freeboard.serialize()
  })
}
