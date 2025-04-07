import React from 'react'
import './setup.scss'
import { useNavigate } from 'react-router-dom';

const SetupPage = () => {
    const navigate = useNavigate();

    const handleDetectOriginNavigation = () => {
        navigate('/documentation/general/detect-origin');
    };
    return (
        <div className='api-setup-container'>
            <div className='api-setup-content'>
                <h2>Step 1: Create an API Token</h2>
                <p>To authenticate API requests, you'll need to create an API token. Follow these steps:</p>
                <ol>
                    <li>Log in to your PMT account.</li>
                    <li>Navigate to the <strong>API Tokens</strong> section in your Web API page.</li>
                    <li>Configure the portfolio url, even it runs on the local computer.  (e.g., http://localhost:3000/).</li>
                    <li>Click <strong>Generate</strong> to create the token. Be sure to copy it at this point.</li>
                    <li>Store the token securely in your environment variables or a secure vault.</li>
                    <li>Use the token in API requests by including it in the <code>Authorization</code> header as follows:
                        <pre><code>Authorization: Bearer YOUR_API_TOKEN</code></pre>
                    </li>
                </ol>

                <div className="api-warning-box">
                <p><strong className='text-danger'>⚠️ Warning:</strong> While you can generate a token without providing a portfolio URL (i.e., with a <code>null</code> origin), this is highly discouraged and insecure.</p>
                <p>To learn how to properly identify and set your origin, please visit our&nbsp;
                    <span
                        className="detect-origin-link"
                        style={{ color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}
                        onClick={handleDetectOriginNavigation}
                    >
                        Detect Origin Guide
                    </span>.
                </p>
            </div>
                <p>If you need to revoke the token, return to the <strong>API Tokens</strong> section and click <strong>Revoke</strong> next to the token.</p>

                <h2>Step 2: Make API Calls</h2>
                <pre><code></code>{process.env.REACT_APP_BASE_URL}</pre>
                <p>Once you have your API token, you can start making requests to the PMT API. Follow these steps:</p>
                <ol>
                    <li>Ensure that your API token is securely stored and accessible (e.g., in environment variables).</li>
                    <li>Use the <code>Authorization</code> header in your HTTP request to authenticate it.</li>
                    <li>Set your server base URL in an environment variable (e.g., <code>{process.env.REACT_APP_BASE_URL}</code>) to keep your code environment-agnostic.</li>
                    <li>For example, to fetch data from the PMT API, you can use a fetch call in JavaScript like this:</li>
                </ol>

                <pre>
                    <code>
                        {`fetch(\'https://${process.env.REACT_APP_BASE_URL}/your-endpoint\', { {\n` +
                            '  method: \'GET\',\n' +
                            '  headers: { {\n' +
                            '    \'Authorization\': \'Bearer YOUR_API_TOKEN\',\n' +
                            '    \'Content-Type\': \'application/json\'\n' +
                            '  }}\n' +
                            '})\n' +
                            '.then(response => response.json())\n' +
                            '.then(data => console.log(data))\n' +
                            '.catch(error => console.error(\'Error:\', error));'}
                    </code>
                </pre>
                <p>Replace <code>YOUR_API_TOKEN</code> with the token you created in Step 1, and <code>/your-endpoint</code> with the desired API endpoint (e.g., <code>/portfolios</code>).</p>

                <p>Additionally, you can make other types of requests like <code>POST</code>, <code>PUT</code>, or <code>DELETE</code> by changing the <code>method</code> property in the fetch call.</p>
                <p>For more details on the available endpoints and their usage, refer to the API documentation.</p>

                <h3>Handling Response</h3>
                <p>Once you make an API request, you will receive a response. For instance, if you're fetching portfolio data, the response might look like this:</p>

                <pre>
                    <code>
                        {'{ \n' +
                            '  "data": [ \n' +
                            '    { "portfolio_id": 1, "title": "My Portfolio" } \n' +
                            '  ], \n' +
                            '  "status": "success" \n' +
                            '}'}
                    </code>
                </pre>
                <p>Make sure to handle the response appropriately, such as displaying data on the UI or logging it for debugging purposes.</p>

                <h3>Error Handling</h3>
                <p>If an error occurs (e.g., invalid token, incorrect endpoint), the response will include an error message. Make sure to handle errors gracefully in your application by checking for the <code>status</code> and providing feedback to the user.</p>

            </div>
        </div>
    )
}

export default SetupPage
