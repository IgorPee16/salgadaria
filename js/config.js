// Substitua a inicialização atual por esta:
const { createClient } = supabase
const supabaseClient = createClient('https://omomlabrgcxgeejhcrod.supabase.c, eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tb21sYWJyZ2N4Z2Vlamhjcm9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgyMjM0NDIsImV4cCI6MjA0Mzc5OTQ0Mn0.Kl2IpEMkwoSiYlAqOxkyUhRfFmIea11kwdVldf6whyw')
const SUPABASE_URL = 'https://omomlabrgcxgeejhcrod.supabase.c'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tb21sYWJyZ2N4Z2Vlamhjcm9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgyMjM0NDIsImV4cCI6MjA0Mzc5OTQ0Mn0.Kl2IpEMkwoSiYlAqOxkyUhRfFmIea11kwdVldf6whyw'

// Função para testar a conexão
async function testarConexao() {
    try {
        const { data, error } = await supabaseClient
            .from('pedidos')
            .select('count', { count: 'exact', head: true })

        if (error) throw error

        console.log('✅ Conexão com Supabase estabelecida com sucesso!')
        console.log(`📊 Número de pedidos na base: ${data}`)
        return true
    } catch (error) {
        console.error('❌ Erro na conexão com Supabase:', error.message)
        return false
    }
}

// Atualize as outras funções também
async function carregarPedidos() {
    try {
        const { data, error } = await supabaseClient
            .from('pedidos')
            .select('*')
            .order('dataHora', { ascending: true })
        
        if (error) throw error
        
        pedidos = data
        atualizarTabela()
    } catch (error) {
        console.error('Erro ao carregar pedidos:', error.message)
        alert('Erro ao carregar pedidos. Por favor, verifique o console.')
    }
}

// Função salvarPedido atualizada
async function salvarPedido(event) {
    event.preventDefault()
    // ... resto do código ...
    try {
        let result
        if (pedidoId) {
            result = await supabaseClient
                .from('pedidos')
                .update(dadosPedido)
                .eq('id', parseInt(pedidoId))
        } else {
            result = await supabaseClient
                .from('pedidos')
                .insert([dadosPedido])
        }
        // ... resto do código ...
    } catch (error) {
        console.error('Erro ao salvar pedido:', error.message)
        alert('Erro ao salvar pedido. Por favor, verifique o console.')
    }
}

// Função deletarPedido atualizada
async function deletarPedido(id) {
    if (confirm('Tem certeza que deseja excluir este pedido?')) {
        try {
            const { error } = await supabaseClient
                .from('pedidos')
                .delete()
                .eq('id', id)
            
            if (error) throw error
            
            await carregarPedidos()
        } catch (error) {
            console.error('Erro ao deletar pedido:', error.message)
            alert('Erro ao deletar pedido. Por favor, verifique o console.')
        }
    }
}
