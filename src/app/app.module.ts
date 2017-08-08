import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout';
import { AccountModule } from './account/account.module';

const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: true});

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    AccountModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    rootRouting
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
