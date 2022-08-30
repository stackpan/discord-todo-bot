const data = require('./data');

module.exports = function (userId, todoIndex) {
    const index = data.findIndex(userData => userData.userId === userId);

    data[index].todo[todoIndex].isDone = true;

    console.log(`A TODO removed for userId: ${userId}`);
}