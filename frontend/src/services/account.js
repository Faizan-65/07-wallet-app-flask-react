import { fetchWithAuth } from "./api"

export const AddAccount = async (user_id, name, balance, account_type) => {
  try {
    const response = await fetchWithAuth(`accounts`, {
      method: "POST",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ user_id, name, balance, account_type }),
    })
    const data = await response.json()
    if (data.success) {
      return {
        success: data.success,
        message: data.message
      }
    }
    return {
      success: data.success,
      error: data.error,
    }
  }
  catch (error) {
    console.error("Account Creation:", error)
    return {
      success: false,
      error: "Network error - couldn't connect to server"
    }
  }
}

export const get_user_accounts = async (user_id) => {
  try {
    const response = await fetchWithAuth(`accounts?id=${user_id}`, {
      method: "GET",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    })
    const data = await response.json()
    if (data.success) {
      return {
        success: data.succss,
        message: data.message, 
        accounts: data.accounts
      }
    }
    return {
      success: data.success,
      error: data.error,
    }
  }
  catch (error) {
    console.error("Service Error:", error)
    return {
      success: false,
      error: "Service Error"
    }
  }
}

