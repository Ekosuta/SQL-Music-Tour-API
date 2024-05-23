//dependencies
const events = require('express').Router()
const db = require('../models')
const { Event } = db

//routes
events.get('/', async (req, res) => {
    try {
        const foundEvents = await Event.findAll({
            order: [ ['start_time', 'ASC'] ]
        })
        res.status(200).json(foundEvents)
    } catch (err) {
        console.log(err)
        res.status(500).send('ERROR GETTING ALL EVENTS')
    }
})

events.get('/:id', async (req, res) => {
    try {
        const foundEvent = await Event.findOne({ where: {event_id: req.params.id} })
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