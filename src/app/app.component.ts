import { Component, OnInit, OnDestroy } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { authConfig } from "./auth/auth.config";
import { OAuthService, JwksValidationHandler } from "angular-oauth2-oidc";
import { Observable, Subscription, fromEvent } from "rxjs";
import { NotificationService } from "./shared/services/notification.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy {
  public title = "CodeSandbox";
  public onlineEvent: Observable<Event>;
  public offlineEvent: Observable<Event>;
  public subscriptions: Subscription[] = [];
  public connectionStatusMessage: string;
  public connectionStatus: string;

  constructor(
    private translate: TranslateService,
    private oauthService: OAuthService,
    private notificationService: NotificationService
  ) {
    //https://www.codeandweb.com/babeledit/tutorials/how-to-translate-your-angular8-app-with-ngx-translate
    this.translate.setDefaultLang("en");
    this.configure();
  }
  ngOnInit(): void {
    this.getOnlineAndOfflineStatus();
  }

  private configure() {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  private getOnlineAndOfflineStatus() {
    //https://robinraju.com/developer/2018-07-26-detecting-user-offline-in-angular/
    /**
     * Get the online/offline status from browser window
     */
    this.onlineEvent = fromEvent(window, "online");
    this.offlineEvent = fromEvent(window, "offline");

    this.subscriptions.push(
      this.onlineEvent.subscribe(e => {
        this.connectionStatusMessage = "Back to online";
        this.connectionStatus = "online";
        console.log("Online...");
        this.notificationService.success("Hello world!");
      })
    );

    this.subscriptions.push(
      this.offlineEvent.subscribe(e => {
        this.connectionStatusMessage =
          "Connection lost! You are not connected to internet";
        this.connectionStatus = "offline";
        console.log("Offline...");
        this.notificationService.error("Thoi tiu roi");
      })
    );
  }

  ngOnDestroy(): void {
    /**
     * Unsubscribe all subscriptions to avoid memory leak
     */
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
