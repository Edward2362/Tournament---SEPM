const BOOLEAN = "boolean";
const REGEX = "regex";

// objectAttributes: array with objects below
// { name: "name of the attribute", type: "regex, boolean", value: "value of the attribute"}
const generateSearchQuery = ({
  queryObject,
  objectAttributes,
  model,
  sort,
  sortDefault,
  fields,
  page,
  limit,
  pageDefault = 1,
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

  if (fields) {
    const fieldList = fields.split(",").join(" ");
    result = result.select(fieldList);
  }

  // default on first page
  const pageTemp = parseInt(page) || pageDefault;
  // default 10 items each page
  const limitTemp = parseInt(limit) || limitDefault;
  const skip = (pageTemp - 1) * limitTemp;

  result = result.skip(skip).limit(limit);

  return result;
};

module.exports = generateSearchQuery;
