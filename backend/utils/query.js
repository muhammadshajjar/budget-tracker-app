// function addStringQuery(key, sequelizeQuery, queryJson) {
//   if (queryJson[key]) {
//     sequelizeQuery[key] = {
//       [Op.like]: queryJson[key].replaceAll("%20", " "),
//     };
//   }
// }
const moment = require("moment");

function addDateQuery(key, sequelizeQuery, queryJson) {
  if (
    !(
      queryJson[`${key}`] ||
      queryJson[`${key}_gt`] ||
      queryJson[`${key}_lt`] ||
      queryJson[`${key}_gte`] ||
      queryJson[`${key}_lte`]
    )
  )
    return;
  let dateQuery = {};
  if (queryJson[`${key}`]) {
    dateQuery.$gte = new Date(queryJson[key]);
    dateQuery.$lte = new Date(moment(queryJson[key]).endOf("day").toDate());
  }
  if (queryJson[`${key}_gt`]) {
    dateQuery.$gt = new Date(queryJson[`${key}_gt`]);
  }
  if (queryJson[`${key}_lt`]) {
    dateQuery["$lt"] = new Date(queryJson[`${key}_lt`]);
  }
  if (queryJson[`${key}_gte`]) {
    dateQuery["$gte"] = new Date(queryJson[`${key}_gte`]);
  }
  if (queryJson[`${key}_lte`]) {
    dateQuery["$lte"] = new Date(queryJson[`${key}_lte`]);
  }
  sequelizeQuery[key] = dateQuery;
}

module.exports = {
  addDateQuery,
};
