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
          style: {
            background: 'linear-gradient(135deg, #3DB3FC 0%, #5C80FA 50%, #936BF9 100%)',
            color: '#ffffff',
            borderRadius: '16px',
            padding: '16px 20px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(61, 179, 252, 0.3)',
            fontWeight: '600'
          }
        },
        {
          id: fromId,
          position: { x: 100, y: 250 },
          data: { label: 'From Address\n0x1234...5678' },
          style: {
            background: 'rgba(255, 255, 255, 0.05)',
            color: '#ffffff',
            borderRadius: '16px',
            padding: '16px 20px',
            border: '2px solid #4da2ff',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 16px rgba(77, 162, 255, 0.2)'
          }
        },
        {
          id: toId,
          position: { x: 400, y: 250 },
          data: { label: 'To Address\n0xabcd...efgh' },
          style: {
            background: 'rgba(255, 255, 255, 0.05)',
            color: '#ffffff',
            borderRadius: '16px',
            padding: '16px 20px',
            border: '2px solid #4da2ff',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 16px rgba(77, 162, 255, 0.2)'
          }
        },
      ];

      const sampleEdges = [
        {
          id: 'e1',
          source: fromId,
          target: txId,
          animated: true,
          style: { stroke: '#4da2ff', strokeWidth: 3 }
        },
        {
          id: 'e2',
          source: txId,
          target: toId,
          animated: true,
          style: { stroke: '#936BF9', strokeWidth: 3 }
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
      {/* Background decorative elements matching home page */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-sui-blue/15 via-sui-blue-dark/8 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-0 w-[700px] h-[700px] bg-gradient-to-bl from-[#936BF9]/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#3DB3FC]/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="graph-header">
        <button
          onClick={() => navigate('/')}
          className="px-8 py-4 bg-gradient-to-r from-[#3DB3FC] via-[#5C80FA] to-[#936BF9] text-white rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
        >
          ← Back to Home
        </button>
        <div className="tx-hash-display">
          <span className="text-white/50">Transaction:</span> <span className="text-sui-blue">{txHash?.substring(0, 20)}...</span>
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
          <Background color="rgba(77, 162, 255, 0.1)" gap={16} />
          <Controls />
          <MiniMap
            nodeColor={(node) => {
              if (node.id.startsWith('tx-')) return '#5C80FA';
              return '#4da2ff';
            }}
            maskColor="rgba(1, 24, 41, 0.8)"
          />
        </ReactFlow>
      </div>
    </div>
  );
}

