// src\renderer\features\product\components\ProductChart.tsx
import React from 'react'
import * as d3 from "d3";

const ProductChart = () => {
  const chartRef = React.useRef<SVGSVGElement | null>(null);

  React.useEffect(() => {
    // Datos para el gráfico
    const data = [
      { label: 'Producto A', value: 120 },
      { label: 'Producto B', value: 150 },
      { label: 'Producto C', value: 100 },
    ];

    // Dimensiones del gráfico
    const width = 400;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 50, left: 50 };

    // Escalas
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value) || 0]) // Asegura que el valor no sea null/undefined
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Selección del contenedor SVG
    const svg = d3.select(chartRef.current);

    // Limpia el contenido anterior
    svg.selectAll('*').remove();

    // Ejes
    svg
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end');

    svg
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    // Barras
    svg
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(d.label) || 0)
      .attr('y', (d) => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', (d) => y(0) - y(d.value))
      .attr('fill', (d, i) => ['#3f51b5', '#ff5722', '#4caf50'][i]);
  }, []);

  return <svg ref={chartRef} width={400} height={300}></svg>;
};

export default ProductChart