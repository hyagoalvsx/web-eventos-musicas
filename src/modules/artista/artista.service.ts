import { Injectable } from '@nestjs/common';

@Injectable()
export class ArtistaService {
  private artistas = [
    {
      id: 1,
      nome: 'Anitta',
      genero: 'Pop / Funk',
      palco: 'Palco Mundo',
      horario: '22:00',
      descricao: 'Show principal com os maiores sucessos globais da carreira da Anitta.',
      imagem: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7',
    },
    {
      id: 2,
      nome: 'Jão',
      genero: 'Pop / MPB',
      palco: 'Palco Sunset',
      horario: '20:00',
      descricao: 'Apresentação emocionante da turnê do álbum SUPER, com efeitos visuais incríveis.',
      imagem: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745',
    },
    {
      id: 3,
      nome:'Doja cat',
      genero: 'pop/rap',
      palco: "MorumBIS",
      horario:'20:00',
      descricao: 'Show solo no estadio do MorumBIS, na cidade de São Paulo',
      imagem:'https://upload.wikimedia.org/wikipedia/en/c/cf/Doja_Cat_-_Tour_Ma_Vie_World_Tour.png?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled'
    }
  ];

  findAll() {
    return this.artistas;
  }

  findOne(id: number) {
    return this.artistas.find((a) => a.id === id);
  }
}