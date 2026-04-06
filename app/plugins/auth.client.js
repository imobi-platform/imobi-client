/* Função para recarregar o auth.user quando a página é recarregada */
export default defineNuxtPlugin(async () => {
    const { fetchUser } = useAuth()
    await fetchUser()
})