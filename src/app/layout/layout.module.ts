import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LayoutComponent } from "./layout.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { AppRoutingModule } from "../app-routing.module";
import { MenuModule } from "../menu/menu.module";
import { AdvertOneComponent } from "./advert-one/advert-one.component";
import { AdvertTwoComponent } from "./advert-two/advert-two.component";

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    AdvertOneComponent,
    AdvertTwoComponent
  ],
  imports: [CommonModule, AppRoutingModule, MenuModule],
  bootstrap: [LayoutComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LayoutModule {}
