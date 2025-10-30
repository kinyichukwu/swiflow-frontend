import { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Background, Controls, MiniMap } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './Graph.css';

export default function Graph() {
  const { txHash } = useParams();
  const navigate = useNavigate();
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  // Initialize with sample nodes based on transaction hash
  useEffect(() => {
    if (txHash) {
      // For now, create sample nodes. Later this will be replaced with actual blockchain data
      const txId = 'tx-' + txHash.substring(0, 8);
      const fromId = 'from-addr';
      const toId = 'to-addr';
      
      const sampleNodes = [
        {
          id: txId,
          position: { x: 250, y: 100 },
          data: { label: `Transaction\n${txHash.substring(0, 16)}...` },
          style: { background: '#00d4ff', color: '#0a0e27', borderRadius: '8px', padding: '10px' }
        },
        {
          id: fromId,
          position: { x: 100, y: 250 },
          data: { label: 'From Address\n0x1234...5678' },
          style: { background: '#1a1f3a', color: '#ffffff', borderRadius: '8px', padding: '10px', border: '2px solid #00d4ff' }
        },
        {
          id: toId,
          position: { x: 400, y: 250 },
          data: { label: 'To Address\n0xabcd...efgh' },
          style: { background: '#1a1f3a', color: '#ffffff', borderRadius: '8px', padding: '10px', border: '2px solid #00d4ff' }
        },
      ];

      const sampleEdges = [
        {
          id: 'e1',
          source: fromId,
          target: txId,
          animated: true,
          style: { stroke: '#00d4ff', strokeWidth: 2 }
        },
        {
          id: 'e2',
          source: txId,
          target: toId,
          animated: true,
          style: { stroke: '#00d4ff', strokeWidth: 2 }
        },
      ];

      setNodes(sampleNodes);
      setEdges(sampleEdges);
    }
  }, [txHash]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );

  const onConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    []
  );

  return (
    <div className="graph-container">
      <div className="graph-header">
        <button onClick={() => navigate('/')} className="back-button">
          ← Back to Home
        </button>
        <div className="tx-hash-display">
          Transaction: {txHash?.substring(0, 20)}...
        </div>
      </div>
      <div className="react-flow-wrapper">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          className="react-flow-dark"
        >
          <Background color="#1a1f3a" gap={16} />
          <Controls />
          <MiniMap
            nodeColor={(node) => {
              if (node.id.startsWith('tx-')) return '#00d4ff';
              return '#1a1f3a';
            }}
            maskColor="rgba(0, 0, 0, 0.8)"
          />
        </ReactFlow>
      </div>
    </div>
  );
}

