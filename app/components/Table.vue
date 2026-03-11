<template>
  <div class="table-wrap">
    <div class="table-inner">
      <table class="table" :class="{ 'table--striped': striped }">
        <thead class="table-head">
          <tr>
            <th
              v-for="field in fields"
              :key="field.key"
              class="table-th"
              :style="{ textAlign: field.align || 'left' }"
            >
              {{ field.label }}
            </th>
          </tr>
        </thead>
        <tbody class="table-body">
          <tr
            v-for="(item, index) in items"
            :key="rowKey(item, index)"
            class="table-row"
          >
            <td
              v-for="field in fields"
              :key="field.key"
              class="table-td"
              :style="{ textAlign: field.align || 'left' }"
            >
              <slot :name="`cell(${field.key})`" :row="item" :field="field">
                {{ item[field.key] }}
              </slot>
            </td>
          </tr>
          <tr v-if="items.length === 0" class="table-row-empty">
            <td :colspan="fields.length" class="table-td-empty">
              <slot name="empty">Nenhum dado encontrado.</slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  fields: { type: Array, required: true },
  items: { type: Array, required: true },
  striped: { type: Boolean, default: false },
  rowKey: { type: Function, default: (row, index) => (row.id != null ? String(row.id) : String(index)) },
})

</script>

<style scoped>
.table-wrap {
  overflow-x: auto;
  width: 100%;
}

.table-inner {
  border: 1px solid #e2e8f0;
  border-radius: 1.5rem;
  overflow: hidden;
  min-width: min-content;
}

.table {
  width: 100%;
  min-width: 100%;
  border-collapse: collapse;
}

.table-head {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}

.table-th {
  padding: 20px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

.table-body td {
  padding: 20px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
  font-size: 0.875rem;
  color: #111;
}

.table-row:last-child td {
  border-bottom: none;
}

.table-row td {
  background-color: inherit;
}

.table--striped .table-row:nth-child(odd) td {
  background-color: #f4f7fa;
}

.table--striped .table-row:nth-child(even) td {
  background-color: #fff;
}

.table-row-empty .table-td-empty {
  text-align: center;
  padding: 20px;
  font-size: 0.875rem;
  color: #64748b;
  border-bottom: none;
}
</style>
