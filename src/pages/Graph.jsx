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
  const [selectedNode, setSelectedNode] = useState(null);

  // Initialize with sample nodes based on transaction hash
  useEffect(() => {
    if (txHash) {
      // For now, create sample nodes. Later this will be replaced with actual blockchain data
      const txId = 'tx-' + txHash.substring(0, 8);
      const fromId = 'from-addr';
      const toId = 'to-addr';
      const contractId = 'contract-1';

      const sampleNodes = [
        {
          id: txId,
          position: { x: 400, y: 50 },
          data: {
            label: `Transaction\n${txHash.substring(0, 16)}...`,
            type: 'transaction',
            details: {
              hash: txHash,
              status: 'Success',
              timestamp: new Date().toLocaleString(),
              gasUsed: '0.00234 SUI'
            }
          },
          style: {
            background: 'linear-gradient(135deg, #3DB3FC 0%, #5C80FA 50%, #936BF9 100%)',
            color: '#ffffff',
            borderRadius: '20px',
            padding: '20px 28px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 12px 40px rgba(61, 179, 252, 0.4), 0 0 20px rgba(93, 128, 250, 0.2)',
            fontWeight: '700',
            fontSize: '14px',
            minWidth: '180px',
            textAlign: 'center'
          }
        },
        {
          id: fromId,
          position: { x: 100, y: 250 },
          data: {
            label: 'Sender\n0x1234...5678',
            type: 'address',
            details: {
              address: '0x1234567890abcdef',
              balance: '1,234.56 SUI',
              type: 'Wallet'
            }
          },
          style: {
            background: 'rgba(255, 255, 255, 0.08)',
            color: '#ffffff',
            borderRadius: '20px',
            padding: '20px 28px',
            border: '2px solid #4da2ff',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 8px 32px rgba(77, 162, 255, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            fontWeight: '600',
            fontSize: '13px',
            minWidth: '160px',
            textAlign: 'center'
          }
        },
        {
          id: toId,
          position: { x: 700, y: 250 },
          data: {
            label: 'Receiver\n0xabcd...efgh',
            type: 'address',
            details: {
              address: '0xabcdef1234567890',
              balance: '567.89 SUI',
              type: 'Wallet'
            }
          },
          style: {
            background: 'rgba(255, 255, 255, 0.08)',
            color: '#ffffff',
            borderRadius: '20px',
            padding: '20px 28px',
            border: '2px solid #4da2ff',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 8px 32px rgba(77, 162, 255, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            fontWeight: '600',
            fontSize: '13px',
            minWidth: '160px',
            textAlign: 'center'
          }
        },
        {
          id: contractId,
          position: { x: 400, y: 450 },
          data: {
            label: 'Smart Contract\nDeFi Protocol',
            type: 'contract',
            details: {
              contract: '0xcontract123',
              name: 'DeFi Protocol',
              calls: '1,234'
            }
          },
          style: {
            background: 'rgba(147, 107, 249, 0.15)',
            color: '#ffffff',
            borderRadius: '20px',
            padding: '20px 28px',
            border: '2px solid #936BF9',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 8px 32px rgba(147, 107, 249, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            fontWeight: '600',
            fontSize: '13px',
            minWidth: '160px',
            textAlign: 'center'
          }
        },
      ];

      const sampleEdges = [
        {
          id: 'e1',
          source: fromId,
          target: txId,
          animated: true,
          label: '100 SUI',
          style: { stroke: '#4da2ff', strokeWidth: 3 },
          labelStyle: {
            fill: '#4da2ff',
            fontWeight: 600,
            fontSize: 12,
            background: 'rgba(1, 24, 41, 0.9)',
            padding: '4px 8px',
            borderRadius: '8px'
          },
          labelBgStyle: {
            fill: 'rgba(77, 162, 255, 0.1)',
            fillOpacity: 0.9
          }
        },
        {
          id: 'e2',
          source: txId,
          target: toId,
          animated: true,
          label: '99.5 SUI',
          style: { stroke: '#936BF9', strokeWidth: 3 },
          labelStyle: {
            fill: '#936BF9',
            fontWeight: 600,
            fontSize: 12
          },
          labelBgStyle: {
            fill: 'rgba(147, 107, 249, 0.1)',
            fillOpacity: 0.9
          }
        },
        {
          id: 'e3',
          source: txId,
          target: contractId,
          animated: true,
          label: 'Contract Call',
          style: { stroke: '#5C80FA', strokeWidth: 2, strokeDasharray: '5,5' },
          labelStyle: {
            fill: '#5C80FA',
            fontWeight: 600,
            fontSize: 11
          },
          labelBgStyle: {
            fill: 'rgba(92, 128, 250, 0.1)',
            fillOpacity: 0.9
          }
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

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
  }, []);

  return (
    <div className="graph-container">
      {/* Background decorative elements matching home page */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-sui-blue/15 via-sui-blue-dark/8 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-0 w-[700px] h-[700px] bg-gradient-to-bl from-[#936BF9]/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#3DB3FC]/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Modern Header */}
      <div className="graph-header">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gradient-to-r from-[#3DB3FC] via-[#5C80FA] to-[#936BF9] text-white rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all text-sm"
          >
            ← Home
          </button>
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
            <span className="text-white/50 text-sm">TX:</span>
            <span className="text-sui-blue font-mono text-sm font-semibold">{txHash?.substring(0, 8)}...{txHash?.substring(txHash.length - 6)}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="stats-badge">
            <span className="text-white/50 text-xs">Status:</span>
            <span className="text-green-400 text-xs font-semibold ml-1">✓ Success</span>
          </div>
          <div className="stats-badge hidden lg:flex">
            <span className="text-white/50 text-xs">Gas:</span>
            <span className="text-white text-xs font-semibold ml-1">0.00234 SUI</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon" style={{background: 'linear-gradient(135deg, #3DB3FC, #5C80FA)'}}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-label">Amount</div>
            <div className="stat-value">100 SUI</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{background: 'linear-gradient(135deg, #936BF9, #5C80FA)'}}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-label">Nodes</div>
            <div className="stat-value">{nodes.length}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{background: 'linear-gradient(135deg, #4da2ff, #3DB3FC)'}}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-label">Connections</div>
            <div className="stat-value">{edges.length}</div>
          </div>
        </div>
      </div>

      {/* Graph Area */}
      <div className="react-flow-wrapper">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          fitView
          className="react-flow-dark"
        >
          <Background color="rgba(77, 162, 255, 0.05)" gap={20} size={1} />
          <Controls />
          <MiniMap
            nodeColor={(node) => {
              if (node.id.startsWith('tx-')) return '#5C80FA';
              if (node.id.startsWith('contract')) return '#936BF9';
              return '#4da2ff';
            }}
            maskColor="rgba(1, 24, 41, 0.85)"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          />
        </ReactFlow>

        {/* Node Details Panel */}
        {selectedNode && (
          <div className="node-details-panel">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-white font-bold text-lg">Node Details</h3>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-white/50 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div className="detail-item">
                <span className="detail-label">Type:</span>
                <span className="detail-value capitalize">{selectedNode.data.type}</span>
              </div>

              {selectedNode.data.details && Object.entries(selectedNode.data.details).map(([key, value]) => (
                <div key={key} className="detail-item">
                  <span className="detail-label">{key}:</span>
                  <span className="detail-value">{value}</span>
                </div>
              ))}
            </div>

            <button
              className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-[#3DB3FC] to-[#5C80FA] text-white rounded-lg font-semibold text-sm hover:shadow-lg transition-all"
            >
              View on Explorer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

