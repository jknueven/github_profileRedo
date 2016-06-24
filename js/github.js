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
		console.log(repos);
		var reposit = results.objects;


		resposit.forEach(function(repositories)
		{
			var repoName = reposit.name;
			var repoDescrip = reposit.description;
			var update = reposit.updated_at;
		})
	}
});

});