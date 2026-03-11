<template>
  <div class="imoveis-page" :class="{ 'is-empty': itens.length === 0 }">
    <SectionLabel title="Meus Imóveis" :icon="DoorOpen" />
    <Table v-if="itens.length > 0" :fields="fields" :items="itens" striped>
      <template #cell(valor)="data">
        {{ formatarMoeda(data.row.valor) }}
      </template>
      <template #cell(actions)="data">
        <DropdownMenu :options="opcoesParaLinha(data.row)" />
      </template>
    </Table>
    <div v-else class="empty-data">
      <DotLottieVue style="height: 150px; width: 150px" autoplay loop
        src="https://lottie.host/94a16bad-6191-4250-b5d7-7b6baa441cfc/EljQHuRoQs.lottie" />
      <div class="empty-data-info">
        <p class="empty-data-text">Nenhum imóvel encontrado</p>
        <button class="empty-data-button">Novo Imóvel</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { DoorOpen, Pencil, Trash2 } from 'lucide-vue-next'
import SectionLabel from '@/components/SectionLabel.vue'
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'

definePageMeta({ layout: 'painel' })

function opcoesParaLinha(row) {
  return [
    { id: 'editar', icon: Pencil, label: 'Editar', to: `/app/imoveis/editar/${row.id}` },
    { id: 'excluir', icon: Trash2, label: 'Excluir', onClick: () => excluir(row) },
  ]
}

function excluir(row) {
  console.log('Excluir', row)
}

const fields = [
  { key: 'id', label: 'ID', align: 'center' },
  { key: 'imovel', label: 'Imóvel' },
  { key: 'imobiliaria', label: 'Imobiliária' },
  { key: 'cidade', label: 'Cidade' },
  { key: 'estado', label: 'Estado' },
  { key: 'bairro', label: 'Bairro' },
  { key: 'valor', label: 'Valor', align: 'left' },
  { key: 'actions', label: 'Ações', align: 'center' },
]

// const itens = ref([
//   { id: 1, imovel: 'Imóvel 1', imobiliaria: 'Imobiliária 1', cidade: 'Cidade 1', estado: 'Estado 1', bairro: 'Bairro 1', valor: 100000 },
//   { id: 2, imovel: 'Imóvel 2', imobiliaria: 'Imobiliária 2', cidade: 'Cidade 2', estado: 'Estado 2', bairro: 'Bairro 2', valor: 250000 },
// ])

const itens = ref([])

function formatarMoeda(valor) {
  if (valor == null) return '—'
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor)
}
</script>

<style scoped>
.imoveis-page {
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

/* Quando mostra empty state: tira margem do SectionLabel para o bloco vazio ocupar mais espaço e centralizar melhor */
.imoveis-page.is-empty :deep(.topo) {
  margin-bottom: 0;
}

/* Ocupa todo o espaço abaixo do SectionLabel, sem scroll; texto centralizado no meio da tela */
.empty-data {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

.empty-data-info {
  transform: translateY(-30px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.empty-data-text {
  font-size: 0.875rem;
  font-weight: 300;
  color: #6b7280;
}

.empty-data-item {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3f4f6;
  height: 80px;
  width: 80px;
  border-radius: 9999px;
}

.empty-data-item-icon {
  width: 40px;
  height: 40px;
  color: #6b7280;
}

.empty-data-button {
  cursor: pointer;
  background-color: var(--cor-laranja);
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 300;
  border: none;
}
</style>
