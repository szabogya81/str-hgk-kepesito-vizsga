const Model = require('../../models/classroom.model');

exports.create = requestData => {
    const entity = new Model(requestData);
    return entity.save();
};

exports.findAll = () => Model.find().populate();

exports.findOne = id => Model.findById(id).populate();

exports.update = (id, updateData) => Model.findByIdAndUpdate(id, updateData, { new: true });

exports.delete = id => Model.findByIdAndRemove(id);