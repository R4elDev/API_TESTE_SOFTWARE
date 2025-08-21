const request = require('supertest')
const app = require('../app.js')

describe('Testes de Clientes API', () => {
  let clienteId;

  beforeAll(async () => {
    // Criar um cliente para usar em todos os testes
    const res = await request(app)
      .post('/v1/teste-software/clientes')
      .send({ 
        nome: 'Cliente Teste', 
        email: 'cliente.teste@example.com', 
        telefone: '11999999999', 
        cidade: 'São Paulo' 
      });

    // Extrair o ID baseado na estrutura da sua API
    // Ajuste este caminho baseado na estrutura real da sua resposta
    if (res.body.clienteBuscado && res.body.clienteBuscado.cliente) {
      clienteId = res.body.clienteBuscado.cliente.id;
    } else if (res.body.cliente && res.body.cliente.id) {
      clienteId = res.body.cliente.id;
    } else if (res.body.cliente && Array.isArray(res.body.cliente)) {
      clienteId = res.body.cliente[0].id;
    }

    console.log('Cliente criado para testes com ID:', clienteId);
    
    // Verificar se o ID foi capturado corretamente
    if (!clienteId) {
      console.error('Erro: Não foi possível capturar o ID do cliente');
      console.log('Estrutura da resposta:', JSON.stringify(res.body, null, 2));
    }
  });

  afterAll(async () => {
    // Limpar o cliente de teste após todos os testes
    if (clienteId) {
      await request(app).delete(`/v1/teste-software/clientes/${clienteId}`);
      console.log('Cliente de teste removido:', clienteId);
    }
  });

  test('POST /v1/teste-software/clientes -> cria cliente', async () => {
    const res = await request(app)
      .post('/v1/teste-software/clientes')
      .send({ 
        nome: 'Rael', 
        email: 'raraeldev@gmail.com', 
        telefone: '11999999999', 
        cidade: 'São Paulo' 
      })
      .set('Accept', 'application/json');
  
    expect(res.body.message.status_code).toBe(201);
    expect(res.body.message.status).toBe(true);
    expect(res.body.message.message).toBe('Item criado com sucesso !!!');
  });

  test('GET /v1/teste-software/clientes -> lista clientes', async () => {
    const res = await request(app).get('/v1/teste-software/clientes');
    
    expect(res.body.status_code).toBe(200);
    expect(Array.isArray(res.body.clientes)).toBe(true);
    expect(res.body.clientes.length).toBeGreaterThan(0);
  });

  test('GET /v1/teste-software/clientes/:id -> busca cliente', async () => {
    expect(clienteId).toBeDefined();
    
    const res = await request(app).get(`/v1/teste-software/clientes/${clienteId}`);
    
    console.log('Resposta do GET por ID:', JSON.stringify(res.body, null, 2));
    
    expect(res.body.status_code).toBe(200);
    
    // Ajustar baseado na estrutura real da resposta
    if (res.body.cliente && Array.isArray(res.body.cliente)) {
      expect(res.body.cliente[0]).toHaveProperty('id', clienteId);
      expect(res.body.cliente[0]).toHaveProperty('nome', 'Cliente Teste');
    } else if (res.body.cliente) {
      expect(res.body.cliente).toHaveProperty('id', clienteId);
      expect(res.body.cliente).toHaveProperty('nome', 'Cliente Teste');
    }
  });

  test('PUT /v1/teste-software/clientes/:id -> atualiza cliente', async () => {
    expect(clienteId).toBeDefined();
    
    const res = await request(app)
      .put(`/v1/teste-software/clientes/${clienteId}`)
      .send({ nome: 'Cliente Teste Atualizado' })
      .set('Accept', 'application/json');

    console.log('Resposta do PUT:', JSON.stringify(res.body, null, 2));

    expect(res.body.status_code).toBe(200);
    expect(res.body.status).toBe(true);
    
    // Verificar se a propriedade cliente existe e ajustar baseado na estrutura
    if (res.body.cliente) {
      if (Array.isArray(res.body.cliente)) {
        expect(res.body.cliente).toHaveLength(1);
        expect(res.body.cliente[0].nome).toBe('Cliente Teste Atualizado');
        expect(res.body.cliente[0].id).toBe(clienteId);
      } else {
        expect(res.body.cliente.nome).toBe('Cliente Teste Atualizado');
        expect(res.body.cliente.id).toBe(clienteId);
      }
    }
  });

  test('DELETE /v1/teste-software/clientes/:id -> exclui cliente', async () => {
    // Criar um cliente específico para exclusão (para não afetar outros testes)
    const createRes = await request(app)
      .post('/v1/teste-software/clientes')
      .send({ 
        nome: 'Cliente Para Exclusão', 
        email: 'exclusao@example.com', 
        telefone: '11888888888', 
        cidade: 'Rio de Janeiro' 
      });

    let clienteParaExclusao;
    if (createRes.body.clienteBuscado && createRes.body.clienteBuscado.cliente) {
      clienteParaExclusao = createRes.body.clienteBuscado.cliente.id;
    }

    expect(clienteParaExclusao).toBeDefined();
    
    const res = await request(app).delete(`/v1/teste-software/clientes/${clienteParaExclusao}`);
    
    console.log('Resposta do DELETE:', JSON.stringify(res.body, null, 2));
    
    expect(res.body.status_code).toBe(200);
    expect(res.body).toHaveProperty('message');
  });
});