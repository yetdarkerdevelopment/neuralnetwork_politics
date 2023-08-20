export function dotProduct(matrix_a, matrix_b) {
    if ((matrix_a.length > 0) && (matrix_b.length > 0)) {
        if (matrix_a[0].length == matrix_b.length) {
            let matrix_c = [];
            for (let i = 0; i < matrix_a.length; i += 1) {
                matrix_c.push([]);
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
        else {
            return -1;
        }
    }
    else {
        return -1;
    }
}

export function transpose(matrix_a) {
    let matrix_b = [];
    for (let i = 0; i < matrix_a[0].length; i += 1) {
        matrix_b.push([]);
        for (let j = 0; j < matrix_a.length; j += 1) {
            matrix_b[matrix_b.length - 1].push(matrix_a[j][i]);
        }
    }
    return matrix_b;
}

export function matrixAdd(matrix_a, matrix_b) {
    let matrix_c = [];
    for (let i = 0; i < matrix_a.length; i += 1) {
        matrix_c.push([])
        for (let j = 0; j < matrix_a[0].length; j += 1) {
            matrix_c[matrix_c.length - 1].push([])
        }
    }
    if ((matrix_a.length % matrix_b.length == 0) && (matrix_a[0].length % matrix_b[0].length == 0)) {
        for (let i = 0; i < matrix_a.length; i += 1) {
            for (let j = 0; j < matrix_a[0].length; j += 1) {
                matrix_c[i][j].push(matrix_a[i][j] + matrix_b[i % matrix_b.length][j % matrix_b[0].length]);
            }
        }
    }
    return matrix_c
}

export function matrixSubtract(matrix_a, matrix_b) {
    let matrix_c = [];
    for (let i = 0; i < matrix_a.length; i += 1) {
        matrix_c.push([])
        for (let j = 0; j < matrix_a[0].length; j += 1) {
            matrix_c[matrix_c.length - 1].push([])
        }
    }
    if ((matrix_a.length % matrix_b.length == 0) && (matrix_a[0].length % matrix_b[0].length == 0)) {
        for (let i = 0; i < matrix_a.length; i += 1) {
            for (let j = 0; j < matrix_a[0].length; j += 1) {
                matrix_c[i][j].push(matrix_a[i][j] - matrix_b[i % matrix_b.length][j % matrix_b[0].length]);
            }
        }
    }
    return matrix_c
}

export function matrixMultiply(matrix_a, matrix_b) {
    let matrix_c = [];
    for (let i = 0; i < matrix_a.length; i += 1) {
        matrix_c.push([])
        for (let j = 0; j < matrix_a[0].length; j += 1) {
            matrix_c[matrix_c.length - 1].push([])
        }
    }
    if ((matrix_a.length % matrix_b.length == 0) && (matrix_a[0].length % matrix_b[0].length == 0)) {
        for (let i = 0; i < matrix_a.length; i += 1) {
            for (let j = 0; j < matrix_a[0].length; j += 1) {
                matrix_c[i][j].push(matrix_a[i][j] * matrix_b[i % matrix_b.length][j % matrix_b[0].length]);
            }
        }
    }
    return matrix_c
}

export function matrixDivide(matrix_a, matrix_b) {
    let matrix_c = [];
    for (let i = 0; i < matrix_a.length; i += 1) {
        matrix_c.push([])
        for (let j = 0; j < matrix_a[0].length; j += 1) {
            matrix_c[matrix_c.length - 1].push([])
        }
    }
    if ((matrix_a.length % matrix_b.length == 0) && (matrix_a[0].length % matrix_b[0].length == 0)) {
        for (let i = 0; i < matrix_a.length; i += 1) {
            for (let j = 0; j < matrix_a[0].length; j += 1) {
                matrix_c[i][j].push(matrix_a[i][j] * matrix_b[i % matrix_b.length][j % matrix_b[0].length]);
            }
        }
    }
    return matrix_c
}

export function mse(actual, y) {
    let diff = matrixSubtract(actual, y);
    let before_sum = matrixMultiply(diff, diff);
    let after_sum = 0;
    console.log(before_sum);
    for (let i = 0; i < before_sum.length; i += 1) {
        for (let j = 0; j < before_sum[0].length; j += 1) {
            after_sum += before_sum[i][j]
        }
    }
    console.log(after_sum / actual.length / actual[0].length);
    return (after_sum / actual.length / actual[0].length);
}

export function msePrime(actual, y) {
    return matrixDivide(matrixMultiply(matrixSubtract(actual, y), [[2]]), [[actual.length * actual[0].length]])
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
                this.weights[this.weights.length - 1].push([(Math.random() - 0.5) / this.input_size]);
            }
            this.biases.push([Math.random() - 0.5]);
        }
        this.x = [];
        this.z = [];
    }

    forward(inputs) {
        this.x = inputs;
        this.z = matrixAdd(dotProduct(this.weights, this.x), this.biases);
        return this.z;
    }

    backward(output_gradient, lr) {
        let weight_gradient = dotProduct(output_gradient, transpose(this.x));
        let input_gradient = dotProduct(transpose(this.weights), output_gradient);
        this.weights = matrixSubtract(this.weights, (matrixMultiply(weight_gradient, [[lr]])));
        this.biases = matrixSubtract(this.biases, (matrixMultiply(output_gradient, [[lr]])));
        return input_gradient;
    }

}

export class leakyRelu {
    forward(inputs) {
        for (let i = 0; i < inputs.length; i += 1) {
            for (let j = 0; j < inputs[0].length; j += 1) {
                if (inputs[i][j] < 0) {
                    inputs[i][j] /= 0.01
                }
            }
        }
        return inputs;
    }

    backward(output_gradient, lr) {
        for (let i = 0; i < output_gradient.length; i += 1) {
            for (let j = 0; j < output_gradient[0].length; j += 1) {
                if (output_gradient[i][j] < 0) {
                    output_gradient[i][j] /= 0.01
                }
            }
        }
        return output_gradient;
    }

}
