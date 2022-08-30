const data = require('./data');

module.exports = function (userId) {
    const userData = data.find(userData => userData.userId === userId);

    if (!userData) {
        data.push({
            userId: userId,
            todo: [],
            isDone: false,
        });

        console.log(`New user data created for userId: ${userId}`);
    }
};
