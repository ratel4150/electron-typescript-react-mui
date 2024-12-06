// src\renderer\features\product\components\SalesPredictionChart.tsx
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface SalesPredictionChartProps {
  predictions: number[];
}

const SalesPredictionChart: React.FC<SalesPredictionChartProps> = ({ predictions }) => {
  const chartRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const svg = d3.select(chartRef.current);

      // Dimensiones del gráfico
      const width = 600;
      const height = 300;
      const margin = { top: 20, right: 30, bottom: 30, left: 50 };

      // Limpia el SVG existente
      svg.selectAll('*').remove();

      // Escalas
      const xScale = d3.scaleLinear()
        .domain([0, predictions.length - 1])
        .range([margin.left, width - margin.right]);

      const yScale = d3.scaleLinear()
        .domain([0, d3.max(predictions)!])
        .range([height - margin.bottom, margin.top]);

      // Ejes
      const xAxis = d3.axisBottom(xScale).ticks(predictions.length - 1).tickFormat((d) => `Día ${+d + 1}`);
      const yAxis = d3.axisLeft(yScale).ticks(5);

      svg.append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(xAxis);

      svg.append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(yAxis);

      // Línea
      const line = d3.line<number>()
        .x((_, i) => xScale(i))
        .y((d) => yScale(d))
        .curve(d3.curveMonotoneX);

      svg.append('path')
        .datum(predictions)
        .attr('fill', 'none')
        .attr('stroke', '#3f51b5')
        .attr('stroke-width', 2)
        .attr('d', line);

      // Puntos
      svg.selectAll('.dot')
        .data(predictions)
        .enter()
        .append('circle')
        .attr('cx', (_, i) => xScale(i))
        .attr('cy', (d) => yScale(d))
        .attr('r', 4)
        .attr('fill', '#ff5722');
    }
  }, [predictions]);

  return (
    <svg ref={chartRef} width={600} height={300} />
  );
};

export default SalesPredictionChart;