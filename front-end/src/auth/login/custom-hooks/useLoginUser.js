import { useState } from 'react'
import { SIGN_IN_ENDPOINT, SIGN_UP_ENDPOINT } from '../../../helpers/API-endpoints'
import { fetchAPIResponse } from '../../../helpers/general/utils'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { API_RESPONSES } from '../../../helpers/general/constants'

const useLoginUser = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [, setCookie] = useCookies(['user-application'])

    const navigate = useNavigate()

    const loginUser = async (data, isSignup) => {
        setLoading(true)
        setError('')
        const resp = await fetchAPIResponse(isSignup ? SIGN_UP_ENDPOINT : SIGN_IN_ENDPOINT, data, null, 'POST')
        if (Object.values(API_RESPONSES).includes(resp.status)) {
            setCookie('token', resp.data.token)
            localStorage.setItem('token', resp.data.token)
            navigate('/')
        } else {
            setError(resp?.data?.description)
        }
        setLoading(false)
    }

    return [loading, error, loginUser]
}

export default useLoginUser