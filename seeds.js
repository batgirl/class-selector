var db = require('monk')('localhost/class-selector')

var students = db.get('students')
var courses = db.get('courses')
var professors = db.get('professors')

var jonesId = professors.id(),
    alvarezId = professors.id(),
    smithId = professors.id(),
    alamiId = professors.id()

var ethnographyId = courses.id(),
    quantumId = courses.id(),
    personalityId = courses.id()

var joeId = students.id(),
    sueId = students.id(),
    timId = students.id(),
    kimId = students.id()

Promise.all([
  students.remove().then(function () {
    return Promise.all([
      students.insert({_id: joeId, name: 'Joe', courseIds: [quantumId, personalityId, ethnographyId]}),
      students.insert({_id: sueId, name: 'Sue', courseIds: [ethnographyId]}),
      students.insert({_id: timId, name: 'Tim', courseIds: [quantumId, ethnographyId]}),
      students.insert({_id: kimId, name: 'Kim', courseIds: [personalityId]}),
    ])
  }),

  professors.remove().then(function () {
    return Promise.all([
      professors.insert({_id: alvarezId, name: 'Mr. Alvarez', courseId: ethnographyId}),
      professors.insert({_id: smithId, name: 'Mr. Smith', courseId: personalityId}),
      professors.insert({_id: jonesId, name: 'Mrs. Jones', courseId: quantumId}),
      professors.insert({_id: alamiId, name: 'Ms. Al-Alami', courseId: quantumId}),
    ])
  }),

  courses.remove({}).then(function () {
    return Promise.all([
      courses.insert({
        _id: ethnographyId,
        title: 'Ethnographic Writing',
        department: 'Anthropology',
        professorIds: [alvarezId],
        studentIds: [sueId, timId, joeId],
      }),
      courses.insert({
        _id: quantumId,
        title: 'Quantum Mechanics',
        department: 'Physics',
        professorIds: [jonesId, alamiId],
        studentIds: [timId, joeId],
      }),
      courses.insert({
        _id: personalityId,
        title: 'Discovering Personalities',
        department: 'Psychology',
        professorIds: [smithId],
        studentIds: [joeId, kimId],
      })
    ])
  }),
]).then(function () {
  db.close()
})
