export function useAuth() {
    const api = useApi()
    const apiBase = useRuntimeConfig().public.apiBase
    const user = useState('auth.user', () => null)
    const isLoggedIn = computed(() => !!user.value)

    // busca dnv o token pq pode ter sido um de uma sessao anterior
    async function refreshCsrf() {
        await $fetch(`${apiBase}/sanctum/csrf-cookie`, {
            credentials: 'include',
        })
    }

    async function register(name, email, password, password_confirmation)
    {
        // await refreshCsrf()
        const response = await api('/api/register', {
            method: 'POST',
            body: {name, email, password, password_confirmation}
        })
        user.value = response.user
        await navigateTo('/onboarding')
    }

    async function login(email, password) {
        await refreshCsrf()
        const response = await api('/api/login', {
            method: 'POST',
            body: { email, password }
        })
        user.value = response.user
        await navigateTo('/app')
    }

    async function logout() {
        await refreshCsrf()
        await api('/api/logout', { method: 'POST' })
        user.value = null
        await navigateTo('/auth/login')
    }

    async function fetchUser() {
        try {
            const response = await api('/api/me')
            user.value = response.user
        } catch {
            user.value = null
        }
    }

    return { user, isLoggedIn, register, login, logout, fetchUser}
}