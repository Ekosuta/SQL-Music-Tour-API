//dependencies
const stages = require('express').Router()
const db = require('../models')
const { Stage, Event } = db
const { Op } = require('sequelize')

//routes
stages.get('/', async (req, res) => {
    try {
        const foundStages = await Stage.findAll({
            where: {
                stage_name: { [Op.like]: `%${req.query.stage_name ? req.query.stage_name : ''}%` }
            }
        })
        res.status(200).json(foundStages)
    } catch (err) {
        console.log(err)
        res.status(500).send('ERROR GETTING ALL STAGES')
    }
})

stages.get('/:name', async (req, res) => {
    try {
        const foundStage = await Stage.findOne({ 
            where: {stage_name: req.params.name},
            include: {
                model: Event,
                as: 'events',
                through: { attributes: [] }
            } 
        })
        res.status(200).json(foundStage)
    } catch (err) {
        console.log(err)
        res.status(500).send('ERROR GETTING ONE STAGE')
    }
})

stages.post('/', async (req, res) => {
    try {
        const newStage = await Stage.create(req.body)
        res.status(200).json(newStage)
    } catch (err) {
        console.log(err)
        res.status(500).send('ERROR CREATING STAGE')
    }
})

stages.put('/:id', async (req, res) => {
    try {
        const updatedStages = await Stage.update(
            req.body,
            { where: {stage_id: req.params.id} }
        )
        res.stattus(200).json({ message: `Successfully updated ${updatedStages}` })
    } catch (err) {
        console.log(err)
        res.status(500).send('ERROR UPDATING STAGES')
    }
})

stages.delete('/:id', async (req, res) => {
    try {
        const foundStage = await Stage.destroy({ where: {stage_id: req.params.id} })
        res.status(200).json({ message: `Successfully deleted ${foundStage} with id ${req.params.id}` })
    } catch (err) {
        console.log(err)
        res.status(500).send('ERROR DELETING STAGE')
    }
})

//exports
module.exports = stages