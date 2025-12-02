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

  // Paginación
  offset = signal(0);
  limit = 20;

  // rxResource CORRECTO
  pokemonResource = rxResource({
    // params devuelven un objeto con offset y limit
    params: () => ({
      offset: this.offset(),
      limit: this.limit
    }),

    // loader recibe un objeto { request } que contiene los params
    loader: ({ request }) => {
      const { offset, limit } = request;
      const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
      return this.http.get<any>(url);
    }
  });

  // Navegar a detalles
  verDetalles(url: string) {
    const id = url.split('/').slice(-2)[0];
    this.router.navigate(['/pokemon', id]);
  }

  nextPage() {
    this.offset.update(o => o + this.limit);
  }

  prevPage() {
    this.offset.update(o => Math.max(0, o - this.limit));
  }
}
