const BOOLEAN = "boolean";
const REGEX = "regex";

// objectAttributes: array with objects below
// { name: "name of the attribute", type: "regex/boolean", value: "value of the attribute"}
const generateSearchQuery = ({
  queryObject,
  objectAttributes,
  model,
  sort,
  sortDefault,
  fields,
  fieldsDefault = "",
  page,
  limit,
  limitDefault = 10,
}) => {
  objectAttributes.forEach((a) => {
    if (a.value) {
      if (a.type === BOOLEAN) {
        queryObject[a.name] = a.value === "true" ? true : false;
      } else if (a.type === REGEX)
        queryObject[a.name] = { $regex: a.value, $options: "i" };
    }
  });

  let result = model.find(queryObject);

  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else if (sortDefault) {
    result = result.sort(sortDefault);
  } else {
    result = result.sort("-createdAt");
  }

  const pageTemp = parseInt(page) || 1;
  const limitTemp = parseInt(limit) || limitDefault;
  const skip = (pageTemp - 1) * limitTemp;

  if (fields || fieldsDefault) {
    let fieldList = fieldsDefault;
    if (fields) {
      fieldList = fieldsDefault + " " + fields.split(",").join(" ");
    }
    result = result.select(fieldList);
  }

  result = result.skip(skip).limit(limitTemp);

  return result;
};

module.exports = generateSearchQuery;
