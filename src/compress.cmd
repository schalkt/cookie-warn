
set inputs=cookie-warn.js
set options_min=--language_in ECMASCRIPT5 --compilation_level SIMPLE_OPTIMIZATIONS
set options_debug=--language_in ECMASCRIPT5 --compilation_level WHITESPACE_ONLY --formatting PRETTY_PRINT

rem Google Closure Compiler
rem Download : http://dl.google.com/closure-compiler/compiler-latest.zip
java -jar compiler.jar %options_min% --js %inputs% --js_output_file ./../cookie-warn.min.js
java -jar compiler.jar %options_debug% --js %inputs% --js_output_file ./../cookie-warn.debug.js

pause