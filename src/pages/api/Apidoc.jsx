import React, { useState } from 'react';
import HomeNavbar from '../../components/homeNavbar/HomeNavbar';
import Accordion from 'react-bootstrap/Accordion';
import './apidoc.scss';
import { TbCopy } from 'react-icons/tb';
import apiDocData from '../../data/apiDoc.data';
import Footer from '../../components/footer/Footer';

const ApidocPage = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (endpoint) => {
    navigator.clipboard.writeText(`${process.env.REACT_APP_BASE_URL}${endpoint}`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    }).catch((err) => {
      alert('Failed to copy endpoint.');
    });
  };

  return (
    <div className="home-container api-container">
      <div className="home-container-header">
        <HomeNavbar />
        {/* API Token Creation Instructions */}
        <div className="api-token-container mt-4">
          <div className="api-token-header">
            <h3>How to Create API Token</h3>
          </div>
          <div className="api-token-steps">
            <ol>
              <li>Login to PortoLab.</li>
              <li>Navigate to Web APIs.</li>
              <li>Click "Create Token".</li>
              <li>Enter the URL of your portfolio.</li>
              <li>
                If your portfolio hasn't been deployed yet, use the URL of the locally running instance.
              </li>
            </ol>
          </div>
        </div>


        <div className="api-token-container mt-4">
          <div className="api-token-header">
            <h3>How to Call API</h3>
          </div>
          <div className="api-token-steps">
            <ol>
              <li>Refere the API documentation</li>
              <li>Copy the API endpoint <span>Base URL : {process.env.REACT_APP_BASE_URL}</span></li>
              <li>Use the API token as the Authorization header</li>
              <li>Prepare the request body if required</li>
              <li>Prepare the path parameters if required</li>
              <li>Prepare the query parameters if required</li>
              <li>Send the request to the API endpoint</li>
            </ol>
          </div>
        </div>

        <div className="api-doc-content mt-4">
          <h3 className='api-doc-content-title'>How to Create the API Token</h3>
          <Accordion defaultActiveKey="0">
            {apiDocData.map((api, index) => {
              const methodClass = api.method.toLowerCase();

              // Function to display path parameters if they exist
              const renderPathParameters = (parameters) => {
                if (parameters && parameters.path && parameters.path.length > 0) {
                  return (
                    <div className="api-section">
                      <div className="api-section-title">Path Parameters</div>
                      <ul className="api-parameter-list">
                        {parameters.path.map((param, idx) => (
                          <li key={idx}>
                            <strong>{param.name}</strong> ({param.type}): {param.description} <br />
                            <em>Example: {param.example}</em>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                }
                return null;
              };

              return (
                <Accordion.Item eventKey={`${index}`} key={index} className="api-doc-item">
                  <Accordion.Header>{api.title}</Accordion.Header>
                  <Accordion.Body>
                    {/* API Request Details */}
                    <div className={`api-request ${methodClass}`}>
                      <div className="request-details">
                        <div className="api-request-method">{api.method}</div>
                        <div className="api-request-endpoint">
                          {api.endpoint}
                          {api.parameters?.path && (
                            <span className="api-endpoint-params">
                              {api.parameters.path.map((param, idx) => (
                                <span key={idx} className="api-endpoint-param">
                                  <strong>{param.name}</strong>
                                </span>
                              ))}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="api-copy-endpoint">
                        <TbCopy
                          className="api-copy-endpoint-icon"
                          onClick={() => handleCopy(api.endpoint)} // Trigger copy function
                        />
                      </div>
                    </div>

                    {/* API Description */}
                    <div className="api-description">{api.description}</div>

                    {/* Render Path Parameters */}
                    {renderPathParameters(api.parameters)}

                    {/* API Headers */}
                    {api.headers && (
                      <div className="api-section">
                        <div className="api-section-title">Headers</div>
                        <pre className="api-code-block">
                          {JSON.stringify(api.headers, null, 2)}
                        </pre>
                      </div>
                    )}

                    {/* API Request Body */}
                    {api.requestBody && (
                      <div className="api-section">
                        <div className="api-section-title">Request Body</div>
                        <pre className="api-code-block">
                          {JSON.stringify(api.requestBody.body, null, 2)}
                        </pre>
                      </div>
                    )}

                    {/* API Response Example */}
                    {api.response && (
                      <div className="api-section">
                        <div className="api-section-title">Example Response</div>
                        <pre className="api-code-block">
                          {JSON.stringify(api.response.body, null, 2)}
                        </pre>
                      </div>
                    )}
                  </Accordion.Body>
                </Accordion.Item>
              );
            })}
          </Accordion>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ApidocPage;
