import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {AppRoutes} from "./app-routing.module";
import { AppComponent } from './app.component';
import {BaseDialogComponent} from "./Components/base-dialog/base-dialog.component";
import {landingPageComponent} from "./Components/landing-page/landing-page.component";
import {loginComponent} from "./Components/login/login.component";
import {profileComponent} from "./Components/profile/profile.component"
import {questionnaireComponent} from "./Components/questionnaire/questionnaire.component";
import {questionnaireGeneratorComponent} from "./Components/questionnaire-generator/questionnaire-generator.component";
import {ProfileFetchService} from "./services/profile-fetch.service";
import {AuthGuardService} from "./Components/authentication/authentication-guard.service";
import {DialogModule} from "primeng/dialog";
import {MenubarModule} from "primeng/menubar";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RadioButtonModule} from "primeng/radiobutton";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputMaskModule} from "primeng/inputmask";
import {ButtonModule} from "primeng/button";
import {ConfirmationService} from "primeng/api";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToolbarModule} from "primeng/toolbar";
import {TooltipModule} from "primeng/tooltip";
import {ProfileGeneratorService} from "./services/profile-generator.service";
import {questionnaireGeneratorService} from "./services/questionnaire-generator.service";
import {questionnaireFetchService} from "./services/questionnaire-fetch.service";
import {DropdownModule} from "primeng/dropdown";
import {mockapiService} from "./services/mockapi.service";
import {answerPushService} from "./services/answer-push.service";

@NgModule({
  declarations: [
    AppComponent,
    BaseDialogComponent,
    landingPageComponent,
    loginComponent,
    questionnaireComponent,
    questionnaireGeneratorComponent,
    profileComponent

  ],
    imports: [
        BrowserModule,
        AppRoutes,
        DialogModule,
        MenubarModule,
        BrowserAnimationsModule,
        RadioButtonModule,
        ReactiveFormsModule,
        FormsModule,
        InputMaskModule,
        ButtonModule,
        ConfirmDialogModule,
        ToolbarModule,
        TooltipModule,
        DropdownModule
    ],
  providers: [ProfileFetchService, AuthGuardService, answerPushService, ConfirmationService,ProfileGeneratorService,questionnaireGeneratorService,questionnaireFetchService,
    {
      provide: APP_INITIALIZER,
      useFactory: (mockapiservice:mockapiService) => () =>
        mockapiservice.connect(),
      deps: [mockapiService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
