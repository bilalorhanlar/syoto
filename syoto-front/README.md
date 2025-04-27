# Auto Repair Shop Management System

Bu proje, bir oto tamirci dükkanının iş süreçlerini kolayca kaydedip yönetebilmesi için geliştirilen bir web uygulamasıdır. Uygulama, dükkan sahiplerine veya çalışanlarına, tamamlanan işler hakkında ayrıntılı kayıt tutma, müşteri bilgilerini saklama ve iş akışlarını düzenli bir şekilde organize etme imkanı sunar. 

## Özellikler

- **İş Kayıt Yönetimi**: Dükkan tarafından yapılan her işin kaydını tutma (servis, onarım, bakım gibi) ve bu kayıtların kolayca erişilebilir hale getirilmesi.
- **Müşteri Yönetimi**: Müşteri bilgilerini düzenleme, saklama ve geçmiş işlerine erişim sağlama.
- **Raporlama ve Analiz**: Tamamlanan işlerin ve müşteri memnuniyeti bilgileri gibi verilerin incelenmesi.
- **Veri Güvenliği**: AWS üzerinden güvenli veri barındırma ve yedekleme.

## Teknolojiler

Proje, modern bir web uygulamasında iş akışlarını verimli bir şekilde yönetmek için çeşitli teknolojiler kullanılarak geliştirilmiştir:

- **Frontend**: Next.js
- **Backend**: NestJS
- **Veritabanı**: AWS RDS (Relational Database Service)
- **Bulut Barındırma**: AWS (Amazon Web Services) ile sunucu barındırma ve güvenli veri depolama.

## Kurulum ve Çalıştırma

### Gereksinimler
- Node.js (v14+)
- NPM veya Yarn paket yöneticisi
- AWS hesabı ve gerekli erişim anahtarları

### Adımlar

1. **Projeyi Klonlayın**:
    ```bash
    git clone https://github.com/kullanıcı_adı/proje_adı.git
    cd proje_adı
    ```

2. **Bağımlılıkları Kurun**:
    ```bash
    npm install
    # veya
    yarn install
    ```

3. **AWS Ortam Değişkenlerini Ayarlayın**:
    `.env` dosyasına AWS erişim bilgilerinizi ekleyin:
    ```plaintext
    AWS_ACCESS_KEY_ID=your_access_key
    AWS_SECRET_ACCESS_KEY=your_secret_key
    DATABASE_URL=your_database_url
    ```

4. **Uygulamayı Başlatın**:
    ```bash
    npm run dev
    # veya
    yarn dev
    ```
   Uygulama, `http://localhost:3000` adresinde çalışacaktır.

## Kullanım

- **Dashboard**: İşlemlerin ve müşterilerin genel durumu izlenebilir.
- **İş ve Müşteri Yönetimi**: Yeni işler veya müşteri kayıtları eklenebilir, var olan kayıtlar güncellenebilir.
- **Raporlama**: Çeşitli kriterlere göre geçmiş işler raporlanabilir.

## Katkıda Bulunma

Katkıda bulunmak isterseniz, lütfen bir **pull request** oluşturun veya bir **issue** açın. Proje büyümeye ve daha kapsamlı hale gelmeye açık!

## Lisans

Bu proje MIT Lisansı altında lisanslanmıştır. Ayrıntılar için `LICENSE` dosyasını inceleyebilirsiniz.
