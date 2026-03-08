<template>
    <div class="painel">
        <aside class="sidebar">sidebar</aside>
        <header class="header">
            <div class="user">
                <div class="profile">
                    <img src="https://i.pravatar.cc/300" alt="Profile Image">
                </div>
                <div class="user-info">
                    <div class="user-name">John Doe</div>
                    <div class="user-email">john.doe@example.com</div>
                </div>
            </div>
        </header>
        <main class="main">
            <NuxtPage />
        </main>
    </div>
</template>

<style scoped>
.painel {
    display: grid;
    grid-template-columns: 240px 1fr;
    grid-template-rows: 56px 1fr;
    height: 100vh;
    overflow: hidden;
}

.sidebar {
    grid-row: 1 / -1;
    background: #1e293b;
    color: white;
    padding: 1rem;
}

.header {
    background: white;
    border-bottom: 1px solid #e2e8f0;
    padding: 0 1.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.main {
    overflow: auto;
    padding: 1.5rem;
    background: #fff;
    min-height: 0;
}

.user {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.user-info {
    display: flex;
    flex-direction: column;
    gap: 0.125em;
}

.user-name {
    font-size: 0.875rem; /* 14px */
    font-weight: 600;
}

.user-email {
    font-size: 0.75rem; /* 12px */
    color: #64748b;
}

.profile {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: red;
    overflow: hidden;
}

.profile img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>