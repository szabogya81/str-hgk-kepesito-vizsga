/**
 * @TODO : controller elkészítése, mely kapcsolódik a megfelelő service osztályhoz
 *
 * Kezelje a http-error üzeneteket:
 * - hiányos értékek @update műveletkor: BadREquest => 'Missing field'
 * - ha valamiért nem tudta a server frissíteni a building entitást:
 *  InternalServerError => 'Could not updated building'
 *
 * A szerver a megfelelő válaszokat küldje el a kliens felé
 */

const httpError = require('http-errors');
const Model = require('../../models/building.model');
const service = require('./building.service');

exports.updateBuilding = (req, res, next) => {
  const { buildingId, className } = req.body;

  console.log(req.body);

  if ( !buildingId || !className ) {
    return next(new httpError.BadRequest("Missing field"))
  }

  return service.update(buildingId, className)
        .then(entity => {
            res.json(entity);
        })
        .catch(err => {
            console.log(err);
            next(new createError.InternalServerError('Building could not updated'));
        });
}

exports.getAllBuildingWithClassrooms = (req, res, next) => {
  return service.getAll()
      .then(list => {
          res.json(list);
      });
};