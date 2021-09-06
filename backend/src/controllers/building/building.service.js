/**
 * @TODO : Mongoose modellek segítségével frissitsen egy 'building' entitást az adatbázisban.
 * - el kell menteni egy új "classroom" entitást.
 * - ki kell nyeri az új "classroom" id-ját.
 * - az id-t helyezze el a megfelelő 'Building' entitás 'classrooms' listájába
 *
 * A @getAll metódus adja vissza a populált teljes "building" listát
 */
 const Model = require('../../models/building.model');
 const classRoomService = require('../classroom/classroom.service');

exports.update = async (buildingId, className) => {
  
  Model.findById(buildingId).populate('classrooms')
  .then(building => {
    if(building) {
      classRoomService.create({ name: className })
        .then(
          classRoom => { 
            building.classrooms.push({ _id: classRoom._id });
            console.log(building);
            return Model.findByIdAndUpdate(buildingId, building, { new: true });
          });
    }
  });
};

exports.getAll = () => Model.find().populate('classrooms');