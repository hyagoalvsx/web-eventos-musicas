import express, { Request, Response } from 'express';
import path from 'path';

const app = express();
const port = 3000;


app.set('view engine', 'ejs');


app.set('views', path.join(__dirname, '../views'));


app.use(express.static(path.join(__dirname, '../public')));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', (req: Request, res: Response) => {
    
    res.render('index', { titulo: 'AlvesxEvents - Início' });
});

app.listen(port, () => {
    console.log(`Servidor rodando perfeitamente em http://localhost:${port}`);
});


const listaDeLocais = [
    { id_local: 1, nome: "Arena Show", endereco: "Rua Principal, 100", capacidade: 500 }
];

app.get('/locais', (req, res) => {
    res.render('local', { locais: listaDeLocais }); 
});

app.get('/locais/novo', (req, res) => {
    res.render('formulario_local');
});

app.post('/locais/novo', (req, res) => {
    const { nome, endereco, capacidade } = req.body;
    listaDeLocais.push({
        id_local: listaDeLocais.length + 1,
        nome: nome,
        endereco: endereco,
        capacidade: capacidade
    });
    // Volta para a tela da tabela
    res.redirect('/locais');
});