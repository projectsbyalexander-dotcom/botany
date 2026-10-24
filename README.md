# European Ethnobotany & Pharmacognosy — Android

Android-версия веб-приложения European Ethnobotany & Pharmacognosy (бывший «Травник Старого Света») (Capacitor 8).

**Скачать APK:** [последняя версия](../../releases/latest/download/ethnobotany.apk) · [все версии](../../releases)

Установка: откройте `ethnobotany.apk` на телефоне и разрешите установку из этого источника. Новая версия ставится поверх старой.

## Как обновить

1. `./sync.sh` — копирует текущее приложение из `/mnt/project-files/app-botany` в `www/` (без заметок `*.md`, `papers/`, `index-dev.html`).
2. Закоммитить и запушить в `main`. GitHub Actions соберёт подписанный APK и опубликует новый релиз `v1.0.<номер сборки>`.

Сборку можно запустить и вручную: Actions → Build APK → Run workflow.

Ключ подписи `android/app/travnik.keystore` лежит в репозитории, чтобы обновления всегда ставились поверх. Для публикации в Google Play лучше сделать отдельный ключ и хранить его в секретах.
