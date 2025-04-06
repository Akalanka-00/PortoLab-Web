import React, { useEffect, useState } from 'react'
import "./api.scss"
import { useParams } from 'react-router-dom';
import apiDocData from '../../../../data/apiDoc.data';
import { CgCopy } from "react-icons/cg";

const ApiPage = () => {
    const { name } = useParams();
    const [api, setApi] = useState(apiDocData.find((api) => api.name === name) || apiDocData[0]);
    const [copied, setCopied] = useState(false);

    const handleCopy = (endpoint) => {
        navigator.clipboard.writeText(`${process.env.REACT_APP_BASE_URL}${endpoint}`).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        }).catch((err) => {
            alert('Failed to copy endpoint.');
        });
    };

    const renderPathParameters = (parameters) => {
        if (parameters?.path?.length > 0) {
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

    useEffect(() => {
        const matchedApi = apiDocData.find((api) => api.name === name);
        if (matchedApi) {
            setApi(matchedApi);
        }
    }, [name]);

    return (
        <div className='api-container'>
            <div className="api-header">
                <div className="api-title">
                    <div className={`api-sized-box ${api.method.toLowerCase()}-sized-box`}></div>
                    <h1>{api.title}</h1>
                    <div className={`api-sized-box-free-size ${api.method.toLowerCase()}-sized-box`}>{api.method}</div>

                </div>
                <pre>
                    <code>{api.endpoint}</code>
                    <div className="api-copy-endpoint">
                        <CgCopy
                            className="api-copy-endpoint-icon"
                            onClick={() => handleCopy(api.endpoint)} // Trigger copy function
                        />
                    </div>
                </pre>
                <p>{api.description}</p>
            </div>

            <div className="api-content">
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

                {/* API Response */}
                {api.response && (
                    <div className="api-section">
                        <div className="api-section-title">Example Response</div>
                        <div className="api-response-status">
                            <strong>Status Code:</strong> {api.response.status}
                        </div>
                        <pre className="api-code-block">
                            {JSON.stringify(api.response.body, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ApiPage