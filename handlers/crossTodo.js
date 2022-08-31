import data from './data.js';

export default function (userId, todoIndex) {
    const index = data.findIndex(userData => userData.userId === userId);

    data[index].todo[todoIndex].isDone = true;

    console.log(`A TODO removed for userId: ${userId}`);
}