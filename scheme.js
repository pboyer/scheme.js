// Env
// A dictionary of symbol-value pairs
var Env = function(vars, args, outer){

	vars = typeof vars !== 'undefined' ? vars : [];
	this.scope = {};
	var that = this;
	vars.forEach(function(val, i) {
		that.scope[val] = args[i];
	});
  outer = typeof outer !== 'undefined' ? outer : null;
  this.outer = outer;

	this.find = function(key){
		return this.scope[key] != null ? this.scope: this.outer.find(key);
	};

	this.add_methods = function(object) {
		var that = this;
		Object.getOwnPropertyNames(object).forEach(function(ele){
			if (typeof object[ele] === "function"){
				that.scope[ele] = object[ele];
			}
		});
	};

};

// The built-in symbols in the global Env
var built_ins = {
	'+': function(x, y) { return x + y; },
	'-': function(x, y) { return x - y; },
	'*': function(x, y) { return x * y; },
	'/': function(x, y) { return x / y; },
	'<': function(x, y) { return x < y; },
	'<=': function(x, y) { return x <= y; },
	'>': function(x, y) { return x > y; },
	'>=': function(x, y) { return x >= y; },
	'%': function(x, y) { return x % y; },
	'length': function(x) { return x.length; },
	'cons': function(l, val) { l.push(val); return l; },
	'car': function(l) { return l[0]; },
	'cdr': function(l) { return l.slice(1); },
	'list': function() { return Array.prototype.slice.call(arguments, 0); },
	'list?': function(e) { return e instanceof Array; },
	'null?': function(e) { return e === []; },
	'symbol?': function(e) { return typeof e === "string"; }
}

function add_globals(env) {
	env.add_methods(Math);
	env.add_methods(built_ins);
	return env;
}

// Interpreter
// Evaluates S-expressions
var Interpreter = function(){

	this.global_env = add_globals( new Env() );

	this.parse_eval = function(exp){
		return this.eval( this.parse(exp) );
	}

	this.eval = function(x, env) {
		env = typeof env !== 'undefined' ? env : this.global_env;

		var that = this;
		if ( typeof x === "string") {								// variable reference
			return env.find(x)[x];
		} else if ( !(x instanceof Array) ){				// literal	
			return x; 
		} else if (x[0] === "quote") {							// (quote exp)
			return x[1];
		} else if (x[0] === "if") {									// (if test conseq alt)
			var test = x[1], conseq = x[2], alt = x[3];
	    return this.eval( (this.eval(test, env) ? conseq : alt), env );
		} else if (x[0] === "set!") {								// (set! var exp)
			var vari = x[1], exp = x[2];
			env.find(vari)[vari] = this.eval(exp); 
		} else if (x[0] === "define") { 						// (define var exp)
			var vari = x[1], exp = x[2];
			env.scope[vari] = this.eval(exp, env);
		} else if (x[0] === "lambda") {							// (lambda (var*) exp)
			var vars = x[1], exp = x[2];
			return (function(args) {
				return that.eval( exp, new Env(vars, arguments, env) );
			});
		} else if (x[0] === "begin") {							// (begin exp*)
			var f;
			for (var i = 1, l = x.length; i < l; i++) {
				f = this.eval( x[i] );
			}
			return f;
		} else {		
			var that = this;									
			var exps = x.map(function(exp) { 						// (proc exp*)
				return that.eval(exp, env);
			});
		  var proc = exps.shift();
		  return proc.apply(this, exps);
		}

	}

	this.parse = function(s) {
		return this.read_from( this.tokenize( s ) );
	}

	this.tokenize = function(s) {
		return s.replace(/\(/g," ( ").replace(/\)/g," ) ").split(" ").filter(function(e){ return e; });
	};

	this.read_from = function(tokens) {
		if (tokens.length === 0) throw "unexpected EOF";
		token = tokens.shift();
		if (token === "(") {
			var L = [];
			while (tokens[0] !== ")") {
				L.push( this.read_from( tokens ) );
			}
			tokens.shift();
			return L;
		} else if (token === ")") {
			throw "expected )";
		} else {
			return this.atom(token);
		}
	};

	this.atom = function(token){
		var t = parseFloat( token );
		return isNaN(t) ? token : t;
	};

};

// Export these objects 
exports.Interpreter = Interpreter;
exports.Env = Env;

