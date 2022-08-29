const data = require('./data');

module.exports = function (userId) {
    const userData = data.filter(userData => userData.userId === userId)[0];
    return userData;
}
