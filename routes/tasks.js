var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://stefan:astro@ds155418.mlab.com:55418/myfantasy', ['tasks']);
//var dbUsers = mongojs('mongodb://stefan:astro@ds155418.mlab.com:55418/myfantasy', ['users']);
//var dbPlayers = mongojs('mongodb://stefan:astro@ds155418.mlab.com:55418/myfantasy', ['players']);
// Load the bcrypt module
var bcrypt = require('bcrypt');
// Generate a salt
var salt = bcrypt.genSaltSync(10);
// Hash the password with the salt

// verific user si passwd si pastrez sesiunea
router.post('/login', function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	var hash = bcrypt.hashSync(password, salt);

	db.users.findOne({username: username}, function(err, user) {
		if(err) {
			console.log(err);
			return res.status(500).send();
		}
		if(!user) {
			console.log("Nu am gasit user-ul respectiv")
			return res.status(204).send();
		}
		console.log(req.session + "session")
		console.log(hash)
		console.log(user.password)
		console.log("este " + bcrypt.compareSync(password, user.password))
		if (!bcrypt.compareSync(password, user.password)) {
			return res.status(404).send();
		}
		req.session.user = user;
		return res.status(200).send();
	})
})

router.get('/logout', function(req, res) {  
	console.log(req.session + "session")
	req.session.destroy()
	console.log(req.session + "session")
	return res.status(201).send()
})

router.post('/signup', function(req, res) { 
	var userToAdd = req.body;
	console.log("signup " + userToAdd.username)
	console.log(req.session + "session")
	db.users.findOne({username: userToAdd.username}, function(err, user) {
		if(err) {
			console.log(err);
			return res.status(500).send();
		}
		else if(!user) {
			console.log("Nu am gasit user-ul, continuam sign up ul")
			console.log("hash")
			var hash = bcrypt.hashSync(userToAdd.password, salt);
			userToAdd.password = hash;
			db.users.save(userToAdd, function(err, user) {
				if(err) { 
					res.send(err);  
				}
				console.log('S a salvat')
				//res.json(user);
			});
			return res.status(200).send();
		}
		else {
			console.log("am gasit user-ul")
			//return res.json(user);
			 res.status(204).send("Userul deja exista in BD"); // alt status, nu 400
		
		}
	});
	//sa testez daca mai exista user ul

	 // ar trebui sa nu las sa dea submit fara date valide
	//if (a == 1)
	//console.log("documentul " + documents)

	/*if (!document){
		console.log("hash")
		var hash = bcrypt.hashSync(user.password, salt);
		user.password = hash;
		dbUsers.users.save(user, function(err, user) {
			if(err) { 
				res.send(err);  
			}
			console.log('S a salvat')
			//res.json(user);
		});
	}*/
})


// Add Players
router.post('/add_players', function(req, res, next) {
	var players = req.body;
	if (!players.first_name) {
		res.status(400);
		res.json({
			"error": "Bad Data"
		});
	} else {
		db.players.save(players, function(err, players) {
			if(err) {
				res.send(err);
			}
			res.json(players);
		});
	}
});

// Add Players
router.post('/add_teams', function(req, res, next) {
	var teams = req.body;
	if (!teams.id) {
		res.status(400);
		res.json({
			"error": "Bad Data"
		});
	} else {
		db.teams.save(teams, function(err, teams) {
			if(err) {
				res.send(err);
			}
			res.json(teams);
		});
	}
});



// Add Events
router.post('/add_event', function(req, res, next) {
	var event = req.body;
	if (!event.id) {
		res.status(400);
		res.json({
			"error": "Bad Data"
		});
	} else {
		db.event.save(event, function(err, event) {
			if(err) {
				res.send(err);
			}
			res.json(event);
		});
	}
});



// nu pot sa accesez atunci cand nu sunt logat
router.get('/dashboard', function(req, res) {
	console.log("a " + req.session)
	if(!req.session.user) {
		return res.status(401).send()
	}

	return res.status(200).send("Welcome")
})


// Get All Tasks
router.get('/tasks', function(req, res, next) {
	db.tasks.find(function(err, tasks) {
		if(err) {
			res.send(err);
		}
		res.json(tasks);
	});
})

// Get Single Task
router.get('/task/:id', function(req, res, next) {
	db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, task) {
		if(err) {
			res.send(err);
		}
		res.json(task);
	});
})

// Save Task
router.post('/task', function(req, res, next) {
	var task = req.body;
	if (!task.title || !(task.isDone + '')) {
		res.status(400);
		res.json({
			"error": "Bad Data"
		});
	} else {
		db.tasks.save(task, function(err, task) {
			if(err) {
				res.send(err);
			}
			res.json(task);
		});
	}
});

// Delete Task
router.delete('/task/:id', function(req, res, next) {
	db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, task) {
		if(err) {
			res.send(err);
		}
		res.json(task);
	});
})

//Update Task
router.put('/task/:id', function(req, res, next) {
	var task = req.body;
	var updTask = {};

	if (task.isDone) {
		updTask.isDone = task.isDone;
	}

	if (task.title) {
		updTask.title = task.title;
	}

	if (!updTask) {
		res.status(400);
		res.json({
			"error": "Bad Data"
		})
	} else {
		db.tasks.update({_id: mongojs.ObjectId(req.params.id)}, updTask, {}, function(err, task) {
		if(err) {
			res.send(err);
		}
		res.json(task);
	});
	}
});

module.exports = router;