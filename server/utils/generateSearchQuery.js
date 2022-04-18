const BOOLEAN = "boolean";
const REGEX = "regex";

/**
 * Attach search query to mongoose request
 * @param {Model} model model to attach search queries
 * @param {Object} queryObject object to put in find()
 * @param {Object} object query options
 * searchProps: an array of object like following:
 * { name: "prop's name", value: "prop's value", type: "regex/boolean"}
 * @returns
 */
const generateSearchQuery = (
  model,
  queryObject,
  {
    searchProps,
    sort,
    sortDefault,
    fields,
    fieldsDefault = "",
    page,
    limit,
    limitDefault = 10,
  }
) => {
  searchProps.forEach((a) => {
    if (a.value) {
      if (a.type === BOOLEAN) {
        queryObject[a.name] = a.value === "true" ? true : false;
      } else if (a.type === REGEX)
        queryObject[a.name] = { $regex: a.value, $options: "i" };
    }
  });

  let result = model.find(queryObject);

  // sorting
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else if (sortDefault) {
    result = result.sort(sortDefault);
  } else {
    result = result.sort("-createdAt");
  }

  // pagination
  const pageTemp = parseInt(page) || 1;
  const limitTemp = parseInt(limit) || limitDefault;
  const skip = (pageTemp - 1) * limitTemp;

  result = result.skip(skip);

  // fields selection
  if (fields || fieldsDefault) {
    let fieldList = fieldsDefault;
    if (fields) {
      fieldList = fieldsDefault + " " + fields.split(",").join(" ");
    }
    result = result.select(fieldList);
  }

  result = result.limit(limitTemp);

  return result;
};

module.exports = generateSearchQuery;
