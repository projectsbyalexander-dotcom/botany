# European Ethnobotany & Pharmacognosy — Android и компьютер

Android- и настольная версии веб-приложения European Ethnobotany & Pharmacognosy (бывший «Травник Старого Света»): Android на Capacitor 8, Windows, macOS и Linux на Electron (папка `desktop/`).

## Скачать

| Система | Файл |
|---|---|
| Android | [ethnobotany.apk](../../releases/latest/download/ethnobotany.apk) |
| Windows 10/11 | [Ethnobotany-windows-setup.exe](../../releases/latest/download/Ethnobotany-windows-setup.exe) |
| macOS (Intel и Apple Silicon) | [Ethnobotany-mac.dmg](../../releases/latest/download/Ethnobotany-mac.dmg) |
| Linux | [Ethnobotany-linux-x86_64.AppImage](../../releases/latest/download/Ethnobotany-linux-x86_64.AppImage) · [ethnobotany_amd64.deb](../../releases/latest/download/ethnobotany_amd64.deb) |

[Все версии](../../releases)

- **Android:** откройте `ethnobotany.apk` на телефоне и разрешите установку из этого источника. Новая версия ставится поверх старой.
- **Windows:** запустите установщик. Он не подписан, поэтому Windows может показать «Windows защитила компьютер»: «Подробнее» → «Выполнить в любом случае».
- **macOS:** откройте `.dmg` и перетащите Ethnobotany в «Программы». Приложение не заверено Apple, поэтому при первом запуске: правый клик → «Открыть», или «Системные настройки» → «Конфиденциальность и безопасность» → «Всё равно открыть».
- **Linux:** AppImage: `chmod +x Ethnobotany-linux-x86_64.AppImage` и запустить; или `sudo apt install ./ethnobotany_amd64.deb`.

В настольной версии: `/` или Ctrl+K (⌘K) открывает поиск, Alt+1…9 переключает разделы, Alt+← (⌘[) возвращает назад, Ctrl+= / Ctrl+- меняют масштаб. Прогресс и заметки хранятся на компьютере.

## Как обновить

1. `./sync.sh` — копирует текущее приложение из `/mnt/project-files/app-botany` в `www/` (без заметок `*.md`, `papers/`, `index-dev.html`).
2. Закоммитить и запушить в `main`. GitHub Actions соберёт подписанный APK и опубликует новый релиз `v1.0.<номер сборки>`; после этого workflow «Build desktop apps» соберёт версии для Windows, macOS и Linux и добавит их в тот же релиз.

Настольную версию можно запустить из исходников: `cd desktop && npm ci && npm start` (берёт приложение из `www/`).

Сборку можно запустить и вручную: Actions → Build APK → Run workflow.

Ключ подписи `android/app/travnik.keystore` лежит в репозитории, чтобы обновления всегда ставились поверх. Для публикации в Google Play лучше сделать отдельный ключ и хранить его в секретах.
