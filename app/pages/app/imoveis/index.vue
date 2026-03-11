<template>
  <div class="imoveis-page">
    <SectionLabel title="Meus Imóveis" :icon="DoorOpen" />
    <Table :fields="fields" :items="itens" striped>
      <template #cell(valor)="data">
        {{ formatarMoeda(data.row.valor) }}
      </template>
      <template #cell(actions)="data">
        <DropdownMenu :options="opcoesParaLinha(data.row)" />
      </template>
    </Table>
  </div>
</template>

<script setup>
import { DoorOpen, Pencil, Trash2 } from 'lucide-vue-next'
import SectionLabel from '@/components/SectionLabel.vue'

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

const itens = ref([
  { id: 1, imovel: 'Imóvel 1', imobiliaria: 'Imobiliária 1', cidade: 'Cidade 1', estado: 'Estado 1', bairro: 'Bairro 1', valor: 100000 },
  { id: 2, imovel: 'Imóvel 2', imobiliaria: 'Imobiliária 2', cidade: 'Cidade 2', estado: 'Estado 2', bairro: 'Bairro 2', valor: 250000 },
])

function formatarMoeda(valor) {
  if (valor == null) return '—'
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor)
}
</script>

<style scoped>
.imoveis-page {
  width: 100%;
}
</style>
