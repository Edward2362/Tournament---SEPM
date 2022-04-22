const BOOLEAN = "boolean";
const REGEX = "regex";
const EXACT = "exact";

/**
 * Create a query object to to put in mongoose.find() or mongoose.aggregate().match()
 * @param {*} queryObject
 * @param {*} searchProps an array of object like following:
 * { name: "prop's name", value: "prop's value", type: "regex/boolean"}
 * @returns
 */
const createQueryObject = (queryObject, searchProps) => {
  searchProps &&
    searchProps.forEach((a) => {
      if (a.value) {
        if (a.type === BOOLEAN) {
          queryObject[a.name] = a.value === "true";
        } else if (a.type === REGEX) {
          queryObject[a.name] = { $regex: a.value, $options: "i" };
        } else if (a.type === EXACT) {
          queryObject[a.name] = a.value;
        }
      }
    });

  return queryObject;
};

/**
 * Chain sort and filter to mongoose request
 * @param {Model} model model to attach search queries
 * @param {Object} queryObject object to put in find()
 * @param {Object} object query options
 * @returns
 */
const chainSF = (
  chaining,
  {
    sort,
    sortDefault,
    fields,
    fieldsDefault = "",
    page,
    limit,
    limitDefault = 10,
  }
) => {
  // sorting
  if (sort) {
    const sortList = sort.split(",").join(" ");
    chaining = chaining.sort(sortList);
  } else if (sortDefault) {
    chaining = chaining.sort(sortDefault);
  } else {
    chaining = chaining.sort("-createdAt");
  }

  // pagination
  const pageTemp = parseInt(page) || 1;
  const limitTemp = parseInt(limit) || limitDefault;
  const skip = (pageTemp - 1) * limitTemp;

  chaining = chaining.skip(skip);

  // fields selection
  if (fields || fieldsDefault) {
    let fieldList = fieldsDefault;
    if (fields) {
      fieldList = fieldsDefault + " " + fields.split(",").join(" ");
    }
    chaining = chaining.select(fieldList);
  }

  chaining = chaining.limit(limitTemp);

  return chaining;
};

module.exports = { createQueryObject, chainSF };
