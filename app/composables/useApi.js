/**
    Pega o token CSRF do cookie
    @returns {string}
*/
function getCsrfCookie() {
    if (!import.meta.client) return null
    const match = document.cookie
        .split('; ')
        .find(row => row.startsWith('XSRF-TOKEN='))
    return match ? decodeURIComponent(match.split('=')[1]) : null
}

/*
    Garante que o token CSRF está presente
    @returns {void}
*/
export async function ensureCsrf() {
const apiBase = useRuntimeConfig().public.apiBase
    await $fetch(`${apiBase}/sanctum/csrf-cookie`, {
        method: 'GET',
        credentials: 'include'
    })
}

/*
    Cria um fetch customizado para a API utilizando o CSRF Token
    @returns {function}
*/
export function useApi() {
    const apiBase = useRuntimeConfig().public.apiBase
    return $fetch.create({
        baseURL: apiBase,
        credentials: 'include',
        async onRequest({ options }) {
            const method = String(options.method).toUpperCase()

            if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {

                if (!getCsrfCookie()) {
                    await $fetch(`${apiBase}/sanctum/csrf-cookie`, {
                        credentials: 'include'
                    })
                }
                
                const token = getCsrfCookie()

                if (token) {
                    options.headers = new Headers(options.headers || {})
                    options.headers.set('X-XSRF-TOKEN', token)
                    options.headers.set('Accept', 'application/json')
                }
            }
        }
    })
}
