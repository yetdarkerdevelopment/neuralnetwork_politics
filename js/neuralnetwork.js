class Dense {
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
        this.weights = math.matrix()
    }
}