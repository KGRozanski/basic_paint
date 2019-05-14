//My juniors need to start reading comments, and I neet to write them...
//This is a deploying code for pushing your code into FTP server

var FtpDeploy = require('ftp-deploy');
var ftpDeploy = new FtpDeploy();

var config = {
    user: "",                   // NOTE that this was username in 1.x
    password: "",           // optional, prompted if none given
    host: "",
    port: 21,
    localRoot: __dirname + '/dist',
    remoteRoot: '/land/pl/',
    include: ['*', '**/*'],      // this would upload everything except dot files
    // include: ['*.php', 'dist/*'],
    exclude: ['dist/**/*.map'],     // e.g. exclude sourcemaps - ** exclude: [] if nothing to exclude **
    deleteRemote: true,              // delete ALL existing files at destination before uploading, if true
    forcePasv: true                 // Passive mode is forced (EPSV command is not sent)
}

// use with promises
// ftpDeploy.deploy(config)
//     .then(res => console.log('finished:', res))
//     .catch(err => console.log(err))

// use with callback!!!!
ftpDeploy.deploy(config, function(err, res) {
    if (err) console.log(err)
    else console.log('finished -- hosted at: http://grouptcm.com'+config.remoteRoot + ' --', res);
});