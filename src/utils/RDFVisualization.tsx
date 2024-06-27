import * as d3 from 'd3';
import { FC, useEffect, useRef } from 'react';

import { Node, Link } from '../types/shapesAndOntologies.model';

interface IRDFVisualization {
  nodes: Node[];
  links: Link[];
}

const RDFVisualization: FC<IRDFVisualization> = ({ nodes, links }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      // Specify the dimensions of the chart.
      const width = 928;
      const height = 600;

      // Specify the color scale.
      const color = d3.scaleOrdinal(d3.schemeCategory10);

      // The force simulation mutates links and nodes, so create a copy
      // so that re-evaluating this cell produces the same result.
      const linksA = links.map(d => ({ ...d }));
      const nodesA = nodes.map(d => ({ ...d }));

      // Create a simulation with several forces.
      const simulation = d3.forceSimulation(nodesA)
        .force('link', d3.forceLink(linksA).id(d => d.id))
        .force('charge', d3.forceManyBody())
        .force('center', d3.forceCenter(width / 2, height / 2))
        .on('tick', ticked);

      // Create the SVG container.
      const svg = d3.create('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [0, 0, width, height])
        .attr('style', 'max-width: 100%; height: auto;');

      // Add a line for each link, and a circle for each node.
      const link = svg.append('g')
        .attr('stroke', '#999')
        .attr('stroke-opacity', 0.6)
        .selectAll('line')
        .data(linksA)
        .join('line')
        .attr('stroke-width', d => Math.sqrt(d.value));

      const node = svg.append('g')
        .attr('stroke', '#fff')
        .attr('stroke-width', 1.5)
        .selectAll('circle')
        .data(nodesA)
        .join('circle')
        .attr('r', 5)
        .attr('fill', d => color(d.group));

      node.append('title')
        .text(d => d.id);

      // Add labels
      const labels = svg.append('g')
        .selectAll('text')
        .data(nodesA)
        .enter()
        .append('text')
        .attr('dy', -3)
        .attr('dx', 6)
        .text(d => d.id)
        .attr('font-size', '10px')
        .attr('fill', '#333');

      // Add a drag behavior.
      node.call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

      // Set the position attributes of links and nodes each time the simulation ticks.
      function ticked() {
        link
          .attr('x1', d => d.source.x)
          .attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x)
          .attr('y2', d => d.target.y);

        node
          .attr('cx', d => d.x)
          .attr('cy', d => d.y);

        labels
          .attr('x', d => d.x)
          .attr('y', d => d.y);
      }

      // Reheat the simulation when drag starts, and fix the subject position.
      function dragstarted(event) {
        if (!event.active) {
          simulation.alphaTarget(0.3).restart();
        }
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      // Update the subject (dragged node) position during drag.
      function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }

      // Restore the target alpha so the simulation cools after dragging ends.
      // Unfix the subject position now that it’s no longer being dragged.
      function dragended(event) {
        if (!event.active) {
          simulation.alphaTarget(0);
        }
        event.subject.fx = null;
        event.subject.fy = null;
      }

      ref.current.appendChild(svg.node());
    }
  }, [nodes, links]); // Add nodes and links as dependencies

  return <div ref={ref} />;
};

export default RDFVisualization;
