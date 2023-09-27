
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

const GITHUB_USER_TOKEN = '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';

const owner = 'nodejs';
const repo = 'node';

/**
 * Generates an HTML list of commits.
 *
 * @param {Array} commits - An array of commit objects.
 * @returns {string} - An HTML string representing the list of commits.
 */
function generateHTMLCommitsList(commits) {
    const lightBlue = '#E6F1F6';
    // Map the commit objects to HTML list items
    const commitListItems = commits.map(commit => `<li style="color:blue">${JSON.stringify(commit)}</li>`);
    return `<html><body><ul>${commitListItems.join('')}</ul></body></html>`;
}

// Define an endpoint to fetch commits from the GitHub repository
app.get('/commits', async (req, res) => {
  try {
    // Make a GET request to the GitHub API to retrieve commits
    const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/commits`, {
      headers: {
        Authorization: `token ${GITHUB_USER_TOKEN}`,
      },
    });

    // Extract commit data from the response
    const commits = response.data;
    const commit = commits.map(element => {
        return element.commit;
    });

    // Generate an HTML response and send it
    const htmlResponse = generateHTMLCommitsList(commit);
    res.send(htmlResponse);
  } catch (error) {
    // Handle errors and send a 500 Internal Server Error response
    res.status(500).json({ error: 'Error fetching commits from GitHub API' });
  }
});

// Define an endpoint to fetch commits by a specific author
app.get('/author', async (req, res) =>{
    try {
        // Make a GET request to the GitHub API to retrieve commits
        const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/commits`, {
          headers: {
            Authorization: `token ${GITHUB_USER_TOKEN}`,
          },
        });
    
        // Extract commit data from the response and filter by author's email
        const commits = response.data;
        const sha = commits.filter(element => {
            if(element.commit.committer.email === "noreply@github.com"){
                return element.sha;
            }
        });

        // Generate an HTML response and send it
        const htmlResponse = generateHTMLCommitsList(sha);
        res.send(htmlResponse);
      } catch (error) {
        // Handle errors and send a 500 Internal Server Error response
        res.status(500).json({ error: 'Error fetching commits from GitHub API' });
      }
})

// Start the Express.js server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
