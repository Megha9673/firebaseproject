var admin = require('firebase-admin');
var firebase = require('firebase');
var nodemailer = require('nodemailer');
var serviceAccount = require('./setmytest-3eea8-firebase-adminsdk-qgxwf-82af1eea52.json');
firebase.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://setmytest-3eea8.firebaseio.com'
});


const db = firebase.database();
//.ref("server/saving-data/fireblog/users");
console.log('df');
db.ref('/users/userdata').on("child_added", function(snapshot) {
	console.log('fqewf');
    var changedUser = snapshot.val();
    console.log(changedUser);
	console.log("result.body");
	// count++;
	// var newKey = "user"+count;
	const newUser = 
	{
		email : changedUser.email,
		name : changedUser.name
	};
	
	db.ref('userInformation').push(newUser).then(() => {
		console.log('success');	
	})
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
		    user: 'your Email',
		    pass: 'password'
		}
	});

	var mailOptions = {
	  from: 'your email',
	  to: changedUser.email,
	  subject: 'SetMyTest',
	  text: 'Dear '+ changedUser.name +' Welcome to our app!!'
	};

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
	    console.log(error);
	  } else {
	    console.log('Email sent: ' + info.response);
	  }
	});
})


