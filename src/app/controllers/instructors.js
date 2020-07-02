const { date, age, formatter } = require('../../lib/utils')
const Instructor = require('../models/Instructor')

module.exports = {
    index(req, res) {
       
        Instructor.all( function(instructors)  {
            return res.render('instructors/index', { instructors })
        })
    },
    create(req, res) {
        return res.render('instructors/create')

    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for (let key of keys) {
            if (req.body[key] == '')
                res.send('Please fill and the fields!')
        }

       Instructor.create(req.body, instructor => {
        return res.redirect(`/instructors/${instructor.id}`)
       })

    },
    show(req, res) {
        Instructor.find(req.params.id, function (instructor) {
            if (!instructor) return res.send('Instructor not found')

            instructor.age = age(instructor.birth)
            instructor.services = instructor.services.split(',')
            instructor.birth = date(instructor.birth).created

            return res.render('instructors/show', { instructor })    
        })
    },
    edit(req, res) {
        return
    },
    put(req, res) {
        const keys = Object.keys(req.body)

        for (let key of keys) {
            if (req.body[key] == '')
                res.send('Please fill and the fields!')
        }
    },
    delete(req, res) {
        return
    }
}