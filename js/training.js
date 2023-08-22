import {Dense, leakyRelu, mse, msePrime} from "./neuralnetwork.js"

// HYPERPARAMETERS
let epochs = 100;
let lr = 0.01;

let matchLayers = [new Dense(300, 200), new leakyRelu(), new Dense(200, 7), new leakyRelu()];

let matchIdeologies = ["NULLISM", "APOLITICISM", "RIGHT-LIBERTARIANISM", "FASCISM", "HITLER'S NAZISM", "ANARCHO-COMMUNISM", "SOCIAL DEMOCRACY"]
// 0 - YES, 1 - UNSURE, 2 - NO, 3 - YES/UNSURE, 4 - UNSURE/NO, 5 - YES/NO, 6 - YES/UNSURE/NO
//          1  2  3  4  5  6  7  8  9  0  1  2  3  4  5  6  7  8  9  0  1  2  3  4  5  6  7  8  9  0  1  2  3  4  5  6  7  8  9  0  1  2  3  4  5  6  7  8  9  0  1  2  3  4  5  6  7  8  9  0  1  2  3  4  5  6  7  8  9  0  1  2  3  4  5  6  7  8  9  0      
let xy = [
          ["SOCIAL DEMOCRACY",
           [6, 2, 6, 6, 0, 0, 6, 6, 0, 0, 6, 6, 6, 6, 6, 6, 6, 0, 6, 6, 6, 6, 6, 6, 6, 2, 0, 2, 2, 6, 6, 6, 0, 6, 6, 2, 6, 6, 6, 6, 6, 6, 6, 2, 6, 2, 2, 1, 2, 6, 2, 6, 6, 6, 6, 6, 6, 2, 2, 6, 6, 6, 6, 6, 2, 2, 2, 6, 6, 6, 6, 2, 0, 2, 6, 6, 6, 2, 2, 6, 
            6, 6, 2, 2, 2, 6, 6, 2, 6, 6, 6, 6, 6, 0, 6, 6, 6, 6, 6, 6]],
          ["ANARCHO-COMMUNISM",
           [0, 6, 6, 2, 0, 2, 6, 6, 0, 0, 0, 2, 0, 0, 6, 0, 2, 0, 2, 2, 2, 2, 2, 0, 6, 2, 2, 0, 0, 0, 2, 2, 2, 2, 0, 2, 2, 0, 6, 2, 6, 0, 0, 2, 2, 2, 2, 1, 0, 2, 2, 2, 2, 2, 6, 6, 0, 2, 6, 6, 2, 2, 6, 0, 2, 2, 2, 6, 0, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 
            6, 6, 2, 2, 2, 6, 6, 2, 2, 2, 0, 2, 0, 2, 6, 2, 2, 0, 6, 2]],
          ["HITLER'S NAZISM",
           [2, 0, 1, 2, 2, 1, 0, 0, 2, 1, 2, 0, 2, 2, 0, 2, 0, 2, 0, 0, 0, 0, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 0, 2, 2, 0, 0, 2, 2, 0, 1, 2, 0, 0, 2, 0, 2, 0, 2, 2, 0, 2, 2, 2, 1, 2, 0, 2, 2, 2, 0, 0, 0, 2, 2, 0, 0, 2, 2, 2, 2, 2, 0, 2, 2, 2, 
            0, 2, 2, 2, 2, 1, 2, 2, 0, 0, 2, 0, 2, 2, 2, 2, 1, 2, 2, 0]],
          ["FASCISM",
           [6, 0, 6, 6, 6, 6, 6, 6, 6, 6, 2, 0, 2, 2, 6, 6, 0, 2, 0, 0, 0, 6, 6, 6, 0, 2, 6, 6, 2, 6, 6, 6, 6, 6, 6, 6, 0, 2, 2, 0, 6, 6, 6, 6, 1, 6, 3, 0, 2, 0, 6, 6, 6, 6, 6, 6, 2, 6, 6, 6, 6, 6, 6, 6, 0, 6, 6, 2, 2, 0, 0, 2, 2, 6, 6, 6, 6, 6, 6, 6, 
            6, 6, 6, 6, 2, 6, 2, 2, 6, 0, 2, 0, 6, 6, 6, 6, 6, 6, 2, 0]],
          ["RIGHT-LIBERTARIANISM",
           [0, 6, 2, 2, 2, 2, 6, 4, 2, 2, 6, 6, 6, 0, 2, 0, 6, 3, 2, 4, 6, 2, 2, 2, 6, 4, 0, 2, 2, 3, 2, 2, 0, 3, 2, 6, 6, 6, 2, 6, 2, 6, 2, 2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 6, 6, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 1, 2, 6, 4, 4, 2, 2, 3, 2, 2, 2, 2, 2, 6, 
            6, 6, 2, 2, 2, 6, 6, 2, 6, 6, 2, 2, 6, 0, 6, 2, 2, 2, 6, 2]],
          ["APOLITICISM",
           [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
          ["NULLISM", 
           [2, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 0, 2, 0, 2, 0, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 0, 2, 2, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 2, 2, 0, 2, 2, 2, 2, 0, 2, 2, 0, 
            2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 2, 0, 0, 0, 0, 0, 0]]
        ]
let xy_post = []

let xy_dup = []
for (let i = 0; i < xy.length; i += 1) {
   for (let j = 0; j < 30; j += 1) {
      xy_dup.push([xy[i][0], [...xy[i][0]]])
   }
}

// ONEHOT ENCODE DATA
for (let i = 0; i < xy.length; i += 1) {
   let x_pre = xy[i][1];
   let y_pre = matchIdeologies.indexOf(xy[i][0]);
   // console.log(x_pre)
   for (let j = 0; j < x_pre.length; j += 1) {
      if (x_pre[j] == 6) {
         x_pre[j] = Math.floor(Math.random() * 3);
      }
      if (x_pre[j] == 5) {
         if (Math.random() > 0.5) {
            x_pre[j] = 0;
         }
         else {
            x_pre[j] = 2;
         }
      }
      if (x_pre[j] == 4) {
         if (Math.random() > 0.5) {
            x_pre[j] = 1;
         }
         else {
            x_pre[j] = 2;
         }
      }
      if (x_pre[j] == 3) {
         if (Math.random() > 0.5) {
            x_pre[j] = 1;
         }
         else {
            x_pre[j] = 0;
         }
      }
   }
   let y = [];
   for (let j = 0; j < matchIdeologies.length; j += 1) {
      if (y_pre == j) {
         y.push(1);
      }
      else {
         y.push(0);
      }
   }
   let x = [];
   for (let j = 0; j < x_pre.length; j += 1) {
      if (x_pre[j] == 0) {
         x.push(1);
         x.push(0);
         x.push(0);
      }
      else if (x_pre[j] == 1) {
         x.push(0);
         x.push(1);
         x.push(0);
      }
      else {
         x.push(0);
         x.push(0);
         x.push(1); 
      }
   }
   xy_post.push([])
   xy_post[xy_post.length - 1].push([])
   xy_post[xy_post.length - 1].push([])
   for (let j = 0; j < 300; j += 1) {
      xy_post[i][1].push([x[j]]);
   }
   for (let j = 0; j < matchIdeologies.length; j += 1) {
      xy_post[i][0].push([y[j]]);
   }
}

xy = xy_post;
// console.log(xy)
// console.log(xy[0][1].indexOf([1]));
// console.log(xy[0][0].indexOf([1]));

// TRAINING
let loss = 0;
let count = 0;
let gradient = 0;
for (let epoch = 0; epoch < epochs; epoch += 1) {
   for (let i = 0; i < xy.length; i += 1) {
      count += 1
      let x = xy[i][1];
      let y = xy[i][0];
      for (let layer = 0; layer < matchLayers.length; layer += 1) {
         x = matchLayers[layer].forward(x);
      }

      loss += mse(x, y);
      gradient = msePrime(x, y);

      for (let layer = matchLayers.length - 1; layer >= 0; layer -= 1) {
         gradient = matchLayers[layer].backward(gradient, lr);
      }
   }
   console.log(loss / count, loss, count, epoch);
   loss = 0;
   count = 0;
}
