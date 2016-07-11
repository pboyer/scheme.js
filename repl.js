var scheme = require('./scheme.js')
	, repl = require('repl');

var S = new scheme.Interpreter();

function eval(cmd, context, filename, callback) {
	try { 
		var result = S.parse_eval( cmd.slice(1, cmd.length - 2) );
	} catch (e) {
		var result = e;
	}
  	callback(null, result);
}

repl.start({
	prompt: "s>>>",
	input: process.stdin,
	output: process.stdout,
	eval: eval
});
