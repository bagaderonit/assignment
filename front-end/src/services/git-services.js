import { Octokit } from "octokit"

const octokit = new Octokit({
    auth: process.env.REACT_APP_GITHUB_TOKEN,
});

const getUsersByUsername = async (username) => await octokit.rest.users.getByUsername({ username })

const OctokitServices = {
    getUsersByUsername
}
export { OctokitServices }