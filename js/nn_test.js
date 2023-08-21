import { dotProduct, transpose, matrixAdd, matrixSubtract, matrixMultiply, matrixDivide } from "./neuralnetwork.js";

let mA = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]];
let mB = [[13, 14, 15, 16], [17, 18, 19, 20], [21, 22, 23, 24]];

/*
console.log(dotProduct(mA, mB));
console.log(transpose(dotProduct(mA, mB)));
console.log(mA);
console.log(transpose(mA));
console.log(mB);
console.log(transpose(mB));
*/
console.log(matrixAdd([[0, 1, 2], [3, 4, 5], [6, 7, 8]], [[1, 1, 1]]));
console.log(matrixSubtract([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]], [[1, 2, 3]]));
console.log(matrixMultiply([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]], [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]]));
console.log(matrixDivide([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]], [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]]));
