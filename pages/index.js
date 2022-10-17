import { useState } from "react";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Home() {
  const [tempoInsertion, setTempoInsertion] = useState([]);
  const [tempoMerge, setTempoMerge] = useState([]);
  const [tamanhoVetor, setTamanhoVetor] = useState([]);

  function compararNumeros(a, b) {
    return a - b;
  }

  function insertionSort(array) {
    const inicio = performance.now();
    for (let i = 1; i < array.length; i++) {
      let j = i - 1;
      let temp = array[i];
      while (j >= 0 && array[j] > temp) {
        array[j + 1] = array[j];
        j--;
      }
      array[j + 1] = temp;
    }
    const final = performance.now();
    return parseFloat((final - inicio).toFixed(4));
  }



  function mergeSortRecursivo(array) {
    if (array.length <= 1) {
      return array;
    }
    
    const meio = Math.floor(array.length / 2);
    const esqArr = array.slice(0, meio);
    const dirArr = array.slice(meio);
  
    return mergeDoisArrays(mergeSortRecursivo(esqArr), mergeSortRecursivo(dirArr));
  }
  
  function mergeDoisArrays(esqArr, dirArr) {
    let resArr = [], esqIndex = 0, dirIndex = 0;
    
    while (esqIndex < esqArr.length && dirIndex < dirArr.length) {
      if (esqArr[esqIndex] < dirArr[dirIndex]) {
        resArr.push(esqArr[esqIndex]);
        esqIndex++;
      } else {
        resArr.push(dirArr[dirIndex]);
        dirIndex++;
      }
    }
    
    if (esqArr[esqIndex]) {	
      var elementos = esqArr.slice(esqIndex)
      resArr.push(...elementos); 
    } else {
      var elementos = dirArr.slice(dirIndex)
      resArr.push(...elementos); 
    }
    return resArr;
  }
  
  function sortTime() {
    let i;
    let tamVetor = [];
    let valVetor = [];
    let tempInsertion = [];
    let tempMerge = [];
    let vetor = []

    for (i = 0; i < 10; i++) {
      tamVetor.push(Math.floor(Math.random() * 10000 + 10));
    }
    tamVetor.sort(compararNumeros);

    let j;
    let k;
    for (j = 0; j < 10; j++) {
      for (k = 0; k < tamVetor[j]; k++) {
        valVetor.push(
          parseFloat(
            (
              Math.random() * (tamVetor[j] * 2 -((tamVetor[j] * 2) * -1)) + ((tamVetor[j] * 2) * -1)).toFixed(2)
          )
        );
      }
      const inicio = performance.now();
      vetor = mergeSortRecursivo(valVetor);
      const final = performance.now();
      tempMerge.push(final - inicio);
      tempInsertion.push(insertionSort(valVetor));
      setTamanhoVetor(tamVetor);
      setTempoInsertion(tempInsertion);
      setTempoMerge(tempMerge);

    }
  }

  const dataInsertionMerge = {
    labels:tamanhoVetor,
    datasets: [
      {
        label: "Insertion Sort",
        data: tempoInsertion,
        borderColor: "#565969",
        backgroundColor: "#565969",
      },
      {
        label: "Merge Sort",
        data: tempoMerge,
        borderColor: "#5E6BB5",
        backgroundColor: "#5E6BB5",
      }
    ],
  };

  return (
    <>
      <div style={{ alignItems: "center" }}>
        <button 
        onClick={(e) => {
          sortTime()}
        } 
        style={{ background: "red", marginTop: "100px", }}>
          Gerar Grafico
        </button>
        <h1>Insertion Sort vs Merge Sort</h1>
        <div
          style={{
            marginTop: "50px",
            width: "800px",
            height:"500px",
            backgroundColor: "white",
            marginRight: "auto",
            marginLeft: "auto",
          }}
        >
          <Line
            data={dataInsertionMerge}
            options={{
              maintainAspectRatio: false,
              scales: {
              },
            }}
          />
        </div>
      </div>
    </>
  );
}
