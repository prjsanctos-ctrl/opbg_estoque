// ============================================================
// SUPABASE CONFIGURAÇÃO
// COLOQUE SEUS DADOS AQUI!
// ============================================================

const SUPABASE_URL = 'https://SEU_PROJETO.supabase.co';
const SUPABASE_ANON_KEY = 'SUA_CHAVE_ANON_AQUI';

// ============================================================
// INICIALIZAR SUPABASE
// ============================================================

const supabase = supabaseClient.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============================================================
// FUNÇÕES DE AUTENTICAÇÃO
// ============================================================

async function fazerLogin(email, senha) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: senha
        });
        
        if (error) throw error;
        
        const { data: userData, error: userError } = await supabase
            .from('usuarios')
            .select('*')
            .eq('email', email)
            .single();
            
        if (userError) throw userError;
        
        return { success: true, user: data.user, userData };
    } catch (error) {
        let mensagem = 'Erro ao fazer login.';
        if (error.message === 'Invalid login credentials') {
            mensagem = 'Email ou senha inválidos.';
        } else if (error.message === 'Email not confirmed') {
            mensagem = 'Email não confirmado.';
        }
        return { success: false, error: mensagem };
    }
}

async function fazerLogout() {
    try {
        await supabase.auth.signOut();
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// ============================================================
// FUNÇÕES DO BANCO DE DADOS
// ============================================================

async function listarTabela(tabela, orderBy = 'id', ascending = false) {
    try {
        const { data, error } = await supabase
            .from(tabela)
            .select('*')
            .order(orderBy, { ascending: ascending });
            
        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Erro ao listar:', error);
        return { success: false, error: error.message, data: [] };
    }
}

async function buscarPorId(tabela, id) {
    try {
        const { data, error } = await supabase
            .from(tabela)
            .select('*')
            .eq('id', id)
            .single();
            
        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

async function adicionarRegistro(tabela, dados) {
    try {
        const { data, error } = await supabase
            .from(tabela)
            .insert([dados])
            .select();
            
        if (error) throw error;
        return { success: true, data: data[0] };
    } catch (error) {
        console.error('Erro ao adicionar:', error);
        return { success: false, error: error.message };
    }
}

async function atualizarRegistro(tabela, id, dados) {
    try {
        const { data, error } = await supabase
            .from(tabela)
            .update(dados)
            .eq('id', id)
            .select();
            
        if (error) throw error;
        return { success: true, data: data[0] };
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        return { success: false, error: error.message };
    }
}

async function deletarRegistro(tabela, id) {
    try {
        const { error } = await supabase
            .from(tabela)
            .delete()
            .eq('id', id);
            
        if (error) throw error;
        return { success: true };
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return { success: false, error: error.message };
    }
}

async function buscarComFiltro(tabela, filtros, orderBy = 'id', ascending = false) {
    try {
        let query = supabase.from(tabela).select('*');
        
        Object.keys(filtros).forEach(key => {
            query = query.eq(key, filtros[key]);
        });
        
        const { data, error } = await query.order(orderBy, { ascending });
            
        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Erro na busca:', error);
        return { success: false, error: error.message, data: [] };
    }
}

async function buscarProdutos(termo) {
    try {
        const { data, error } = await supabase
            .from('produtos')
            .select('*')
            .or(`descricao.ilike.%${termo}%,pn.ilike.%${termo}%,tracking.ilike.%${termo}%`);
            
        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Erro na busca:', error);
        return { success: false, error: error.message, data: [] };
    }
}

async function getProdutosBaixoEstoque(limite = 5) {
    try {
        const { data, error } = await supabase
            .from('produtos')
            .select('*')
            .lt('quantidade', limite)
            .not('status', 'eq', 'obsoleto')
            .not('status', 'eq', 'bad');
            
        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Erro:', error);
        return { success: false, error: error.message, data: [] };
    }
}

async function getSolicitacoesPendentes() {
    try {
        const { data, error } = await supabase
            .from('solicitacoes')
            .select('*')
            .eq('status', 'pendente')
            .order('data', { ascending: true });
            
        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Erro:', error);
        return { success: false, error: error.message, data: [] };
    }
}

async function registrarAuditoria(usuarioId, usuarioNome, acao, detalhes) {
    try {
        const { error } = await supabase
            .from('auditoria')
            .insert([{
                usuario_id: usuarioId,
                usuario_nome: usuarioNome,
                acao: acao,
                detalhes: detalhes,
                data: new Date().toISOString()
            }]);
            
        if (error) throw error;
        return { success: true };
    } catch (error) {
        console.error('Erro ao registrar auditoria:', error);
        return { success: false, error: error.message };
    }
}