const data = require('./data');

module.exports = function (userId) {
    return data.filter(userData => userData.userId = userId)[0];
}
