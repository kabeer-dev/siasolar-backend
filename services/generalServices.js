const {MongosFactory} = require('../factories');

module.exports = class GeneralServices {
  static async create({model, data, options, session}) {
    return await MongosFactory.create({
      model,
      data,
      session,
      options,
    });
  }

  static async find({model, query, options}) {
    return await MongosFactory.find({
      model,
      query,
      options,
    });
  }

  static async findAll({model, options, sort = {}}) {
    return await MongosFactory.findAll({
      model,
      options,
      sort,
    });
  }

  static async findAllByUserId({model, _id, options}) {
    // Method for finding all documents associated with a login user
    let query = {user: _id};
    return await MongosFactory.find({
      model,
      query,
      options,
    });
  }

  static async findOne({model, query, options}) {
    // query can be for example {_id} , {status: "active"}
    return await MongosFactory.findOne({
      model,
      query,
      options,
    });
  }

  static async updateById({model, _id, data, options, session}) {
    return await MongosFactory.updateById({
      model,
      _id,
      data,
      options,
      session,
    });
  }

  static async delete({model, query, options}) {
    return await MongosFactory.delete({
      model,
      query,
      options,
    });
  }

  static async deleteById({model, _id, options, session}) {
    return await MongosFactory.deleteById({
      model,
      _id,
      options,
      session,
    });
  }
};
