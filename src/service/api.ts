const API_BASE = process.env.NEXT_PUBLIC_API_URL;
import Cookies from 'js-cookie';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

function authHeaders() {
  const token = Cookies.get('token');
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

// Usuário
export async function createUser(name: string, email: string, password: string) {
  const res = await fetch(`${API_BASE}/create/user`, {
    method: 'POST',
    headers,
    body: JSON.stringify({  
            nome:name,
            email:email,
            senha:password,
             }),
  });
  return res.json();
}

export async function validarUsuario(code: string) {
  const res = await fetch(`${API_BASE}/valid/user/${code}`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });
  return res.json();
}

export async function login(email: string, password: string) {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ email, senha:password }),
  });
  if (!res.ok) {
    const errorBody = await res.json();
    throw new Error(errorBody.message || 'Falha no login');
  }
  return res.json(); 
}

// Lista de Tarefas
export async function criarLista(nome: string, usuario_id: number, token: string | null) {
    const res = await fetch(`${API_BASE}/create/list/task`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            nome, 
            usuario_id,
        }),
    });
    
    if (!res.ok) {
        const msg = await res.text();
        throw new Error(`Erro ao criar lista: ${msg}`);
    }
    return res.json();
}

export async function listarListas(usuario_id: number) {
  const res = await fetch(`${API_BASE}/select/list/task/${usuario_id}`, {
    method: 'GET',
    headers: authHeaders(),
  });

  if (!res.ok) {
    let errorMessage = `Erro ao listar listas: ${res.status} ${res.statusText}`;
    try {
      const errorData = await res.json();
      if (errorData?.message) {
        errorMessage += ` - ${errorData.message}`;
      }
    } catch {
      // Ignora erros ao ler o JSON
    }
    throw new Error(errorMessage);
  }

  return await res.json();
}

export async function deletarLista(id: number){
  const token = Cookies.get('token')
  const res = await fetch(`${API_BASE}/delete/one/list/task?lista_tarefa_id=${id}`,{
    method: 'DELETE',
    headers: { 
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Erro ${res.status}: ${errorText}`);
  }

  return res.json();
}

export async function editarTituloLista(lista_tarefa_id: number, nome: string){
  const res = await fetch(`${API_BASE}/update/list/task/title`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ nome, lista_tarefa_id})
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Erro ${res.status}: ${errorText}`);
  }

  return res.json();
}

// Tarefas
type Tarefa = {
  titulo: string;
  descricao: string;
  data_tarefa: string;
  prioridade: string;
  concluida: boolean;
  lista_tarefa_id: number;
};

export async function criarTarefa(tarefa: Tarefa) {
  const res = await fetch(`${API_BASE}/create/task`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(tarefa),
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Erro ${res.status}: ${errorText}`);
  }
  return res.json();
}

export async function listarTarefas(lista_tarefa_id: number) {
  const res = await fetch(`${API_BASE}/select/all/task/${lista_tarefa_id}`, {
    method: 'GET',
    headers: authHeaders(),
  });
    if (!res.ok) {
    const erro = await res.text();
    throw new Error(`Erro ao listar tarefas: ${erro}`);
    }

  return res.json();
}

export async function deletarTarefa(id: number) {
  const res = await fetch(`${API_BASE}/delete/one/task/`, {
    method: 'DELETE',
    headers: authHeaders(),
    body: JSON.stringify({ tarefa_id: id })
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Erro ${res.status}: ${errorText}`);
  }

  return res.json();
}

export async function deletarTodasTarefas(listaId: number) {
  const res = await fetch(`${API_BASE}/delete/all/task/${listaId}`, {
    method: 'DELETE',
    headers: { Accept: 'application/json' },
  });
  return res.json();
}

// Recuperação de Senha
export async function enviarCodigo(email: string) {
  const res = await fetch(`${API_BASE}/forgot/password`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ email }),
  });
  return res.json(); // { Message, identy }
}

export async function confirmarCodigo(id: number, codigo: string) {
  const res = await fetch(`${API_BASE}/confirm/code/email`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ id, codigo }),
  });
  return res.json(); // { token, id }
}

export async function resetarSenha(id: number, novaSenha: string, token: string) {
  const res = await fetch(`${API_BASE}/reset/password`, {
    method: 'POST',
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id, senha_nova: novaSenha }),
  });
  return res.json();
}