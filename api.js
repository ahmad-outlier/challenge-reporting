const knex = require('./db')

const Student = require('./models/student')
const grades = require('./grades.json')
const gradeService = require('./services/grade')

module.exports = {
  getHealth,
  getStudent,
  getStudentGradesReport,
  getCourseGradesReport
}

async function getHealth (req, res, next) {
  try {
    await knex('students').first()
    res.json({ success: true })
  } catch (e) {
    console.log(e)
    res.status(500).end()
  }
}

async function getStudent (req, res, next) {
  const { id } = req.params

  const student = await Student.findById(id)
  if (!student) return res.status(404).json({ message: `Student with ID ${id} not found` })

  res.status(200).json({ success: true, student })
}

async function getStudentGradesReport (req, res, next) {
  const { id } = req.params

  const student = await Student.findById(id)
  if (!student) return res.status(404).json({ message: `Student with ID ${id} not found` })

  const studentGrades = grades.filter(grade => grade.id === Number(id))
  student.gradeDetails = studentGrades.map(gradeData => {
    return { grade: gradeData.grade, course: gradeData.course }
  })

  res.status(200).json({ success: true, student })
}

async function getCourseGradesReport (req, res, next) {
  const gradesReport = gradeService.getCourseGrades()
  res.status(200).json({ success: true, gradesReport })
}
