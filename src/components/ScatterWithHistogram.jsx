import * as d3 from "d3";
import React, { useEffect, useRef } from "react";
import { mockData } from "../data/mockData";

const colors = {
  Standard: "#ff9900",
  Hypoxia: "#a56cc1",
  LowTemp: "#4ab8a1"
};

export default function ScatterWithHistograms() {
  const svgRef = useRef();

  useEffect(() => {
    const width = 700;
    const height = 500;

    const plotSize = 350;
    const margin = { top: 70, right: 80, bottom: 50, left: 60 };

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // SCALES
    const x = d3.scaleLinear()
      .domain(d3.extent(mockData, d => d.Area)).nice()
      .range([margin.left, margin.left + plotSize]);

    const y = d3.scaleLinear()
      .domain(d3.extent(mockData, d => d.D)).nice()
      .range([margin.top + plotSize, margin.top]);

    // GRID
    svg.append("g")
      .attr("stroke", "#eee")
      .selectAll("line.v")
      .data(x.ticks(6))
      .join("line")
      .attr("x1", d => x(d))
      .attr("x2", d => x(d))
      .attr("y1", margin.top)
      .attr("y2", margin.top + plotSize);

    svg.append("g")
      .attr("stroke", "#eee")
      .selectAll("line.h")
      .data(y.ticks(6))
      .join("line")
      .attr("x1", margin.left)
      .attr("x2", margin.left + plotSize)
      .attr("y1", d => y(d))
      .attr("y2", d => y(d));

    // AXES
    svg.append("g")
      .attr("transform", `translate(0,${margin.top + plotSize})`)
      .call(d3.axisBottom(x).ticks(6));

    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(6));

    // SCATTER POINTS
    svg.selectAll("circle")
      .data(mockData)
      .enter()
      .append("circle")
      .attr("cx", d => x(d.Area))
      .attr("cy", d => y(d.D))
      .attr("r", 5)
      .attr("fill", d => colors[d.Condition])
      .attr("opacity", 0.8);

    // -------------- TOP HISTOGRAM (AREA) -----------------
    const topHeight = 35;
    const xHist = d3.scaleLinear().domain(x.domain()).range(x.range());

    Object.entries(colors).forEach(([condition, color]) => {
      const subset = mockData.filter(d => d.Condition === condition);
      const bins = d3.bin()
        .value(d => d.Area)
        .domain(x.domain())
        .thresholds(10)(subset);

      const yH = d3.scaleLinear()
        .domain([0, d3.max(bins, d => d.length)])
        .range([margin.top, margin.top - topHeight]);

      svg.selectAll(`rect.top-${condition}`)
        .data(bins)
        .enter()
        .append("rect")
        .attr("x", d => xHist(d.x0))
        .attr("y", d => yH(d.length))
        .attr("width", d => xHist(d.x1) - xHist(d.x0))
        .attr("height", d => margin.top - yH(d.length))
        .attr("fill", color)
        .attr("opacity", 0.45);
    });

    // -------------- RIGHT HISTOGRAM (D) -----------------
    const rightWidth = 35;
    const yHist = d3.scaleLinear().domain(y.domain()).range(y.range());

    Object.entries(colors).forEach(([condition, color]) => {
      const subset = mockData.filter(d => d.Condition === condition);
      const bins = d3.bin()
        .value(d => d.D)
        .domain(y.domain())
        .thresholds(10)(subset);

      const xH = d3.scaleLinear()
        .domain([0, d3.max(bins, d => d.length)])
        .range([margin.left + plotSize, margin.left + plotSize + rightWidth]);

      svg.selectAll(`rect.right-${condition}`)
        .data(bins)
        .enter()
        .append("rect")
        .attr("x", margin.left + plotSize)
        .attr("y", d => yHist(d.x1))
        .attr("width", d => xH(d.length) - (margin.left + plotSize))
        .attr("height", d => Math.max(1, yHist(d.x0) - yHist(d.x1)))
        .attr("fill", color)
        .attr("opacity", 0.45);
    });

    // LEGEND
    const legend = svg.append("g")
      .attr("transform", `translate(${margin.left + plotSize - 20}, ${margin.top - 50})`);

    Object.entries(colors).forEach(([label, color], i) => {
      const yOffset = i * 18;

      legend.append("circle")
        .attr("cx", 0)
        .attr("cy", yOffset)
        .attr("r", 6)
        .attr("fill", color);

      legend.append("text")
        .attr("x", 12)
        .attr("y", yOffset + 4)
        .attr("font-size", 12)
        .text(label);
    });

    // AXIS LABELS
    svg.append("text")
      .attr("x", margin.left + plotSize / 2)
      .attr("y", height - 10)
      .attr("text-anchor", "middle")
      .text("Area");

    svg.append("text")
      .attr("x", -height / 2)
      .attr("y", 18)
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .text("D");
  }, []);

  return (
    <div>
      <h2>Scatter + Overlaid Histograms (Mock Data)</h2>
      <svg ref={svgRef} width={700} height={500}></svg>
    </div>
  );
}
