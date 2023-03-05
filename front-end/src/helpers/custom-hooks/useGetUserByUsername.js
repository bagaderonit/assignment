import { useState } from 'react'
import { OctokitServices } from '../../services/git-services'
import { API_RESPONSES, FETCH_REPO_MESSAGES } from '../general/constants'

const useGetUserByUsername = () => {
  const [loading, setLoading] = useState(false)
  const [userRepos, setUserRepos] = useState([])
  const [error, setError] = useState('')
  const [user, setUser] = useState({})

  async function loginUser(username) {
    setLoading(true)
    setError('')
    setUser({})
    setUserRepos([])
    try {
      const response = await OctokitServices.getUsersByUsername(username)
      if (response.status === API_RESPONSES.ok) {
        // NOTE : Making an explicite repo API call by fetching the user details as Octokit default repo API was showing CORS error and was persitant even after added extensions hence this was the alternate solution to perform task
        setUser({ name: response.data.name, avatarUrl: response.data.avatar_url })
        const resp = await fetch(response?.data?.repos_url)
        if (resp.status === API_RESPONSES.ok) {
          const parsedResponse = await resp.json()
          const sortedParsedReponse = parsedResponse.sort((a, b) => b?.watchers - a?.watchers)
          parsedResponse?.length === 0 ? setError(FETCH_REPO_MESSAGES.NO_REPOS_FOUND + (response.data.name ?? ' this User')) : setUserRepos(sortedParsedReponse)
        } else {
          setError(FETCH_REPO_MESSAGES.REPO_FETCH_ERROR)
        }
      } else {
        setError(FETCH_REPO_MESSAGES.GENRAL_FETCH_ERROR)
      }
    } catch (err) {
      setError(err.toString().includes('Not Found') ? FETCH_REPO_MESSAGES.USER_NOT_FOUND : FETCH_REPO_MESSAGES.GENRAL_FETCH_ERROR)
    } finally {
      setLoading(false)
    }
  }
  return [loading, error, user, userRepos, loginUser]
}

export default useGetUserByUsername