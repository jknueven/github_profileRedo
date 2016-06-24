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

			$('.profileImg').append("<img src='images/Jared_profile3.jpg'>");
			$('.name').append("<h2>"+name+"</h2>");
			$('.username').append("<h3>"+username+"</h3>");
			$('.bio').append("<p>"+bio+"</p>");
			$('.started').append("<img src='images/clock.svg'><p>Joined on "+time+"</p>");
			$('.stats').append("<a class='vcard-stat'><strong class='vcard-stat-count d-block'>"+followers+"</strong><span>Followers</span></a><a class='vcard-stat'><strong class='vcard-stat-count d-block'>0</strong><span>Starred</span></a><a class='vcard-stat'><strong class='vcard-stat-count d-block'>"+following+"</strong><span>Following</span></a>");

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

			$('.repos').append("<div class='repoList'><ul class='mainList'><li><h3>"+repoName+"</h3></li><li>"+repoDescrip+"</li><li>"+upTime+"</li></ul><ul class='sideList'><li>"+lang+"</li><li><img src='images/star.svg'>"+stars+"</li><li><img src='images/git-branch.svg'>"+fork+"</li></ul></div>");
		})
	}
});

function commitSet(commit){

	var bigString= "";

	commit.forEach(function(message)
	{
		var com = commit.message;
		bigString += "<p>'"+com+"'</p>";
	})
	return bigString;
};

$.ajax({
	url: "https://api.github.com/users/jknueven/events",
	type: "GET",
	success: function(activity)
	{
		var result = activity;
		var time = result.created_at;
		var updated = moment(time).fromNow();
	

		result.forEach(function(act)
		{
			var reference = result.payload.ref;
			var role = reference.split("/");
			role = role[2];
			var sha = result.payload.commit.sha;
			sha = sha.substring(sha.length-7, sha.length);
			var icon = "";
			if (act.type === "PushEvent") 
			{
				var commits = commitSet(act.payload.commits);
				icon = "images/git-commit.svg";
				$('.activitiesTab').append("<ul><li>"+updated+"</li><li>"+result.actor.login+"pushed to "+role+"at "+result.repo.name+"</li><li><img class='imgOne' src='images/Jared_profile3'><img class='imgTwo' src='images/Jared_profile3'>"+result.payload.push_id+);

			}
			else if (act.type === "CreateEvent") 
			{
				icon = "images/mark-github.svg";
			}
			else if (act.type === "MemeberEvent")
			{
				icon = "images/person.svg";
			}
		})
	}
});

});