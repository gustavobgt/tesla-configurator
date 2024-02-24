import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabsComponent } from './components/tabs/tabs.component';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TabsComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  cartService = inject(CartService);

  ngOnInit(): void {
    this.cartService.initializeCart().subscribe()
  }
}
