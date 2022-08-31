import data from './data.js';
import { customAlphabet } from "nanoid";

export default function (userId, todo) {
    const index = data.findIndex(userData => userData.userId === userId);

    const nanoId = customAlphabet('1234567890', 4);
    const todoId = `${nanoId()}${userId}${data[index].todo.length}`;

    data[index].todo.push({
        id: todoId,
        content: todo,
        isDone: false,
    });

    console.log(`A TODO created for userId: ${userId}`);
}