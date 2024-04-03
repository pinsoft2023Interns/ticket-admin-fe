import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthGuard } from '../auth.guard';
import { AuthService } from '../auth.service';
import { MessageService } from 'primeng/api'; // Ekledim


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    providers: [MessageService], // Ekledim

})
export class LoginComponent {
    username: string = '';
    password: string = '';

    constructor(
        public layoutService: LayoutService,
        private http: HttpClient,
        private router: Router,
        private authGuard: AuthGuard,
        private authService: AuthService,
        private messageService: MessageService // Ekledim
    ) {}

    onSignIn() {
        if (this.validateForm()) {
            this.login();
        }
    }
    
    validateForm(): boolean {
        if (!this.username || !this.password) {
            this.show('Lütfen kullanıcı adı ve şifre alanlarını boş bırakmayınız.'
            );
            return false;
        }
        return true;
    }

    login() {
        const trimmedUsername = this.username.trim();
        const trimmedPassword = this.password.trim();
    
        this.username = trimmedUsername;
        this.password = trimmedPassword;
    
        this.authService
            .authenticateUser(trimmedUsername, trimmedPassword)
            .subscribe({
                next: (response) => {
                  console.log('Giriş başarılı:', response);
                  const authToken = response.token;
                  sessionStorage.setItem('authToken', authToken);
                  sessionStorage.setItem('username', trimmedUsername);
                  this.router.navigate(['/company/adminManagement']);
                  this.show('Giriş başarıyla yapıldı');
              
                  // Toast mesajını gösterdikten sonra yönlendirme işlemi için zamanlayıcı kullan
                  setTimeout(() => {
                    this.router.navigate(['/company/adminManagement']);
                  }, 10000); // 5 saniye bekleyip sonra yönlendirme yap
                },
                error: (error) => {
                  console.error('Giriş hatası:', error);
                  this.show('Geçersiz kullanıcı adı veya şifre');
                }
              });
              

        
    }
    
    // show() fonksiyonu, aldığı mesajı detay olarak bildirir şekilde güncellenir
    show(message: string) {
        console.log('Mesaj Gösteriliyor:', message);
        this.messageService.add({
            severity: 'info',
            summary: 'Bilgilendirme',
            detail: message,
            key: "pinsoft"
        });
    }
    

    
}
