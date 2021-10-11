const tape = require('tape')
const jsonist = require('jsonist')

const port = (process.env.PORT = process.env.PORT || require('get-port-sync')())
const endpoint = `http://localhost:${port}`

const server = require('./server')

tape('health', async function (t) {
  const url = `${endpoint}/health`
  try {
    const { data, response } = await jsonist.get(url)
    if (response.statusCode !== 200) {
      throw new Error('Error connecting to sqlite database; did you initialize it by running `npm run init-db`?')
    }
    t.ok(data.success, 'should have successful healthcheck')
    t.end()
  } catch (e) {
    t.error(e)
  }
})

tape('getStudent endpoint', async function (t) {
  const url = `${endpoint}/student/1`
  try {
    const { data, response } = await jsonist.get(url)
    if (response.statusCode !== 200) {
      throw new Error('Error connecting to sqlite database; did you initialize it by running `npm run init-db`?')
    }
    t.ok(data.success, 'should fetch student successfully')
    t.deepEqual(data.student, {
      id: 1,
      first_name: 'Scotty',
      last_name: 'Quigley',
      email: 'Scotty79@hotmail.com',
      is_registered: 1,
      is_approved: 1,
      password_hash: '657907e1fd8e48e2be2aa59031ff8e0f0ecf8694',
      address: '241 Denesik Knolls Apt. 955',
      city: 'Buffalo',
      state: 'ME',
      zip: '04710',
      phone: '1-503-560-6954',
      created: '1628767983203.0',
      last_login: '1628770445749.0',
      ip_address: '2.137.18.155'
    })
    t.end()
  } catch (e) {
    t.error(e)
  }
})

tape('getStudentGradesReport endpoint', async function (t) {
  const url = `${endpoint}/student/1/grades`
  try {
    const { data, response } = await jsonist.get(url)
    if (response.statusCode !== 200) {
      throw new Error('Error connecting to sqlite database; did you initialize it by running `npm run init-db`?')
    }
    t.ok(data.success, 'should fetch student grades report successfully')
    t.deepEqual(data.student, {
      id: 1,
      first_name: 'Scotty',
      last_name: 'Quigley',
      email: 'Scotty79@hotmail.com',
      is_registered: 1,
      is_approved: 1,
      password_hash: '657907e1fd8e48e2be2aa59031ff8e0f0ecf8694',
      address: '241 Denesik Knolls Apt. 955',
      city: 'Buffalo',
      state: 'ME',
      zip: '04710',
      phone: '1-503-560-6954',
      created: '1628767983203.0',
      last_login: '1628770445749.0',
      ip_address: '2.137.18.155',
      gradeDetails: [
        {
          'grade': 50,
          'course': 'Calculus'
        },
        {
          'grade': 43,
          'course': 'Microeconomics'
        },
        {
          'grade': 50,
          'course': 'Statistics'
        },
        {
          'grade': 63,
          'course': 'Astronomy'
        }
      ]
    })
    t.end()
  } catch (e) {
    t.error(e)
  }
})

tape('getCourseGradesReport endpoint', async function (t) {
  const url = `${endpoint}/course/all/grades`
  try {
    const { data, response } = await jsonist.get(url)
    if (response.statusCode !== 200) {
      throw new Error('Error connecting to sqlite database; did you initialize it by running `npm run init-db`?')
    }
    t.ok(data.success, 'should fetch course grades report successfully')
    t.deepEqual(data.gradesReport, [
      {
        course: 'Microeconomics',
        minGrade: 0,
        maxGrade: 100,
        avgGrade: 49.81
      },
      {
        course: 'Statistics',
        minGrade: 0,
        maxGrade: 100,
        avgGrade: 50.02
      },
      {
        course: 'Astronomy',
        minGrade: 0,
        maxGrade: 100,
        avgGrade: 50.04
      },
      {
        course: 'Calculus',
        minGrade: 0,
        maxGrade: 100,
        avgGrade: 50.09
      },
      {
        course: 'Philosophy',
        minGrade: 0,
        maxGrade: 100,
        avgGrade: 50.02
      }
    ])
    t.end()
  } catch (e) {
    t.error(e)
  }
})

tape('cleanup', function (t) {
  server.closeDB()
  server.close()
  t.end()
})
