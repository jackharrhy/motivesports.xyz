const loadJsonFile = require('load-json-file');
const Ajv = require('ajv');

const names = [
  'match',
  'team',
  'secret',
];

module.exports = async () => {
  const ajv = new Ajv();
  const schemas = {};

  for (const id in names) {
    const name = names[id];
    const schemaFile = await loadJsonFile(`./src/schema/${name}.schema.json`);
    schemas[name] = {
      schemaFile,
    };
  }

  return (schemaName, obj) => {
    const validator = ajv.compile(schemas[schemaName].schemaFile);
    const valid = validator(obj);
    // if (!valid) console.log(validate.errors);
    return {
      valid,
      validator,
    };
  };
};
