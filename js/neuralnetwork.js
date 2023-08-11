export function dotProduct(matrix_a, matrix_b) {
    if ((matrix_a.length > 0) && (matrix_b.length > 0)) {
        if (matrix_a[0].length == matrix_b.length) {
            let matrix_c = [];
            for (let i = 0; i < matrix_a.length; i += 1) {
                matrix_c.push([])
                for (let j = 0; j < matrix_b[0].length; j += 1) {
                    let sum = 0;
                    for (let k = 0; k < matrix_b.length; k += 1) {
                        sum += matrix_a[i][k] * matrix_b[k][j];
                    }
                    matrix_c[matrix_c.length - 1].push(sum);
                }
            }
            return matrix_c;
        }
    }
    return -1
}

export class Dense {
    constructor(input_size, output_size) {
        this.input_size = input_size;
        this.output_size = output_size;
        this.weights = [];
        this.biases = [];
        for (let o = 0; o < output_size; o += 1) {
            this.weights.push([]);
            for (let i = 0; i < input_size; i +=1) {
                this.weights[this.weights.length - 1].push([Math.random() - 0.5 / this.input_size]);
            }
            this.biases.push([Math.random() - 0.5]);
        }
    }
}