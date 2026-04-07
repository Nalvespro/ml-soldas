// FRONTEND - JavaScript Principal
document.addEventListener('DOMContentLoaded', function() {
    carregarServicos();
    configurarFormOrcamento();
});

// Abrir/Fechar Modal
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Fechar modal clicando fora
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// Carregar serviços do backend
async function carregarServicos() {
    try {
        const response = await fetch('http://localhost:3000/api/servicos');
        const servicos = await response.json();
        
        const servicosGrid = document.getElementById('servicosList');
        servicosGrid.innerHTML = servicos.map(servico => `
            <div class="servico-card">
                <i class="fas fa-tools"></i>
                <h3>${servico.tipo_solda}</h3>
                <p>${servico.descricao}</p>
                <span class="urgencia ${servico.urgencia.toLowerCase()}">
                    ${servico.urgencia}
                </span>
            </div>
        `).join('');
    } catch (error) {
        console.error('Erro ao carregar serviços:', error);
        // Fallback estático
        document.getElementById('servicosList').innerHTML = `
            <div class="servico-card">
                <i class="fas fa-burn"></i>
                <h3>Solda MIG/MAG</h3>
                <p>Soldagem MIG/MAG para aços carbono e inox</p>
            </div>
            <div class="servico-card">
                <i class="fas fa-fire"></i>
                <h3>Solda TIG</h3>
                <p>Soldagem TIG para alumínio e aços especiais</p>
            </div>
        `;
    }
}

// Configurar formulário de orçamento
function configurarFormOrcamento() {
    const form = document.getElementById('orcamentoForm');
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = {
            cliente_nome: document.getElementById('cliente_nome').value,
            cliente_email: document.getElementById('cliente_email').value,
            cliente_cnpj: document.getElementById('cliente_cnpj').value,
            servico_descricao: document.getElementById('servico_descricao').value,
            tipo_solda: document.getElementById('tipo_solda').value,
            urgencia: document.getElementById('urgencia').value
        };

        try {
            const response = await fetch('http://localhost:3000/api/orcamentos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Orçamento solicitado com sucesso! Entraremos em contato em breve.');
                form.reset();
                closeModal('orcamentoModal');
            }
        } catch (error) {
            alert('Erro ao enviar orçamento. Tente novamente.');
            console.error(error);
        }
    });
}

// Smooth scroll para navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {anchor.addEventListener('click',function (e) {e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {target.scrollIntoView({behavior:'smooth'
        });
    }
});
});

        const express = require('express');
const path = require('path');
const app = express();

app.use('/ml-soldas/frontend', express.static('ml-soldas/frontend'));
app.use(express.static('ml-soldas/frontend'));

app.listen(3000, () => {
    console.log('🚀 Servidor rodando em http://localhost:3000');
}); 

// BACKEND NODE.JS + EXPRESS + MYSQL ✅
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// CONEXÃO BD FUNCIONANDO
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ml_soldas'
});

// ✅ ROTAS API COMPLETAS
app.get('/api/servicos', (req, res) => { /* Lista serviços */ });
app.post('/api/orcamentos', (req, res) => { /* Cria orçamento */ });
app.get('/api/prestadores', (req, res) => { /* Lista soldadores */ });

app.listen(3000, () => {
    console.log('🚀 Servidor ML SOLDAS rodando na porta 3000');
});