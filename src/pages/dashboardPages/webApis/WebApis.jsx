import React, { useEffect, useState } from 'react';
import './webapis.scss';
import TokenModal from '../../../components/tokenModal/TokenModal';
import { TokenAPI } from '../../../api/token/token.api'; // Import your token API service
import { TbCopy, TbCopyCheckFilled } from 'react-icons/tb';
import { SlOptionsVertical } from 'react-icons/sl';
import Swal from 'sweetalert2';

const WebApisPage = () => {
  const [show, setShow] = useState(false);
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(-1);
  const [menuOptionIndex, setMenuOptionIndex] = useState(-1);

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

  const deleteToken = async (token) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {

        const api = new TokenAPI();
        const result = await api.deleteToken(token.id);
        if (result) {
          console.log("Token deleted:", result);
          setTokens(tokens.filter(t => t.id !== token.id)); // Update state to remove deleted token
          Swal.fire('Deleted!', 'Token has been deleted.', 'success');
        }
      }
    })

  }

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.webapi-options')) {
        setMenuOptionIndex(-1);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
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
                    <th>Portfolio URL</th>
                    <th>Token</th>
                    <th>Status</th>
                    <th>Created Date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {tokens.map((token, index) => (
                    <tr className='table-row' key={index}>
                      <td>{token.origin}</td>

                      <td className='token-cell'>
                        <div className="token">
                          *************************</div>
                        <div className="copy-icon" onClick={() => handleCopy(token.token, index)}>
                          {copied == index ? <TbCopyCheckFilled /> : <TbCopy />}
                        </div>
                      </td>
                      <td className={token.status === 'active' ? 'status-active' : 'status-expired'}>
                        {token.status}
                      </td>
                      <td>{new Date(token.createdDate).toLocaleDateString()}</td>
                      <td className='webapi-options'>
                        <div className="webapi-options-wrapper">
                        <SlOptionsVertical onClick={(e) => { e.stopPropagation(); setMenuOptionIndex(index) }} />
                        {menuOptionIndex === index && (
                          <div className="webapi-options-dropdown">
                            <div className="webapi-option" onClick={() => deleteToken(token)}>Delete</div>

                          </div>
                        )}
                        </div>
                      </td>
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
