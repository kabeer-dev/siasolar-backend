module.exports.ACCESS_LEVELS = {
  create: 'CREATE',
  read: 'READ',
  update: 'UPDATE',
  delete: 'DELETE',
};
const levels = this.ACCESS_LEVELS;

module.exports.roles = {
  admin: {
    value: 'admin',
    accessLevels: [levels.create, levels.read, levels.update, levels.delete],
  },
  salesRepresentative: {
    value: 'salesRepresentative',
    accessLevels: [levels.create, levels.read, levels.update, levels.delete],
  },
};
