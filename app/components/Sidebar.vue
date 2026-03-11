<template>
    <aside class="sidebar" :class="{ 'sidebar--recolhida': collapsed }">
        <div class="sidebar-topo">
            <NuxtLink to="/app" class="sidebar-logo">
                <img v-show="!collapsed" src="/img/imobi-primary.svg" alt="Logo">
            </NuxtLink>
            <button
                type="button"
                class="sidebar-toggle"
                :aria-label="collapsed ? 'Expandir menu' : 'Recolher menu'"
                @click="emit('toggle')"
            >
                <ChevronRight v-if="collapsed" class="sidebar-toggle-icon" />
                <ChevronLeft v-else :stroke-width="1" class="sidebar-toggle-icon" />
            </button>
        </div>
        <nav class="sidebar-opcoes">
            <template v-for="grupo in grupos" :key="grupo.titulo">
                <span class="sidebar-grupo-titulo">{{ grupo.titulo }}</span>
                <div
                    v-for="item in grupo.itens"
                    :key="item.to + item.label"
                    class="sidebar-opcao-wrap"
                    @mouseenter="onOpcaoEnter($event, item.label)"
                    @mouseleave="onOpcaoLeave"
                >
                    <NuxtLink
                        :to="item.to"
                        class="sidebar-opcao"
:exact-active-class="(item as { exact?: boolean }).exact ? 'sidebar-opcao-ativo' : undefined"
                    :active-class="(item as { exact?: boolean }).exact ? undefined : 'sidebar-opcao-ativo'"
                >
                    <component :is="item.icon" class="sidebar-opcao-icon" :class="(item as { iconClass?: string }).iconClass" />
                        <span class="sidebar-opcao-texto">{{ item.label }}</span>
                    </NuxtLink>
                </div>
            </template>
        </nav>
        <div
            ref="perfilRef"
            class="sidebar-perfil"
            @mouseenter="onPerfilEnter"
            @mouseleave="onPerfilLeave"
        >
            <div class="sidebar-perfil-avatar">
                <img src="https://i.pravatar.cc/300" alt="Avatar">
            </div>
            <span class="sidebar-perfil-nome">Pablo</span>
        </div>
    </aside>
    <Teleport to="body">
        <div
            v-show="showPopover"
            class="sidebar-popover"
            :style="popoverRect ? {
                left: `${popoverRect.right + 8}px`,
                top: `${popoverRect.top + popoverRect.height / 2}px`,
                transform: 'translateY(-50%)'
            } : undefined"
        >
            {{ popoverLabel }}
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import {
    ChevronLeft,
    ChevronRight,
    LayoutDashboard,
    Users,
    SquareArrowOutUpRight,
    ClipboardCheck,
    FileText,
    PenLine,
    CircleDollarSign,
    Repeat,
    ArrowRightLeft,
    ArrowRightFromLine,
    BarChart3,
    Building,
    ArrowLeftRight,
    PlusSquare,
    MinusSquare,
} from 'lucide-vue-next'

const grupos = [
    {
        titulo: 'GESTÃO',
        itens: [
            { to: '/app', label: 'Dashboard', icon: LayoutDashboard, exact: true },
            { to: '/app/contatos', label: 'Contatos', icon: Users },
            { to: '/app/projetos', label: 'Projetos', icon: SquareArrowOutUpRight },
            { to: '/app/tarefas', label: 'Tarefas', icon: ClipboardCheck },
            { to: '/app/propostas', label: 'Propostas', icon: FileText },
            { to: '/app/contratos', label: 'Contratos', icon: PenLine },
        ],
    },
    {
        titulo: 'PAGAMENTOS',
        itens: [
            { to: '/app/cobrancas', label: 'Cobranças', icon: CircleDollarSign },
            { to: '/app/assinaturas', label: 'Assinaturas', icon: Repeat },
            { to: '/app/antecipacoes', label: 'Antecipações', icon: ArrowRightLeft },
            { to: '/app/notas-fiscais', label: 'Notas Fiscais', icon: FileText },
            { to: '/app/sacar', label: 'Sacar R$ 0,00', icon: ArrowRightFromLine },
        ],
    },
    {
        titulo: 'FINANCEIRO',
        itens: [
            { to: '/app/graficos', label: 'Gráficos', icon: BarChart3 },
            { to: '/app/contas', label: 'Contas', icon: Building },
            { to: '/app/transferencias', label: 'Transferências', icon: ArrowLeftRight },
            { to: '/app/receitas', label: 'Receitas', icon: PlusSquare, iconClass: 'sidebar-opcao-icon-verde' },
            { to: '/app/despesas', label: 'Despesas', icon: MinusSquare, iconClass: 'sidebar-opcao-icon-vermelho' },
        ],
    },
]

const props = defineProps<{ collapsed: boolean }>()
const emit = defineEmits(['toggle'])

const popoverLabel = ref<string | null>(null)
const popoverRect = ref<DOMRect | null>(null)
const perfilRef = ref<HTMLElement | null>(null)

function onOpcaoEnter(e: MouseEvent, label: string) {
  popoverLabel.value = label
  popoverRect.value = (e.currentTarget as HTMLElement).getBoundingClientRect()
}
function onOpcaoLeave() {
  popoverLabel.value = null
  popoverRect.value = null
}
function onPerfilEnter() {
  popoverLabel.value = 'Pablo'
  if (perfilRef.value) popoverRect.value = perfilRef.value.getBoundingClientRect()
}
function onPerfilLeave() {
  popoverLabel.value = null
  popoverRect.value = null
}

const showPopover = computed(() => props.collapsed && popoverLabel.value && popoverRect.value)
</script>

<style scoped>
.sidebar {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 240px;
    height: 100%;
    border-right: 1px solid #e2e8f0;
    overflow: hidden;
    transition: width 0.25s ease;
}

.sidebar--recolhida {
    width: 56px;
    overflow: visible;
}

.sidebar--recolhida .sidebar-opcoes {
    overflow-x: visible;
}

.sidebar-topo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    padding: 0.5rem 1rem;
    /* border-bottom: 1px solid #e2e8f0; */
    min-height: 50px;
}

.sidebar-logo {
    display: block;
    text-decoration: none;
}

.sidebar-logo img {
    width: 60%;
    object-fit: cover;
}

.sidebar--recolhida .sidebar-logo {
    width: 0;
    overflow: hidden;
    opacity: 0;
    pointer-events: none;
}

.sidebar-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border: none;
    background: transparent;
    color: #374151;
    cursor: pointer;
    border-radius: 9999px;
    transition: background 0.2s;
}

.sidebar-toggle:hover {
    background: #f3f4f6;
}

.sidebar--recolhida .sidebar-toggle {
    position: absolute;
    top: 14px;
    right: 0;
    transform: translateX(50%);
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 1px solid #e2e8f0;
    background: #fff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
}

.sidebar-toggle-icon {
    width: 14px;
    height: 14px;
}

.sidebar-opcoes {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 1rem;
}

.sidebar-opcao-wrap {
    width: fit-content;
}

.sidebar--recolhida .sidebar-grupo-titulo {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    margin: 0;
    overflow: hidden;
    opacity: 0;
}

.sidebar--recolhida .sidebar-opcao {
    justify-content: center;
    padding: 8px;
}

.sidebar--recolhida .sidebar-opcao-texto {
    position: absolute;
    width: 0;
    overflow: hidden;
    opacity: 0;
}

.sidebar--recolhida .sidebar-perfil-nome {
    position: absolute;
    width: 0;
    overflow: hidden;
    opacity: 0;
}

.sidebar--recolhida .sidebar-perfil {
    justify-content: center;
}

.sidebar-opcao {
    display: inline-flex;
    align-items: center;
    width: fit-content;
    padding: 5px 20px 5px 10px;
    gap: 0.5rem;
    border-radius: 9999px;
    text-decoration: none;
    color: #111;
    font-size: 0.875rem;
    font-weight: 300;
}

.sidebar-opcao-ativo {
    background: linear-gradient(to right, #ffffff, #f8f8f8);
    font-weight: 500;
}

.sidebar-opcao-ativo .sidebar-opcao-icon {
    color: #111;
}

.sidebar-opcao-icon {
    width: 16px;
    color: #64748b;
}

.sidebar-opcao-icon.sidebar-opcao-icon-verde { color: #16a34a; }
.sidebar-opcao-icon.sidebar-opcao-icon-vermelho { color: #dc2626; }

.sidebar-opcao-texto {
    white-space: nowrap;
    overflow: hidden;
}

.sidebar-perfil {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    border-top: 1px solid #e2e8f0;
}

.sidebar-perfil-avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    overflow: hidden;
    background: #e2e8f0;
}

.sidebar-perfil-avatar img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.sidebar-perfil-nome {
    font-size: 0.75rem;
    font-weight: 500;
    color: #111;
    white-space: nowrap;
    overflow: hidden;
}

.sidebar-grupo-titulo {
    font-size: 0.625rem;
    font-weight: 600;
    color: #111;
    margin-bottom: 0.5rem;
    margin-top: 1rem;
    text-transform: uppercase;
}

.sidebar-grupo-titulo:first-child {
    margin-top: 0;
}

.sidebar-popover {
    position: fixed;
    padding: 6px 12px;
    background: #000;
    color: #fff;
    font-size: 0.75rem;
    font-weight: 500;
    white-space: nowrap;
    border-radius: 8px;
    z-index: 9999;
    pointer-events: none;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}
</style>
