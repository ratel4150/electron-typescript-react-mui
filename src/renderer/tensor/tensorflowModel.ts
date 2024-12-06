// src\renderer\tensor\tensorflowModel.ts
import * as tf from '@tensorflow/tfjs';

// Simula datos de entrenamiento
const trainingData = tf.tensor2d(
  [
    [1, 100], // Día 1, 100 ventas
    [2, 200], // Día 2, 200 ventas
    [3, 300], // Día 3, 300 ventas
  ],
  [3, 2]
);
const outputData = tf.tensor2d([[150], [250], [350]], [3, 1]); // Valores esperados

let model:any;

export const initialize = async () => {
  model = tf.sequential();
  model.add(tf.layers.dense({ units: 1, inputShape: [2] })); // Capa densa
  model.compile({ optimizer: 'sgd', loss: 'meanSquaredError' });

  // Entrenamiento del modelo
  await model.fit(trainingData, outputData, { epochs: 50 });
};

export const predictSales = async (input:any) => {
  if (!model) throw new Error('El modelo no está inicializado');
  const prediction = model.predict(tf.tensor2d(input, [input.length, 2]));
  return prediction.dataSync();
};