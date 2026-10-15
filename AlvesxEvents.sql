CREATE DATABASE AlvesxEvents;
USE AlvesxEvents;

CREATE TABLE Locais (
    id_local INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    capacidade INT NOT NULL
);

CREATE TABLE Artistas (
    id_artista INT AUTO_INCREMENT PRIMARY KEY,
    nome_artistico VARCHAR(100) NOT NULL,
    nome_completo VARCHAR(150) NOT NULL,
    genero_musical VARCHAR(50)
);

CREATE TABLE Clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefone VARCHAR(20)
);

CREATE TABLE Eventos (
    id_evento INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    data DATE NOT NULL,
    horario TIME NOT NULL,
    status VARCHAR(50) NOT NULL,
    id_local INT,
    FOREIGN KEY (id_local) REFERENCES Locais(id_local)
);

CREATE TABLE Ingressos (
    id_ingresso INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    id_evento INT NOT NULL,
    id_cliente INT,
    FOREIGN KEY (id_evento) REFERENCES Eventos(id_evento),
    FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente)
);

CREATE TABLE Evento_Artista (
    id_evento INT,
    id_artista INT,
    PRIMARY KEY (id_evento, id_artista),
    FOREIGN KEY (id_evento) REFERENCES Eventos(id_evento) ON DELETE CASCADE,
    FOREIGN KEY (id_artista) REFERENCES Artistas(id_artista) ON DELETE CASCADE
);

CREATE TABLE Participacao_Cliente_Evento (
    id_evento INT,
    id_cliente INT,
    PRIMARY KEY (id_evento, id_cliente),
    FOREIGN KEY (id_evento) REFERENCES Eventos(id_evento) ON DELETE CASCADE,
    FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente) ON DELETE CASCADE
);