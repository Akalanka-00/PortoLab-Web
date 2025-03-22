import React, { useEffect, useState } from 'react';
import './webapis.scss';
import TokenModal from '../../../components/tokenModal/TokenModal';
import { TokenAPI } from '../../../api/token/token.api'; // Import your token API service
import { TbCopy, TbCopyCheckFilled  } from 'react-icons/tb';

const WebApisPage = () => {
  const [show, setShow] = useState(false);
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(-1);

  const handleTokenModal = () => {
    setShow(true);
  };

  const handleCopy = (secret, idx) => {
    navigator.clipboard.writeText(secret).then(() => {
      setCopied(idx);
      setTimeout(() => setCopied(-1), 2000); // Reset after 2 seconds
    }).catch((err) => {
      alert('Failed to copy endpoint.');
    });
  };

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const tokenAPI = new TokenAPI();
        const tokensData = await tokenAPI.getTokens(); // Fetch tokens from API
        console.log(tokensData);
        setTokens(tokensData || []);
      } catch (error) {
        console.error('Error fetching tokens:', error);
        setError('Failed to load tokens.');
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, []);

  return (
    <div className="dashboard-content-container">
      <div className="dashboard-webapi-container">
        <div className="api-configuration-container mt-4">
          <div className="header">
            <div className="api-configuration-header-title">Web API Tokens</div>
            <div className="portolab-btn" onClick={handleTokenModal}>New Token</div>
          </div>

          {/* Token Table */}
          <div className="token-table-container">
            {loading ? (
              <div className="loading-message">Loading tokens...</div>
            ) : error ? (
              <div className="error-message">{error}</div>
            ) : tokens.length === 0 ? (
              <div className="empty-message">No tokens available</div>
            ) : (
              <table className="token-table">
                <thead>
                  <tr>
                    <th>Token</th>
                    <th>Origin</th>
                    <th>Status</th>
                    <th>Created Date</th>
                    <th>Expired Date</th>
                  </tr>
                </thead>
                <tbody>
                  {tokens.map((token, index) => (
                    <tr key={index}>
                                            <td>{token.origin}</td>

                      <td className='token-cell'>
                        <div className="token">
                        *************************</div>
                      <div className="copy-icon" onClick={() => handleCopy(token.token, index)}>
                      {copied==index ? <TbCopyCheckFilled /> : <TbCopy />}
                      </div>
                      </td>
                      <td className={token.status === 'active' ? 'status-active' : 'status-expired'}>
                        {token.status}
                      </td>
                      <td>{new Date(token.createdDate).toLocaleDateString()}</td>
                      <td>{new Date(token.expiredDate).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Token Modal */}
      <TokenModal show={show} setShow={setShow} />
    </div>
  );
};

export default WebApisPage;
