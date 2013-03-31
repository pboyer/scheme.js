scheme.js
=========

**Explanation**

I wrote this scheme interpreter primarily as a learning experiment.  It borrows heavily from Peter Norvig's lis.py scheme interpreter for Python.  It can be used in the browser and in node.js.

**Usage**

Instantiate an interpreter like this:
	
    var scheme = require('./scheme.js');
    var S = new scheme.Interpreter();

Use the interpreter object like this:

    S.parse_eval('(+ 2 2)');   // returns 4
    S.parse_eval( '(define facto '+
			'(lambda (x) '+
			    '(if (<= x 1) '+
			        '1'+
                    '(* x (facto (- x 1) )))))' );
    S.parse_eval('(facto 5)'); // returns 120
 
**REPL**
         
There is also a REPL for node, which can be invoked like this:

    node repl
    s>>> (+ 2 2)
    4

**Tests**

There is a small set of tests which can be invoked using node:
    
    node test

**License: MIT**

Copyright (c) 2013 Peter Boyer

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
