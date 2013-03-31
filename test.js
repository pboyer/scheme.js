var scheme = new require('./scheme.js')
	, assert = require('assert');

var S = new scheme.Interpreter();

assert.equal( S.parse_eval('(+ 2 2)'), 4 );
assert.equal( S.parse_eval('(+ (* 1 5) 2)'), 7 );
assert.equal( S.parse_eval('(+ (- 5 6) (+ 2 (+ 3 4)))'), 8 );
assert.equal( S.parse_eval( '((lambda (x) (+ 3 x)) 2)' ), 5 );
S.parse_eval( '(define a (lambda (x) (+ 2 x)))' );
assert.equal( S.parse_eval( '(a 5)' ), 7 );
S.parse_eval( '(set! a (lambda (x) (+ 8 x)))' );
assert.equal( S.parse_eval( '(a 5)' ), 13 );
S.parse_eval( '(define facto '+
								'(lambda (x) '+
									'(if (<= x 1) '+
										'1'+
										'(* x (facto (- x 1) )))))' );
assert.equal( S.parse_eval( '(facto 5)' ), 120 );
assert.equal( S.parse_eval('(begin (facto 5) )'), 120 );
assert.equal( S.parse_eval('(begin (facto 5) (+ 2 2))'), 4  );

