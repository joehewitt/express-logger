express-logger
===============

Express middleware for auto-archiving log files.

This middleware builds on the built-in Express logger.  It will automatically rotate your logs and archive the old logs daily.

Usage
------------

Works just like express.logger, except that you give it a path instead of a stream.

	var logger = require('express-logger');
	server.use(logger({path: "/path/to/logfile.txt"}));

Installation
------------

    $ npm install express-logger

License 
-------

Copyright 2011 Joe Hewitt

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
 
   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
