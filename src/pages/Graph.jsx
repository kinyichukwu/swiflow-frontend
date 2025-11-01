import { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Background, Controls, MiniMap } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './Graph.css';

const API_BASE_URL = 'https://suiflow-servers.fly.dev';

export default function Graph() {
  const { txHash } = useParams();
  const navigate = useNavigate();
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [transactionData, setTransactionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch transaction data from API
  useEffect(() => {
    if (txHash && txHash !== 'demo') {
      const fetchTransactionData = async () => {
        try {
          setLoading(true);
          setError(null);

          const response = await fetch(`${API_BASE_URL}/ai-digest`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ digest: txHash }),
          });

          if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
          }

          const data = await response.json();

          if (data.error) {
            throw new Error(data.error);
          }

          setTransactionData(data);
          setLoading(false);
        } catch (err) {
          console.error('Error fetching transaction:', err);
          setError(err.message);
          setLoading(false);
        }
      };

      fetchTransactionData();
    } else if (txHash === 'demo') {
      // Demo data
      setTransactionData({
        transactionDigest: 'DmH3PWELG2ts4fNVrYcGFTp524Twmvo2CrALVYzqvBaf',
        status: 'success',
        executedEpoch: '902',
        summary: '0x4aa0d92f...9072 transferred 0.2 SUI to 0xb6a150da...2511',
        explainer: '0x4aa0d92f...9072 sent 0.2 SUI to 0xb6a150da...2511',
        gasUsed: {
          computationCost: '1,000,000',
          storageCost: '1,976,000',
          storageRebate: '978,120',
          nonRefundableStorageFee: '9,880',
          totalGasUsed: '2,007,760'
        },
        participants: {
          sender: '0x4aa0d92faeda9ec7e24feb2778d65b6898824cc0b54f687e74940ed4b8a59072',
          recipients: ['0xb6a150da076e313901d39ed773c4f1eb6a2dbef7a14e535dfd5a494915762511']
        },
        balanceChanges: [
          {
            address: '0x4aa0d92faeda9ec7e24feb2778d65b6898824cc0b54f687e74940ed4b8a59072',
            amount: '-201,997,880',
            coinType: 'SUI'
          },
          {
            address: '0xb6a150da076e313901d39ed773c4f1eb6a2dbef7a14e535dfd5a494915762511',
            amount: '+200,000,000',
            coinType: 'SUI'
          }
        ],
        moveCall: {
          package: '0x2',
          module: 'coin',
          function: 'transfer',
          arguments: ['amount: 200,000,000', 'recipient: 0xb6a150da...2511']
        }
      });
      setLoading(false);
    }
  }, [txHash]);

  // Generate graph nodes and edges from transaction data
  useEffect(() => {
    if (!transactionData) return;

    const txId = 'tx-' + transactionData.transactionDigest.substring(0, 8);
    const sender = transactionData.participants?.sender;
    const recipients = transactionData.participants?.recipients || [];

    const newNodes = [];
    const newEdges = [];

    // Transaction node (center)
    newNodes.push({
      id: txId,
      position: { x: 400, y: 50 },
      data: {
        label: `Transaction\n${transactionData.transactionDigest.substring(0, 16)}...`,
        type: 'transaction',
        details: transactionData
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
    });

    // Sender node
    if (sender) {
      const senderId = 'sender-' + sender.substring(0, 8);
      const senderBalance = transactionData.balanceChanges?.find(bc => bc.address === sender);

      newNodes.push({
        id: senderId,
        position: { x: 100, y: 250 },
        data: {
          label: `Sender\n${sender.substring(0, 6)}...${sender.substring(sender.length - 4)}`,
          type: 'address',
          details: {
            address: sender,
            balanceChange: senderBalance?.amount || 'N/A',
            role: 'Sender'
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
      });

      // Edge from sender to transaction
      const sendAmount = senderBalance?.amount?.replace('-', '') || '0';
      newEdges.push({
        id: `e-sender-${txId}`,
        source: senderId,
        target: txId,
        animated: true,
        label: `${(parseFloat(sendAmount.replace(/,/g, '')) / 1000000000).toFixed(4)} SUI`,
        style: { stroke: '#4da2ff', strokeWidth: 3 },
        labelStyle: {
          fill: '#4da2ff',
          fontWeight: 600,
          fontSize: 12
        },
        labelBgStyle: {
          fill: 'rgba(77, 162, 255, 0.1)',
          fillOpacity: 0.9
        }
      });
    }

    // Recipient nodes
    recipients.forEach((recipient, index) => {
      const recipientId = 'recipient-' + recipient.substring(0, 8);
      const recipientBalance = transactionData.balanceChanges?.find(bc => bc.address === recipient);

      newNodes.push({
        id: recipientId,
        position: { x: 700, y: 150 + (index * 200) },
        data: {
          label: `Recipient\n${recipient.substring(0, 6)}...${recipient.substring(recipient.length - 4)}`,
          type: 'address',
          details: {
            address: recipient,
            balanceChange: recipientBalance?.amount || 'N/A',
            role: 'Recipient'
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
      });

      // Edge from transaction to recipient
      const receiveAmount = recipientBalance?.amount?.replace('+', '') || '0';
      newEdges.push({
        id: `e-${txId}-recipient-${index}`,
        source: txId,
        target: recipientId,
        animated: true,
        label: `${(parseFloat(receiveAmount.replace(/,/g, '')) / 1000000000).toFixed(4)} SUI`,
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
      });
    });

    // Add contract node if there's a moveCall
    if (transactionData.moveCall) {
      const contractId = 'contract-' + transactionData.moveCall.package;
      newNodes.push({
        id: contractId,
        position: { x: 400, y: 450 },
        data: {
          label: `Smart Contract\n${transactionData.moveCall.module}::${transactionData.moveCall.function}`,
          type: 'contract',
          details: {
            package: transactionData.moveCall.package,
            module: transactionData.moveCall.module,
            function: transactionData.moveCall.function,
            arguments: transactionData.moveCall.arguments
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
      });

      // Edge from transaction to contract
      newEdges.push({
        id: `e-${txId}-contract`,
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
      });
    }

    setNodes(newNodes);
    setEdges(newEdges);
  }, [transactionData]);

  // Helper function to calculate total amount
  const calculateTotalAmount = () => {
    if (!transactionData?.balanceChanges) return '0';
    const total = transactionData.balanceChanges
      .filter(bc => bc.amount.startsWith('+'))
      .reduce((sum, bc) => {
        const amount = parseFloat(bc.amount.replace(/[+,]/g, ''));
        return sum + amount;
      }, 0);
    return (total / 1000000000).toFixed(4);
  };

  // Legacy sample data (removed as we now use API data)
  useEffect(() => {
    if (txHash && !transactionData && !loading) {
      // Fallback to sample nodes if no data
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
  }, [txHash, transactionData, loading]);

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

  const onNodeClick = useCallback((_event, node) => {
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
          {loading ? (
            <div className="stats-badge">
              <span className="text-white/50 text-xs">Loading...</span>
            </div>
          ) : error ? (
            <div className="stats-badge">
              <span className="text-red-400 text-xs font-semibold">⚠ Error</span>
            </div>
          ) : transactionData && (
            <>
              <div className="stats-badge">
                <span className="text-white/50 text-xs">Status:</span>
                <span className={`text-xs font-semibold ml-1 ${transactionData.status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                  {transactionData.status === 'success' ? '✓ Success' : '✗ Failed'}
                </span>
              </div>
              <div className="stats-badge hidden lg:flex">
                <span className="text-white/50 text-xs">Gas:</span>
                <span className="text-white text-xs font-semibold ml-1">
                  {transactionData.gasUsed ? (parseFloat(transactionData.gasUsed.totalGasUsed.replace(/,/g, '')) / 1000000000).toFixed(6) : '0'} SUI
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-sui-blue mb-4"></div>
            <p className="text-white text-lg">Loading transaction data...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="flex items-center justify-center h-full">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-white text-2xl font-bold mb-2">Error Loading Transaction</h2>
            <p className="text-white/70 mb-4">{error}</p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-gradient-to-r from-[#3DB3FC] via-[#5C80FA] to-[#936BF9] text-white rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              Back to Home
            </button>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      {!loading && !error && transactionData && (
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-icon" style={{background: 'linear-gradient(135deg, #3DB3FC, #5C80FA)'}}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="stat-content">
              <div className="stat-label">Amount</div>
              <div className="stat-value">{calculateTotalAmount()} SUI</div>
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
      )}

      {/* Graph Area */}
      {!loading && !error && transactionData && (
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
              <h3 className="text-white font-bold text-lg capitalize">{selectedNode.data.type} Details</h3>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-white/50 hover:text-white transition-colors text-xl leading-none"
              >
                ✕
              </button>
            </div>

            {/* Transaction Node Details */}
            {selectedNode.data.type === 'transaction' && selectedNode.data.details && (
              <div className="space-y-4">
                {selectedNode.data.details.summary && (
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <div className="text-white/50 text-xs mb-1">Summary</div>
                    <div className="text-white text-sm">{selectedNode.data.details.summary}</div>
                  </div>
                )}

                {selectedNode.data.details.explainer && (
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <div className="text-white/50 text-xs mb-1">Explainer</div>
                    <div className="text-white text-sm">{selectedNode.data.details.explainer}</div>
                  </div>
                )}

                {selectedNode.data.details['ai-explainer'] && (
                  <div className="bg-gradient-to-r from-[#3DB3FC]/10 to-[#936BF9]/10 rounded-lg p-3 border border-sui-blue/30">
                    <div className="text-sui-blue text-xs mb-1 font-semibold">✨ AI Explanation</div>
                    <div className="text-white text-sm">{selectedNode.data.details['ai-explainer']}</div>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="detail-item">
                    <span className="detail-label">Status:</span>
                    <span className={`detail-value font-bold ${selectedNode.data.details.status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                      {selectedNode.data.details.status}
                    </span>
                  </div>

                  {selectedNode.data.details.executedEpoch && (
                    <div className="detail-item">
                      <span className="detail-label">Epoch:</span>
                      <span className="detail-value">{selectedNode.data.details.executedEpoch}</span>
                    </div>
                  )}

                  {selectedNode.data.details.gasUsed && (
                    <>
                      <div className="detail-item">
                        <span className="detail-label">Total Gas:</span>
                        <span className="detail-value">{selectedNode.data.details.gasUsed.totalGasUsed} MIST</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Computation:</span>
                        <span className="detail-value">{selectedNode.data.details.gasUsed.computationCost} MIST</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Storage Cost:</span>
                        <span className="detail-value">{selectedNode.data.details.gasUsed.storageCost} MIST</span>
                      </div>
                    </>
                  )}
                </div>

                {selectedNode.data.details.moveCall && (
                  <div className="bg-purple-500/10 rounded-lg p-3 border border-purple-500/30">
                    <div className="text-purple-400 text-xs mb-2 font-semibold">Smart Contract Call</div>
                    <div className="space-y-1">
                      <div className="text-white/50 text-xs">Function:</div>
                      <div className="text-white text-sm font-mono">
                        {selectedNode.data.details.moveCall.module}::{selectedNode.data.details.moveCall.function}
                      </div>
                      {selectedNode.data.details.moveCall.arguments && selectedNode.data.details.moveCall.arguments.length > 0 && (
                        <>
                          <div className="text-white/50 text-xs mt-2">Arguments:</div>
                          {selectedNode.data.details.moveCall.arguments.map((arg, idx) => (
                            <div key={idx} className="text-white text-xs font-mono">{arg}</div>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Address Node Details */}
            {selectedNode.data.type === 'address' && selectedNode.data.details && (
              <div className="space-y-3">
                <div className="detail-item">
                  <span className="detail-label">Role:</span>
                  <span className="detail-value font-semibold text-sui-blue">{selectedNode.data.details.role}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Address:</span>
                  <span className="detail-value font-mono text-xs break-all">{selectedNode.data.details.address}</span>
                </div>
                {selectedNode.data.details.balanceChange && (
                  <div className="detail-item">
                    <span className="detail-label">Balance Change:</span>
                    <span className={`detail-value font-bold ${selectedNode.data.details.balanceChange.startsWith('-') ? 'text-red-400' : 'text-green-400'}`}>
                      {selectedNode.data.details.balanceChange} MIST
                      <div className="text-white/50 text-xs mt-1">
                        ({(parseFloat(selectedNode.data.details.balanceChange.replace(/[+,-]/g, '').replace(/,/g, '')) / 1000000000).toFixed(6)} SUI)
                      </div>
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Contract Node Details */}
            {selectedNode.data.type === 'contract' && selectedNode.data.details && (
              <div className="space-y-3">
                <div className="detail-item">
                  <span className="detail-label">Package:</span>
                  <span className="detail-value font-mono text-xs">{selectedNode.data.details.package}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Module:</span>
                  <span className="detail-value font-semibold">{selectedNode.data.details.module}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Function:</span>
                  <span className="detail-value font-semibold text-sui-blue">{selectedNode.data.details.function}</span>
                </div>
                {selectedNode.data.details.arguments && selectedNode.data.details.arguments.length > 0 && (
                  <div>
                    <div className="text-white/50 text-xs mb-2">Arguments:</div>
                    <div className="bg-white/5 rounded-lg p-3 space-y-1">
                      {selectedNode.data.details.arguments.map((arg, idx) => (
                        <div key={idx} className="text-white text-xs font-mono">{arg}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={() => {
                const explorerUrl = selectedNode.data.type === 'transaction'
                  ? `https://suiscan.xyz/mainnet/tx/${transactionData?.transactionDigest}`
                  : selectedNode.data.type === 'address'
                  ? `https://suiscan.xyz/mainnet/account/${selectedNode.data.details.address}`
                  : `https://suiscan.xyz/mainnet/object/${selectedNode.data.details.package}`;
                window.open(explorerUrl, '_blank');
              }}
              className="mt-4 w-full px-4 py-3 bg-gradient-to-r from-[#3DB3FC] to-[#5C80FA] text-white rounded-xl font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all"
            >
              View on SuiScan Explorer →
            </button>
          </div>
        )}
        </div>
      )}
    </div>
  );
}

