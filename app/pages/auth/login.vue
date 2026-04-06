<template>
    <div class="flex h-screen w-full items-center justify-center">
        <div class="flex flex-col gap-2">
            <input v-model="email" type="text" class="border border-gray-300 rounded-md p-2" placeholder="email">
            <input v-model="senha" type="text" class="border border-gray-300 rounded-md p-2" placeholder="senha">
            <button @click="handleLogin" class="bg-black text-white py-2">logar</button>
        </div>
    </div>
</template>

<script setup>
const { login } = useAuth()
const email = ref('pablo@gmail.com')
const senha = ref('12345678')

definePageMeta({ middleware: 'guest' })

const handleLogin = async () => {
    await login(email.value, senha.value)
}
</script>