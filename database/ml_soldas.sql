
Nome: "ml_soldas" → Create
Import → Escolher ml_soldas.sql → Go

CREATE TABLE prestadores (
    id_prestador INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    especialidade VARCHAR(100),
    cpf VARCHAR(14) UNIQUE,
    telefone VARCHAR(20),
    certificacoes TEXT           
);


AGENDAMENTO.id_prestador → PRESTADOR.id_prestador


mysql u- root -p < database/ml_soldas.sql
CREATE DATABASE ml_soldas;
USE ml_soldas;

CREATE TABLE clientes (
    id_cliente INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    cnpj VARCHAR(18) UNIQUE,
    endereco TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE prestadores (
    id_prestador INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    especialidade VARCHAR(100),
    cpf VARCHAR(14) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    certificacoes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE servicos (
    id_servico INT PRIMARY KEY AUTO_INCREMENT,
    descricao TEXT NOT NULL,
    tipo_solda ENUM('MIG', 'TIG', 'Eletrodo', 'Arco Submerso') NOT NULL,
    material VARCHAR(50),
    urgencia ENUM('Baixa', 'Media', 'Alta') DEFAULT 'Media',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orcamentos (
    id_orcamento INT PRIMARY KEY AUTO_INCREMENT,
    id_cliente INT,
    id_servico INT,
    valor DECIMAL(10,2),
    prazo INT, 
    status ENUM('Pendente', 'Aprovado', 'Rejeitado', 'Concluido') DEFAULT 'Pendente',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente),
    FOREIGN KEY (id_servico) REFERENCES servicos(id_servico)
);

CREATE TABLE agendamentos (
    id_agendamento INT PRIMARY KEY AUTO_INCREMENT,
    id_orcamento INT,
    id_prestador INT,
    data DATE NOT NULL,
    hora TIME NOT NULL,
    local TEXT,
    status ENUM('Agendado', 'Em Andamento', 'Concluido', 'Cancelado') DEFAULT 'Agendado',
    FOREIGN KEY (id_orcamento) REFERENCES orcamentos(id_orcamento),
    FOREIGN KEY (id_prestador) REFERENCES prestadores(id_prestador)
);