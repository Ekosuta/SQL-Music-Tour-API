//dependencies
const events = require('express').Router()
const { Op } = require('sequelize')
const db = require('../models')
const { Event, MeetGreet, SetTime, Band, Stage } = db

//routes
events.get('/', async (req, res) => {
    try {
        const foundEvents = await Event.findAll({
            order: [ ['date', 'ASC'] ],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.status(200).json(foundEvents)
    } catch (err) {
        console.log(err)
        res.status(500).send('ERROR GETTING ALL EVENTS')
    }
})

events.get('/:name', async (req, res) => {
    try {
        const foundEvent = await Event.findOne({ 
            where: {name: req.params.name},
            include: [
                {
                    model: MeetGreet,
                    as: 'meet_greets',
                    include: {
                        model: Band,
                        as: 'band'
                    }
                },
                {
                    model: SetTime,
                    as: 'set_times',
                    include: [
                        {
                            model: Band,
                            as: 'band'
                        },
                        {
                            model: Stage,
                            as: 'stage'
                        }
                    ]
                },
                {
                    model: Stage,
                    as: 'stages',
                    through: { attributes: [] }
                }
            ] 
        })
        res.status(200).json(foundEvent)
    } catch (err) {
        console.log(err)
        res.status(500).send('ERROR GETTING ONE EVENT')
    }
})

events.post('/', async (res, req) => {
    try {
        const newEvent = await Event.create(req.body)
        res.status(200).json(newEvent)
    } catch (err) {
        console.log(err)
        res.status(500).send('ERROR CREATING EVENT')
    }
})

events.put('/:id', async (res, req) => {
    try {
        const updatedEvents = await Event.update(
            req.body,
            { where: {event_id: req.params.id} }
        )
        res.status(200).json({ message: `Updated ${updatedEvents} events!` })
    } catch (err) {
        console.log(err)
        res.status(500).send('ERROR UPDATING EVENTS')
    }
})

events.delete('/:id', async (res, req) => {
    try {
        const foundEvent = await Event.destroy({ where: {event_id: req.params.id} })
        res.status(200).json({ message: `Successfully deleted ${foundEvent} with event id ${req.params.id}` })
    } catch (err) {
        console.log(err)
        res.status(500).send('ERROR DELETING EVENT')
    }
})

//exports
module.exports = events