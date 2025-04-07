import React from 'react';
import '../setup/setup.scss';

const DetectOriginPage = () => {
    return (
        <div className='api-setup-container'>
            <div className='api-setup-content'>
                <h2>Find Your Portfolio URL</h2>
                <p>
                    Your portfolio URL is required when generating an API token to ensure secure and valid requests.
                    Here's how to identify your portfolio URL based on where and how it's running:
                </p>

                <h3>1. Running as a Local HTML File</h3>
                <p>
                    If you open the HTML file directly in your browser (e.g., double-clicked from your file explorer), the URL will look like:
                </p>
                <pre><code>file:///Users/you/Desktop/index.html</code></pre>
                <p><strong>Note:</strong> This will result in an origin of <code>null</code>, and most browsers will block API requests for security reasons. Use a local server instead.</p>

                <h3>2. Running on Localhost (Development)</h3>
                <p>
                    If you're running your app locally using a development server (e.g., React/Vite/Next.js), your URL will be something like:
                </p>
                <pre><code>http://localhost:3000</code></pre>
                <p>
                    This is the origin you should use when creating your API token for local development.
                </p>

                <h3>3. Deployed on a Hosting Platform</h3>
                <p>
                    If your portfolio is hosted (e.g., Vercel, Netlify, Firebase, custom domain), the URL will be your public domain, such as:
                </p>
                <pre><code>https://yourportfolio.vercel.app</code></pre>
                <pre><code>https://www.yourcustomdomain.com</code></pre>
                <p>
                    This is the origin you must register when generating your token for production use.
                </p>

                <h3>4. API Requests from Postman</h3>
                <p>
                    When using Postman or similar tools to test your API, the request has no browser origin.
                    Most servers will treat this as either:
                </p>
                <pre><code>null</code></pre>
                <p>
                    Or will skip the <code>Origin</code> header altogether. You may need to allow <code>Origin: null</code> in development for testing APIs via Postman.
                </p>

                <h3>5. Using a Custom Dev Server</h3>
                <p>
                    If you're serving your portfolio from a different port or server, make sure to match that exact URL:
                </p>
                <pre><code>http://127.0.0.1:5500</code></pre>
                <pre><code>http://localhost:8080</code></pre>

                <h3 >⚠️ About Using <code>null</code> Origins</h3>
                <p>
                    While it's technically possible to generate an API token without specifying an origin (i.e., allowing <code>null</code> origins),
                    <strong  className='text-danger'>this is highly discouraged</strong> due to security risks. API tokens with <code>null</code> origins may be vulnerable to misuse,
                    especially in browser environments where CORS protection is essential.
                </p>
                <p>
                    <strong  className='text-danger'>We highly recommend always providing a valid origin (your portfolio URL) when creating your API token.</strong> This ensures
                    that only requests coming from your portfolio are authorized.
                </p>

                <h3>How to Identify Your Origin in Code</h3>
                <p>You can quickly log the origin of your current window with the following JavaScript:</p>
                <pre>
                    <code>
                        {'console.log(window.location.origin);'}
                    </code>
                </pre>

                <h3>Summary</h3>
                <p>Here’s a quick table:</p>
                <pre>
{`| Environment           | Example URL                          | Origin                       |
|------------------------|--------------------------------------|------------------------------|
| Local HTML File        | file:///index.html                  | null                         |
| Localhost Dev Server   | http://localhost:3000               | http://localhost:3000        |
| Hosted Site            | https://yourdomain.com              | https://yourdomain.com       |
| Postman                | N/A                                 | null or no origin header     |
| Custom Local Server    | http://127.0.0.1:5500               | http://127.0.0.1:5500        |`}
                </pre>
                <p>
                    Use the appropriate origin when configuring your API token to ensure secure and accurate access to your API.
                </p>
            </div>
        </div>
    );
};

export default DetectOriginPage;
