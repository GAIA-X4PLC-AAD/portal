import React, { FC, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataSet, Network } from 'vis-network/standalone/esm/vis-network';

import { Link, Node } from '../types/ontologies.model';

interface IRDFVisualization {
  nodes: Node[];
  links: Link[];
  visible: boolean;
}

// eslint-disable-next-line no-unused-vars
enum detailRoutes {
  // eslint-disable-next-line no-unused-vars
  shapesAndOntologies = '/shapesAndOntologies/details/',
}

const RDFVisualization: FC<IRDFVisualization> = ({ nodes, links, visible }) => {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (visible && ref.current) {
      // Convert nodes and links to Vis.js format
      const visNodes = new DataSet(
        nodes.map(node => {
          let color;
          if (node.type === 'http://www.w3.org/2002/07/owl#ObjectProperty') {
            color = '#ff0000'; // rot
          } else if (node.type === 'http://www.w3.org/2000/01/rdf-schema#Class' || node.type === 'http://www.w3.org/2002/07/owl#Class') {
            color = '#0000ff'; // blau
          }
          return { id: node.id, label: node.label, title: node.id, color };
        })
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
            size: 20,
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
          stabilization: {
            enabled: true,
            iterations: 1000, // Anzahl der Iterationen erhöhen
            updateInterval: 25,
            onlyDynamicEdges: false,
            fit: true
          },
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

      network.on('click', function (params) {
        if (params.nodes.length > 0) {
          const nodeId = params.nodes[0];
          // Finde das letzte Auftreten von '/' oder '#'
          const lastSlashIndex = nodeId.lastIndexOf('/');
          const lastHashIndex = nodeId.lastIndexOf('#');
          const lastIndex = Math.max(lastSlashIndex, lastHashIndex);

          // Schneide die URL bis zum letzten '/' oder '#', einschließlich des Zeichens
          const baseUrl = nodeId.substring(0, lastIndex + 1);
          const encodedUri = encodeURIComponent(baseUrl);
          navigate(`${DetailRoutes.shapesAndOntologies}${encodedUri}`);
        }
      });

      // Clean up on unmount
      return () => {
        network.destroy();
      };
    }
  }, [nodes, links, navigate, visible]);

  if (visible) {
    return <div ref={ref} style={{ width: '100%', height: '600px' }}/>;
  }
  return <></>
};

export default RDFVisualization;
