export function useOnboarding() {
    const api = useApi()
    const { user, fetchUser } = useAuth()


    async function salvarPapel(role) {
        await api(`/api/onboarding/escolher-papel`, {
            method: 'POST',
            body: { role },
        })
        await fetchUser()
        await navigateTo('/app')
    }

    async function salvarAnunciante(dados) {
        await api('/api/onboarding/anunciante', {
            method: 'POST',
            body: dados,
        })
        await fetchUser()
        await navigateTo('/app')
    }

    return {
        salvarAnunciante,
        salvarPapel,
    }
}