var db = require('monk')('localhost/class-selector')
var students = db.get('students');
var professors = db.get('professors');
var courses = db.get('courses');

