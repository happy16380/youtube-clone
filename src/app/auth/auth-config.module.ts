import { NgModule } from '@angular/core';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';


@NgModule({
    imports: [AuthModule.forRoot({
        config: {
            authority: 'https://dev-gfbxeu88w0wx0kme.us.auth0.com',
            redirectUrl: window.location.origin,
            postLogoutRedirectUri: window.location.origin,
            clientId: 'N124VxbmJmgEQYhocnAnJrPUlDro2qmU',
            usePushedAuthorisationRequests: true,
            scope: 'please-enter-scopes', // 'openid profile offline_access ' + your scopes
            responseType: 'code',
            silentRenew: true,
            useRefreshToken: true,
            logLevel: LogLevel.Debug,
            
    }
      })],
    exports: [AuthModule],
})
export class AuthConfigModule {}
