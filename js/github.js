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
				var icon = "";
				var commits = commitSet(events.payload.commits);
				var updated = moment(events.created_at).fromNow();
				//icon = "images/git-commit.svg";
				$('.activitiesTab').append("<ul><li><img src='images/git-commit.svg'>"+updated+"</li><li>"+user+"pushed to "+role+" at "+events.repo.name+"</li><li><img class='imgOne' src='images/Jared_profile3.jpg'><img class='imgTwo' src='images/Jared_profile3.jpg'>"+events.payload.push_id+"<p>"+taco.message+"</p>");

			}
			else if (events.type === "CreateEvent") 
			{
				//var user = events.actor.login;
				var type = events.payload.ref_type;
				var reference = events.payload.ref;
				var loc = events.repo.name;
				//var updated = moment(events.created_at).fromNow();
				//icon = "images/mark-github.svg";
				 if(reference === null)
                {
                    ref = "";
                }
				$('.activitiesTab').append("<div><img class='createImg' src='images/git-branch.svg'><p>" +user+ " created " + type + reference +" at "+ loc + updated +"</p></div>");
			}
			else if (events.type === "MemeberEvent")
			{
				//var user = events.actor.login;
				var action = events.payload.action;
				var member = events.payload.member.login;
				var reference = events.payload.ref;
				//var updated = moment(events.created_at).fromNow();
				//icon = "images/person.svg";
				$('.activitiesTab').append("<div><img class='memImg' src='"+icon+"'><p>" + user + action+ member+" to " + reference + updated +"</p></div>");
			}
		});
	}
});

});