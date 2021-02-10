import {useState, useEffect, useReducer} from 'react'
import Router from 'next/router'
import config from '../config'
import axios from 'axios'

const dataFetchReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
        requestConfig: action.configs
      }
    case 'FETCH_ERROR': 
      return {
        ...state,
        isLoading: false,
        isError: action.error
      }
    default: 
      throw new Error()
  }
}

export const useApi = (initialRequestConfig, initialData = {}) => {
  // console.log(initialRequestConfig, 'hhhhh')
  const initialRequest = initialRequestConfig || {}
  const [{method, path, data, params}, setRequest] = useState(initialRequest)
  const isValid = path
  const url = `${config.mainApiEndpoint}${path}`
  const headers = {
    'Content-Type': 'application/json'
  }
  const requestConfig = {
    url,
    method,
    headers,
    data: {[params]: data}
  }
  const configs = {params, method, path, data}
  // console.log(isValid, 'validsad')

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: null,
    requestConfig: configs,
    ...initialData
  })

  useEffect(() => {
    let didCancel = false
    console.log('kkkkk')
    const fetchData = async () => {
      dispatch({type: 'FETCH_INIT'})
      // console.log('masuksini')
      try {
        console.log(requestConfig, 'sini')
        const result = await axios.request(requestConfig)

        console.log('reponse from userApi')
        if (!didCancel) {
          dispatch({
            type: 'FETCH_SUCCESS',
            payload: result.data,
            configs,
          })
        }
      } catch (e) {
        throw e
      } 
    }
    isValid && fetchData()
    return () => {
      didCancel = true
    }
  }, [path, method, params, data])
  // console.log(state, 'kkkk')
  return [state, setRequest]
}

export const serverApiRequest = async requestConfigInit => {
  const {method, path, data, params} = requestConfigInit
  const headers = {
    'Content-Type': 'application/json'
  }

  let result = []
  const url = `${config.mainApiEndpoint}${path}`
  const requestConfig = {
    url,
    method,
    headers,
    data: {[params]: data}
  }

  const response = await axios.request(requestConfig)
  result = {data: response.data}
  // console.log(result)
  return result
}