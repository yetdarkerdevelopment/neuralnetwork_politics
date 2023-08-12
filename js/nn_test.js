import { dotProduct, transpose, matrixAdd } from "./neuralnetwork.js";

let mA = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]];
let mB = [[13, 14, 15, 16], [17, 18, 19, 20], [21, 22, 23, 24]];

console.log(dotProduct(mA, mB));
console.log(transpose(dotProduct(mA, mB)));
console.log(mA);
console.log(transpose(mA));
console.log(mB);
console.log(transpose(mB));
console.log(matrixAdd([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]], [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]]));
console.log(matrixSubtract([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]], [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]]));
console.log(matrixMultiply([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]], [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]]));
console.log(matrixDivide([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]], [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]]));
