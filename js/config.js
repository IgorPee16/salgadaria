// Inicialização do cliente Supabase
const SUPABASE_URL = 'https://omomlabrgcxgeejhcrod.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tb21sYWJyZ2N4Z2Vlamhjcm9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgyMjM0NDIsImV4cCI6MjA0Mzc5OTQ0Mn0.Kl2IpEMkwoSiYlAqOxkyUhRfFmIea11kwdVldf6whyw'
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Modificar as funções existentes para usar o Supabase

// Função para carregar pedidos do Supabase
async function carregarPedidos() {
    try {
        const { data, error } = await supabase
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

// Modificar a função salvarPedido para usar o Supabase
async function salvarPedido(event) {
    event.preventDefault()
    const form = event.target
    const pedidoId = document.getElementById('pedidoId').value
    
    const dadosPedido = {
        cliente: form.cliente.value,
        contato: form.contato.value,
        dataHora: form.dataHora.value,
        tipoEntrega: form.tipoEntrega.value,
        endereco: form.tipoEntrega.value === 'entrega' ? form.endereco.value : '',
        descricao: form.descricao.value,
        status: form.status.value,
        valor: parseFloat(form.valor.value),
        observacao: form.observacao.value
    }

    try {
        let result
        if (pedidoId) {
            // Atualizar pedido existente
            result = await supabase
                .from('pedidos')
                .update(dadosPedido)
                .eq('id', parseInt(pedidoId))
        } else {
            // Inserir novo pedido
            result = await supabase
                .from('pedidos')
                .insert([dadosPedido])
        }

        if (result.error) throw result.error
        
        await carregarPedidos() // Recarrega os pedidos após salvar
        fecharModal()
    } catch (error) {
        console.error('Erro ao salvar pedido:', error.message)
        alert('Erro ao salvar pedido. Por favor, verifique o console.')
    }
}

// Modificar a função deletarPedido para usar o Supabase
async function deletarPedido(id) {
    if (confirm('Tem certeza que deseja excluir este pedido?')) {
        try {
            const { error } = await supabase
                .from('pedidos')
                .delete()
                .eq('id', id)
            
            if (error) throw error
            
            await carregarPedidos() // Recarrega os pedidos após deletar
        } catch (error) {
            console.error('Erro ao deletar pedido:', error.message)
            alert('Erro ao deletar pedido. Por favor, verifique o console.')
        }
    }
}

// Modificar a inicialização para carregar dados do Supabase
document.addEventListener('DOMContentLoaded', () => {
    carregarPedidos()
})
