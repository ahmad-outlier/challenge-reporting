const _ = require('lodash')
const grades = require('../grades.json')

module.exports = {
  getCourseGrades
}

function getCourseGrades() {
  const gradesData = []
  const gradesByCourse = getGradesByCourse()

  for (course in gradesByCourse) {
    const gradeData = gradesByCourse[course]
    const { maxGrade, minGrade, avgGrade } = getMinMaxAvg(gradeData)
    gradesData.push({ course, minGrade, maxGrade, avgGrade })
  }

  return gradesData
}

function getGradesByCourse() {
  const gradeObject = {}

  for (let i=1; i<grades.length; i++) {
    const { course } = grades[i]
    if (!gradeObject[course]) gradeObject[course] = []
    else gradeObject[course].push(grades[i])
  }

  return gradeObject
}

function getMinMaxAvg(gradeData) {
  let maxGrade = gradeData[0].grade
  let minGrade = gradeData[0].grade
  let sum = gradeData[0].grade

  for (let i=1; i<gradeData.length; i++) {
    if (gradeData[i].grade > maxGrade) maxGrade = gradeData[i].grade
    if (gradeData[i].grade < minGrade) minGrade = gradeData[i].grade
    sum = sum + gradeData[i].grade
  }

  return {
    maxGrade: _.round(maxGrade, 2),
    minGrade: _.round(minGrade, 2),
    avgGrade: _.round(sum/gradeData.length, 2)
  }
}