const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Define variáveis de ambiente
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 3306;
const DB_NAME = process.env.DB_NAME || 'dimdim';
const DB_USER = process.env.DB_USER || 'dimdim-banco';
const DB_PASS = process.env.DB_PASS || 'db@dimdim';

app.use(express.json());
app.use(cors({ origin: '*'}));

// Define a rota para acessar a tabela 'users' no banco de dados
app.get('/funcionarios', async (req, res) => {
  try {
    // Conecta com o banco de dados
const connection = await mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
});

    // Executa uma consulta SQL para buscar todos os usuários
    const [rows] = await connection.execute('SELECT * FROM tb_funcionarios');

    // Retorna os resultados em formato JSON
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar usuários.' });
  }
});

app.get('/funcionarios/:id', async (req, res) => {
  try {
    // Conecta com o banco de dados
    const connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
    });

    const { id } = req.params;

    // Executa uma consulta SQL para buscar todos os usuários
    const [rows] = await connection.execute('SELECT * FROM tb_funcionarios WHERE funcionario_id = ?', [id]);

    // Retorna os resultados em formato JSON
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar usuário.' });
  }
});

app.post('/funcionarios', async (req, res) => {
  try {
    // Conecta com o banco de dados
    const connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
    });

    const { nome_completo, endereco, email, cpf } = req.body;

    // Executa uma consulta SQL para inserir um usuário
    const [rows] = await connection.execute('INSERT INTO tb_funcionarios (nome_completo, endereco, email, cpf) VALUES (?, ?, ?, ?)', [nome_completo, endereco, email, cpf]);

    // Retorna os resultados em formato JSON
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao inserir usuário.' });
  }
});

app.put('/funcionarios/:id', async (req, res) => {
  // Conecta com o banco de dados
  const connection = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
  });

  try {
    const { id } = req.params;
    const { nome_completo, endereco, email, cpf } = req.body;
    
    // Executa uma consulta SQL para atualizar um usuário
    const [rows] = await connection.execute('UPDATE tb_funcionarios SET nome_completo = ?, endereco = ?, email = ?, cpf = ? WHERE funcionario_id = ?', [nome_completo, endereco, email, cpf, id]);

    // Retorna os resultados em formato JSON
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar usuário.' });
  }
});

app.delete('/funcionarios/:id', async (req, res) => {
  // Conecta com o banco de dados
  const connection = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
  });

  try {
    const { id } = req.params;
    
    // Executa uma consulta SQL para deletar um usuário
    const [rows] = await connection.execute('DELETE FROM tb_funcionarios WHERE funcionario_id = ?', [id]);

    // Retorna os resultados em formato JSON
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao deletar usuário.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}.`);
});