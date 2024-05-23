//dependencies
const bands = require('express').Router()
const db = require('../models')
const { Band, MeetGreet, Event } = db

//routes
bands.get('/', async (req, res) => {
    try {
        const foundBands = await Band.findAll({
            order: [ ['available_start_time', 'ASC'] ],
            where: { name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` } }
        })
        res.status(200).json(foundBands)
    } catch (err) {
        console.log(err)
        res.status(500).send('ERROR GETTING ALL BANDS')
    }
})

bands.get('/:name', async (req, res) => {
    try {
        const foundBand = await Band.findOne({
            where: { name: req.params.name },
            include: [
                {
                    model: MeetGreet, 
                    as: 'meet_greets',
                    include: {
                        model: Event,
                        as: 'event',
                        where: { name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%` } }
                    }
                }, {
                    model: SetTime,
                    as: 'set_times',
                    include: {
                        model: Event,
                        as: 'event',
                        where: { name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%` } }
                    }
                }
            ]
        })
        res.status(200).json(foundBand)
    } catch (err) {
        console.log(err)
        res.status(500).send('ERROR GETTING ONE BAND')
    }
})

bands.post('/', async (req, res) => {
    try {
        const newBand = await Band.create(req.body)
        res.status(200).json(newBand)
    } catch (err) {
        console.log(err)
        res.status(500).send('ERROR CREATING A BAND')
    }
})

bands.put('/:id', async (req, res) => {
    try {
        const updatedBands = await Band.update(
            req.body,
            { where: {band_id: req.params.id} }
        )
        res.status(200).json({ message: `Updated ${updatedBands} bands!`})
    } catch (err) {
        console.log(err)
        res.status(500).send('ERROR UPDATING BANDS')
    }
})

bands.delete('/:id', async (req, res) => {
    try {
        const foundBand = await Band.destroy({ where: {band_id: req.params.id} })
        res.status(200).json({ message: `Successfully deleted ${foundBand} with band id ${req.params.id}!`})
    } catch (err) {
        console.log(err)
        res.status(500).send('ERROR DELETING BAND')
    }
})

//exports
module.exports = bands