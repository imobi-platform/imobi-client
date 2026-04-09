// auth.global.js
/**
 * MIDDLEWARE GLOBAL, RODA PARA TODAS AS ROTAS
 * Caso queira ter um middleware personalizado além desse, defina do mesmo jeito, e use nos arquivos com o definePageMeta({ middleware: 'nome-do-middleware' })

*/
export default defineNuxtRouteMiddleware((to) => {
    const { isLoggedIn, user } = useAuth()

    const isAppRoute        = to.path.startsWith('/app')
    const isAuthRoute       = to.path.startsWith('/auth')
    const isOnboardingRoute = to.path.startsWith('/onboarding')

    if (isAppRoute) {
        if (!isLoggedIn.value) return navigateTo('/auth/login')
        if (!user.value?.onboarding_completo) return navigateTo('/onboarding')
    }

    if (isAuthRoute && isLoggedIn.value) {
        return navigateTo('/app')
    }

    if (isOnboardingRoute) {
        if (!isLoggedIn.value) return navigateTo('/auth/login')
        if (user.value?.onboarding_completo) return navigateTo('/app') 
        
        // redireciona para a sub-rota correta do onboarding
        // if (to.path === '/onboarding' && !user.value?.onboarding_status) {
        //     if (user.value?.role === 'anunciante') return navigateTo('/onboarding/anunciante')
        //     if (user.value?.role === 'corretor') return navigateTo('/onboarding/corretor')
        //     if (user.value?.role === 'imobiliaria') return navigateTo('/onboarding/imobiliaria')
        // }
    }
})