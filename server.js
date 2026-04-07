const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

console.log('🔥 Iniciando ML Soldas Backend...');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ml_soldas'
});

db.connect((err) => {
    if (err) {
        console.error('❌ MySQL ERRO:', err.message);
        return;
    }
    console.log('✅ MySQL conectado!');
});

// ROTA PRINCIPAL
app.get('/', (req, res) => {
    res.send(`
        <h1 style="color:#FF6200">🚀 ML SOLDAS BACKEND OK!</h1>
        <p><a href="/frontend/index.html">📱 Frontend</a> | 
        <a href="/api/servicos">🔧 API Teste</a></p>
    `);
});

// API SERVIÇOS
app.get('/api/servicos', (req, res) => {
    db.query('SELECT * FROM servicos', (err, results) => {
        console.log('📋 API servicos:', results?.length || 0);
        res.json(results || []);
    });
});

// API ORÇAMENTOS
app.post('/api/orcamentos', (req, res) => {
    console.log('💰 Novo orcamento:', req.body);
    const data = req.body;
    db.query('INSERT INTO clientes SET ?', data, (err) => {
        res.json({ success: true, message: '✅ Orçamento salvo!' });
    });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`\n🌐 Backend: http://localhost:${PORT}`);
    console.log(`📱 Frontend: http://localhost:${PORT}/frontend/index.html`);
    console.log(`🔧 API: http://localhost:${PORT}/api/servicos\n`);
});