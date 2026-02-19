
import React from 'react';
import * as d3 from 'd3';
import { TokenData } from '../types';

interface Props {
  tokens: TokenData[];
}

const AttentionHeatmap: React.FC<Props> = ({ tokens }) => {
  const svgRef = React.useRef<SVGSVGElement>(null);

  React.useEffect(() => {
    if (!svgRef.current || tokens.length === 0) return;

    const margin = { top: 40, right: 40, bottom: 40, left: 40 };
    const width = 400 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .range([0, width])
      .domain(tokens.map(t => t.text))
      .padding(0.05);

    const y = d3.scaleBand()
      .range([height, 0])
      .domain(tokens.map(t => t.text))
      .padding(0.05);

    const color = d3.scaleSequential(d3.interpolateBlues)
      .domain([0, 1]);

    // Draw heatmap
    tokens.forEach((rowToken, i) => {
      tokens.forEach((colToken, j) => {
        const weight = rowToken.attentionWeights[j] || 0;
        g.append("rect")
          .attr("x", x(colToken.text)!)
          .attr("y", y(rowToken.text)!)
          .attr("width", x.bandwidth())
          .attr("height", y.bandwidth())
          .attr("rx", 4)
          .attr("fill", color(weight))
          .attr("stroke", "#1e293b")
          .attr("stroke-width", 1)
          .append("title")
          .text(`Attention from "${rowToken.text}" to "${colToken.text}": ${weight.toFixed(4)}`);
      });
    });

    // X Axis
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickSize(0))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end")
      .attr("dy", "1em")
      .style("fill", "#94a3b8")
      .style("font-size", "10px");

    // Y Axis
    g.append("g")
      .call(d3.axisLeft(y).tickSize(0))
      .selectAll("text")
      .style("fill", "#94a3b8")
      .style("font-size", "10px");

    // Title
    g.append("text")
      .attr("x", width / 2)
      .attr("y", -10)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("font-weight", "600")
      .style("fill", "#cbd5e1")
      .text("Self-Attention Weights");

  }, [tokens]);

  return (
    <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex justify-center items-center">
      <svg ref={svgRef} width="400" height="400" viewBox="0 0 400 400"></svg>
    </div>
  );
};

export default AttentionHeatmap;
