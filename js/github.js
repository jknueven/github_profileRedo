$(document).ready(function(){ 

$.ajax({
		url: "https://api.github.com/users/jknueven",
		type:"GET",
		success: function(users)
		{
			var avatar = users.avatar_url;
			var bio = users.bio;
			var name = users.name;
			var username = users.login;
			var stars = users.starred_url;
			var followers = users.followers;
			var following = users.following;
			var create = users.created_at;
			var time = moment(create).format('MMM,DD YYYY');

			$('.profileImg').append("<a href='https://github.com/settings/profile'><img src='images/Jared_profile3.jpg'></a>");
			$('.name').append("<h2>"+name+"</h2>");
			$('.username').append("<h3>"+username+"</h3>");
			$('.bio').append("<p>"+bio+"</p>");
			$('.started').append("<img src='images/clock.svg'><p>Joined on "+time+"</p>");
			$('.stats').append("<div class='col-md-4 follow'><ul><li><h5><a href='https://github.com/jknueven/followers'>"+followers+"</a></h5></li><li><p>Followers</p></li></ul></div><div class='col-md-4 stars'><ul><li><h5><a href='https://github.com/stars'>0</a></h5></li><li><p>Starred</p></li></ul></div><div class='col-md-4 following'><ul><li><h5><a href='https://github.com/jknueven/following'>"+following+"</a></h5></li><li><p>Following</p></li></ul></div>");

		}
	});

$.ajax({
	url: "https://api.github.com/users/jknueven/repos",
	type: "GET",
	success: function(repos)
	{

		var result = repos;

		result.forEach(function(repositories)
		{
			var repoName = repositories.name;
			var repoDescrip = repositories.description;
			var update = repositories.updated_at;
			var upTime = moment(update).fromNow();
			var stars = repositories.stargazers_count;
			var lang = repositories.language;
			var fork = repositories.forks;
			var href = repositories.html_url;


			$('.repos').append("<div class='repoList'><ul class='mainList'><li><h3><a href='"+href+"'>"+repoName+"</a></h3></li><li>"+repoDescrip+"</li><li>"+upTime+"</li></ul><ul class='sideList'><li>"+lang+"</li><li><a href='https://github.com/jknueven/'"+repoName+"'/stargazers'><img src='images/star.svg'>"+stars+"</li><li><a href='https://github.com/jknueven/'"+repoName+"'/network'><img src='images/git-branch.svg'>"+fork+"</a></li></ul></div>");
		});
	}
});

function commitSet(commit){

	var bigString= "";

	commit.forEach(function(message)
	{
		var com = commit.message;
		bigString += "<p>'"+com+"'</p>";
	});
	return bigString;
}

$.ajax({
	url: "https://api.github.com/users/jknueven/events",
	type: "GET",
	success: function(activity)
	{
		var result = activity;
	
		result.forEach(function(events)
		{
			if (events.type === "PushEvent") 
			{
				var user = events.actor.login;
				var reference = events.payload.ref;
				var role = reference.split("/");
				role = role[2];
				var taco = events.payload.commits[0];
				var share = taco.sha;
				var id = share.substring(share.length-7, share.length);
				//console.log(id);
				var icon = "";
				var commits = commitSet(events.payload.commits);
				var updated = moment(events.created_at).fromNow();
				//icon = "images/git-commit.svg";
				$('.activitiesTab').append("<div class='event'><img class='pushImg' src='images/git-commit.svg'><ul><li class='update'>" +updated+"</li><li><a href='https://github.com/jknueven'>"+user+"</a> pushed to <a href='https://github.com/"+events.repo.name+"/tree/master'>"+role+"</a> at <a href='https://github.com/"+events.repo.name+"'>"+events.repo.name+"</a></li><li><img class='imgOne' src='images/Jared_profile3.jpg'><img class='imgTwo' src='images/Jared_profile3.jpg'><a href='https://github.com/jknueven/"+events.repo.name+"/commit/"+share+"'>"+id+"</a><p>"+taco.message+"</p></li><div>");

			}
			else if (events.type === "CreateEvent") 
			{
				var user = events.actor.login;
				var type = events.payload.ref_type;
				var reference = events.payload.ref;
				var loc = events.repo.name;
				var updated = moment(events.created_at).fromNow();
				//icon = "images/mark-github.svg";
				 if(reference === null)
                {
                    ref = "";
                }
				$('.activitiesTab').append("<div class='eventCreate'><img class='createImg' src='images/git-branch.svg'><a href='https://github.com/jknueven'> "+user+" </a> created <a href='https://github.com/jknueven/"+events.repo.name+"/tree/"+type+"'> " + type +"</a> "+ reference +" at <a href='https://github.com/jknueven/"+events.repo.name+"'>"+ loc +"</a></p><div class='update2'>"+updated +"</div></div>");
			}
			else if (events.type === "MemeberEvent")
			{
				//var user = events.actor.login;
				var action = events.payload.action;
				var member = events.payload.member.login;
				var reference = events.payload.ref;
				var updated = moment(events.created_at).fromNow();
				//icon = "images/person.svg";
				if(ref === null)
                {
                    ref = "";
                }
				$('.activitiesTab').append("<div class='eventMember'><img class='memImg' src='"+icon+"'><p> " + user + action+ member+" to <a href='https://github.com/jknueven/"+events.repo.name+"'>"+reference+"</a></p><div class='update2'>"+ updated +"</div></div>");
			}
		});
	}
});

});