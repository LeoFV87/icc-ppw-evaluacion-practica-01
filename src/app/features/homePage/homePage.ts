import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './homepage.html'
})
export class HomePage {

  private http = inject(HttpClient);
  private router = inject(Router);

  // Señales de paginación
  offset = signal(0);
  limit = 20;

  // rxResource correcto
  pokemonResource = rxResource({
    params: () => ({
      offset: this.offset(),
      limit: this.limit
    }),

     stream: ({ params }) => {
        // Desestructuramos 'offset' y 'limit' del objeto 'params'
        const { offset, limit } = params;
        const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
        return this.http.get<any>(url);
      }
   });

  // Navegar al detalle
  verDetalles(url: string) {
    const id = url.split('/').slice(-2)[0];
    this.router.navigate(['/pokemon', id]);
  }

  // Paginación
  nextPage() {
    this.offset.update(o => o + this.limit);
  }

  prevPage() {
    this.offset.update(o => Math.max(0, o - this.limit));
  }
}
