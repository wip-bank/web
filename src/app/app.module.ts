import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout';
import { AccountModule } from './account/account.module';
import { TransactionModule } from './transaction/transaction.module';

const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: true});

/**
 * Angular Modul für die gesamte App
 * Enthält unter anderem die Einstellung für den Router
 * @author Philipp Dyck
 */
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    AccountModule,
    TransactionModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    rootRouting
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
