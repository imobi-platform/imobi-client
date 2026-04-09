<template>
    <div class="flex h-screen w-full items-center justify-center">
        <div class="flex flex-col gap-2">
            <input v-model="nome" type="text" class="border border-gray-300 rounded-md p-2" placeholder="nome">
            <input v-model="email" type="text" class="border border-gray-300 rounded-md p-2" placeholder="email">
            <input v-model="senha" type="text" class="border border-gray-300 rounded-md p-2" placeholder="senha">
            <input v-model="confirmarSenha" type="text" class="border border-gray-300 rounded-md p-2" placeholder="confirmar senha">
            <button @click="handleRegister" class="bg-black text-white py-2">Registrar</button>
        </div>
    </div>
</template>

<script setup>
const { register } = useAuth()
const nome = ref('Pablo Alves da Silva')
const email = ref('pabloalveszimba@gmail.com')
const senha = ref('Pads529108$')
const confirmarSenha = ref('Pads52910@')

const handleRegister = async () => {
    try {
        await register(nome.value, email.value, senha.value, confirmarSenha.value)
    } catch (error) {
        console.error(error)
    }
}

</script>