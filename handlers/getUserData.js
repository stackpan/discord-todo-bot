import data from './data.js';

export default function (userId) {
    const userData = data.filter(userData => userData.userId === userId)[0];
    return userData;
}
