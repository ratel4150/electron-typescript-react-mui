// src\renderer\tensor\tensorflowModel.ts
import * as tf from '@tensorflow/tfjs';
// **General Storage for Models**
let salesModel: tf.Sequential | null = null;
let churnModel: tf.Sequential | null = null;
let customerClassificationModel: tf.Sequential | null = null;
let anomalyDetectionModel: tf.Sequential | null = null;
let financialForecastModel: tf.Sequential | null = null;




// === 1. PREDICCIÓN DE TENDENCIAS DE VENTAS ===
export const initializeSalesModel = async () => {
  salesModel = tf.sequential();
  salesModel.add(tf.layers.dense({ units: 64, activation: 'relu', inputShape: [5] }));  // Más unidades y entradas
  salesModel.add(tf.layers.dense({ units: 128, activation: 'relu' }));
  salesModel.add(tf.layers.dense({ units: 64, activation: 'relu' }));
  salesModel.add(tf.layers.dense({ units: 1 }));
  salesModel.compile({ optimizer: 'adam', loss: 'meanSquaredError' });

  const trainingData = tf.tensor2d(
    [
        [1, 100, 10, 5, 0.5],  // Añadimos más características (ejemplo: publicidad, clima, estacionalidad, etc.)
        [2, 200, 15, 10, 0.3],
        [3, 300, 20, 8, 0.2],
        [4, 400, 30, 7, 0.6],
      ],
      [4, 5]
  );
  const outputData = tf.tensor2d([[150], [250], [350], [450]], [4, 1]);

  const history = await salesModel.fit(trainingData, outputData, { epochs: 100 });
  console.log('Historial de ventas (pérdidas):', history.history.loss);
};

export const predictSales = async (input: number[][]) => {
  if (!salesModel) throw new Error('El modelo de ventas no está inicializado');
  const tensorInput = tf.tensor2d(input, [input.length, 5]);
  const prediction = salesModel.predict(tensorInput) as tf.Tensor;
  return Array.from(await prediction.data());
};

// === 2. CLASIFICACIÓN DE CLIENTES ===
export const initializeCustomerClassificationModel = async () => {
  customerClassificationModel = tf.sequential();
  customerClassificationModel.add(tf.layers.dense({ units: 10, activation: 'relu', inputShape: [4] }));
  customerClassificationModel.add(tf.layers.dense({ units: 3, activation: 'softmax' })); // 3 clases: Frecuente, Ocasional, Nuevo
  customerClassificationModel.compile({ optimizer: 'adam', loss: 'categoricalCrossentropy' });

  const trainingData = tf.tensor2d(
    [
      [350, 5, 2, 10], // Gastos, Frecuencia, Categoría, Última Compra
      [100, 1, 1, 30],
      [500, 10, 3, 5],
    ],
    [3, 4]
  );
  const outputData = tf.tensor2d(
    [
      [1, 0, 0], // Frecuente
      [0, 1, 0], // Ocasional
      [0, 0, 1], // Nuevo
    ],
    [3, 3]
  );

  const history = await customerClassificationModel.fit(trainingData, outputData, { epochs: 50 });
  console.log('Historial de clasificación de clientes (pérdidas):', history.history.loss);
};

export const classifyCustomer = async (input: number[][]) => {
  if (!customerClassificationModel) throw new Error('El modelo de clasificación no está inicializado');
  const tensorInput = tf.tensor2d(input, [input.length, 4]);
  const prediction = customerClassificationModel.predict(tensorInput) as tf.Tensor;
  return prediction.arraySync(); // Devuelve probabilidades para cada clase
};

// === 3. PREDICCIÓN DE CHURN ===
export const initializeChurnModel = async () => {
  churnModel = tf.sequential();
  churnModel.add(tf.layers.dense({ units: 10, activation: 'relu', inputShape: [4] }));
  churnModel.add(tf.layers.dense({ units: 1, activation: 'sigmoid' })); // Churn: 0 (No) o 1 (Sí)
  churnModel.compile({ optimizer: 'adam', loss: 'binaryCrossentropy' });

  const trainingData = tf.tensor2d(
    [
      [30, 1, 0.5, 3.2], // Tiempo desde última compra, Frecuencia, Interacción, Satisfacción
      [10, 4, 0.8, 4.5],
      [50, 0, 0.2, 2.0],
    ],
    [3, 4]
  );
  const outputData = tf.tensor2d([[1], [0], [1]], [3, 1]); // 1 = Churn, 0 = No Churn

  const history = await churnModel.fit(trainingData, outputData, { epochs: 50 });
  console.log('Historial de churn (pérdidas):', history.history.loss);
};

export const predictChurn = async (input: number[][]) => {
  if (!churnModel) throw new Error('El modelo de churn no está inicializado');
  const tensorInput = tf.tensor2d(input, [input.length, 4]);
  const prediction = churnModel.predict(tensorInput) as tf.Tensor;
  return Array.from(await prediction.data());
};

// === 4. DETECCIÓN DE ANOMALÍAS ===
export const initializeAnomalyDetectionModel = async () => {
  anomalyDetectionModel = tf.sequential();
  anomalyDetectionModel.add(tf.layers.dense({ units: 10, activation: 'relu', inputShape: [2] }));
  anomalyDetectionModel.add(tf.layers.dense({ units: 1 }));
  anomalyDetectionModel.compile({ optimizer: 'adam', loss: 'meanSquaredError' });

  const trainingData = tf.tensor2d(
    [
      [1, 100],
      [2, 200],
      [3, 300],
    ],
    [3, 2]
  );
  const outputData = tf.tensor2d([[0], [0], [0]], [3, 1]); // Sin anomalías

  const history = await anomalyDetectionModel.fit(trainingData, outputData, { epochs: 50 });
  console.log('Historial de detección de anomalías (pérdidas):', history.history.loss);
};

export const detectAnomalies = async (input: number[][]) => {
  if (!anomalyDetectionModel) throw new Error('El modelo de anomalías no está inicializado');
  const tensorInput = tf.tensor2d(input, [input.length, 2]);
  const prediction = anomalyDetectionModel.predict(tensorInput) as tf.Tensor;
  return Array.from(await prediction.data());
};

// === 5. FORECAST FINANCIERO ===
export const initializeFinancialForecastModel = async () => {
  financialForecastModel = tf.sequential();
  financialForecastModel.add(tf.layers.dense({ units: 10, activation: 'relu', inputShape: [1] }));
  financialForecastModel.add(tf.layers.dense({ units: 1 }));
  financialForecastModel.compile({ optimizer: 'adam', loss: 'meanSquaredError' });

  const trainingData = tf.tensor2d([[1], [2], [3]], [3, 1]); // Trimestres
  const outputData = tf.tensor2d([[50000], [55000], [60000]], [3, 1]); // Ingresos proyectados

  const history = await financialForecastModel.fit(trainingData, outputData, { epochs: 50 });
  console.log('Historial financiero (pérdidas):', history.history.loss);
};

export const forecastFinance = async (input: number[][]) => {
  if (!financialForecastModel) throw new Error('El modelo financiero no está inicializado');
  const tensorInput = tf.tensor2d(input, [input.length, 1]);
  const prediction = financialForecastModel.predict(tensorInput) as tf.Tensor;
  return Array.from(await prediction.data());
};


type InitializedModels = {
    [key: string]: any; // Aquí, 'any' puede ser reemplazado por el tipo específico de lo que devuelve la inicialización
  };
  
  export const initializeModels = async (modelsToInitialize: string[]): Promise<InitializedModels> => {
    const initializedModels: InitializedModels = {}; // Aquí hemos especificado el tipo de initializedModels
  
    for (const modelName of modelsToInitialize) {
      switch (modelName) {
        case 'AnomalyDetection':
          initializedModels[modelName] = await initializeAnomalyDetectionModel();
          break;
        case 'Churn':
          initializedModels[modelName] = await initializeChurnModel();
          break;
          case 'CustomerClassification':
            initializedModels[modelName] = await  initializeCustomerClassificationModel();
            break;
            case 'FinancialForecast':
                initializedModels[modelName] = await  initializeFinancialForecastModel();
                break;

                case 'Sales':
                    initializedModels[modelName] = await  initializeSalesModel();
                    break;
        default:
          console.warn(`No initialization logic for model: ${modelName}`);
      }
    }
    return initializedModels;
  };

/* export function initialize() {
  throw new Error('Function not implemented.');
}
 */