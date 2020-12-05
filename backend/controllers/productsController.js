const Sushies = require("../models/sushiesModel")
const Salads = require("../models/saladsModel")
const Soups = require("../models/soupsModel")
const SushiesSets = require("../models/sushiesSetsModel")
const Drinks = require("../models/drinksModel")

const getAllProducts = async ( req, res, next) =>{
    try{
        const sushies = await Sushies.find();
        const salads = await Salads.find();
        const soups = await Soups.find();
        const sushiesSets = await SushiesSets.find();
        const drinks = await Drinks.find();
        const product = [...sushies,...salads,...soups,...sushiesSets,...drinks,]
        res.json(product)
    }catch(err){
        res.json({msg: err})
    }
}

const getAllSushies = async ( req, res, next) =>{
    try{
        const sushies = await Sushies.find();
        res.json(sushies)
    }catch(err){
        res.json({msg: err})
    }
}

const getAllSalads = async ( req, res, next) =>{
    try{
        const salads = await Salads.find();
        res.json(salads)
    }catch(err){
        res.json({msg: err})
    }
}

const getAllSoups = async ( req, res, next) =>{
    try{
        const soups = await Soups.find();
        res.json(soups)
    }catch(err){
        res.json({msg: err})
    }
}

const getAllSushiesSets = async ( req, res, next) =>{
    try{
        const sushiesSets = await SushiesSets.find();
        res.json(sushiesSets)
    }catch(err){
        res.json({msg: err})
    }
}

const getAllDrinks = async ( req, res, next) =>{
    try{
        const drinks = await Drinks.find();
        res.json(drinks)
    }catch(err){
        res.json({msg: err})
    }
}

exports.getAllProducts = getAllProducts
exports.getAllDrinks = getAllDrinks
exports.getAllSushiesSets = getAllSushiesSets
exports.getAllSoups = getAllSoups
exports.getAllSalads = getAllSalads
exports.getAllSushies = getAllSushies