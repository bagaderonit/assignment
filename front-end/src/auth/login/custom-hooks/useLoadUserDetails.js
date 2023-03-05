import { useState } from 'react'
import { API_RESPONSES } from '../../../helpers/general/constants'
import { fetchAPIResponse } from '../../../helpers/general/utils'

const useLoadUserDetails = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [userDetails, setUserDetails] = useState({})

    const loadeUserDetails = async () => {
        setLoading(true)
        setError('')
        const resp = await fetchAPIResponse('me')
        if (resp.status === API_RESPONSES.ok) {
            setUserDetails(resp?.data)
        } else {
            setError(resp?.data?.description)
        }
        setLoading(false)
    }
    return [loading, error, userDetails, loadeUserDetails]
}

export default useLoadUserDetails