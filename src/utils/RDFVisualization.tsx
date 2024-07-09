import { FC, useEffect, useRef } from 'react';
import { DataSet, Network } from 'vis-network/standalone/esm/vis-network'

import { Link, Node } from '../types/shapesAndOntologies.model';

interface IRDFVisualization {
  nodes: Node[];
  links: Link[];
}

const RDFVisualization: FC<IRDFVisualization> = ({ nodes, links }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      // Convert nodes and links to Vis.js format
      const visNodes = new DataSet(
        nodes.map(node => ({ id: node.id, label: node.label }))
      );

      const visEdges = new DataSet(
        links.map(link => ({ from: link.source, to: link.target }))
      );

      const data = {
        nodes: visNodes,
        edges: visEdges,
      };

      const options = {
        nodes: {
          shape: 'dot',
          size: 16,
          font: {
            size: 14,
            color: '#000000'
          },
          borderWidth: 2
        },
        edges: {
          width: 2
        },
        interaction: {
          navigationButtons: true,
          keyboard: true
        },
        physics: {
          stabilization: false,
          barnesHut: {
            gravitationalConstant: -20000,
            centralGravity: 0.3,
            springLength: 95,
            springConstant: 0.04,
            damping: 0.09
          }
        }
      };

      // Initialize the network
      const network = new Network(ref.current, data, options);

      // Clean up on unmount
      return () => {
        network.destroy();
      };
    }
  }, [nodes, links]);

  return <div ref={ref} style={{ width: '100%', height: '600px' }} />;
};

export default RDFVisualization;
