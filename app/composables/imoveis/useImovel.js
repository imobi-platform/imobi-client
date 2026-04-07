/**
 * Composável para manipulação de imóveis
 * @returns {Object}
 */

export function useImovel() {

    const api = useApi()

    /**
     * Lista todos os imóveis
     * @returns {Promise<Array>}
     */
    async function listar() {
        return await api('/api/imoveis')
    }

    /**
     * Busca um imóvel pelo ID
     * @param {string} id - ID do imóvel
     * @returns {Promise<Object>}
     */
    async function buscar(id) {
        return await api(`/api/imoveis/${id}`)
    }

    /**
     * Cria um novo imóvel
     * @param {Object} imovel - Dados do imóvel
     * @returns {Promise<Object>}
     */
    async function criar(imovel) {
        console.log("imovel", imovel)
        return await api('/api/imoveis', {
            method: 'POST',
            body: imovel,
        })
    }

    /**
     * Atualiza um imóvel
     * @param {string} id - ID do imóvel
     * @param {Object} imovel - Dados do imóvel
     * @returns {Promise<Object>}
     */
    async function atualizar(id, imovel) {
        return await api(`/api/imoveis/${id}`, {
            method: 'PUT',
            body: imovel,
        })
    }

    /**
     * Exclui um imóvel
     * @param {string} id - ID do imóvel
     * @returns {Promise<Object>}
     */
    async function excluir(id) {
        return await api(`/api/imoveis/${id}`, {
            method: 'DELETE',
        })
    }

    return {
        listar,
        criar,
        atualizar,
        excluir,
    }
}